/*
 * Defaultrouting.js
 * This module is for preparing first page, used for routing request to associated page
 *
 */
define(['jquery', 'knockout','durandal/app'],

function($, ko,app) {
    return new function() {
        var self = this;

        self.SystemUnitNavigating = ko.computed(function() {
            router.navigate('home');
        });
        return self;
    };
});
