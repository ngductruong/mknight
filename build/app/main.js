requirejs.config({waitSeconds:30,paths:{text:"../lib/require/text",durandal:"../lib/durandal/js",plugins:"../lib/durandal/js/plugins",transitions:"../lib/durandal/js/transitions",knockout:"../lib/knockout/knockout-2.3.0",bootstrap:"../lib/bootstrap/js/bootstrap",jquery:"../lib/jquery/jquery-1.9.1",string:"../lib/string/string.min","slimscroll-plugin":"../lib/jquery-slimscroll/jquery.slimscroll",snap:"../lib/snapjs/snap",entity:"../app/entity"},shim:{bootstrap:{deps:["jquery"],exports:"jQuery"}}}),require(["jquery","knockout","durandal/system","durandal/app","durandal/viewLocator","string","entity/vm"],function(e,t,r,o,n,a,s){r.debug(!0),o.title="MKnight - Mobile application template using DurandalJs",o.ViewModel=new s,console.log(o.ViewModel.StartDate()),o.configurePlugins({router:!0,dialog:!0,widget:!0}),console.log("-----------------------------------------------------------------------------"),console.log("-------------------------APPLICATION INITIALIZED-----------------------------"),console.log("-----------------------------------------------------------------------------"),o.ViewModel.WriteOperationTime("APPLICATION INITIALIZED"),o.start().then(function(){console.log("-----------------------------------------------------------------------------"),console.log("------------------------- APPLICATION STARTING-- ----------------------------"),console.log("-----------------------------------------------------------------------------"),n.useConvention(),o.setRoot("viewmodels/shell","entrance"),console.log("-----------------------------------------------------------------------------"),console.log("------------------------- APPLICATION FINISH STARTING-------------------------"),console.log("-----------------------------------------------------------------------------"),o.ViewModel.WriteOperationTime("APPLICATION FINISH STARTING")})});