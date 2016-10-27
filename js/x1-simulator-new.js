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
        $winModal = $('#youWin'),
        $modalTrigger = $($('[aria-controls="youWin"]')[0]),
        buttonSequence = {
            ccChallenge: {
                steps: [
                    NAME.remote.down,
                    NAME.remote.ok
                ],
                classPrefix: 'cc',
                challengeText: 'Turn on closed captioning in two steps.',
                badgeLogo: '<svg id="a11yBadge" class="badge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="presentation" focusable="false"><circle fill="#FFFFFF" cx="50" cy="50" r="50"/><circle fill="#1A6992" cx="50" cy="50" r="48"/><circle fill="#FFFFFF" cx="50" cy="50" r="37"/><g><path fill="#1F6F9A" d="M28,62.9l-0.3-2.2h-0.1c-1.2,1.7-3,2.6-5,2.6c-3.4,0-5.9-2.9-5.9-6.9c0-5.9,5.2-8.3,10.3-8.4v-0.5c0-1.7-1.1-3-3.2-3c-1.8,0-3.3,0.5-4.6,1.3l-1.1-4c1.2-0.7,3.9-1.7,7-1.7c6.9,0,8,4.8,8,9.3v8.4c0,1.8,0.1,3.6,0.4,5.2H28z M27.2,52c-2,0-4.8,0.7-4.8,3.8c0,2.3,1.2,3.1,2.2,3.1c1,0,2.1-0.6,2.5-1.9c0.1-0.3,0.1-0.7,0.1-1.1V52z"/><path fill="#1F6F9A" d="M40.4,38.7L40.4,38.7l-5.2,2.6l-1-4.7l6.9-3.5h5.3v29.9h-6V38.7z"/><path fill="#1F6F9A" d="M56.9,38.7L56.9,38.7l-5.2,2.6l-1-4.7l6.9-3.5h5.3v29.9h-6V38.7z"/><path fill="#1F6F9A" d="M72.9,40.4l2.2,11.7c0.2,1.3,0.4,2.6,0.6,3.8h0.1c0.2-1.2,0.4-2.4,0.6-3.7l1.9-11.8h5.9l-4.6,17.3c-1.1,4.2-2.6,8.6-5,11.5c-1.9,2.2-4.2,3.3-5.1,3.5l-1.8-5.2c1.1-0.4,2.1-1.1,3-1.9c0.8-0.8,1.5-1.7,1.9-2.7c0.2-0.4,0.3-0.6,0.3-1c0-0.3-0.1-0.6-0.2-0.8l-6.2-20.8H72.9z"/></g></svg>',
                xp: 1000,
                badgeInfo: '<h2>Congratulations!  You\'ve just earned the accessibility badge!</h2><p><strong>DID YOU KNOW:</strong> The FCC requires that X1 must be usable by people with disabilities. For those who are deaf it is imperative that they are able to turn on closed captioning quickly.</p>'

            },
            sportChallenge: {
                steps: [
                    NAME.remote.c,
                    NAME.remote.right
                ],
                classPrefix: 'sport',
                challengeText: 'Go to the baseball stats in the sports app.',
                badgeLogo: '<svg xmlns="http://www.w3.org/2000/svg" id="sportBadge" viewBox="0 0 100 100" focusable="false" role="presentation"><path fill="#C90318" d="M70.5,13C79.9,13,87,20.1,87,29.5v40C87,78.9,79.9,87,70.5,87h-40C21.1,87,13,78.9,13,69.5v-40 C13,20.1,21.1,13,30.5,13H70 M70.5,2h-40C15,2,2,14,2,29.5v40C2,85,15,98,30.5,98h40C86,98,98,85,98,69.5v-40C98,14,86,2,70.5,2 L70.5,2z"/><path fill="#C90318" d="M37.4,24.1c0-0.9,1.5-2.7,3.9-3c5-0.5,14.3-0.6,15.3,0c1.5,0.9,14.7,16.6,16,18.8 C74,42.1,76,49.5,76.9,50c0.5,0.3,5.7-0.2,9.4,0c2.3,0.1,4,1.2,4,3.1c0,1.5-1.4,2.7-3.5,3c-5.2,0.7-13.5,0.6-14.2-0.1 c-1-1-4.8-9.2-4.8-9.2L53.9,56.8c0,0,11.4,12.5,11.4,15.6c0,1.5-0.7,3.5-3.9,4.8c-3.3,1.3-20.8,4.4-20.8,4.4s-5.3,1.5-6.4-2.4 c-0.3-1.2-0.6-3.3,2-3.9c4.4-1.1,16.8-4.8,16.8-4.8l-8.7-9.2L21.4,77.4c0,0-3.8,4.3-7.2,0.9c-3.4-3.4,2.2-6.8,2.2-6.8l23-18 l0.7-4.2l17.6-16.4l-3.4-5.8L41.2,27C41.2,27,37.4,28.1,37.4,24.1z"/><circle fill="#C90318" cx="76.9" cy="28.4" r="7.7"/><path fill="#C90318" d="M36,26h-6c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1S36.6,26,36,26z"/><path fill="#C90318" d="M53,35H23c-0.6,0-1-0.4-1-1s0.4-1,1-1h30c0.6,0,1,0.4,1,1S53.6,35,53,35z"/><path fill="#C90318" d="M44,44H20c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S44.6,44,44,44z"/><path fill="#C90318" d="M37,53H15c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S37.6,53,37,53z"/><path fill="#C90318" d="M25,63H8c-0.6,0-1-0.4-1-1s0.4-1,1-1h17c0.6,0,1,0.4,1,1S25.6,63,25,63z"/><path fill="#C90318" d="M14,72H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h11c0.6,0,1,0.4,1,1S14.6,72,14,72z"/><path fill="#FFFFFF" d="M51,26H40c-0.6,0-1-0.4-1-1s0.4-1,1-1h11c0.6,0,1,0.4,1,1S51.6,26,51,26z"/><path fill="#FFFFFF" d="M65,35h-6c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1S65.6,35,65,35z"/><path fill="#FFFFFF" d="M67,44H49c-0.6,0-1-0.4-1-1s0.4-1,1-1h18c0.6,0,1,0.4,1,1S67.6,44,67,44z"/><path fill="#FFFFFF" d="M56,53H42c-0.6,0-1-0.4-1-1s0.4-1,1-1h14c0.6,0,1,0.4,1,1S56.6,53,56,53z"/><path fill="#FFFFFF" d="M54,63H31c-0.6,0-1-0.4-1-1s0.4-1,1-1h23c0.6,0,1,0.4,1,1S54.6,63,54,63z"/><path fill="#FFFFFF" d="M60,72H20c-0.6,0-1-0.4-1-1s0.4-1,1-1h40c0.6,0,1,0.4,1,1S60.6,72,60,72z"/></svg>',
                xp: 500,
                badgeInfo: '<h2>Congratulations!  You\'ve just earned the sports badge!</h2><p><strong>DID YOU KNOW:</strong> The Xfinity Sports App on X1 was expanded in June 2015 to include:</p><ul class="bullet singletons"><li>pre-game matchups,</li><li>live batter-by-batter stats,</li><li>and full post-game analysis.</li></ul>'
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
    function populateBadgeModal(challengeName) {
        var $badgeLogo = $winModal.find('.badge-logo'),
            $xp = $winModal.find('.xp'),
            $badgeInfo = $winModal.find('.badge-info'),
            data = (buttonSequence[challengeName])
        $badgeLogo.html(data.badgeLogo);
        $xp.html('+' + data.xp + ' XP');
        $badgeInfo.html(data.badgeInfo);
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
    function bindEvents() {
    }
    startChallenge();
    bindEvents();
}(jQuery));