/*global
    jQuery, NAME, window
*/
/**
 * X1 simulator
 */
(function ($) {
    'use strict';
    var tvInterface = $('.tv-interface'),
        $modalTrigger = $($('[aria-controls="youWin"]')[0]);
    NAME.ccChallenge = function () {
        console.log('foo bar');
        var screens = tvInterface.find('[class|="cc"]'),
            buttonSequence = [
                NAME.remote.down,
                NAME.remote.ok
            ],
            n = 0;
            console.log(screens);
        $(document).on('keydown.ccChallenge', function (evt) {
            console.log(evt.keyCode);
            if (evt.keyCode === buttonSequence[n]) {
                screens.hide();
                screens.filter('.cc-step-' + (n + 1).toString()).show();
                n += 1;
                if (n === buttonSequence.length) {
                    window.setTimeout(function () {
                        console.log('click the button');
                        $modalTrigger.show().click();
                        $('[data-trigger="true"]').removeAttr('data-trigger').hide();
                        $(document).off('keydown.ccChallenge');
                    }, 750);
                }
            }
        });
    };
    NAME.sportChallenge = function () {
    //function sportChallenge() {
        var screens = tvInterface.find('[class|="sport"]'),
            buttonSequence = [
                NAME.remote.c,
                NAME.remote.right
            ],
            n = 0;
        $(document).on('keydown.sportChallenge', function (evt) {
            console.log(evt.keyCode);
            if (evt.keyCode === buttonSequence[n]) {
                screens.hide();
                screens.filter('.sport-step-' + (n + 1).toString()).show();
                n += 1;
                if (n === buttonSequence.length) {
                    window.setTimeout(function () {
                        console.log('click the button');
                        $modalTrigger.show().click();
                        $('[data-trigger="true"]').removeAttr('data-trigger').hide();
                        $(document).off('keydown.sportChallenge');
                    }, 750);
                }
            }
        });
    };
    function bindChallengeBtns() {
        var $buttons = $('.challenge-btn');
        $buttons.on('click', function () {
            var functionName = $(this).attr('id');
            console.log(functionName);
            NAME[functionName]();
        });
    }
    bindChallengeBtns();
}(jQuery));