
//run tests

describe("jQuery Tests", function()
{
    it('$ should exist', function() 
    {
        expect(window).to.have.property('$');
        expect($).to.be.an('function');
    });
});

describe("Build Tests", function()
{
    it('jquery.selected plugin should exist', function() 
    {
        expect($).to.have.property('fn');
        expect($.fn).to.have.property('selected');
    });
    
    it('jquery.selectedGroup plugin should exist', function() 
    {
        expect($).to.have.property('fn');
        expect($.fn).to.have.property('selectedGroup');
    });
    
});

describe("jquery.selected plugin Tests", function()
{
    var $list = $('<ul><li><a>item 1</a></li><li><a>item 2</a></li><li><a>item 3</a></li></ul>').appendTo('body'),
        $items = $list.find('a');
    
    
    describe("Getter Tests", function() 
    { 
        it('calling $items.selected().length should equal 0 (nothing is selected yet)', function()
        { 
            expect($items.selected().length).to.equal(0);
        });
        
        it('selecting item 1 and calling $items.selected().length should equal 1', function()
        {
            $items.eq(1).selected(true);
                
            expect($items.selected().length).to.equal(1);
        });
    });
    
    $items.removeClass();
    
    describe("Setter Tests", function() 
    { 
        it('calling $items.selected(true) should set all 3 <a /> tags to selected', function()
        {
            $items.selected(true);
                
            expect($items.eq(0).hasClass('selected')).to.be(true);
            expect($items.eq(1).hasClass('selected')).to.be(true);
            expect($items.eq(2).hasClass('selected')).to.be(true);
        });
        
        it('calling $items.selected(false) should set all 3 <a /> tags to un-selected', function()
        {
            $items.selected(false);
                
            expect($items.eq(0).hasClass('selected')).to.be(false);
            expect($items.eq(1).hasClass('selected')).to.be(false);
            expect($items.eq(2).hasClass('selected')).to.be(false);
        });
        
        it('calling $items.eq(1).selected(true) should set only 2nd <a /> tags to selected', function()
        {
            $items.eq(1).selected(true);
                
            expect($items.eq(0).hasClass('selected')).to.be(false);
            expect($items.eq(1).hasClass('selected')).to.be(true);
            expect($items.eq(2).hasClass('selected')).to.be(false);
        });
    });
    
    $items.removeClass();
    
    describe("Event Tests", function() 
    { 
        it('calling $items.eq(0).selected(true) should dispatch selected event, and change event', function()
        {
            var heardSelectedEvent = false,
                heardChangeEvent = false;
            
            $items.eq(0).on( $.selected.events.SELECTED, function() {
                heardSelectedEvent = true;
            })
            .on( $.selected.events.CHANGE, function() {
                heardChangeEvent = true;
            });
        
            //set selected
            $items.eq(0).selected(true);
            
            //test
            expect(heardSelectedEvent).to.be(true);
            expect(heardChangeEvent).to.be(true);
            
            //clear listeners
            $items.eq(0).off();
            $items.removeClass();
        });
        
        it('calling $items.eq(0).selected(true) should not dispatch unselected event', function()
        {
            var heardUnselectedEvent = false;
            
            $items.eq(0).on( $.selected.events.UNSELECTED, function() {
                heardUnselectedEvent = true;
            });
        
            //set selected
            $items.eq(0).selected(true);
            
            //test
            expect(heardUnselectedEvent).to.be(false);
            
            //clear listeners
            $items.eq(0).off();
            $items.removeClass();
        });
        
        it('calling $items.eq(0).selected(false) should dispatch unselected event, and change event', function()
        {
            var heardUnselectedEvent = false,
                heardChangeEvent = false;
            
            $items.eq(0).on( $.selected.events.UNSELECTED, function() {
                heardUnselectedEvent = true;
            })
            .on( $.selected.events.CHANGE, function() {
                heardChangeEvent = true;
            });
            
            //add selected class to bypass event calls
            $items.eq(0).addClass( $.selected.className );
            
            //set un selected
            $items.eq(0).selected(false);
            
            //test
            expect(heardUnselectedEvent).to.be(true);
            expect(heardChangeEvent).to.be(true);
            
            //clear listeners
            $items.eq(0).off();
            $items.removeClass();
        });
        
        it('calling $items.eq(0).selected(false) should not dispatch selected event', function()
        {
            var heardSelectedEvent = false;
            
            $items.eq(0).on( $.selected.events.SELECTED, function() {
                heardSelectedEvent = true;
            });
            
            //add selected class to bypass event calls
            $items.eq(0).addClass( $.selected.className );
            
            //set un selected
            $items.eq(0).selected(false);
            
            //test
            expect(heardSelectedEvent).to.be(false);
            
            //clear listeners
            $items.eq(0).off();
            $items.removeClass();
        });

        it('calling $items.eq(1).selected(true) should dispatch change event, but not if it\'s called again.', function()
        {
            var heardChangeEvent = false,
                echoCount = 0;
            
            $items.eq(1).on( $.selected.events.CHANGE, function() {
                heardChangeEvent = true;
                echoCount++;
            });
            
                
            //set selected
            $items.eq(1).selected(true);
            $items.eq(1).selected(true);
            $items.eq(1).selected(true);
            
            //test
            expect(heardChangeEvent).to.be(true);
            expect(echoCount).to.equal(1);
            
            //clear listeners
            $items.eq(1).off();
            $items.removeClass();
        });

    });
    
    describe("Helper Tests", function() {
        
        it('$.fn should contain function isSelected()', function()
        {
            expect($.fn).to.have.property('isSelected');
            expect($.fn.isSelected).to.be.an('function');
        });
        
        it('setting 2nd <a /> tag selected(true) and calling $items.eq(1).isSelected() should return true', function()
        {
            $items.eq(1).selected(true);
            expect( $items.eq(1).isSelected() ).to.be(true);
            $items.removeClass();
        });
        
        it('setting 2nd <a /> tag selected(true) and calling $items.eq(0).isSelected() should return false', function()
        {
            $items.eq(1).selected(true); 
            expect( $items.eq(0).isSelected() ).to.be(false);
            $items.removeClass();
        });
        
        it('$.fn should contain function selectedToggle()', function()
        {
            expect($.fn).to.have.property('selectedToggle');
            expect($.fn.selectedToggle).to.be.an('function');
        });
        
        it('calling $items.eq(2).selectedToggle() should set element as selected and calling it again should set element as unselected.', function()
        {
            $items.eq(2).selectedToggle(); 
            expect( $items.eq(2).hasClass('selected') ).to.be(true);
            
            $items.eq(2).selectedToggle(); 
            expect( $items.eq(2).hasClass('selected') ).to.be(false);
        });
        
    });

    $list.remove();

});
