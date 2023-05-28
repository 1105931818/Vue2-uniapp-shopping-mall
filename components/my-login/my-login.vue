<template>
	<view class="login">
		<uni-icons type="contact-filled" size="120" color="#AFAFAF"></uni-icons>
		
		<button class="btn" @click="loginTap">一&nbsp;键&nbsp;登&nbsp;录</button>
		
		<view class="title">
			登录后尽享更多权益
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	
	export default {
		name:"my-login",
		data() {
			return {
				
			}
		},
		computed: {
			...mapState('userOptions', ['redirectInfo'])
		},
		methods:{
			...mapMutations('userOptions', ['updetaUser', 'updetaToken', 'updetaRect']),
			
			loginTap(){
				
				uni.getUserProfile({
					desc: '你的授权信息',
					success: (res) => {
						this.updetaUser(res.userInfo)
						this.getQuery(res)
						
					},
					fail: (res) => {
						return uni.$showMsg('你取消了登录授权')
					}
				})
			},
			
			getQuery(info){
				uni.login({
					success: (res) => {
						const query = {
							code: res.code,
							encryptedData: info.encryptedData,
							iv: info.iv,
							rawData: info.rawData,
							signature: info.signature
						}
						this.getToken(query)
					}
				})
				
			},
			
			async getToken(query){
				const result = await uni.$http.post('api/public/v1/users/wxlogin', query)
				if(result.statusCode === 200){
					this.updetaToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCl6IkpXVCJ9')
					if(this.redirectInfo && this.redirectInfo.openType === 'switchTab'){
						uni.switchTab({
							url: this.redirectInfo.from
						})
						
						this.updetaRect(null)
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.login{
	width: 100%;
	padding-top: 300rpx;
	padding-bottom: 150rpx;
	background-color: #F8F8F8;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	position: relative;
	
	
	&::after{
		content: '';
		width: 100%;
		height: 100rpx;
		position: absolute;
		bottom: -50rpx;
		left: 0;
		background-color: white;
		border-radius: 100%;
	}
		
	.btn{
		width: 75%;
		height: 75rpx;
		margin: 40rpx auto;
		text-align: center;
		line-height: 75rpx;
		font-size: 30rpx;
		border-radius: 35rpx;
		color: white;
		background-color: #ff4800;
	}
	
	.title{
		color: #858585;
		font-size: 24rpx;
	}
}
</style>