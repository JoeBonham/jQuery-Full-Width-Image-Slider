(function($){ 
    
    "use strict";
    
    $.fn.fullWidth = function(options) {
            
        var defaults = {
            maxHeight   :    450,
            minHeight   :    375,
            delay       :    5000,
            transition  :    1000,
            maxFont     :    36,
            minFont     :    20
        }, settings = $.extend(defaults, options);
        
        var cssTrans  = (function() {
            var elem = document.createElement('p').style,
                prefix = ['Webkit','Moz','O','ms','Khtml'];
        
            if( elem['transition'] == '' ){
                return true;
            }
            while( prefix.length ){
                if( prefix.pop() + 'Transition' in elem ){
                    return true;
                }
            }
            return false;
        }());
        
        return this.each( function() {
        
            var full    =    $(this),
            inner       =    full.find('.inner'),
            slides      =    inner.find('.slide'),
            images      =    slides.find('img'),
            nav         =    full.find('.slide-nav'),
            controls    =    full.find('.controls a'),
            navCircles  =    '',
            smallest    =    9999,
            status      =    {current : 0, previous : 0, max : slides.length - 1},
            timers      =    {slides : '', resize : ''},
            
            move = function(direction, current){
                if(inner.is(':animated')) return;
            
                stop();
            
                status.previous = status.current;
            
                if(direction === 'right'){
                    status.current = status.current+1 > status.max ? 0 : status.current+1;
                }else if(direction === 'left'){
                    status.current = status.current-1 < 0 ? status.max : status.current-1;
                }else{
                    status.current = current || 0;
                }
            
                navCircles.removeClass('current').eq(status.current).addClass('current');
                full.trigger( 'fws.start', { 'status' : status, 'direction' : direction } );
                
                if(cssTrans){
                    inner.css({ 'margin-left' : '-' + 100 * status.current + '%' });
                    setTimeout(function(){ start(); }, settings.transition);
                }else{
                    inner.animate({ 'margin-left' : '-' + 100 * status.current + '%' }, settings.transition, function(){ start(); });
                }
            
            },
            start = function(){
                full.trigger( 'fws.finish', { 'status' : status } );
                timers.slides = setTimeout(function(){ move('right'); }, settings.delay);
            },
            stop = function(){
                clearTimeout(timers.slides);
            },
            resize = function(){
                
                var wWidth    =    $(window).width(),
                newHeight     =    parseInt(wWidth/3, 10),
                imageCSS      =    wWidth <= smallest ? ['100%', 'auto', '9999'] : ['', '', ''],
                start         =    inner.height(),
                divCSS        =    wWidth <= 480 ? ['0', '100%', 'none'] : ['', '', ''],
                size          =    wWidth/41;
                /*
                size equals window width divided by 41 - 41 was chosen as it creates a nicely proportionate font size.
                However, you can experiment with this if you want a generally larger or smaller size to be set.
                For example: a width of 960px/41 = 23.4px, with 20 instead of 41 you'd get a font size of 48px.
                It really depends on what kind of content you're displaying and how much text you've got on each slide.
                */    
                
                size = size > settings.maxFont ? settings.maxFont : 
                            (size < settings.minFont ? settings.minFont : size);

                inner.css('height', function(){
                    return newHeight > settings.maxHeight ? settings.maxHeight : 
                            (newHeight < settings.minHeight ? settings.minHeight : newHeight);
                });

                images.css({
                    'margin-top' : function(){
                        var curr = $(this).height();
                        return '-'+(start > curr ? 0 : curr-start)/2+'px';
                    },
                    'height' : imageCSS[0], 'width' : imageCSS[1], 'maxWidth' : imageCSS[2]
                });

                slides.find('div').css({
                    'font-size' : size, 
                    'top' : function(){
                        var diff = start-$(this).height();
                        return wWidth <= 480 ? diff : diff/2;
                    },
                    'padding' : divCSS[0], 'width' : divCSS[1]
                }).find('br').css('display', divCSS[2]);
                
            },
            attachEvents = function(){
            
                $(window).resize(function(){
                    clearTimeout(timers.resize);
                    timers.resize = setTimeout(function(){ resize(); }, 100);
                }).trigger('resize');
                
                controls.on('click', function(){
                    move(this.className);
                    return false;
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
                    move(e.which === 37 ? 'left' : 'right');
                });
    
            };
        
            (function(){
                
                images.each(function(){
                    var w = $(this).attr('width');
                    smallest = w < smallest ? w : smallest;
                });
                
                slides.css('width', parseFloat(100/slides.length, 10)+'%')
                      .each(function(i){
                          $(this).addClass('slide-'+(i+1));
                          nav.append('<span>&bull;</span>');
                      }).find('div').wrapInner('<p />');
                
                inner.css({
                    height: settings.minHeight,
                    transition: settings.transition+'ms',
                    width: (slides.length*100)+'%'
                });
                
                navCircles = nav.find('span');
                navCircles.first().addClass('current');
                nav.css('width', function(){
                    return navCircles.length*26;
                });
                
                $(window).load(function() {
                    attachEvents();
                    full.trigger( 'fws.start', { 'status' : status, 'direction' : 'direct' } );
                    inner.fadeTo(1000, 1, function(){
                        start();
                    });
                });
            }());
        
        });
    };
     
}(jQuery));
