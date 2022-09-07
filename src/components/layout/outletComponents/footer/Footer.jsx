import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';

export default () => {

	return (
		<footer className="py-3 mt-4 bg-dark">
			<ul className="nav justify-content-center border-bottom pb-3 mb-3">
			<li className="nav-item">
					<Link to='/' className="nav-link p-10 text-muted">
						Главная
					</Link>
				</li>
				<li className="nav-item">
					<Link to='/fruits' className="nav-link p-10 text-muted">
						Фрукты и овощи
					</Link>
				</li>
				<li className="nav-item">
					<Link to='/meat' className="nav-link p-10 text-muted">
						Мясо
					</Link>
				</li>
				<li className="nav-item">
					<Link to='/flour' className="nav-link p-10 text-muted">
						Выпечка
					</Link>
				</li>
				<li className="nav-item">
					<Link to='/milk' className="nav-link p-10 text-muted">
						Молочное
					</Link>
				</li>
			</ul>
			<p className="text-center text-muted">© 2022
				<a href="https://github.com/rudoiDev" target='_blank'> rudoiDev</a>
			</p>
  </footer>
	);
}


