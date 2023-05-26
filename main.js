import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from './store/store.js'
import router from './router/router.js'
import './uni.promisify.adaptor'
import MySearch from './components/my-search/my-search.vue'
import './uni_modules/uni-icons/components/uni-icons/icons.js'
import 'uni_modules/uni-search-bar/components/uni-search-bar/i18n/index.js'
import 'uni_modules/uni-goods-nav/components/uni-goods-nav/i18n/index.js'
import MyItem from './components/my-item/my-item.vue'
import MyAddress from './components/my-address/my-address.vue'
import MySettle from './components/my-settle/my-settle.vue'
// import mixin from './mixins/tabbar-badge.js'



// 导入网络请求的包
import {$http} from '@escook/request-miniprogram'

uni.$http = $http

$http.baseUrl = 'https://api-hmugo-web.itheima.net/'

// 请求拦截
$http.beforeRequest = function(options){
	uni.showLoading({
		title: '数据加载中...'
	})
}

// 响应拦截
$http.afterRequest = function(options){
	uni.hideLoading()
}

uni.$showMsg = (title = '数据加载失败！', duration = 1500) => {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

Vue.component('MySearch', MySearch)
Vue.component('MyItem', MyItem)
Vue.component('MyAddress', MyAddress)
Vue.component('MySettle', MySettle)
// Vue.mixin(mixin)


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
  store,
  router
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif