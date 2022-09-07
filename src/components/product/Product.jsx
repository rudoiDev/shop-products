import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import './product.scss';
import { selectCart } from '@/store/reducers/cartSlice';
import { selectAllData } from '@/store/reducers/dataSlice';
import { increment, decrement } from '@/store/reducers/cartSlice';

export default () => {
	const [spinner, useSpinner] = useState(true);
	const [content, useContent] = useState('');
	const { id, index } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const carts = useSelector(selectCart);

	const cartInfo = useSelector(selectAllData);
	const base = cartInfo.reduce((accum, item) => {
		accum[item['nameEN']] = item;
		return accum;
	}, {});
	function ulHandler(e) {
		if (e.target.classList.contains('cart_button')) {
			dispatch(increment([e.target.getAttribute('data-key'), e.target.getAttribute('data-value')]))
		}
		if (e.target.classList.contains('cart_button-delete')) {
			dispatch(decrement([e.target.getAttribute('data-key'), e.target.getAttribute('data-value')]))
		}
	}
	const goBack = () => {
		navigate(-1)
	}

	useEffect(() => {
		try {
			setTimeout(() => {
				fetch(`https://jsonplaceholder.typicode.com/posts/${index}`)
				.then(response => response.json())
				.then(json => useContent(json))
				.then(useSpinner(false))
			}, 200)
		} catch(e) {
			console.error(e);
			useSpinner(false)
		}
	}, [])

	return (
		<div className="container">
			<h1> - {base[id].name} - </h1>
			{		
				spinner 
					? 
					<div className="spinner-border spinner" role="status">
						<span className="sr-only">Loading...</span>
					</div> 
					: 
					<div className="product">
						<button type="button" onClick={goBack} className='product_btn btn btn-light'>
							<i className="fa fa-arrow-left" aria-hidden="true"></i>
						</button>
						<img src={base[id].img} alt={base[id].name} />
						<div className="product_description">
							<div className="product_count">
								{base[id].value} руб.
							</div>
							<h4>Наименование товара:</h4>
							<div className="product_text">
								{content.title} <br/> 
							</div>
							<h4>Описание товара:</h4>
							<div className="product_text">
								{content.body} <br/> 
							</div>
							<div className="product_buttons">
								{
									!carts[base[id].id]
									?
									<button type="button" className="btn cart_button btn-success" data-key={base[id].id} data-value={base[id].value} onClick={ulHandler}>Добавить</button>
									:
									<button type="button" className="btn cart_button btn-success" data-key={base[id].id} data-value={base[id].value} onClick={ulHandler}>+ {carts[base[id].id]}</button>
								}
								{
									carts[base[id].id]
									?
									<button type="button" className="btn btn-danger cart_button-delete" data-key={base[id].id} data-value={base[id].value} onClick={ulHandler}>Убрать</button>
									: ''
								}
							</div>
							<hr />
						</div>
					</div>
			}
		</div>
	);
}



