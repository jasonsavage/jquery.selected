jquery.selected
===============

jquery.selected &amp; jquery.selectedGroup Plugins

This is a small plugin for jQuery used to easily set an html element as selected ( add class "selected").
It can be used for tabs, custom radio buttons, pagination, toggle button, slideshow, etc.

```html
<a class="btn" href="#">Click Me!</a>
```

```javascript
$('.btn').on('click', function(e)
{
	$(this).selected( true );

	//or toggle
	//$(this).selectedToggle();
});

//helper
var isSelected = $('.btn').isSelected();


```

or as a group of buttons when you only want one item marked as selected at a time (radio button group functionality) :

```html
<ul class="tabs">
	<li><a href="#">Home</a></li>
	<li><a href="#">About</a></li>
	<li><a href="#">Products</a></li>
	<li><a href="#">Contact</a></li>
</ul>
```

```javascript
$('.tabs a').selectedGroup().on('click', function(e) 
{ 
	e.preventDefault();
	$(this).selected(true); 
});

//helper
var index = $('.tabs a').selectedGroupIndex();

```

Also, if you don't want the class name to be selected :

```javascript
$.selected.className = "active";
```
