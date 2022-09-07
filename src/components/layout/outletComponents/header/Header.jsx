import React from "react";
import CustomLink from "./customLink/CustomLink";
import './header.scss';

export default () => {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
				<div className="container">
					<a href="\">
						<div className='nav_img'>
							<img src="https://cdn-icons-png.flaticon.com/512/2674/2674486.png" alt="Продукты" />
						</div>
					</a>
					<CustomLink children='Магазин продуктов' link='/'
					style="navbar-brand"/>
					<button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
						<div className="offcanvas-header">
							<h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Отделы</h5>
							<button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
						</div>
						<div className="offcanvas-body">
							<ul className="navbar-nav flex-grow-1 pe-3">
								<li className="nav-item">
									<CustomLink children='Фрукты и овощи' link='/fruits'
										style="nav-link"/>
								</li>
								<li className="nav-item">
									<CustomLink children='Мясо' link='/meat'
										style="nav-link"/>
								</li>
								<li className="nav-item">
									<CustomLink children='Выпечка' link='/flour'
										style="nav-link"/>
								</li>
								<li className="nav-item">
									<CustomLink children='Молочное' link='/milk'
											style="nav-link"/>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		</>
	)
}

