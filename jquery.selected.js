/**
 * selected() and selectedGroup() plug-ins.
 *
 * @author JSavage
 * 2012 Engauge Marketing
 * 
 * Usage ::
 * 
 * *************************************
 * selected(value=null) plug-in
  * *************************************
 * [event 'selected.selected'] - dispatched each time the html element is marked selected
 * [event 'unselected.selected'] - dispatched each time the html element is marked unselected
 * [event 'change.selected'] - dispatched only when the html element's selected value is changed
 * 
 * single selector
 * ------------------------------------------------------------------------------------------
 * $("ul li:first-child").selected(true);
 * - adds and removes the css class "selected" from an html element
 * @return selector for chainability
 * 
 * var is_selected = $("ul li:first-child").selected();
 * - gets whether the element has the class 'selected'
 * @return boolean
 * 
 * multi selector
 * ------------------------------------------------------------------------------------------
 * $("ul li").selected(true);
 * - adds and removes the css class "selected" from all the html elements in the selector
 * @return selector for chainability
 * 
 * var selected = $("ul li").selected();
 * - gets the element that has the class 'selected' or null
 * @return html element
 * 
 * 
 * *************************************
 * selectedGroup(onChange=null) plug-in
 * *************************************
 * [event 'change.selectedGroup'] - dispatched only when the group's selected index is changed (auto adds the call back that is passed to the plugin)
 * 
 * multi selector
 * ------------------------------------------------------------------------------------------
 * var group = $("ul li").selectedGroup(onChangeCallback);
 * - keeps track of a group of selected items by only allowing one html element to be selected at a time
 * @return a [selectedGroup Object]
 * 
 * [selectedGroup Object]
 * @index() [function] 	- gets or sets the current selected index
 * @items() [function] 	- array of html elements in the group
 * @item() [function] 	- gets the currently selected html element in the group
 * 
 * NOTE: the group object is passed as this to the 'change.selectedGroup' event listener
 * 
 * Example ::
 *  $("ul li").selectedGroup(function() {
 *     this.item().css("background-color","red");
 *  });
 * 
 */

(function ($)
{
	$.selectedClass = "selected";
	
    /**
     * Selected plugin
     */
    $.fn.selected = function (value)
    {
        if(typeof value === 'undefined' || value === '')
        	value = null;
        
        //multi element selector action
        if (this.length > 1)
        {
            if (value !== null)
            {
                //set selected value on all elements but skip event dispatch
                return $(this).each(function ()
                {
                    //setSelected.apply(this, [value]);
                    $(this).selected(value);
                });
            }

            //return the first element that is selected else null
            $(this).each(function ()
            {
                if ($(this).selected())
                    return this;
                return null;
            });
            return null;
        }

        //single element selector action
        if (value !== null)
        {
            var did_change = (getSelected.apply(this) != value);

            //set element selected value
            setSelected.apply(this, [value]);
            
            //trigger selected event
            (value) ? $(this).trigger("selected.selected") : $(this).trigger("unselected.selected");
                
            if(did_change)
                //trigger change event
                $(this).trigger("change.selected");
                
            return this; //maintain chainability
        }
        
        //get whether or not the element is selected
        return getSelected.apply(this);
    };

    /**
     * Selected Group plugin
     */
    $.fn.selectedGroup = function (onChange)
    {
        //@this = the selector (should be an array of html elements)
        
        onChange = onChange || null;
        var $this = this;
        
        var group = (function(elements)
        {
        	var _items = elements,
        		_index = -1;
        	
        	// public API
			return {
				index : function(value)
				{
					if(typeof value === 'number')
						_index = value;
					else
						return _index;
				},
				item : function()
	            {
	            	return $( _items[_index] );
	            },
	            items : function()
	            {
	            	return $( _items );
	            }
			};
        }(this));
        
        if (onChange !== null)
            $(group).on("change.selectedGroup", onChange);

        $(this).each(function (index, ele)
        {
            //@index - the current html element's index in the [group.items] array
            //@ele - the current html element in the array ( currently same as @this )
            
            //add a selected listener to each html element in the group
            $(ele).on("selected.selected", function (e)
            {
                //check if this html element isn't already the selected element in the group
                if(index != group.index() ) 
                {
                    //set the group's index equal to this item's index
                    group.index(index);
                    
                    //un-select all other html element in the [group.items] array
                    group.items().filter(function(i) {
                        return (i != index);
                    }).selected(false);
                    
                    //trigger change event on this group
                    $(group).trigger("change.selectedGroup");
                 }
            });
        });
        
        //return all the items in the group
        return group;
    };

    /* Private */
    function getSelected()
    {
        return $(this).hasClass( $.selectedClass );
    }
    function setSelected(value)
    {
        (value) ? $(this).addClass( $.selectedClass ) : $(this).removeClass( $.selectedClass );
    }

} (jQuery));
