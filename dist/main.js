let t={},e="tr";const n=e=>t[e]||e,r=async n=>{try{e=n,localStorage.setItem("lang",n);const r=await fetch(`/src/locales/${n}.json`);t=await r.json(),document.documentElement.lang=n,window.dispatchEvent(new CustomEvent("language-changed"))}catch(t){console.error("Failed to switch language:",t)}};function i(t,e){void 0===e&&(e={});for(var n=function(t){for(var e=[],n=0;n<t.length;){var r=t[n];if("*"!==r&&"+"!==r&&"?"!==r)if("\\"!==r)if("{"!==r)if("}"!==r)if(":"!==r)if("("!==r)e.push({type:"CHAR",index:n,value:t[n++]});else{var i=1,o="";if("?"===t[s=n+1])throw new TypeError('Pattern cannot start with "?" at '.concat(s));for(;s<t.length;)if("\\"!==t[s]){if(")"===t[s]){if(0===--i){s++;break}}else if("("===t[s]&&(i++,"?"!==t[s+1]))throw new TypeError("Capturing groups are not allowed at ".concat(s));o+=t[s++]}else o+=t[s++]+t[s++];if(i)throw new TypeError("Unbalanced pattern at ".concat(n));if(!o)throw new TypeError("Missing pattern at ".concat(n));e.push({type:"PATTERN",index:n,value:o}),n=s}else{for(var a="",s=n+1;s<t.length;){var c=t.charCodeAt(s);if(!(c>=48&&c<=57||c>=65&&c<=90||c>=97&&c<=122||95===c))break;a+=t[s++]}if(!a)throw new TypeError("Missing parameter name at ".concat(n));e.push({type:"NAME",index:n,value:a}),n=s}else e.push({type:"CLOSE",index:n,value:t[n++]});else e.push({type:"OPEN",index:n,value:t[n++]});else e.push({type:"ESCAPED_CHAR",index:n++,value:t[n++]});else e.push({type:"MODIFIER",index:n,value:t[n++]})}return e.push({type:"END",index:n,value:""}),e}(t),r=e.prefixes,i=void 0===r?"./":r,o=e.delimiter,a=void 0===o?"/#?":o,c=[],u=0,h=0,f="",l=function(t){if(h<n.length&&n[h].type===t)return n[h++].value},d=function(t){var e=l(t);if(void 0!==e)return e;var r=n[h],i=r.type,o=r.index;throw new TypeError("Unexpected ".concat(i," at ").concat(o,", expected ").concat(t))},w=function(){for(var t,e="";t=l("CHAR")||l("ESCAPED_CHAR");)e+=t;return e},p=function(t){var e=c[c.length-1],n=t||(e&&"string"==typeof e?e:"");if(e&&!n)throw new TypeError('Must have text between two parameters, missing text after "'.concat(e.name,'"'));return!n||function(t){for(var e=0,n=a;e<n.length;e++){var r=n[e];if(t.indexOf(r)>-1)return!0}return!1}(n)?"[^".concat(s(a),"]+?"):"(?:(?!".concat(s(n),")[^").concat(s(a),"])+?")};h<n.length;){var v=l("CHAR"),m=l("NAME"),y=l("PATTERN");if(m||y){var g=v||"";-1===i.indexOf(g)&&(f+=g,g=""),f&&(c.push(f),f=""),c.push({name:m||u++,prefix:g,suffix:"",pattern:y||p(g),modifier:l("MODIFIER")||""})}else{var E=v||l("ESCAPED_CHAR");if(E)f+=E;else if(f&&(c.push(f),f=""),l("OPEN")){g=w();var b=l("NAME")||"",x=l("PATTERN")||"",R=w();d("CLOSE"),c.push({name:b||(x?u++:""),pattern:b&&!x?p(g):x,prefix:g,suffix:R,modifier:l("MODIFIER")||""})}else d("END")}}return c}function o(t,e){return a(i(t,e),e)}function a(t,e){void 0===e&&(e={});var n=c(e),r=e.encode,i=void 0===r?function(t){return t}:r,o=e.validate,a=void 0===o||o,s=t.map((function(t){if("object"==typeof t)return new RegExp("^(?:".concat(t.pattern,")$"),n)}));return function(e){for(var n="",r=0;r<t.length;r++){var o=t[r];if("string"!=typeof o){var c=e?e[o.name]:void 0,u="?"===o.modifier||"*"===o.modifier,h="*"===o.modifier||"+"===o.modifier;if(Array.isArray(c)){if(!h)throw new TypeError('Expected "'.concat(o.name,'" to not repeat, but got an array'));if(0===c.length){if(u)continue;throw new TypeError('Expected "'.concat(o.name,'" to not be empty'))}for(var f=0;f<c.length;f++){var l=i(c[f],o);if(a&&!s[r].test(l))throw new TypeError('Expected all "'.concat(o.name,'" to match "').concat(o.pattern,'", but got "').concat(l,'"'));n+=o.prefix+l+o.suffix}}else if("string"!=typeof c&&"number"!=typeof c){if(!u){var d=h?"an array":"a string";throw new TypeError('Expected "'.concat(o.name,'" to be ').concat(d))}}else{l=i(String(c),o);if(a&&!s[r].test(l))throw new TypeError('Expected "'.concat(o.name,'" to match "').concat(o.pattern,'", but got "').concat(l,'"'));n+=o.prefix+l+o.suffix}}else n+=o}return n}}function s(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function c(t){return t&&t.sensitive?"":"i"}function u(t,e,n){return function(t,e,n){void 0===n&&(n={});for(var r=n.strict,i=void 0!==r&&r,o=n.start,a=void 0===o||o,u=n.end,h=void 0===u||u,f=n.encode,l=void 0===f?function(t){return t}:f,d=n.delimiter,w=void 0===d?"/#?":d,p=n.endsWith,v="[".concat(s(void 0===p?"":p),"]|$"),m="[".concat(s(w),"]"),y=a?"^":"",g=0,E=t;g<E.length;g++){var b=E[g];if("string"==typeof b)y+=s(l(b));else{var x=s(l(b.prefix)),R=s(l(b.suffix));if(b.pattern)if(e&&e.push(b),x||R)if("+"===b.modifier||"*"===b.modifier){var $="*"===b.modifier?"?":"";y+="(?:".concat(x,"((?:").concat(b.pattern,")(?:").concat(R).concat(x,"(?:").concat(b.pattern,"))*)").concat(R,")").concat($)}else y+="(?:".concat(x,"(").concat(b.pattern,")").concat(R,")").concat(b.modifier);else{if("+"===b.modifier||"*"===b.modifier)throw new TypeError('Can not repeat "'.concat(b.name,'" without a prefix and suffix'));y+="(".concat(b.pattern,")").concat(b.modifier)}else y+="(?:".concat(x).concat(R,")").concat(b.modifier)}}if(h)i||(y+="".concat(m,"?")),y+=n.endsWith?"(?=".concat(v,")"):"$";else{var C=t[t.length-1],A="string"==typeof C?m.indexOf(C[C.length-1])>-1:void 0===C;i||(y+="(?:".concat(m,"(?=").concat(v,"))?")),A||(y+="(?=".concat(m,"|").concat(v,")"))}return new RegExp(y,c(n))}(i(t,n),e,n)}function h(t,e,n){return t instanceof RegExp?function(t,e){if(!e)return t;for(var n=/\((?:\?<(.*?)>)?(?!\?)/g,r=0,i=n.exec(t.source);i;)e.push({name:i[1]||r++,prefix:"",suffix:"",modifier:"",pattern:""}),i=n.exec(t.source);return t}(t,e):Array.isArray(t)?function(t,e,n){var r=t.map((function(t){return h(t,e,n).source}));return new RegExp("(?:".concat(r.join("|"),")"),c(n))}(t,e,n):u(t,e,n)}function f(t){return"object"==typeof t&&!!t}function l(t){return"function"==typeof t}function d(t){return"string"==typeof t}function w(t=[]){return Array.isArray(t)?t:[t]}function p(t){return`[Vaadin.Router] ${t}`}class v extends Error{code;context;constructor(t){super(p(`Page not found (${t.pathname})`)),this.context=t,this.code=404}}const m=Symbol("NotFoundResult");function y(t){return new v(t)}function g(t){return(Array.isArray(t)?t[0]:t)??""}function E(t){return g(t?.path)}const b=new Map;function x(t){try{return decodeURIComponent(t)}catch{return t}}b.set("|false",{keys:[],pattern:/(?:)/u});var R=function(t,e,n=!1,r=[],i){const o=`${t}|${String(n)}`,a=g(e);let s=b.get(o);if(!s){const e=[];s={keys:e,pattern:h(t,e,{end:n,strict:""===t})},b.set(o,s)}const c=s.pattern.exec(a);if(!c)return null;const u={...i};for(let t=1;t<c.length;t++){const e=s.keys[t-1],n=e.name,r=c[t];void 0===r&&Object.hasOwn(u,n)||("+"===e.modifier||"*"===e.modifier?u[n]=r?r.split(/[/?#]/u).map(x):[]:u[n]=r?x(r):r)}return{keys:[...r,...s.keys],params:u,path:c[0]}};var $=function t(e,n,r,i,o){let a,s,c=0,u=E(e);return u.startsWith("/")&&(r&&(u=u.substring(1)),r=!0),{next(h){if(e===h)return{done:!0,value:void 0};e.t??=function(t){return Array.isArray(t)&&t.length>0?t:void 0}(e.children);const f=e.t??[],l=!e.t&&!e.children;if(!a&&(a=R(u,n,l,i,o),a))return{value:{keys:a.keys,params:a.params,path:a.path,route:e}};if(a&&f.length>0)for(;c<f.length;){if(!s){const i=f[c];i.parent=e;let o=a.path.length;o>0&&"/"===n.charAt(o)&&(o+=1),s=t(i,n.substring(o),r,a.keys,a.params)}const i=s.next(h);if(!i.done)return{done:!1,value:i.value};s=null,c+=1}return{done:!0,value:void 0}}}};function C(t){if(l(t.route.action))return t.route.action(t)}class A extends Error{code;context;constructor(t,e){let n=`Path '${t.pathname}' is not properly resolved due to an error.`;const r=E(t.route);r&&(n+=` Resolution had failed on route: '${r}'`),super(n,e),this.code=e?.code,this.context=t}warn(){console.warn(this.message)}}class T{baseUrl;#t;errorHandler;resolveRoute;#e;constructor(t,{baseUrl:e="",context:n,errorHandler:r,resolveRoute:i=C}={}){if(Object(t)!==t)throw new TypeError("Invalid routes");this.baseUrl=e,this.errorHandler=r,this.resolveRoute=i,Array.isArray(t)?this.#e={t,i:!0,action:()=>{},path:""}:this.#e={...t,parent:void 0},this.#t={...n,hash:"",next:async()=>m,params:{},pathname:"",resolver:this,route:this.#e,search:"",chain:[]}}get root(){return this.#e}get context(){return this.#t}get o(){return this.baseUrl?new URL(this.baseUrl,document.baseURI||document.URL).href.replace(/[^/]*$/u,""):""}getRoutes(){return[...this.#e.t??[]]}removeRoutes(){this.#e.t=[]}async resolve(t){const e=this,n={...this.#t,...d(t)?{pathname:t}:t,next:c},r=$(this.#e,this.u(n.pathname)??n.pathname,!!this.baseUrl),i=this.resolveRoute;let o=null,a=null,s=n;async function c(t=!1,u=o?.value?.route,h){const f=null===h?o?.value?.route:void 0;if(o=a??r.next(f),a=null,!t&&(o.done||!function(t,e){let n=t;for(;n;)if(n=n.parent,n===e)return!0;return!1}(o.value.route,u)))return a=o,m;if(o.done)throw y(n);s={...n,params:o.value.params,route:o.value.route,chain:s.chain?.slice()},function(t,e){const{path:n,route:r}=e;if(r&&!r.i){const e={path:n,route:r};if(r.parent&&t.chain)for(let e=t.chain.length-1;e>=0&&t.chain[e].route!==r.parent;e--)t.chain.pop();t.chain?.push(e)}}(s,o.value);const l=await i(s);return null!=l&&l!==m?(s.result=(d=l)&&"object"==typeof d&&"next"in d&&"params"in d&&"result"in d&&"route"in d?l.result:l,e.#t=s,s):await c(t,u,l);var d}try{return await c(!0,this.#e)}catch(t){const e=t instanceof v?t:new A(s,{code:500,cause:t});if(this.errorHandler)return s.result=this.errorHandler(e),s;throw t}}setRoutes(t){this.#e.t=[...w(t)]}u(t){if(!this.baseUrl)return t;const e=this.o,n=t.startsWith("/")?new URL(e).origin+t:`./${t}`,r=new URL(n,e).href;return r.startsWith(e)?r.slice(e.length):void 0}addRoutes(t){return this.#e.t=[...this.#e.t??[],...w(t)],this.getRoutes()}}function O(t,e,n,r){const i=e.name??r?.(e);if(i&&(t.has(i)?t.get(i)?.push(e):t.set(i,[e])),Array.isArray(n))for(const i of n)i.parent=e,O(t,i,i.t??i.children,r)}function S(t,e){const n=t.get(e);if(n){if(n.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return n[0]}}var P=function(t,e={}){if(!(t instanceof T))throw new TypeError("An instance of Resolver is expected");const n=new Map,r=new Map;return(o,s)=>{let c=S(r,o);if(!c&&(r.clear(),O(r,t.root,t.root.t,e.cacheKeyProvider),c=S(r,o),!c))throw new Error(`Route "${o}" not found`);let u=c.fullPath?n.get(c.fullPath):void 0;if(!u){let t=E(c),e=c.parent;for(;e;){const n=E(e);n&&(t=`${n.replace(/\/$/u,"")}/${t.replace(/^\//u,"")}`),e=e.parent}const r=i(t),o=Object.create(null);for(const t of r)d(t)||(o[t.name]=!0);u={keys:o,tokens:r},n.set(t,u),c.fullPath=t}let h=a(u.tokens,{encode:encodeURIComponent,...e})(s)||"/";if(e.stringifyQueryParams&&s){const t={};for(const[e,n]of Object.entries(s))!(e in u.keys)&&n&&(t[e]=n);const n=e.stringifyQueryParams(t);n&&(h+=n.startsWith("?")?n:`?${n}`)}return h}};const _=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,k=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function j(t,e){if("function"!=typeof t)return;const n=_.exec(t.toString());if(n)try{t=new Function(n[1])}catch(t){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",t)}return t(e)}window.Vaadin=window.Vaadin||{};const N=function(t,e){if(window.Vaadin.developmentMode)return j(t,e)};function I(){
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

  vaadin-dev-mode:end **/}void 0===window.Vaadin.developmentMode&&(window.Vaadin.developmentMode=function(){try{return!!localStorage.getItem("vaadin.developmentmode.force")||["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0&&(k?!(k&&Object.keys(k).map((t=>k[t])).filter((t=>t.productionMode)).length>0):!j((function(){return!0})))}catch(t){return!1}}());!function(t,e=(window.Vaadin??={})){e.registrations??=[],e.registrations.push({is:"@vaadin/router",version:"2.0.0"})}(),N(I);var M=async function(t,e){return t.classList.add(e),await new Promise((n=>{if((t=>{const e=getComputedStyle(t).getPropertyValue("animation-name");return e&&"none"!==e})(t)){const r=t.getBoundingClientRect(),i=`height: ${r.bottom-r.top}px; width: ${r.right-r.left}px`;t.setAttribute("style",`position: absolute; ${i}`),((t,e)=>{const n=()=>{t.removeEventListener("animationend",n),e()};t.addEventListener("animationend",n)})(t,(()=>{t.classList.remove(e),t.removeAttribute("style"),n()}))}else t.classList.remove(e),n()}))};function U(t){if(!t||!d(t.path))throw new Error(p('Expected route config to be an object with a "path" string property, or an array of such objects'));if(!(l(t.action)||Array.isArray(t.children)||l(t.children)||d(t.component)||d(t.redirect)))throw new Error(p(`Expected route config "${t.path}" to include either "component, redirect" or "action" function but none found.`));t.redirect&&["bundle","component"].forEach((e=>{e in t&&console.warn(p(`Route config "${String(t.path)}" has both "redirect" and "${e}" properties, and "redirect" will always override the latter. Did you mean to only use "${e}"?`))}))}function L(t){w(t).forEach((t=>U(t)))}function D(t,e){const n=e.o;return n?new URL(t.replace(/^\//u,""),n).pathname:t}function F(t){return t.map((t=>t.path)).reduce(((t,e)=>e.length?`${t.replace(/\/$/u,"")}/${e.replace(/^\//u,"")}`:t),"")}function H({chain:t=[],hash:e="",params:n={},pathname:r="",redirectFrom:i,resolver:a,search:s=""},c){const u=t.map((t=>t.route));return{baseUrl:a?.baseUrl??"",getUrl:(e={})=>a?D(o(function(t){return F(t.map((t=>t.route)))}(t))({...n,...e}),a):"",hash:e,params:n,pathname:r,redirectFrom:i,route:c??(Array.isArray(u)?u.at(-1):void 0)??null,routes:u,search:s,searchParams:new URLSearchParams(s)}}function B(t,e){const n={...t.params};return{redirect:{from:t.pathname,params:n,pathname:e}}}function W(t,e,...n){if("function"==typeof t)return t.apply(e,n)}function q(t,e,...n){return r=>r&&f(r)&&("cancel"in r||"redirect"in r)?r:W(e?.[t],e,...n)}function z(t,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${t}`,{cancelable:"go"===t,detail:e}))}function K(t){if(t instanceof Element)return t.nodeName.toLowerCase()}function J(t){if(t.defaultPrevented)return;if(0!==t.button)return;if(t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)return;let e=t.target;const n=t instanceof MouseEvent?t.composedPath():t.path??[];for(let t=0;t<n.length;t++){const r=n[t];if("nodeName"in r&&"a"===r.nodeName.toLowerCase()){e=r;break}}for(;e&&e instanceof Node&&"a"!==K(e);)e=e.parentNode;if(!e||"a"!==K(e))return;const r=e;if(r.target&&"_self"!==r.target.toLowerCase())return;if(r.hasAttribute("download"))return;if(r.hasAttribute("router-ignore"))return;if(r.pathname===window.location.pathname&&""!==r.hash)return;const i=r.origin||function(t){const{port:e,protocol:n}=t;return`${n}//${"http:"===n&&"80"===e||"https:"===n&&"443"===e?t.hostname:t.host}`}(r);if(i!==window.location.origin)return;const{hash:o,pathname:a,search:s}=r;z("go",{hash:o,pathname:a,search:s})&&t instanceof MouseEvent&&(t.preventDefault(),"click"===t.type&&window.scrollTo(0,0))}function V(t){if("vaadin-router-ignore"===t.state)return;const{hash:e,pathname:n,search:r}=window.location;z("go",{hash:e,pathname:n,search:r})}let G=[];const Q={CLICK:{activate(){window.document.addEventListener("click",J)},inactivate(){window.document.removeEventListener("click",J)}},POPSTATE:{activate(){window.addEventListener("popstate",V)},inactivate(){window.removeEventListener("popstate",V)}}};function X(t=[]){G.forEach((t=>t.inactivate())),t.forEach((t=>t.activate())),G=t}function Y(){return{cancel:!0}}const Z={h:-1,params:{},route:{i:!0,children:[],path:"",action(){}},pathname:"",next:async()=>m};class tt extends T{location=H({resolver:this});ready=Promise.resolve(this.location);#n=new WeakSet;#r=new WeakSet;#i=this.#o.bind(this);#a=0;#s;l;#c;#u=null;#h=null;constructor(t,e){const n=document.head.querySelector("base"),r=n?.getAttribute("href");super([],{baseUrl:r?new URL(r,document.URL).href.replace(/[^/]*$/u,""):void 0,...e,resolveRoute:async t=>await this.#f(t)}),X(Object.values(Q)),this.setOutlet(t),this.subscribe()}async#f(t){const{route:e}=t;if(l(e.children)){let n=await e.children(function({next:t,...e}){return e}(t));l(e.children)||({children:n}=e),function(t,e){if(!Array.isArray(t)&&!f(t))throw new Error(p(`Incorrect "children" value for the route ${String(e.path)}: expected array or object, but got ${String(t)}`));const n=w(t);n.forEach((t=>U(t))),e.t=n}(n,e)}const n={component:t=>{const e=document.createElement(t);return this.#r.add(e),e},prevent:Y,redirect:e=>B(t,e)};return await Promise.resolve().then((async()=>{if(this.#l(t))return await W(e.action,e,t,n)})).then((t=>null==t||"object"!=typeof t&&"symbol"!=typeof t||!(t instanceof HTMLElement||t===m||f(t)&&"redirect"in t)?d(e.redirect)?n.redirect(e.redirect):void 0:t)).then((t=>null!=t?t:d(e.component)?n.component(e.component):void 0))}setOutlet(t){t&&this.#d(t),this.#s=t}getOutlet(){return this.#s}async setRoutes(t,e=!1){return this.l=void 0,this.#c=void 0,L(t),super.setRoutes(t),e||this.#o(),await this.ready}addRoutes(t){return L(t),super.addRoutes(t)}async render(t,e=!1){this.#a+=1;const n=this.#a,r={...Z,...d(t)?{hash:"",search:"",pathname:t}:t,h:n};return this.ready=this.#w(r,e),await this.ready}async#w(t,e){const{h:n}=t;try{const r=await this.resolve(t),i=await this.#p(r);if(!this.#l(i))return this.location;const o=this.l;if(i===o)return this.#v(o,!0),this.location;if(this.location=H(i),e&&this.#v(i,1===n),z("location-changed",{router:this,location:this.location}),i.p)return this.#m(i,o),this.l=i,this.location;this.#y(i,o);const a=this.#g(i);if(this.#E(i),this.#b(i,o),await a,this.#l(i))return this.#x(),this.l=i,this.location}catch(r){if(n===this.#a){e&&this.#v(this.context);for(const t of this.#s?.children??[])t.remove();throw this.location=H(Object.assign(t,{resolver:this})),z("error",{router:this,error:r,...t}),r}}return this.location}async#p(t,e=t){const n=await this.#R(e),r=n!==e?n:t,i=D(F(n.chain??[]),this)===n.pathname,o=async(t,e=t.route,n)=>{const r=await t.next(!1,e,n);return null===r||r===m?i?t:null!=e.parent?await o(t,e.parent,r):r:r},a=await o(n);if(null==a||a===m)throw y(r);return a!==n?await this.#p(r,a):await this.#$(n)}async#R(t){const{result:e}=t;if(e instanceof HTMLElement)return function(t,e){if(e.location=H(t),t.chain){const n=t.chain.map((t=>t.route)).indexOf(t.route);t.chain[n].element=e}}(t,e),t;if(e&&"redirect"in e){const n=await this.#C(e.redirect,t.v,t.h);return await this.#R(n)}throw e instanceof Error?e:new Error(p(`Invalid route resolution result for path "${t.pathname}". Expected redirect object or HTML element, but got: "${function(t){if("object"!=typeof t)return String(t);const[e="Unknown"]=/ (.*)\]$/u.exec(String(t))??[];return"Object"===e||"Array"===e?`${e} ${JSON.stringify(t)}`:e}(e)}". Double check the action return value for the route.`))}async#$(t){return await this.#A(t).then((async e=>e===this.l||e===t?e:await this.#p(e)))}async#A(t){const e=this.l??{},n=e.chain??[],r=t.chain??[];let i=Promise.resolve(void 0);const o=e=>B(t,e);if(t.m=0,t.p=!1,n.length){for(let e=0;e<Math.min(n.length,r.length)&&(n[e].route===r[e].route&&(n[e].path===r[e].path||n[e].element===r[e].element)&&this.#T(n[e].element,r[e].element));t.m++,e++);if(t.p=r.length===n.length&&t.m===r.length&&this.#T(t.result,e.result),t.p){for(let e=r.length-1;e>=0;e--)i=this.#O(i,t,{prevent:Y},n[e]);for(let e=0;e<r.length;e++)i=this.#S(i,t,{prevent:Y,redirect:o},r[e]),n[e].element.location=H(t,n[e].route)}else for(let e=n.length-1;e>=t.m;e--)i=this.#O(i,t,{prevent:Y},n[e])}if(!t.p)for(let e=0;e<r.length;e++)e<t.m?e<n.length&&n[e].element&&(n[e].element.location=H(t,n[e].route)):(i=this.#S(i,t,{prevent:Y,redirect:o},r[e]),r[e].element&&(r[e].element.location=H(t,r[e].route)));return await i.then((async e=>{if(e&&f(e)){if("cancel"in e&&this.l)return this.l.h=t.h,this.l;if("redirect"in e)return await this.#C(e.redirect,t.v,t.h)}return t}))}async#O(t,e,n,r){const i=H(e);let o=await t;if(this.#l(e)){o=q("onBeforeLeave",r.element,i,n,this)(o)}if(!f(o)||!("redirect"in o))return o}async#S(t,e,n,r){const i=H(e,r.route),o=await t;if(this.#l(e)){return q("onBeforeEnter",r.element,i,n,this)(o)}}#T(t,e){return t instanceof Element&&e instanceof Element&&(this.#r.has(t)&&this.#r.has(e)?t.localName===e.localName:t===e)}#l(t){return t.h===this.#a}async#C(t,e=0,n=0){if(e>256)throw new Error(p(`Too many redirects when rendering ${t.from}`));return await this.resolve({...Z,pathname:this.urlForPath(t.pathname,t.params),redirectFrom:t.from,v:e+1,h:n})}#d(t=this.#s){if(!(t instanceof Element||t instanceof DocumentFragment))throw new TypeError(p(`Expected router outlet to be a valid DOM Element | DocumentFragment (but got ${t})`))}#v({pathname:t,search:e="",hash:n=""},r){if(window.location.pathname!==t||window.location.search!==e||window.location.hash!==n){const i=r?"replaceState":"pushState";window.history[i](null,document.title,t+e+n),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}#m(t,e){let n=this.#s;for(let r=0;r<(t.m??0);r++){const i=e?.chain?.[r].element;if(i){if(i.parentNode!==n)break;t.chain[r].element=i,n=i}}return n}#y(t,e){this.#d(),this.#P();const n=this.#m(t,e);this.#u=[],this.#h=Array.from(n?.children??[]).filter((e=>this.#n.has(e)&&e!==t.result));let r=n;for(let e=t.m??0;e<(t.chain?.length??0);e++){const i=t.chain[e].element;i&&(r?.appendChild(i),this.#n.add(i),r===n&&this.#u.push(i),r=i)}}#x(){if(this.#h)for(const t of this.#h)t.remove();this.#h=null,this.#u=null}#P(){if(this.#h&&this.#u){for(const t of this.#u)t.remove();this.#h=null,this.#u=null}}#b(t,e){if(e?.chain&&null!=t.m)for(let n=e.chain.length-1;n>=t.m&&this.#l(t);n--){const r=e.chain[n].element;if(r)try{const e=H(t);W(r.onAfterLeave,r,e,{},this)}finally{if(this.#h?.includes(r))for(const t of r.children)t.remove()}}}#E(t){if(t.chain&&null!=t.m)for(let e=t.m;e<t.chain.length&&this.#l(t);e++){const n=t.chain[e].element;if(n){const r=H(t,t.chain[e].route);W(n.onAfterEnter,n,r,{},this)}}}async#g(t){const e=this.#h?.[0],n=this.#u?.[0],r=[],{chain:i=[]}=t;let o;for(let t=i.length-1;t>=0;t--)if(i[t].route.animate){o=i[t].route.animate;break}if(e&&n&&o){const t=f(o)&&o.leave?o.leave:"leaving",i=f(o)&&o.enter?o.enter:"entering";r.push(M(e,t)),r.push(M(n,i))}return await Promise.all(r),t}subscribe(){window.addEventListener("vaadin-router-go",this.#i)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.#i)}#o(t){const{pathname:e,search:n,hash:r}=t instanceof CustomEvent?t.detail:window.location;d(this.u(e))&&(t?.preventDefault&&t.preventDefault(),this.render({pathname:e,search:n,hash:r},!0))}static setTriggers(...t){X(t)}urlForName(t,e){return this.#c||(this.#c=P(this,{cacheKeyProvider:t=>"component"in t&&"string"==typeof t.component?t.component:void 0})),D(this.#c(t,e??void 0),this)}urlForPath(t,e){return D(o(t)(e??void 0),this)}static go(t){const{pathname:e,search:n,hash:r}=d(t)?new URL(t,"http://a"):t;return z("go",{pathname:e,search:n,hash:r})}}const et=new class{constructor(){this.router=null,this.isInitialized=!1}init(t){this.isInitialized||(this.router=new tt(t),this.router.setRoutes([{path:"/",component:"directory-page"},{path:"/new",component:"editor-page"},{path:"/edit/:id",component:"editor-page"}]),this.isInitialized=!0)}navigateTo(t){if(this.router)try{this.router.go(t)}catch(e){console.error("Navigation error:",e),window.location.href=t}else console.warn("Router not initialized")}navigateToHome(){this.navigateTo("/")}navigateToNew(){this.navigateTo("/new")}navigateToEdit(t){t?this.navigateTo(`/edit/${t}`):console.error("Employee ID is required for edit navigation")}getCurrentRoute(){return this.router?this.router.location:null}getRouteParams(){return this.router&&this.router.location?.params||{}}getCurrentPath(){return this.router&&this.router.location?.pathname||window.location.pathname}isCurrentRoute(t){return this.getCurrentPath()===t}goBack(){window.history.length>1?window.history.back():this.navigateToHome()}},nt=()=>et.navigateToHome(),rt=t=>et.navigateToEdit(t),it=()=>et.goBack(),ot=t=>et.isCurrentRoute(t);(async()=>{await(async()=>{try{const n=localStorage.getItem("lang")||"tr";e=n;const r=await fetch(`/src/locales/${n}.json`);t=await r.json(),document.documentElement.lang=n}catch(t){console.error("Failed to load translations:",t)}})();const n=document.querySelector("#outlet");n&&et.init(n),import("./nav-bar-0lDCNYXV.js"),import("./directory-page-DUnuU1th.js"),import("./editor-page-0wxw1FTi.js")})();export{nt as a,it as g,ot as i,rt as n,r as s,n as t};
//# sourceMappingURL=main.js.map
