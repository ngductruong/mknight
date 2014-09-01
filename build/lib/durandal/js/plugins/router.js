define(["durandal/system","durandal/app","durandal/activator","durandal/events","durandal/composition","plugins/history","knockout","jquery"],function(e,t,n,r,i,o,a,s){function u(e){return e=e.replace(m,"\\$&").replace(g,"(?:$1)?").replace(p,function(e,t){return t?e:"([^/]+)"}).replace(h,"(.*?)"),new RegExp("^"+e+"$")}function l(e){var t=e.indexOf(":"),n=t>0?t-1:e.length;return e.substring(0,n)}function c(e,t){return-1!==e.indexOf(t,e.length-t.length)}function d(e,t){if(!e||!t)return!1;if(e.length!=t.length)return!1;for(var n=0,r=e.length;r>n;n++)if(e[n]!=t[n])return!1;return!0}var f,v,g=/\((.*?)\)/g,p=/(\(\?)?:\w+/g,h=/\*\w+/g,m=/[\-{}\[\]+?.,\\\^$|#\s]/g,b=/\/$/,y=function(){function i(e){return e.router&&e.router.parent==P}function s(e){_&&_.config.isActive&&_.config.isActive(e)}function g(t,n){e.log("Navigation Complete",t,n);var r=e.getModuleId(T);r&&P.trigger("router:navigation:from:"+r),T=t,s(!1),_=n,s(!0);var o=e.getModuleId(T);o&&P.trigger("router:navigation:to:"+o),i(t)||P.updateDocumentTitle(t,n),v.explicitNavigation=!1,v.navigatingBack=!1,P.trigger("router:navigation:complete",t,n,P)}function p(t,n){e.log("Navigation Cancelled"),P.activeInstruction(_),_&&P.navigate(_.fragment,!1),U(!1),v.explicitNavigation=!1,v.navigatingBack=!1,P.trigger("router:navigation:cancelled",t,n,P)}function h(t){e.log("Navigation Redirecting"),U(!1),v.explicitNavigation=!1,v.navigatingBack=!1,P.navigate(t,{trigger:!0,replace:!0})}function m(t,n,r){v.navigatingBack=!v.explicitNavigation&&T!=r.fragment,P.trigger("router:route:activating",n,r,P),t.activateItem(n,r.params).then(function(e){if(e){var o=T;if(g(n,r),i(n)){var a=r.fragment;r.queryString&&(a+="?"+r.queryString),n.router.loadUrl(a)}o==n&&(P.attached(),P.compositionComplete())}else t.settings.lifecycleData&&t.settings.lifecycleData.redirect?h(t.settings.lifecycleData.redirect):p(n,r);f&&(f.resolve(),f=null)}).fail(function(t){e.error(t)})}function w(t,n,r){var i=P.guardRoute(n,r);i?i.then?i.then(function(i){i?e.isString(i)?h(i):m(t,n,r):p(n,r)}):e.isString(i)?h(i):m(t,n,r):p(n,r)}function A(e,t,n){P.guardRoute?w(e,t,n):m(e,t,n)}function S(e){return _&&_.config.moduleId==e.config.moduleId&&T&&(T.canReuseForRoute&&T.canReuseForRoute.apply(T,e.params)||!T.canReuseForRoute&&T.router&&T.router.loadUrl)}function I(){if(!U()){var t=N.shift();N=[],t&&(U(!0),P.activeInstruction(t),S(t)?A(n.create(),T,t):e.acquire(t.config.moduleId).then(function(n){var r=e.resolveObject(n);A(j,r,t)}).fail(function(n){e.error("Failed to load routed module ("+t.config.moduleId+"). Details: "+n.message)}))}}function k(e){N.unshift(e),I()}function x(e,t,n){for(var r=e.exec(t).slice(1),i=0;i<r.length;i++){var o=r[i];r[i]=o?decodeURIComponent(o):null}var a=P.parseQueryString(n);return a&&r.push(a),{params:r,queryParams:a}}function D(t){P.trigger("router:route:before-config",t,P),e.isRegExp(t)?t.routePattern=t.route:(t.title=t.title||P.convertRouteToTitle(t.route),t.moduleId=t.moduleId||P.convertRouteToModuleId(t.route),t.hash=t.hash||P.convertRouteToHash(t.route),t.routePattern=u(t.route)),t.isActive=t.isActive||a.observable(!1),P.trigger("router:route:after-config",t,P),P.routes.push(t),P.route(t.routePattern,function(e,n){var r=x(t.routePattern,e,n);k({fragment:e,queryString:n,config:t,params:r.params,queryParams:r.queryParams})})}function C(t){if(e.isArray(t.route))for(var n=t.isActive||a.observable(!1),r=0,i=t.route.length;i>r;r++){var o=e.extend({},t);o.route=t.route[r],o.isActive=n,r>0&&delete o.nav,D(o)}else D(t);return P}var T,_,N=[],U=a.observable(!1),j=n.create(),P={handlers:[],routes:[],navigationModel:a.observableArray([]),activeItem:j,isNavigating:a.computed(function(){var e=j(),t=U(),n=e&&e.router&&e.router!=P&&e.router.isNavigating()?!0:!1;return t||n}),activeInstruction:a.observable(null),__router__:!0};return r.includeIn(P),j.settings.areSameItem=function(e,t,n,r){return e==t?d(n,r):!1},P.parseQueryString=function(e){var t,n;if(!e)return null;if(n=e.split("&"),0==n.length)return null;t={};for(var r=0;r<n.length;r++){var i=n[r];if(""!==i){var o=i.split("=");t[o[0]]=o[1]&&decodeURIComponent(o[1].replace(/\+/g," "))}}return t},P.route=function(e,t){P.handlers.push({routePattern:e,callback:t})},P.loadUrl=function(t){var n=P.handlers,r=null,i=t,a=t.indexOf("?");if(-1!=a&&(i=t.substring(0,a),r=t.substr(a+1)),P.relativeToParentRouter){var s=this.parent.activeInstruction();i=s.params.join("/"),i&&"/"==i.charAt(0)&&(i=i.substr(1)),i||(i=""),i=i.replace("//","/").replace("//","/")}i=i.replace(b,"");for(var u=0;u<n.length;u++){var l=n[u];if(l.routePattern.test(i))return l.callback(i,r),!0}return e.log("Route Not Found"),P.trigger("router:route:not-found",t,P),_&&o.navigate(_.fragment,{trigger:!1,replace:!0}),v.explicitNavigation=!1,v.navigatingBack=!1,!1},P.updateDocumentTitle=function(e,n){n.config.title?document.title=t.title?n.config.title+" | "+t.title:n.config.title:t.title&&(document.title=t.title)},P.navigate=function(e,t){return e&&-1!=e.indexOf("://")?(window.location.href=e,!0):(v.explicitNavigation=!0,o.navigate(e,t))},P.navigateBack=function(){o.navigateBack()},P.attached=function(){P.trigger("router:navigation:attached",T,_,P)},P.compositionComplete=function(){U(!1),P.trigger("router:navigation:composition-complete",T,_,P),I()},P.convertRouteToHash=function(e){if(P.relativeToParentRouter){var t=P.parent.activeInstruction(),n=t.config.hash+"/"+e;return o._hasPushState&&(n="/"+n),n=n.replace("//","/").replace("//","/")}return o._hasPushState?e:"#"+e},P.convertRouteToModuleId=function(e){return l(e)},P.convertRouteToTitle=function(e){var t=l(e);return t.substring(0,1).toUpperCase()+t.substring(1)},P.map=function(t,n){if(e.isArray(t)){for(var r=0;r<t.length;r++)P.map(t[r]);return P}return e.isString(t)||e.isRegExp(t)?(n?e.isString(n)&&(n={moduleId:n}):n={},n.route=t):n=t,C(n)},P.buildNavigationModel=function(t){for(var n=[],r=P.routes,i=t||100,o=0;o<r.length;o++){var a=r[o];a.nav&&(e.isNumber(a.nav)||(a.nav=++i),n.push(a))}return n.sort(function(e,t){return e.nav-t.nav}),P.navigationModel(n),P},P.mapUnknownRoutes=function(t,n){var r="*catchall",i=u(r);return P.route(i,function(a,s){var u=x(i,a,s),l={fragment:a,queryString:s,config:{route:r,routePattern:i},params:u.params,queryParams:u.queryParams};if(t)if(e.isString(t))l.config.moduleId=t,n&&o.navigate(n,{trigger:!1,replace:!0});else if(e.isFunction(t)){var c=t(l);if(c&&c.then)return c.then(function(){P.trigger("router:route:before-config",l.config,P),P.trigger("router:route:after-config",l.config,P),k(l)}),void 0}else l.config=t,l.config.route=r,l.config.routePattern=i;else l.config.moduleId=a;P.trigger("router:route:before-config",l.config,P),P.trigger("router:route:after-config",l.config,P),k(l)}),P},P.reset=function(){return _=T=void 0,P.handlers=[],P.routes=[],P.off(),delete P.options,P},P.makeRelative=function(t){return e.isString(t)&&(t={moduleId:t,route:t}),t.moduleId&&!c(t.moduleId,"/")&&(t.moduleId+="/"),t.route&&!c(t.route,"/")&&(t.route+="/"),t.fromParent&&(P.relativeToParentRouter=!0),P.on("router:route:before-config").then(function(e){t.moduleId&&(e.moduleId=t.moduleId+e.moduleId),t.route&&(e.route=""===e.route?t.route.substring(0,t.route.length-1):t.route+e.route)}),P},P.createChildRouter=function(){var e=y();return e.parent=P,e},P};return v=y(),v.explicitNavigation=!1,v.navigatingBack=!1,v.targetIsThisWindow=function(e){var t=s(e.target).attr("target");return!t||t===window.name||"_self"===t||"top"===t&&window===window.top?!0:!1},v.activate=function(t){return e.defer(function(n){if(f=n,v.options=e.extend({routeHandler:v.loadUrl},v.options,t),o.activate(v.options),o._hasPushState)for(var r=v.routes,i=r.length;i--;){var a=r[i];a.hash=a.hash.replace("#","")}s(document).delegate("a","click",function(e){if(o._hasPushState){if(!e.altKey&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&v.targetIsThisWindow(e)){var t=s(this).attr("href");null==t||"#"===t.charAt(0)||/^[a-z]+:/i.test(t)||(v.explicitNavigation=!0,e.preventDefault(),o.navigate(t))}}else v.explicitNavigation=!0}),o.options.silent&&f&&(f.resolve(),f=null)}).promise()},v.deactivate=function(){o.deactivate()},v.install=function(){a.bindingHandlers.router={init:function(){return{controlsDescendantBindings:!0}},update:function(e,t,n,r,o){var s=a.utils.unwrapObservable(t())||{};if(s.__router__)s={model:s.activeItem(),attached:s.attached,compositionComplete:s.compositionComplete,activate:!1};else{var u=a.utils.unwrapObservable(s.router||r.router)||v;s.model=u.activeItem(),s.attached=u.attached,s.compositionComplete=u.compositionComplete,s.activate=!1}i.compose(e,s,o)}},a.virtualElements.allowedBindings.router=!0},v});