<template>
	<view class="cartlist" v-if="cart.length !== 0">
		<MyAddress></MyAddress>
		<view class="title">
			<uni-icons type="shop" size="26"></uni-icons>
			<p>购物车</p>
		</view>
		
		<uni-swipe-action>
			<block v-for="(item, index) in cart" :key="index">
				
				<uni-swipe-action-item :right-options="options" @click="deleteGoods(item)">
					<MyItem  :item="item" :showNum="true" :showRadio="true" @click="changeRadio" @change="changeNum"></MyItem>
				</uni-swipe-action-item>
				
			</block>
		</uni-swipe-action>
		
		<MySettle></MySettle>

	</view>
	<view class="showimg" v-else>
		<img src="@/static/1.jpg" alt="">
		<span class="title">购物车空</span>
	</view>
</template>

<script>
	import { mapState, mapGetters, mapMutations } from 'vuex'
	import mixin from '@/mixins/tabbar-badge.js'
	
	export default {
		data() {
			return {
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#ff3523'
						}
					}
				]
			};
		},
		mixins:[
			mixin
		],
		computed: {
			...mapState('cartOptions', ['cart']),
		},
		methods: {
			...mapMutations('cartOptions', ['updateCart', 'addCount', 'deleteCart']),
			
			changeRadio(e){
				this.updateCart(e)
			},
			
			changeNum(e){
				this.addCount(e)
			},
			
			deleteGoods(item){
				this.deleteCart(item.goods_id)
			}
		}
	}
</script>

<style lang="scss" scoped>
.cartlist{
	width: 100%;
	background-color: #f8f8f8;
	
	.title{
		width: 100%;
		height: 60rpx;
		padding: 20rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #efefef;
		
		p{
			margin-left: 20rpx;
		}
	}
}

.showimg{
	width: 100%;
	height: 1400rpx;
	position: relative;
	
	img{
		width: 100%;
		height: 100%;
	}
	
	.title{
		height: 40rpx;
		display: block;
		position: absolute;
		top: 23%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 38rpx;
		font-weight: 800;
	}
}
</style>
