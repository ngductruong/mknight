/*
* Loading.js
* This module is for loading.html page, used for display loading data
*
*/

define([
    'jquery', 'plugins/router', 'durandal/app', 'knockout'], function ($, router, app, ko) {


   // module function return a instance
    return new function(){
        var self = this;

        self.ViewModel = ko.observable(app.ViewModel);

        self.IsCalled= ko.observable(false);

        self.activate = function()
        {
            self.IsCalled(true);
        }

        return self;
    };


});
