(function($) {
	$.fn.numberedSlider = function(options) {
		var settings = $.extend({
			exclude: null,
			navType: "number"
		}, options);
		return this.each(function() {
			var gEl = this;
			var startX, startY;

			var bindIt = function(element) {
				var thisEl = $(element).get(0);
				thisEl.addEventListener('touchstart', touchSliderStart, false);
				thisEl.addEventListener('touchmove', touchSliderMove, false);
				thisEl.addEventListener('touchend', function() {
					touchSliderEnd(event, thisEl);
				}, false);
			};
			var touchSliderStart = function(e) {
				var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
				startX = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
				startY = parseInt(touchobj.clientY);
			};
			var touchSliderMove = function(e) {
				var touchobj = e.changedTouches[0]; // reference first touch point for this event
				var dist = parseInt(touchobj.clientX) - startX;
				var distY = parseInt(touchobj.clientY) - startY;
				if (Math.abs(distY) > Math.abs(dist)) {
					return;
				} else {
					e.preventDefault();
				}
			};
			var touchSliderEnd = function(e, el) {
				var touchobj = e.changedTouches[0]; // reference first touch point for this event
				var $el = el;
				var dist = parseInt(touchobj.clientX) - startX;
				if (Math.abs(dist) > 40) {
					e.preventDefault();
					changeImage($el, ((dist > 0) ? "previous" : "next"));
				}
			};

			var setupSlider = function(gal) {
				var $g = $(gal);
				$g.addClass('slider-container').append('<div class="slider' + (settings.navType == "number" ? ' number-nav' : ' thumb-nav') + '"><div class="slider-list" style="text-align: left; left: 50%; position: absolute;. display: block; white-space: nowrap;"></div><ul class="slider-nav" style="list-style: none;display: block; position: absolute; bottom: 100%; left: 0;"></ul></div>');
				var $s = $g.find('.slider');
				var $l = $g.find('.slider-list');
				var $n = $g.find('.slider-nav');
				if (settings.exclude) {
					$g.children().not(settings.exclude).not($s).each(function(index) {
						$(this).hide().clone().show().appendTo($l).css({
							'display': 'inline-block'
						}).addClass(index === 0 ? 'current' : '').find('.product-name').append('<span style="top: 100%; left: 50%; margin-top: 4px; -webkit-transform: translateX(-50%); -moz-transform: translateX(-50%); -ms-transform: translateX(-50%); transform: translateX(-50%); position: absolute;font-family: FuturaBT-Light;font-size: 14px;letter-spacing: 1px;line-height: 100%;text-transform: lowercase;">view</span>');
						if (settings.navType == "thumb" || settings.navType == "thumbnail") {
							$n.append('<li class="thumb' + (index === 0 ? ' current' : '') + '" style="background-image: ' + $(this).css('background-image').replace(/\"/g, '\'') + ';"><div class="overlay" style="background-image: ' + $(this).css('background-image').replace(/\"/g, '\'') + ';"></div></li>');
						}
						if (settings.navType == "number") {
							$n.append('<li class="number' + (index === 0 ? ' current' : '') + '" >' + (index + 1) + '</li>');
						}
					});
				} else {
					$g.children().not($s).each(function(index) {
						$(this).hide().clone().show().appendTo($l).css({
							'display': 'inline-block'
						}).addClass(index === 0 ? 'current' : '').find('.product-name').append('<span style="top: 100%; left: 50%; margin-top: 4px; -webkit-transform: translateX(-50%); -moz-transform: translateX(-50%); -ms-transform: translateX(-50%); transform: translateX(-50%); position: absolute;font-family: FuturaBT-Light;font-size: 14px;letter-spacing: 1px;line-height: 100%;text-transform: lowercase;">view</span>');
						if (settings.navType == "thumb" || settings.navType == "thumbnail") {
							$n.append('<li class="thumb' + (index === 0 ? ' current' : '') + '" style="background-image: ' + $(this).css('background-image').replace(/\"/g, '\'') + ';"><div class="overlay" style="background-image: ' + $(this).css('background-image').replace(/\"/g, '\'') + ';"></div></li>');
						}
						if (settings.navType == "number") {
							$n.append('<li class="number' + (index === 0 ? ' current' : '') + '" >' + (index + 1) + '</li>');
						}
					});
				}
				$s.css({
					'height': $l.children().first().outerHeight() + $n.outerHeight() + 70 + 'px'
				});
				$l.css({
					'margin-left': -$l.children().first().outerWidth() / 2 + 'px',
					'top': (settings.navType == "number" ? ($n.outerHeight() + 20) : 0) + 'px'
				});

				if ($n) {
					$n.find('li').click(function(e) {
						e.preventDefault();
						changeImage($s, $(this).index());
					});
				}
				bindIt($s);
			};

			var destroy = function() {
				$(gEl).removeClass('slider-container').find('.slider').remove();
				if (settings.exclude) {
					$(gEl).children().not(settings.exclude).show();
				} else {
					$(gEl).children().show();
				}
			};

			var changeImage = function(slider, dir) {
				var $s = $(slider);
				var $nav = $s.find('.slider-nav');
				var $l = $s.find('.slider-list') || null;
				var $c = $l.find('.current') || null;
				var d = dir;
				if ($l && $c) {
					switch (d) {
						case 'previous':
							if ($c.prev().length > 0) {
								$c.removeClass('current').prev().addClass('current');
								$nav.find('.current').removeClass('current').prev().addClass('current');
								$l.stop().animate({
									'margin-left': -($l.find('.current').position().left + ($l.find('.current').outerWidth() / 2)) + 'px'
								}, 250);
							} else {
								break;
							}
							break;
						case 'next':
							if ($c.next().length > 0) {
								$c.removeClass('current').next().addClass('current');
								$nav.find('.current').removeClass('current').next().addClass('current');
								$l.stop().animate({
									'margin-left': -($l.find('.current').position().left + ($l.find('.current').outerWidth() / 2)) + 'px'
								}, 250);
							} else {
								break;
							}
							break;
						default:
							if ($c.index() != d) {
								$c.removeClass('current');
								$l.children(':eq(' + d + ')').addClass('current');
								$nav.find('.current').removeClass('current');
								$nav.children(':eq(' + d + ')').addClass('current');
								$l.stop().animate({
									'margin-left': -($l.find('.current').position().left + ($l.find('.current').outerWidth() / 2)) + 'px'
								}, 250);
							}
							break;
					}
				}
			};
			if (options == "destroy") {
				if ($(gEl).hasClass('slider-container')) {
					destroy();
				}
			} else {
				if (!$(gEl).hasClass('slider-container')) {
					var $thisEl = $(gEl);
					setupSlider($(gEl));
					var $s = $(gEl).find('.slider');
					var $l = $(gEl).find('.slider-list') || null;
					var $n = $(gEl).find('.slider-nav') || null;
					$(window).resize(function() {
						$s.css({
							'height': $l.children().first().outerHeight() + $n.outerHeight() + 70 + 'px'
						});
						$l.css({
							'margin-left': -($l.find('.current').position().left + ($l.find('.current').outerWidth() / 2)) + 'px',
							'top': (settings.navType == "number" ? ($n.outerHeight() + 20) : 0) + 'px'
						});
					});
				}
			}
		});
	};
}(jQuery));