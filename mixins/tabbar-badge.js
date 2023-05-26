import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters('cartOptions', ['total'])
	},
	onShow(){
		this.setBadge()
	},
	watch: {
		total(value){
			this.setBadge()
		}
	},
	methods: {
		setBadge(){
			if(this.total !== 0){
				uni.setTabBarBadge({
					index: 2,
					text: this.total + ''
				})
			}else{
				uni.removeTabBarBadge({
					index: 2
				})
			}
		}
	}
}