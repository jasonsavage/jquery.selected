
//run tests


describe("jquery.selectedGroup plugin Tests", function()
{
    var $list = $('<ul><li><a>item 1</a></li><li><a>item 2</a></li><li><a>item 3</a></li></ul>').appendTo('body'),
        $items = $list.find('a');
    
    
    describe("Functionality Tests", function() 
    { 
        it('selecting item 1 then selecting item 2 should set item 2 selected and unselected item 1', function()
        {
            $items.selectedGroup();
            
            $items.eq(0).selected(true);
            $items.eq(1).selected(true);
                
            expect( $items.selected().length ).to.equal(1);
            expect( $items.eq(0).hasClass('selected') ).to.be(false);
            expect( $items.eq(1).hasClass('selected') ).to.be(true);
            
            $items.off();
            $items.removeClass();
        });
        
        it('selecting item 1 should call onChange method', function()
        {
            var didChange = false;
            
            $items.selectedGroup(function()
            {
                didChange = true;
            });
            
            $items.eq(0).selected(true);
                
            expect( $items.eq(0).hasClass('selected') ).to.be(true);
            expect( didChange ).to.be(true);
            
            $items.off();
            $items.removeClass();
        });
        
        it('selecting item 1 muliple times should call onChange method only once', function()
        {
            var count = 0;
            
            $items.selectedGroup(function()
            {
                count++;
            });
            
            $items.eq(0).selected(true);
            $items.eq(0).selected(true);
            $items.eq(0).selected(true);
                
            expect( count ).to.equal(1);
            
            $items.off();
            $items.removeClass();
        });
        
        it('onChange callback method should recieve 2 params, selected item index and selected item', function()
        {
            var selectedIndex = 0,
                selectedItem = null;
            
            $items.selectedGroup(function(index, element)
            {
                selectedIndex = index;
                selectedItem = element;
            });
            
            $items.eq(1).selected(true);
                
            expect( selectedIndex ).to.equal(1);
            
            $items.eq(2).selected(true);
            
            expect( selectedIndex ).to.equal(2);    
            expect( selectedItem ).to.equal(  $items.eq(2)[0]  ); 
            
            $items.off();
            $items.removeClass();
        });
    });
    

    describe("Helper Tests", function() {
        
        it('calling $items.selectedGroupIndex() should return -1', function()
        {
            $items.selectedGroup();
            
            expect( $items.selectedGroupIndex() ).to.equal(-1);   
            
            $items.off();
            $items.removeClass();
        });
        
        it('setting item 1 selected and calling $items.selectedGroupIndex() should return 1', function()
        {
            $items.selectedGroup();
            
            $items.eq(1).selected(true);
            
            expect( $items.selectedGroupIndex() ).to.equal(1);  
            
            $items.off();
            $items.removeClass();
        });
        
    });
    
    $list.remove();

});
