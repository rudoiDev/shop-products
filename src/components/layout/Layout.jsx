import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from './outletComponents/header/Header';
import Container from './outletComponents/container/Container';
import Footer from './outletComponents/footer/Footer';
import Main from '../main/Main'

export default () => {
	const id = useLocation()
	return (
		<>
			<Header />
			<Outlet />
			{
				id.pathname == '/' || id.pathname == '/dev/index.html' || id.pathname == '/dist/index.html' 
					? ''
					: <Container />
			}
			<Footer />
		</>
	);
}


