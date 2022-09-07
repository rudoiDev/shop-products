import { createSlice } from '@reduxjs/toolkit';

const saveStorage = (state, data) => {
	const storageCarts = {
		value: state.value,
		valueProduct: state.valueProduct,
		result: state.result
	}
	localStorage.setItem('dataCarts', JSON.stringify(storageCarts))
}

const getStorage = (state, data) => {
	if (data.payload) {
		const dataCarts = JSON.parse(data.payload);
		state.value = dataCarts.value;
		state.valueProduct = dataCarts.valueProduct;
		state.result = dataCarts.result;
	}
}

export const cartSlice = createSlice({
	name: 'carts',
	initialState: {
		value: {},
		valueProduct: {},
		result: 0,
	},
	reducers: {
		increment: (state, data) => {
			let articul = data.payload;
			if (!state.value[articul[0]]) {
				state.value[articul[0]] = 0;
				state.valueProduct[articul[0]] = 0;
			}
			state.value[articul[0]]++
			state.valueProduct[articul[0]] = state.value[articul[0]] * articul[1];
			state.result += +articul[1];
			saveStorage(state, data)
		},
		decrement: (state, data) => {
			let articul = data.payload;
			state.value[articul[0]]--
			state.valueProduct[articul[0]] = state.value[articul[0]] * articul[1];
			state.result += -articul[1]
			if (state.value[articul[0]] === 0) {
				delete state.value[articul[0]]
			}
			saveStorage(state, data)
		},
		deleteElem: (state, data) => {
			let articul = data.payload;
			state.result -= state.valueProduct[articul]
			delete state.value[articul];
			saveStorage(state, data)
		},
		getValues: (state, data) => {
			getStorage(state, data);
		},
		removeStorage: (state, data) => {
			localStorage.clear()
			state.value = {};
			state.valueProduct = {};
			state.result = 0;
		}
	}
});

export const { increment, decrement, deleteElem, getValues, removeStorage } = cartSlice.actions;

export const selectCart = state => state.carts.value;
export const selectCartCount = state => state.carts.valueProduct;
export const selectCount = state => state.carts.result;


export default cartSlice.reducer;