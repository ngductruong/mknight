requirejs.config({
    //urlArgs: "bust=" +  (new Date()).getTime(),
    waitSeconds : 30,
    paths: {
        /* System */
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-2.3.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '../lib/jquery/jquery-1.9.1',

        /* Plugins */
        'string' :  '../lib/string/string.min',
        'slimscroll-plugin' : '../lib/jquery-slimscroll/jquery.slimscroll',
        'snap' : '../lib/snapjs/snap',

        /* Models */
        'entity' : '../app/entity'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        }
    }
});

// Use this build command
// node r.js -o build.js

require([
    'jquery',
    'knockout',
    'durandal/system',
    'durandal/app',
    'durandal/viewLocator',
    'string',
    'entity/vm'],
    function ($, ko, system, app, viewLocator, string, ViewModel) {


        //>>excludeStart("build", true);
        system.debug(true);
        //>>excludeEnd("build");

        // application title
        app.title = 'MKnight - Mobile application template using DurandalJs';

        // Init application view model
        app.ViewModel = new ViewModel();

        // Print current start date
        console.log(app.ViewModel.StartDate());

        app.configurePlugins({
            router:true,
            dialog: true,
            widget: true
        });

        console.log('-----------------------------------------------------------------------------');
        console.log('-------------------------APPLICATION INITIALIZED-----------------------------');
        console.log('-----------------------------------------------------------------------------');

        app.ViewModel.WriteOperationTime('APPLICATION INITIALIZED');

        // When realtime server activated, start the app

        app.start().then(function() {

                console.log('-----------------------------------------------------------------------------');
                console.log('------------------------- APPLICATION STARTING-- ----------------------------');
                console.log('-----------------------------------------------------------------------------');

                //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
                //Look for partial views in a 'views' folder in the root.
                viewLocator.useConvention();

                //Show the app by setting the root view model for our application with a transition.
                // set Root of app, using shell.js and shell.html
                app.setRoot('viewmodels/shell', 'entrance');

                console.log('-----------------------------------------------------------------------------');
                console.log('------------------------- APPLICATION FINISH STARTING-------------------------');
                console.log('-----------------------------------------------------------------------------');

                app.ViewModel.WriteOperationTime('APPLICATION FINISH STARTING');

            });
    });