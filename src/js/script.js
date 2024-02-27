$(document).ready(function(){
	$('.carousel__inner').slick({
		dotsClass: 'slick-dots',
		speed: 1200,
		// adaptiveHeight: true,
		prevArrow: '<button type="button" class="slick-prev"><img src="img/left.svg"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="img/right.svg"></button>',
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					arrows: true
				},
			},
			{
				breakpoint: 980,
				settings: {
					arrows: false,
					dots: true
				},
			}
		]
	});

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});


	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			});
		});
	};

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

	// Modal

	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn('quick');
	});
	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #thanks, #order').fadeOut('quick');
	});

	$('.button_mini').each(function(i) {
		$(this).on('click', function(){
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('quick'); 
		});
	});

	// $('#consultation-form').validate();
	// $('#consultation form').validate({
	//     rules: {
	//         name: "required",
	//         phone: "required",
	//         email: {
	//             required: true,
	//             email: true
	//         }
	//     },
	//     messages: {
	//         name: "Пожалуйста, введите свое имя",
	//         phone: "Пожалуйста, введите свой номер",
	//         email: {
	//           required: "Пожалуйста, введите свою почту",
	//           email: "Неправильно введен адрес почты, name@domain.com"
	//         }
	//       }
	// });
	// $('#order form').validate();

	function valideForms(form){
		$(form).validate({
			rules: {
				name: 'required',
				phone: 'required',
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: 'Пожалуйста, введите свое имя',
				phone: 'Пожалуйста, введите свой номер',
				email: {
					required: 'Пожалуйста, введите свою почту',
					email: 'Неправильно введен адрес почты, name@domain.com'
				}
			}
		});
	};

	valideForms('#consultation-form');
	valideForms('#consultation form');
	valideForms('#order form');


	$('input[name=phone]').mask('+994(99) 999-9999');
    
	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: 'mailer/smart.php',
			data: $(this).serialize()
		}).done(function() {
			$(this).find('input').val('');
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset');
		});
		return false;
	});

	// smooth scroll and pageup	
	$(window).scroll(function() {
		if ($(this).scrollTop() > 1000) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$('a[href^=\'#\']').click(function(){
		const _href = $(this).attr('href');
		$('html, body').animate({scrollTop: $(_href).offset().top+'px'});
		return false;
	});

});