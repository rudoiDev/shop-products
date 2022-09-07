import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '@/store/reducers/cartSlice';
import { selectCart } from '@/store/reducers/cartSlice';
import styles from './carts.module.scss';
import cn from 'classnames';

export default (props) => {
	const dispatch = useDispatch();
	const carts = useSelector(selectCart);
	let ulHandler = e => {
		if (e.target.classList.contains('cart_button')) {
			dispatch(increment([e.target.getAttribute('data-key'), e.target.getAttribute('data-value')]))
		}
		if (e.target.classList.contains('cart_button-delete')) {
			dispatch(decrement([e.target.getAttribute('data-key'), e.target.getAttribute('data-value')]))
		}
	}
	return (
		<li className={cn(styles.cart)} data-complete={false}>
			<Link to={`${props.path}/${props.nameEN}/${props.indexItem}`} className={cn(styles.cart, styles.cartLink)}>
				<div className={cn(styles.cartTitle)}>{props.name}</div>
				<hr />
				<img src={props.img} alt={props.name} />
				<p className={cn(styles.cartParagraph)}>{props.content}</p>
				<div className={cn(styles.cartCount)}>{props.value} руб.</div>
			</Link>
			<hr className={cn(styles.cartHr)} />
			<div>
				{
					!carts[props.id]
					?
					<button type="button" className="btn cart_button btn-outline-success" data-key={props.id} data-value={props.value} onClick={ulHandler}>Добавить</button>
					:
					<button type="button" className="btn cart_button btn-outline-success" data-key={props.id} data-value={props.value} onClick={ulHandler}>+ {carts[props.id]}</button>
				}
				{
					carts[props.id]
					?
					<button type="button" className="btn btn-danger cart_button-delete" data-key={props.id} data-value={props.value} onClick={ulHandler}>Убрать</button>
					: ''
				}
			</div>
		</li>
	);
}

