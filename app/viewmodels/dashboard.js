
//TRADITIONAL WAY OF DEFINE MODULES
define(['jquery', 'knockout','durandal/app'],

function($, ko, app) {

    return new function() {
        var self = this;

        self.ToggleLeftPanel = function () {
        	var snapper = app.Snapper;
        	if( snapper.state().state=="left" ){
		        snapper.close();
		    } else {
		        snapper.open('left');
		    }
        };
        self.ToggleRightPanel = function () {
        	var snapper = app.Snapper;
        	if( snapper.state().state=="right" ){
		        snapper.close();
		    } else {
		        snapper.open('right');
		    }
        };

        return self;
    };
});
