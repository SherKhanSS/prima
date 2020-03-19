(function ($, window, document) {
	$.fn.buttonPageScroller = function(options) {

		var defaults = {
			element: {
				button: 'button-page-scroller',
				body: this,
				relative: 'button-page-scroller-relative',
				triangle: 'button-page-scroller-triangle'
			},
			position: ['bottom', 'right'],
			trigger: false,
			distance: 100,
			padding: '5%',
			width: '100px',
			height: '100px',
			transition: 'visibility 0s, opacity 0.5s linear',
			background: {
				normal: 'rgba(0,0,0,0.5)',
				hover: 'rgba(0,0,0,0.4)'
			},
			triangle: {
				// transition		: 'all 0.3s ease',
				bgColor: 'rgba(255,255,255,0.9)'
			},
			shadow: '0px 0px 0px 10px rgba(231,247,255,1)',
			animate: {
				speed: 500,
				scrollTop: 0
			},
			css: {
				show: {
					'visibility': 'visible',
					'opacity': 1
				},
				hide: {
					'visibility': 'hidden',
					'opacity': 0
				},
				button: {
					'position'				: 'fixed',
					'z-index'				: '20',
					'border-radius'			: '50%',
					'cursor'				: 'pointer',
					'opacity' 			: 0,
					'visibility'       : 'hidden'
				},
				relative: {
					'position'				: 'relative',
					'display'				: 'flex',
					'justify-content'		: 'center',
					'align-items'			: 'center'
				},
				triangle: {
					'width'					: 0,
					'height'				: 0,
					'border-style'			: 'solid',
				},
				buttonHover: {
					'transform' : 'scale(1.3)'
				},
				buttonNormal: {
					'transform' : 'scale(1)'
				}
			}
		};

		options = $.extend(defaults, options);

		var constructor = {
			isMobile: function() {
				return (/Mobi/.test(w.navigator.userAgent)) ? true : false;
			},
			show: function() {
				if (options.trigger === false) {
					$('div#' + options.element.button).css(options.css.show);
					options.trigger = true;
				}
			},
			hide: function() {
				if (options.trigger === true) {
					$('div#' + options.element.button).css(options.css.hide);
					options.trigger = false;
				}
			},
			pxreplace: function(s) {
				return s.replace('px', '');
			},
			initialize: function() {
				var buttonPos = {},
					buttonSize = {},
					triangleSize = {},
					triangleColor = {},
					bgColor = {},
					bgHoverColor = {},
					buttonShadow = {},
					transitionOpts = {};

				triangleSize['border-width'] = '0px '
					+ Math.floor(this.pxreplace(options.width) / 5) + 'px '
					+ Math.floor(this.pxreplace(options.width) / 3) + 'px '
					+ Math.floor(this.pxreplace(options.width) / 5) + 'px';

				buttonPos[options.position[0]] = options.padding;
				buttonPos[options.position[1]] = options.padding;
				buttonSize.width = options.width;
				buttonSize.height = options.height;
				transitionOpts['transition'] = options.transition;
				bgColor['background-color'] = options.background.normal;
				bgHoverColor['background-color'] = options.background.hover;
				buttonShadow['box-shadow'] = options.shadow;
				triangleColor['border-color'] = 'transparent transparent ' + options.triangle.bgColor + ' transparent';
				buttonPos = $.extend(transitionOpts, buttonShadow, bgColor, buttonPos, buttonSize);
				options.css.button = $.extend(options.css.button, buttonPos);
				options.css.relative = $.extend(options.css.relative, buttonSize);
				options.css.triangle = $.extend(options.css.triangle, triangleSize);
				options.css.buttonHover = $.extend(options.css.buttonHover, bgHoverColor);
				options.css.buttonNormal = $.extend(options.css.buttonNormal, bgColor);
				options.css.triangle = $.extend(options.css.triangle, triangleColor);

				$('<div/>', {
					id: options.element.button,
					css: options.css.button
				}).appendTo(options.element.body);

				$('<div/>', {
					id: options.element.relative,
					css: options.css.relative
				}).appendTo('#' + options.element.button);

				$('<div/>', {
					id: options.element.triangle,
					css: options.css.triangle
				}).appendTo('#' + options.element.relative);

				// if (window.window.innerWidth <= 600) {
				//	$('#' + options.element.button).css(options.css.mobile.button);
				//	$('#' + options.element.triangle).css(options.css.mobile.triangle);
				// }

				options.scrollTop = $(window).scrollTop();
				if (options.scrollTop >= options.distance)
					constructor.show();

				$(window).scroll(function () {
					options.scrollTop = $(this).scrollTop();
					if (options.scrollTop >= options.distance)
						return constructor.show();
					else
						return constructor.hide();
				});


				$('div#' + options.element.button).hover(function() {
					$(this).css(options.css.buttonHover);
				}, function() {
					$(this).css(options.css.buttonNormal);
				});

				$('div#' + options.element.button).on('touchstart click', function() {
					$('body,html').animate(options.animate, options.animate.speed);
					return false;
				});
			}
		};

		return constructor.initialize();
	};

	$(document).ready(function($) {

		// plugin initialization
		$('body').buttonPageScroller({
			distance		: 200,

			// page scroller position
			position		: [ 'bottom', 'right' ],
			// page scroller position padding
			padding			: '5%',
			transition		: 'all 0.3s ease',
			// button styles
			background 		: {
				normal: 'rgba(190, 91, 96, 0.9)',
				hover: 'rgba(190, 91, 96, 1)'
			},
			// button shadow
			shadow 			: '0px 0px 0px 10px rgba(219,218,215,1)',
			// triangle button styles
			triangle 		: {
				// transition		: 'all 0.3s ease',
				bgColor: 'rgba(255,255,255,0.9)'
			},
			// button width
			width			: '40px',
			// button height
			height			: '40px'
		});
	});

})(jQuery, window, document);
