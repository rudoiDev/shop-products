import React from 'react';
import './container.scss';
import { useSelector, useDispatch } from 'react-redux';
import { deleteElem, removeStorage } from '@/store/reducers/cartSlice';
import { selectAllData } from '@/store/reducers/dataSlice'; // данные
import { selectCart, selectCount, selectCartCount } from '@/store/reducers/cartSlice'; // хранилище

export default () => {
	const dispatch = useDispatch();

	const cartInfo = useSelector(selectAllData); // данные
	const cartData = useSelector(selectCart); // хранилище value
	const count = useSelector(selectCount); // хранилище result
	const cartCount = useSelector(selectCartCount) // хранилище стоимости отдельных покупок
	const cartReduce = cartInfo.reduce((accum, item) => {
		accum[item['id']] = item;
		return accum;
	}, {}); // переформировываем массив данных, чтобы ключем был id. Так проще осуществлять поиск нужного элемента

	let inputHandle = () => {
		let input = document.querySelector('.form-control');
		let valid = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
		if (valid.test(input.value)) {
			input.classList.remove('is-invalid');
			input.classList.add('is-valid');
			return true
		} else if (input.value == 0) {
			input.classList.remove('is-valid');
			input.classList.remove('is-invalid');
			return true
		} else {
			input.classList.remove('is-valid');
			input.classList.add('is-invalid');
			return false
		}
	}

	let submitHandle = e => {
		e.preventDefault();
		if (!inputHandle()) {
			return false
		} else {
		 let modalParent = document.querySelector('.modal');
		 let modalChildren = document.querySelector('.modal-dialog');

		 modalChildren.style.display = 'none';
		 modalParent.insertAdjacentHTML('beforeend', `
			<div class="spinner-border spinner text-success" role="status">
				<span class="visually-hidden">Загрузка...</span>
			</div>
		 `)
		 setTimeout(() => {
			document.querySelector('.spinner').remove();
			modalChildren.style.display = 'flex';
			let modalBody = document.querySelector('.modal-body');
			let modalHeader = document.querySelector('.modal-header');
			modalHeader.style.display = 'none';

			modalBody.innerHTML = `
				<div className="modal-body">
					<div class="success">Успешно!</div>
				</div>
			`
			setTimeout(() => {
				window.location.reload();
				dispatch(removeStorage());
			}, 2000);
		 }, 3000)
		}
	}

	function deleteProduct(e) {
		const dataID = e.target.getAttribute('data-id');
		console.log(e.target.getAttribute('data-id') )
		if (confirm(`Удалить из корзины: ${cartReduce[dataID].name}: ${cartData[dataID]} шт.`)) {
			dispatch(deleteElem(cartReduce[dataID].id))
		}
	}

	function clearStorage() {
		if (confirm('Очистить корзину?')) {
			dispatch(removeStorage())
		}
	}

	return (
		<>
			<div className="container container_count">
				<h2>Корзина:</h2>
				<ul className="container_wrapper">
					{Object.keys(cartData).map(elem => {
						return (
							<li key={elem}>{cartReduce[elem]['name']}: {cartData[elem]} шт. - <span> {cartCount[elem]} руб.
								</span> 
								<i className="fa fa-check-circle-o" aria-hidden="true" />
								<button type="button" className="btn_container btn btn-outline-danger" data-id={cartReduce[elem].id} onClick={deleteProduct}>
									<i className="fa fa-times" aria-hidden="true" data-id={cartReduce[elem].id}></i>
								</button>
							</li>
						)
					})}
					<hr />
					{count != 0
						?
						<div className="container_result">
							<i className="fa fa-shopping-basket" aria-hidden="true"></i>
							<div className="result_sum">Сумма к оплате: <span>{count} руб.</span>
							</div>
							<div className="container_buttons">
								<button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Перейти к оплате</button>
								<button type="button" className="btn btn-outline-danger" onClick={clearStorage}>Очистить корзину</button>
							</div>
							</div>
						: <div>Нет покупок</div>
					}
				</ul>
			</div>
			<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">Заполните форму</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="mb-3">
									<label htmlFor="exampleInputEmail1" className="form-label">Адрес электронной почты:</label>
									<input type="email" placeholder='E-mail' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={inputHandle} />
									<div id="emailHelp" className="form-text">Мы никогда никому не передадим вашу электронную почту.</div>
								</div>
								<div className="mb-3 form-check">
									<input type="checkbox" className="form-check-input" id="exampleCheck1" />
									<label className="form-check-label" htmlFor="exampleCheck1">Подписаться на рассылку </label>
								</div>
								<ul className="container_wrapper">
								{Object.keys(cartData).map(elem => {
										return (
											<li key={elem}>{cartReduce[elem]['name']}: {cartData[elem]} шт. - <span> {cartCount[elem]} руб.
												</span> 
												<i className="fa fa-check-circle-o" aria-hidden="true" />
											</li>
										)
									})}
									<hr />
									<div className="result_sum">Сумма к оплате: <span>{count} руб.</span>
									</div>
								</ul>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Вернуться к покупкам</button>
									<button type="submit" id="liveToastBtn" onClick={submitHandle} className="btn btn-primary">Оплатить</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


