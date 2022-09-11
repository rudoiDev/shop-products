import React from 'react';
import { useSelector } from 'react-redux';
import Carts from '../carts/Carts';
import { selectMeat } from '@/store/reducers/dataSlice';
import { useState, useEffect } from 'react';
import styles from './meat.module.scss';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';

export default () => {
	const carts = useSelector(selectMeat);
	const [content, useContent] = useState('')
	const [spinner, useSpinner] = useState(true)

	const path = useLocation()

	useEffect(() => {
		(async () => {
			try {
				let response = await fetch('https://jsonplaceholder.typicode.com/posts');
				let data = await response.json();
				useContent(data.reduce((accum, item) => {
					accum[item['id']] = item.body;
					return accum;
				}, {}))
				useSpinner(false)
			} catch(e) {
				console.error(e);
				useSpinner(false)
			}
		})()
	}, [])
	return (
		<>
			<h1> - Мясо - </h1>
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
								return <Carts nameEN={elem.nameEN} key={elem.id} id={elem.id} name={elem.name} value={elem.value} img={elem.img} content={content[index + 10]} indexItem={index + 10} path={path.pathname}/>
							})}
						</ul>
					</div>
			}
		</>
	);
}



