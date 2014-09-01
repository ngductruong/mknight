
//TRADITIONAL WAY OF DEFINE MODULES
define(['jquery', 'knockout','durandal/app'],

function($, ko,app) {

    return new function() {
        var self = this;

        self.ColorPalettes = ['#556270','#4ECDC4','#C7F464','#FF6B6B','#C44D58'];
        
        return self;
    };
});
