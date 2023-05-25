<template>
	<view class="goodlist">
		<MyItem v-for="(item, index) in goodslist" :key="index" :item="item" @click="gotoDetail(item)"></MyItem>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 20
				},
				goodslist: [],
				total: 0,
				isloading: true
			}
		},
		onLoad(option){
			this.queryObj.query = option.query || ''
			this.queryObj.cid = option.cid || ''
			this.getGoodlist()
		},
		methods: {
			async getGoodlist(clear){
				this.isloading = false
				const {data: result} = await uni.$http.get('api/public/v1/goods/search' , this.queryObj)
				if(result.meta.status === 200){
					this.goodslist = [...this.goodslist, ...result.message.goods]
					this.total = result.message.total
					clear && clear()
					this.isloading = true
				}else{
					uni.$showMsg()
				}
			},
			
			gotoDetail(item){
				uni.navigateTo({
					url: '/subpackage/goods_detail/goods_detail?goods_id=' + item.goods_id 
				})
			}
		},
		onReachBottom() {
		    if(this.isloading){
		      if(Math.floor(this.total / this.queryObj.pagesize) > this.queryObj.pagenum){
		        this.queryObj.pagenum += 1
				this.getGoodlist()
		      } else {
					return uni.showToast({
						title: '没有更多数据了！',
						icon: 'none'
					})
				}
			}
		},
		onPullDownRefresh() {
			this.goodslist = []
			this.queryObj.pagenum = 1
			this.getGoodlist(() => {
				uni.stopPullDownRefresh()
			})
		},
		
	}
</script>

<style lang="scss" scoped>
.goodlist{
	width: 100%;
	padding-top: 20rpx;
	background-color: #efefef;
}
</style>
