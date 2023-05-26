<template>
	<view class="settle">
		<view class="change">
			<radio :checked="changes" color="#ff4800" @click="changeRadio(changes)">全选</radio>
		</view>
		<view class="price">
			<p>合计：<span>¥ {{sumPrice | tofixed}}</span></p>
		</view>
		<view class="btn">
			<button>结算（{{sunTotal}}）</button>
		</view>
	</view>
</template>

<script>
	import { mapState, mapGetters, mapMutations } from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			}
		},
		filters: {
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
		computed: {
			...mapGetters('cartOptions', ['sumPrice', 'sunTotal', 'changes'])
		},
		methods: {
			...mapMutations('cartOptions', ['changesAll']),
			
			changeRadio(e){
				this.changesAll(!e)
			}
		}
	}
</script>

<style lang="scss" scoped>

.settle{
	width: 100%;
	height: 90rpx;
	position: absolute;
	bottom: 0;
	left: 0;
	border-top: 1px solid #efefef;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	
	.change{
		width: 200rpx;
		height: 100%;
		margin-left: 30rpx;
		display: flex;
		align-items: center;
	}
	
	.price{
		flex: 1;
		height: 100%;
		text-align: left;
		line-height: 90rpx;
		
		span{
			color: #ff4800;
		}
	}
	
	.btn{
		button{
			width: 200rpx;
			height: 100%;
			text-align: center;
			line-height: 90rpx;
			color: white;
			font-size: 14px;
			background-color: #ff4800;
			border-radius: 0;
		}
	}
}

</style>