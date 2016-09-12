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
        };
    NAME.challenge = function (challengeName) {
        var screens = tvInterface.find('[class|="' + buttonSequence[challengeName].classPrefix + '"]'),
            n = 0;
        $(document).on('keydown.' + challengeName, function (evt) {
            console.log(evt.keyCode);
            if (evt.keyCode === buttonSequence[challengeName].steps[n]) {
                screens.hide();
                screens.filter('.' + buttonSequence[challengeName].classPrefix + '-step-' + (n + 1).toString()).show();
                n += 1;
                if (n === buttonSequence[challengeName].steps.length) {
                    window.setTimeout(function () {
                        console.log('click the button');
                        $modalTrigger.show().click();
                        $('[data-trigger="true"]').removeAttr('data-trigger').hide();
                        $(document).off('keydown.' + challengeName);
                    }, 750);
                }
            }
        });
    };
    function bindChallengeBtns() {
        var $buttons = $('.challenge-btn');
        $buttons.on('click', function () {
            var challengeName = $(this).attr('id');
            console.log(challengeName);
            NAME.challenge(challengeName);
        });
    }
    bindChallengeBtns();
}(jQuery));