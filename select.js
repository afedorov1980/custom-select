(function () {
    
    function closeMenu(wrap) {
        wrap.removeClass('s-focus').find('.s-inner').removeClass('focus');
    }
    
    function simulateMouseEvent(eventName, element) {

        var evt = document.createEvent("MouseEvents");

        evt.initMouseEvent(eventName, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        element.dispatchEvent(evt);

    }
    
    $('select').each(function(){
        
        var self = $(this),
            width = self.width(),
            defaultText = self.find(':selected').text(),
            selectId = self.attr('id'),
            optionCount = self.find('option').length,
            selectWrap,
            activeText,
            e;
        
        self.wrap('<label class="s-wrap" for="' + selectId + '"/>');
        console.log(self)
        selectWrap = self.parent();
        
        selectWrap.css({
            'position':'relative'
        }).prepend('<span class="s-inner" />');
        
        selectWrap.find('.s-inner').text(defaultText).css({
            'position'    : 'absolute',
            'top'         : '0%',
            'left'        : '0%',
            'width'       : '100%'
        }).wrapInner('<span class="s-style" />');
        
        self.on('focus click', function(e) {
            selectWrap.addClass('s-focus').find('.s-inner').addClass('focus');
            if(self.hasClass('open')) {
                self.removeClass('open');
                closeMenu(selectWrap);
            } else {
                self.addClass('open');
                simulateMouseEvent("mousedown", document.getElementById(selectId));
            }
        }); // focus
        
        self.on('blur', function(e) {
            closeMenu(selectWrap);
        }); // blur

        self.on('change', function(e) {

            activeText = self.find(':selected').text();

            selectWrap.find('.s-style').text(activeText);
            closeMenu(selectWrap);

        }); // change
        
    }); // each
    
})(); // close function