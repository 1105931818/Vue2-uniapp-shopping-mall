<template>
	<view class="good_main" @click="gotoDetail">
		<img :src="item.goods_big_logo || ''">
		<view class="good_item">
			<span>{{item.goods_name || ''}}</span>
			<p>¥ {{item.goods_price | tofixed}}</p>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-item",
		props: {
			item:{
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				
			};
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
		methods:{
			gotoDetail(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">

.good_main{
	width: 95%;
	height: 280rpx;
	background-color: white;
	margin: auto;
	margin-bottom: 20rpx;
	padding: 0;
	display: flex;
	box-shadow: 1rpx 1rpx 10rpx rgb(156, 156, 156);
	border-radius: 8rpx;
	img{
		width: 240rpx;
		height: 230rpx;
		margin-right: 30rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;
	}
		
	.good_item{
		padding:20rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
			
			span{
				font-size: 28rpx;
			}
			
			p{
				font-size: 32rpx;
				color: #ff3523;
				font-weight: 700;
			}
		}
	}

</style>