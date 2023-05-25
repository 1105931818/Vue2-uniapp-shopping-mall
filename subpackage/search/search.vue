<template>
	<view>
		<view class="search_box">
			<uni-search-bar @input="input" @confirm="search" :radius="100" :focus="true" cancelButton="none" v-model="value" placeholder="请输入搜索内容"></uni-search-bar>
		</view>
		<view class="history" v-if="value.trim() === ''">
			<view class="his_title">
				<view class="title">
					搜索历史
				</view>
				<uni-icons type="trash-filled" size="22" class="his_icon" @click="dele = !dele"></uni-icons>
			</view>
			<view class="his_cont">
				
				<view class="his_item" v-for="(ite , i) in hisList" :key="i">
					<view class="active" v-if="dele" @click="deleteHis(i)">
						x
					</view>
					<view @click="changValue(ite)">
						{{ite}}
					</view>
					
				</view>
			</view>
		</view>
		<view class="scroll">
			<view class="scr_view" v-for="item in mesList" :key="item.goods_id" @click="gotoDetail(item.goods_id)">
				<view class="item"> 
					{{item.goods_name}}
				</view>
				
				<uni-icons type="right" size="16" class="icon"></uni-icons>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				value: '',
				mesList: [],
				hisList: [],
				dele: false
			}
		},
		mounted(){
			this.hisList = JSON.parse(uni.getStorageSync('hisList') || '[]')
		},
		methods: {
			input(e){
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.value = e
					this.getMessage()
				}, 500)
			},
			
			async getMessage(){
				if(this.value.length === 0 || this.value.trim() === ''){
					this.mesList = []
					return
				}
				const {data: reslut} = await uni.$http.get(`api/public/v1/goods/qsearch?query=${this.value}`)
				if (reslut.meta.status === 200) {
					this.mesList = reslut.message
					this.saveHislist()
				}else{
					return uni.$showMsg()
				}
				
			},
			
			gotoDetail(id){
				uni.navigateTo({
					url: '/subpackage/goods_detail/goods_detail?goods_id=' + id
				})
			},
			
			saveHislist(){
				this.hisList.push(this.value)
				this.hisList = Array.from(new Set(this.hisList))
				this.hisList = [...this.hisList].reverse()
				uni.setStorageSync('hisList', JSON.stringify(this.hisList))
			},
			
			deleteHis(i){
				this.hisList.splice(i, 1)
				uni.setStorageSync('hisList', JSON.stringify(this.hisList))
			},
			
				
			changValue(ite){
				uni.navigateTo({
					url: '/subpackage/goods_list/goods_list?query=' + ite
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.search_box{
	width: 100%;
	height: 95rpx;
	background-color: #ff4800;
	position: sticky;
	top: 0;
	z-index: 999;
	
	.uni-searchbar{
		display: flex;
		flex-direction: row;
		position: relative;
		padding: 16rpx;
		background-color: #c00000;
	}
}

.history{
	width: 100%;
	
	.his_title{
		width: 95%;
		height: 70rpx;
		margin: auto;
		padding: 15rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #efefef;
		
	}
	
	.his_cont{
		padding: 0 20rpx;
		margin: auto;
		margin-top: 20rpx;
		display: flex;
		
		
		.his_item{
			height: 60rpx;
			padding: 0 20rpx;
			background-color: #f5f5f5;
			text-align: center;
			line-height: 60rpx;
			margin: 0 10rpx;
			border-radius: 10rpx;
			position: relative;
			
			.active{
				width: 15px;
				height: 15px;
				background-color: #c7b4be;
				border-radius: 50%;
				font-size: 10px;
				text-align: center;
				line-height: 12px;
				position: absolute;
				top: -3px;
				right: -2px;
					
			}
			
		}
		
	}
	
}


.scroll{
	width: 100%;
	margin-top: 20rpx;
	
	.scr_view{
		width: 95%;
		margin: auto;
		height: 90rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #efefef;
		font-size: 12px;
		
		.item{
			flex: 1;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-right: 10rpx;
			
		}
		
		.icon{
			width: 30rpx;
		}
	}
}
</style>
