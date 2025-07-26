function t(t,e){void 0===e&&(e={});for(var n=function(t){for(var e=[],n=0;n<t.length;){var r=t[n];if("*"!==r&&"+"!==r&&"?"!==r)if("\\"!==r)if("{"!==r)if("}"!==r)if(":"!==r)if("("!==r)e.push({type:"CHAR",index:n,value:t[n++]});else{var i=1,o="";if("?"===t[a=n+1])throw new TypeError('Pattern cannot start with "?" at '.concat(a));for(;a<t.length;)if("\\"!==t[a]){if(")"===t[a]){if(0===--i){a++;break}}else if("("===t[a]&&(i++,"?"!==t[a+1]))throw new TypeError("Capturing groups are not allowed at ".concat(a));o+=t[a++]}else o+=t[a++]+t[a++];if(i)throw new TypeError("Unbalanced pattern at ".concat(n));if(!o)throw new TypeError("Missing pattern at ".concat(n));e.push({type:"PATTERN",index:n,value:o}),n=a}else{for(var s="",a=n+1;a<t.length;){var c=t.charCodeAt(a);if(!(c>=48&&c<=57||c>=65&&c<=90||c>=97&&c<=122||95===c))break;s+=t[a++]}if(!s)throw new TypeError("Missing parameter name at ".concat(n));e.push({type:"NAME",index:n,value:s}),n=a}else e.push({type:"CLOSE",index:n,value:t[n++]});else e.push({type:"OPEN",index:n,value:t[n++]});else e.push({type:"ESCAPED_CHAR",index:n++,value:t[n++]});else e.push({type:"MODIFIER",index:n,value:t[n++]})}return e.push({type:"END",index:n,value:""}),e}(t),i=e.prefixes,o=void 0===i?"./":i,s=e.delimiter,a=void 0===s?"/#?":s,c=[],u=0,f=0,h="",l=function(t){if(f<n.length&&n[f].type===t)return n[f++].value},d=function(t){var e=l(t);if(void 0!==e)return e;var r=n[f],i=r.type,o=r.index;throw new TypeError("Unexpected ".concat(i," at ").concat(o,", expected ").concat(t))},p=function(){for(var t,e="";t=l("CHAR")||l("ESCAPED_CHAR");)e+=t;return e},w=function(t){var e=c[c.length-1],n=t||(e&&"string"==typeof e?e:"");if(e&&!n)throw new TypeError('Must have text between two parameters, missing text after "'.concat(e.name,'"'));return!n||function(t){for(var e=0,n=a;e<n.length;e++){var r=n[e];if(t.indexOf(r)>-1)return!0}return!1}(n)?"[^".concat(r(a),"]+?"):"(?:(?!".concat(r(n),")[^").concat(r(a),"])+?")};f<n.length;){var v=l("CHAR"),y=l("NAME"),m=l("PATTERN");if(y||m){var E=v||"";-1===o.indexOf(E)&&(h+=E,E=""),h&&(c.push(h),h=""),c.push({name:y||u++,prefix:E,suffix:"",pattern:m||w(E),modifier:l("MODIFIER")||""})}else{var g=v||l("ESCAPED_CHAR");if(g)h+=g;else if(h&&(c.push(h),h=""),l("OPEN")){E=p();var b=l("NAME")||"",x=l("PATTERN")||"",R=p();d("CLOSE"),c.push({name:b||(x?u++:""),pattern:b&&!x?w(E):x,prefix:E,suffix:R,modifier:l("MODIFIER")||""})}else d("END")}}return c}function e(e,r){return n(t(e,r),r)}function n(t,e){void 0===e&&(e={});var n=i(e),r=e.encode,o=void 0===r?function(t){return t}:r,s=e.validate,a=void 0===s||s,c=t.map((function(t){if("object"==typeof t)return new RegExp("^(?:".concat(t.pattern,")$"),n)}));return function(e){for(var n="",r=0;r<t.length;r++){var i=t[r];if("string"!=typeof i){var s=e?e[i.name]:void 0,u="?"===i.modifier||"*"===i.modifier,f="*"===i.modifier||"+"===i.modifier;if(Array.isArray(s)){if(!f)throw new TypeError('Expected "'.concat(i.name,'" to not repeat, but got an array'));if(0===s.length){if(u)continue;throw new TypeError('Expected "'.concat(i.name,'" to not be empty'))}for(var h=0;h<s.length;h++){var l=o(s[h],i);if(a&&!c[r].test(l))throw new TypeError('Expected all "'.concat(i.name,'" to match "').concat(i.pattern,'", but got "').concat(l,'"'));n+=i.prefix+l+i.suffix}}else if("string"!=typeof s&&"number"!=typeof s){if(!u){var d=f?"an array":"a string";throw new TypeError('Expected "'.concat(i.name,'" to be ').concat(d))}}else{l=o(String(s),i);if(a&&!c[r].test(l))throw new TypeError('Expected "'.concat(i.name,'" to match "').concat(i.pattern,'", but got "').concat(l,'"'));n+=i.prefix+l+i.suffix}}else n+=i}return n}}function r(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function i(t){return t&&t.sensitive?"":"i"}function o(e,n,o){return function(t,e,n){void 0===n&&(n={});for(var o=n.strict,s=void 0!==o&&o,a=n.start,c=void 0===a||a,u=n.end,f=void 0===u||u,h=n.encode,l=void 0===h?function(t){return t}:h,d=n.delimiter,p=void 0===d?"/#?":d,w=n.endsWith,v="[".concat(r(void 0===w?"":w),"]|$"),y="[".concat(r(p),"]"),m=c?"^":"",E=0,g=t;E<g.length;E++){var b=g[E];if("string"==typeof b)m+=r(l(b));else{var x=r(l(b.prefix)),R=r(l(b.suffix));if(b.pattern)if(e&&e.push(b),x||R)if("+"===b.modifier||"*"===b.modifier){var $="*"===b.modifier?"?":"";m+="(?:".concat(x,"((?:").concat(b.pattern,")(?:").concat(R).concat(x,"(?:").concat(b.pattern,"))*)").concat(R,")").concat($)}else m+="(?:".concat(x,"(").concat(b.pattern,")").concat(R,")").concat(b.modifier);else{if("+"===b.modifier||"*"===b.modifier)throw new TypeError('Can not repeat "'.concat(b.name,'" without a prefix and suffix'));m+="(".concat(b.pattern,")").concat(b.modifier)}else m+="(?:".concat(x).concat(R,")").concat(b.modifier)}}if(f)s||(m+="".concat(y,"?")),m+=n.endsWith?"(?=".concat(v,")"):"$";else{var A=t[t.length-1],C="string"==typeof A?y.indexOf(A[A.length-1])>-1:void 0===A;s||(m+="(?:".concat(y,"(?=").concat(v,"))?")),C||(m+="(?=".concat(y,"|").concat(v,")"))}return new RegExp(m,i(n))}(t(e,o),n,o)}function s(t,e,n){return t instanceof RegExp?function(t,e){if(!e)return t;for(var n=/\((?:\?<(.*?)>)?(?!\?)/g,r=0,i=n.exec(t.source);i;)e.push({name:i[1]||r++,prefix:"",suffix:"",modifier:"",pattern:""}),i=n.exec(t.source);return t}(t,e):Array.isArray(t)?function(t,e,n){var r=t.map((function(t){return s(t,e,n).source}));return new RegExp("(?:".concat(r.join("|"),")"),i(n))}(t,e,n):o(t,e,n)}function a(t){return"object"==typeof t&&!!t}function c(t){return"function"==typeof t}function u(t){return"string"==typeof t}function f(t=[]){return Array.isArray(t)?t:[t]}function h(t){return`[Vaadin.Router] ${t}`}class l extends Error{code;context;constructor(t){super(h(`Page not found (${t.pathname})`)),this.context=t,this.code=404}}const d=Symbol("NotFoundResult");function p(t){return new l(t)}function w(t){return(Array.isArray(t)?t[0]:t)??""}function v(t){return w(t?.path)}const y=new Map;function m(t){try{return decodeURIComponent(t)}catch{return t}}y.set("|false",{keys:[],pattern:/(?:)/u});var E=function(t,e,n=!1,r=[],i){const o=`${t}|${String(n)}`,a=w(e);let c=y.get(o);if(!c){const e=[];c={keys:e,pattern:s(t,e,{end:n,strict:""===t})},y.set(o,c)}const u=c.pattern.exec(a);if(!u)return null;const f={...i};for(let t=1;t<u.length;t++){const e=c.keys[t-1],n=e.name,r=u[t];void 0===r&&Object.hasOwn(f,n)||("+"===e.modifier||"*"===e.modifier?f[n]=r?r.split(/[/?#]/u).map(m):[]:f[n]=r?m(r):r)}return{keys:[...r,...c.keys],params:f,path:u[0]}};var g=function t(e,n,r,i,o){let s,a,c=0,u=v(e);return u.startsWith("/")&&(r&&(u=u.substring(1)),r=!0),{next(f){if(e===f)return{done:!0,value:void 0};e.t??=function(t){return Array.isArray(t)&&t.length>0?t:void 0}(e.children);const h=e.t??[],l=!e.t&&!e.children;if(!s&&(s=E(u,n,l,i,o),s))return{value:{keys:s.keys,params:s.params,path:s.path,route:e}};if(s&&h.length>0)for(;c<h.length;){if(!a){const i=h[c];i.parent=e;let o=s.path.length;o>0&&"/"===n.charAt(o)&&(o+=1),a=t(i,n.substring(o),r,s.keys,s.params)}const i=a.next(f);if(!i.done)return{done:!1,value:i.value};a=null,c+=1}return{done:!0,value:void 0}}}};function b(t){if(c(t.route.action))return t.route.action(t)}class x extends Error{code;context;constructor(t,e){let n=`Path '${t.pathname}' is not properly resolved due to an error.`;const r=v(t.route);r&&(n+=` Resolution had failed on route: '${r}'`),super(n,e),this.code=e?.code,this.context=t}warn(){console.warn(this.message)}}class R{baseUrl;#t;errorHandler;resolveRoute;#e;constructor(t,{baseUrl:e="",context:n,errorHandler:r,resolveRoute:i=b}={}){if(Object(t)!==t)throw new TypeError("Invalid routes");this.baseUrl=e,this.errorHandler=r,this.resolveRoute=i,Array.isArray(t)?this.#e={t,i:!0,action:()=>{},path:""}:this.#e={...t,parent:void 0},this.#t={...n,hash:"",next:async()=>d,params:{},pathname:"",resolver:this,route:this.#e,search:"",chain:[]}}get root(){return this.#e}get context(){return this.#t}get o(){return this.baseUrl?new URL(this.baseUrl,document.baseURI||document.URL).href.replace(/[^/]*$/u,""):""}getRoutes(){return[...this.#e.t??[]]}removeRoutes(){this.#e.t=[]}async resolve(t){const e=this,n={...this.#t,...u(t)?{pathname:t}:t,next:c},r=g(this.#e,this.u(n.pathname)??n.pathname,!!this.baseUrl),i=this.resolveRoute;let o=null,s=null,a=n;async function c(t=!1,u=o?.value?.route,f){const h=null===f?o?.value?.route:void 0;if(o=s??r.next(h),s=null,!t&&(o.done||!function(t,e){let n=t;for(;n;)if(n=n.parent,n===e)return!0;return!1}(o.value.route,u)))return s=o,d;if(o.done)throw p(n);a={...n,params:o.value.params,route:o.value.route,chain:a.chain?.slice()},function(t,e){const{path:n,route:r}=e;if(r&&!r.i){const e={path:n,route:r};if(r.parent&&t.chain)for(let e=t.chain.length-1;e>=0&&t.chain[e].route!==r.parent;e--)t.chain.pop();t.chain?.push(e)}}(a,o.value);const l=await i(a);return null!=l&&l!==d?(a.result=(w=l)&&"object"==typeof w&&"next"in w&&"params"in w&&"result"in w&&"route"in w?l.result:l,e.#t=a,a):await c(t,u,l);var w}try{return await c(!0,this.#e)}catch(t){const e=t instanceof l?t:new x(a,{code:500,cause:t});if(this.errorHandler)return a.result=this.errorHandler(e),a;throw t}}setRoutes(t){this.#e.t=[...f(t)]}u(t){if(!this.baseUrl)return t;const e=this.o,n=t.startsWith("/")?new URL(e).origin+t:`./${t}`,r=new URL(n,e).href;return r.startsWith(e)?r.slice(e.length):void 0}addRoutes(t){return this.#e.t=[...this.#e.t??[],...f(t)],this.getRoutes()}}function $(t,e,n,r){const i=e.name??r?.(e);if(i&&(t.has(i)?t.get(i)?.push(e):t.set(i,[e])),Array.isArray(n))for(const i of n)i.parent=e,$(t,i,i.t??i.children,r)}function A(t,e){const n=t.get(e);if(n){if(n.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return n[0]}}var C=function(e,r={}){if(!(e instanceof R))throw new TypeError("An instance of Resolver is expected");const i=new Map,o=new Map;return(s,a)=>{let c=A(o,s);if(!c&&(o.clear(),$(o,e.root,e.root.t,r.cacheKeyProvider),c=A(o,s),!c))throw new Error(`Route "${s}" not found`);let f=c.fullPath?i.get(c.fullPath):void 0;if(!f){let e=v(c),n=c.parent;for(;n;){const t=v(n);t&&(e=`${t.replace(/\/$/u,"")}/${e.replace(/^\//u,"")}`),n=n.parent}const r=t(e),o=Object.create(null);for(const t of r)u(t)||(o[t.name]=!0);f={keys:o,tokens:r},i.set(e,f),c.fullPath=e}let h=n(f.tokens,{encode:encodeURIComponent,...r})(a)||"/";if(r.stringifyQueryParams&&a){const t={};for(const[e,n]of Object.entries(a))!(e in f.keys)&&n&&(t[e]=n);const e=r.stringifyQueryParams(t);e&&(h+=e.startsWith("?")?e:`?${e}`)}return h}};const T=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,O=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function _(t,e){if("function"!=typeof t)return;const n=T.exec(t.toString());if(n)try{t=new Function(n[1])}catch(t){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",t)}return t(e)}window.Vaadin=window.Vaadin||{};const S=function(t,e){if(window.Vaadin.developmentMode)return _(t,e)};function k(){
/*! vaadin-dev-mode:start
  (function () {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var getPolymerVersion = function getPolymerVersion() {
  return window.Polymer && window.Polymer.version;
};

var StatisticsGatherer = function () {
  function StatisticsGatherer(logger) {
    classCallCheck(this, StatisticsGatherer);

    this.now = new Date().getTime();
    this.logger = logger;
  }

  createClass(StatisticsGatherer, [{
    key: 'frameworkVersionDetectors',
    value: function frameworkVersionDetectors() {
      return {
        'Flow': function Flow() {
          if (window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients) {
            var flowVersions = Object.keys(window.Vaadin.Flow.clients).map(function (key) {
              return window.Vaadin.Flow.clients[key];
            }).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().flow;
            });
            if (flowVersions.length > 0) {
              return flowVersions[0];
            }
          }
        },
        'Vaadin Framework': function VaadinFramework() {
          if (window.vaadin && window.vaadin.clients) {
            var frameworkVersions = Object.values(window.vaadin.clients).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().vaadinVersion;
            });
            if (frameworkVersions.length > 0) {
              return frameworkVersions[0];
            }
          }
        },
        'AngularJs': function AngularJs() {
          if (window.angular && window.angular.version && window.angular.version) {
            return window.angular.version.full;
          }
        },
        'Angular': function Angular() {
          if (window.ng) {
            var tags = document.querySelectorAll("[ng-version]");
            if (tags.length > 0) {
              return tags[0].getAttribute("ng-version");
            }
            return "Unknown";
          }
        },
        'Backbone.js': function BackboneJs() {
          if (window.Backbone) {
            return window.Backbone.VERSION;
          }
        },
        'React': function React() {
          var reactSelector = '[data-reactroot], [data-reactid]';
          if (!!document.querySelector(reactSelector)) {
            // React does not publish the version by default
            return "unknown";
          }
        },
        'Ember': function Ember() {
          if (window.Em && window.Em.VERSION) {
            return window.Em.VERSION;
          } else if (window.Ember && window.Ember.VERSION) {
            return window.Ember.VERSION;
          }
        },
        'jQuery': function (_jQuery) {
          function jQuery() {
            return _jQuery.apply(this, arguments);
          }

          jQuery.toString = function () {
            return _jQuery.toString();
          };

          return jQuery;
        }(function () {
          if (typeof jQuery === 'function' && jQuery.prototype.jquery !== undefined) {
            return jQuery.prototype.jquery;
          }
        }),
        'Polymer': function Polymer() {
          var version = getPolymerVersion();
          if (version) {
            return version;
          }
        },
        'LitElement': function LitElement() {
          var version = window.litElementVersions && window.litElementVersions[0];
          if (version) {
            return version;
          }
        },
        'LitHtml': function LitHtml() {
          var version = window.litHtmlVersions && window.litHtmlVersions[0];
          if (version) {
            return version;
          }
        },
        'Vue.js': function VueJs() {
          if (window.Vue) {
            return window.Vue.version;
          }
        }
      };
    }
  }, {
    key: 'getUsedVaadinElements',
    value: function getUsedVaadinElements(elements) {
      var version = getPolymerVersion();
      var elementClasses = void 0;
      // NOTE: In case you edit the code here, YOU MUST UPDATE any statistics reporting code in Flow.
      // Check all locations calling the method getEntries() in
      // https://github.com/vaadin/flow/blob/master/flow-server/src/main/java/com/vaadin/flow/internal/UsageStatistics.java#L106
      // Currently it is only used by BootstrapHandler.
      if (version && version.indexOf('2') === 0) {
        // Polymer 2: components classes are stored in window.Vaadin
        elementClasses = Object.keys(window.Vaadin).map(function (c) {
          return window.Vaadin[c];
        }).filter(function (c) {
          return c.is;
        });
      } else {
        // Polymer 3: components classes are stored in window.Vaadin.registrations
        elementClasses = window.Vaadin.registrations || [];
      }
      elementClasses.forEach(function (klass) {
        var version = klass.version ? klass.version : "0.0.0";
        elements[klass.is] = { version: version };
      });
    }
  }, {
    key: 'getUsedVaadinThemes',
    value: function getUsedVaadinThemes(themes) {
      ['Lumo', 'Material'].forEach(function (themeName) {
        var theme;
        var version = getPolymerVersion();
        if (version && version.indexOf('2') === 0) {
          // Polymer 2: themes are stored in window.Vaadin
          theme = window.Vaadin[themeName];
        } else {
          // Polymer 3: themes are stored in custom element registry
          theme = customElements.get('vaadin-' + themeName.toLowerCase() + '-styles');
        }
        if (theme && theme.version) {
          themes[themeName] = { version: theme.version };
        }
      });
    }
  }, {
    key: 'getFrameworks',
    value: function getFrameworks(frameworks) {
      var detectors = this.frameworkVersionDetectors();
      Object.keys(detectors).forEach(function (framework) {
        var detector = detectors[framework];
        try {
          var version = detector();
          if (version) {
            frameworks[framework] = { version: version };
          }
        } catch (e) {}
      });
    }
  }, {
    key: 'gather',
    value: function gather(storage) {
      var storedStats = storage.read();
      var gatheredStats = {};
      var types = ["elements", "frameworks", "themes"];

      types.forEach(function (type) {
        gatheredStats[type] = {};
        if (!storedStats[type]) {
          storedStats[type] = {};
        }
      });

      var previousStats = JSON.stringify(storedStats);

      this.getUsedVaadinElements(gatheredStats.elements);
      this.getFrameworks(gatheredStats.frameworks);
      this.getUsedVaadinThemes(gatheredStats.themes);

      var now = this.now;
      types.forEach(function (type) {
        var keys = Object.keys(gatheredStats[type]);
        keys.forEach(function (key) {
          if (!storedStats[type][key] || _typeof(storedStats[type][key]) != _typeof({})) {
            storedStats[type][key] = { firstUsed: now };
          }
          // Discards any previously logged version number
          storedStats[type][key].version = gatheredStats[type][key].version;
          storedStats[type][key].lastUsed = now;
        });
      });

      var newStats = JSON.stringify(storedStats);
      storage.write(newStats);
      if (newStats != previousStats && Object.keys(storedStats).length > 0) {
        this.logger.debug("New stats: " + newStats);
      }
    }
  }]);
  return StatisticsGatherer;
}();

var StatisticsStorage = function () {
  function StatisticsStorage(key) {
    classCallCheck(this, StatisticsStorage);

    this.key = key;
  }

  createClass(StatisticsStorage, [{
    key: 'read',
    value: function read() {
      var localStorageStatsString = localStorage.getItem(this.key);
      try {
        return JSON.parse(localStorageStatsString ? localStorageStatsString : '{}');
      } catch (e) {
        return {};
      }
    }
  }, {
    key: 'write',
    value: function write(data) {
      localStorage.setItem(this.key, data);
    }
  }, {
    key: 'clear',
    value: function clear() {
      localStorage.removeItem(this.key);
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      var storedStats = this.read();
      var empty = true;
      Object.keys(storedStats).forEach(function (key) {
        if (Object.keys(storedStats[key]).length > 0) {
          empty = false;
        }
      });

      return empty;
    }
  }]);
  return StatisticsStorage;
}();

var StatisticsSender = function () {
  function StatisticsSender(url, logger) {
    classCallCheck(this, StatisticsSender);

    this.url = url;
    this.logger = logger;
  }

  createClass(StatisticsSender, [{
    key: 'send',
    value: function send(data, errorHandler) {
      var logger = this.logger;

      if (navigator.onLine === false) {
        logger.debug("Offline, can't send");
        errorHandler();
        return;
      }
      logger.debug("Sending data to " + this.url);

      var req = new XMLHttpRequest();
      req.withCredentials = true;
      req.addEventListener("load", function () {
        // Stats sent, nothing more to do
        logger.debug("Response: " + req.responseText);
      });
      req.addEventListener("error", function () {
        logger.debug("Send failed");
        errorHandler();
      });
      req.addEventListener("abort", function () {
        logger.debug("Send aborted");
        errorHandler();
      });
      req.open("POST", this.url);
      req.setRequestHeader("Content-Type", "application/json");
      req.send(data);
    }
  }]);
  return StatisticsSender;
}();

var StatisticsLogger = function () {
  function StatisticsLogger(id) {
    classCallCheck(this, StatisticsLogger);

    this.id = id;
  }

  createClass(StatisticsLogger, [{
    key: '_isDebug',
    value: function _isDebug() {
      return localStorage.getItem("vaadin." + this.id + ".debug");
    }
  }, {
    key: 'debug',
    value: function debug(msg) {
      if (this._isDebug()) {
        console.info(this.id + ": " + msg);
      }
    }
  }]);
  return StatisticsLogger;
}();

var UsageStatistics = function () {
  function UsageStatistics() {
    classCallCheck(this, UsageStatistics);

    this.now = new Date();
    this.timeNow = this.now.getTime();
    this.gatherDelay = 10; // Delay between loading this file and gathering stats
    this.initialDelay = 24 * 60 * 60;

    this.logger = new StatisticsLogger("statistics");
    this.storage = new StatisticsStorage("vaadin.statistics.basket");
    this.gatherer = new StatisticsGatherer(this.logger);
    this.sender = new StatisticsSender("https://tools.vaadin.com/usage-stats/submit", this.logger);
  }

  createClass(UsageStatistics, [{
    key: 'maybeGatherAndSend',
    value: function maybeGatherAndSend() {
      var _this = this;

      if (localStorage.getItem(UsageStatistics.optOutKey)) {
        return;
      }
      this.gatherer.gather(this.storage);
      setTimeout(function () {
        _this.maybeSend();
      }, this.gatherDelay * 1000);
    }
  }, {
    key: 'lottery',
    value: function lottery() {
      return true;
    }
  }, {
    key: 'currentMonth',
    value: function currentMonth() {
      return this.now.getYear() * 12 + this.now.getMonth();
    }
  }, {
    key: 'maybeSend',
    value: function maybeSend() {
      var firstUse = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      var monthProcessed = Number(localStorage.getItem(UsageStatistics.monthProcessedKey));

      if (!firstUse) {
        // Use a grace period to avoid interfering with tests, incognito mode etc
        firstUse = this.timeNow;
        localStorage.setItem(UsageStatistics.firstUseKey, firstUse);
      }

      if (this.timeNow < firstUse + this.initialDelay * 1000) {
        this.logger.debug("No statistics will be sent until the initial delay of " + this.initialDelay + "s has passed");
        return;
      }
      if (this.currentMonth() <= monthProcessed) {
        this.logger.debug("This month has already been processed");
        return;
      }
      localStorage.setItem(UsageStatistics.monthProcessedKey, this.currentMonth());
      // Use random sampling
      if (this.lottery()) {
        this.logger.debug("Congratulations, we have a winner!");
      } else {
        this.logger.debug("Sorry, no stats from you this time");
        return;
      }

      this.send();
    }
  }, {
    key: 'send',
    value: function send() {
      // Ensure we have the latest data
      this.gatherer.gather(this.storage);

      // Read, send and clean up
      var data = this.storage.read();
      data["firstUse"] = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      data["usageStatisticsVersion"] = UsageStatistics.version;
      var info = 'This request contains usage statistics gathered from the application running in development mode. \n\nStatistics gathering is automatically disabled and excluded from production builds.\n\nFor details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.\n\n\n\n';
      var self = this;
      this.sender.send(info + JSON.stringify(data), function () {
        // Revert the 'month processed' flag
        localStorage.setItem(UsageStatistics.monthProcessedKey, self.currentMonth() - 1);
      });
    }
  }], [{
    key: 'version',
    get: function get$1() {
      return '2.1.2';
    }
  }, {
    key: 'firstUseKey',
    get: function get$1() {
      return 'vaadin.statistics.firstuse';
    }
  }, {
    key: 'monthProcessedKey',
    get: function get$1() {
      return 'vaadin.statistics.monthProcessed';
    }
  }, {
    key: 'optOutKey',
    get: function get$1() {
      return 'vaadin.statistics.optout';
    }
  }]);
  return UsageStatistics;
}();

try {
  window.Vaadin = window.Vaadin || {};
  window.Vaadin.usageStatsChecker = window.Vaadin.usageStatsChecker || new UsageStatistics();
  window.Vaadin.usageStatsChecker.maybeGatherAndSend();
} catch (e) {
  // Intentionally ignored as this is not a problem in the app being developed
}

}());

  vaadin-dev-mode:end **/}void 0===window.Vaadin.developmentMode&&(window.Vaadin.developmentMode=function(){try{return!!localStorage.getItem("vaadin.developmentmode.force")||["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0&&(O?!(O&&Object.keys(O).map((t=>O[t])).filter((t=>t.productionMode)).length>0):!_((function(){return!0})))}catch(t){return!1}}());!function(t,e=(window.Vaadin??={})){e.registrations??=[],e.registrations.push({is:"@vaadin/router",version:"2.0.0"})}(),S(k);var P=async function(t,e){return t.classList.add(e),await new Promise((n=>{if((t=>{const e=getComputedStyle(t).getPropertyValue("animation-name");return e&&"none"!==e})(t)){const r=t.getBoundingClientRect(),i=`height: ${r.bottom-r.top}px; width: ${r.right-r.left}px`;t.setAttribute("style",`position: absolute; ${i}`),((t,e)=>{const n=()=>{t.removeEventListener("animationend",n),e()};t.addEventListener("animationend",n)})(t,(()=>{t.classList.remove(e),t.removeAttribute("style"),n()}))}else t.classList.remove(e),n()}))};function M(t){if(!t||!u(t.path))throw new Error(h('Expected route config to be an object with a "path" string property, or an array of such objects'));if(!(c(t.action)||Array.isArray(t.children)||c(t.children)||u(t.component)||u(t.redirect)))throw new Error(h(`Expected route config "${t.path}" to include either "component, redirect" or "action" function but none found.`));t.redirect&&["bundle","component"].forEach((e=>{e in t&&console.warn(h(`Route config "${String(t.path)}" has both "redirect" and "${e}" properties, and "redirect" will always override the latter. Did you mean to only use "${e}"?`))}))}function U(t){f(t).forEach((t=>M(t)))}function I(t,e){const n=e.o;return n?new URL(t.replace(/^\//u,""),n).pathname:t}function N(t){return t.map((t=>t.path)).reduce(((t,e)=>e.length?`${t.replace(/\/$/u,"")}/${e.replace(/^\//u,"")}`:t),"")}function j({chain:t=[],hash:n="",params:r={},pathname:i="",redirectFrom:o,resolver:s,search:a=""},c){const u=t.map((t=>t.route));return{baseUrl:s?.baseUrl??"",getUrl:(n={})=>s?I(e(function(t){return N(t.map((t=>t.route)))}(t))({...r,...n}),s):"",hash:n,params:r,pathname:i,redirectFrom:o,route:c??(Array.isArray(u)?u.at(-1):void 0)??null,routes:u,search:a,searchParams:new URLSearchParams(a)}}function L(t,e){const n={...t.params};return{redirect:{from:t.pathname,params:n,pathname:e}}}function D(t,e,...n){if("function"==typeof t)return t.apply(e,n)}function F(t,e,...n){return r=>r&&a(r)&&("cancel"in r||"redirect"in r)?r:D(e?.[t],e,...n)}function H(t,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${t}`,{cancelable:"go"===t,detail:e}))}function B(t){if(t instanceof Element)return t.nodeName.toLowerCase()}function W(t){if(t.defaultPrevented)return;if(0!==t.button)return;if(t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)return;let e=t.target;const n=t instanceof MouseEvent?t.composedPath():t.path??[];for(let t=0;t<n.length;t++){const r=n[t];if("nodeName"in r&&"a"===r.nodeName.toLowerCase()){e=r;break}}for(;e&&e instanceof Node&&"a"!==B(e);)e=e.parentNode;if(!e||"a"!==B(e))return;const r=e;if(r.target&&"_self"!==r.target.toLowerCase())return;if(r.hasAttribute("download"))return;if(r.hasAttribute("router-ignore"))return;if(r.pathname===window.location.pathname&&""!==r.hash)return;const i=r.origin||function(t){const{port:e,protocol:n}=t;return`${n}//${"http:"===n&&"80"===e||"https:"===n&&"443"===e?t.hostname:t.host}`}(r);if(i!==window.location.origin)return;const{hash:o,pathname:s,search:a}=r;H("go",{hash:o,pathname:s,search:a})&&t instanceof MouseEvent&&(t.preventDefault(),"click"===t.type&&window.scrollTo(0,0))}function K(t){if("vaadin-router-ignore"===t.state)return;const{hash:e,pathname:n,search:r}=window.location;H("go",{hash:e,pathname:n,search:r})}let q=[];const z={CLICK:{activate(){window.document.addEventListener("click",W)},inactivate(){window.document.removeEventListener("click",W)}},POPSTATE:{activate(){window.addEventListener("popstate",K)},inactivate(){window.removeEventListener("popstate",K)}}};function J(t=[]){q.forEach((t=>t.inactivate())),t.forEach((t=>t.activate())),q=t}function V(){return{cancel:!0}}const G={h:-1,params:{},route:{i:!0,children:[],path:"",action(){}},pathname:"",next:async()=>d};class Q extends R{location=j({resolver:this});ready=Promise.resolve(this.location);#n=new WeakSet;#r=new WeakSet;#i=this.#o.bind(this);#s=0;#a;l;#c;#u=null;#f=null;constructor(t,e){const n=document.head.querySelector("base"),r=n?.getAttribute("href");super([],{baseUrl:r?new URL(r,document.URL).href.replace(/[^/]*$/u,""):void 0,...e,resolveRoute:async t=>await this.#h(t)}),J(Object.values(z)),this.setOutlet(t),this.subscribe()}async#h(t){const{route:e}=t;if(c(e.children)){let n=await e.children(function({next:t,...e}){return e}(t));c(e.children)||({children:n}=e),function(t,e){if(!Array.isArray(t)&&!a(t))throw new Error(h(`Incorrect "children" value for the route ${String(e.path)}: expected array or object, but got ${String(t)}`));const n=f(t);n.forEach((t=>M(t))),e.t=n}(n,e)}const n={component:t=>{const e=document.createElement(t);return this.#r.add(e),e},prevent:V,redirect:e=>L(t,e)};return await Promise.resolve().then((async()=>{if(this.#l(t))return await D(e.action,e,t,n)})).then((t=>null==t||"object"!=typeof t&&"symbol"!=typeof t||!(t instanceof HTMLElement||t===d||a(t)&&"redirect"in t)?u(e.redirect)?n.redirect(e.redirect):void 0:t)).then((t=>null!=t?t:u(e.component)?n.component(e.component):void 0))}setOutlet(t){t&&this.#d(t),this.#a=t}getOutlet(){return this.#a}async setRoutes(t,e=!1){return this.l=void 0,this.#c=void 0,U(t),super.setRoutes(t),e||this.#o(),await this.ready}addRoutes(t){return U(t),super.addRoutes(t)}async render(t,e=!1){this.#s+=1;const n=this.#s,r={...G,...u(t)?{hash:"",search:"",pathname:t}:t,h:n};return this.ready=this.#p(r,e),await this.ready}async#p(t,e){const{h:n}=t;try{const r=await this.resolve(t),i=await this.#w(r);if(!this.#l(i))return this.location;const o=this.l;if(i===o)return this.#v(o,!0),this.location;if(this.location=j(i),e&&this.#v(i,1===n),H("location-changed",{router:this,location:this.location}),i.p)return this.#y(i,o),this.l=i,this.location;this.#m(i,o);const s=this.#E(i);if(this.#g(i),this.#b(i,o),await s,this.#l(i))return this.#x(),this.l=i,this.location}catch(r){if(n===this.#s){e&&this.#v(this.context);for(const t of this.#a?.children??[])t.remove();throw this.location=j(Object.assign(t,{resolver:this})),H("error",{router:this,error:r,...t}),r}}return this.location}async#w(t,e=t){const n=await this.#R(e),r=n!==e?n:t,i=I(N(n.chain??[]),this)===n.pathname,o=async(t,e=t.route,n)=>{const r=await t.next(!1,e,n);return null===r||r===d?i?t:null!=e.parent?await o(t,e.parent,r):r:r},s=await o(n);if(null==s||s===d)throw p(r);return s!==n?await this.#w(r,s):await this.#$(n)}async#R(t){const{result:e}=t;if(e instanceof HTMLElement)return function(t,e){if(e.location=j(t),t.chain){const n=t.chain.map((t=>t.route)).indexOf(t.route);t.chain[n].element=e}}(t,e),t;if(e&&"redirect"in e){const n=await this.#A(e.redirect,t.v,t.h);return await this.#R(n)}throw e instanceof Error?e:new Error(h(`Invalid route resolution result for path "${t.pathname}". Expected redirect object or HTML element, but got: "${function(t){if("object"!=typeof t)return String(t);const[e="Unknown"]=/ (.*)\]$/u.exec(String(t))??[];return"Object"===e||"Array"===e?`${e} ${JSON.stringify(t)}`:e}(e)}". Double check the action return value for the route.`))}async#$(t){return await this.#C(t).then((async e=>e===this.l||e===t?e:await this.#w(e)))}async#C(t){const e=this.l??{},n=e.chain??[],r=t.chain??[];let i=Promise.resolve(void 0);const o=e=>L(t,e);if(t.m=0,t.p=!1,n.length){for(let e=0;e<Math.min(n.length,r.length)&&(n[e].route===r[e].route&&(n[e].path===r[e].path||n[e].element===r[e].element)&&this.#T(n[e].element,r[e].element));t.m++,e++);if(t.p=r.length===n.length&&t.m===r.length&&this.#T(t.result,e.result),t.p){for(let e=r.length-1;e>=0;e--)i=this.#O(i,t,{prevent:V},n[e]);for(let e=0;e<r.length;e++)i=this.#_(i,t,{prevent:V,redirect:o},r[e]),n[e].element.location=j(t,n[e].route)}else for(let e=n.length-1;e>=t.m;e--)i=this.#O(i,t,{prevent:V},n[e])}if(!t.p)for(let e=0;e<r.length;e++)e<t.m?e<n.length&&n[e].element&&(n[e].element.location=j(t,n[e].route)):(i=this.#_(i,t,{prevent:V,redirect:o},r[e]),r[e].element&&(r[e].element.location=j(t,r[e].route)));return await i.then((async e=>{if(e&&a(e)){if("cancel"in e&&this.l)return this.l.h=t.h,this.l;if("redirect"in e)return await this.#A(e.redirect,t.v,t.h)}return t}))}async#O(t,e,n,r){const i=j(e);let o=await t;if(this.#l(e)){o=F("onBeforeLeave",r.element,i,n,this)(o)}if(!a(o)||!("redirect"in o))return o}async#_(t,e,n,r){const i=j(e,r.route),o=await t;if(this.#l(e)){return F("onBeforeEnter",r.element,i,n,this)(o)}}#T(t,e){return t instanceof Element&&e instanceof Element&&(this.#r.has(t)&&this.#r.has(e)?t.localName===e.localName:t===e)}#l(t){return t.h===this.#s}async#A(t,e=0,n=0){if(e>256)throw new Error(h(`Too many redirects when rendering ${t.from}`));return await this.resolve({...G,pathname:this.urlForPath(t.pathname,t.params),redirectFrom:t.from,v:e+1,h:n})}#d(t=this.#a){if(!(t instanceof Element||t instanceof DocumentFragment))throw new TypeError(h(`Expected router outlet to be a valid DOM Element | DocumentFragment (but got ${t})`))}#v({pathname:t,search:e="",hash:n=""},r){if(window.location.pathname!==t||window.location.search!==e||window.location.hash!==n){const i=r?"replaceState":"pushState";window.history[i](null,document.title,t+e+n),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}#y(t,e){let n=this.#a;for(let r=0;r<(t.m??0);r++){const i=e?.chain?.[r].element;if(i){if(i.parentNode!==n)break;t.chain[r].element=i,n=i}}return n}#m(t,e){this.#d(),this.#S();const n=this.#y(t,e);this.#u=[],this.#f=Array.from(n?.children??[]).filter((e=>this.#n.has(e)&&e!==t.result));let r=n;for(let e=t.m??0;e<(t.chain?.length??0);e++){const i=t.chain[e].element;i&&(r?.appendChild(i),this.#n.add(i),r===n&&this.#u.push(i),r=i)}}#x(){if(this.#f)for(const t of this.#f)t.remove();this.#f=null,this.#u=null}#S(){if(this.#f&&this.#u){for(const t of this.#u)t.remove();this.#f=null,this.#u=null}}#b(t,e){if(e?.chain&&null!=t.m)for(let n=e.chain.length-1;n>=t.m&&this.#l(t);n--){const r=e.chain[n].element;if(r)try{const e=j(t);D(r.onAfterLeave,r,e,{},this)}finally{if(this.#f?.includes(r))for(const t of r.children)t.remove()}}}#g(t){if(t.chain&&null!=t.m)for(let e=t.m;e<t.chain.length&&this.#l(t);e++){const n=t.chain[e].element;if(n){const r=j(t,t.chain[e].route);D(n.onAfterEnter,n,r,{},this)}}}async#E(t){const e=this.#f?.[0],n=this.#u?.[0],r=[],{chain:i=[]}=t;let o;for(let t=i.length-1;t>=0;t--)if(i[t].route.animate){o=i[t].route.animate;break}if(e&&n&&o){const t=a(o)&&o.leave?o.leave:"leaving",i=a(o)&&o.enter?o.enter:"entering";r.push(P(e,t)),r.push(P(n,i))}return await Promise.all(r),t}subscribe(){window.addEventListener("vaadin-router-go",this.#i)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.#i)}#o(t){const{pathname:e,search:n,hash:r}=t instanceof CustomEvent?t.detail:window.location;u(this.u(e))&&(t?.preventDefault&&t.preventDefault(),this.render({pathname:e,search:n,hash:r},!0))}static setTriggers(...t){J(t)}urlForName(t,e){return this.#c||(this.#c=C(this,{cacheKeyProvider:t=>"component"in t&&"string"==typeof t.component?t.component:void 0})),I(this.#c(t,e??void 0),this)}urlForPath(t,n){return I(e(t)(n??void 0),this)}static go(t){const{pathname:e,search:n,hash:r}=u(t)?new URL(t,"http://a"):t;return H("go",{pathname:e,search:n,hash:r})}}export{Q as R};
