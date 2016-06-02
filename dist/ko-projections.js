(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("knockout"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "knockout"], factory);
	else if(typeof exports === 'object')
		exports["ko-projections"] = factory(require("lodash"), require("knockout"));
	else
		root["ko-projections"] = factory(root["_"], root["ko"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(1);
	var ko = __webpack_require__(2);

	function KodashWrapper(obs) {
	  this.obs = obs;
	}

	KodashWrapper.prototype.wrapProtoFn = function (protoFn) {
	  return function () {
	    var _this = this;

	    var protoFnArgs = [];
	    for (var i = 0; i < arguments.length; ++i) {
	      protoFnArgs[i] = arguments[i];
	    }

	    return ko.pureComputed(function () {
	      var wrapped = protoFn.bind(_(_this.obs())).apply(undefined, protoFnArgs);
	      return typeof wrapped.value === 'function' ? wrapped.value() : wrapped;
	    }).extend({
	      _: true
	    });
	  };
	};
	_.mixin(KodashWrapper.prototype, _(_.prototype).mapValues(function (protoFn) {
	  return KodashWrapper.prototype.wrapProtoFn(protoFn);
	}).value());

	ko.extenders._ = function (obs) {
	  obs._ = new KodashWrapper(obs);
	  return obs;
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;