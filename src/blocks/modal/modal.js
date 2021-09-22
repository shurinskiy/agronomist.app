import { disablePageScroll, enablePageScroll } from 'scroll-lock';
// import "inputmask/lib/jquery.inputmask";

(() => {
	let cls = 'modal';


	/* Модальное окошко */
	$(`<div id='${cls}__underlay' class='${cls}'>
		<div class='${cls}__body'>
			<span class='${cls}__close'></span>
			<div class='${cls}__content' data-scroll-lock-scrollable></div>
		</div>
	</div>`).appendTo($('body'));

	let $modal = $(`#${cls}__underlay`);

	let close = function(e) {
		e.preventDefault();
		enablePageScroll();

		$modal
			.attr('class', `${cls}`)
			.find(`.${cls}__content`)
			.empty()
			.end()
			.hide();
	}

	let open = function(e) {
		e.preventDefault();
		disablePageScroll();
		
		if ($modal.is(":visible")) close(e);
		let id = $(this).data('modal') || 'error';
		let content = (id == '#') ? $(this).html() : $('#' + id).html();

		$modal
			.addClass(`${cls}_${id}`)
			.find(`.${cls}__content`)
			.html(content)
			.end()
			.fadeIn();

		// $modal.find('input.phone[type="tel"]').inputmask();	
	}
	
	// Открыть модальное окно
	$(`[data-${cls}]`).on('click', open);
	// Открыть модальное окно из уже открытого окна
	$modal.on('click', `[data-${cls}]`, open);
	// Закрыть окошко
	$(`.${cls}__close`).on('click', close);
	// Закрыть по клику мимо окошка или esc
	$(window).on('click keyup', function(e) {
		if (e.target == $modal[0] || e.which == 27) close(e);
	});

})();