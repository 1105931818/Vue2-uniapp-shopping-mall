<template>
	<view>
		<MySearch></MySearch>
		<view class="scroll-view-container">
			<scroll-view class="left_view" scroll-y="true" :style="{height: hei + 'px'}">
				<view class="left_item" v-for="(item, index) in cateList" :key="index" :class="{active: index === active}" @click="changCate(index)" >
					{{item.cat_name}}
				</view>	
			</scroll-view>
			
			<scroll-view class="right_view" scroll-y="true" :style="{height: hei + 'px'}" :scroll-top="scrollTop">
				<view class="right_main" v-for="item1 in levelList" :key="item1.cat_id">
					<view class="right_top">
						{{item1.cat_name}}
					</view>
					<view class="right_cont">
						<view class="right_item" v-for="item2 in item1.children" :key="item2.cat_id" @click="gotoList(item2)">
							<img :src="item2.cat_icon">
							<p>{{item2.cat_name}}</p>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import mixin from '@/mixins/tabbar-badge.js'
	export default {
		data() {
			return {
				hei: 0,
				cateList: [],
				levelList: [],
				active: 0,
				scrollTop: 0
			};
		},
		mixins: [
				mixin
		],
		mounted(){
			const sysInfo = uni.getSystemInfoSync()
			this.hei = sysInfo.windowHeight
			
			this.getCate()
		},
		methods:{
			async getCate(){
				const {data: reslut} = await uni.$http.get('api/public/v1/categories')
				if (reslut.meta.status === 200) {
					this.cateList = reslut.message
					this.levelList = reslut.message[0].children
				} else {
					return uni.$showMsg()
				}
			},
			
			changCate(index){
				this.active = index
				this.levelList = this.cateList[index].children
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			
			gotoList(item){
				uni.navigateTo({
					url: '/subpackage/goods_list/goods_list?cid=' + item.cat_id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

.scroll-view-container{
	width: 100%;
	display: flex;
	
	.left_view{
		width: 220rpx;
		background-color: #f6f6f6;
		font-size: 26rpx;
		
		.left_item{
			width: 100%;
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
		}
		
		.active{
			background-color: #ffffff;
			position: relative;
			
			&::before{
				content: '';
				display: block;
				width: 7rpx;
				height: 70rpx;
				background-color: #ff3b18;
				position: absolute;
				top: 50%;
				left: 0;
				transform: translateY(-50%);
			}
		}
	}
	
	.right_view{
		flex: 1;
		margin: 0 10rpx;
		box-sizing: border-box;
		
		.right_main{
			width: 100%;
			margin-bottom: 40rpx;
			
			
			.right_top{
				width: 100%;
				height: 100rpx;
				text-align: center;
				line-height: 100rpx;
				font-weight: 700;
				border-bottom: 2px solid #ff3b18;
			}
			
			.right_cont{
				width: 100%;
				margin-top: 15rpx;
				display: flex;
				flex-wrap: wrap;
				
				.right_item{
					width: 33%;
					height: 140rpx;
					text-align: center;
					font-size: 22rpx;
					margin-bottom: 20rpx;
					
					img{
						width: 110rpx;
						height: 110rpx;
						display: block;
						margin: auto;
					}
				}
			}
		}
	}
}

</style>
