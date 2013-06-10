jquery.selected
===============

jquery.selected &amp; jquery.selectedGroup Plugins

This is a small plugin for jQuery used to easily set an html element as selected ( add class "selected").
It can be used for tabs, custom radio buttons, pagination, toggle button, slideshow, etc.

```html
<a class="toggle" href="#">Click Me!</a>
```

```javascript
$('.toggle').on('click', function(e)
{
	e.preventDefault();
	
	//toggle
	var isSelected = $(this).selected();
	$(this).selected( !isSelected );
});
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
$('.tabs a').selectedGroup()
			.items()
			.on('click', function(e) 
			{ 
				e.preventDefault();
				$(this).selected(true); 
			});
```

Also, don't want the class name to be selected :

```javascript
$.selectedClass = "active";
```