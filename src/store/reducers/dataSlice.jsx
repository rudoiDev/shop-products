import { createSlice } from '@reduxjs/toolkit';
import fruitBase from '../data/fruits.json'
import meatBase from '../data/meat.json'
import flourBase from '../data/flour.json'
import milkBase from '../data/milk.json'
import allBase from '../data/allData.json'

export const dataSlice = createSlice({
	name: 'storage',
	initialState: {
		fruits: fruitBase,
		meat: meatBase,
		flour: flourBase,
		milk: milkBase, 
		allBase: allBase
	},
});

export const { } = dataSlice.actions;

export const selectFruits = state => state.storage.fruits;
export const selectMeat = state => state.storage.meat;
export const selectFlour = state => state.storage.flour;
export const selectMilk = state => state.storage.milk;
export const selectAllData = state => state.storage.allBase;

export default dataSlice.reducer;