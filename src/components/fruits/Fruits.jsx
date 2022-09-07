import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import styles from './fruits.module.scss';
import cn from 'classnames';

import Carts from '../carts/Carts';
import { selectFruits } from '@/store/reducers/dataSlice';
import { useLocation } from 'react-router-dom';

export default () => {
	const carts = useSelector(selectFruits);
	const [content, useContent] = useState('')
	const [spinner, useSpinner] = useState(true)

	const path = useLocation()

	useEffect(() => {
		try {
			setTimeout(() => {
				fetch('https://jsonplaceholder.typicode.com/posts')
				.then(response => response.json())
				.then(json => useContent(json.reduce((accum, item) => {
					accum[item['id']] = item.body;
					return accum;
				}, {})))
				.then(useSpinner(false))
			}, 200)
		} catch(e) {
			console.error(e);
			useSpinner(false)
		}
	}, [])
	return (
		<>
			<h1> - Фрукты и овощи - </h1>
			{
				spinner 
					? 
					<div className="spinner-border spinner" role="status">
						<span className="sr-only">Loading...</span>
					</div> 
					: 
					<div className="container-md">
						<ul className={cn(styles.mainWrapper)}>
							{carts.map((elem, index) => {
								return <Carts nameEN={elem.nameEN} key={elem.id} id={elem.id} name={elem.name} value={elem.value} img={elem.img} content={content[index + 1]} indexItem={index + 1} path={path.pathname}/>
							})}
						</ul>
					</div>
			}
		</>
	);
}


