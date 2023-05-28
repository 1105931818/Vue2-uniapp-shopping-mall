<template>
	<view class="userinfo">
		<view class="username">
			<img :src="userInfo.avatarUrl" alt="">
			<view class="name">
				{{ userInfo.nickName }}
			</view>
		</view>
		
		<view class="usermsg">
			<view class="msg_item">
				<p>9</p>
				<p>收藏的店铺</p>
			</view>
			<view class="msg_item">
				<p>19</p>
				<p>收藏的商品</p>
			</view>
			<view class="msg_item">
				<p>17</p>
				<p>关注的商品</p>
			</view>
			<view class="msg_item">
				<p>24</p>
				<p>足迹</p>
			</view>
		</view>
		
		<view class="usercart">
			<view class="title">
				我的订单
			</view>
			<view class="cart_cont">
				<view class="cart_item">
					<uni-icons type="wallet" size="50" color="#ff4800"></uni-icons>
					<span>待付款</span>
				</view>
				<view class="cart_item">
					<uni-icons type="gift" size="50" color="#ff4800"></uni-icons>
					<span>待收货</span>
				</view>
				<view class="cart_item">
					<uni-icons type="map" size="50" color="#ff4800"></uni-icons>
					<span>退款/退货</span>
				</view>
				<view class="cart_item">
					<uni-icons type="cart" size="50" color="#ff4800"></uni-icons>
					<span>全部订单</span>
				</view>
				
			</view>
		</view>
		
		<view class="userlist">
			<view class="useritem">
				<span>收货地址</span>
				<uni-icons type="right" size="20"></uni-icons>
			</view>
			<view class="useritem">
				<span>联系客服</span>
				<uni-icons type="right" size="20"></uni-icons>
			</view>
			<view class="useritem" @click="userlogout">
				<span>退出登录</span>
				<uni-icons type="right" size="20"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		name:"my-userinfo",
		data() {
			return {
				
			}
		},
		computed: {
			...mapState('userOptions', ['userInfo'])
		},

		methods: {
			...mapMutations('userOptions', ['updetaToken', 'updetaUser', 'updetaAddress']),
			
			async userlogout(){
				const result = await uni.showModal({
					title: '提示',
					content: '确认退出登录吗？'
				})
				if(result.confirm){
					this.updetaToken('')
					this.updetaUser({})
					this.updetaAddress({})
					return uni.$showMsg('成功退出')
				}
				
			}
		}
		
	}
</script>

<style lang="scss" scoped>

.userinfo{
	width: 100%;
	background-color: #f4f4f4;
	padding-bottom: 100rpx;
	
	.username{
		width: 100%;
		height: 400rpx;
		background-color: #ff4800;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 36rpx;
		color: white;
		
		img{
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			border: 2px solid #f4f4f4;
			margin-bottom: 25rpx;
		}
	}
	
	.usermsg{
		width: 90%;
		height: 150rpx;
		margin: auto;
		background-color: white;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-radius: 14rpx;
		transform: translateY(-20%);
		
		.msg_item{
			font-size: 26rpx;
			text-align: center;
			
			p{
				margin-top: 15rpx;
			}
		}
	}
	
	.usercart{
		width: 90%;
		height: 300rpx;
		margin: auto;
		background-color: white;
		border-radius: 14rpx;
		padding: 20rpx;
		box-sizing: border-box;
		
			
		.title{
			margin-top: 10rpx;
		}
		
		.cart_cont{
			width: 100%;
			margin-top: 20rpx;
			padding-top: 40rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			border-top: 1px solid #f4f4f4;
			
			.cart_item{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 24rpx;
			}
		}
	}
	
	.userlist{
		width: 90%;
		height: 330rpx;
		margin: auto;
		background-color: white;
		border-radius: 14rpx;
		margin-top: 30rpx;
		
		.useritem{
			width: 95%;
			height: 110rpx;
			margin: auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
}



</style>