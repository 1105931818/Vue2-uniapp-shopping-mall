const actions = {
	
}

const mutations = {
	addCart(state , goods){
		const finds = state.cart.find(x => x.goods_id === goods.goods_id)
		if(finds){
			finds.goods_count ++
		}else{
			state.cart.push(goods)
		}
		
		this.commit('cartOptions/saveStorageSync')
	},
	
	saveStorageSync(state){
		uni.setStorageSync('cart', JSON.stringify(state.cart))
	},
	
	updateCart(state, e){
		const finds = state.cart.find(x => x.goods_id === e.goods_id)
		if(finds){
			finds.goods_state = e.goods_state
			this.commit('cartOptions/saveStorageSync')
		}
	},
	
	addCount(state, e){
		const finds = state.cart.find(x => x.goods_id === e.goods_id)
		if(finds){
			finds.goods_count = e.num
			this.commit('cartOptions/saveStorageSync')
		}
	},
	
	deleteCart(state, index){
		// state.cart.splice(index, 1)
		
		state.cart = state.cart.filter(x => x.goods_id !== index)
		this.commit('cartOptions/saveStorageSync')
	},
	
	changesAll(state, e){
		state.cart.forEach(goods => goods.goods_state = e)
		this.commit('cartOptions/saveStorageSync')
	}
}

const state = {
	cart: JSON.parse(uni.getStorageSync('cart') || '[]')
}

const getters = {
	total(state){
		let num = 0
		state.cart.forEach(goods => num += goods.goods_count)
		return num
	},
	
	sumPrice(state){
		// let num = 0
		// state.cart.forEach(goods => {
		// 	if(goods.goods_state){
		// 		num += (goods.goods_count - 0) * (goods.goods_price - 0)
		// 	}
		// })
		return state.cart.filter(x => x.goods_state).reduce((sum, goods) => sum += (goods.goods_count - 0) * (goods.goods_price - 0), 0)
	},
	
	sunTotal(state){
		let num = 0
		state.cart.forEach(goods => {
			if(goods.goods_state){
				num += goods.goods_count
			}
		})
		return num
	},
	
	changes(state){
		let change = true
		state.cart.forEach(goods => {
			if(!goods.goods_state){
				change = false
			}
		})
		return change
	}
}


export default {
	namespaced: true,
	actions,
	mutations,
	state,
	getters
}