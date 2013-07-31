# jQuery Full Width Slider

A jQuery full width slider designed to be as compatible and lightweight as possible. Minified (JS & CSS) it weighs in at just 3KB.

Features:

* Total minified size - 3KB
* Fully Responsive
* Keeps image vertically centered
* Supports captions
* Resizes caption font for best viewing experience
* Multiple options


Usage:

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

 
Options:

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