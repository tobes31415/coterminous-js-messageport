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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_loopback_js__ = __webpack_require__(1);

	/* harmony default export */ exports["default"] = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__src_loopback_js__["a"]

	try
	{
	    (function(){return this})().Coterminous_Loopback = /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__src_loopback_js__["a"];
	}
	catch(ignored){}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__queuingSubscription_js__ = __webpack_require__(2);


	/*
	 * This is a simple 2-sided transport to assist in testing and development
	 */
	/* harmony default export */ exports["a"] = class
	{
	    constructor(options)
	    {
	        var Asub = new /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__queuingSubscription_js__["a"]();
	        var Bsub = new /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__queuingSubscription_js__["a"]();
	        this.A = new LoopbackTransportSide(Asub, Bsub);
	        this.B = new LoopbackTransportSide(Bsub, Asub);
	    }
	}

	class LoopbackTransportSide
	{   
	    constructor(mine, other)
	    {
	        this.send = function(msg){mine.publish(JSON.parse(JSON.stringify(msg)));}
	        this.receive = other        
	        this.disconnect=function(){}        
	        this.disconnected=new /* harmony import */ __WEBPACK_IMPORTED_MODULE_0__queuingSubscription_js__["a"]();
	    }
	}



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var cbs = Symbol("cbs");
	var lastValue = Symbol("lastValue");
	/* harmony default export */ exports["a"] = class
	{
	    constructor ()
	    {
	        this[cbs] = [];
	        this[lastValue] = [];
	        this.publish = this._publish.bind(this);
	        this.subscribe = this._subscribe.bind(this);
	    }
	    
	    _publish(obj)
	    {
	        if (this[cbs].length === 0)
	        {
	            this[lastValue].push(obj);    
	        }
	        else
	        {
	            this[cbs].forEach(function(cb){cb(obj);})
	        }
	    }
	    
	    _subscribe(cb)
	    {
	        this[cbs].push(cb);
	        if(this[lastValue])
	        {
	            var temp = this[lastValue];
	            delete this[lastValue];
	            temp.forEach(cb);
	        }
	    }
	    
	    unsubscribe(cb)
	    {}
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(0);


/***/ }
/******/ ]);