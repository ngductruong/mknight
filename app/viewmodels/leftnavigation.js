
//TRADITIONAL WAY OF DEFINE MODULES
define([
    'jquery','plugins/router', 'durandal/app', 'knockout','slimscroll-plugin',

    ], function ($, router, app, ko, slimscroll_plugin) {

    // Initialize theme application
    // This will init transition, effects



    // module function return a instance
    return new function(){
        var self = this;

        
        ko.bindingHandlers.slimScrollPlugin = {
            init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

                //
                // console.log('CUSTOM BINDING _ SLIMSCROLL');
                var options = valueAccessor() || {};
                $(element).slimScroll({
                    position: 'left',
                    height: '580px',
                    railVisible: true,
                    alwaysVisible: true,
                    allowPageScroll: false
                });
            }
        };


        return self;
    };


});
