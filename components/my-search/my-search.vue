<template>
	<view class="search" :style="{backgroundColor: bgcolor}" @click="searchHandler">
		<view class="search_main" :style="{borderRadius: radius + 'rpx'}">
			<uni-icons type="search" size="20"></uni-icons>
			<span>搜索</span>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props: {
			bgcolor: {
				type: String,
				default: '#ff4800'
			},
			radius: {
				type: Number,
				default: 30
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			searchHandler() {
				uni.navigateTo({
					url: '/subpackage/search/search' 
				})
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>

.search{
	width: 100%;
	height: 85rpx;
	padding-top: 10rpx;
	position: sticky;
	top: 0;
	z-index: 999;
	
	.search_main{
		width: 90%;
		height: 65rpx;
		margin: auto;
		background-color: white;
		text-align: center;
		line-height: 65rpx;
		
		span{
			margin-left: 20rpx;
			font-size: 30rpx;
		}
	}
}

</style>