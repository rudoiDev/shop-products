import React from "react";
import { Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getValues } from '@/store/reducers/cartSlice';
import './app.scss';

import Fruits from '../fruits/Fruits';
import Meat from '../meat/Meat';
import Flour from '../flour/Flour';
import Milk from '../milk/Milk';
import Main from '../main/Main';
import Product from '../product/Product';
import Layout from '../layout/Layout';
import PageNotFound from '../errorPage/ErrorPage';

export default () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getValues(localStorage.getItem('dataCarts')))
	}, [])
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Main />} />
				<Route path='fruits' element={<Fruits />}/>
				<Route path='fruits/:id/:index' element={<Product />} />
				<Route path='meat' element={<Meat />} />
				<Route path='meat/:id/:index' element={<Product />} />
				<Route path='flour' element={<Flour />} />
				<Route path='flour/:id/:index' element={<Product />} />
				<Route path='milk' element={<Milk />} />
				<Route path='milk/:id/:index' element={<Product />} />
				<Route path='*' element={<PageNotFound />} />
			</Route>
		</Routes>
	);
}

