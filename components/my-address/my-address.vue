<template>
	<view class="address">
		<view class="address_btn" v-if="JSON.stringify(address) === '{}' !== false">
			<button class="btn" @click="gotoAddress">请选择收货地址 + </button>
		</view>
		
		<view class="address_cont" v-else @click="gotoAddress">
			<view class="left">
				<view class="main">
					<view class="name">
						<p>收货人：{{address.userName}}</p>
					</view>
					<view class="phone">
						<p>电话：{{address.telNumber}}</p>
					</view>
				</view>
				<view class="item">
					收货地址：{{addstr}}
				</view>
			</view>
			<view class="right">
				<uni-icons type="forward" size="30"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapState, mapGetters } from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
				
			}
		},
		computed: {
			...mapState('userOptions', ['address']),
			
			...mapGetters('userOptions', ['addstr'])
			
		},
		methods:{
			...mapMutations('userOptions', ['updetaAddress']),
			
			gotoAddress(){
				uni.chooseAddress({
					success: (res) => {
						this.updetaAddress(res)
					}
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>

.address{
	width: 100%;
	height: 180rpx;
	border-bottom: 5px solid #ff4800;
	background-color: white;
	
	.address_btn{
		width: 45%;
		height: 70rpx;
		margin: auto;
		padding-top: 55rpx;
		
		.btn{
			width: 100%;
			height: 70rpx;
			text-align: center;
			color: white;
			line-height: 70rpx;
			background-color: #ff4800;
			border: none;
		}
	}
	
	
	.address_cont{
		width: 100%;
		height: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		
		.left{
			flex: 1;
			height: 100%;
			.main{
				width: 100%;
				height: 50%;
				font-size: 14px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			
			.item{
				width: 100%;
				height: 50%;
				line-height: 70rpx;
				font-size: 14px;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
		
		.right{
			width: 80rpx;
			text-align: right;
		}
	}
}

</style>