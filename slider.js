(function($){ 
	
	"use strict";
	
	$.fn.fullWidth = function(options) {
		
		var settings = $.extend({
							maxHeight	:	450,
							minHeight	:	375,
							delay		:	5000,
							transition	:	1000,
							maxFont		:	36,
							minFont		:	24
						}, options);
						
		return this.each( function() {
		
			var full	=	$(this),
			inner		=	full.find('.inner'),
			slides		=	inner.find('.slide'),
			images		=	slides.find('img'),
			nav			=	full.find('.slide-nav'),
			controls	=	full.find('.controls a'),
			navCircles	=	'',
			status		=	{current : 0, max : slides.length - 1},
			timers		=	{slides : '', resize : ''};
						
			var move = function(direction, current){
				if(inner.is(':animated')) return;
			
				stop();
			
				if(direction === 'right'){
					status.current = status.current+1 > status.max ? 0 : status.current+1;
				}else if(direction === 'left'){
					status.current = status.current-1 < 0 ? status.max : status.current-1;
				}else if(direction === 'direct'){
					status.current = current || "0";
				}
			
				navCircles.removeClass('current').eq(status.current).addClass('current');
				inner.animate({'margin-left' : '-'+100*status.current+'%'}, settings.transition ,function(){ start(); });
			
			};
			
			var start = function(){
				timers.slides = setTimeout(function(){ move('right'); }, settings.delay);
			};
			
			var stop = function(){
				clearTimeout(timers.slides);
			};
			
			var resize = function(){
				
				inner.css('height', function(){
					var newHeight = parseInt($(window).width()/3, 10);
					return newHeight > settings.maxHeight ? settings.maxHeight : newHeight < settings.minHeight ? settings.minHeight : newHeight;
				});
				
				images.css('margin-top', function(){
					var start = inner.height(), curr = $(this).height();
					return '-'+(start > curr ? start-curr : curr-start)/2+'px';
				});
				
				slides.find('div').css('font-size', function(){
					var size = $(window).width()/41;
					size = size > settings.maxFont ? settings.maxFont : size;
					size = size < settings.minFont ? settings.minFont : size;
					size = $(window).width() < 480 ? 20 : size;
					return size;
				}).css('top', function(){
					var diff = inner.height()-$(this).height();
					return $(window).width() <= 480 ? diff : diff/2;
				});
			
			};
		
			var attachEvents = function(){
			
				$(window).resize(function(){
					clearTimeout(timers.resize);
					timers.resize = setTimeout(function(){ resize(); }, 100);
				}).trigger('resize');
				
				controls.on('click', function(e){
					e.preventDefault();
					move(this.className);
				});
				
				full.on('mouseenter mouseleave', function(e){
					if(controls.is(':animated')) return;
					e.type === 'mouseenter' ? controls.fadeIn() : controls.fadeOut();
				});
				
				navCircles.on('click', function(){
					move('direct', $(this).index());
				});
				
				$(document).on('keydown', function(e){
					if(!(e.which === 37 || e.which === 39)) return;
					var dir = e.which === 37 ? 'left' : 'right'; 
					move(dir);
				});
	
			};
		
			(function(){
				slides.each(function(i){
					$(this).addClass('slide-'+(i+1));
				});
				
				inner.css('width',  (slides.length*100)+'%');
				
				slides.css('width',  parseInt(100/slides.length, 10)+'%').each(function(){
					nav.append('<span>&bull;</span>');
				});
				
				navCircles = nav.find('span');
				navCircles.first().addClass('current');
				nav.css('width', function(){
					return navCircles.length*26;
				});
				
				$(window).load(function() {
					attachEvents();
					inner.fadeTo(1000, 1, function(){
						start();
					});
				});
			}());
		
		});
	};
	 
}(jQuery));
