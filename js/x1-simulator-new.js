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
    function hideImages() {
        window.setTimeout(function () {
            $tvInterface.find('img').removeClass('show');
        }, 2000);
    }
    function challenge(challengeName) {
        var $screens = $tvInterface.find('[class|="' + buttonSequence[challengeName].classPrefix + '"]'),
            n = 0;
        $(document).on('keydown.' + challengeName, function (evt) {
            console.log(evt.keyCode);
            if (evt.keyCode === buttonSequence[challengeName].steps[n]) {
                $screens.removeClass('show');
                $screens.filter('.' + buttonSequence[challengeName].classPrefix + '-step-' + (n + 1).toString()).addClass('show');
                n += 1;
                if (n === buttonSequence[challengeName].steps.length) {
                    window.setTimeout(function () {
                        $challengeEnd.addClass('show');
                        $(document).off('keydown.' + challengeName);
                        hideImages();
                    }, 1000);
                }
            }
        });
    }
    function startChallenge() {
        $(document).on('keydown.startChallenge', function (evt) {
            console.log(evt.keyCode);
            if (evt.keyCode === NAME.remote.ok) {
                $challengeStart.removeClass('show');
                $(document).off('keydown.startChallenge');
                challenge('ccChallenge');
            }
        });
    }
    startChallenge();
}(jQuery));