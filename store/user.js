const actions = {
	
}

const mutations = {
	updetaAddress(state, address){
		state.address = address
		this.commit('userOptions/saveStorageSync')
	},
	
	saveStorageSync(state){
		uni.setStorageSync('address', JSON.stringify(state.address))
	}
}

const state = {
	address: JSON.parse(uni.getStorageSync('address') || '{}')
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