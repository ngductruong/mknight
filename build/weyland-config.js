exports.config = function(weyland) {
    weyland.build('main')
        .task.jshint({
            include:'app/**/*.js'
        })
        .task.uglifyjs({
            include:['app/**/*.js', 'lib/durandal/**/*.js']
        })
        .task.rjs({
            include:['app/**/*.{js,html}', 'lib/durandal/**/*.js'],
            loaderPluginExtensionMaps:{
                '.html':'text'
            },
            rjs:{
                name:'../lib/require/almond-custom', //to deploy with require.js, use the build's name here instead
                insertRequire:['main'], //not needed for require
                baseUrl : 'app',
                wrap:true, //not needed for require
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
                inlineText: true,
                optimize : 'none',
                pragmas: {
                    build: true
                },
                stubModules : ['text'],
                keepBuildDir: true,
                out:'app/main-built.js'
            }
        });
}