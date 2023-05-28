const actions = {
	
}

const mutations = {
	updetaAddress(state, address){
		state.address = address
		this.commit('userOptions/saveStorageSync')
	},
	
	updetaUser(state, userInfo){
		state.userInfo = userInfo
		this.commit('userOptions/saveStorageUser')
	},
	
	updetaToken(state, token){
		state.token = token
		this.commit('userOptions/saveStorageToken')
	},
	
	saveStorageSync(state){
		uni.setStorageSync('address', JSON.stringify(state.address))
	},
	
	saveStorageUser(state){
		uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
	},
	
	saveStorageToken(state){
		uni.setStorageSync('token', state.token)
	},
	
	updetaRect(state, rect){
		state.redirectInfo = rect
	}
	
}

const state = {
	address: JSON.parse(uni.getStorageSync('address') || '{}'),
	token: uni.getStorageSync('token') || '',
	userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
	redirectInfo: null
}

const getters = {
	addstr(state){
		if(state.address.provinceName === '') return ''
		
		return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
	}
}


export default {
	namespaced: true,
	actions,
	mutations,
	state,
	getters
}