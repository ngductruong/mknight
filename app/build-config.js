({
    baseUrl: "",
    
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
    name: "main",
    out: "main-built.js"
})