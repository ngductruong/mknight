/*
 * shell.js
 * Main controller for route table
 */
define(['plugins/router', 'durandal/app', 'knockout', 'snap'],
    function (router, app, ko, snap) {
        var self = this;
        self.router = router;

        /*
         * Route table
         *
         */
        self.activate = function () {
            // Activate routing
            router.map([
                { route: 'dashboard',        title:'Dashboard',           moduleId: 'viewmodels/dashboard',     nav: true, isShown:true},
                { route: 'porfolio',        title:'Porfolio',           moduleId: 'viewmodels/porfolio',        nav: true, isShown:true},
                { route: 'themes',        title:'Themes',           moduleId: 'viewmodels/themes',     nav: true, isShown:true},
                { route: 'notfound',    title:'Not-found',           moduleId: 'viewmodels/notfound',           nav: true, isShown:false},
                { route: '',            title:'Loading',             moduleId: 'viewmodels/defaultrouting',     nav: true, isShown:false},

            ]).mapUnknownRoutes('viewmodels/notfound', 'not-found')
              .buildNavigationModel()
              .activate();

        };

        ko.bindingHandlers.snap = {
            init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var options = valueAccessor() || {};

                    var snapSettings = {
                        element: element,
                        easing: 'ease',
                        maxPosition: 245,
                        minPosition: -245,
                        // disable : 'right',
                        slideIntent : 20,
                        tapToClose : true
                    };

                    var snapper = new Snap(snapSettings);

                    // Set snapper instance to application lifecycle
                    app.Snapper = snapper;
                },
                update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var options = valueAccessor() || {};
                    
                }
        };

        return self;
});