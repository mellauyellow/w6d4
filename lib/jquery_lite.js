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
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

	window.$l = function(arg) {
	  // console.log(arg instanceof HTMLElement);
	  if (arg instanceof HTMLElement){
	    return new DOMNodeCollection([arg]);
	  }else{
	    let objects = Array.from(document.querySelectorAll(arg));
	    return new DOMNodeCollection(objects);
	  }
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection{
	  constructor(el){
	    this.el = el;
	  }

	  // getDOMNodes(){
	  //   return new DOMNodeCollection(el);
	  // }

	  HTML(string){
	    if (string) {
	      this.el.forEach(object => {
	        object.innerHTML = string;
	      });
	    } else {
	      return this.el[0].innerHTML;
	    }
	  }

	  empty() {
	    this.el.forEach(object => {
	      object.innerHTML = "";
	    });
	  }

	  append(arg) {
	    if (arg instanceof Array) {
	      arg.forEach(object => {
	        this.el.forEach(node => {
	          node.innerHTML += object.outerHTML;
	        });
	      });
	    } else {
	      this.el.forEach(node => {
	        node.innerHTML += arg.outerHTML;
	      });
	    }
	  }

	  attr(name, value) {
	    if (value === undefined) {
	      return this.el[0].attr[name];
	    } else {
	      if (!this.el[0].attr) {
	        this.el[0].attr = {};
	      }
	      this.el[0].attr[name] = value;
	    }
	  }

	  addClass(className) {
	    this.el.forEach(node => {
	      let modifier = this._hasClass(node, className);
	      let arr = Array.from(node.classList);
	      if (modifier === -1 || modifier === 0){
	        arr.push(className);
	        node.classList = arr.join(" ");
	      }
	    });
	  }

	  removeClass(className){
	    this.el.forEach(node => {
	      let modifier = this._hasClass(node, className);

	      if (modifier === 1){
	        let arr = Array.from(node.classList);
	        delete arr[arr.indexOf(className)];
	        node.classList = arr.join(" ");
	      }
	    });
	  }

	  _hasClass(node, className){
	    let classes = Array.from(node.classList);
	    if (classes.length === 0) {
	      return -1;
	    } else if (classes.includes(className)) {
	      return 1;
	    } else {
	      return 0;
	    }
	  }

	  children() {
	    let childArray = [];

	    this.el.forEach(node => {
	      childArray = childArray.concat(node.children);
	    });

	    return new DOMNodeCollection(childArray);
	  }

	  parent() {
	    let parentArray = [];

	    this.el.forEach(node => {
	      parentArray = parentArray.concat(node.parent);
	    });

	    return new DOMNodeCollection(parentArray);
	  }

	  find(selector) {
	    let descendents = [];
	    this.el.forEach(node => {
	      descendents = descendents.concat(node.querySelectorAll(selector));
	    });

	    return new DOMNodeCollection(descendents);
	  }

	  remove() {
	    this.el.forEach(node => {
	      node.outerHTML = "";
	    });
	    this.el = [];
	  }

	  on(trigger, callback){
	    this.el.forEach(node => {
	      node.addEventListener(trigger, callback);
	    });
	  }

	  off(trigger, callback){
	    this.el.forEach(node => {
	      node.removeEventListener(trigger, callback);
	    });
	  }
	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);