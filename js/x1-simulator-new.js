/*global
    jQuery, NAME, window
*/
/**
 * X1 simulator
 */
(function ($) {
    'use strict';
    var $tvInterface = $('.tv-interface'),
        $challengeStart = $('#challengeStart'),
        $challengeSteps = $('[class^="cc-step"]'),
        $challengeEnd = $('#challengeEnd'),
        buttonSequence = {
            ccChallenge: {
                steps: [
                    NAME.remote.down,
                    NAME.remote.ok
                ],
                classPrefix: 'cc'
            }
        };
    function startChallenge() {
        $(document).on('keydown.startChallenge', function (evt) {
            console.log(evt.keyCode);
            if (evt.keyCode === NAME.remote.ok) {
                $challengeStart.hide();
                $(document).off('keydown.startChallenge');
                challenge('ccChallenge');
            }
        });
    }
    function challenge(challengeName) {
        var $screens = $tvInterface.find('[class|="' + buttonSequence[challengeName].classPrefix + '"]'),
            n = 0;
        $(document).on('keydown.' + challengeName, function (evt) {
            console.log(evt.keyCode);
            if (evt.keyCode === buttonSequence[challengeName].steps[n]) {
                $screens.hide();
                $screens.filter('.' + buttonSequence[challengeName].classPrefix + '-step-' + (n + 1).toString()).show();
                n += 1;
                if (n === buttonSequence[challengeName].steps.length) {
                    window.setTimeout(function () {
                        $challengeSteps.hide();
                        $challengeEnd.show();
                        $(document).off('keydown.' + challengeName);
                    }, 750);
                }
            }
        });
    }
    startChallenge();
}(jQuery));