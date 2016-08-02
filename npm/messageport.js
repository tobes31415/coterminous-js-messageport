/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/* harmony export */ exports["a"] = logger;function logger(name)
	{
	    var prefix = `[${name}]`;
	    
	    var isBrowser = false;
	    try{isBrowser = window && window.console;}
	    catch(ignored){}

	    var log;
	    if (isBrowser)
	    {
	        log = {
	            debug: window.console.debug.bind(window.console, prefix),
	            warn: window.console.warn.bind(window.console, prefix),
	            error: window.console.error.bind(window.console, prefix),
	            info: window.console.info.bind(window.console, prefix),
	            trace: window.console.trace.bind(window.console, prefix)
	        }
	    }
	    else
	    {
	        log = {
	            debug: console.log.bind(console, '[DEBUG]'+prefix),
	            warn: console.log.bind(console, '[WARN]'+prefix),
	            error: console.log.bind(console, '[ERROR]'+prefix),
	            info: console.log.bind(console, '[INFO]'+prefix),
	            trace: console.log.bind(console, '[TRACE]'+prefix),
	        }
	    }
	    if (isBrowser && !window.enableCoterminusLogs || !global.enableCoterminusLogs)
	    {
	        log.debug = function(){};
	        log.warn = log.debug;
	        log.info = log.debug;
	        log.trace = log.debug;
	    }
	    return log;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_messagePort_js__ = __webpack_require__(2);

	/* harmony default export */ exports["default"] = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__src_messagePort_js__["a"]

	try
	{
	    (function(){return this})().Coterminous_MessagePort = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__src_messagePort_js__["a"];
	}
	catch(ignored){}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__subscription_js__ = __webpack_require__(3);



	var log = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__log_js__["a"]("messagePort");

	/* harmony default export */ exports["a"] = class
	{
	    constructor(port)
	    {
	        if (!port || typeof port.postMessage !== "function")
	        {
	            throw new TypeError("messagePort expects an object with a postMessage function");
	        }
	        
	        var receiveSub = new /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__subscription_js__["a"]();
	        var disconnectedSub = new /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__subscription_js__["a"]();
	        
	        port.onmessage = function(e)
	        {
	            receiveSub.publish(e.data);
	        }
	        
	        function send(msg)
	        {
	            try
	            {
	                port.postMessage(msg);
	            }
	            catch(err)
	            {
	                disconnect();
	                log.error(err);
	            }
	        }
	        
	        function disconnect()
	        {
	            try
	            {
	                port.close();
	            }
	            catch(err){
	                log.error(err);
	            }
	            disconnectedSub.publish();
	        }
	        
	        this.send = send;
	        this.disconnect = disconnect;
	        this.receive = receiveSub.readOnly;
	        this.disconnected = disconnectedSub.readOnly;
	    } 
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_js__ = __webpack_require__(0);

	var log = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__log_js__["a"]("Subscription");

	/* harmony default export */ exports["a"] = class
	{
	    constructor ()
	    {
	        var cbs = [];
	        this.publish = function(obj)
	        {
	            cbs.forEach(function(cb)
	            {
	                try{cb(obj);}
	                catch(err){log.error(err);}
	            });
	        }
	        this.subscribe = function(cb)
	        {
	            if (cbs.indexOf(cb) === -1)
	            {
	                cbs.push(cb);
	            }
	        }
	        this.unsubscribe = function(cb)
	        {
	            var index = cbs.indexOf(cb);
	            if (index !== -1)
	            {
	                cbs.splice(index, 1);
	            }
	        }
	        this.readOnly = {
	            subscribe: this.subscribe,
	            unsubscribe: this.unsubscribe
	        };
	    }
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }
/******/ ]);