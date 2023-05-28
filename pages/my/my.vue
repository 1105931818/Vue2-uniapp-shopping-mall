<template>
	<view>
		<MyLogin v-if="!token"></MyLogin>
		
		<MyUser v-else></MyUser>
	</view>
</template>

<script>
	import mixin from '@/mixins/tabbar-badge.js'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		mixins: [
			mixin
		],
		computed: {
			...mapState('userOptions', ['token'])
		}
	}
</script>

<style lang="scss">

</style>
