/*global
    jQuery, NAME, window
*/
/**
 * X1 simulator
 */
(function ($) {
    'use strict';
    var tvInterface = $('.tv-interface'),
        $modalTrigger = $($('[aria-controls="youWin"]')[0]),
        buttonSequence = {
            ccChallenge: {
                steps: [
                    NAME.remote.down,
                    NAME.remote.ok
                ],
                classPrefix: 'cc'
            },
            sportChallenge: {
                steps: [
                    NAME.remote.c,
                    NAME.remote.right
                ],
                classPrefix: 'sport'
            }
        }
    NAME.ccChallenge = function () {
        var screens = tvInterface.find('[class|="' + buttonSequence['ccChallenge'].classPrefix + '"]'),
            n = 0;
        $(document).on('keydown.ccChallenge', function (evt) {
            console.log(evt.keyCode);
            if (evt.keyCode === buttonSequence['ccChallenge'].steps[n]) {
                screens.hide();
                screens.filter('.' + buttonSequence['ccChallenge'].classPrefix + '-step-' + (n + 1).toString()).show();
                n += 1;
                if (n === buttonSequence['ccChallenge'].steps.length) {
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
        var screens = tvInterface.find('[class|="' + buttonSequence['sportChallenge'].classPrefix + '"]'),
            n = 0;
        $(document).on('keydown.sportChallenge', function (evt) {
            console.log(evt.keyCode);
            if (evt.keyCode === buttonSequence['sportChallenge'].steps[n]) {
                screens.hide();
                screens.filter('.' + buttonSequence['sportChallenge'].classPrefix + '-step-' + (n + 1).toString()).show();
                n += 1;
                if (n === buttonSequence['sportChallenge'].steps.length) {
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