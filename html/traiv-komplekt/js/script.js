$(function(){

	var $body = $('body');
	var $window = $(window);

	$(document).ready(function() {

		// plugins init

		if($.fn.bxSlider) {
			$('.js-slideshow').bxSlider({
				controls: false,
				pager: true,
				slideMargin: 10
			});

			$('.js-carousel').bxSlider({
				autoReload: true,
				pager: true,
				controls: false,
				infiniteLoop: false,
				moveSlides: 1,
				breaks: [{
							screen: 0,
							slides: 2,
					},
					{
							screen: 480,
							slides: 3,
					},
					{
							screen: 620,
							slides: 5,
					}, {
							screen: 1180,
							slides: 6,
					}]
			})

			$('[data-slide-index="0"]').addClass('active');

			$('[data-slide-index]').click(function(){
				$(this).closest('li').siblings().find('a').removeClass('active')
				$(this).addClass('active');
			})
		}

		if($.fn.selectbox) {
			$('select').selectbox();

			$('.selectbox__current').on('click', function(){
				$(this).addClass('is-active');
			})
		}

		if($.fn.validate){
			$(".js-validate").each(function(){

				$(this).validate({
					rules: {
						first_name: "required",
						second_name: "required",
						text: {
							required: true,
							minlength: 5
						},
						password: {
							required: true,
							minlength: 6
						},
						confirm_password: {
							required: true,
							equalTo: '#password'
						},
						new_password: {
							required: true,
							minlength: 6
						},
						confirm_new_password: {
							required: true,
							equalTo: '#new_password'
						},
						email: {
							required: true,
							email: true
						},
						phone: {
							required: true,
							minlength: 22
						}
					},

					messages: {
						password: {
							required: "",
							minlength: "Минимум 6 символов"
						},
						confirm_password: {
							required: "",
							equalTo: "Пароли не совпадают"
						},
						new_password: {
							required: "",
							minlength: "Минимум 6 символов"
						},
						confirm_new_password: {
							required: "",
							equalTo: "Пароли не совпадают"
						},
						email: "",
						phone: "",
						first_name: "",
						second_name: "",
						text: ""
					}
				});
			})
		}

		if($.fn.mask) {
			$('[name="phone"]').mask("+7 (999) 999 - 99 - 99");
		}

		if ($.fn.magnificPopup) {
			$('.btn-mfp-dialog').magnificPopup({
				type: 'inline',
        preloader: false
			});
		}


		// filter tooltip

		$('.c-filter .checkbox').click(function(){
			var $this = $(this);
			var offsetTop = $this.position().top;
			if($this.find('.checkbox__input').is(':checked')) {
				$('.c-filter__tooltip').css({'top' : offsetTop}).addClass('is-visible');
			} else {
				$('.c-filter__tooltip').removeClass('is-visible');
			}
		})


		// dialog

		$('[data-target]').on('click', function(e) {
			var id = $(this).attr('data-target');
			$('.layout').addClass('dialog-opened');
			$('.dialog').hide();
			$("[data-id='" + id +"']").show(0);

			e.preventDefault();
		});

		// location chooser

		$('.location-chooser__dropdown li').on('click', function() {
			var $this = $(this);
			var text = $this.text();

			$this.siblings().removeClass('is-active');
			$this.addClass('is-active');

			$('.location-chooser__current .location').html(text);
			closeDropdown();
		})

		// sticky header

		var $stickyElement = $('.bottom-bar__inner'),
				$stickyParent = $stickyElement.closest('.bottom-bar'),
				stickyElementHeight = $stickyElement.outerHeight(),
				stickyElementOffsetTop = $stickyParent.offset().top;

		$(window).resize(function() {
			stickyElementHeight = $stickyElement.outerHeight(),
			stickyElementOffsetTop = $stickyParent.offset().top;
		}).resize();

		function stick() {
			stickyElementOffsetTop = $stickyParent.offset().top;
			var windowTop = $(window).scrollTop();

			if (windowTop > stickyElementOffsetTop) {
				$stickyParent.css({'padding-bottom' : stickyElementHeight});
				$stickyElement.addClass('is-fixed');
			} else {
				$stickyElement.removeClass('is-fixed');
				$stickyParent.removeAttr('style');
			}
		}
		stick();

		$(window).on('scroll', function(){
			stick();
		})

		// item counter

		$('.item-counter__increase').on('click', function (e) {
			var $qty = $(this).closest('.item-counter').find('input');
			var currentVal = parseInt($qty.val());
			if (!isNaN(currentVal)) {
				$qty.val(currentVal + 1);
			}
			e.preventDefault();
		});

		$('.item-counter__decrease').on('click', function (e) {
			var $qty = $(this).closest('.item-counter').find('.item-counter__input');
			var currentVal = parseInt($qty.val());
			if (!isNaN(currentVal) && currentVal > 1) {
				$qty.val(currentVal - 1);
			}
			e.preventDefault();
		});

		$('.item-counter input').keyup(function () {
			this.value = this.value.replace(/[^0-9\.]/g,'');
		});

		// collapse tab on click

		$(".tabs-nav__link").click(function(e) {

			var activeTab = $(this).attr("href");
			$(activeTab).siblings('.pane').removeClass('is-visible');
			$(activeTab).addClass('is-visible');

			$(this).closest('li').siblings().removeClass("is-active");
			$(this).closest('li').addClass("is-active");

			e.preventDefault();
		});

		$('.layout').on('click', function(e){
			if (!$(e.target).closest('.categories').length) {
				closeCategories();
			}
			if (!$(e.target).closest('.dropdown').length) {
				closeDropdown();
			}
			if (!$(e.target).closest('.dialog-holder, nav').length) {
				closeDialog();
			}
			if (!$(e.target).closest('.nav-outer').length) {
				closeNav();
			}
		})

		$('.global-search__toggle').on('click', function(e){
			var $this = $(this),
					$parent = $this.closest('.global-search');

			var stateActive = 'is-active';

			if (!$parent.hasClass(stateActive)){
				$parent.addClass(stateActive);
				$parent.find('.global-search__input').focus();
			} else {
				$parent.removeClass(stateActive);
				$parent.find('.global-search__input').val('');
			}

			e.preventDefault();
		})

		if ($('#map').length > 0) {
			ymaps.ready(function() {
				var MAP,
						place;
				MAP = new ymaps.Map('map', {
				center: [59.9107, 30.3552],
				zoom: 16
				});
				place = new ymaps.Placemark([59.9107, 30.3552]);
				MAP.geoObjects.add(place);
				MAP.behaviors.disable('scrollZoom')
			});
		}

		toggleClass('.nav-toggle', '.layout', 'nav-opened');
		toggleClass('.btn-collapse', '.order-table__item', 'is-opened');
		toggleClass('.product-details__toggle', '.product-details', 'is-opened');
		toggleClass('.categories__toggle', '.layout', 'categories-opened');
		toggleClass('.dropdown-toggle', '.dropdown', 'is-opened');
		toggleClass('.pane-toggle', '.pane', 'is-d-visible');
		toggleClass('.c-filter__toggle', '.c-filter__section', 'is-opened');

		appendOnResize();

	}) // document.ready();

	// toggle parent class
	function toggleClass(item, target, state) {
		$(item).click(function(e){
			var $this = $(this);

			if(!$this.closest(target).hasClass(state)) {
				$this.closest(target).addClass(state);
			} else {
				$this.closest(target).removeClass(state);
			}
			e.preventDefault();

		})
	}

	function closeNav() {
		$('.layout').removeClass('nav-opened');
	}

	function closeDialog() {
		$('.dialog').hide(0);
		$('.layout').removeClass('dialog-opened');
	}

	function closeDropdown() {
		$('.dropdown').removeClass('is-opened');
	}

	function closeCategories() {
		$('.layout').removeClass('categories-opened');
	}

	function appendOnResize(){
		var flag640,
				flag1024;

		$(window).resize(function () {
			if (flag1024 !== false && window.innerWidth <= 1024) {
				$('.auth-controls').prependTo('.nav');
				$('.location-chooser').prependTo('.top-bar__right');
				flag1024 = false;
			}

			else if (flag1024 !== true && window.innerWidth > 1024) {
				$('.auth-controls').prependTo('.auth');
				$('.location-chooser').prependTo('.middle-bar__cell:first-child');
				flag1024 = true;
			}
		}).resize();
	}

}.call(this));
