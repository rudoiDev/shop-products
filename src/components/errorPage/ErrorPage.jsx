import React from 'react';
import { Link } from 'react-router-dom';
import styles from './errorPage.module.scss';
import cn from 'classnames';

export default () => {
	return (
		<div className="container">
			<h1>- Страница не найдена -</h1>
			<Link to='/' type="button" className={`btn btn-success ${cn(styles.errorBtn)}`}>
				Вернуться на главную
			</Link>
		</div>
	);
}


