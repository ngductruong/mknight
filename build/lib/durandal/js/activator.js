define(["durandal/system","knockout"],function(e,t){function n(e){return void 0==e&&(e={}),e.closeOnDeactivate||(e.closeOnDeactivate=l.defaults.closeOnDeactivate),e.beforeActivate||(e.beforeActivate=l.defaults.beforeActivate),e.afterDeactivate||(e.afterDeactivate=l.defaults.afterDeactivate),e.affirmations||(e.affirmations=l.defaults.affirmations),e.interpretResponse||(e.interpretResponse=l.defaults.interpretResponse),e.areSameItem||(e.areSameItem=l.defaults.areSameItem),e}function r(t,n,r){return e.isArray(r)?t[n].apply(t,r):t[n](r)}function a(t,n,r,a,o){if(t&&t.deactivate){e.log("Deactivating",t);var i;try{i=t.deactivate(n)}catch(s){return e.error(s),a.resolve(!1),void 0}i&&i.then?i.then(function(){r.afterDeactivate(t,n,o),a.resolve(!0)},function(t){e.log(t),a.resolve(!1)}):(r.afterDeactivate(t,n,o),a.resolve(!0))}else t&&r.afterDeactivate(t,n,o),a.resolve(!0)}function o(t,n,a,o){if(t)if(t.activate){e.log("Activating",t);var i;try{i=r(t,"activate",o)}catch(s){return e.error(s),a(!1),void 0}i&&i.then?i.then(function(){n(t),a(!0)},function(t){e.log(t),a(!1)}):(n(t),a(!0))}else n(t),a(!0);else a(!0)}function i(t,n,r){return r.lifecycleData=null,e.defer(function(a){if(t&&t.canDeactivate){var o;try{o=t.canDeactivate(n)}catch(i){return e.error(i),a.resolve(!1),void 0}o.then?o.then(function(e){r.lifecycleData=e,a.resolve(r.interpretResponse(e))},function(t){e.error(t),a.resolve(!1)}):(r.lifecycleData=o,a.resolve(r.interpretResponse(o)))}else a.resolve(!0)}).promise()}function s(t,n,a,o){return a.lifecycleData=null,e.defer(function(i){if(t==n())return i.resolve(!0),void 0;if(t&&t.canActivate){var s;try{s=r(t,"canActivate",o)}catch(u){return e.error(u),i.resolve(!1),void 0}s.then?s.then(function(e){a.lifecycleData=e,i.resolve(a.interpretResponse(e))},function(t){e.error(t),i.resolve(!1)}):(a.lifecycleData=s,i.resolve(a.interpretResponse(s)))}else i.resolve(!0)}).promise()}function u(r,u){var l,c=t.observable(null);u=n(u);var d=t.computed({read:function(){return c()},write:function(e){d.viaSetter=!0,d.activateItem(e)}});return d.__activator__=!0,d.settings=u,u.activator=d,d.isActivating=t.observable(!1),d.canDeactivateItem=function(e,t){return i(e,t,u)},d.deactivateItem=function(t,n){return e.defer(function(e){d.canDeactivateItem(t,n).then(function(r){r?a(t,n,u,e,c):(d.notifySubscribers(),e.resolve(!1))})}).promise()},d.canActivateItem=function(e,t){return s(e,c,u,t)},d.activateItem=function(t,n){var r=d.viaSetter;return d.viaSetter=!1,e.defer(function(i){if(d.isActivating())return i.resolve(!1),void 0;d.isActivating(!0);var s=c();return u.areSameItem(s,t,l,n)?(d.isActivating(!1),i.resolve(!0),void 0):(d.canDeactivateItem(s,u.closeOnDeactivate).then(function(f){f?d.canActivateItem(t,n).then(function(f){f?e.defer(function(e){a(s,u.closeOnDeactivate,u,e)}).promise().then(function(){t=u.beforeActivate(t,n),o(t,c,function(e){l=n,d.isActivating(!1),i.resolve(e)},n)}):(r&&d.notifySubscribers(),d.isActivating(!1),i.resolve(!1))}):(r&&d.notifySubscribers(),d.isActivating(!1),i.resolve(!1))}),void 0)}).promise()},d.canActivate=function(){var e;return r?(e=r,r=!1):e=d(),d.canActivateItem(e)},d.activate=function(){var e;return r?(e=r,r=!1):e=d(),d.activateItem(e)},d.canDeactivate=function(e){return d.canDeactivateItem(d(),e)},d.deactivate=function(e){return d.deactivateItem(d(),e)},d.includeIn=function(e){e.canActivate=function(){return d.canActivate()},e.activate=function(){return d.activate()},e.canDeactivate=function(e){return d.canDeactivate(e)},e.deactivate=function(e){return d.deactivate(e)}},u.includeIn?d.includeIn(u.includeIn):r&&d.activate(),d.forItems=function(t){u.closeOnDeactivate=!1,u.determineNextItemToActivate=function(e,t){var n=t-1;return-1==n&&e.length>1?e[1]:n>-1&&n<e.length-1?e[n]:null},u.beforeActivate=function(e){var n=d();if(e){var r=t.indexOf(e);-1==r?t.push(e):e=t()[r]}else e=u.determineNextItemToActivate(t,n?t.indexOf(n):0);return e},u.afterDeactivate=function(e,n){n&&t.remove(e)};var n=d.canDeactivate;d.canDeactivate=function(r){return r?e.defer(function(e){function n(){for(var t=0;t<o.length;t++)if(!o[t])return e.resolve(!1),void 0;e.resolve(!0)}for(var a=t(),o=[],i=0;i<a.length;i++)d.canDeactivateItem(a[i],r).then(function(e){o.push(e),o.length==a.length&&n()})}).promise():n()};var r=d.deactivate;return d.deactivate=function(n){return n?e.defer(function(e){function r(r){d.deactivateItem(r,n).then(function(){o++,t.remove(r),o==i&&e.resolve()})}for(var a=t(),o=0,i=a.length,s=0;i>s;s++)r(a[s])}).promise():r()},d},d}var l,c={closeOnDeactivate:!0,affirmations:["yes","ok","true"],interpretResponse:function(n){return e.isObject(n)&&(n=n.can||!1),e.isString(n)?-1!==t.utils.arrayIndexOf(this.affirmations,n.toLowerCase()):n},areSameItem:function(e,t){return e==t},beforeActivate:function(e){return e},afterDeactivate:function(e,t,n){t&&n&&n(null)}};return l={defaults:c,create:u,isActivator:function(e){return e&&e.__activator__}}});