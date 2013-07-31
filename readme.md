# jQuery Full Width Slider

A jQuery full width slider designed to be as compatible and lightweight as possible. Minified (JS & CSS) it weighs in at just 4KB.

Features:

* Total minified size - 4KB
* Fully Responsive
* Keeps image vertically centered
* Supports captions
* Resizes caption font for best viewing experience
* Multiple options
* Tested with:
	* Chrome 22 (OSX)
	* Safari 6 (OSX)
	* Firefox 16 (OSX)
	* iPad Safari (6.1)
	* iPhone Safari (6.1)
	* <strong>Important</strong>: if you want compatibility with IE8 and below add the following before your `</head>` tag:
```html
<!--[if lt IE 9]>
<script src="http://cdnjs.cloudflare.com/ajax/libs/respond.js/1.2.0/respond.js"></script>
<![endif]-->
```
		* IE6 - works but with no navigation circles under slides & no transparency
		* IE7 - works but with no navigation circles under slides 
		* IE8-IE10 - works fine


##Usage:

This uses a slight variation of the conditional IE detection originally proposed by Paul Irish. There are only a few things which rely on this (see the CSS file) so you're welcome to ignore this if old versions of Internet Explorer (<= 8) aren't important:

```html
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]> <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]> <html class="no-js lt-ie9"> <![endif]-->
<!--[if IE 9 ]> <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js"> <!--<![endif]-->
```

Include `slider.css` or `slider.min.css` and use the following html structure:

```html
<div class="full-width">
	<div class="inner">
		<div class="slide">
			<div><p>Lorem ipsum dolor sit amet, consectetur. <br>Curabitur molestie elit et ultricies vehicula.</p></div>
			<img src="http://lorempixel.com/1020/400/sports" width="1020" height="400">
		</div>
		<div class="slide">
			<!-- Caption can be omitted without any change in functionality -->
			<img src="http://lorempixel.com/1020/400/cats" width="1020" height="400">
		</div>
	</div>
	<div class="controls">
		<a href="#" class="left">&lt;</a>
		<a href="#" class="right">&gt;</a>
	</div>
	<div class="slide-nav"></div>
</div>
```

Then include `slider.js` or `slider.min.js` and initialise it using:

```javascript
$('.full-width').fullWidth();
```

The script automatically adds CSS classes like `slide-1`, `slide-2`, `slide-3` etc. which allows you to specifically target slides to add custom styles to.

 
##Options:

```javascript
$(selector).fullWidth({
	maxHeight	:	450, // maximum height of slider, px
	minHeight	:	375, // minimum height of slider, px
	delay		:	5000, // delay between slides, ms
	transition	:	1000, // transition speed, ms
	maxFont		:	36, // maximum font size, px
	minFont		:	24 // minimum font size, px
});
```	