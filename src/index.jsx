import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './components/app/App';
import { Provider } from 'react-redux';
import store from './store/Storage';


ReactDOM.render(
		<HashRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>, 
document.getElementById('root'))


