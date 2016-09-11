/*global
    jQuery, NAME
*/
/**
 * X1 simulator
 */
(function ($) {
    'use strict';
    var tvInterface = $('.tv-interface'),
    	modalTrigger = $('[aria-controls="youWin"]')[0];
    function ccSteps() {
    	var screens = tvInterface.find('img.cc'),
    		buttonSequence = [
    			NAME.remote.down,
    			NAME.remote.enter
    		],
    		n = 0;
    	$(document).on('keydown', function(evt) {
    		console.log(evt.keyCode);
    		if (evt.keyCode === buttonSequence[n]) {
    			screens.hide();
    			screens.filter('.step-' + (n + 1).toString()).show();
    			n += 1;
    		}
    		if (n === buttonSequence.length) {

                window.setTimeout(function() {
                    console.log('click the button');
                    modalTrigger.focus();
                    modalTrigger.click();
                }, 750);



    		}
    	});
    }
    ccSteps();
}(jQuery));