<template>
	<view class="good_main" @click="gotoDetail">
		<view class="min">
			<radio :checked="item.goods_state" color="#ff4800" v-if="showRadio" style="margin-left: 5rpx;" @click="Detail(item)"></radio>
			<img :src="item.goods_big_logo || item.goods_small_logo">
		</view>
		<view class="good_item">
			<span>{{item.goods_name || ''}}</span>
			<view class="price">
				<p>¥{{item.goods_price | tofixed}} </p>
				
				<uni-number-box v-if="showNum" :min="1" :value="item.goods_count" @change="bindChange"></uni-number-box>
				
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-item",
		props: {
			item: {
				type: Object,
				default: {}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNum: {
				type: Boolean,
				default: false
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
				this.$emit('goto-click')
			},
			
			Detail(item){
				this.$emit('click', { goods_id: this.item.goods_id, goods_state: !this.item.goods_state })
			},
			
			bindChange(e){
				this.$emit('change', {num: e - 0, goods_id: this.item.goods_id})
			}
		}
	}
</script>

<style lang="scss">

.good_main{
	width: 95%;
	height: 260rpx;
	background-color: white;
	margin: 20rpx auto;
	padding: 0;
	display: flex;
	box-shadow: 1rpx 1rpx 10rpx rgb(156, 156, 156);
	border-radius: 8rpx;
	
	.min{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 10rpx;
		margin-right: 10rpx;
		
		img{
			width: 180rpx;
			height: 180rpx;
			
			
		}
	}
		
	.good_item{
		padding:20rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		
			
			span{
				display: block;
				width: 100%;
				height: 145rpx;
				font-size: 22rpx;
				white-space: wrap;
				overflow: hidden;
				text-overflow: ellipsis;
				
			}
			
			.price{
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				p{
					font-size: 28rpx;
					color: #ff3523;
					font-weight: 700;
					position: relative;
				}
				
			}
		}
	}

</style>