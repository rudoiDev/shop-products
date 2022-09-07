export default function elemScroll(item, cls, time) {
	if (item.length > 0) {
		window.addEventListener('scroll', animOnScroll);
		function animOnScroll() {
			for (let index = 0; index < item.length; index++) {
				const animItem = item[index];
				const animItemHeigth = animItem.offsetHeight;
				const animItemOffset = offset(animItem).top;
				const animStart = 4;
				let animItemPoint = window.innerHeight - animItemHeigth / animStart;
				if (animItemHeigth > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart;
				}
	
				if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeigth)) {
					animItem.style.visibility = 'visible';
					animItem.classList.add(cls);
					animItem.setAttribute('data-complete', true)
				} else {
					if (!animItem.classList.contains('_anim-no-hide')) {
						animItem.classList.remove(cls);
					}
				}
			}
		}
		setTimeout(() => {
			animOnScroll();
			setTimeout(() => {
				window.removeEventListener('scroll', animOnScroll)
			}, 10000)
		}, time);
		function offset(el) {
			const rect = el.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
		}
	}
}