import Vue from 'vue'
import Vuex from 'vuex'
import cartOptions from './cart.js'
import userOptions from './user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		cartOptions,
		userOptions
	}
})


export default store