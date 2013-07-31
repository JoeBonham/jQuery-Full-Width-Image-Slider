# jQuery Full Width Slider

A jQuery full width slider designed to be a compatible and lightweight as possible. Minified (JS & CSS) it weighs in at just 3KB.

Features:

* Total minified size - 3KB
* Fully Responsive
* Keeps image vertically centered
* Supports captions
* Resizes caption font for best viewing experience
* Clean, valid code
* Can define multiple options


Usage:

HTML structure, add as many `<div class="slide">…</div>` as you need.
```html
<div class="full-width">
	<div class="inner">
		<div class="slide">
			<div><p>Lorem ipsum dolor sit amet, consectetur. <br>Curabitur molestie elit et ultricies vehicula.</p></div>
			<img src="http://lorempixel.com/1020/400/sports" width="1020" height="400">
		</div>
	</div>
	<div class="controls">
		<a href="#" class="left">&lt;</a>
		<a href="#" class="right">&gt;</a>
	</div>
	<div class="slide-nav"></div>
</div>
```

Then include `slider.js` or `slider.min.js` and call:

```javascript
$('.full-width').fullWidth();
```

 

