<template>
	<view v-if="goodInfo.goods_name" style="padding-bottom: 110rpx;">
		<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" interval="2500" duration="700">
			<swiper-item v-for="(item, index) in goodInfo.pics" :key="index">
				<img :src="item.pics_big"  @click="preview(index)">
			</swiper-item>
		</swiper>
		
		<view class="cont">
			<p class="title">¥{{goodInfo.goods_price}}</p>
			<view class="cont_msg">
				<view class="msg_left">
					<p>{{goodInfo.goods_name}}</p>
				</view>
				<view class="msg_right">
					<uni-icons type="star" size="22"></uni-icons>
					<p>收藏</p>
				</view>
			</view>
			<span>快递：免运费</span>
		</view>
		
		<view>
			<rich-text :nodes="goodInfo.goods_introduce"></rich-text>
		</view>
		
		<view class="goods_cart">
			<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex'
	
	export default {
		data() {
			return {
				goodInfo: {},
				options: [
					{
						icon: 'headphones',
						text: '客服'
					},
					{
						icon: 'shop',
						text: '店铺'
					},
					{
						icon: 'cart',
						text: '购物车',
						info: 0
					}
				],
				buttonGroup: [
					{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		computed: {
			...mapGetters('cartOptions', ['total'])
		},
		onLoad(option){
			const id = option.goods_id
			this.getGoodinfo(id)
			// this.options[2].info = this.total
			// const finds = this.options.find(x => x.text === '购物车')
			// if(finds){
			// 	finds.info = this.total
			// }
		},
		watch:{
			total: {
				immediate: true,
				handler(value){
					const finds = this.options.find(x => x.text === '购物车')
					if(finds){
						finds.info = value
					}
				}
			}
		},
		methods: {
			...mapMutations('cartOptions', ['addCart']),
			
			async getGoodinfo(id){
				const {data: result} = await uni.$http.get('api/public/v1/goods/detail',{ goods_id: id })
				if(result.meta.status === 200){
					result.message.goods_introduce = result.message.goods_introduce.replace(/<img /g , '<img style="display: block;"').replace(/webp/g, 'jpg')
					this.goodInfo = result.message
				}else{
					uni.$showMsg()
				}
			},
			
			preview(i){
				uni.previewImage({
					current: i,
					urls: this.goodInfo.pics.map(x => x.pics_big)
				})
			},
			
			onClick(e){
				if(e.content.text === '购物车'){
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			
			buttonClick(e){
				
				if(e.content.text === '加入购物车'){
					const goods = {
						goods_id: this.goodInfo.goods_id,
						goods_name: this.goodInfo.goods_name,
						goods_price: this.goodInfo.goods_price,
						goods_count: 1,
						goods_small_logo: this.goodInfo.goods_small_logo,
						goods_state: true
					}
					
					this.addCart(goods)
				}
			}
			
			
		}
	}
</script>

<style lang="scss" scoped>

.swiper{
	width: 100%;
	height: 750rpx;
	
	swiper-item{
		width: 100%;
		height: 100%;
		
		img{
			width: 100%;
			height: 100%;
		}
	}
}

.cont{
	width: 93%;
	height: 200rpx;
	margin: 40rpx auto;
	
	.title{
		font-size: 36rpx;
		color: #ff3523;
		font-weight: 700;
		
	}
	
	.cont_msg{
		width: 100%;
		height: 80rpx;
		margin:20rpx auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		.msg_left{
			flex: 1;
			height: 100%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		
		.msg_right{
			width: 80rpx;
			height: 100%;
			padding-left: 30rpx;
			margin-left: 20rpx;
			text-align: center;
			border-left: 1px solid #887f85;
			color: #887f85;
			
			p{
				font-size: 26rpx;
			}
			
		}
	}
	
	span{
		font-size: 24rpx;
		color: #887f85;
	}
}


.goods_cart{
	height: 120rpx;
	background-color: white;
	padding-top: 10rpx;
	display: flex;
	flex-direction: column;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
}
</style>
