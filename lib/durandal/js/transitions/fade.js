/**
 * Durandal 2.0.1 Copyright (c) 2012 Blue Spire Consulting, Inc. All Rights Reserved.
 * Available via the MIT license.
 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
 */
/**
 * The entrance transition module.
 * @module entrance
 * @requires system
 * @requires composition
 * @requires jquery
 */
define(['durandal/system', 'durandal/composition', 'jquery'], function(system, composition, $) {
    var fadeOutDuration = 100;
    var endValues = {
        marginRight: 0,
        marginLeft: 0,
        opacity: 1
    };
    var clearValues = {
        marginLeft: '',
        marginRight: '',
        opacity: '',
        display: ''
    };

    /**
     * @class EntranceModule
     * @constructor
     */
    var fade = function(context) {

        return system.defer(function(dfd) {
            function endTransition() {
                dfd.resolve();
            }

            function scrollIfNeeded() {
                if (!context.keepScrollPosition) {
                    $(document).scrollTop(0);
                }
            }

            if (!context.child) {
                $(context.activeView).fadeOut(fadeOutDuration, endTransition);
            } else {
                // var duration = context.duration || 100;
                var duration = 0;
                //
                // var fadeOnly = !!context.fadeOnly;
                var fadeOnly = true;

                function startTransition() {
                    scrollIfNeeded();
                    context.triggerAttach();

                    var startValues = {
                        marginLeft: 0,
                        marginRight: 0,
                        opacity: 1,
                        display: 'block'
                    };

                    var $child = $(context.child);

                    $child.css(startValues);

                    $child.animate(endValues, {
                        duration: duration,
                        easing: 'swing',
                        always: function () {
                            $child.css(clearValues);
                            endTransition();
                        }
                    });

                }

                if (context.activeView) {
                    $(context.activeView).fadeOut({ duration: fadeOutDuration, always: startTransition });
                } else {
                    startTransition();
                }
            }
        }).promise();
    };

    return fade;
});
