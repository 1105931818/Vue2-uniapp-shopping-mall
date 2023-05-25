<template>
	<view>
		<swiper class="home_swiper" indicator-dots="true" autoplay="true" circular="true" interval="2500" duration="700">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<navigator class="nav" :url="`/subpackage/goods_detail/goods_detail?goods_id=${item.goods_id}`">
					<img :src="item.image_src" alt="">
				</navigator>
			</swiper-item>
		</swiper>
		
		<view class="navlist">
			<view class="nav_item" v-for="(item, index) in navList" :key="index" @click="navHandler(item)"> 
				<img :src="item.image_src" alt="">
			</view>
		</view>
		
		<view class="floor" v-for="(item, index) in floorList" :key="index">
			<view class="floor_top">
				<img :src="item.floor_title.image_src">
			</view>
			<view class="floor_cont">
				<navigator class="left" :url="item.product_list[0].url">
					<img :src="item.product_list[0].image_src">
				</navigator>
				<view class="right">
					<navigator class="right_item" v-for="(item1 ,index) in item.product_list" :key="index" v-if="index !== 0" :url="item1.url">
						<img :src="item1.image_src">
					</navigator>
					
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		mounted(){
			this.getSwiper()
			this.getNav()
			this.getFloor()
		},
		methods: {
			async getSwiper(){
				const {data: reslut} = await uni.$http.get('api/public/v1/home/swiperdata')
				if (reslut.meta.status === 200) {
					 this.swiperList = reslut.message
				} else {
					return uni.$showMsg()
				}
			},
			
			async getNav(){
				const {data: reslut} = await uni.$http.get('api/public/v1/home/catitems')
				if (reslut.meta.status === 200) {
					this.navList = reslut.message
				} else {
					return uni.$showMsg()
				}
			},
			
			async getFloor(){
				const {data: reslut} = await uni.$http.get('api/public/v1/home/floordata')
				if (reslut.meta.status === 200) {
					reslut.message.forEach(item => {
						item.product_list.forEach(pro => {
							pro.url = '/subpackage/goods_list/goods_list?' + pro.navigator_url.split('?')[1]
						})
					})
				
					this.floorList = reslut.message
				} else {
					return uni.$showMsg()
				}
			},
			
			navHandler(item){
				if(item.name === '分类'){
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.home_swiper{
	width: 100%;
	height: 350rpx;
	
	swiper-item{
		width: 100%;
		height: 100%;
		
		.nav{
			width: 100%;
			height: 100%;
			
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
}

	
.navlist{
	width: 100%;
	height: 150rpx;
	margin-top: 30rpx;
	margin-bottom: 50rpx;
	display: flex;
	justify-content: space-around;
	
	.nav_item{
		width: 18%;
		height: 100%;
		box-sizing: border-box;
		
		img{
			width: 130rpx;
			height: 100%;
		}
	}
}

.floor{
	width: 95%;
	margin: auto;
	margin-top: 10rpx;
	
	
	.floor_top{
		height: 60rpx;
		
		img{
			width: 100%;
			height: 60rpx;
		}
	}
	
	.floor_cont{
		width: 100%;
		height: 350rpx;
		display: flex;
		
		.left{
			width: 200rpx;
			height: 100%;
			
			img{
				width: 100%;
				height: 100%;
			}
		}
		
		.right{
			flex: 1;
			height: 100%;
			margin-left: 10rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			align-content: space-between;
			
			.right_item{
				width: 47%;
				height: 47%;
				
				img{
					width: 100%;
					height: 100%;
				}
			}
			
		}
	}
}
</style>
