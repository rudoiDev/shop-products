import React from 'react';
import { useEffect } from 'react';
import useAnimate from '@/hooks/Animate.jsx'
import styles from './main.module.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';

export default () => {
	useEffect(() => {
		const animItemsOne = document.querySelectorAll('.main_hello');
		useAnimate(animItemsOne, 'animate__fadeInUp', 300)
		const animItemsTwo = document.querySelectorAll('.main_paragraph, .main_low-header, .main_low-heading, .main_link');
		useAnimate(animItemsTwo, 'animate__fadeInUp', 600)
	})	
	return (
		<div className={`container ${cn(styles.mainContainer)}`}>
			<h1 className={`animate__animated _anim-no-hide main_hello ${cn(styles.mainHello)}`}> - Добро пожаловать <br/> в магазин виртуальных покупок - </h1>
			<p className='animate__animated _anim-no-hide main_paragraph'>У нас имеется большой асортимент товаров, в том числе фермерского изготовления. По каждому товару имеется подробное описание. Мы делаем все возможное, чтобы предоставлять качественную продукцию нашим покупателям по низким ценам. Убедитесь в этом сами!</p>
			<h4 className='animate__animated _anim-no-hide main_low-header'>В нашем магазине вы найдете товары по следующим категориям:</h4>
			<ul className='animate__animated _anim-no-hide main_low-heading'>
				<li>Фрукты и овощи</li>
				<li>Мясная продукция</li>
				<li>Свежая выпечка</li>
				<li>Молочная продукция</li>
			</ul>
			<Link to='/fruits' type="button" className={`animate__animated _anim-no-hide main_link btn-success btn ${cn(styles.mainBtn)}`}>За покупками</Link>
		</div>
);
}



