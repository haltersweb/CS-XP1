/*global
    jQuery, NAME
*/
/**
 * X1 remote keys
 */
(function ($) {
    'use strict';
    var xr11Buttons = $('[data-xr-11-keycode]');
    NAME.remote = {
        down: 40,
        ok: 13
    };
    xr11Buttons.on('click', function () {
        console.log($(this).attr('data-xr-11-keycode'));
        // create a new jQuery.Event object with specified event properties.
        var e = jQuery.Event("keydown", {
            keyCode: parseInt($(this).attr('data-xr-11-keycode'))
        });
        // trigger an artificial keydown event w/keyCode = button's data-xr-11-keycode attr
        $(document).trigger(e);
    });

}(jQuery));