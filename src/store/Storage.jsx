import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './reducers/dataSlice';
import cartSlice from './reducers/cartSlice';

export default configureStore({
	reducer: {
		storage: dataSlice,
		carts: cartSlice,
	}
});