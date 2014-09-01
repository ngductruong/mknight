/*
 * Defaultrouting.js
 * This module is for preparing first page, used for routing request to associated page
 *
 */
define(['jquery', 'knockout','durandal/app'],

function($, ko,app) {
    return new function() {
        var self = this;
        self.IsNavigated = ko.observable(false);

        self.SystemUnitNavigating = ko.computed(function() {
        	if(!self.IsNavigated()) router.navigate('dashboard');
        });
        return self;
    };
});
