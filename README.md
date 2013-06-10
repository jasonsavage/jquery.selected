jquery.selected
===============

jquery.selected &amp; jquery.selectedGroup Plugins

This is a small plugin for jQuery used to easily set an html element as selected ( add class "selected").
Its a simple concept but can be used in many ways like tabs, custom radio buttons, pagination, toggle button, slideshow, etc.

```html
<a class="toggle" href="#">one</a>
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