<template>
	<view class="settle">
		<view class="change">
			<radio :checked="changes" color="#ff4800" @click="changeRadio(changes)">全选</radio>
		</view>
		<view class="price">
			<p>合计：<span>¥ {{sumPrice | tofixed}}</span></p>
		</view>
		<view class="btn">
			<button @click="settlement">结算（{{sunTotal}}）</button>
		</view>
	</view>
</template>

<script>
	import { mapState, mapGetters, mapMutations } from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				n: 3,
				inter: null
			}
		},
		filters: {
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
		computed: {
			...mapGetters('cartOptions', ['sumPrice', 'sunTotal', 'changes']),
			
			...mapGetters('userOptions', ['addstr']),
			
			...mapState('userOptions', ['token']),
			
			...mapState('cartOptions', ['cart'])
		},
		methods: {
			...mapMutations('cartOptions', ['changesAll']),
			
			...mapMutations('userOptions', ['updetaRect']),
			
			changeRadio(e){
				this.changesAll(!e)
			},
			
			settlement(){
				if(!this.sunTotal) return uni.$showMsg('请选择要结算的商品！')
				
				if(!this.addstr) return uni.$showMsg('请选择收货地址！')
				
				if(!this.token) return this.delayNav()
				
				this.payOrder()
			},
			
			showTips(n){
				uni.showToast({
					icon: 'none',
					title: '请登录后结算！' + this.n + '秒后自动跳转到登录页',
					mask: true,
					duration: 1500
				})
			},
			
			delayNav(){
				this.showTips(this.n)
				
				this.inter = setInterval(() => {
					this.n -= 1
					this.showTips(this.n)
					if(this.n === 0){
						clearInterval(this.inter)
						uni.switchTab({
							url: '/pages/my/my',
							success: () => {
								this.updetaRect({
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})
						this.n = 3
					}
				} , 1000)
				
				
			},
			
			async payOrder() {
				const orderInfo = {
					order_price: 0.01,
					consignee_addr: this.addstr,
					goods: this.cart.filter(x => x.goods_state).map(x => ({
						goods_id: x.goods_id,
						goods_number: x.goods_count,
						goods_price: x.goods_price
					}))
				}
				
				const result = await uni.$http.post('api/public/v1/my/orders/create', orderInfo)
				if(result.statusCode !== 200) return uni.$showError('预付订单生成失败！')
				const e = 'HMDD20250528000010002345'
				
				const res = await uni.$http.post('api/public/v1/my/orders/req_unifiedorder', { order_number: e })
			
				// const pay = uni.requestPayment(res)
				
				const res2 = await uni.$http.post('api/public/v1/my/orders/chkOrder', { order_number: e })
				
				if(res2.statusCode === 200){
					uni.showToast({
						title: '结算成功！',
						icon: 'success'
					})
				}
				
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