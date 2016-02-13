!function(){"use strict";angular.module("gcloud",["gcloud.manifest","ui.router","hljs"])}(),function(){"use strict";function e(){return{restrict:"E",replace:!0,templateUrl:"app/components/version-switcher/version-switcher.html"}}angular.module("gcloud").directive("versionSwitcher",e)}(),function(){"use strict";function e(){function e(e,i){return e.filter(function(e){return t(e,i)})}function t(e,t){var i;for(i in t)if(e[i]!==t[i])return!1;return!0}function i(t,i){var a=e(t,i);return a.length?a[0]:null}function a(e){return angular.isArray(e)?e:[e]}return{contains:t,where:e,findWhere:i,arrify:a}}angular.module("gcloud").factory("util",e)}(),function(){"use strict";function e(e,t,i){var a=i("#/docs/{{version}}{{href}}");return{restrict:"A",link:function(i,n,s){function r(){return e.path()}function l(e){return e="#"+e,e===o?void n.addClass("current"):void n.removeClass("current")}var o=a({version:t.params.version,href:s.sideNavLink});n.attr("href",o),i.$watch(r,l)}}}e.$inject=["$location","$state","$interpolate"],angular.module("gcloud").directive("sideNavLink",e)}(),function(){"use strict";function e(e){return{restrict:"E",replace:!0,transclude:!0,scope:{title:"="},template:function(){return'<header class="docs-header"><div class="row"><div class="col-60 margin-vertical"><h1 class="page-title">'+t[e.lang]+'</h1></div><div class="col-40" ng-transclude></div></div></header>'}}}e.$inject=["manifest"],angular.module("gcloud").directive("pageHeader",e);var t={node:'{{title ? title.join(" » ") : "Node.js"}}'}}(),function(){"use strict";function e(e){return{restrict:"E",link:function(t,i){var a=e.makeHtml(i.text()),n=angular.element(a);[].slice.call(n.find("code")).filter(function(e){return"pre"===e.parentNode.tagName.toLowerCase()}).forEach(function(e){hljs.highlightBlock(e)}),i.html("").append(n)}}}e.$inject=["markdownConverter"],angular.module("gcloud").directive("markdown",e)}(),function(){"use strict";function e(e,t){function i(e,t,i){var s=/^\#/.test(i),l=s?a(i):n(i);return r({text:t,href:l})}function a(e){return s({section:e.replace("#","")})}function n(e){return s({guideId:e.replace(/\//g,"").replace("readme.md","")})}function s(e){var i=angular.extend({},t.params,e);return t.href("docs.guides",i)}var r=e('<a href="{{href}}">{{text}}</a>');return new showdown.Converter({extensions:[function(){return[{type:"lang",regex:"\\[([^\\]]+)\\]\\(([\\/|\\#][^)]+)\\)",replace:i}]}]})}e.$inject=["$interpolate","$state"],angular.module("gcloud").factory("markdownConverter",e)}(),function(){"use strict";function e(){return{restrict:"A",templateUrl:"app/components/language-switcher/language-switcher.html",controller:t,controllerAs:"switcher",bindToController:!0}}function t(e){var t=this;t.langs=e}t.$inject=["langs"],angular.module("gcloud").directive("languageSwitcher",e)}(),function(){"use strict";function e(e,t){function i(e,t){return e.$watch(t,a)}function a(i){return e(t,n,null,i)}var n=250;return t.yOffset=70,{watch:i,scrollTo:a}}e.$inject=["$timeout","$anchorScroll"],angular.module("gcloud").factory("DeeplinkService",e)}(),function(){"use strict";function e(e,t){var i={node:function(t){var i=t.split("#"),a="docs.service",n={serviceId:i[0]},s={inherit:!1};return i.length>1&&(n.method=i[1]),e.href(a,n,s)}}[t.lang];return{restrict:"A",link:function(e,t,a){var n=a.customType;t.html(n).addClass("skip-external-link").attr("href",i(n.replace("[]","")))}}}e.$inject=["$state","manifest"],angular.module("gcloud").directive("customType",e)}(),function(){"use strict";function e(e){return{restrict:"A",link:function(t,i,a){function n(){return t.$eval(a.bindHtmlCompile)}function s(a){i.html(a),e(i.contents())(t),r()}var r=t.$watch(n,s)}}}e.$inject=["$compile"],angular.module("gcloud").directive("bindHtmlCompile",e)}(),function(){"use strict";function e(){return{restrict:"E",link:t}}function t(e,t){var i=t.hasClass("skip-external-link");if(!i){var a=t.attr("href"),n=/^http/.test(a);n&&t.attr("target","_blank")}}angular.module("gcloud").directive("a",e)}(),function(){"use strict";function e(e,t,i,a,n){function s(e){return e.metadata.name}function r(){return i.watch(e,l)}function l(){return t.params&&t.params.method}function o(e,t){if(e.metadata.constructor)return-1;if(t.metadata.constructor)return 1;var i=e.metadata.name,a=t.metadata.name;return+(i>a)||+(i===a)-1}var c=this;c.methods=n.methods.map(a.setAsTrusted).sort(o),c.metadata=a.setAsTrusted(n||{}).metadata,c.methodNames=c.methods.map(s),c.title=n.metadata.title,c.showGettingStarted=!1,e.$on("$viewContentLoaded",r)}e.$inject=["$scope","$state","DeeplinkService","DocsService","serviceObject"],angular.module("gcloud").controller("ServiceCtrl",e)}(),function(){"use strict";function e(e,i){i.state("home",{url:"/",templateUrl:"app/home/home.html",controller:"HomeCtrl",controllerAs:"home",resolve:{latestRelease:t}})}function t(e,t){var i="https://api.github.com/repos/GoogleCloudPlatform/gcloud-"+t.lang+"/releases/latest";return e.get(i).then(function(e){var t=e.data;return{name:t.tag_name,date:new Date(t.published_at),link:t.html_url}}).then(null,angular.noop)}e.$inject=["manifest","$stateProvider"],t.$inject=["$http","manifest"],angular.module("gcloud").config(e)}(),function(){"use strict";function e(e,t){var i=this;i.contentUrl=[e.content,e.home].join("/"),i.latestRelease=t}e.$inject=["manifest","latestRelease"],angular.module("gcloud").controller("HomeCtrl",e)}(),function(){"use strict";function e(e,t,i,a,n,s,r,l){function o(){return r.watch(e,c)}function c(){var e=t.params&&t.params.section;return e?e.replace(/\-/g,""):null}function u(e){return/^http/.test(e)?i.trustAsResourceUrl(e):a("{{content}}/{{version}}/{{data}}")({content:s.content,version:t.params.version,data:e})}var d=this;d.title=[n.title],d.contents=l.arrify(n.contents).map(u),d.editUrl=n.edit?u(n.edit):null,e.$on("$viewContentLoaded",o)}e.$inject=["$scope","$state","$sce","$interpolate","guideObject","manifest","DeeplinkService","util"],angular.module("gcloud").controller("GuideCtrl",e)}(),function(){"use strict";function e(e,t){function i(t){var i=angular.copy(t);return i.metadata&&(i.metadata.description=e.trustAsHtml(i.metadata.description),i.metadata.isConstructor=i.metadata.constructor===!0,i.metadata.examples&&(i.metadata.examples=i.metadata.examples.map(n))),i.returns&&(i.returns=i.returns.map(a)),i.params&&(i.params=i.params.map(s)),i}function a(t){return e.trustAsHtml(t.types.join(", "))}function n(i){var a,n;return i.code&&(a=hljs.highlight(t.markdown,i.code),a=e.trustAsHtml(a.value)),i.caption&&(n=e.trustAsHtml(i.caption)),{code:a,caption:n}}function s(t){var i=t.name.split(".");return i.length>1&&(t.name=i.pop(),t.parent=i.join(".")),t.types=e.trustAsHtml(t.types.join(", ")),t.description=e.trustAsHtml(t.description),t}return{setAsTrusted:i}}e.$inject=["$sce","manifest"],angular.module("gcloud").factory("DocsService",e)}(),function(){"use strict";function e(e,r,l,o){var c="\\bv?(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)(?:-[\\da-z-]+(?:\\.[\\da-z\\-]+)*)?(?:\\+[\\da-z\\-]+(?:\\.[\\da-z\\-]+)*)?\\b",u=o.versions[0];l.type("nonURIEncoded",{encode:s,decode:s,is:function(){return!0}}),e.state("docs",{url:"/docs/{version:master|"+c+"}",templateUrl:"app/docs/docs.html",controller:"DocsCtrl",controllerAs:"docs",resolve:{lastBuiltDate:t},params:{version:u},redirectTo:"docs.service"}).state("docs.guides",{url:"/guides/:guideId?section",templateUrl:"app/guide/guide.html",controller:"GuideCtrl",controllerAs:"guide",resolve:{guideObject:i}}).state("docs.service",{url:"/{serviceId:nonURIEncoded}?method",templateUrl:"app/service/service.html",controller:"ServiceCtrl",controllerAs:"service",resolve:{serviceObject:a},params:{serviceId:"gcloud"}}),r.when("/docs",n),r.otherwise(function(e,t){var i=t.path(),a="/docs/",n=-1===i.indexOf(a);if(n)return"/";var s=e.get("manifest").versions,r=i.replace(a,"").split("/"),l=-1!==s.indexOf(r[0]);return l?a+r[0]:("latest"===r[0]||"stable"===r[0]?r[0]=u:r.unshift(u),a+r.join("/"))})}function t(e,t){var i="https://api.github.com/repos/GoogleCloudPlatform/gcloud-"+t.lang+"/commits?sha=gh-pages&per_page=1";return e({method:"get",url:i,cache:!0}).then(function(e){return e.data[0].commit.committer.date}).then(null,angular.noop)}function i(e,t,i,a){var n=t.guideId.replace(/\-/g," "),s=i.findWhere(a.guides,{id:n});return s?s:e.go("docs.service")}function a(e,t,i,a,n,s){var r=t.serviceId.split("/"),l=r[0],o=r[1],c=s.findWhere(n.services,{id:l}),u=c&&c.title?[c.title]:null;c&&o&&(c=s.findWhere(c.nav,{id:o}),u.push(c.title));var d=i("{{content}}/{{version}}/{{data}}")({content:n.content,version:t.version,data:c.contents});return a.get(d).then(function(e){var t=e.data;return t.metadata.title=u,t})}function n(e,t){e.go("docs.service",{version:t.version,serviceId:"gcloud"})}function s(e){return e?e.toString():null}e.$inject=["$stateProvider","$urlRouterProvider","$urlMatcherFactoryProvider","manifest"],t.$inject=["$http","manifest"],i.$inject=["$state","$stateParams","util","manifest"],a.$inject=["$state","$stateParams","$interpolate","$http","manifest","util"],n.$inject=["$state","$stateParams"],angular.module("gcloud").config(e)}(),function(){"use strict";function e(e,t,i,a){function n(t){return e.go(e.current.name,{version:t})}function s(t){return!!(e.params.serviceId||"").match(t)}function r(e){return e.title.toLowerCase().replace(/\s/g,"-")}function l(t){var i=e.params.version;return"master"===i?!0:semver.satisfies(i,t.implemented||"*")}function o(e){e.nav&&(e.nav=e.nav.filter(l))}var c=this;c.langs=t,c.lastBuiltDate=a,c.guides=angular.copy(i.guides).filter(l),c.services=angular.copy(i.services).filter(l),c.services.forEach(o),c.version=e.params.version,c.overviewFileUrl=null,c.selectedVersion=c.version,c.loadVersion=n,c.getGuideUrl=r,c.isActive=s,i.overview&&(c.overviewFileUrl=[i.content,e.params.version,i.overview].join("/"))}e.$inject=["$state","langs","manifest","lastBuiltDate"],angular.module("gcloud").controller("DocsCtrl",e)}(),function(){"use strict";function e(e,t,i){angular.extend(t,i),t.$on("$stateChangeStart",function(t,i,a){i.redirectTo&&(t.preventDefault(),e.go(i.redirectTo,a))}),t.$on("$stateChangeError",function(){e.go("docs.service",{version:e.params.version,serviceId:"gcloud"})})}e.$inject=["$state","$rootScope","manifest"],angular.module("gcloud").run(e)}(),function(){"use strict";angular.module("gcloud").constant("langs",[{friendly:"Java",key:"java"},{friendly:"Node.js",key:"node"},{friendly:"Python",key:"python"},{friendly:"Ruby",key:"ruby"}])}(),angular.module("gcloud").run(["$templateCache",function(e){e.put("app/docs/docs.html",'<article class="main lang-page" role="main"><header class="page-header fixed" role="banner"><h1 class="logo"><a href="." title="Home"><img src="src/images/logo.svg" alt="Google Cloud Platform"> <span class="gcloud">gcloud</span></a></h1><div language-switcher=""></div><div class="header--right"><a ng-href="https://github.com/GoogleCloudPlatform/gcloud-{{::lang}}/issues/new" class="v-btn skip-external-link"><img src="src/images/icon-link-github.svg"> Report an Issue</a></div></header><section ui-view=""></section><nav class="side-nav visible-lg"><version-switcher></version-switcher><ul class="page-sections external-links" ng-if="docs.guides.length"><li><h4 class="list-item--heading">Getting Started</h4></li><li ng-repeat="page in docs.guides"><a side-nav-link="/guides/{{page.id}}">{{page.title}}</a></li></ul><ul class="page-sections" ng-if="docs.services.length"><li><h4 class="list-item--heading">API</h4></li><li ng-repeat="service in docs.services"><a side-nav-link="/{{service.id}}">{{service.title || service.id}}</a><ul class="sub-sections" ng-if="service.nav && docs.isActive(service.id)"><li ng-repeat="page in service.nav"><a side-nav-link="/{{service.id}}/{{page.id}}">{{page.title || page.id}}</a></li></ul></li></ul><ul class="external-links"><li><a ng-href="https://github.com/GoogleCloudPlatform/gcloud-{{::lang}}" title="gcloud on Github" class="skip-external-link"><img src="src/images/icon-link-github.svg" alt="GitHub icon"> GitHub</a></li><li><a ng-href="https://github.com/GoogleCloudPlatform/gcloud-{{::lang}}/issues" title="gcloud issues on Github" class="skip-external-link"><img src="src/images/icon-link-github.svg" alt="GitHub icon"> Issues</a></li><li><a ng-href="http://stackoverflow.com/questions/tagged/gcloud-{{::lang}}" title="gcloud on StackOverflow" class="skip-external-link"><img src="src/images/icon-link-stackoverflow.svg" alt="StackOverflow icon"> StackOverflow</a></li><li><a ng-href="{{::package.href}}" ng-attr-title="gcloud on {{::package.title}}" class="skip-external-link"><img src="src/images/icon-link-package-manager.svg" ng-attr-alt="{{::package.title}} icon"> {{::package.title}}</a></li></ul></nav></article>'),e.put("app/guide/guide.html",'<page-header title="guide.title"><div class="row row--right" ng-if="guide.editUrl"><div class="col margin-vertical"><a ng-href="{{guide.editUrl}}" class="v-btn" title="Edit on Github"><img src="src/images/icon-link-github.svg"> Edit on GitHub</a></div></div></page-header><version-switcher class="invisible-lg side-nav--meta--top"></version-switcher><article class="content"><markdown ng-repeat="content in guide.contents" ng-include="content"></markdown></article>'),e.put("app/home/home.html",'<header class="page-header" role="banner"><h1 class="logo"><img src="src/images/logo-full.svg" alt="Google Cloud Platform"></h1><div language-switcher="" class="language-switcher--home"></div></header><article role="main" class="main" ng-include="home.contentUrl"></article>'),e.put("app/service/service.html",'<page-header title="service.title"></page-header><version-switcher class="invisible-lg side-nav--meta--top"></version-switcher><article class="content"><div ng-if="docs.overviewFileUrl"><h3 class="sub-heading toggle" ng-click="service.showGettingStarted = !service.showGettingStarted"><div class="toggler"><span ng-if="!service.showGettingStarted">▹</span> <span ng-if="service.showGettingStarted">▿</span></div><span>Getting Started with <code>gcloud</code></span></h3><article ng-show="service.showGettingStarted" ng-include="docs.overviewFileUrl"></article><hr></div><article ng-if="service.metadata.description"><h3>{{::service.metadata.name}} Overview</h3><div bind-html-compile="service.metadata.description"></div><section ng-if="service.metadata.resources.length"><h4>More Information</h4><ul class="resource-links"><li ng-repeat="resource in service.metadata.resources"><a ng-href="{{resource.link}}">{{resource.title}}</a></li></ul></section></article><article ng-repeat="method in service.methods"><h2 ng-if="method.metadata.isConstructor">{{::method.metadata.name}}</h2><h3 id="{{::method.metadata.name}}" ng-if="!method.metadata.isConstructor" class="method-heading"><a class="permalink" ui-sref="docs.service({ method: method.metadata.name })"><span>#</span> {{::method.metadata.name}}</a></h3><div bind-html-compile="method.metadata.description"></div><div ng-if="method.metadata.isConstructor" class="notice">Available methods: <span ng-repeat="method in service.methods"><span ng-if="!method.metadata.isConstructor"><a ui-sref="docs.service({ method: method.metadata.name })">{{method.metadata.name}}</a>{{$last ? \'\' : \', \'}}</span></span></div><section ng-if="method.params.length"><h4>Parameters</h4><table class="table"><tbody><tr ng-repeat="param in method.params" ng-class="{ \'param-optional\': param.optional, \'param-nullable\': param.nullable }"><th scope="row" class="param"><span ng-if="param.parent" class="param-parent"><div>{{::param.parent}}</div>↳</span> {{::param.name}}</th><td class="param-types" bind-html-compile="param.types"></td><td class="param-description" bind-html-compile="param.description"></td></tr></tbody></table></section><section ng-if="method.returns.length"><h4>Returns</h4><p bind-html-compile="method.returns[0]"></p></section><section ng-if="method.metadata.examples.length"><h4>Example</h4><div ng-repeat="example in method.metadata.examples"><div ng-if="example.caption" bind-html-compile="example.caption"></div><div ng-if="example.code" class="code-block"><pre><code class="hljs" bind-html-compile="example.code"></code></pre></div></div></section><section><h4>More Information</h4><ul class="resource-links"><li><a ng-href="https://github.com/GoogleCloudPlatform/gcloud-{{lang}}/blob/{{docs.version}}/{{method.metadata.source}}">Source Code</a></li><li ng-repeat="resource in method.metadata.resources"><a ng-href="{{resource.link}}">{{resource.title}}</a></li></ul></section></article></article>'),e.put("app/components/language-switcher/language-switcher.html",'<nav class="main-nav" ng-class="{ open: showNavDropdown }"><div class="nav-current" ng-click="showNavDropdown = !showNavDropdown">{{::friendlyLang}}</div><div ng-click="showNavDropdown = false"><ul class="menu"><li ng-if="docs.guides.length" class="invisible-lg"><h4 class="list-item--heading">Getting Started</h4></li><li ng-repeat="page in docs.guides" class="invisible-lg"><a side-nav-link="/guides/{{page.id}}">{{page.title}}</a></li><li ng-if="docs.services.length" class="invisible-lg"><h4 class="list-item--heading">API</h4></li><li ng-repeat="service in docs.services" class="menu--extra-links-item invisible-lg"><a side-nav-link="/{{service.id}}">{{service.title || service.id}}</a><ul class="sub-sections" ng-if="service.nav"><li ng-repeat="page in service.nav"><a side-nav-link="/{{service.id}}/{{page.id}}">{{page.title || page.id}}</a></li></ul></li><li class="invisible-lg"><h4 class="list-item--heading">External Resources</h4></li><li class="invisible-lg"><a ng-href="https://github.com/GoogleCloudPlatform/gcloud-{{::lang}}" title="gcloud on Github" class="skip-external-link"><img src="src/images/icon-link-github.svg" alt="GitHub icon" class="menu-icon"> GitHub</a></li><li class="invisible-lg"><a ng-href="https://github.com/GoogleCloudPlatform/gcloud-{{::lang}}/issues" title="gcloud issues on Github" class="skip-external-link"><img src="src/images/icon-link-github.svg" alt="GitHub icon" class="menu-icon"> Issues</a></li><li class="invisible-lg"><a ng-href="http://stackoverflow.com/questions/tagged/gcloud-{{::lang}}" title="gcloud on StackOverflow" class="skip-external-link"><img src="src/images/icon-link-stackoverflow.svg" alt="StackOverflow icon" class="menu-icon"> StackOverflow</a></li><li class="invisible-lg"><a ng-href="{{::package.href}}" ng-attr-title="gcloud on {{::package.title}}" class="skip-external-link"><img src="src/images/icon-link-package-manager.svg" ng-attr-alt="{{::package.title}} icon" class="menu-icon"> {{::package.title}}</a></li><li class="invisible-lg"><h4 class="list-item--heading">gcloud Libraries</h4></li><li ng-repeat="lang in switcher.langs"><a ng-href="https://googlecloudplatform.github.io/gcloud-{{::lang.key}}" ng-attr-title="gcloud-{{::lang.key}}" class="skip-external-link"><img ng-src="src/images/icon-lang-{{::lang.key}}.svg" ng-attr-alt="gcloud-{{::lang.key}}" class="menu-icon"> {{::lang.friendly}}</a></li></ul></div></nav>'),e.put("app/components/version-switcher/version-switcher.html",'<div class="side-nav--meta"><div class="row row--sm"><div class="col"><small><em>Browsing Version</em></small> &nbsp;<select ng-model="docs.selectedVersion" ng-options="version for version in versions" ng-change="docs.loadVersion(docs.selectedVersion)"></select><div ng-if="selectedVersion.name === \'master\' && docs.lastBuiltDate"><small><em>Docs last built {{docs.lastBuiltDate | date : longDate}}.</em></small></div></div></div></div>')}]);