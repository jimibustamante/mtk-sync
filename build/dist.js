/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 516);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(27)
  , hide      = __webpack_require__(15)
  , redefine  = __webpack_require__(16)
  , ctx       = __webpack_require__(28)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(89)('wks')
  , uid        = __webpack_require__(53)
  , Symbol     = __webpack_require__(2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(1)
  , IE8_DOM_DEFINE = __webpack_require__(166)
  , toPrimitive    = __webpack_require__(26)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(212);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(36)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(22);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(7)
  , createDesc = __webpack_require__(35);
module.exports = __webpack_require__(6) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , hide      = __webpack_require__(15)
  , has       = __webpack_require__(13)
  , SRC       = __webpack_require__(53)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

__webpack_require__(27).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , fails   = __webpack_require__(3)
  , defined = __webpack_require__(22)
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(68)
  , defined = __webpack_require__(22);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(69)
  , createDesc     = __webpack_require__(35)
  , toIObject      = __webpack_require__(18)
  , toPrimitive    = __webpack_require__(26)
  , has            = __webpack_require__(13)
  , IE8_DOM_DEFINE = __webpack_require__(166)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(13)
  , toObject    = __webpack_require__(11)
  , IE_PROTO    = __webpack_require__(123)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(3);

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(28)
  , IObject  = __webpack_require__(68)
  , toObject = __webpack_require__(11)
  , toLength = __webpack_require__(10)
  , asc      = __webpack_require__(255);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0)
  , core    = __webpack_require__(27)
  , fails   = __webpack_require__(3);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(14);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var Map     = __webpack_require__(182)
  , $export = __webpack_require__(0)
  , shared  = __webpack_require__(89)('metadata')
  , store   = shared.store || (shared.store = new (__webpack_require__(185)));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function(O){
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if(__webpack_require__(6)){
  var LIBRARY             = __webpack_require__(46)
    , global              = __webpack_require__(2)
    , fails               = __webpack_require__(3)
    , $export             = __webpack_require__(0)
    , $typed              = __webpack_require__(90)
    , $buffer             = __webpack_require__(130)
    , ctx                 = __webpack_require__(28)
    , anInstance          = __webpack_require__(45)
    , propertyDesc        = __webpack_require__(35)
    , hide                = __webpack_require__(15)
    , redefineAll         = __webpack_require__(50)
    , toInteger           = __webpack_require__(36)
    , toLength            = __webpack_require__(10)
    , toIndex             = __webpack_require__(52)
    , toPrimitive         = __webpack_require__(26)
    , has                 = __webpack_require__(13)
    , same                = __webpack_require__(179)
    , classof             = __webpack_require__(67)
    , isObject            = __webpack_require__(4)
    , toObject            = __webpack_require__(11)
    , isArrayIter         = __webpack_require__(115)
    , create              = __webpack_require__(47)
    , getPrototypeOf      = __webpack_require__(20)
    , gOPN                = __webpack_require__(48).f
    , getIterFn           = __webpack_require__(132)
    , uid                 = __webpack_require__(53)
    , wks                 = __webpack_require__(5)
    , createArrayMethod   = __webpack_require__(24)
    , createArrayIncludes = __webpack_require__(80)
    , speciesConstructor  = __webpack_require__(124)
    , ArrayIterators      = __webpack_require__(133)
    , Iterators           = __webpack_require__(59)
    , $iterDetect         = __webpack_require__(86)
    , setSpecies          = __webpack_require__(51)
    , arrayFill           = __webpack_require__(108)
    , arrayCopyWithin     = __webpack_require__(159)
    , $DP                 = __webpack_require__(7)
    , $GOPD               = __webpack_require__(19)
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end){
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    }
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice:          $slice,
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true)
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      new TypedArray(1).slice();
    }), NAME, {slice: $slice});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function(){ /* empty */ };

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(53)('meta')
  , isObject = __webpack_require__(4)
  , has      = __webpack_require__(13)
  , setDesc  = __webpack_require__(7).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(3)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const TYPES = {
  VarChar (length) {
    return {type: TYPES.VarChar, length}
  },
  NVarChar (length) {
    return {type: TYPES.NVarChar, length}
  },
  Text () {
    return {type: TYPES.Text}
  },
  Int () {
    return {type: TYPES.Int}
  },
  BigInt () {
    return {type: TYPES.BigInt}
  },
  TinyInt () {
    return {type: TYPES.TinyInt}
  },
  SmallInt () {
    return {type: TYPES.SmallInt}
  },
  Bit () {
    return {type: TYPES.Bit}
  },
  Float () {
    return {type: TYPES.Float}
  },
  Numeric (precision, scale) {
    return {type: TYPES.Numeric, precision, scale}
  },
  Decimal (precision, scale) {
    return {type: TYPES.Decimal, precision, scale}
  },
  Real () {
    return {type: TYPES.Real}
  },
  Date () {
    return {type: TYPES.Date}
  },
  DateTime () {
    return {type: TYPES.DateTime}
  },
  DateTime2 (scale) {
    return {type: TYPES.DateTime2, scale}
  },
  DateTimeOffset (scale) {
    return {type: TYPES.DateTimeOffset, scale}
  },
  SmallDateTime () {
    return {type: TYPES.SmallDateTime}
  },
  Time (scale) {
    return {type: TYPES.Time, scale}
  },
  UniqueIdentifier () {
    return {type: TYPES.UniqueIdentifier}
  },
  SmallMoney () {
    return {type: TYPES.SmallMoney}
  },
  Money () {
    return {type: TYPES.Money}
  },
  Binary (length) {
    return {type: TYPES.Binary, length}
  },
  VarBinary (length) {
    return {type: TYPES.VarBinary, length}
  },
  Image () {
    return {type: TYPES.Image}
  },
  Xml () {
    return {type: TYPES.Xml}
  },
  Char (length) {
    return {type: TYPES.Char, length}
  },
  NChar (length) {
    return {type: TYPES.NChar, length}
  },
  NText () {
    return {type: TYPES.NText}
  },
  TVP (tvpType) {
    return {type: TYPES.TVP, tvpType}
  },
  UDT () {
    return {type: TYPES.UDT}
  },
  Geography () {
    return {type: TYPES.Geography}
  },
  Geometry () {
    return {type: TYPES.Geometry}
  },
  Variant () {
    return {type: TYPES.Variant}
  }
}

module.exports.TYPES = TYPES
module.exports.DECLARATIONS = {}

const zero = function (value, length) {
  if (length == null) length = 2

  value = String(value)
  if (value.length < length) {
    for (let i = 1; i <= length - value.length; i++) {
      value = `0${value}`
    }
  }
  return value
}

for (const key in TYPES) {
  if (Object.prototype.hasOwnProperty.call(TYPES, key)) {
    const value = TYPES[key]
    value.declaration = key.toLowerCase()
    module.exports.DECLARATIONS[value.declaration] = value;

    ((key, value) => {
      value.inspect = () => `[sql.${key}]`
    })(key, value)
  }
}

module.exports.declare = (type, options) => {
  switch (type) {
    case TYPES.VarChar: case TYPES.VarBinary:
      return `${type.declaration} (${options.length > 8000 ? 'MAX' : (options.length == null ? 'MAX' : options.length)})`
    case TYPES.NVarChar:
      return `${type.declaration} (${options.length > 4000 ? 'MAX' : (options.length == null ? 'MAX' : options.length)})`
    case TYPES.Char: case TYPES.NChar: case TYPES.Binary:
      return `${type.declaration} (${options.length == null ? 1 : options.length})`
    case TYPES.Decimal: case TYPES.Numeric:
      return `${type.declaration} (${options.precision == null ? 18 : options.precision}, ${options.scale == null ? 0 : options.scale})`
    case TYPES.Time: case TYPES.DateTime2: case TYPES.DateTimeOffset:
      return `${type.declaration} (${options.scale == null ? 7 : options.scale})`
    case TYPES.TVP:
      return `${options.tvpType} readonly`
    default:
      return type.declaration
  }
}

module.exports.cast = (value, type, options) => {
  if (value == null) {
    return null
  }

  switch (typeof value) {
    case 'string':
      return `N'${value.replace(/'/g, '\'\'')}'`

    case 'number':
      return value

    case 'boolean':
      return value ? 1 : 0

    case 'object':
      if (value instanceof Date) {
        let ns = value.getUTCMilliseconds() / 1000
        if (value.nanosecondDelta != null) {
          ns += value.nanosecondDelta
        }
        const scale = options.scale == null ? 7 : options.scale

        if (scale > 0) {
          ns = String(ns).substr(1, scale + 1)
        } else {
          ns = ''
        }

        return `N'${value.getUTCFullYear()}-${zero(value.getUTCMonth() + 1)}-${zero(value.getUTCDate())} ${zero(value.getUTCHours())}:${zero(value.getUTCMinutes())}:${zero(value.getUTCSeconds())}${ns}'`
      } else if (Buffer.isBuffer(value)) {
        return `0x${value.toString('hex')}`
      }

      return null

    default:
      return null
  }
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(221), __esModule: true };

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(213);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(144);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(145);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(145);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(65)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 42 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(64)
  , IE8_DOM_DEFINE = __webpack_require__(149)
  , toPrimitive    = __webpack_require__(105)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(41) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(230)
  , defined = __webpack_require__(95);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = false;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(1)
  , dPs         = __webpack_require__(172)
  , enumBugKeys = __webpack_require__(111)
  , IE_PROTO    = __webpack_require__(123)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(110)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(113).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(174)
  , hiddenKeys = __webpack_require__(111).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(174)
  , enumBugKeys = __webpack_require__(111);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(16);
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(2)
  , dP          = __webpack_require__(7)
  , DESCRIPTORS = __webpack_require__(6)
  , SPECIES     = __webpack_require__(5)('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(36)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 53 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(33)
  , core      = __webpack_require__(32)
  , ctx       = __webpack_require__(147)
  , hide      = __webpack_require__(55)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(43)
  , createDesc = __webpack_require__(78);
module.exports = __webpack_require__(41) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(103)('wks')
  , uid        = __webpack_require__(79)
  , Symbol     = __webpack_require__(33).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(15)(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(28)
  , call        = __webpack_require__(168)
  , isArrayIter = __webpack_require__(115)
  , anObject    = __webpack_require__(1)
  , toLength    = __webpack_require__(10)
  , getIterFn   = __webpack_require__(132)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f
  , has = __webpack_require__(13)
  , TAG = __webpack_require__(5)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , defined = __webpack_require__(22)
  , fails   = __webpack_require__(3)
  , spaces  = __webpack_require__(128)
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var processNextTick = __webpack_require__(135);
/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(70);
util.inherits = __webpack_require__(71);
/*</replacement>*/

var Readable = __webpack_require__(194);
var Writable = __webpack_require__(196);

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(66);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(21)
  , TAG = __webpack_require__(5)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(21);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 69 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 70 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

try {
  var util = __webpack_require__(63);
  if (typeof util.inherits !== 'function') throw '';
  module.exports = util.inherits;
} catch (e) {
  module.exports = __webpack_require__(472);
}


/***/ }),
/* 72 */
/***/ (function(module, exports) {

/**
sprintf() for JavaScript 0.7-beta1
http://www.diveintojavascript.com/projects/javascript-sprintf

Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of sprintf() for JavaScript nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL Alexandru Marasteanu BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


Changelog:
2010.11.07 - 0.7-beta1-node
  - converted it to a node.js compatible module

2010.09.06 - 0.7-beta1
  - features: vsprintf, support for named placeholders
  - enhancements: format cache, reduced global namespace pollution

2010.05.22 - 0.6:
 - reverted to 0.4 and fixed the bug regarding the sign of the number 0
 Note:
 Thanks to Raphael Pigulla <raph (at] n3rd [dot) org> (http://www.n3rd.org/)
 who warned me about a bug in 0.5, I discovered that the last update was
 a regress. I appologize for that.

2010.05.09 - 0.5:
 - bug fix: 0 is now preceeded with a + sign
 - bug fix: the sign was not at the right position on padded results (Kamal Abdali)
 - switched from GPL to BSD license

2007.10.21 - 0.4:
 - unit test and patch (David Baird)

2007.09.17 - 0.3:
 - bug fix: no longer throws exception on empty paramenters (Hans Pufal)

2007.09.11 - 0.2:
 - feature: added argument swapping

2007.04.03 - 0.1:
 - initial release
**/

var sprintf = (function() {
	function get_type(variable) {
		return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
	}
	function str_repeat(input, multiplier) {
		for (var output = []; multiplier > 0; output[--multiplier] = input) {/* do nothing */}
		return output.join('');
	}

	var str_format = function() {
		if (!str_format.cache.hasOwnProperty(arguments[0])) {
			str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
		}
		return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
	};

	// convert object to simple one line string without indentation or
	// newlines. Note that this implementation does not print array
	// values to their actual place for sparse arrays. 
	//
	// For example sparse array like this
	//    l = []
	//    l[4] = 1
	// Would be printed as "[1]" instead of "[, , , , 1]"
	// 
	// If argument 'seen' is not null and array the function will check for 
	// circular object references from argument.
	str_format.object_stringify = function(obj, depth, maxdepth, seen) {
		var str = '';
		if (obj != null) {
			switch( typeof(obj) ) {
			case 'function': 
				return '[Function' + (obj.name ? ': '+obj.name : '') + ']';
			    break;
			case 'object':
				if ( obj instanceof Error) { return '[' + obj.toString() + ']' };
				if (depth >= maxdepth) return '[Object]'
				if (seen) {
					// add object to seen list
					seen = seen.slice(0)
					seen.push(obj);
				}
				if (obj.length != null) { //array
					str += '[';
					var arr = []
					for (var i in obj) {
						if (seen && seen.indexOf(obj[i]) >= 0) arr.push('[Circular]');
						else arr.push(str_format.object_stringify(obj[i], depth+1, maxdepth, seen));
					}
					str += arr.join(', ') + ']';
				} else if ('getMonth' in obj) { // date
					return 'Date(' + obj + ')';
				} else { // object
					str += '{';
					var arr = []
					for (var k in obj) { 
						if(obj.hasOwnProperty(k)) {
							if (seen && seen.indexOf(obj[k]) >= 0) arr.push(k + ': [Circular]');
							else arr.push(k +': ' +str_format.object_stringify(obj[k], depth+1, maxdepth, seen)); 
						}
					}
					str += arr.join(', ') + '}';
				}
				return str;
				break;
			case 'string':				
				return '"' + obj + '"';
				break
			}
		}
		return '' + obj;
	}

	str_format.format = function(parse_tree, argv) {
		var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
		for (i = 0; i < tree_length; i++) {
			node_type = get_type(parse_tree[i]);
			if (node_type === 'string') {
				output.push(parse_tree[i]);
			}
			else if (node_type === 'array') {
				match = parse_tree[i]; // convenience purposes only
				if (match[2]) { // keyword argument
					arg = argv[cursor];
					for (k = 0; k < match[2].length; k++) {
						if (!arg.hasOwnProperty(match[2][k])) {
							throw new Error(sprintf('[sprintf] property "%s" does not exist', match[2][k]));
						}
						arg = arg[match[2][k]];
					}
				}
				else if (match[1]) { // positional argument (explicit)
					arg = argv[match[1]];
				}
				else { // positional argument (implicit)
					arg = argv[cursor++];
				}

				if (/[^sO]/.test(match[8]) && (get_type(arg) != 'number')) {
					throw new Error(sprintf('[sprintf] expecting number but found %s "' + arg + '"', get_type(arg)));
				}
				switch (match[8]) {
					case 'b': arg = arg.toString(2); break;
					case 'c': arg = String.fromCharCode(arg); break;
					case 'd': arg = parseInt(arg, 10); break;
					case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
					case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
				    case 'O': arg = str_format.object_stringify(arg, 0, parseInt(match[7]) || 5); break;
					case 'o': arg = arg.toString(8); break;
					case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
					case 'u': arg = Math.abs(arg); break;
					case 'x': arg = arg.toString(16); break;
					case 'X': arg = arg.toString(16).toUpperCase(); break;
				}
				arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
				pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
				pad_length = match[6] - String(arg).length;
				pad = match[6] ? str_repeat(pad_character, pad_length) : '';
				output.push(match[5] ? arg + pad : pad + arg);
			}
		}
		return output.join('');
	};

	str_format.cache = {};

	str_format.parse = function(fmt) {
		var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
		while (_fmt) {
			if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
				parse_tree.push(match[0]);
			}
			else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
				parse_tree.push('%');
			}
			else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosOuxX])/.exec(_fmt)) !== null) {
				if (match[2]) {
					arg_names |= 1;
					var field_list = [], replacement_field = match[2], field_match = [];
					if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
						field_list.push(field_match[1]);
						while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
							if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							}
							else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							}
							else {
								throw new Error('[sprintf] ' + replacement_field);
							}
						}
					}
					else {
                        throw new Error('[sprintf] ' + replacement_field);
					}
					match[2] = field_list;
				}
				else {
					arg_names |= 2;
				}
				if (arg_names === 3) {
					throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported');
				}
				parse_tree.push(match);
			}
			else {
				throw new Error('[sprintf] ' + _fmt);
			}
			_fmt = _fmt.substring(match[0].length);
		}
		return parse_tree;
	};

	return str_format;
})();

var vsprintf = function(fmt, argv) {
	var argvClone = argv.slice();
	argvClone.unshift(fmt);
	return sprintf.apply(null, argvClone);
};

module.exports = sprintf;
sprintf.sprintf = sprintf;
sprintf.vsprintf = vsprintf;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(63);

module.exports.ConnectionError = ConnectionError;
function ConnectionError(message, code) {
  if (!(this instanceof ConnectionError)) {
    if (message instanceof ConnectionError) {
      return message;
    }

    return new ConnectionError(message, code);
  }

  Error.call(this);

  this.message = message;
  this.code = code;

  Error.captureStackTrace(this, this.constructor);
}

util.inherits(ConnectionError, Error);

ConnectionError.prototype.name = 'ConnectionError';

module.exports.RequestError = RequestError;
function RequestError(message, code) {
  if (!(this instanceof RequestError)) {
    if (message instanceof RequestError) {
      return message;
    }

    return new RequestError(message, code);
  }

  Error.call(this);

  this.message = message;
  this.code = code;

  Error.captureStackTrace(this, this.constructor);
}

util.inherits(RequestError, Error);

RequestError.prototype.name = 'RequestError';

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var codepageBySortId = __webpack_require__(201).codepageBySortId;
var codepageByLcid = __webpack_require__(201).codepageByLcid;
var TYPE = __webpack_require__(91).TYPE;
var sprintf = __webpack_require__(72).sprintf;

module.exports = metadataParse;
module.exports.readPrecision = readPrecision;
module.exports.readScale = readScale;
module.exports.readCollation = readCollation;

function readDataLength(parser, type, callback) {
  if ((type.id & 0x30) === 0x20) {
    // xx10xxxx - s2.2.4.2.1.3
    // Variable length
    if (type.dataLengthFromScale) {
      return callback(0); // dataLength is resolved from scale
    } else if (type.fixedDataLength) {
      return callback(type.fixedDataLength);
    }

    switch (type.dataLengthLength) {
      case 0:
        return callback(undefined);

      case 1:
        return parser.readUInt8(callback);

      case 2:
        return parser.readUInt16LE(callback);

      case 4:
        return parser.readUInt32LE(callback);

      default:
        return parser.emit(new Error('Unsupported dataLengthLength ' + type.dataLengthLength + ' for data type ' + type.name));
    }
  } else {
    callback(undefined);
  }
}

function readPrecision(parser, type, callback) {
  if (type.hasPrecision) {
    parser.readUInt8(callback);
  } else {
    callback(undefined);
  }
}

function readScale(parser, type, callback) {
  if (type.hasScale) {
    parser.readUInt8(callback);
  } else {
    callback(undefined);
  }
}

function readCollation(parser, type, callback) {
  if (type.hasCollation) {
    // s2.2.5.1.2
    parser.readBuffer(5, function (collationData) {
      var collation = {};

      collation.lcid = (collationData[2] & 0x0F) << 16;
      collation.lcid |= collationData[1] << 8;
      collation.lcid |= collationData[0];

      // This may not be extracting the correct nibbles in the correct order.
      collation.flags = collationData[3] >> 4;
      collation.flags |= collationData[2] & 0xF0;

      // This may not be extracting the correct nibble.
      collation.version = collationData[3] & 0x0F;

      collation.sortId = collationData[4];

      collation.codepage = codepageBySortId[collation.sortId] || codepageByLcid[collation.lcid] || 'CP1252';

      callback(collation);
    });
  } else {
    callback(undefined);
  }
}

function readSchema(parser, type, callback) {
  if (type.hasSchemaPresent) {
    // s2.2.5.5.3
    parser.readUInt8(function (schemaPresent) {
      if (schemaPresent === 0x01) {
        parser.readBVarChar(function (dbname) {
          parser.readBVarChar(function (owningSchema) {
            parser.readUsVarChar(function (xmlSchemaCollection) {
              callback({
                dbname: dbname,
                owningSchema: owningSchema,
                xmlSchemaCollection: xmlSchemaCollection
              });
            });
          });
        });
      } else {
        callback(undefined);
      }
    });
  } else {
    callback(undefined);
  }
}

function readUDTInfo(parser, type, callback) {
  if (type.hasUDTInfo) {
    parser.readUInt16LE(function (maxByteSize) {
      parser.readBVarChar(function (dbname) {
        parser.readBVarChar(function (owningSchema) {
          parser.readBVarChar(function (typeName) {
            parser.readUsVarChar(function (assemblyName) {
              callback({
                maxByteSize: maxByteSize,
                dbname: dbname,
                owningSchema: owningSchema,
                typeName: typeName,
                assemblyName: assemblyName
              });
            });
          });
        });
      });
    });
  } else {
    return callback();
  }
}

function metadataParse(parser, options, callback) {
  (options.tdsVersion < '7_2' ? parser.readUInt16LE : parser.readUInt32LE).call(parser, function (userType) {
    parser.readUInt16LE(function (flags) {
      parser.readUInt8(function (typeNumber) {
        var type = TYPE[typeNumber];

        if (!type) {
          return parser.emit(new Error(sprintf('Unrecognised data type 0x%02X', typeNumber)));
        }

        readDataLength(parser, type, function (dataLength) {
          readPrecision(parser, type, function (precision) {
            readScale(parser, type, function (scale) {
              if (scale && type.dataLengthFromScale) {
                dataLength = type.dataLengthFromScale(scale);
              }

              readCollation(parser, type, function (collation) {
                readSchema(parser, type, function (schema) {
                  readUDTInfo(parser, type, function (udtInfo) {
                    callback({
                      userType: userType,
                      flags: flags,
                      type: type,
                      collation: collation,
                      precision: precision,
                      scale: scale,
                      dataLength: dataLength,
                      schema: schema,
                      udtInfo: udtInfo
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var buffer = __webpack_require__(12);
var Buffer = buffer.Buffer;
var SlowBuffer = buffer.SlowBuffer;
var MAX_LEN = buffer.kMaxLength || 2147483647;
exports.alloc = function alloc(size, fill, encoding) {
  if (typeof Buffer.alloc === 'function') {
    return Buffer.alloc(size, fill, encoding);
  }
  if (typeof encoding === 'number') {
    throw new TypeError('encoding must not be number');
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  var enc = encoding;
  var _fill = fill;
  if (_fill === undefined) {
    enc = undefined;
    _fill = 0;
  }
  var buf = new Buffer(size);
  if (typeof _fill === 'string') {
    var fillBuf = new Buffer(_fill, enc);
    var flen = fillBuf.length;
    var i = -1;
    while (++i < size) {
      buf[i] = fillBuf[i % flen];
    }
  } else {
    buf.fill(_fill);
  }
  return buf;
}
exports.allocUnsafe = function allocUnsafe(size) {
  if (typeof Buffer.allocUnsafe === 'function') {
    return Buffer.allocUnsafe(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new Buffer(size);
}
exports.from = function from(value, encodingOrOffset, length) {
  if (typeof Buffer.from === 'function' && (!global.Uint8Array || Uint8Array.from !== Buffer.from)) {
    return Buffer.from(value, encodingOrOffset, length);
  }
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof value === 'string') {
    return new Buffer(value, encodingOrOffset);
  }
  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    var offset = encodingOrOffset;
    if (arguments.length === 1) {
      return new Buffer(value);
    }
    if (typeof offset === 'undefined') {
      offset = 0;
    }
    var len = length;
    if (typeof len === 'undefined') {
      len = value.byteLength - offset;
    }
    if (offset >= value.byteLength) {
      throw new RangeError('\'offset\' is out of bounds');
    }
    if (len > value.byteLength - offset) {
      throw new RangeError('\'length\' is out of bounds');
    }
    return new Buffer(value.slice(offset, offset + len));
  }
  if (Buffer.isBuffer(value)) {
    var out = new Buffer(value.length);
    value.copy(out, 0, 0, value.length);
    return out;
  }
  if (value) {
    if (Array.isArray(value) || (typeof ArrayBuffer !== 'undefined' && value.buffer instanceof ArrayBuffer) || 'length' in value) {
      return new Buffer(value);
    }
    if (value.type === 'Buffer' && Array.isArray(value.data)) {
      return new Buffer(value.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ' + 'ArrayBuffer, Array, or array-like object.');
}
exports.allocUnsafeSlow = function allocUnsafeSlow(size) {
  if (typeof Buffer.allocUnsafeSlow === 'function') {
    return Buffer.allocUnsafeSlow(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size >= MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new SlowBuffer(size);
}


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(155)
  , enumBugKeys = __webpack_require__(96);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 79 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(18)
  , toLength  = __webpack_require__(10)
  , toIndex   = __webpack_require__(52);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(2)
  , $export           = __webpack_require__(0)
  , redefine          = __webpack_require__(16)
  , redefineAll       = __webpack_require__(50)
  , meta              = __webpack_require__(34)
  , forOf             = __webpack_require__(58)
  , anInstance        = __webpack_require__(45)
  , isObject          = __webpack_require__(4)
  , fails             = __webpack_require__(3)
  , $iterDetect       = __webpack_require__(86)
  , setToStringTag    = __webpack_require__(60)
  , inheritIfRequired = __webpack_require__(114);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide     = __webpack_require__(15)
  , redefine = __webpack_require__(16)
  , fails    = __webpack_require__(3)
  , defined  = __webpack_require__(22)
  , wks      = __webpack_require__(5);

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};

/***/ }),
/* 84 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4)
  , cof      = __webpack_require__(21)
  , MATCH    = __webpack_require__(5)('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(5)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(46)|| !__webpack_require__(3)(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete __webpack_require__(2)[K];
});

/***/ }),
/* 88 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , hide   = __webpack_require__(15)
  , uid    = __webpack_require__(53)
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , CONSTR = ABV
  , i = 0, l = 9, Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i < l){
  if(Typed = global[TypedArrayConstructors[i++]]){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var guidParser = __webpack_require__(202);

var NULL = (1 << 16) - 1;
var EPOCH_DATE = new Date(1900, 0, 1);
var UTC_EPOCH_DATE = new Date(Date.UTC(1900, 0, 1));
var YEAR_ONE = new Date(2000, 0, -730118);
var UTC_YEAR_ONE = Date.UTC(2000, 0, -730118);
var MAX = (1 << 16) - 1;

var typeByName = module.exports.typeByName = {};

var TYPE = module.exports.TYPE = {
  0x1F: {
    type: 'NULL',
    name: 'Null'
  },

  0x30: {
    type: 'INT1',
    name: 'TinyInt',

    declaration: function declaration() {
      return 'tinyint';
    },

    writeTypeInfo: function writeTypeInfo(buffer) {
      buffer.writeUInt8(typeByName.IntN.id);
      return buffer.writeUInt8(1);
    },

    writeParameterData: function writeParameterData(buffer, parameter) {
      if (parameter.value != null) {
        buffer.writeUInt8(1);
        return buffer.writeUInt8(parseInt(parameter.value));
      } else {
        return buffer.writeUInt8(0);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      value = parseInt(value);
      if (isNaN(value)) {
        return new TypeError('Invalid number.');
      }
      if (value < 0 || value > 255) {
        return new TypeError('Value must be between 0 and 255.');
      }
      return value;
    }
  },

  0x32: {
    type: 'BIT',
    name: 'Bit',

    declaration: function declaration() {
      return 'bit';
    },

    writeTypeInfo: function writeTypeInfo(buffer) {
      buffer.writeUInt8(typeByName.BitN.id);
      return buffer.writeUInt8(1);
    },

    writeParameterData: function writeParameterData(buffer, parameter) {
      if (typeof parameter.value === 'undefined' || parameter.value === null) {
        return buffer.writeUInt8(0);
      } else {
        buffer.writeUInt8(1);
        return buffer.writeUInt8(parameter.value ? 1 : 0);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      if (value) {
        return true;
      } else {
        return false;
      }
    }
  },

  0x34: {
    type: 'INT2',
    name: 'SmallInt',

    declaration: function declaration() {
      return 'smallint';
    },

    writeTypeInfo: function writeTypeInfo(buffer) {
      buffer.writeUInt8(typeByName.IntN.id);
      return buffer.writeUInt8(2);
    },

    writeParameterData: function writeParameterData(buffer, parameter) {
      if (parameter.value != null) {
        buffer.writeUInt8(2);
        return buffer.writeInt16LE(parseInt(parameter.value));
      } else {
        return buffer.writeUInt8(0);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      value = parseInt(value);
      if (isNaN(value)) {
        return new TypeError('Invalid number.');
      }
      if (value < -32768 || value > 32767) {
        return new TypeError('Value must be between -32768 and 32767.');
      }
      return value;
    }
  },

  0x38: {
    type: 'INT4',
    name: 'Int',

    declaration: function declaration() {
      return 'int';
    },

    writeTypeInfo: function writeTypeInfo(buffer) {
      buffer.writeUInt8(typeByName.IntN.id);
      return buffer.writeUInt8(4);
    },

    writeParameterData: function writeParameterData(buffer, parameter) {
      if (parameter.value != null) {
        buffer.writeUInt8(4);
        return buffer.writeInt32LE(parseInt(parameter.value));
      } else {
        return buffer.writeUInt8(0);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      value = parseInt(value);
      if (isNaN(value)) {
        return new TypeError('Invalid number.');
      }
      if (value < -2147483648 || value > 2147483647) {
        return new TypeError('Value must be between -2147483648 and 2147483647.');
      }
      return value;
    }
  },

  0x3A: {
    type: 'DATETIM4',
    name: 'SmallDateTime',

    declaration: function declaration() {
      return 'smalldatetime';
    },

    writeTypeInfo: function writeTypeInfo(buffer) {
      buffer.writeUInt8(typeByName.DateTimeN.id);
      return buffer.writeUInt8(4);
    },

    writeParameterData: function writeParameterData(buffer, parameter, options) {
      if (parameter.value != null) {
        var days = void 0,
            dstDiff = void 0,
            minutes = void 0;
        if (options.useUTC) {
          days = Math.floor((parameter.value.getTime() - UTC_EPOCH_DATE.getTime()) / (1000 * 60 * 60 * 24));
          minutes = parameter.value.getUTCHours() * 60 + parameter.value.getUTCMinutes();
        } else {
          dstDiff = -(parameter.value.getTimezoneOffset() - EPOCH_DATE.getTimezoneOffset()) * 60 * 1000;
          days = Math.floor((parameter.value.getTime() - EPOCH_DATE.getTime() + dstDiff) / (1000 * 60 * 60 * 24));
          minutes = parameter.value.getHours() * 60 + parameter.value.getMinutes();
        }

        buffer.writeUInt8(4);
        buffer.writeUInt16LE(days);

        return buffer.writeUInt16LE(minutes);
      } else {
        return buffer.writeUInt8(0);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }

      if (!(value instanceof Date)) {
        value = Date.parse(value);
      }

      if (isNaN(value)) {
        return new TypeError('Invalid date.');
      }

      return value;
    }
  },

  0x3B: {
    type: 'FLT4',
    name: 'Real',

    declaration: function declaration() {
      return 'real';
    },

    writeTypeInfo: function writeTypeInfo(buffer) {
      buffer.writeUInt8(typeByName.FloatN.id);
      return buffer.writeUInt8(4);
    },

    writeParameterData: function writeParameterData(buffer, parameter) {
      if (parameter.value != null) {
        buffer.writeUInt8(4);
        return buffer.writeFloatLE(parseFloat(parameter.value));
      } else {
        return buffer.writeUInt8(0);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      value = parseFloat(value);
      if (isNaN(value)) {
        return new TypeError('Invalid number.');
      }
      return value;
    }
  },

  0x3C: {
    type: 'MONEY',
    name: 'Money',

    declaration: function declaration() {
      return 'money';
    },

    writeTypeInfo: function writeTypeInfo(buffer) {
      buffer.writeUInt8(typeByName.MoneyN.id);
      return buffer.writeUInt8(8);
    },

    writeParameterData: function writeParameterData(buffer, parameter) {
      if (parameter.value != null) {
        buffer.writeUInt8(8);
        return buffer.writeMoney(parameter.value * 10000);
      } else {
        return buffer.writeUInt8(0);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      value = parseFloat(value);
      if (isNaN(value)) {
        return new TypeError('Invalid number.');
      }
      return value;
    }
  },

  0x3D: {
    type: 'DATETIME',
    name: 'DateTime',

    declaration: function declaration() {
      return 'datetime';
    },

    writeTypeInfo: function writeTypeInfo(buffer) {
      buffer.writeUInt8(typeByName.DateTimeN.id);
      return buffer.writeUInt8(8);
    },

    writeParameterData: function writeParameterData(buffer, parameter, options) {
      if (parameter.value != null) {
        var days = void 0,
            dstDiff = void 0,
            milliseconds = void 0,
            seconds = void 0,
            threeHundredthsOfSecond = void 0;
        if (options.useUTC) {
          days = Math.floor((parameter.value.getTime() - UTC_EPOCH_DATE.getTime()) / (1000 * 60 * 60 * 24));
          seconds = parameter.value.getUTCHours() * 60 * 60;
          seconds += parameter.value.getUTCMinutes() * 60;
          seconds += parameter.value.getUTCSeconds();
          milliseconds = seconds * 1000 + parameter.value.getUTCMilliseconds();
        } else {
          dstDiff = -(parameter.value.getTimezoneOffset() - EPOCH_DATE.getTimezoneOffset()) * 60 * 1000;
          days = Math.floor((parameter.value.getTime() - EPOCH_DATE.getTime() + dstDiff) / (1000 * 60 * 60 * 24));
          seconds = parameter.value.getHours() * 60 * 60;
          seconds += parameter.value.getMinutes() * 60;
          seconds += parameter.value.getSeconds();
          milliseconds = seconds * 1000 + parameter.value.getMilliseconds();
        }

        threeHundredthsOfSecond = milliseconds / (3 + 1 / 3);
        threeHundredthsOfSecond = Math.round(threeHundredthsOfSecond);

        buffer.writeUInt8(8);
        buffer.writeInt32LE(days);

        return buffer.writeUInt32LE(threeHundredthsOfSecond);
      } else {
        return buffer.writeUInt8(0);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      if (!(value instanceof Date)) {
        value = Date.parse(value);
      }
      if (isNaN(value)) {
        return new TypeError('Invalid date.');
      }
      return value;
    }
  },

  0x3E: {
    type: 'FLT8',
    name: 'Float',

    declaration: function declaration() {
      return 'float';
    },

    writeTypeInfo: function writeTypeInfo(buffer) {
      buffer.writeUInt8(typeByName.FloatN.id);
      return buffer.writeUInt8(8);
    },

    writeParameterData: function writeParameterData(buffer, parameter) {
      if (parameter.value != null) {
        buffer.writeUInt8(8);
        return buffer.writeDoubleLE(parseFloat(parameter.value));
      } else {
        return buffer.writeUInt8(0);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      value = parseFloat(value);
      if (isNaN(value)) {
        return new TypeError('Invalid number.');
      }
      return value;
    }
  },

  0x37: {
    type: 'DECIMAL',
    name: 'Decimal',
    hasPrecision: true,
    hasScale: true,

    declaration: function declaration(parameter) {
      return 'decimal(' + this.resolvePrecision(parameter) + ', ' + this.resolveScale(parameter) + ')';
    },

    resolvePrecision: function resolvePrecision(parameter) {
      if (parameter.precision != null) {
        return parameter.precision;
      } else if (parameter.value === null) {
        return 1;
      } else {
        return 18;
      }
    },

    resolveScale: function resolveScale(parameter) {
      if (parameter.scale != null) {
        return parameter.scale;
      } else {
        return 0;
      }
    },

    writeTypeInfo: function writeTypeInfo(buffer, parameter) {
      buffer.writeUInt8(typeByName.DecimalN.id);
      if (parameter.precision <= 9) {
        buffer.writeUInt8(5);
      } else if (parameter.precision <= 19) {
        buffer.writeUInt8(9);
      } else if (parameter.precision <= 28) {
        buffer.writeUInt8(13);
      } else {
        buffer.writeUInt8(17);
      }
      buffer.writeUInt8(parameter.precision);
      return buffer.writeUInt8(parameter.scale);
    },

    writeParameterData: function writeParameterData(buffer, parameter) {
      if (parameter.value != null) {
        var sign = parameter.value < 0 ? 0 : 1;
        var value = Math.round(Math.abs(parameter.value * Math.pow(10, parameter.scale)));
        if (parameter.precision <= 9) {
          buffer.writeUInt8(5);
          buffer.writeUInt8(sign);
          return buffer.writeUInt32LE(value);
        } else if (parameter.precision <= 19) {
          buffer.writeUInt8(9);
          buffer.writeUInt8(sign);
          return buffer.writeUInt64LE(value);
        } else if (parameter.precision <= 28) {
          buffer.writeUInt8(13);
          buffer.writeUInt8(sign);
          buffer.writeUInt64LE(value);
          return buffer.writeUInt32LE(0x00000000);
        } else {
          buffer.writeUInt8(17);
          buffer.writeUInt8(sign);
          buffer.writeUInt64LE(value);
          buffer.writeUInt32LE(0x00000000);
          return buffer.writeUInt32LE(0x00000000);
        }
      } else {
        return buffer.writeUInt8(0);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      value = parseFloat(value);
      if (isNaN(value)) {
        return new TypeError('Invalid number.');
      }
      return value;
    }
  },

  0x3F: {
    type: 'NUMERIC',
    name: 'Numeric',
    hasPrecision: true,
    hasScale: true,

    declaration: function declaration(parameter) {
      return 'numeric(' + this.resolvePrecision(parameter) + ', ' + this.resolveScale(parameter) + ')';
    },

    resolvePrecision: function resolvePrecision(parameter) {
      if (parameter.precision != null) {
        return parameter.precision;
      } else if (parameter.value === null) {
        return 1;
      } else {
        return 18;
      }
    },

    resolveScale: function resolveScale(parameter) {
      if (parameter.scale != null) {
        return parameter.scale;
      } else {
        return 0;
      }
    },

    writeTypeInfo: function writeTypeInfo(buffer, parameter) {
      buffer.writeUInt8(typeByName.NumericN.id);
      if (parameter.precision <= 9) {
        buffer.writeUInt8(5);
      } else if (parameter.precision <= 19) {
        buffer.writeUInt8(9);
      } else if (parameter.precision <= 28) {
        buffer.writeUInt8(13);
      } else {
        buffer.writeUInt8(17);
      }
      buffer.writeUInt8(parameter.precision);
      return buffer.writeUInt8(parameter.scale);
    },

    writeParameterData: function writeParameterData(buffer, parameter) {
      if (parameter.value != null) {
        var sign = parameter.value < 0 ? 0 : 1;
        var value = Math.round(Math.abs(parameter.value * Math.pow(10, parameter.scale)));
        if (parameter.precision <= 9) {
          buffer.writeUInt8(5);
          buffer.writeUInt8(sign);
          return buffer.writeUInt32LE(value);
        } else if (parameter.precision <= 19) {
          buffer.writeUInt8(9);
          buffer.writeUInt8(sign);
          return buffer.writeUInt64LE(value);
        } else if (parameter.precision <= 28) {
          buffer.writeUInt8(13);
          buffer.writeUInt8(sign);
          buffer.writeUInt64LE(value);
          return buffer.writeUInt32LE(0x00000000);
        } else {
          buffer.writeUInt8(17);
          buffer.writeUInt8(sign);
          buffer.writeUInt64LE(value);
          buffer.writeUInt32LE(0x00000000);
          return buffer.writeUInt32LE(0x00000000);
        }
      } else {
        return buffer.writeUInt8(0);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      value = parseFloat(value);
      if (isNaN(value)) {
        return new TypeError('Invalid number.');
      }
      return value;
    }
  },

  0x7A: {
    type: 'MONEY4',
    name: 'SmallMoney',

    declaration: function declaration() {
      return 'smallmoney';
    },

    writeTypeInfo: function writeTypeInfo(buffer) {
      buffer.writeUInt8(typeByName.MoneyN.id);
      return buffer.writeUInt8(4);
    },

    writeParameterData: function writeParameterData(buffer, parameter) {
      if (parameter.value != null) {
        buffer.writeUInt8(4);
        return buffer.writeInt32LE(parameter.value * 10000);
      } else {
        return buffer.writeUInt8(0);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      value = parseFloat(value);
      if (isNaN(value)) {
        return new TypeError('Invalid number.');
      }
      if (value < -214748.3648 || value > 214748.3647) {
        return new TypeError('Value must be between -214748.3648 and 214748.3647.');
      }
      return value;
    }
  },

  0x7F: {
    type: 'INT8',
    name: 'BigInt',

    declaration: function declaration() {
      return 'bigint';
    },

    writeTypeInfo: function writeTypeInfo(buffer) {
      buffer.writeUInt8(typeByName.IntN.id);
      return buffer.writeUInt8(8);
    },

    writeParameterData: function writeParameterData(buffer, parameter) {
      if (parameter.value != null) {
        var val = typeof parameter.value !== 'number' ? parameter.value : parseInt(parameter.value);
        buffer.writeUInt8(8);
        return buffer.writeInt64LE(val);
      } else {
        return buffer.writeUInt8(0);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      if (isNaN(value)) {
        return new TypeError('Invalid number.');
      }
      if (value < -9007199254740991 || value > 9007199254740991) {
        // Number.MIN_SAFE_INTEGER = -9007199254740991
        // Number.MAX_SAFE_INTEGER = 9007199254740991
        // 9007199254740991 = (2**53) - 1
        // Can't use Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER directly though
        // as these constants are not available in node 0.10.
        return new TypeError('Value must be between -9007199254740991 and 9007199254740991, inclusive.' + ' For bigger numbers, use VarChar type.');
      }
      return value;
    }
  },

  0x22: {
    type: 'IMAGE',
    name: 'Image',
    hasTableName: true,
    hasTextPointerAndTimestamp: true,
    dataLengthLength: 4,

    declaration: function declaration() {
      return 'image';
    },

    resolveLength: function resolveLength(parameter) {
      if (parameter.value != null) {
        return parameter.value.length;
      } else {
        return -1;
      }
    },

    writeTypeInfo: function writeTypeInfo(buffer, parameter) {
      buffer.writeUInt8(this.id);
      return buffer.writeInt32LE(parameter.length);
    },

    writeParameterData: function writeParameterData(buffer, parameter) {
      if (parameter.value != null) {
        buffer.writeInt32LE(parameter.length);
        return buffer.writeBuffer(parameter.value);
      } else {
        return buffer.writeInt32LE(parameter.length);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      if (!Buffer.isBuffer(value)) {
        return new TypeError('Invalid buffer.');
      }
      return value;
    }
  },

  0x23: {
    type: 'TEXT',
    name: 'Text',
    hasCollation: true,
    hasTableName: true,
    hasTextPointerAndTimestamp: true,
    dataLengthLength: 4,

    declaration: function declaration() {
      return 'text';
    },

    resolveLength: function resolveLength(parameter) {
      if (parameter.value != null) {
        return parameter.value.length;
      } else {
        return -1;
      }
    },

    writeTypeInfo: function writeTypeInfo(buffer, parameter) {
      buffer.writeUInt8(typeByName.Text.id);
      return buffer.writeInt32LE(parameter.length);
    },

    writeParameterData: function writeParameterData(buffer, parameter) {
      buffer.writeBuffer(new Buffer([0x00, 0x00, 0x00, 0x00, 0x00]));
      if (parameter.value != null) {
        buffer.writeInt32LE(parameter.length);
        return buffer.writeString(parameter.value.toString(), 'ascii');
      } else {
        return buffer.writeInt32LE(parameter.length);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      if (typeof value !== 'string') {
        if (typeof value.toString !== 'function') {
          return TypeError('Invalid string.');
        }
        value = value.toString();
      }
      return value;
    }
  },

  0x24: {
    type: 'GUIDN',
    name: 'UniqueIdentifierN',
    aliases: ['UniqueIdentifier'],
    dataLengthLength: 1,

    declaration: function declaration() {
      return 'uniqueidentifier';
    },

    resolveLength: function resolveLength() {
      return 16;
    },

    writeTypeInfo: function writeTypeInfo(buffer) {
      buffer.writeUInt8(typeByName.UniqueIdentifierN.id);
      return buffer.writeUInt8(0x10);
    },

    writeParameterData: function writeParameterData(buffer, parameter) {
      if (parameter.value != null) {
        buffer.writeUInt8(0x10);
        return buffer.writeBuffer(new Buffer(guidParser.guidToArray(parameter.value)));
      } else {
        return buffer.writeUInt8(0);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      if (typeof value !== 'string') {
        if (typeof value.toString !== 'function') {
          return TypeError('Invalid string.');
        }
        value = value.toString();
      }
      return value;
    }
  },

  0x26: {
    type: 'INTN',
    name: 'IntN',
    dataLengthLength: 1
  },

  0x63: {
    type: 'NTEXT',
    name: 'NText',
    hasCollation: true,
    hasTableName: true,
    hasTextPointerAndTimestamp: true,
    dataLengthLength: 4
  },

  0x68: {
    type: 'BITN',
    name: 'BitN',
    dataLengthLength: 1
  },
  0x6A: {
    type: 'DECIMALN',
    name: 'DecimalN',
    dataLengthLength: 1,
    hasPrecision: true,
    hasScale: true
  },

  0x6C: {
    type: 'NUMERICN',
    name: 'NumericN',
    dataLengthLength: 1,
    hasPrecision: true,
    hasScale: true
  },

  0x6D: {
    type: 'FLTN',
    name: 'FloatN',
    dataLengthLength: 1
  },

  0x6E: {
    type: 'MONEYN',
    name: 'MoneyN',
    dataLengthLength: 1
  },

  0x6F: {
    type: 'DATETIMN',
    name: 'DateTimeN',
    dataLengthLength: 1
  },

  0xA5: {
    type: 'BIGVARBIN',
    name: 'VarBinary',
    dataLengthLength: 2,
    maximumLength: 8000,

    declaration: function declaration(parameter) {
      var length = void 0;
      if (parameter.length) {
        length = parameter.length;
      } else if (parameter.value != null) {
        length = parameter.value.length || 1;
      } else if (parameter.value === null && !parameter.output) {
        length = 1;
      } else {
        length = this.maximumLength;
      }

      if (length <= this.maximumLength) {
        return 'varbinary(' + length + ')';
      } else {
        return 'varbinary(max)';
      }
    },

    resolveLength: function resolveLength(parameter) {
      if (parameter.length != null) {
        return parameter.length;
      } else if (parameter.value != null) {
        return parameter.value.length;
      } else {
        return this.maximumLength;
      }
    },

    writeTypeInfo: function writeTypeInfo(buffer, parameter) {
      buffer.writeUInt8(this.id);
      if (parameter.length <= this.maximumLength) {
        return buffer.writeUInt16LE(this.maximumLength);
      } else {
        return buffer.writeUInt16LE(MAX);
      }
    },

    writeParameterData: function writeParameterData(buffer, parameter) {
      if (parameter.value != null) {
        if (parameter.length <= this.maximumLength) {
          return buffer.writeUsVarbyte(parameter.value);
        } else {
          return buffer.writePLPBody(parameter.value);
        }
      } else {
        if (parameter.length <= this.maximumLength) {
          return buffer.writeUInt16LE(NULL);
        } else {
          buffer.writeUInt32LE(0xFFFFFFFF);
          return buffer.writeUInt32LE(0xFFFFFFFF);
        }
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      if (!Buffer.isBuffer(value)) {
        return new TypeError('Invalid buffer.');
      }
      return value;
    }
  },

  0xA7: {
    type: 'BIGVARCHR',
    name: 'VarChar',
    hasCollation: true,
    dataLengthLength: 2,
    maximumLength: 8000,

    declaration: function declaration(parameter) {
      var length = void 0;
      if (parameter.length) {
        length = parameter.length;
      } else if (parameter.value != null) {
        length = parameter.value.toString().length || 1;
      } else if (parameter.value === null && !parameter.output) {
        length = 1;
      } else {
        length = this.maximumLength;
      }

      if (length <= this.maximumLength) {
        return 'varchar(' + length + ')';
      } else {
        return 'varchar(max)';
      }
    },

    resolveLength: function resolveLength(parameter) {
      if (parameter.length != null) {
        return parameter.length;
      } else if (parameter.value != null) {
        if (Buffer.isBuffer(parameter.value)) {
          return parameter.value.length || 1;
        } else {
          return parameter.value.toString().length || 1;
        }
      } else {
        return this.maximumLength;
      }
    },

    writeTypeInfo: function writeTypeInfo(buffer, parameter) {
      buffer.writeUInt8(this.id);
      if (parameter.length <= this.maximumLength) {
        buffer.writeUInt16LE(this.maximumLength);
      } else {
        buffer.writeUInt16LE(MAX);
      }
      return buffer.writeBuffer(new Buffer([0x00, 0x00, 0x00, 0x00, 0x00]));
    },

    writeParameterData: function writeParameterData(buffer, parameter) {
      if (parameter.value != null) {
        if (parameter.length <= this.maximumLength) {
          return buffer.writeUsVarbyte(parameter.value, 'ascii');
        } else {
          return buffer.writePLPBody(parameter.value, 'ascii');
        }
      } else {
        if (parameter.length <= this.maximumLength) {
          return buffer.writeUInt16LE(NULL);
        } else {
          buffer.writeUInt32LE(0xFFFFFFFF);
          return buffer.writeUInt32LE(0xFFFFFFFF);
        }
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      if (typeof value !== 'string') {
        if (typeof value.toString !== 'function') {
          return TypeError('Invalid string.');
        }
        value = value.toString();
      }
      return value;
    }
  },

  0xAD: {
    type: 'BIGBinary',
    name: 'Binary',
    dataLengthLength: 2,
    maximumLength: 8000,

    declaration: function declaration(parameter) {
      var length;
      if (parameter.length) {
        length = parameter.length;
      } else if (parameter.value != null) {
        length = parameter.value.length || 1;
      } else if (parameter.value === null && !parameter.output) {
        length = 1;
      } else {
        length = this.maximumLength;
      }
      return 'binary(' + length + ')';
    },

    resolveLength: function resolveLength(parameter) {
      if (parameter.value != null) {
        return parameter.value.length;
      } else {
        return this.maximumLength;
      }
    },

    writeTypeInfo: function writeTypeInfo(buffer, parameter) {
      buffer.writeUInt8(this.id);
      return buffer.writeUInt16LE(parameter.length);
    },

    writeParameterData: function writeParameterData(buffer, parameter) {
      if (parameter.value != null) {
        buffer.writeUInt16LE(parameter.length);
        return buffer.writeBuffer(parameter.value.slice(0, Math.min(parameter.length, this.maximumLength)));
      } else {
        return buffer.writeUInt16LE(NULL);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      if (!Buffer.isBuffer(value)) {
        return new TypeError('Invalid buffer.');
      }
      return value;
    }
  },

  0xAF: {
    type: 'BIGCHAR',
    name: 'Char',
    hasCollation: true,
    dataLengthLength: 2,
    maximumLength: 8000,

    declaration: function declaration(parameter) {
      var length = void 0;
      if (parameter.length) {
        length = parameter.length;
      } else if (parameter.value != null) {
        length = parameter.value.toString().length || 1;
      } else if (parameter.value === null && !parameter.output) {
        length = 1;
      } else {
        length = this.maximumLength;
      }

      if (length < this.maximumLength) {
        return 'char(' + length + ')';
      } else {
        return 'char(' + this.maximumLength + ')';
      }
    },

    resolveLength: function resolveLength(parameter) {
      if (parameter.length != null) {
        return parameter.length;
      } else if (parameter.value != null) {
        if (Buffer.isBuffer(parameter.value)) {
          return parameter.value.length || 1;
        } else {
          return parameter.value.toString().length || 1;
        }
      } else {
        return this.maximumLength;
      }
    },

    writeTypeInfo: function writeTypeInfo(buffer, parameter) {
      buffer.writeUInt8(this.id);
      buffer.writeUInt16LE(parameter.length);
      return buffer.writeBuffer(new Buffer([0x00, 0x00, 0x00, 0x00, 0x00]));
    },

    writeParameterData: function writeParameterData(buffer, parameter) {
      if (parameter.value != null) {
        return buffer.writeUsVarbyte(parameter.value, 'ascii');
      } else {
        return buffer.writeUInt16LE(NULL);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      if (typeof value !== 'string') {
        if (typeof value.toString !== 'function') {
          return TypeError('Invalid string.');
        }
        value = value.toString();
      }
      return value;
    }
  },

  0xE7: {
    type: 'NVARCHAR',
    name: 'NVarChar',
    hasCollation: true,
    dataLengthLength: 2,
    maximumLength: 4000,

    declaration: function declaration(parameter) {
      var length = void 0;
      if (parameter.length) {
        length = parameter.length;
      } else if (parameter.value != null) {
        length = parameter.value.toString().length || 1;
      } else if (parameter.value === null && !parameter.output) {
        length = 1;
      } else {
        length = this.maximumLength;
      }

      if (length <= this.maximumLength) {
        return 'nvarchar(' + length + ')';
      } else {
        return 'nvarchar(max)';
      }
    },

    resolveLength: function resolveLength(parameter) {
      if (parameter.length != null) {
        return parameter.length;
      } else if (parameter.value != null) {
        if (Buffer.isBuffer(parameter.value)) {
          return parameter.value.length / 2 || 1;
        } else {
          return parameter.value.toString().length || 1;
        }
      } else {
        return this.maximumLength;
      }
    },

    writeTypeInfo: function writeTypeInfo(buffer, parameter) {
      buffer.writeUInt8(this.id);
      if (parameter.length <= this.maximumLength) {
        buffer.writeUInt16LE(parameter.length * 2);
      } else {
        buffer.writeUInt16LE(MAX);
      }
      return buffer.writeBuffer(new Buffer([0x00, 0x00, 0x00, 0x00, 0x00]));
    },

    writeParameterData: function writeParameterData(buffer, parameter) {
      if (parameter.value != null) {
        if (parameter.length <= this.maximumLength) {
          return buffer.writeUsVarbyte(parameter.value, 'ucs2');
        } else {
          return buffer.writePLPBody(parameter.value, 'ucs2');
        }
      } else {
        if (parameter.length <= this.maximumLength) {
          return buffer.writeUInt16LE(NULL);
        } else {
          buffer.writeUInt32LE(0xFFFFFFFF);
          return buffer.writeUInt32LE(0xFFFFFFFF);
        }
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      if (typeof value !== 'string') {
        if (typeof value.toString !== 'function') {
          return TypeError('Invalid string.');
        }
        value = value.toString();
      }
      return value;
    }
  },

  0xEF: {
    type: 'NCHAR',
    name: 'NChar',
    hasCollation: true,
    dataLengthLength: 2,
    maximumLength: 4000,

    declaration: function declaration(parameter) {
      var length = void 0;
      if (parameter.length) {
        length = parameter.length;
      } else if (parameter.value != null) {
        length = parameter.value.toString().length || 1;
      } else if (parameter.value === null && !parameter.output) {
        length = 1;
      } else {
        length = this.maximumLength;
      }

      if (length < this.maximumLength) {
        return 'nchar(' + length + ')';
      } else {
        return 'nchar(' + this.maximumLength + ')';
      }
    },

    resolveLength: function resolveLength(parameter) {
      if (parameter.length != null) {
        return parameter.length;
      } else if (parameter.value != null) {
        if (Buffer.isBuffer(parameter.value)) {
          return parameter.value.length / 2 || 1;
        } else {
          return parameter.value.toString().length || 1;
        }
      } else {
        return this.maximumLength;
      }
    },

    writeTypeInfo: function writeTypeInfo(buffer, parameter) {
      buffer.writeUInt8(this.id);
      buffer.writeUInt16LE(parameter.length * 2);
      return buffer.writeBuffer(new Buffer([0x00, 0x00, 0x00, 0x00, 0x00]));
    },

    writeParameterData: function writeParameterData(buffer, parameter) {
      if (parameter.value != null) {
        return buffer.writeUsVarbyte(parameter.value, 'ucs2');
      } else {
        return buffer.writeUInt16LE(NULL);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      if (typeof value !== 'string') {
        if (typeof value.toString !== 'function') {
          return TypeError('Invalid string.');
        }
        value = value.toString();
      }
      return value;
    }
  },

  0xF1: {
    type: 'XML',
    name: 'Xml',
    hasSchemaPresent: true
  },

  0x29: {
    type: 'TIMEN',
    name: 'TimeN',
    aliases: ['Time'],
    hasScale: true,
    dataLengthLength: 1,

    dataLengthFromScale: function dataLengthFromScale(scale) {
      switch (scale) {
        case 0:
        case 1:
        case 2:
          return 3;
        case 3:
        case 4:
          return 4;
        case 5:
        case 6:
        case 7:
          return 5;
      }
    },

    declaration: function declaration(parameter) {
      return 'time(' + this.resolveScale(parameter) + ')';
    },

    resolveScale: function resolveScale(parameter) {
      if (parameter.scale != null) {
        return parameter.scale;
      } else if (parameter.value === null) {
        return 0;
      } else {
        return 7;
      }
    },

    writeTypeInfo: function writeTypeInfo(buffer, parameter) {
      buffer.writeUInt8(this.id);
      return buffer.writeUInt8(parameter.scale);
    },

    writeParameterData: function writeParameterData(buffer, parameter, options) {
      if (parameter.value != null) {
        var ref = void 0,
            time = new Date(+parameter.value);
        if (options.useUTC) {
          time = ((time.getUTCHours() * 60 + time.getUTCMinutes()) * 60 + time.getUTCSeconds()) * 1000 + time.getUTCMilliseconds();
        } else {
          time = ((time.getHours() * 60 + time.getMinutes()) * 60 + time.getSeconds()) * 1000 + time.getMilliseconds();
        }
        time = (time / 1000 + ((ref = parameter.value.nanosecondDelta) != null ? ref : 0)) * Math.pow(10, parameter.scale);
        switch (parameter.scale) {
          case 0:
          case 1:
          case 2:
            buffer.writeUInt8(3);
            return buffer.writeUInt24LE(time);
          case 3:
          case 4:
            buffer.writeUInt8(4);
            return buffer.writeUInt32LE(time);
          case 5:
          case 6:
          case 7:
            buffer.writeUInt8(5);
            return buffer.writeUInt40LE(time);
        }
      } else {
        return buffer.writeUInt8(0);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      if (value instanceof Date) {
        return value;
      }
      value = Date.parse(value);
      if (isNaN(value)) {
        return new TypeError('Invalid time.');
      }
      return value;
    }
  },

  0x28: {
    type: 'DATEN',
    name: 'DateN',
    aliases: ['Date'],
    dataLengthLength: 1,
    fixedDataLength: 3,

    declaration: function declaration() {
      return 'date';
    },

    writeTypeInfo: function writeTypeInfo(buffer) {
      return buffer.writeUInt8(this.id);
    },

    writeParameterData: function writeParameterData(buffer, parameter, options) {
      if (parameter.value != null) {
        buffer.writeUInt8(3);
        if (options.useUTC) {
          return buffer.writeUInt24LE(Math.floor((+parameter.value - UTC_YEAR_ONE) / 86400000));
        } else {
          var dstDiff = -(parameter.value.getTimezoneOffset() - YEAR_ONE.getTimezoneOffset()) * 60 * 1000;
          return buffer.writeUInt24LE(Math.floor((+parameter.value - YEAR_ONE + dstDiff) / 86400000));
        }
      } else {
        return buffer.writeUInt8(0);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      if (!(value instanceof Date)) {
        value = Date.parse(value);
      }
      if (isNaN(value)) {
        return new TypeError('Invalid date.');
      }
      return value;
    }
  },

  0x2A: {
    type: 'DATETIME2N',
    name: 'DateTime2N',
    aliases: ['DateTime2'],
    hasScale: true,
    dataLengthLength: 1,

    dataLengthFromScale: function dataLengthFromScale(scale) {
      switch (scale) {
        case 0:
        case 1:
        case 2:
          return 3;
        case 3:
        case 4:
          return 4;
        case 5:
        case 6:
        case 7:
          return 5;
      }
    },

    declaration: function declaration(parameter) {
      return 'datetime2(' + this.resolveScale(parameter) + ')';
    },

    resolveScale: function resolveScale(parameter) {
      if (parameter.scale != null) {
        return parameter.scale;
      } else if (parameter.value === null) {
        return 0;
      } else {
        return 7;
      }
    },

    writeTypeInfo: function writeTypeInfo(buffer, parameter) {
      buffer.writeUInt8(this.id);
      return buffer.writeUInt8(parameter.scale);
    },

    writeParameterData: function writeParameterData(buffer, parameter, options) {
      if (parameter.value != null) {
        var ref = void 0,
            time = new Date(+parameter.value);
        if (options.useUTC) {
          time = ((time.getUTCHours() * 60 + time.getUTCMinutes()) * 60 + time.getUTCSeconds()) * 1000 + time.getUTCMilliseconds();
        } else {
          time = ((time.getHours() * 60 + time.getMinutes()) * 60 + time.getSeconds()) * 1000 + time.getMilliseconds();
        }
        time = (time / 1000 + ((ref = parameter.value.nanosecondDelta) != null ? ref : 0)) * Math.pow(10, parameter.scale);
        switch (parameter.scale) {
          case 0:
          case 1:
          case 2:
            buffer.writeUInt8(6);
            buffer.writeUInt24LE(time);
            break;
          case 3:
          case 4:
            buffer.writeUInt8(7);
            buffer.writeUInt32LE(time);
            break;
          case 5:
          case 6:
          case 7:
            buffer.writeUInt8(8);
            buffer.writeUInt40LE(time);
        }
        if (options.useUTC) {
          return buffer.writeUInt24LE(Math.floor((+parameter.value - UTC_YEAR_ONE) / 86400000));
        } else {
          var dstDiff = -(parameter.value.getTimezoneOffset() - YEAR_ONE.getTimezoneOffset()) * 60 * 1000;
          return buffer.writeUInt24LE(Math.floor((+parameter.value - YEAR_ONE + dstDiff) / 86400000));
        }
      } else {
        return buffer.writeUInt8(0);
      }
    },

    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      if (!(value instanceof Date)) {
        value = Date.parse(value);
      }
      if (isNaN(value)) {
        return new TypeError('Invalid date.');
      }
      return value;
    }
  },

  0x2B: {
    type: 'DATETIMEOFFSETN',
    name: 'DateTimeOffsetN',
    aliases: ['DateTimeOffset'],
    hasScale: true,
    dataLengthLength: 1,
    dataLengthFromScale: function dataLengthFromScale(scale) {
      switch (scale) {
        case 0:
        case 1:
        case 2:
          return 3;
        case 3:
        case 4:
          return 4;
        case 5:
        case 6:
        case 7:
          return 5;
      }
    },
    declaration: function declaration(parameter) {
      return 'datetimeoffset(' + this.resolveScale(parameter) + ')';
    },
    resolveScale: function resolveScale(parameter) {
      if (parameter.scale != null) {
        return parameter.scale;
      } else if (parameter.value === null) {
        return 0;
      } else {
        return 7;
      }
    },
    writeTypeInfo: function writeTypeInfo(buffer, parameter) {
      buffer.writeUInt8(this.id);
      return buffer.writeUInt8(parameter.scale);
    },
    writeParameterData: function writeParameterData(buffer, parameter) {
      if (parameter.value != null) {
        var ref = void 0,
            time = new Date(+parameter.value);
        time.setUTCFullYear(1970);
        time.setUTCMonth(0);
        time.setUTCDate(1);
        time = (+time / 1000 + ((ref = parameter.value.nanosecondDelta) != null ? ref : 0)) * Math.pow(10, parameter.scale);
        var offset = -parameter.value.getTimezoneOffset();
        switch (parameter.scale) {
          case 0:
          case 1:
          case 2:
            buffer.writeUInt8(8);
            buffer.writeUInt24LE(time);
            break;
          case 3:
          case 4:
            buffer.writeUInt8(9);
            buffer.writeUInt32LE(time);
            break;
          case 5:
          case 6:
          case 7:
            buffer.writeUInt8(10);
            buffer.writeUInt40LE(time);
        }
        buffer.writeUInt24LE(Math.floor((+parameter.value - UTC_YEAR_ONE) / 86400000));
        return buffer.writeInt16LE(offset);
      } else {
        return buffer.writeUInt8(0);
      }
    },
    validate: function validate(value) {
      if (value == null) {
        return null;
      }
      if (!(value instanceof Date)) {
        value = Date.parse(value);
      }
      if (isNaN(value)) {
        return new TypeError('Invalid date.');
      }
      return value;
    }
  },

  0xF0: {
    type: 'UDTTYPE',
    name: 'UDT',
    hasUDTInfo: true
  },

  0xF3: {
    type: 'TVPTYPE',
    name: 'TVP',

    declaration: function declaration(parameter) {
      return parameter.value.name + ' readonly';
    },

    writeTypeInfo: function writeTypeInfo(buffer, parameter) {
      var ref = void 0,
          ref1 = void 0,
          ref2 = void 0,
          ref3 = void 0;
      buffer.writeUInt8(this.id);
      buffer.writeBVarchar('');
      buffer.writeBVarchar((ref = (ref1 = parameter.value) != null ? ref1.schema : undefined) != null ? ref : '');
      buffer.writeBVarchar((ref2 = (ref3 = parameter.value) != null ? ref3.name : undefined) != null ? ref2 : '');
    },

    writeParameterData: function writeParameterData(buffer, parameter, options) {
      if (parameter.value == null) {
        buffer.writeUInt16LE(0xFFFF);
        buffer.writeUInt8(0x00);
        buffer.writeUInt8(0x00);
        return;
      }

      buffer.writeUInt16LE(parameter.value.columns.length);

      var ref = parameter.value.columns;
      for (var i = 0, len = ref.length; i < len; i++) {
        var column = ref[i];
        buffer.writeUInt32LE(0x00000000);
        buffer.writeUInt16LE(0x0000);
        column.type.writeTypeInfo(buffer, column);
        buffer.writeBVarchar('');
      }

      buffer.writeUInt8(0x00);

      var ref1 = parameter.value.rows;
      for (var j = 0, len1 = ref1.length; j < len1; j++) {
        var row = ref1[j];

        buffer.writeUInt8(0x01);

        for (var k = 0, len2 = row.length; k < len2; k++) {
          var value = row[k];
          var param = {
            value: value,
            length: parameter.value.columns[k].length,
            scale: parameter.value.columns[k].scale,
            precision: parameter.value.columns[k].precision
          };
          parameter.value.columns[k].type.writeParameterData(buffer, param, options);
        }
      }

      buffer.writeUInt8(0x00);
    },
    validate: function validate(value) {
      if (value == null) {
        return null;
      }

      if (typeof value !== 'object') {
        return new TypeError('Invalid table.');
      }

      if (!Array.isArray(value.columns)) {
        return new TypeError('Invalid table.');
      }

      if (!Array.isArray(value.rows)) {
        return new TypeError('Invalid table.');
      }

      return value;
    }
  },

  0x62: {
    type: 'SSVARIANTTYPE',
    name: 'Variant',
    dataLengthLength: 4,

    declaration: function declaration(parameter) {
      return 'sql_variant';
    }
  }
};

/*
  CHARTYPE:             0x2F  # Char (legacy support)
  VARCHARTYPE:          0x27  # VarChar (legacy support)
  BINARYTYPE:           0x2D  # Binary (legacy support)
  VARBINARYTYPE:        0x25  # VarBinary (legacy support)

  SSVARIANTTYPE:        0x62  # Sql_Variant (introduced in TDS 7.2)
 */

for (var id in TYPE) {
  var type = TYPE[id];
  type.id = parseInt(id, 10);
  typeByName[type.name] = type;
  if (type.aliases != null && type.aliases instanceof Array) {
    var ref = type.aliases;
    var len = ref.length;

    for (var i = 0; i < len; i++) {
      var alias = ref[i];
      if (!typeByName[alias]) {
        typeByName[alias] = type;
      }
    }
  }
}

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sprintf = __webpack_require__(72).sprintf;

var HEADER_LENGTH = module.exports.HEADER_LENGTH = 8;

var TYPE = module.exports.TYPE = {
  SQL_BATCH: 0x01,
  RPC_REQUEST: 0x03,
  TABULAR_RESULT: 0x04,
  ATTENTION: 0x06,
  BULK_LOAD: 0x07,
  TRANSACTION_MANAGER: 0x0E,
  LOGIN7: 0x10,
  NTLMAUTH_PKT: 0x11,
  PRELOGIN: 0x12
};

var typeByValue = {};

for (var name in TYPE) {
  typeByValue[TYPE[name]] = name;
}

var STATUS = {
  NORMAL: 0x00,
  EOM: 0x01,
  IGNORE: 0x02,
  RESETCONNECTION: 0x08,
  RESETCONNECTIONSKIPTRAN: 0x10
};

var OFFSET = module.exports.OFFSET = {
  Type: 0,
  Status: 1,
  Length: 2,
  SPID: 4,
  PacketID: 6,
  Window: 7
};

var DEFAULT_SPID = 0;

var DEFAULT_PACKETID = 1;

var DEFAULT_WINDOW = 0;

var NL = '\n';

var Packet = function () {
  function Packet(typeOrBuffer) {
    (0, _classCallCheck3.default)(this, Packet);

    if (typeOrBuffer instanceof Buffer) {
      this.buffer = typeOrBuffer;
    } else {
      var type = typeOrBuffer;
      this.buffer = new Buffer(HEADER_LENGTH);
      this.buffer.writeUInt8(type, OFFSET.Type);
      this.buffer.writeUInt8(STATUS.NORMAL, OFFSET.Status);
      this.buffer.writeUInt16BE(DEFAULT_SPID, OFFSET.SPID);
      this.buffer.writeUInt8(DEFAULT_PACKETID, OFFSET.PacketID);
      this.buffer.writeUInt8(DEFAULT_WINDOW, OFFSET.Window);
      this.setLength();
    }
  }

  (0, _createClass3.default)(Packet, [{
    key: 'setLength',
    value: function setLength() {
      return this.buffer.writeUInt16BE(this.buffer.length, OFFSET.Length);
    }
  }, {
    key: 'length',
    value: function length() {
      return this.buffer.readUInt16BE(OFFSET.Length);
    }
  }, {
    key: 'resetConnection',
    value: function resetConnection(reset) {
      var status = this.buffer.readUInt8(OFFSET.Status);
      if (reset) {
        status |= STATUS.RESETCONNECTION;
      } else {
        status &= 0xFF - STATUS.RESETCONNECTION;
      }
      return this.buffer.writeUInt8(status, OFFSET.Status);
    }
  }, {
    key: 'last',
    value: function last(_last) {
      var status = this.buffer.readUInt8(OFFSET.Status);
      if (arguments.length > 0) {
        if (_last) {
          status |= STATUS.EOM;
        } else {
          status &= 0xFF - STATUS.EOM;
        }
        this.buffer.writeUInt8(status, OFFSET.Status);
      }
      return this.isLast();
    }
  }, {
    key: 'isLast',
    value: function isLast() {
      return !!(this.buffer.readUInt8(OFFSET.Status) & STATUS.EOM);
    }
  }, {
    key: 'packetId',
    value: function packetId(_packetId) {
      if (_packetId) {
        this.buffer.writeUInt8(_packetId % 256, OFFSET.PacketID);
      }
      return this.buffer.readUInt8(OFFSET.PacketID);
    }
  }, {
    key: 'addData',
    value: function addData(data) {
      this.buffer = Buffer.concat([this.buffer, data]);
      this.setLength();
      return this;
    }
  }, {
    key: 'data',
    value: function data() {
      return this.buffer.slice(HEADER_LENGTH);
    }
  }, {
    key: 'type',
    value: function type() {
      return this.buffer.readUInt8(OFFSET.Type);
    }
  }, {
    key: 'statusAsString',
    value: function statusAsString() {
      var status = this.buffer.readUInt8(OFFSET.Status);
      var statuses = [];

      for (var _name in STATUS) {
        var value = STATUS[_name];

        if (status & value) {
          statuses.push(_name);
        } else {
          statuses.push(undefined);
        }
      }

      return statuses.join(' ').trim();
    }
  }, {
    key: 'headerToString',
    value: function headerToString(indent) {
      indent || (indent = '');
      var text = sprintf('type:0x%02X(%s), status:0x%02X(%s), length:0x%04X, spid:0x%04X, packetId:0x%02X, window:0x%02X', this.buffer.readUInt8(OFFSET.Type), typeByValue[this.buffer.readUInt8(OFFSET.Type)], this.buffer.readUInt8(OFFSET.Status), this.statusAsString(), this.buffer.readUInt16BE(OFFSET.Length), this.buffer.readUInt16BE(OFFSET.SPID), this.buffer.readUInt8(OFFSET.PacketID), this.buffer.readUInt8(OFFSET.Window));
      return indent + text;
    }
  }, {
    key: 'dataToString',
    value: function dataToString(indent) {
      indent || (indent = '');

      var BYTES_PER_GROUP = 0x04;
      var CHARS_PER_GROUP = 0x08;
      var BYTES_PER_LINE = 0x20;
      var data = this.data();

      var dataDump = '';
      var chars = '';

      for (var offset = 0; offset < data.length; offset++) {
        if (offset % BYTES_PER_LINE === 0) {
          dataDump += indent;
          dataDump += sprintf('%04X  ', offset);
        }

        if (data[offset] < 0x20 || data[offset] > 0x7E) {
          chars += '.';
          if ((offset + 1) % CHARS_PER_GROUP === 0 && !((offset + 1) % BYTES_PER_LINE === 0)) {
            chars += ' ';
          }
        } else {
          chars += String.fromCharCode(data[offset]);
        }

        if (data[offset] != null) {
          dataDump += sprintf('%02X', data[offset]);
        }

        if ((offset + 1) % BYTES_PER_GROUP === 0 && !((offset + 1) % BYTES_PER_LINE === 0)) {
          dataDump += ' ';
        }

        if ((offset + 1) % BYTES_PER_LINE === 0) {
          dataDump += '  ' + chars;
          chars = '';
          if (offset < data.length - 1) {
            dataDump += NL;
          }
        }
      }

      if (chars.length) {
        dataDump += '  ' + chars;
      }

      return dataDump;
    }
  }, {
    key: 'toString',
    value: function toString(indent) {
      indent || (indent = '');
      return this.headerToString(indent) + '\n' + this.dataToString(indent + indent);
    }
  }, {
    key: 'payloadString',
    value: function payloadString() {
      return '';
    }
  }]);
  return Packet;
}();

module.exports.Packet = Packet;

module.exports.isPacketComplete = isPacketComplete;
function isPacketComplete(potentialPacketBuffer) {
  if (potentialPacketBuffer.length < HEADER_LENGTH) {
    return false;
  } else {
    return potentialPacketBuffer.length >= potentialPacketBuffer.readUInt16BE(OFFSET.Length);
  }
}

module.exports.packetLength = packetLength;
function packetLength(potentialPacketBuffer) {
  return potentialPacketBuffer.readUInt16BE(OFFSET.Length);
}

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports.ReadableTrackingBuffer = __webpack_require__(507);
module.exports.WritableTrackingBuffer = __webpack_require__(94);

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bigint = __webpack_require__(139);

var SHIFT_LEFT_32 = (1 << 16) * (1 << 16);
var SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32;
var UNKNOWN_PLP_LEN = new Buffer([0xfe, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
var ZERO_LENGTH_BUFFER = new Buffer(0);

/*
  A Buffer-like class that tracks position.

  As values are written, the position advances by the size of the written data.
  When writing, automatically allocates new buffers if there's not enough space.
 */
module.exports = function () {
  function WritableTrackingBuffer(initialSize, encoding, doubleSizeGrowth) {
    (0, _classCallCheck3.default)(this, WritableTrackingBuffer);

    this.initialSize = initialSize;
    this.encoding = encoding;
    this.doubleSizeGrowth = doubleSizeGrowth;
    this.doubleSizeGrowth || (this.doubleSizeGrowth = false);
    this.encoding || (this.encoding = 'ucs2');
    this.buffer = new Buffer(this.initialSize);
    this.position = 0;
  }

  (0, _createClass3.default)(WritableTrackingBuffer, [{
    key: 'copyFrom',
    value: function copyFrom(buffer) {
      var length = buffer.length;
      this.makeRoomFor(length);
      buffer.copy(this.buffer, this.position);
      return this.position += length;
    }
  }, {
    key: 'makeRoomFor',
    value: function makeRoomFor(requiredLength) {
      if (this.buffer.length - this.position < requiredLength) {
        if (this.doubleSizeGrowth) {
          var size = Math.max(128, this.buffer.length * 2);
          while (size < requiredLength) {
            size *= 2;
          }
          return this.newBuffer(size);
        } else {
          return this.newBuffer(requiredLength);
        }
      }
    }
  }, {
    key: 'newBuffer',
    value: function newBuffer(size) {
      var buffer = this.buffer.slice(0, this.position);
      if (this.compositeBuffer) {
        this.compositeBuffer = Buffer.concat([this.compositeBuffer, buffer]);
      } else {
        this.compositeBuffer = buffer;
      }
      this.buffer = size === 0 ? ZERO_LENGTH_BUFFER : new Buffer(size);
      return this.position = 0;
    }
  }, {
    key: 'writeUInt8',
    value: function writeUInt8(value) {
      var length = 1;
      this.makeRoomFor(length);
      this.buffer.writeUInt8(value, this.position);
      return this.position += length;
    }
  }, {
    key: 'writeUInt16LE',
    value: function writeUInt16LE(value) {
      var length = 2;
      this.makeRoomFor(length);
      this.buffer.writeUInt16LE(value, this.position);
      return this.position += length;
    }
  }, {
    key: 'writeUShort',
    value: function writeUShort(value) {
      return this.writeUInt16LE(value);
    }
  }, {
    key: 'writeUInt16BE',
    value: function writeUInt16BE(value) {
      var length = 2;
      this.makeRoomFor(length);
      this.buffer.writeUInt16BE(value, this.position);
      return this.position += length;
    }
  }, {
    key: 'writeUInt24LE',
    value: function writeUInt24LE(value) {
      var length = 3;
      this.makeRoomFor(length);
      this.buffer[this.position + 2] = value >>> 16 & 0xff;
      this.buffer[this.position + 1] = value >>> 8 & 0xff;
      this.buffer[this.position] = value & 0xff;
      return this.position += length;
    }
  }, {
    key: 'writeUInt32LE',
    value: function writeUInt32LE(value) {
      var length = 4;
      this.makeRoomFor(length);
      this.buffer.writeUInt32LE(value, this.position);
      return this.position += length;
    }
  }, {
    key: 'writeInt64LE',
    value: function writeInt64LE(value) {
      var buf = bigint.numberToInt64LE(value);
      return this.copyFrom(buf);
    }
  }, {
    key: 'writeUInt32BE',
    value: function writeUInt32BE(value) {
      var length = 4;
      this.makeRoomFor(length);
      this.buffer.writeUInt32BE(value, this.position);
      return this.position += length;
    }
  }, {
    key: 'writeUInt40LE',
    value: function writeUInt40LE(value) {
      // inspired by https://github.com/dpw/node-buffer-more-ints
      this.writeInt32LE(value & -1);
      return this.writeUInt8(Math.floor(value * SHIFT_RIGHT_32));
    }
  }, {
    key: 'writeUInt64LE',
    value: function writeUInt64LE(value) {
      this.writeInt32LE(value & -1);
      return this.writeUInt32LE(Math.floor(value * SHIFT_RIGHT_32));
    }
  }, {
    key: 'writeInt8',
    value: function writeInt8(value) {
      var length = 1;
      this.makeRoomFor(length);
      this.buffer.writeInt8(value, this.position);
      return this.position += length;
    }
  }, {
    key: 'writeInt16LE',
    value: function writeInt16LE(value) {
      var length = 2;
      this.makeRoomFor(length);
      this.buffer.writeInt16LE(value, this.position);
      return this.position += length;
    }
  }, {
    key: 'writeInt16BE',
    value: function writeInt16BE(value) {
      var length = 2;
      this.makeRoomFor(length);
      this.buffer.writeInt16BE(value, this.position);
      return this.position += length;
    }
  }, {
    key: 'writeInt32LE',
    value: function writeInt32LE(value) {
      var length = 4;
      this.makeRoomFor(length);
      this.buffer.writeInt32LE(value, this.position);
      return this.position += length;
    }
  }, {
    key: 'writeInt32BE',
    value: function writeInt32BE(value) {
      var length = 4;
      this.makeRoomFor(length);
      this.buffer.writeInt32BE(value, this.position);
      return this.position += length;
    }
  }, {
    key: 'writeFloatLE',
    value: function writeFloatLE(value) {
      var length = 4;
      this.makeRoomFor(length);
      this.buffer.writeFloatLE(value, this.position);
      return this.position += length;
    }
  }, {
    key: 'writeDoubleLE',
    value: function writeDoubleLE(value) {
      var length = 8;
      this.makeRoomFor(length);
      this.buffer.writeDoubleLE(value, this.position);
      return this.position += length;
    }
  }, {
    key: 'writeString',
    value: function writeString(value, encoding) {
      encoding || (encoding = this.encoding);

      var length = Buffer.byteLength(value, encoding);
      this.makeRoomFor(length);

      var bytesWritten = this.buffer.write(value, this.position, encoding);
      this.position += length;

      return bytesWritten;
    }
  }, {
    key: 'writeBVarchar',
    value: function writeBVarchar(value, encoding) {
      this.writeUInt8(value.length);
      return this.writeString(value, encoding);
    }
  }, {
    key: 'writeUsVarchar',
    value: function writeUsVarchar(value, encoding) {
      this.writeUInt16LE(value.length);
      return this.writeString(value, encoding);
    }
  }, {
    key: 'writeUsVarbyte',
    value: function writeUsVarbyte(value, encoding) {
      if (encoding == null) {
        encoding = this.encoding;
      }

      var length = void 0;
      if (Buffer.isBuffer(value)) {
        length = value.length;
      } else {
        value = value.toString();
        length = Buffer.byteLength(value, encoding);
      }
      this.writeUInt16LE(length);

      if (Buffer.isBuffer(value)) {
        return this.writeBuffer(value);
      } else {
        this.makeRoomFor(length);
        this.buffer.write(value, this.position, encoding);
        return this.position += length;
      }
    }
  }, {
    key: 'writePLPBody',
    value: function writePLPBody(value, encoding) {
      if (encoding == null) {
        encoding = this.encoding;
      }

      var length = void 0;
      if (Buffer.isBuffer(value)) {
        length = value.length;
      } else {
        value = value.toString();
        length = Buffer.byteLength(value, encoding);
      }

      // Length of all chunks.
      // this.writeUInt64LE(length);
      // unknown seems to work better here - might revisit later.
      this.writeBuffer(UNKNOWN_PLP_LEN);

      // In the UNKNOWN_PLP_LEN case, the data is represented as a series of zero or more chunks.
      if (length > 0) {
        // One chunk.
        this.writeUInt32LE(length);
        if (Buffer.isBuffer(value)) {
          this.writeBuffer(value);
        } else {
          this.makeRoomFor(length);
          this.buffer.write(value, this.position, encoding);
          this.position += length;
        }
      }

      // PLP_TERMINATOR (no more chunks).
      return this.writeUInt32LE(0);
    }
  }, {
    key: 'writeBuffer',
    value: function writeBuffer(value) {
      var length = value.length;
      this.makeRoomFor(length);
      value.copy(this.buffer, this.position);
      return this.position += length;
    }
  }, {
    key: 'writeMoney',
    value: function writeMoney(value) {
      this.writeInt32LE(Math.floor(value * SHIFT_RIGHT_32));
      return this.writeInt32LE(value & -1);
    }
  }, {
    key: 'data',
    get: function get() {
      this.newBuffer(0);
      return this.compositeBuffer;
    }
  }]);
  return WritableTrackingBuffer;
}();

/***/ }),
/* 95 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 96 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(64)
  , dPs         = __webpack_require__(236)
  , enumBugKeys = __webpack_require__(96)
  , IE_PROTO    = __webpack_require__(102)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(148)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(229).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 100 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(43).f
  , has = __webpack_require__(42)
  , TAG = __webpack_require__(56)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(103)('keys')
  , uid    = __webpack_require__(79);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(33)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 104 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(66);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(33)
  , core           = __webpack_require__(32)
  , LIBRARY        = __webpack_require__(98)
  , wksExt         = __webpack_require__(107)
  , defineProperty = __webpack_require__(43).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(56);

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(11)
  , toIndex  = __webpack_require__(52)
  , toLength = __webpack_require__(10);
module.exports = function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , aLen   = arguments.length
    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7)
  , createDesc      = __webpack_require__(35);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 111 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var isObject       = __webpack_require__(4)
  , setPrototypeOf = __webpack_require__(122).set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(59)
  , ITERATOR   = __webpack_require__(5)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(21);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(47)
  , descriptor     = __webpack_require__(35)
  , setToStringTag = __webpack_require__(60)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(15)(IteratorPrototype, __webpack_require__(5)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(46)
  , $export        = __webpack_require__(0)
  , redefine       = __webpack_require__(16)
  , hide           = __webpack_require__(15)
  , has            = __webpack_require__(13)
  , Iterators      = __webpack_require__(59)
  , $iterCreate    = __webpack_require__(117)
  , setToStringTag = __webpack_require__(60)
  , getPrototypeOf = __webpack_require__(20)
  , ITERATOR       = __webpack_require__(5)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 119 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

/***/ }),
/* 120 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , macrotask = __webpack_require__(129).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(21)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4)
  , anObject = __webpack_require__(1);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(28)(Function.call, __webpack_require__(19).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(89)('keys')
  , uid    = __webpack_require__(53);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(1)
  , aFunction = __webpack_require__(14)
  , SPECIES   = __webpack_require__(5)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(36)
  , defined   = __webpack_require__(22);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(85)
  , defined  = __webpack_require__(22);

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(36)
  , defined   = __webpack_require__(22);

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};

/***/ }),
/* 128 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(28)
  , invoke             = __webpack_require__(84)
  , html               = __webpack_require__(113)
  , cel                = __webpack_require__(110)
  , global             = __webpack_require__(2)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(21)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global         = __webpack_require__(2)
  , DESCRIPTORS    = __webpack_require__(6)
  , LIBRARY        = __webpack_require__(46)
  , $typed         = __webpack_require__(90)
  , hide           = __webpack_require__(15)
  , redefineAll    = __webpack_require__(50)
  , fails          = __webpack_require__(3)
  , anInstance     = __webpack_require__(45)
  , toInteger      = __webpack_require__(36)
  , toLength       = __webpack_require__(10)
  , gOPN           = __webpack_require__(48).f
  , dP             = __webpack_require__(7).f
  , arrayFill      = __webpack_require__(108)
  , setToStringTag = __webpack_require__(60)
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value)
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    };
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(2)
  , core           = __webpack_require__(27)
  , LIBRARY        = __webpack_require__(46)
  , wksExt         = __webpack_require__(181)
  , defineProperty = __webpack_require__(7).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(67)
  , ITERATOR  = __webpack_require__(5)('iterator')
  , Iterators = __webpack_require__(59);
module.exports = __webpack_require__(27).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(57)
  , step             = __webpack_require__(169)
  , Iterators        = __webpack_require__(59)
  , toIObject        = __webpack_require__(18);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(118)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 134 */
/***/ (function(module, exports) {

module.exports = [
	[
		"0",
		"\u0000",
		127,
		"€"
	],
	[
		"8140",
		"丂丄丅丆丏丒丗丟丠両丣並丩丮丯丱丳丵丷丼乀乁乂乄乆乊乑乕乗乚乛乢乣乤乥乧乨乪",
		5,
		"乲乴",
		9,
		"乿",
		6,
		"亇亊"
	],
	[
		"8180",
		"亐亖亗亙亜亝亞亣亪亯亰亱亴亶亷亸亹亼亽亾仈仌仏仐仒仚仛仜仠仢仦仧仩仭仮仯仱仴仸仹仺仼仾伀伂",
		6,
		"伋伌伒",
		4,
		"伜伝伡伣伨伩伬伭伮伱伳伵伷伹伻伾",
		4,
		"佄佅佇",
		5,
		"佒佔佖佡佢佦佨佪佫佭佮佱佲併佷佸佹佺佽侀侁侂侅來侇侊侌侎侐侒侓侕侖侘侙侚侜侞侟価侢"
	],
	[
		"8240",
		"侤侫侭侰",
		4,
		"侶",
		8,
		"俀俁係俆俇俈俉俋俌俍俒",
		4,
		"俙俛俠俢俤俥俧俫俬俰俲俴俵俶俷俹俻俼俽俿",
		11
	],
	[
		"8280",
		"個倎倐們倓倕倖倗倛倝倞倠倢倣値倧倫倯",
		10,
		"倻倽倿偀偁偂偄偅偆偉偊偋偍偐",
		4,
		"偖偗偘偙偛偝",
		7,
		"偦",
		5,
		"偭",
		8,
		"偸偹偺偼偽傁傂傃傄傆傇傉傊傋傌傎",
		20,
		"傤傦傪傫傭",
		4,
		"傳",
		6,
		"傼"
	],
	[
		"8340",
		"傽",
		17,
		"僐",
		5,
		"僗僘僙僛",
		10,
		"僨僩僪僫僯僰僱僲僴僶",
		4,
		"僼",
		9,
		"儈"
	],
	[
		"8380",
		"儉儊儌",
		5,
		"儓",
		13,
		"儢",
		28,
		"兂兇兊兌兎兏児兒兓兗兘兙兛兝",
		4,
		"兣兤兦內兩兪兯兲兺兾兿冃冄円冇冊冋冎冏冐冑冓冔冘冚冝冞冟冡冣冦",
		4,
		"冭冮冴冸冹冺冾冿凁凂凃凅凈凊凍凎凐凒",
		5
	],
	[
		"8440",
		"凘凙凚凜凞凟凢凣凥",
		5,
		"凬凮凱凲凴凷凾刄刅刉刋刌刏刐刓刔刕刜刞刟刡刢刣別刦刧刪刬刯刱刲刴刵刼刾剄",
		5,
		"剋剎剏剒剓剕剗剘"
	],
	[
		"8480",
		"剙剚剛剝剟剠剢剣剤剦剨剫剬剭剮剰剱剳",
		9,
		"剾劀劃",
		4,
		"劉",
		6,
		"劑劒劔",
		6,
		"劜劤劥劦劧劮劯劰労",
		9,
		"勀勁勂勄勅勆勈勊勌勍勎勏勑勓勔動勗務",
		5,
		"勠勡勢勣勥",
		10,
		"勱",
		7,
		"勻勼勽匁匂匃匄匇匉匊匋匌匎"
	],
	[
		"8540",
		"匑匒匓匔匘匛匜匞匟匢匤匥匧匨匩匫匬匭匯",
		9,
		"匼匽區卂卄卆卋卌卍卐協単卙卛卝卥卨卪卬卭卲卶卹卻卼卽卾厀厁厃厇厈厊厎厏"
	],
	[
		"8580",
		"厐",
		4,
		"厖厗厙厛厜厞厠厡厤厧厪厫厬厭厯",
		6,
		"厷厸厹厺厼厽厾叀參",
		4,
		"収叏叐叒叓叕叚叜叝叞叡叢叧叴叺叾叿吀吂吅吇吋吔吘吙吚吜吢吤吥吪吰吳吶吷吺吽吿呁呂呄呅呇呉呌呍呎呏呑呚呝",
		4,
		"呣呥呧呩",
		7,
		"呴呹呺呾呿咁咃咅咇咈咉咊咍咑咓咗咘咜咞咟咠咡"
	],
	[
		"8640",
		"咢咥咮咰咲咵咶咷咹咺咼咾哃哅哊哋哖哘哛哠",
		4,
		"哫哬哯哰哱哴",
		5,
		"哻哾唀唂唃唄唅唈唊",
		4,
		"唒唓唕",
		5,
		"唜唝唞唟唡唥唦"
	],
	[
		"8680",
		"唨唩唫唭唲唴唵唶唸唹唺唻唽啀啂啅啇啈啋",
		4,
		"啑啒啓啔啗",
		4,
		"啝啞啟啠啢啣啨啩啫啯",
		5,
		"啹啺啽啿喅喆喌喍喎喐喒喓喕喖喗喚喛喞喠",
		6,
		"喨",
		8,
		"喲喴営喸喺喼喿",
		4,
		"嗆嗇嗈嗊嗋嗎嗏嗐嗕嗗",
		4,
		"嗞嗠嗢嗧嗩嗭嗮嗰嗱嗴嗶嗸",
		4,
		"嗿嘂嘃嘄嘅"
	],
	[
		"8740",
		"嘆嘇嘊嘋嘍嘐",
		7,
		"嘙嘚嘜嘝嘠嘡嘢嘥嘦嘨嘩嘪嘫嘮嘯嘰嘳嘵嘷嘸嘺嘼嘽嘾噀",
		11,
		"噏",
		4,
		"噕噖噚噛噝",
		4
	],
	[
		"8780",
		"噣噥噦噧噭噮噯噰噲噳噴噵噷噸噹噺噽",
		7,
		"嚇",
		6,
		"嚐嚑嚒嚔",
		14,
		"嚤",
		10,
		"嚰",
		6,
		"嚸嚹嚺嚻嚽",
		12,
		"囋",
		8,
		"囕囖囘囙囜団囥",
		5,
		"囬囮囯囲図囶囷囸囻囼圀圁圂圅圇國",
		6
	],
	[
		"8840",
		"園",
		9,
		"圝圞圠圡圢圤圥圦圧圫圱圲圴",
		4,
		"圼圽圿坁坃坄坅坆坈坉坋坒",
		4,
		"坘坙坢坣坥坧坬坮坰坱坲坴坵坸坹坺坽坾坿垀"
	],
	[
		"8880",
		"垁垇垈垉垊垍",
		4,
		"垔",
		6,
		"垜垝垞垟垥垨垪垬垯垰垱垳垵垶垷垹",
		8,
		"埄",
		6,
		"埌埍埐埑埓埖埗埛埜埞埡埢埣埥",
		7,
		"埮埰埱埲埳埵埶執埻埼埾埿堁堃堄堅堈堉堊堌堎堏堐堒堓堔堖堗堘堚堛堜堝堟堢堣堥",
		4,
		"堫",
		4,
		"報堲堳場堶",
		7
	],
	[
		"8940",
		"堾",
		5,
		"塅",
		6,
		"塎塏塐塒塓塕塖塗塙",
		4,
		"塟",
		5,
		"塦",
		4,
		"塭",
		16,
		"塿墂墄墆墇墈墊墋墌"
	],
	[
		"8980",
		"墍",
		4,
		"墔",
		4,
		"墛墜墝墠",
		7,
		"墪",
		17,
		"墽墾墿壀壂壃壄壆",
		10,
		"壒壓壔壖",
		13,
		"壥",
		5,
		"壭壯壱売壴壵壷壸壺",
		7,
		"夃夅夆夈",
		4,
		"夎夐夑夒夓夗夘夛夝夞夠夡夢夣夦夨夬夰夲夳夵夶夻"
	],
	[
		"8a40",
		"夽夾夿奀奃奅奆奊奌奍奐奒奓奙奛",
		4,
		"奡奣奤奦",
		12,
		"奵奷奺奻奼奾奿妀妅妉妋妌妎妏妐妑妔妕妘妚妛妜妝妟妠妡妢妦"
	],
	[
		"8a80",
		"妧妬妭妰妱妳",
		5,
		"妺妼妽妿",
		6,
		"姇姈姉姌姍姎姏姕姖姙姛姞",
		4,
		"姤姦姧姩姪姫姭",
		11,
		"姺姼姽姾娀娂娊娋娍娎娏娐娒娔娕娖娗娙娚娛娝娞娡娢娤娦娧娨娪",
		6,
		"娳娵娷",
		4,
		"娽娾娿婁",
		4,
		"婇婈婋",
		9,
		"婖婗婘婙婛",
		5
	],
	[
		"8b40",
		"婡婣婤婥婦婨婩婫",
		8,
		"婸婹婻婼婽婾媀",
		17,
		"媓",
		6,
		"媜",
		13,
		"媫媬"
	],
	[
		"8b80",
		"媭",
		4,
		"媴媶媷媹",
		4,
		"媿嫀嫃",
		5,
		"嫊嫋嫍",
		4,
		"嫓嫕嫗嫙嫚嫛嫝嫞嫟嫢嫤嫥嫧嫨嫪嫬",
		4,
		"嫲",
		22,
		"嬊",
		11,
		"嬘",
		25,
		"嬳嬵嬶嬸",
		7,
		"孁",
		6
	],
	[
		"8c40",
		"孈",
		7,
		"孒孖孞孠孡孧孨孫孭孮孯孲孴孶孷學孹孻孼孾孿宂宆宊宍宎宐宑宒宔宖実宧宨宩宬宭宮宯宱宲宷宺宻宼寀寁寃寈寉寊寋寍寎寏"
	],
	[
		"8c80",
		"寑寔",
		8,
		"寠寢寣實寧審",
		4,
		"寯寱",
		6,
		"寽対尀専尃尅將專尋尌對導尐尒尓尗尙尛尞尟尠尡尣尦尨尩尪尫尭尮尯尰尲尳尵尶尷屃屄屆屇屌屍屒屓屔屖屗屘屚屛屜屝屟屢層屧",
		6,
		"屰屲",
		6,
		"屻屼屽屾岀岃",
		4,
		"岉岊岋岎岏岒岓岕岝",
		4,
		"岤",
		4
	],
	[
		"8d40",
		"岪岮岯岰岲岴岶岹岺岻岼岾峀峂峃峅",
		5,
		"峌",
		5,
		"峓",
		5,
		"峚",
		6,
		"峢峣峧峩峫峬峮峯峱",
		9,
		"峼",
		4
	],
	[
		"8d80",
		"崁崄崅崈",
		5,
		"崏",
		4,
		"崕崗崘崙崚崜崝崟",
		4,
		"崥崨崪崫崬崯",
		4,
		"崵",
		7,
		"崿",
		7,
		"嵈嵉嵍",
		10,
		"嵙嵚嵜嵞",
		10,
		"嵪嵭嵮嵰嵱嵲嵳嵵",
		12,
		"嶃",
		21,
		"嶚嶛嶜嶞嶟嶠"
	],
	[
		"8e40",
		"嶡",
		21,
		"嶸",
		12,
		"巆",
		6,
		"巎",
		12,
		"巜巟巠巣巤巪巬巭"
	],
	[
		"8e80",
		"巰巵巶巸",
		4,
		"巿帀帄帇帉帊帋帍帎帒帓帗帞",
		7,
		"帨",
		4,
		"帯帰帲",
		4,
		"帹帺帾帿幀幁幃幆",
		5,
		"幍",
		6,
		"幖",
		4,
		"幜幝幟幠幣",
		14,
		"幵幷幹幾庁庂広庅庈庉庌庍庎庒庘庛庝庡庢庣庤庨",
		4,
		"庮",
		4,
		"庴庺庻庼庽庿",
		6
	],
	[
		"8f40",
		"廆廇廈廋",
		5,
		"廔廕廗廘廙廚廜",
		11,
		"廩廫",
		8,
		"廵廸廹廻廼廽弅弆弇弉弌弍弎弐弒弔弖弙弚弜弝弞弡弢弣弤"
	],
	[
		"8f80",
		"弨弫弬弮弰弲",
		6,
		"弻弽弾弿彁",
		14,
		"彑彔彙彚彛彜彞彟彠彣彥彧彨彫彮彯彲彴彵彶彸彺彽彾彿徃徆徍徎徏徑従徔徖徚徛徝從徟徠徢",
		5,
		"復徫徬徯",
		5,
		"徶徸徹徺徻徾",
		4,
		"忇忈忊忋忎忓忔忕忚忛応忞忟忢忣忥忦忨忩忬忯忰忲忳忴忶忷忹忺忼怇"
	],
	[
		"9040",
		"怈怉怋怌怐怑怓怗怘怚怞怟怢怣怤怬怭怮怰",
		4,
		"怶",
		4,
		"怽怾恀恄",
		6,
		"恌恎恏恑恓恔恖恗恘恛恜恞恟恠恡恥恦恮恱恲恴恵恷恾悀"
	],
	[
		"9080",
		"悁悂悅悆悇悈悊悋悎悏悐悑悓悕悗悘悙悜悞悡悢悤悥悧悩悪悮悰悳悵悶悷悹悺悽",
		7,
		"惇惈惉惌",
		4,
		"惒惓惔惖惗惙惛惞惡",
		4,
		"惪惱惲惵惷惸惻",
		4,
		"愂愃愄愅愇愊愋愌愐",
		4,
		"愖愗愘愙愛愜愝愞愡愢愥愨愩愪愬",
		18,
		"慀",
		6
	],
	[
		"9140",
		"慇慉態慍慏慐慒慓慔慖",
		6,
		"慞慟慠慡慣慤慥慦慩",
		6,
		"慱慲慳慴慶慸",
		18,
		"憌憍憏",
		4,
		"憕"
	],
	[
		"9180",
		"憖",
		6,
		"憞",
		8,
		"憪憫憭",
		9,
		"憸",
		5,
		"憿懀懁懃",
		4,
		"應懌",
		4,
		"懓懕",
		16,
		"懧",
		13,
		"懶",
		8,
		"戀",
		5,
		"戇戉戓戔戙戜戝戞戠戣戦戧戨戩戫戭戯戰戱戲戵戶戸",
		4,
		"扂扄扅扆扊"
	],
	[
		"9240",
		"扏扐払扖扗扙扚扜",
		6,
		"扤扥扨扱扲扴扵扷扸扺扻扽抁抂抃抅抆抇抈抋",
		5,
		"抔抙抜抝択抣抦抧抩抪抭抮抯抰抲抳抴抶抷抸抺抾拀拁"
	],
	[
		"9280",
		"拃拋拏拑拕拝拞拠拡拤拪拫拰拲拵拸拹拺拻挀挃挄挅挆挊挋挌挍挏挐挒挓挔挕挗挘挙挜挦挧挩挬挭挮挰挱挳",
		5,
		"挻挼挾挿捀捁捄捇捈捊捑捒捓捔捖",
		7,
		"捠捤捥捦捨捪捫捬捯捰捲捳捴捵捸捹捼捽捾捿掁掃掄掅掆掋掍掑掓掔掕掗掙",
		6,
		"採掤掦掫掯掱掲掵掶掹掻掽掿揀"
	],
	[
		"9340",
		"揁揂揃揅揇揈揊揋揌揑揓揔揕揗",
		6,
		"揟揢揤",
		4,
		"揫揬揮揯揰揱揳揵揷揹揺揻揼揾搃搄搆",
		4,
		"損搎搑搒搕",
		5,
		"搝搟搢搣搤"
	],
	[
		"9380",
		"搥搧搨搩搫搮",
		5,
		"搵",
		4,
		"搻搼搾摀摂摃摉摋",
		6,
		"摓摕摖摗摙",
		4,
		"摟",
		7,
		"摨摪摫摬摮",
		9,
		"摻",
		6,
		"撃撆撈",
		8,
		"撓撔撗撘撚撛撜撝撟",
		4,
		"撥撦撧撨撪撫撯撱撲撳撴撶撹撻撽撾撿擁擃擄擆",
		6,
		"擏擑擓擔擕擖擙據"
	],
	[
		"9440",
		"擛擜擝擟擠擡擣擥擧",
		24,
		"攁",
		7,
		"攊",
		7,
		"攓",
		4,
		"攙",
		8
	],
	[
		"9480",
		"攢攣攤攦",
		4,
		"攬攭攰攱攲攳攷攺攼攽敀",
		4,
		"敆敇敊敋敍敎敐敒敓敔敗敘敚敜敟敠敡敤敥敧敨敩敪敭敮敯敱敳敵敶數",
		14,
		"斈斉斊斍斎斏斒斔斕斖斘斚斝斞斠斢斣斦斨斪斬斮斱",
		7,
		"斺斻斾斿旀旂旇旈旉旊旍旐旑旓旔旕旘",
		7,
		"旡旣旤旪旫"
	],
	[
		"9540",
		"旲旳旴旵旸旹旻",
		4,
		"昁昄昅昇昈昉昋昍昐昑昒昖昗昘昚昛昜昞昡昢昣昤昦昩昪昫昬昮昰昲昳昷",
		4,
		"昽昿晀時晄",
		6,
		"晍晎晐晑晘"
	],
	[
		"9580",
		"晙晛晜晝晞晠晢晣晥晧晩",
		4,
		"晱晲晳晵晸晹晻晼晽晿暀暁暃暅暆暈暉暊暋暍暎暏暐暒暓暔暕暘",
		4,
		"暞",
		8,
		"暩",
		4,
		"暯",
		4,
		"暵暶暷暸暺暻暼暽暿",
		25,
		"曚曞",
		7,
		"曧曨曪",
		5,
		"曱曵曶書曺曻曽朁朂會"
	],
	[
		"9640",
		"朄朅朆朇朌朎朏朑朒朓朖朘朙朚朜朞朠",
		5,
		"朧朩朮朰朲朳朶朷朸朹朻朼朾朿杁杄杅杇杊杋杍杒杔杕杗",
		4,
		"杝杢杣杤杦杧杫杬杮東杴杶"
	],
	[
		"9680",
		"杸杹杺杻杽枀枂枃枅枆枈枊枌枍枎枏枑枒枓枔枖枙枛枟枠枡枤枦枩枬枮枱枲枴枹",
		7,
		"柂柅",
		9,
		"柕柖柗柛柟柡柣柤柦柧柨柪柫柭柮柲柵",
		7,
		"柾栁栂栃栄栆栍栐栒栔栕栘",
		4,
		"栞栟栠栢",
		6,
		"栫",
		6,
		"栴栵栶栺栻栿桇桋桍桏桒桖",
		5
	],
	[
		"9740",
		"桜桝桞桟桪桬",
		7,
		"桵桸",
		8,
		"梂梄梇",
		7,
		"梐梑梒梔梕梖梘",
		9,
		"梣梤梥梩梪梫梬梮梱梲梴梶梷梸"
	],
	[
		"9780",
		"梹",
		6,
		"棁棃",
		5,
		"棊棌棎棏棐棑棓棔棖棗棙棛",
		4,
		"棡棢棤",
		9,
		"棯棲棳棴棶棷棸棻棽棾棿椀椂椃椄椆",
		4,
		"椌椏椑椓",
		11,
		"椡椢椣椥",
		7,
		"椮椯椱椲椳椵椶椷椸椺椻椼椾楀楁楃",
		16,
		"楕楖楘楙楛楜楟"
	],
	[
		"9840",
		"楡楢楤楥楧楨楩楪楬業楯楰楲",
		4,
		"楺楻楽楾楿榁榃榅榊榋榌榎",
		5,
		"榖榗榙榚榝",
		9,
		"榩榪榬榮榯榰榲榳榵榶榸榹榺榼榽"
	],
	[
		"9880",
		"榾榿槀槂",
		7,
		"構槍槏槑槒槓槕",
		5,
		"槜槝槞槡",
		11,
		"槮槯槰槱槳",
		9,
		"槾樀",
		9,
		"樋",
		11,
		"標",
		5,
		"樠樢",
		5,
		"権樫樬樭樮樰樲樳樴樶",
		6,
		"樿",
		4,
		"橅橆橈",
		7,
		"橑",
		6,
		"橚"
	],
	[
		"9940",
		"橜",
		4,
		"橢橣橤橦",
		10,
		"橲",
		6,
		"橺橻橽橾橿檁檂檃檅",
		8,
		"檏檒",
		4,
		"檘",
		7,
		"檡",
		5
	],
	[
		"9980",
		"檧檨檪檭",
		114,
		"欥欦欨",
		6
	],
	[
		"9a40",
		"欯欰欱欳欴欵欶欸欻欼欽欿歀歁歂歄歅歈歊歋歍",
		11,
		"歚",
		7,
		"歨歩歫",
		13,
		"歺歽歾歿殀殅殈"
	],
	[
		"9a80",
		"殌殎殏殐殑殔殕殗殘殙殜",
		4,
		"殢",
		7,
		"殫",
		7,
		"殶殸",
		6,
		"毀毃毄毆",
		4,
		"毌毎毐毑毘毚毜",
		4,
		"毢",
		7,
		"毬毭毮毰毱毲毴毶毷毸毺毻毼毾",
		6,
		"氈",
		4,
		"氎氒気氜氝氞氠氣氥氫氬氭氱氳氶氷氹氺氻氼氾氿汃汄汅汈汋",
		4,
		"汑汒汓汖汘"
	],
	[
		"9b40",
		"汙汚汢汣汥汦汧汫",
		4,
		"汱汳汵汷汸決汻汼汿沀沄沇沊沋沍沎沑沒沕沖沗沘沚沜沝沞沠沢沨沬沯沰沴沵沶沷沺泀況泂泃泆泇泈泋泍泎泏泑泒泘"
	],
	[
		"9b80",
		"泙泚泜泝泟泤泦泧泩泬泭泲泴泹泿洀洂洃洅洆洈洉洊洍洏洐洑洓洔洕洖洘洜洝洟",
		5,
		"洦洨洩洬洭洯洰洴洶洷洸洺洿浀浂浄浉浌浐浕浖浗浘浛浝浟浡浢浤浥浧浨浫浬浭浰浱浲浳浵浶浹浺浻浽",
		4,
		"涃涄涆涇涊涋涍涏涐涒涖",
		4,
		"涜涢涥涬涭涰涱涳涴涶涷涹",
		5,
		"淁淂淃淈淉淊"
	],
	[
		"9c40",
		"淍淎淏淐淒淓淔淕淗淚淛淜淟淢淣淥淧淨淩淪淭淯淰淲淴淵淶淸淺淽",
		7,
		"渆渇済渉渋渏渒渓渕渘渙減渜渞渟渢渦渧渨渪測渮渰渱渳渵"
	],
	[
		"9c80",
		"渶渷渹渻",
		7,
		"湅",
		7,
		"湏湐湑湒湕湗湙湚湜湝湞湠",
		10,
		"湬湭湯",
		14,
		"満溁溂溄溇溈溊",
		4,
		"溑",
		6,
		"溙溚溛溝溞溠溡溣溤溦溨溩溫溬溭溮溰溳溵溸溹溼溾溿滀滃滄滅滆滈滉滊滌滍滎滐滒滖滘滙滛滜滝滣滧滪",
		5
	],
	[
		"9d40",
		"滰滱滲滳滵滶滷滸滺",
		7,
		"漃漄漅漇漈漊",
		4,
		"漐漑漒漖",
		9,
		"漡漢漣漥漦漧漨漬漮漰漲漴漵漷",
		6,
		"漿潀潁潂"
	],
	[
		"9d80",
		"潃潄潅潈潉潊潌潎",
		9,
		"潙潚潛潝潟潠潡潣潤潥潧",
		5,
		"潯潰潱潳潵潶潷潹潻潽",
		6,
		"澅澆澇澊澋澏",
		12,
		"澝澞澟澠澢",
		4,
		"澨",
		10,
		"澴澵澷澸澺",
		5,
		"濁濃",
		5,
		"濊",
		6,
		"濓",
		10,
		"濟濢濣濤濥"
	],
	[
		"9e40",
		"濦",
		7,
		"濰",
		32,
		"瀒",
		7,
		"瀜",
		6,
		"瀤",
		6
	],
	[
		"9e80",
		"瀫",
		9,
		"瀶瀷瀸瀺",
		17,
		"灍灎灐",
		13,
		"灟",
		11,
		"灮灱灲灳灴灷灹灺灻災炁炂炃炄炆炇炈炋炌炍炏炐炑炓炗炘炚炛炞",
		12,
		"炰炲炴炵炶為炾炿烄烅烆烇烉烋",
		12,
		"烚"
	],
	[
		"9f40",
		"烜烝烞烠烡烢烣烥烪烮烰",
		6,
		"烸烺烻烼烾",
		10,
		"焋",
		4,
		"焑焒焔焗焛",
		10,
		"焧",
		7,
		"焲焳焴"
	],
	[
		"9f80",
		"焵焷",
		13,
		"煆煇煈煉煋煍煏",
		12,
		"煝煟",
		4,
		"煥煩",
		4,
		"煯煰煱煴煵煶煷煹煻煼煾",
		5,
		"熅",
		4,
		"熋熌熍熎熐熑熒熓熕熖熗熚",
		4,
		"熡",
		6,
		"熩熪熫熭",
		5,
		"熴熶熷熸熺",
		8,
		"燄",
		9,
		"燏",
		4
	],
	[
		"a040",
		"燖",
		9,
		"燡燢燣燤燦燨",
		5,
		"燯",
		9,
		"燺",
		11,
		"爇",
		19
	],
	[
		"a080",
		"爛爜爞",
		9,
		"爩爫爭爮爯爲爳爴爺爼爾牀",
		6,
		"牉牊牋牎牏牐牑牓牔牕牗牘牚牜牞牠牣牤牥牨牪牫牬牭牰牱牳牴牶牷牸牻牼牽犂犃犅",
		4,
		"犌犎犐犑犓",
		11,
		"犠",
		11,
		"犮犱犲犳犵犺",
		6,
		"狅狆狇狉狊狋狌狏狑狓狔狕狖狘狚狛"
	],
	[
		"a1a1",
		"　、。·ˉˇ¨〃々—～‖…‘’“”〔〕〈",
		7,
		"〖〗【】±×÷∶∧∨∑∏∪∩∈∷√⊥∥∠⌒⊙∫∮≡≌≈∽∝≠≮≯≤≥∞∵∴♂♀°′″℃＄¤￠￡‰§№☆★○●◎◇◆□■△▲※→←↑↓〓"
	],
	[
		"a2a1",
		"ⅰ",
		9
	],
	[
		"a2b1",
		"⒈",
		19,
		"⑴",
		19,
		"①",
		9
	],
	[
		"a2e5",
		"㈠",
		9
	],
	[
		"a2f1",
		"Ⅰ",
		11
	],
	[
		"a3a1",
		"！＂＃￥％",
		88,
		"￣"
	],
	[
		"a4a1",
		"ぁ",
		82
	],
	[
		"a5a1",
		"ァ",
		85
	],
	[
		"a6a1",
		"Α",
		16,
		"Σ",
		6
	],
	[
		"a6c1",
		"α",
		16,
		"σ",
		6
	],
	[
		"a6e0",
		"︵︶︹︺︿﹀︽︾﹁﹂﹃﹄"
	],
	[
		"a6ee",
		"︻︼︷︸︱"
	],
	[
		"a6f4",
		"︳︴"
	],
	[
		"a7a1",
		"А",
		5,
		"ЁЖ",
		25
	],
	[
		"a7d1",
		"а",
		5,
		"ёж",
		25
	],
	[
		"a840",
		"ˊˋ˙–―‥‵℅℉↖↗↘↙∕∟∣≒≦≧⊿═",
		35,
		"▁",
		6
	],
	[
		"a880",
		"█",
		7,
		"▓▔▕▼▽◢◣◤◥☉⊕〒〝〞"
	],
	[
		"a8a1",
		"āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüêɑ"
	],
	[
		"a8bd",
		"ńň"
	],
	[
		"a8c0",
		"ɡ"
	],
	[
		"a8c5",
		"ㄅ",
		36
	],
	[
		"a940",
		"〡",
		8,
		"㊣㎎㎏㎜㎝㎞㎡㏄㏎㏑㏒㏕︰￢￤"
	],
	[
		"a959",
		"℡㈱"
	],
	[
		"a95c",
		"‐"
	],
	[
		"a960",
		"ー゛゜ヽヾ〆ゝゞ﹉",
		9,
		"﹔﹕﹖﹗﹙",
		8
	],
	[
		"a980",
		"﹢",
		4,
		"﹨﹩﹪﹫"
	],
	[
		"a996",
		"〇"
	],
	[
		"a9a4",
		"─",
		75
	],
	[
		"aa40",
		"狜狝狟狢",
		5,
		"狪狫狵狶狹狽狾狿猀猂猄",
		5,
		"猋猌猍猏猐猑猒猔猘猙猚猟猠猣猤猦猧猨猭猯猰猲猳猵猶猺猻猼猽獀",
		8
	],
	[
		"aa80",
		"獉獊獋獌獎獏獑獓獔獕獖獘",
		7,
		"獡",
		10,
		"獮獰獱"
	],
	[
		"ab40",
		"獲",
		11,
		"獿",
		4,
		"玅玆玈玊玌玍玏玐玒玓玔玕玗玘玙玚玜玝玞玠玡玣",
		5,
		"玪玬玭玱玴玵玶玸玹玼玽玾玿珁珃",
		4
	],
	[
		"ab80",
		"珋珌珎珒",
		6,
		"珚珛珜珝珟珡珢珣珤珦珨珪珫珬珮珯珰珱珳",
		4
	],
	[
		"ac40",
		"珸",
		10,
		"琄琇琈琋琌琍琎琑",
		8,
		"琜",
		5,
		"琣琤琧琩琫琭琯琱琲琷",
		4,
		"琽琾琿瑀瑂",
		11
	],
	[
		"ac80",
		"瑎",
		6,
		"瑖瑘瑝瑠",
		12,
		"瑮瑯瑱",
		4,
		"瑸瑹瑺"
	],
	[
		"ad40",
		"瑻瑼瑽瑿璂璄璅璆璈璉璊璌璍璏璑",
		10,
		"璝璟",
		7,
		"璪",
		15,
		"璻",
		12
	],
	[
		"ad80",
		"瓈",
		9,
		"瓓",
		8,
		"瓝瓟瓡瓥瓧",
		6,
		"瓰瓱瓲"
	],
	[
		"ae40",
		"瓳瓵瓸",
		6,
		"甀甁甂甃甅",
		7,
		"甎甐甒甔甕甖甗甛甝甞甠",
		4,
		"甦甧甪甮甴甶甹甼甽甿畁畂畃畄畆畇畉畊畍畐畑畒畓畕畖畗畘"
	],
	[
		"ae80",
		"畝",
		7,
		"畧畨畩畫",
		6,
		"畳畵當畷畺",
		4,
		"疀疁疂疄疅疇"
	],
	[
		"af40",
		"疈疉疊疌疍疎疐疓疕疘疛疜疞疢疦",
		4,
		"疭疶疷疺疻疿痀痁痆痋痌痎痏痐痑痓痗痙痚痜痝痟痠痡痥痩痬痭痮痯痲痳痵痶痷痸痺痻痽痾瘂瘄瘆瘇"
	],
	[
		"af80",
		"瘈瘉瘋瘍瘎瘏瘑瘒瘓瘔瘖瘚瘜瘝瘞瘡瘣瘧瘨瘬瘮瘯瘱瘲瘶瘷瘹瘺瘻瘽癁療癄"
	],
	[
		"b040",
		"癅",
		6,
		"癎",
		5,
		"癕癗",
		4,
		"癝癟癠癡癢癤",
		6,
		"癬癭癮癰",
		7,
		"癹発發癿皀皁皃皅皉皊皌皍皏皐皒皔皕皗皘皚皛"
	],
	[
		"b080",
		"皜",
		7,
		"皥",
		8,
		"皯皰皳皵",
		9,
		"盀盁盃啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥"
	],
	[
		"b140",
		"盄盇盉盋盌盓盕盙盚盜盝盞盠",
		4,
		"盦",
		7,
		"盰盳盵盶盷盺盻盽盿眀眂眃眅眆眊県眎",
		10,
		"眛眜眝眞眡眣眤眥眧眪眫"
	],
	[
		"b180",
		"眬眮眰",
		4,
		"眹眻眽眾眿睂睄睅睆睈",
		7,
		"睒",
		7,
		"睜薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳"
	],
	[
		"b240",
		"睝睞睟睠睤睧睩睪睭",
		11,
		"睺睻睼瞁瞂瞃瞆",
		5,
		"瞏瞐瞓",
		11,
		"瞡瞣瞤瞦瞨瞫瞭瞮瞯瞱瞲瞴瞶",
		4
	],
	[
		"b280",
		"瞼瞾矀",
		12,
		"矎",
		8,
		"矘矙矚矝",
		4,
		"矤病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖"
	],
	[
		"b340",
		"矦矨矪矯矰矱矲矴矵矷矹矺矻矼砃",
		5,
		"砊砋砎砏砐砓砕砙砛砞砠砡砢砤砨砪砫砮砯砱砲砳砵砶砽砿硁硂硃硄硆硈硉硊硋硍硏硑硓硔硘硙硚"
	],
	[
		"b380",
		"硛硜硞",
		11,
		"硯",
		7,
		"硸硹硺硻硽",
		6,
		"场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚"
	],
	[
		"b440",
		"碄碅碆碈碊碋碏碐碒碔碕碖碙碝碞碠碢碤碦碨",
		7,
		"碵碶碷碸確碻碼碽碿磀磂磃磄磆磇磈磌磍磎磏磑磒磓磖磗磘磚",
		9
	],
	[
		"b480",
		"磤磥磦磧磩磪磫磭",
		4,
		"磳磵磶磸磹磻",
		5,
		"礂礃礄礆",
		6,
		"础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮"
	],
	[
		"b540",
		"礍",
		5,
		"礔",
		9,
		"礟",
		4,
		"礥",
		14,
		"礵",
		4,
		"礽礿祂祃祄祅祇祊",
		8,
		"祔祕祘祙祡祣"
	],
	[
		"b580",
		"祤祦祩祪祫祬祮祰",
		6,
		"祹祻",
		4,
		"禂禃禆禇禈禉禋禌禍禎禐禑禒怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠"
	],
	[
		"b640",
		"禓",
		6,
		"禛",
		11,
		"禨",
		10,
		"禴",
		4,
		"禼禿秂秄秅秇秈秊秌秎秏秐秓秔秖秗秙",
		5,
		"秠秡秢秥秨秪"
	],
	[
		"b680",
		"秬秮秱",
		6,
		"秹秺秼秾秿稁稄稅稇稈稉稊稌稏",
		4,
		"稕稖稘稙稛稜丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二"
	],
	[
		"b740",
		"稝稟稡稢稤",
		14,
		"稴稵稶稸稺稾穀",
		5,
		"穇",
		9,
		"穒",
		4,
		"穘",
		16
	],
	[
		"b780",
		"穩",
		6,
		"穱穲穳穵穻穼穽穾窂窅窇窉窊窋窌窎窏窐窓窔窙窚窛窞窡窢贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服"
	],
	[
		"b840",
		"窣窤窧窩窪窫窮",
		4,
		"窴",
		10,
		"竀",
		10,
		"竌",
		9,
		"竗竘竚竛竜竝竡竢竤竧",
		5,
		"竮竰竱竲竳"
	],
	[
		"b880",
		"竴",
		4,
		"竻竼竾笀笁笂笅笇笉笌笍笎笐笒笓笖笗笘笚笜笝笟笡笢笣笧笩笭浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹"
	],
	[
		"b940",
		"笯笰笲笴笵笶笷笹笻笽笿",
		5,
		"筆筈筊筍筎筓筕筗筙筜筞筟筡筣",
		10,
		"筯筰筳筴筶筸筺筼筽筿箁箂箃箄箆",
		6,
		"箎箏"
	],
	[
		"b980",
		"箑箒箓箖箘箙箚箛箞箟箠箣箤箥箮箯箰箲箳箵箶箷箹",
		7,
		"篂篃範埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈"
	],
	[
		"ba40",
		"篅篈築篊篋篍篎篏篐篒篔",
		4,
		"篛篜篞篟篠篢篣篤篧篨篩篫篬篭篯篰篲",
		4,
		"篸篹篺篻篽篿",
		7,
		"簈簉簊簍簎簐",
		5,
		"簗簘簙"
	],
	[
		"ba80",
		"簚",
		4,
		"簠",
		5,
		"簨簩簫",
		12,
		"簹",
		5,
		"籂骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖"
	],
	[
		"bb40",
		"籃",
		9,
		"籎",
		36,
		"籵",
		5,
		"籾",
		9
	],
	[
		"bb80",
		"粈粊",
		6,
		"粓粔粖粙粚粛粠粡粣粦粧粨粩粫粬粭粯粰粴",
		4,
		"粺粻弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕"
	],
	[
		"bc40",
		"粿糀糂糃糄糆糉糋糎",
		6,
		"糘糚糛糝糞糡",
		6,
		"糩",
		5,
		"糰",
		7,
		"糹糺糼",
		13,
		"紋",
		5
	],
	[
		"bc80",
		"紑",
		14,
		"紡紣紤紥紦紨紩紪紬紭紮細",
		6,
		"肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件"
	],
	[
		"bd40",
		"紷",
		54,
		"絯",
		7
	],
	[
		"bd80",
		"絸",
		32,
		"健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸"
	],
	[
		"be40",
		"継",
		12,
		"綧",
		6,
		"綯",
		42
	],
	[
		"be80",
		"線",
		32,
		"尽劲荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵觉决诀绝均菌钧军君峻"
	],
	[
		"bf40",
		"緻",
		62
	],
	[
		"bf80",
		"縺縼",
		4,
		"繂",
		4,
		"繈",
		21,
		"俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀"
	],
	[
		"c040",
		"繞",
		35,
		"纃",
		23,
		"纜纝纞"
	],
	[
		"c080",
		"纮纴纻纼绖绤绬绹缊缐缞缷缹缻",
		6,
		"罃罆",
		9,
		"罒罓馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐"
	],
	[
		"c140",
		"罖罙罛罜罝罞罠罣",
		4,
		"罫罬罭罯罰罳罵罶罷罸罺罻罼罽罿羀羂",
		7,
		"羋羍羏",
		4,
		"羕",
		4,
		"羛羜羠羢羣羥羦羨",
		6,
		"羱"
	],
	[
		"c180",
		"羳",
		4,
		"羺羻羾翀翂翃翄翆翇翈翉翋翍翏",
		4,
		"翖翗翙",
		5,
		"翢翣痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿"
	],
	[
		"c240",
		"翤翧翨翪翫翬翭翯翲翴",
		6,
		"翽翾翿耂耇耈耉耊耎耏耑耓耚耛耝耞耟耡耣耤耫",
		5,
		"耲耴耹耺耼耾聀聁聄聅聇聈聉聎聏聐聑聓聕聖聗"
	],
	[
		"c280",
		"聙聛",
		13,
		"聫",
		5,
		"聲",
		11,
		"隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫"
	],
	[
		"c340",
		"聾肁肂肅肈肊肍",
		5,
		"肔肕肗肙肞肣肦肧肨肬肰肳肵肶肸肹肻胅胇",
		4,
		"胏",
		6,
		"胘胟胠胢胣胦胮胵胷胹胻胾胿脀脁脃脄脅脇脈脋"
	],
	[
		"c380",
		"脌脕脗脙脛脜脝脟",
		12,
		"脭脮脰脳脴脵脷脹",
		4,
		"脿谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸"
	],
	[
		"c440",
		"腀",
		5,
		"腇腉腍腎腏腒腖腗腘腛",
		4,
		"腡腢腣腤腦腨腪腫腬腯腲腳腵腶腷腸膁膃",
		4,
		"膉膋膌膍膎膐膒",
		5,
		"膙膚膞",
		4,
		"膤膥"
	],
	[
		"c480",
		"膧膩膫",
		7,
		"膴",
		5,
		"膼膽膾膿臄臅臇臈臉臋臍",
		6,
		"摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁"
	],
	[
		"c540",
		"臔",
		14,
		"臤臥臦臨臩臫臮",
		4,
		"臵",
		5,
		"臽臿舃與",
		4,
		"舎舏舑舓舕",
		5,
		"舝舠舤舥舦舧舩舮舲舺舼舽舿"
	],
	[
		"c580",
		"艀艁艂艃艅艆艈艊艌艍艎艐",
		7,
		"艙艛艜艝艞艠",
		7,
		"艩拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗"
	],
	[
		"c640",
		"艪艫艬艭艱艵艶艷艸艻艼芀芁芃芅芆芇芉芌芐芓芔芕芖芚芛芞芠芢芣芧芲芵芶芺芻芼芿苀苂苃苅苆苉苐苖苙苚苝苢苧苨苩苪苬苭苮苰苲苳苵苶苸"
	],
	[
		"c680",
		"苺苼",
		4,
		"茊茋茍茐茒茓茖茘茙茝",
		9,
		"茩茪茮茰茲茷茻茽啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐"
	],
	[
		"c740",
		"茾茿荁荂荄荅荈荊",
		4,
		"荓荕",
		4,
		"荝荢荰",
		6,
		"荹荺荾",
		6,
		"莇莈莊莋莌莍莏莐莑莔莕莖莗莙莚莝莟莡",
		6,
		"莬莭莮"
	],
	[
		"c780",
		"莯莵莻莾莿菂菃菄菆菈菉菋菍菎菐菑菒菓菕菗菙菚菛菞菢菣菤菦菧菨菫菬菭恰洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠"
	],
	[
		"c840",
		"菮華菳",
		4,
		"菺菻菼菾菿萀萂萅萇萈萉萊萐萒",
		5,
		"萙萚萛萞",
		5,
		"萩",
		7,
		"萲",
		5,
		"萹萺萻萾",
		7,
		"葇葈葉"
	],
	[
		"c880",
		"葊",
		6,
		"葒",
		4,
		"葘葝葞葟葠葢葤",
		4,
		"葪葮葯葰葲葴葷葹葻葼取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁"
	],
	[
		"c940",
		"葽",
		4,
		"蒃蒄蒅蒆蒊蒍蒏",
		7,
		"蒘蒚蒛蒝蒞蒟蒠蒢",
		12,
		"蒰蒱蒳蒵蒶蒷蒻蒼蒾蓀蓂蓃蓅蓆蓇蓈蓋蓌蓎蓏蓒蓔蓕蓗"
	],
	[
		"c980",
		"蓘",
		4,
		"蓞蓡蓢蓤蓧",
		4,
		"蓭蓮蓯蓱",
		10,
		"蓽蓾蔀蔁蔂伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳"
	],
	[
		"ca40",
		"蔃",
		8,
		"蔍蔎蔏蔐蔒蔔蔕蔖蔘蔙蔛蔜蔝蔞蔠蔢",
		8,
		"蔭",
		9,
		"蔾",
		4,
		"蕄蕅蕆蕇蕋",
		10
	],
	[
		"ca80",
		"蕗蕘蕚蕛蕜蕝蕟",
		4,
		"蕥蕦蕧蕩",
		8,
		"蕳蕵蕶蕷蕸蕼蕽蕿薀薁省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱"
	],
	[
		"cb40",
		"薂薃薆薈",
		6,
		"薐",
		10,
		"薝",
		6,
		"薥薦薧薩薫薬薭薱",
		5,
		"薸薺",
		6,
		"藂",
		6,
		"藊",
		4,
		"藑藒"
	],
	[
		"cb80",
		"藔藖",
		5,
		"藝",
		6,
		"藥藦藧藨藪",
		14,
		"恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔"
	],
	[
		"cc40",
		"藹藺藼藽藾蘀",
		4,
		"蘆",
		10,
		"蘒蘓蘔蘕蘗",
		15,
		"蘨蘪",
		13,
		"蘹蘺蘻蘽蘾蘿虀"
	],
	[
		"cc80",
		"虁",
		11,
		"虒虓處",
		4,
		"虛虜虝號虠虡虣",
		7,
		"獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃"
	],
	[
		"cd40",
		"虭虯虰虲",
		6,
		"蚃",
		6,
		"蚎",
		4,
		"蚔蚖",
		5,
		"蚞",
		4,
		"蚥蚦蚫蚭蚮蚲蚳蚷蚸蚹蚻",
		4,
		"蛁蛂蛃蛅蛈蛌蛍蛒蛓蛕蛖蛗蛚蛜"
	],
	[
		"cd80",
		"蛝蛠蛡蛢蛣蛥蛦蛧蛨蛪蛫蛬蛯蛵蛶蛷蛺蛻蛼蛽蛿蜁蜄蜅蜆蜋蜌蜎蜏蜐蜑蜔蜖汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威"
	],
	[
		"ce40",
		"蜙蜛蜝蜟蜠蜤蜦蜧蜨蜪蜫蜬蜭蜯蜰蜲蜳蜵蜶蜸蜹蜺蜼蜽蝀",
		6,
		"蝊蝋蝍蝏蝐蝑蝒蝔蝕蝖蝘蝚",
		5,
		"蝡蝢蝦",
		7,
		"蝯蝱蝲蝳蝵"
	],
	[
		"ce80",
		"蝷蝸蝹蝺蝿螀螁螄螆螇螉螊螌螎",
		4,
		"螔螕螖螘",
		6,
		"螠",
		4,
		"巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺"
	],
	[
		"cf40",
		"螥螦螧螩螪螮螰螱螲螴螶螷螸螹螻螼螾螿蟁",
		4,
		"蟇蟈蟉蟌",
		4,
		"蟔",
		6,
		"蟜蟝蟞蟟蟡蟢蟣蟤蟦蟧蟨蟩蟫蟬蟭蟯",
		9
	],
	[
		"cf80",
		"蟺蟻蟼蟽蟿蠀蠁蠂蠄",
		5,
		"蠋",
		7,
		"蠔蠗蠘蠙蠚蠜",
		4,
		"蠣稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓"
	],
	[
		"d040",
		"蠤",
		13,
		"蠳",
		5,
		"蠺蠻蠽蠾蠿衁衂衃衆",
		5,
		"衎",
		5,
		"衕衖衘衚",
		6,
		"衦衧衪衭衯衱衳衴衵衶衸衹衺"
	],
	[
		"d080",
		"衻衼袀袃袆袇袉袊袌袎袏袐袑袓袔袕袗",
		4,
		"袝",
		4,
		"袣袥",
		5,
		"小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄"
	],
	[
		"d140",
		"袬袮袯袰袲",
		4,
		"袸袹袺袻袽袾袿裀裃裄裇裈裊裋裌裍裏裐裑裓裖裗裚",
		4,
		"裠裡裦裧裩",
		6,
		"裲裵裶裷裺裻製裿褀褁褃",
		5
	],
	[
		"d180",
		"褉褋",
		4,
		"褑褔",
		4,
		"褜",
		4,
		"褢褣褤褦褧褨褩褬褭褮褯褱褲褳褵褷选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶"
	],
	[
		"d240",
		"褸",
		8,
		"襂襃襅",
		24,
		"襠",
		5,
		"襧",
		19,
		"襼"
	],
	[
		"d280",
		"襽襾覀覂覄覅覇",
		26,
		"摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐"
	],
	[
		"d340",
		"覢",
		30,
		"觃觍觓觔觕觗觘觙觛觝觟觠觡觢觤觧觨觩觪觬觭觮觰觱觲觴",
		6
	],
	[
		"d380",
		"觻",
		4,
		"訁",
		5,
		"計",
		21,
		"印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉"
	],
	[
		"d440",
		"訞",
		31,
		"訿",
		8,
		"詉",
		21
	],
	[
		"d480",
		"詟",
		25,
		"詺",
		6,
		"浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧"
	],
	[
		"d540",
		"誁",
		7,
		"誋",
		7,
		"誔",
		46
	],
	[
		"d580",
		"諃",
		32,
		"铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政"
	],
	[
		"d640",
		"諤",
		34,
		"謈",
		27
	],
	[
		"d680",
		"謤謥謧",
		30,
		"帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑"
	],
	[
		"d740",
		"譆",
		31,
		"譧",
		4,
		"譭",
		25
	],
	[
		"d780",
		"讇",
		24,
		"讬讱讻诇诐诪谉谞住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座"
	],
	[
		"d840",
		"谸",
		8,
		"豂豃豄豅豈豊豋豍",
		7,
		"豖豗豘豙豛",
		5,
		"豣",
		6,
		"豬",
		6,
		"豴豵豶豷豻",
		6,
		"貃貄貆貇"
	],
	[
		"d880",
		"貈貋貍",
		6,
		"貕貖貗貙",
		20,
		"亍丌兀丐廿卅丕亘丞鬲孬噩丨禺丿匕乇夭爻卮氐囟胤馗毓睾鼗丶亟鼐乜乩亓芈孛啬嘏仄厍厝厣厥厮靥赝匚叵匦匮匾赜卦卣刂刈刎刭刳刿剀剌剞剡剜蒯剽劂劁劐劓冂罔亻仃仉仂仨仡仫仞伛仳伢佤仵伥伧伉伫佞佧攸佚佝"
	],
	[
		"d940",
		"貮",
		62
	],
	[
		"d980",
		"賭",
		32,
		"佟佗伲伽佶佴侑侉侃侏佾佻侪佼侬侔俦俨俪俅俚俣俜俑俟俸倩偌俳倬倏倮倭俾倜倌倥倨偾偃偕偈偎偬偻傥傧傩傺僖儆僭僬僦僮儇儋仝氽佘佥俎龠汆籴兮巽黉馘冁夔勹匍訇匐凫夙兕亠兖亳衮袤亵脔裒禀嬴蠃羸冫冱冽冼"
	],
	[
		"da40",
		"贎",
		14,
		"贠赑赒赗赟赥赨赩赪赬赮赯赱赲赸",
		8,
		"趂趃趆趇趈趉趌",
		4,
		"趒趓趕",
		9,
		"趠趡"
	],
	[
		"da80",
		"趢趤",
		12,
		"趲趶趷趹趻趽跀跁跂跅跇跈跉跊跍跐跒跓跔凇冖冢冥讠讦讧讪讴讵讷诂诃诋诏诎诒诓诔诖诘诙诜诟诠诤诨诩诮诰诳诶诹诼诿谀谂谄谇谌谏谑谒谔谕谖谙谛谘谝谟谠谡谥谧谪谫谮谯谲谳谵谶卩卺阝阢阡阱阪阽阼陂陉陔陟陧陬陲陴隈隍隗隰邗邛邝邙邬邡邴邳邶邺"
	],
	[
		"db40",
		"跕跘跙跜跠跡跢跥跦跧跩跭跮跰跱跲跴跶跼跾",
		6,
		"踆踇踈踋踍踎踐踑踒踓踕",
		7,
		"踠踡踤",
		4,
		"踫踭踰踲踳踴踶踷踸踻踼踾"
	],
	[
		"db80",
		"踿蹃蹅蹆蹌",
		4,
		"蹓",
		5,
		"蹚",
		11,
		"蹧蹨蹪蹫蹮蹱邸邰郏郅邾郐郄郇郓郦郢郜郗郛郫郯郾鄄鄢鄞鄣鄱鄯鄹酃酆刍奂劢劬劭劾哿勐勖勰叟燮矍廴凵凼鬯厶弁畚巯坌垩垡塾墼壅壑圩圬圪圳圹圮圯坜圻坂坩垅坫垆坼坻坨坭坶坳垭垤垌垲埏垧垴垓垠埕埘埚埙埒垸埴埯埸埤埝"
	],
	[
		"dc40",
		"蹳蹵蹷",
		4,
		"蹽蹾躀躂躃躄躆躈",
		6,
		"躑躒躓躕",
		6,
		"躝躟",
		11,
		"躭躮躰躱躳",
		6,
		"躻",
		7
	],
	[
		"dc80",
		"軃",
		10,
		"軏",
		21,
		"堋堍埽埭堀堞堙塄堠塥塬墁墉墚墀馨鼙懿艹艽艿芏芊芨芄芎芑芗芙芫芸芾芰苈苊苣芘芷芮苋苌苁芩芴芡芪芟苄苎芤苡茉苷苤茏茇苜苴苒苘茌苻苓茑茚茆茔茕苠苕茜荑荛荜茈莒茼茴茱莛荞茯荏荇荃荟荀茗荠茭茺茳荦荥"
	],
	[
		"dd40",
		"軥",
		62
	],
	[
		"dd80",
		"輤",
		32,
		"荨茛荩荬荪荭荮莰荸莳莴莠莪莓莜莅荼莶莩荽莸荻莘莞莨莺莼菁萁菥菘堇萘萋菝菽菖萜萸萑萆菔菟萏萃菸菹菪菅菀萦菰菡葜葑葚葙葳蒇蒈葺蒉葸萼葆葩葶蒌蒎萱葭蓁蓍蓐蓦蒽蓓蓊蒿蒺蓠蒡蒹蒴蒗蓥蓣蔌甍蔸蓰蔹蔟蔺"
	],
	[
		"de40",
		"轅",
		32,
		"轪辀辌辒辝辠辡辢辤辥辦辧辪辬辭辮辯農辳辴辵辷辸辺辻込辿迀迃迆"
	],
	[
		"de80",
		"迉",
		4,
		"迏迒迖迗迚迠迡迣迧迬迯迱迲迴迵迶迺迻迼迾迿逇逈逌逎逓逕逘蕖蔻蓿蓼蕙蕈蕨蕤蕞蕺瞢蕃蕲蕻薤薨薇薏蕹薮薜薅薹薷薰藓藁藜藿蘧蘅蘩蘖蘼廾弈夼奁耷奕奚奘匏尢尥尬尴扌扪抟抻拊拚拗拮挢拶挹捋捃掭揶捱捺掎掴捭掬掊捩掮掼揲揸揠揿揄揞揎摒揆掾摅摁搋搛搠搌搦搡摞撄摭撖"
	],
	[
		"df40",
		"這逜連逤逥逧",
		5,
		"逰",
		4,
		"逷逹逺逽逿遀遃遅遆遈",
		4,
		"過達違遖遙遚遜",
		5,
		"遤遦遧適遪遫遬遯",
		4,
		"遶",
		6,
		"遾邁"
	],
	[
		"df80",
		"還邅邆邇邉邊邌",
		4,
		"邒邔邖邘邚邜邞邟邠邤邥邧邨邩邫邭邲邷邼邽邿郀摺撷撸撙撺擀擐擗擤擢攉攥攮弋忒甙弑卟叱叽叩叨叻吒吖吆呋呒呓呔呖呃吡呗呙吣吲咂咔呷呱呤咚咛咄呶呦咝哐咭哂咴哒咧咦哓哔呲咣哕咻咿哌哙哚哜咩咪咤哝哏哞唛哧唠哽唔哳唢唣唏唑唧唪啧喏喵啉啭啁啕唿啐唼"
	],
	[
		"e040",
		"郂郃郆郈郉郋郌郍郒郔郕郖郘郙郚郞郟郠郣郤郥郩郪郬郮郰郱郲郳郵郶郷郹郺郻郼郿鄀鄁鄃鄅",
		19,
		"鄚鄛鄜"
	],
	[
		"e080",
		"鄝鄟鄠鄡鄤",
		10,
		"鄰鄲",
		6,
		"鄺",
		8,
		"酄唷啖啵啶啷唳唰啜喋嗒喃喱喹喈喁喟啾嗖喑啻嗟喽喾喔喙嗪嗷嗉嘟嗑嗫嗬嗔嗦嗝嗄嗯嗥嗲嗳嗌嗍嗨嗵嗤辔嘞嘈嘌嘁嘤嘣嗾嘀嘧嘭噘嘹噗嘬噍噢噙噜噌噔嚆噤噱噫噻噼嚅嚓嚯囔囗囝囡囵囫囹囿圄圊圉圜帏帙帔帑帱帻帼"
	],
	[
		"e140",
		"酅酇酈酑酓酔酕酖酘酙酛酜酟酠酦酧酨酫酭酳酺酻酼醀",
		4,
		"醆醈醊醎醏醓",
		6,
		"醜",
		5,
		"醤",
		5,
		"醫醬醰醱醲醳醶醷醸醹醻"
	],
	[
		"e180",
		"醼",
		10,
		"釈釋釐釒",
		9,
		"針",
		8,
		"帷幄幔幛幞幡岌屺岍岐岖岈岘岙岑岚岜岵岢岽岬岫岱岣峁岷峄峒峤峋峥崂崃崧崦崮崤崞崆崛嵘崾崴崽嵬嵛嵯嵝嵫嵋嵊嵩嵴嶂嶙嶝豳嶷巅彳彷徂徇徉後徕徙徜徨徭徵徼衢彡犭犰犴犷犸狃狁狎狍狒狨狯狩狲狴狷猁狳猃狺"
	],
	[
		"e240",
		"釦",
		62
	],
	[
		"e280",
		"鈥",
		32,
		"狻猗猓猡猊猞猝猕猢猹猥猬猸猱獐獍獗獠獬獯獾舛夥飧夤夂饣饧",
		5,
		"饴饷饽馀馄馇馊馍馐馑馓馔馕庀庑庋庖庥庠庹庵庾庳赓廒廑廛廨廪膺忄忉忖忏怃忮怄忡忤忾怅怆忪忭忸怙怵怦怛怏怍怩怫怊怿怡恸恹恻恺恂"
	],
	[
		"e340",
		"鉆",
		45,
		"鉵",
		16
	],
	[
		"e380",
		"銆",
		7,
		"銏",
		24,
		"恪恽悖悚悭悝悃悒悌悛惬悻悱惝惘惆惚悴愠愦愕愣惴愀愎愫慊慵憬憔憧憷懔懵忝隳闩闫闱闳闵闶闼闾阃阄阆阈阊阋阌阍阏阒阕阖阗阙阚丬爿戕氵汔汜汊沣沅沐沔沌汨汩汴汶沆沩泐泔沭泷泸泱泗沲泠泖泺泫泮沱泓泯泾"
	],
	[
		"e440",
		"銨",
		5,
		"銯",
		24,
		"鋉",
		31
	],
	[
		"e480",
		"鋩",
		32,
		"洹洧洌浃浈洇洄洙洎洫浍洮洵洚浏浒浔洳涑浯涞涠浞涓涔浜浠浼浣渚淇淅淞渎涿淠渑淦淝淙渖涫渌涮渫湮湎湫溲湟溆湓湔渲渥湄滟溱溘滠漭滢溥溧溽溻溷滗溴滏溏滂溟潢潆潇漤漕滹漯漶潋潴漪漉漩澉澍澌潸潲潼潺濑"
	],
	[
		"e540",
		"錊",
		51,
		"錿",
		10
	],
	[
		"e580",
		"鍊",
		31,
		"鍫濉澧澹澶濂濡濮濞濠濯瀚瀣瀛瀹瀵灏灞宀宄宕宓宥宸甯骞搴寤寮褰寰蹇謇辶迓迕迥迮迤迩迦迳迨逅逄逋逦逑逍逖逡逵逶逭逯遄遑遒遐遨遘遢遛暹遴遽邂邈邃邋彐彗彖彘尻咫屐屙孱屣屦羼弪弩弭艴弼鬻屮妁妃妍妩妪妣"
	],
	[
		"e640",
		"鍬",
		34,
		"鎐",
		27
	],
	[
		"e680",
		"鎬",
		29,
		"鏋鏌鏍妗姊妫妞妤姒妲妯姗妾娅娆姝娈姣姘姹娌娉娲娴娑娣娓婀婧婊婕娼婢婵胬媪媛婷婺媾嫫媲嫒嫔媸嫠嫣嫱嫖嫦嫘嫜嬉嬗嬖嬲嬷孀尕尜孚孥孳孑孓孢驵驷驸驺驿驽骀骁骅骈骊骐骒骓骖骘骛骜骝骟骠骢骣骥骧纟纡纣纥纨纩"
	],
	[
		"e740",
		"鏎",
		7,
		"鏗",
		54
	],
	[
		"e780",
		"鐎",
		32,
		"纭纰纾绀绁绂绉绋绌绐绔绗绛绠绡绨绫绮绯绱绲缍绶绺绻绾缁缂缃缇缈缋缌缏缑缒缗缙缜缛缟缡",
		6,
		"缪缫缬缭缯",
		4,
		"缵幺畿巛甾邕玎玑玮玢玟珏珂珑玷玳珀珉珈珥珙顼琊珩珧珞玺珲琏琪瑛琦琥琨琰琮琬"
	],
	[
		"e840",
		"鐯",
		14,
		"鐿",
		43,
		"鑬鑭鑮鑯"
	],
	[
		"e880",
		"鑰",
		20,
		"钑钖钘铇铏铓铔铚铦铻锜锠琛琚瑁瑜瑗瑕瑙瑷瑭瑾璜璎璀璁璇璋璞璨璩璐璧瓒璺韪韫韬杌杓杞杈杩枥枇杪杳枘枧杵枨枞枭枋杷杼柰栉柘栊柩枰栌柙枵柚枳柝栀柃枸柢栎柁柽栲栳桠桡桎桢桄桤梃栝桕桦桁桧桀栾桊桉栩梵梏桴桷梓桫棂楮棼椟椠棹"
	],
	[
		"e940",
		"锧锳锽镃镈镋镕镚镠镮镴镵長",
		7,
		"門",
		42
	],
	[
		"e980",
		"閫",
		32,
		"椤棰椋椁楗棣椐楱椹楠楂楝榄楫榀榘楸椴槌榇榈槎榉楦楣楹榛榧榻榫榭槔榱槁槊槟榕槠榍槿樯槭樗樘橥槲橄樾檠橐橛樵檎橹樽樨橘橼檑檐檩檗檫猷獒殁殂殇殄殒殓殍殚殛殡殪轫轭轱轲轳轵轶轸轷轹轺轼轾辁辂辄辇辋"
	],
	[
		"ea40",
		"闌",
		27,
		"闬闿阇阓阘阛阞阠阣",
		6,
		"阫阬阭阯阰阷阸阹阺阾陁陃陊陎陏陑陒陓陖陗"
	],
	[
		"ea80",
		"陘陙陚陜陝陞陠陣陥陦陫陭",
		4,
		"陳陸",
		12,
		"隇隉隊辍辎辏辘辚軎戋戗戛戟戢戡戥戤戬臧瓯瓴瓿甏甑甓攴旮旯旰昊昙杲昃昕昀炅曷昝昴昱昶昵耆晟晔晁晏晖晡晗晷暄暌暧暝暾曛曜曦曩贲贳贶贻贽赀赅赆赈赉赇赍赕赙觇觊觋觌觎觏觐觑牮犟牝牦牯牾牿犄犋犍犏犒挈挲掰"
	],
	[
		"eb40",
		"隌階隑隒隓隕隖隚際隝",
		9,
		"隨",
		7,
		"隱隲隴隵隷隸隺隻隿雂雃雈雊雋雐雑雓雔雖",
		9,
		"雡",
		6,
		"雫"
	],
	[
		"eb80",
		"雬雭雮雰雱雲雴雵雸雺電雼雽雿霂霃霅霊霋霌霐霑霒霔霕霗",
		4,
		"霝霟霠搿擘耄毪毳毽毵毹氅氇氆氍氕氘氙氚氡氩氤氪氲攵敕敫牍牒牖爰虢刖肟肜肓肼朊肽肱肫肭肴肷胧胨胩胪胛胂胄胙胍胗朐胝胫胱胴胭脍脎胲胼朕脒豚脶脞脬脘脲腈腌腓腴腙腚腱腠腩腼腽腭腧塍媵膈膂膑滕膣膪臌朦臊膻"
	],
	[
		"ec40",
		"霡",
		8,
		"霫霬霮霯霱霳",
		4,
		"霺霻霼霽霿",
		18,
		"靔靕靗靘靚靜靝靟靣靤靦靧靨靪",
		7
	],
	[
		"ec80",
		"靲靵靷",
		4,
		"靽",
		7,
		"鞆",
		4,
		"鞌鞎鞏鞐鞓鞕鞖鞗鞙",
		4,
		"臁膦欤欷欹歃歆歙飑飒飓飕飙飚殳彀毂觳斐齑斓於旆旄旃旌旎旒旖炀炜炖炝炻烀炷炫炱烨烊焐焓焖焯焱煳煜煨煅煲煊煸煺熘熳熵熨熠燠燔燧燹爝爨灬焘煦熹戾戽扃扈扉礻祀祆祉祛祜祓祚祢祗祠祯祧祺禅禊禚禧禳忑忐"
	],
	[
		"ed40",
		"鞞鞟鞡鞢鞤",
		6,
		"鞬鞮鞰鞱鞳鞵",
		46
	],
	[
		"ed80",
		"韤韥韨韮",
		4,
		"韴韷",
		23,
		"怼恝恚恧恁恙恣悫愆愍慝憩憝懋懑戆肀聿沓泶淼矶矸砀砉砗砘砑斫砭砜砝砹砺砻砟砼砥砬砣砩硎硭硖硗砦硐硇硌硪碛碓碚碇碜碡碣碲碹碥磔磙磉磬磲礅磴礓礤礞礴龛黹黻黼盱眄眍盹眇眈眚眢眙眭眦眵眸睐睑睇睃睚睨"
	],
	[
		"ee40",
		"頏",
		62
	],
	[
		"ee80",
		"顎",
		32,
		"睢睥睿瞍睽瞀瞌瞑瞟瞠瞰瞵瞽町畀畎畋畈畛畲畹疃罘罡罟詈罨罴罱罹羁罾盍盥蠲钅钆钇钋钊钌钍钏钐钔钗钕钚钛钜钣钤钫钪钭钬钯钰钲钴钶",
		4,
		"钼钽钿铄铈",
		6,
		"铐铑铒铕铖铗铙铘铛铞铟铠铢铤铥铧铨铪"
	],
	[
		"ef40",
		"顯",
		5,
		"颋颎颒颕颙颣風",
		37,
		"飏飐飔飖飗飛飜飝飠",
		4
	],
	[
		"ef80",
		"飥飦飩",
		30,
		"铩铫铮铯铳铴铵铷铹铼铽铿锃锂锆锇锉锊锍锎锏锒",
		4,
		"锘锛锝锞锟锢锪锫锩锬锱锲锴锶锷锸锼锾锿镂锵镄镅镆镉镌镎镏镒镓镔镖镗镘镙镛镞镟镝镡镢镤",
		8,
		"镯镱镲镳锺矧矬雉秕秭秣秫稆嵇稃稂稞稔"
	],
	[
		"f040",
		"餈",
		4,
		"餎餏餑",
		28,
		"餯",
		26
	],
	[
		"f080",
		"饊",
		9,
		"饖",
		12,
		"饤饦饳饸饹饻饾馂馃馉稹稷穑黏馥穰皈皎皓皙皤瓞瓠甬鸠鸢鸨",
		4,
		"鸲鸱鸶鸸鸷鸹鸺鸾鹁鹂鹄鹆鹇鹈鹉鹋鹌鹎鹑鹕鹗鹚鹛鹜鹞鹣鹦",
		6,
		"鹱鹭鹳疒疔疖疠疝疬疣疳疴疸痄疱疰痃痂痖痍痣痨痦痤痫痧瘃痱痼痿瘐瘀瘅瘌瘗瘊瘥瘘瘕瘙"
	],
	[
		"f140",
		"馌馎馚",
		10,
		"馦馧馩",
		47
	],
	[
		"f180",
		"駙",
		32,
		"瘛瘼瘢瘠癀瘭瘰瘿瘵癃瘾瘳癍癞癔癜癖癫癯翊竦穸穹窀窆窈窕窦窠窬窨窭窳衤衩衲衽衿袂袢裆袷袼裉裢裎裣裥裱褚裼裨裾裰褡褙褓褛褊褴褫褶襁襦襻疋胥皲皴矜耒耔耖耜耠耢耥耦耧耩耨耱耋耵聃聆聍聒聩聱覃顸颀颃"
	],
	[
		"f240",
		"駺",
		62
	],
	[
		"f280",
		"騹",
		32,
		"颉颌颍颏颔颚颛颞颟颡颢颥颦虍虔虬虮虿虺虼虻蚨蚍蚋蚬蚝蚧蚣蚪蚓蚩蚶蛄蚵蛎蚰蚺蚱蚯蛉蛏蚴蛩蛱蛲蛭蛳蛐蜓蛞蛴蛟蛘蛑蜃蜇蛸蜈蜊蜍蜉蜣蜻蜞蜥蜮蜚蜾蝈蜴蜱蜩蜷蜿螂蜢蝽蝾蝻蝠蝰蝌蝮螋蝓蝣蝼蝤蝙蝥螓螯螨蟒"
	],
	[
		"f340",
		"驚",
		17,
		"驲骃骉骍骎骔骕骙骦骩",
		6,
		"骲骳骴骵骹骻骽骾骿髃髄髆",
		4,
		"髍髎髏髐髒體髕髖髗髙髚髛髜"
	],
	[
		"f380",
		"髝髞髠髢髣髤髥髧髨髩髪髬髮髰",
		8,
		"髺髼",
		6,
		"鬄鬅鬆蟆螈螅螭螗螃螫蟥螬螵螳蟋蟓螽蟑蟀蟊蟛蟪蟠蟮蠖蠓蟾蠊蠛蠡蠹蠼缶罂罄罅舐竺竽笈笃笄笕笊笫笏筇笸笪笙笮笱笠笥笤笳笾笞筘筚筅筵筌筝筠筮筻筢筲筱箐箦箧箸箬箝箨箅箪箜箢箫箴篑篁篌篝篚篥篦篪簌篾篼簏簖簋"
	],
	[
		"f440",
		"鬇鬉",
		5,
		"鬐鬑鬒鬔",
		10,
		"鬠鬡鬢鬤",
		10,
		"鬰鬱鬳",
		7,
		"鬽鬾鬿魀魆魊魋魌魎魐魒魓魕",
		5
	],
	[
		"f480",
		"魛",
		32,
		"簟簪簦簸籁籀臾舁舂舄臬衄舡舢舣舭舯舨舫舸舻舳舴舾艄艉艋艏艚艟艨衾袅袈裘裟襞羝羟羧羯羰羲籼敉粑粝粜粞粢粲粼粽糁糇糌糍糈糅糗糨艮暨羿翎翕翥翡翦翩翮翳糸絷綦綮繇纛麸麴赳趄趔趑趱赧赭豇豉酊酐酎酏酤"
	],
	[
		"f540",
		"魼",
		62
	],
	[
		"f580",
		"鮻",
		32,
		"酢酡酰酩酯酽酾酲酴酹醌醅醐醍醑醢醣醪醭醮醯醵醴醺豕鹾趸跫踅蹙蹩趵趿趼趺跄跖跗跚跞跎跏跛跆跬跷跸跣跹跻跤踉跽踔踝踟踬踮踣踯踺蹀踹踵踽踱蹉蹁蹂蹑蹒蹊蹰蹶蹼蹯蹴躅躏躔躐躜躞豸貂貊貅貘貔斛觖觞觚觜"
	],
	[
		"f640",
		"鯜",
		62
	],
	[
		"f680",
		"鰛",
		32,
		"觥觫觯訾謦靓雩雳雯霆霁霈霏霎霪霭霰霾龀龃龅",
		5,
		"龌黾鼋鼍隹隼隽雎雒瞿雠銎銮鋈錾鍪鏊鎏鐾鑫鱿鲂鲅鲆鲇鲈稣鲋鲎鲐鲑鲒鲔鲕鲚鲛鲞",
		5,
		"鲥",
		4,
		"鲫鲭鲮鲰",
		7,
		"鲺鲻鲼鲽鳄鳅鳆鳇鳊鳋"
	],
	[
		"f740",
		"鰼",
		62
	],
	[
		"f780",
		"鱻鱽鱾鲀鲃鲄鲉鲊鲌鲏鲓鲖鲗鲘鲙鲝鲪鲬鲯鲹鲾",
		4,
		"鳈鳉鳑鳒鳚鳛鳠鳡鳌",
		4,
		"鳓鳔鳕鳗鳘鳙鳜鳝鳟鳢靼鞅鞑鞒鞔鞯鞫鞣鞲鞴骱骰骷鹘骶骺骼髁髀髅髂髋髌髑魅魃魇魉魈魍魑飨餍餮饕饔髟髡髦髯髫髻髭髹鬈鬏鬓鬟鬣麽麾縻麂麇麈麋麒鏖麝麟黛黜黝黠黟黢黩黧黥黪黯鼢鼬鼯鼹鼷鼽鼾齄"
	],
	[
		"f840",
		"鳣",
		62
	],
	[
		"f880",
		"鴢",
		32
	],
	[
		"f940",
		"鵃",
		62
	],
	[
		"f980",
		"鶂",
		32
	],
	[
		"fa40",
		"鶣",
		62
	],
	[
		"fa80",
		"鷢",
		32
	],
	[
		"fb40",
		"鸃",
		27,
		"鸤鸧鸮鸰鸴鸻鸼鹀鹍鹐鹒鹓鹔鹖鹙鹝鹟鹠鹡鹢鹥鹮鹯鹲鹴",
		9,
		"麀"
	],
	[
		"fb80",
		"麁麃麄麅麆麉麊麌",
		5,
		"麔",
		8,
		"麞麠",
		5,
		"麧麨麩麪"
	],
	[
		"fc40",
		"麫",
		8,
		"麵麶麷麹麺麼麿",
		4,
		"黅黆黇黈黊黋黌黐黒黓黕黖黗黙黚點黡黣黤黦黨黫黬黭黮黰",
		8,
		"黺黽黿",
		6
	],
	[
		"fc80",
		"鼆",
		4,
		"鼌鼏鼑鼒鼔鼕鼖鼘鼚",
		5,
		"鼡鼣",
		8,
		"鼭鼮鼰鼱"
	],
	[
		"fd40",
		"鼲",
		4,
		"鼸鼺鼼鼿",
		4,
		"齅",
		10,
		"齒",
		38
	],
	[
		"fd80",
		"齹",
		5,
		"龁龂龍",
		11,
		"龜龝龞龡",
		4,
		"郎凉秊裏隣"
	],
	[
		"fe40",
		"兀嗀﨎﨏﨑﨓﨔礼﨟蘒﨡﨣﨤﨧﨨﨩"
	]
];

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TYPE = {
  QUERY_NOTIFICATIONS: 1,
  TXN_DESCRIPTOR: 2,
  TRACE_ACTIVITY: 3
};

var TXNDESCRIPTOR_HEADER_DATA_LEN = 4 + 8;

var TXNDESCRIPTOR_HEADER_LEN = 4 + 2 + TXNDESCRIPTOR_HEADER_DATA_LEN;

module.exports.writeToTrackingBuffer = writeToTrackingBuffer;
function writeToTrackingBuffer(buffer, txnDescriptor, outstandingRequestCount) {
  buffer.writeUInt32LE(0);
  buffer.writeUInt32LE(TXNDESCRIPTOR_HEADER_LEN);
  buffer.writeUInt16LE(TYPE.TXN_DESCRIPTOR);
  buffer.writeBuffer(txnDescriptor);
  buffer.writeUInt32LE(outstandingRequestCount);

  var data = buffer.data;
  data.writeUInt32LE(data.length, 0);
  return buffer;
}

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var versions = module.exports.versions = {
  '7_1': 0x71000001,
  '7_2': 0x72090002,
  '7_3_A': 0x730A0003,
  '7_3_B': 0x730B0003,
  '7_4': 0x74000004
};

var versionsByValue = module.exports.versionsByValue = {};

for (var name in versions) {
  versionsByValue[versions[name]] = name;
}

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// s2.2.7.5/6/7

var STATUS = {
  MORE: 0x0001,
  ERROR: 0x0002,
  // This bit is not yet in use by SQL Server, so is not exposed in the returned token
  INXACT: 0x0004,
  COUNT: 0x0010,
  ATTN: 0x0020,
  SRVERROR: 0x0100
};

function parseToken(parser, options, callback) {
  parser.readUInt16LE(function (status) {
    var more = !!(status & STATUS.MORE);
    var sqlError = !!(status & STATUS.ERROR);
    var rowCountValid = !!(status & STATUS.COUNT);
    var attention = !!(status & STATUS.ATTN);
    var serverError = !!(status & STATUS.SRVERROR);

    parser.readUInt16LE(function (curCmd) {
      (options.tdsVersion < '7_2' ? parser.readUInt32LE : parser.readUInt64LE).call(parser, function (rowCount) {
        callback({
          name: 'DONE',
          event: 'done',
          more: more,
          sqlError: sqlError,
          attention: attention,
          serverError: serverError,
          rowCount: rowCountValid ? rowCount : undefined,
          curCmd: curCmd
        });
      });
    });
  });
}

module.exports.doneParser = doneParser;
function doneParser(parser, colMetadata, options, callback) {
  parseToken(parser, options, function (token) {
    token.name = 'DONE';
    token.event = 'done';
    callback(token);
  });
}

module.exports.doneInProcParser = doneInProcParser;
function doneInProcParser(parser, colMetadata, options, callback) {
  parseToken(parser, options, function (token) {
    token.name = 'DONEINPROC';
    token.event = 'doneInProc';
    callback(token);
  });
}

module.exports.doneProcParser = doneProcParser;
function doneProcParser(parser, colMetadata, options, callback) {
  parseToken(parser, options, function (token) {
    token.name = 'DONEPROC';
    token.event = 'doneProc';
    callback(token);
  });
}

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isZero(array) {
  for (var j = 0, len = array.length; j < len; j++) {
    var byte = array[j];
    if (byte !== 0) {
      return false;
    }
  }
  return true;
}

function getNextRemainder(array) {
  var remainder = 0;

  for (var i = array.length - 1; i >= 0; i--) {
    var s = remainder * 256 + array[i];
    array[i] = Math.floor(s / 10);
    remainder = s % 10;
  }

  return remainder;
}

function invert(array) {
  // Invert bits
  var len = array.length;

  for (var i = 0; i < len; i++) {
    array[i] = array[i] ^ 0xFF;
  }

  for (var _i = 0; _i < len; _i++) {
    array[_i] = array[_i] + 1;

    if (array[_i] > 255) {
      array[_i] = 0;
    } else {
      break;
    }
  }
}

module.exports.convertLEBytesToString = convertLEBytesToString;
function convertLEBytesToString(buffer) {
  var array = Array.prototype.slice.call(buffer, 0, buffer.length);
  if (isZero(array)) {
    return '0';
  } else {
    var sign = void 0;
    if (array[array.length - 1] & 0x80) {
      sign = '-';
      invert(array);
    } else {
      sign = '';
    }
    var result = '';
    while (!isZero(array)) {
      var t = getNextRemainder(array);
      result = t + result;
    }
    return sign + result;
  }
}

module.exports.numberToInt64LE = numberToInt64LE;
function numberToInt64LE(num) {
  // adapted from https://github.com/broofa/node-int64
  var negate = num < 0;
  var hi = Math.abs(num);
  var lo = hi % 0x100000000;
  hi = hi / 0x100000000 | 0;
  var buf = new Buffer(8);
  for (var i = 0; i <= 7; i++) {
    buf[i] = lo & 0xff;
    lo = i === 3 ? hi : lo >>> 8;
  }
  if (negate) {
    var carry = 1;
    for (var _i2 = 0; _i2 <= 7; _i2++) {
      var v = (buf[_i2] ^ 0xff) + carry;
      buf[_i2] = v & 0xff;
      carry = v >> 8;
    }
  }
  return buf;
}

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WritableTrackingBuffer = __webpack_require__(94);
var writeAllHeaders = __webpack_require__(136).writeToTrackingBuffer;

/*
  s2.2.6.8
 */

var OPERATION_TYPE = module.exports.OPERATION_TYPE = {
  TM_GET_DTC_ADDRESS: 0x00,
  TM_PROPAGATE_XACT: 0x01,
  TM_BEGIN_XACT: 0x05,
  TM_PROMOTE_XACT: 0x06,
  TM_COMMIT_XACT: 0x07,
  TM_ROLLBACK_XACT: 0x08,
  TM_SAVE_XACT: 0x09
};

var ISOLATION_LEVEL = module.exports.ISOLATION_LEVEL = {
  NO_CHANGE: 0x00,
  READ_UNCOMMITTED: 0x01,
  READ_COMMITTED: 0x02,
  REPEATABLE_READ: 0x03,
  SERIALIZABLE: 0x04,
  SNAPSHOT: 0x05
};

var isolationLevelByValue = {};
for (var name in ISOLATION_LEVEL) {
  var value = ISOLATION_LEVEL[name];
  isolationLevelByValue[value] = name;
}

var Transaction = function () {
  function Transaction(name, isolationLevel) {
    (0, _classCallCheck3.default)(this, Transaction);

    this.name = name;
    this.isolationLevel = isolationLevel;
    this.outstandingRequestCount = 1;
  }

  (0, _createClass3.default)(Transaction, [{
    key: 'beginPayload',
    value: function beginPayload(txnDescriptor) {
      var _this = this;

      var buffer = new WritableTrackingBuffer(100, 'ucs2');
      writeAllHeaders(buffer, txnDescriptor, this.outstandingRequestCount);
      buffer.writeUShort(OPERATION_TYPE.TM_BEGIN_XACT);
      buffer.writeUInt8(this.isolationLevel);
      buffer.writeUInt8(this.name.length * 2);
      buffer.writeString(this.name, 'ucs2');

      return {
        data: buffer.data,
        toString: function toString() {
          return 'Begin Transaction: name=' + _this.name + ', isolationLevel=' + isolationLevelByValue[_this.isolationLevel];
        }
      };
    }
  }, {
    key: 'commitPayload',
    value: function commitPayload(txnDescriptor) {
      var _this2 = this;

      var buffer = new WritableTrackingBuffer(100, 'ascii');
      writeAllHeaders(buffer, txnDescriptor, this.outstandingRequestCount);
      buffer.writeUShort(OPERATION_TYPE.TM_COMMIT_XACT);
      buffer.writeUInt8(this.name.length * 2);
      buffer.writeString(this.name, 'ucs2');
      // No fBeginXact flag, so no new transaction is started.
      buffer.writeUInt8(0);

      return {
        data: buffer.data,
        toString: function toString() {
          return 'Commit Transaction: name=' + _this2.name;
        }
      };
    }
  }, {
    key: 'rollbackPayload',
    value: function rollbackPayload(txnDescriptor) {
      var _this3 = this;

      var buffer = new WritableTrackingBuffer(100, 'ascii');
      writeAllHeaders(buffer, txnDescriptor, this.outstandingRequestCount);
      buffer.writeUShort(OPERATION_TYPE.TM_ROLLBACK_XACT);
      buffer.writeUInt8(this.name.length * 2);
      buffer.writeString(this.name, 'ucs2');
      // No fBeginXact flag, so no new transaction is started.
      buffer.writeUInt8(0);

      return {
        data: buffer.data,
        toString: function toString() {
          return 'Rollback Transaction: name=' + _this3.name;
        }
      };
    }
  }, {
    key: 'savePayload',
    value: function savePayload(txnDescriptor) {
      var _this4 = this;

      var buffer = new WritableTrackingBuffer(100, 'ascii');
      writeAllHeaders(buffer, txnDescriptor, this.outstandingRequestCount);
      buffer.writeUShort(OPERATION_TYPE.TM_SAVE_XACT);
      buffer.writeUInt8(this.name.length * 2);
      buffer.writeString(this.name, 'ucs2');

      return {
        data: buffer.data,
        toString: function toString() {
          return 'Save Transaction: name=' + _this4.name;
        }
      };
    }
  }, {
    key: 'isolationLevelToTSQL',
    value: function isolationLevelToTSQL() {
      switch (this.isolationLevel) {
        case ISOLATION_LEVEL.READ_UNCOMMITTED:
          return 'READ UNCOMMITTED';
        case ISOLATION_LEVEL.READ_COMMITTED:
          return 'READ COMMITTED';
        case ISOLATION_LEVEL.REPEATABLE_READ:
          return 'REPEATABLE READ';
        case ISOLATION_LEVEL.SERIALIZABLE:
          return 'SERIALIZABLE';
        case ISOLATION_LEVEL.SNAPSHOT:
          return 'SNAPSHOT';
      }
      return '';
    }
  }]);
  return Transaction;
}();

module.exports.Transaction = Transaction;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var iconv = __webpack_require__(470);
var sprintf = __webpack_require__(72).sprintf;
var TYPE = __webpack_require__(91).TYPE;
var guidParser = __webpack_require__(202);

var readPrecision = __webpack_require__(74).readPrecision;
var readScale = __webpack_require__(74).readScale;
var readCollation = __webpack_require__(74).readCollation;
var convertLEBytesToString = __webpack_require__(139).convertLEBytesToString;

var NULL = (1 << 16) - 1;
var MAX = (1 << 16) - 1;
var THREE_AND_A_THIRD = 3 + 1 / 3;
var MONEY_DIVISOR = 10000;
var PLP_NULL = new Buffer([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]);
var UNKNOWN_PLP_LEN = new Buffer([0xFE, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]);
var DEFAULT_ENCODING = 'utf8';

function readTextPointerNull(parser, type, callback) {
  if (type.hasTextPointerAndTimestamp) {
    parser.readUInt8(function (textPointerLength) {
      if (textPointerLength !== 0) {
        // Appear to be dummy values, so consume and discard them.
        parser.readBuffer(textPointerLength, function () {
          parser.readBuffer(8, function () {
            callback(undefined);
          });
        });
      } else {
        callback(true);
      }
    });
  } else {
    callback(undefined);
  }
}

function readDataLength(parser, type, metaData, textPointerNull, callback) {
  if (textPointerNull) {
    return callback(0);
  }

  if (metaData.isVariantValue) {
    return callback(metaData.dataLength);
  }

  // s2.2.4.2.1
  switch (type.id & 0x30) {
    case 0x10:
      // xx01xxxx - s2.2.4.2.1.1
      return callback(0);

    case 0x20:
      // xx10xxxx - s2.2.4.2.1.3
      // Variable length
      if (metaData.dataLength !== MAX) {
        switch (type.dataLengthLength) {
          case 0:
            return callback(undefined);

          case 1:
            return parser.readUInt8(callback);

          case 2:
            return parser.readUInt16LE(callback);

          case 4:
            return parser.readUInt32LE(callback);

          default:
            return parser.emit('error', new Error('Unsupported dataLengthLength ' + type.dataLengthLength + ' for data type ' + type.name));
        }
      } else {
        return callback(undefined);
      }

    case 0x30:
      return callback(1 << ((type.id & 0x0C) >> 2));
  }
}

module.exports = valueParse;
function valueParse(parser, metaData, options, callback) {
  var type = metaData.type;

  readTextPointerNull(parser, type, function (textPointerNull) {
    readDataLength(parser, type, metaData, textPointerNull, function (dataLength) {
      switch (type.name) {
        case 'Null':
          return callback(null);

        case 'TinyInt':
          return parser.readUInt8(callback);

        case 'Int':
          return parser.readInt32LE(callback);

        case 'SmallInt':
          return parser.readInt16LE(callback);

        case 'BigInt':
          return parser.readBuffer(8, function (buffer) {
            callback(convertLEBytesToString(buffer));
          });

        case 'IntN':
          switch (dataLength) {
            case 0:
              return callback(null);
            case 1:
              return parser.readUInt8(callback);
            case 2:
              return parser.readInt16LE(callback);
            case 4:
              return parser.readInt32LE(callback);
            case 8:
              return parser.readBuffer(8, function (buffer) {
                callback(convertLEBytesToString(buffer));
              });

            default:
              return parser.emit('error', new Error('Unsupported dataLength ' + dataLength + ' for IntN'));
          }

        case 'Real':
          return parser.readFloatLE(callback);

        case 'Float':
          return parser.readDoubleLE(callback);

        case 'FloatN':
          switch (dataLength) {
            case 0:
              return callback(null);
            case 4:
              return parser.readFloatLE(callback);
            case 8:
              return parser.readDoubleLE(callback);

            default:
              return parser.emit('error', new Error('Unsupported dataLength ' + dataLength + ' for FloatN'));
          }

        case 'Money':
        case 'SmallMoney':
        case 'MoneyN':
          switch (dataLength) {
            case 0:
              return callback(null);
            case 4:
              return parser.readInt32LE(function (value) {
                callback(value / MONEY_DIVISOR);
              });
            case 8:
              return parser.readInt32LE(function (high) {
                parser.readUInt32LE(function (low) {
                  callback((low + 0x100000000 * high) / MONEY_DIVISOR);
                });
              });

            default:
              return parser.emit('error', new Error('Unsupported dataLength ' + dataLength + ' for MoneyN'));
          }

        case 'Bit':
          return parser.readUInt8(function (value) {
            callback(!!value);
          });

        case 'BitN':
          switch (dataLength) {
            case 0:
              return callback(null);
            case 1:
              return parser.readUInt8(function (value) {
                callback(!!value);
              });
          }

        case 'VarChar':
        case 'Char':
          var codepage = metaData.collation.codepage;
          if (metaData.dataLength === MAX) {
            return readMaxChars(parser, codepage, callback);
          } else {
            return readChars(parser, dataLength, codepage, callback);
          }

        case 'NVarChar':
        case 'NChar':
          if (metaData.dataLength === MAX) {
            return readMaxNChars(parser, callback);
          } else {
            return readNChars(parser, dataLength, callback);
          }

        case 'VarBinary':
        case 'Binary':
          if (metaData.dataLength === MAX) {
            return readMaxBinary(parser, callback);
          } else {
            return readBinary(parser, dataLength, callback);
          }

        case 'Text':
          if (textPointerNull) {
            return callback(null);
          } else {
            return readChars(parser, dataLength, metaData.collation.codepage, callback);
          }

        case 'NText':
          if (textPointerNull) {
            return callback(null);
          } else {
            return readNChars(parser, dataLength, callback);
          }

        case 'Image':
          if (textPointerNull) {
            return callback(null);
          } else {
            return readBinary(parser, dataLength, callback);
          }

        case 'Xml':
          return readMaxNChars(parser, callback);

        case 'SmallDateTime':
          return readSmallDateTime(parser, options.useUTC, callback);

        case 'DateTime':
          return readDateTime(parser, options.useUTC, callback);

        case 'DateTimeN':
          switch (dataLength) {
            case 0:
              return callback(null);
            case 4:
              return readSmallDateTime(parser, options.useUTC, callback);
            case 8:
              return readDateTime(parser, options.useUTC, callback);
          }

        case 'TimeN':
          if (dataLength === 0) {
            return callback(null);
          } else {
            return readTime(parser, dataLength, metaData.scale, options.useUTC, callback);
          }

        case 'DateN':
          if (dataLength === 0) {
            return callback(null);
          } else {
            return readDate(parser, options.useUTC, callback);
          }

        case 'DateTime2N':
          if (dataLength === 0) {
            return callback(null);
          } else {
            return readDateTime2(parser, dataLength, metaData.scale, options.useUTC, callback);
          }

        case 'DateTimeOffsetN':
          if (dataLength === 0) {
            return callback(null);
          } else {
            return readDateTimeOffset(parser, dataLength, metaData.scale, callback);
          }

        case 'NumericN':
        case 'DecimalN':
          if (dataLength === 0) {
            return callback(null);
          } else {
            return parser.readUInt8(function (sign) {
              sign = sign === 1 ? 1 : -1;

              var readValue = void 0;
              switch (dataLength - 1) {
                case 4:
                  readValue = parser.readUInt32LE;
                  break;
                case 8:
                  readValue = parser.readUNumeric64LE;
                  break;
                case 12:
                  readValue = parser.readUNumeric96LE;
                  break;
                case 16:
                  readValue = parser.readUNumeric128LE;
                  break;
                default:
                  return parser.emit('error', new Error(sprintf('Unsupported numeric size %d', dataLength - 1)));
              }

              readValue.call(parser, function (value) {
                callback(value * sign / Math.pow(10, metaData.scale));
              });
            });
          }

        case 'UniqueIdentifierN':
          switch (dataLength) {
            case 0:
              return callback(null);
            case 0x10:
              return parser.readBuffer(0x10, function (data) {
                callback(guidParser.arrayToGuid(data));
              });

            default:
              return parser.emit('error', new Error(sprintf('Unsupported guid size %d', dataLength - 1)));
          }

        case 'UDT':
          return readMaxBinary(parser, callback);

        case 'Variant':
          if (dataLength === 0) {
            return callback(null);
          }

          var valueMetaData = metaData.valueMetaData = {};
          Object.defineProperty(valueMetaData, 'isVariantValue', { value: true });
          return parser.readUInt8(function (baseType) {
            return parser.readUInt8(function (propBytes) {
              valueMetaData.dataLength = dataLength - propBytes - 2;
              valueMetaData.type = TYPE[baseType];
              return readPrecision(parser, valueMetaData.type, function (precision) {
                valueMetaData.precision = precision;
                return readScale(parser, valueMetaData.type, function (scale) {
                  valueMetaData.scale = scale;
                  return readCollation(parser, valueMetaData.type, function (collation) {
                    valueMetaData.collation = collation;
                    if (baseType === 0xA5 || baseType === 0xAD || baseType === 0xA7 || baseType === 0xAF || baseType === 0xE7 || baseType === 0xEF) {
                      return readDataLength(parser, valueMetaData.type, {}, null, function (maxDataLength) {
                        valueMetaData.dataLength = maxDataLength;
                        return valueParse(parser, valueMetaData, options, callback);
                      });
                    } else {
                      return valueParse(parser, valueMetaData, options, callback);
                    }
                  });
                });
              });
            });
          });

        default:
          return parser.emit('error', new Error(sprintf('Unrecognised type %s', type.name)));
      }
    });
  });
}

function readBinary(parser, dataLength, callback) {
  if (dataLength === NULL) {
    return callback(null);
  } else {
    return parser.readBuffer(dataLength, callback);
  }
}

function readChars(parser, dataLength, codepage, callback) {
  if (codepage == null) {
    codepage = DEFAULT_ENCODING;
  }

  if (dataLength === NULL) {
    return callback(null);
  } else {
    return parser.readBuffer(dataLength, function (data) {
      callback(iconv.decode(data, codepage));
    });
  }
}

function readNChars(parser, dataLength, callback) {
  if (dataLength === NULL) {
    return callback(null);
  } else {
    return parser.readBuffer(dataLength, function (data) {
      callback(data.toString('ucs2'));
    });
  }
}

function readMaxBinary(parser, callback) {
  return readMax(parser, callback);
}

function readMaxChars(parser, codepage, callback) {
  if (codepage == null) {
    codepage = DEFAULT_ENCODING;
  }

  readMax(parser, function (data) {
    if (data) {
      callback(iconv.decode(data, codepage));
    } else {
      callback(null);
    }
  });
}

function readMaxNChars(parser, callback) {
  readMax(parser, function (data) {
    if (data) {
      callback(data.toString('ucs2'));
    } else {
      callback(null);
    }
  });
}

function readMax(parser, callback) {
  parser.readBuffer(8, function (type) {
    if (type.equals(PLP_NULL)) {
      return callback(null);
    } else if (type.equals(UNKNOWN_PLP_LEN)) {
      return readMaxUnknownLength(parser, callback);
    } else {
      var low = type.readUInt32LE(0);
      var high = type.readUInt32LE(4);

      if (high >= 2 << 53 - 32) {
        console.warn('Read UInt64LE > 53 bits : high=' + high + ', low=' + low);
      }

      var expectedLength = low + 0x100000000 * high;
      return readMaxKnownLength(parser, expectedLength, callback);
    }
  });
}

function readMaxKnownLength(parser, totalLength, callback) {
  var data = new Buffer(totalLength);

  var offset = 0;
  function next(done) {
    parser.readUInt32LE(function (chunkLength) {
      if (!chunkLength) {
        return done();
      }

      parser.readBuffer(chunkLength, function (chunk) {
        chunk.copy(data, offset);
        offset += chunkLength;

        next(done);
      });
    });
  }

  next(function () {
    if (offset !== totalLength) {
      parser.emit('error', new Error('Partially Length-prefixed Bytes unmatched lengths : expected ' + totalLength + ', but got ' + offset + ' bytes'));
    }

    callback(data);
  });
}

function readMaxUnknownLength(parser, callback) {
  var chunks = [];

  var length = 0;
  function next(done) {
    parser.readUInt32LE(function (chunkLength) {
      if (!chunkLength) {
        return done();
      }

      parser.readBuffer(chunkLength, function (chunk) {
        chunks.push(chunk);
        length += chunkLength;

        next(done);
      });
    });
  }

  next(function () {
    callback(Buffer.concat(chunks, length));
  });
}

function readSmallDateTime(parser, useUTC, callback) {
  parser.readUInt16LE(function (days) {
    parser.readUInt16LE(function (minutes) {
      var value = void 0;
      if (useUTC) {
        value = new Date(Date.UTC(1900, 0, 1));
        value.setUTCDate(value.getUTCDate() + days);
        value.setUTCMinutes(value.getUTCMinutes() + minutes);
      } else {
        value = new Date(1900, 0, 1);
        value.setDate(value.getDate() + days);
        value.setMinutes(value.getMinutes() + minutes);
      }
      callback(value);
    });
  });
}

function readDateTime(parser, useUTC, callback) {
  parser.readInt32LE(function (days) {
    parser.readUInt32LE(function (threeHundredthsOfSecond) {
      var milliseconds = Math.round(threeHundredthsOfSecond * THREE_AND_A_THIRD);

      var value = void 0;
      if (useUTC) {
        value = new Date(Date.UTC(1900, 0, 1));
        value.setUTCDate(value.getUTCDate() + days);
        value.setUTCMilliseconds(value.getUTCMilliseconds() + milliseconds);
      } else {
        value = new Date(1900, 0, 1);
        value.setDate(value.getDate() + days);
        value.setMilliseconds(value.getMilliseconds() + milliseconds);
      }

      callback(value);
    });
  });
}

function readTime(parser, dataLength, scale, useUTC, callback) {
  var readValue = void 0;
  switch (dataLength) {
    case 3:
      readValue = parser.readUInt24LE;
      break;
    case 4:
      readValue = parser.readUInt32LE;
      break;
    case 5:
      readValue = parser.readUInt40LE;
  }

  readValue.call(parser, function (value) {
    if (scale < 7) {
      for (var i = scale; i < 7; i++) {
        value *= 10;
      }
    }

    var date = void 0;
    if (useUTC) {
      date = new Date(Date.UTC(1970, 0, 1, 0, 0, 0, value / 10000));
    } else {
      date = new Date(1970, 0, 1, 0, 0, 0, value / 10000);
    }
    Object.defineProperty(date, 'nanosecondsDelta', {
      enumerable: false,
      value: value % 10000 / Math.pow(10, 7)
    });
    callback(date);
  });
}

function readDate(parser, useUTC, callback) {
  parser.readUInt24LE(function (days) {
    if (useUTC) {
      callback(new Date(Date.UTC(2000, 0, days - 730118)));
    } else {
      callback(new Date(2000, 0, days - 730118));
    }
  });
}

function readDateTime2(parser, dataLength, scale, useUTC, callback) {
  readTime(parser, dataLength - 3, scale, useUTC, function (time) {
    parser.readUInt24LE(function (days) {
      var date = void 0;
      if (useUTC) {
        date = new Date(Date.UTC(2000, 0, days - 730118, 0, 0, 0, +time));
      } else {
        date = new Date(2000, 0, days - 730118, time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
      }
      Object.defineProperty(date, 'nanosecondsDelta', {
        enumerable: false,
        value: time.nanosecondsDelta
      });
      callback(date);
    });
  });
}

function readDateTimeOffset(parser, dataLength, scale, callback) {
  readTime(parser, dataLength - 5, scale, true, function (time) {
    parser.readUInt24LE(function (days) {
      // offset
      parser.readInt16LE(function () {
        var date = new Date(Date.UTC(2000, 0, days - 730118, 0, 0, 0, +time));
        Object.defineProperty(date, 'nanosecondsDelta', {
          enumerable: false,
          value: time.nanosecondsDelta
        });
        callback(date);
      });
    });
  });
}

/***/ }),
/* 142 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 143 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(219), __esModule: true };

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(215);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(214);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 146 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(225);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(66)
  , document = __webpack_require__(33).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(41) && !__webpack_require__(65)(function(){
  return Object.defineProperty(__webpack_require__(148)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(98)
  , $export        = __webpack_require__(54)
  , redefine       = __webpack_require__(156)
  , hide           = __webpack_require__(55)
  , has            = __webpack_require__(42)
  , Iterators      = __webpack_require__(97)
  , $iterCreate    = __webpack_require__(232)
  , setToStringTag = __webpack_require__(101)
  , getPrototypeOf = __webpack_require__(154)
  , ITERATOR       = __webpack_require__(56)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(100)
  , createDesc     = __webpack_require__(78)
  , toIObject      = __webpack_require__(44)
  , toPrimitive    = __webpack_require__(105)
  , has            = __webpack_require__(42)
  , IE8_DOM_DEFINE = __webpack_require__(149)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(41) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(155)
  , hiddenKeys = __webpack_require__(96).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 153 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(42)
  , toObject    = __webpack_require__(157)
  , IE_PROTO    = __webpack_require__(102)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(42)
  , toIObject    = __webpack_require__(44)
  , arrayIndexOf = __webpack_require__(227)(false)
  , IE_PROTO     = __webpack_require__(102)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(55);

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(95);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(21);
module.exports = function(it, msg){
  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
  return +it;
};

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(11)
  , toIndex  = __webpack_require__(52)
  , toLength = __webpack_require__(10);

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(58);

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(14)
  , toObject  = __webpack_require__(11)
  , IObject   = __webpack_require__(68)
  , toLength  = __webpack_require__(10);

module.exports = function(that, callbackfn, aLen, memo, isRight){
  aFunction(callbackfn);
  var O      = toObject(that)
    , self   = IObject(O)
    , length = toLength(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction  = __webpack_require__(14)
  , isObject   = __webpack_require__(4)
  , invoke     = __webpack_require__(84)
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP          = __webpack_require__(7).f
  , create      = __webpack_require__(47)
  , redefineAll = __webpack_require__(50)
  , ctx         = __webpack_require__(28)
  , anInstance  = __webpack_require__(45)
  , defined     = __webpack_require__(22)
  , forOf       = __webpack_require__(58)
  , $iterDefine = __webpack_require__(118)
  , step        = __webpack_require__(169)
  , setSpecies  = __webpack_require__(51)
  , DESCRIPTORS = __webpack_require__(6)
  , fastKey     = __webpack_require__(34).fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(67)
  , from    = __webpack_require__(160);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll       = __webpack_require__(50)
  , getWeak           = __webpack_require__(34).getWeak
  , anObject          = __webpack_require__(1)
  , isObject          = __webpack_require__(4)
  , anInstance        = __webpack_require__(45)
  , forOf             = __webpack_require__(58)
  , createArrayMethod = __webpack_require__(24)
  , $has              = __webpack_require__(13)
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(3)(function(){
  return Object.defineProperty(__webpack_require__(110)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4)
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 169 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 170 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(49)
  , gOPS     = __webpack_require__(88)
  , pIE      = __webpack_require__(69)
  , toObject = __webpack_require__(11)
  , IObject  = __webpack_require__(68)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(7)
  , anObject = __webpack_require__(1)
  , getKeys  = __webpack_require__(49);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(18)
  , gOPN      = __webpack_require__(48).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(13)
  , toIObject    = __webpack_require__(18)
  , arrayIndexOf = __webpack_require__(80)(false)
  , IE_PROTO     = __webpack_require__(123)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(49)
  , toIObject = __webpack_require__(18)
  , isEnum    = __webpack_require__(69).f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN     = __webpack_require__(48)
  , gOPS     = __webpack_require__(88)
  , anObject = __webpack_require__(1)
  , Reflect  = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat
  , $trim       = __webpack_require__(61).trim;

module.exports = 1 / $parseFloat(__webpack_require__(128) + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt
  , $trim     = __webpack_require__(61).trim
  , ws        = __webpack_require__(128)
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

/***/ }),
/* 179 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(10)
  , repeat   = __webpack_require__(127)
  , defined  = __webpack_require__(22);

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength || fillStr == '')return S;
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(163);

// 23.1 Map Objects
module.exports = __webpack_require__(81)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if(__webpack_require__(6) && /./g.flags != 'g')__webpack_require__(7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(83)
});

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(163);

// 23.2 Set Objects
module.exports = __webpack_require__(81)('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each         = __webpack_require__(24)(0)
  , redefine     = __webpack_require__(16)
  , meta         = __webpack_require__(34)
  , assign       = __webpack_require__(171)
  , weak         = __webpack_require__(165)
  , isObject     = __webpack_require__(4)
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(81)('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(474);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process !== 'undefined' && process.type === 'renderer') {
  module.exports = __webpack_require__(434);
} else {
  module.exports = __webpack_require__(435);
}


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This is apparently a bit like a Jquery deferred, hence the name
 */

class Deferred {

  constructor (Promise) {
    this._state = Deferred.PENDING
    this._resolve = undefined
    this._reject = undefined

    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
  }

  get state () {
    return this._state
  }

  get promise () {
    return this._promise
  }

  reject (reason) {
    if (this._state !== Deferred.PENDING) {
      return
    }
    this._state = Deferred.REJECTED
    this._reject(reason)
  }

  resolve (value) {
    if (this._state !== Deferred.PENDING) {
      return
    }
    this._state = Deferred.FULFILLED
    this._resolve(value)
  }
}

// TODO: should these really live here? or be a seperate 'state' enum
Deferred.PENDING = 'PENDING'
Deferred.FULFILLED = 'FULFILLED'
Deferred.REJECTED = 'REJECTED'

module.exports = Deferred


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DoublyLinkedList = __webpack_require__(190)
const DequeIterator = __webpack_require__(440)
/**
 * DoublyLinkedList backed double ended queue
 * implements just enough to keep the Pool
 */
class Deque {
  constructor () {
    this._list = new DoublyLinkedList()
  }

  /**
   * removes and returns the first element from the queue
   * @return {[type]} [description]
   */
  shift () {
    if (this._length === 0) {
      return undefined
    }

    const node = this._list.head
    this._list.remove(node)

    return node.data
  }

  /**
   * adds one elemts to the beginning of the queue
   * @param  {[type]} element [description]
   * @return {[type]}         [description]
   */
  unshift (element) {
    const node = DoublyLinkedList.createNode(element)

    this._list.insertBeginning(node)
  }

  /**
   * adds one to the end of the queue
   * @param  {[type]} element [description]
   * @return {[type]}         [description]
   */
  push (element) {
    const node = DoublyLinkedList.createNode(element)

    this._list.insertEnd(node)
  }

  /**
   * removes and returns the last element from the queue
   */
  pop () {
    if (this._length === 0) {
      return undefined
    }

    const node = this._list.tail
    this._list.remove(node)

    return node.data
  }

  [Symbol.iterator] () {
    return new DequeIterator(this._list)
  }

  iterator () {
    return new DequeIterator(this._list)
  }

  reverseIterator () {
    return new DequeIterator(this._list, true)
  }

  /**
   * get a reference to the item at the head of the queue
   * @return {element} [description]
   */
  get head () {
    if (this._list.length === 0) {
      return undefined
    }
    const node = this._list.head
    return node.data
  }

  /**
   * get a reference to the item at the tail of the queue
   * @return {element} [description]
   */
  get tail () {
    if (this._list.length === 0) {
      return undefined
    }
    const node = this._list.tail
    return node.data
  }

  get length () {
    return this._list.length
  }
}

module.exports = Deque


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A Doubly Linked List, because there aren't enough in the world...
 * this is pretty much a direct JS port of the one wikipedia
 * https://en.wikipedia.org/wiki/Doubly_linked_list
 *
 * For most usage 'insertBeginning' and 'insertEnd' should be enough
 *
 * nodes are expected to something like a POJSO like
 * {
 *   prev: null,
 *   next: null,
 *   something: 'whatever you like'
 * }
 */
class DoublyLinkedList {
  constructor () {
    this.head = null
    this.tail = null
    this.length = 0
  }

  insertBeginning (node) {
    if (this.head === null) {
      this.head = node
      this.tail = node
      node.prev = null
      node.next = null
      this.length++
    } else {
      this.insertBefore(this.head, node)
    }
  }

  insertEnd (node) {
    if (this.tail === null) {
      this.insertBeginning(node)
    } else {
      this.insertAfter(this.tail, node)
    }
  }

  insertAfter (node, newNode) {
    newNode.prev = node
    newNode.next = node.next
    if (node.next === null) {
      this.tail = newNode
    } else {
      node.next.prev = newNode
    }
    node.next = newNode
    this.length++
  }

  insertBefore (node, newNode) {
    newNode.prev = node.prev
    newNode.next = node
    if (node.prev === null) {
      this.head = newNode
    } else {
      node.prev.next = newNode
    }
    node.prev = newNode
    this.length++
  }

  remove (node) {
    if (node.prev === null) {
      this.head = node.next
    } else {
      node.prev.next = node.next
    }
    if (node.next === null) {
      this.tail = node.prev
    } else {
      node.next.prev = node.prev
    }
    node.prev = null
    node.next = null
    this.length--
  }

  // FIXME: this should not live here and has become a dumping ground...
  static createNode (data) {
    return {
      prev: null,
      next: null,
      data: data
    }
  }
}

module.exports = DoublyLinkedList


/***/ }),
/* 191 */
/***/ (function(module, exports) {

module.exports = [
	[
		"0",
		"\u0000",
		127
	],
	[
		"a140",
		"　，、。．‧；：？！︰…‥﹐﹑﹒·﹔﹕﹖﹗｜–︱—︳╴︴﹏（）︵︶｛｝︷︸〔〕︹︺【】︻︼《》︽︾〈〉︿﹀「」﹁﹂『』﹃﹄﹙﹚"
	],
	[
		"a1a1",
		"﹛﹜﹝﹞‘’“”〝〞‵′＃＆＊※§〃○●△▲◎☆★◇◆□■▽▼㊣℅¯￣＿ˍ﹉﹊﹍﹎﹋﹌﹟﹠﹡＋－×÷±√＜＞＝≦≧≠∞≒≡﹢",
		4,
		"～∩∪⊥∠∟⊿㏒㏑∫∮∵∴♀♂⊕⊙↑↓←→↖↗↙↘∥∣／"
	],
	[
		"a240",
		"＼∕﹨＄￥〒￠￡％＠℃℉﹩﹪﹫㏕㎜㎝㎞㏎㎡㎎㎏㏄°兙兛兞兝兡兣嗧瓩糎▁",
		7,
		"▏▎▍▌▋▊▉┼┴┬┤├▔─│▕┌┐└┘╭"
	],
	[
		"a2a1",
		"╮╰╯═╞╪╡◢◣◥◤╱╲╳０",
		9,
		"Ⅰ",
		9,
		"〡",
		8,
		"十卄卅Ａ",
		25,
		"ａ",
		21
	],
	[
		"a340",
		"ｗｘｙｚΑ",
		16,
		"Σ",
		6,
		"α",
		16,
		"σ",
		6,
		"ㄅ",
		10
	],
	[
		"a3a1",
		"ㄐ",
		25,
		"˙ˉˊˇˋ"
	],
	[
		"a3e1",
		"€"
	],
	[
		"a440",
		"一乙丁七乃九了二人儿入八几刀刁力匕十卜又三下丈上丫丸凡久么也乞于亡兀刃勺千叉口土士夕大女子孑孓寸小尢尸山川工己已巳巾干廾弋弓才"
	],
	[
		"a4a1",
		"丑丐不中丰丹之尹予云井互五亢仁什仃仆仇仍今介仄元允內六兮公冗凶分切刈勻勾勿化匹午升卅卞厄友及反壬天夫太夭孔少尤尺屯巴幻廿弔引心戈戶手扎支文斗斤方日曰月木欠止歹毋比毛氏水火爪父爻片牙牛犬王丙"
	],
	[
		"a540",
		"世丕且丘主乍乏乎以付仔仕他仗代令仙仞充兄冉冊冬凹出凸刊加功包匆北匝仟半卉卡占卯卮去可古右召叮叩叨叼司叵叫另只史叱台句叭叻四囚外"
	],
	[
		"a5a1",
		"央失奴奶孕它尼巨巧左市布平幼弁弘弗必戊打扔扒扑斥旦朮本未末札正母民氐永汁汀氾犯玄玉瓜瓦甘生用甩田由甲申疋白皮皿目矛矢石示禾穴立丞丟乒乓乩亙交亦亥仿伉伙伊伕伍伐休伏仲件任仰仳份企伋光兇兆先全"
	],
	[
		"a640",
		"共再冰列刑划刎刖劣匈匡匠印危吉吏同吊吐吁吋各向名合吃后吆吒因回囝圳地在圭圬圯圩夙多夷夸妄奸妃好她如妁字存宇守宅安寺尖屹州帆并年"
	],
	[
		"a6a1",
		"式弛忙忖戎戌戍成扣扛托收早旨旬旭曲曳有朽朴朱朵次此死氖汝汗汙江池汐汕污汛汍汎灰牟牝百竹米糸缶羊羽老考而耒耳聿肉肋肌臣自至臼舌舛舟艮色艾虫血行衣西阡串亨位住佇佗佞伴佛何估佐佑伽伺伸佃佔似但佣"
	],
	[
		"a740",
		"作你伯低伶余佝佈佚兌克免兵冶冷別判利刪刨劫助努劬匣即卵吝吭吞吾否呎吧呆呃吳呈呂君吩告吹吻吸吮吵吶吠吼呀吱含吟听囪困囤囫坊坑址坍"
	],
	[
		"a7a1",
		"均坎圾坐坏圻壯夾妝妒妨妞妣妙妖妍妤妓妊妥孝孜孚孛完宋宏尬局屁尿尾岐岑岔岌巫希序庇床廷弄弟彤形彷役忘忌志忍忱快忸忪戒我抄抗抖技扶抉扭把扼找批扳抒扯折扮投抓抑抆改攻攸旱更束李杏材村杜杖杞杉杆杠"
	],
	[
		"a840",
		"杓杗步每求汞沙沁沈沉沅沛汪決沐汰沌汨沖沒汽沃汲汾汴沆汶沍沔沘沂灶灼災灸牢牡牠狄狂玖甬甫男甸皂盯矣私秀禿究系罕肖肓肝肘肛肚育良芒"
	],
	[
		"a8a1",
		"芋芍見角言谷豆豕貝赤走足身車辛辰迂迆迅迄巡邑邢邪邦那酉釆里防阮阱阪阬並乖乳事些亞享京佯依侍佳使佬供例來侃佰併侈佩佻侖佾侏侑佺兔兒兕兩具其典冽函刻券刷刺到刮制剁劾劻卒協卓卑卦卷卸卹取叔受味呵"
	],
	[
		"a940",
		"咖呸咕咀呻呷咄咒咆呼咐呱呶和咚呢周咋命咎固垃坷坪坩坡坦坤坼夜奉奇奈奄奔妾妻委妹妮姑姆姐姍始姓姊妯妳姒姅孟孤季宗定官宜宙宛尚屈居"
	],
	[
		"a9a1",
		"屆岷岡岸岩岫岱岳帘帚帖帕帛帑幸庚店府底庖延弦弧弩往征彿彼忝忠忽念忿怏怔怯怵怖怪怕怡性怩怫怛或戕房戾所承拉拌拄抿拂抹拒招披拓拔拋拈抨抽押拐拙拇拍抵拚抱拘拖拗拆抬拎放斧於旺昔易昌昆昂明昀昏昕昊"
	],
	[
		"aa40",
		"昇服朋杭枋枕東果杳杷枇枝林杯杰板枉松析杵枚枓杼杪杲欣武歧歿氓氛泣注泳沱泌泥河沽沾沼波沫法泓沸泄油況沮泗泅泱沿治泡泛泊沬泯泜泖泠"
	],
	[
		"aaa1",
		"炕炎炒炊炙爬爭爸版牧物狀狎狙狗狐玩玨玟玫玥甽疝疙疚的盂盲直知矽社祀祁秉秈空穹竺糾罔羌羋者肺肥肢肱股肫肩肴肪肯臥臾舍芳芝芙芭芽芟芹花芬芥芯芸芣芰芾芷虎虱初表軋迎返近邵邸邱邶采金長門阜陀阿阻附"
	],
	[
		"ab40",
		"陂隹雨青非亟亭亮信侵侯便俠俑俏保促侶俘俟俊俗侮俐俄係俚俎俞侷兗冒冑冠剎剃削前剌剋則勇勉勃勁匍南卻厚叛咬哀咨哎哉咸咦咳哇哂咽咪品"
	],
	[
		"aba1",
		"哄哈咯咫咱咻咩咧咿囿垂型垠垣垢城垮垓奕契奏奎奐姜姘姿姣姨娃姥姪姚姦威姻孩宣宦室客宥封屎屏屍屋峙峒巷帝帥帟幽庠度建弈弭彥很待徊律徇後徉怒思怠急怎怨恍恰恨恢恆恃恬恫恪恤扁拜挖按拼拭持拮拽指拱拷"
	],
	[
		"ac40",
		"拯括拾拴挑挂政故斫施既春昭映昧是星昨昱昤曷柿染柱柔某柬架枯柵柩柯柄柑枴柚查枸柏柞柳枰柙柢柝柒歪殃殆段毒毗氟泉洋洲洪流津洌洱洞洗"
	],
	[
		"aca1",
		"活洽派洶洛泵洹洧洸洩洮洵洎洫炫為炳炬炯炭炸炮炤爰牲牯牴狩狠狡玷珊玻玲珍珀玳甚甭畏界畎畋疫疤疥疢疣癸皆皇皈盈盆盃盅省盹相眉看盾盼眇矜砂研砌砍祆祉祈祇禹禺科秒秋穿突竿竽籽紂紅紀紉紇約紆缸美羿耄"
	],
	[
		"ad40",
		"耐耍耑耶胖胥胚胃胄背胡胛胎胞胤胝致舢苧范茅苣苛苦茄若茂茉苒苗英茁苜苔苑苞苓苟苯茆虐虹虻虺衍衫要觔計訂訃貞負赴赳趴軍軌述迦迢迪迥"
	],
	[
		"ada1",
		"迭迫迤迨郊郎郁郃酋酊重閂限陋陌降面革韋韭音頁風飛食首香乘亳倌倍倣俯倦倥俸倩倖倆值借倚倒們俺倀倔倨俱倡個候倘俳修倭倪俾倫倉兼冤冥冢凍凌准凋剖剜剔剛剝匪卿原厝叟哨唐唁唷哼哥哲唆哺唔哩哭員唉哮哪"
	],
	[
		"ae40",
		"哦唧唇哽唏圃圄埂埔埋埃堉夏套奘奚娑娘娜娟娛娓姬娠娣娩娥娌娉孫屘宰害家宴宮宵容宸射屑展屐峭峽峻峪峨峰島崁峴差席師庫庭座弱徒徑徐恙"
	],
	[
		"aea1",
		"恣恥恐恕恭恩息悄悟悚悍悔悌悅悖扇拳挈拿捎挾振捕捂捆捏捉挺捐挽挪挫挨捍捌效敉料旁旅時晉晏晃晒晌晅晁書朔朕朗校核案框桓根桂桔栩梳栗桌桑栽柴桐桀格桃株桅栓栘桁殊殉殷氣氧氨氦氤泰浪涕消涇浦浸海浙涓"
	],
	[
		"af40",
		"浬涉浮浚浴浩涌涊浹涅浥涔烊烘烤烙烈烏爹特狼狹狽狸狷玆班琉珮珠珪珞畔畝畜畚留疾病症疲疳疽疼疹痂疸皋皰益盍盎眩真眠眨矩砰砧砸砝破砷"
	],
	[
		"afa1",
		"砥砭砠砟砲祕祐祠祟祖神祝祗祚秤秣秧租秦秩秘窄窈站笆笑粉紡紗紋紊素索純紐紕級紜納紙紛缺罟羔翅翁耆耘耕耙耗耽耿胱脂胰脅胭胴脆胸胳脈能脊胼胯臭臬舀舐航舫舨般芻茫荒荔荊茸荐草茵茴荏茲茹茶茗荀茱茨荃"
	],
	[
		"b040",
		"虔蚊蚪蚓蚤蚩蚌蚣蚜衰衷袁袂衽衹記訐討訌訕訊託訓訖訏訑豈豺豹財貢起躬軒軔軏辱送逆迷退迺迴逃追逅迸邕郡郝郢酒配酌釘針釗釜釙閃院陣陡"
	],
	[
		"b0a1",
		"陛陝除陘陞隻飢馬骨高鬥鬲鬼乾偺偽停假偃偌做偉健偶偎偕偵側偷偏倏偯偭兜冕凰剪副勒務勘動匐匏匙匿區匾參曼商啪啦啄啞啡啃啊唱啖問啕唯啤唸售啜唬啣唳啁啗圈國圉域堅堊堆埠埤基堂堵執培夠奢娶婁婉婦婪婀"
	],
	[
		"b140",
		"娼婢婚婆婊孰寇寅寄寂宿密尉專將屠屜屝崇崆崎崛崖崢崑崩崔崙崤崧崗巢常帶帳帷康庸庶庵庾張強彗彬彩彫得徙從徘御徠徜恿患悉悠您惋悴惦悽"
	],
	[
		"b1a1",
		"情悻悵惜悼惘惕惆惟悸惚惇戚戛扈掠控捲掖探接捷捧掘措捱掩掉掃掛捫推掄授掙採掬排掏掀捻捩捨捺敝敖救教敗啟敏敘敕敔斜斛斬族旋旌旎晝晚晤晨晦晞曹勗望梁梯梢梓梵桿桶梱梧梗械梃棄梭梆梅梔條梨梟梡梂欲殺"
	],
	[
		"b240",
		"毫毬氫涎涼淳淙液淡淌淤添淺清淇淋涯淑涮淞淹涸混淵淅淒渚涵淚淫淘淪深淮淨淆淄涪淬涿淦烹焉焊烽烯爽牽犁猜猛猖猓猙率琅琊球理現琍瓠瓶"
	],
	[
		"b2a1",
		"瓷甜產略畦畢異疏痔痕疵痊痍皎盔盒盛眷眾眼眶眸眺硫硃硎祥票祭移窒窕笠笨笛第符笙笞笮粒粗粕絆絃統紮紹紼絀細紳組累終紲紱缽羞羚翌翎習耜聊聆脯脖脣脫脩脰脤舂舵舷舶船莎莞莘荸莢莖莽莫莒莊莓莉莠荷荻荼"
	],
	[
		"b340",
		"莆莧處彪蛇蛀蚶蛄蚵蛆蛋蚱蚯蛉術袞袈被袒袖袍袋覓規訪訝訣訥許設訟訛訢豉豚販責貫貨貪貧赧赦趾趺軛軟這逍通逗連速逝逐逕逞造透逢逖逛途"
	],
	[
		"b3a1",
		"部郭都酗野釵釦釣釧釭釩閉陪陵陳陸陰陴陶陷陬雀雪雩章竟頂頃魚鳥鹵鹿麥麻傢傍傅備傑傀傖傘傚最凱割剴創剩勞勝勛博厥啻喀喧啼喊喝喘喂喜喪喔喇喋喃喳單喟唾喲喚喻喬喱啾喉喫喙圍堯堪場堤堰報堡堝堠壹壺奠"
	],
	[
		"b440",
		"婷媚婿媒媛媧孳孱寒富寓寐尊尋就嵌嵐崴嵇巽幅帽幀幃幾廊廁廂廄弼彭復循徨惑惡悲悶惠愜愣惺愕惰惻惴慨惱愎惶愉愀愒戟扉掣掌描揀揩揉揆揍"
	],
	[
		"b4a1",
		"插揣提握揖揭揮捶援揪換摒揚揹敞敦敢散斑斐斯普晰晴晶景暑智晾晷曾替期朝棺棕棠棘棗椅棟棵森棧棹棒棲棣棋棍植椒椎棉棚楮棻款欺欽殘殖殼毯氮氯氬港游湔渡渲湧湊渠渥渣減湛湘渤湖湮渭渦湯渴湍渺測湃渝渾滋"
	],
	[
		"b540",
		"溉渙湎湣湄湲湩湟焙焚焦焰無然煮焜牌犄犀猶猥猴猩琺琪琳琢琥琵琶琴琯琛琦琨甥甦畫番痢痛痣痙痘痞痠登發皖皓皴盜睏短硝硬硯稍稈程稅稀窘"
	],
	[
		"b5a1",
		"窗窖童竣等策筆筐筒答筍筋筏筑粟粥絞結絨絕紫絮絲絡給絢絰絳善翔翕耋聒肅腕腔腋腑腎脹腆脾腌腓腴舒舜菩萃菸萍菠菅萋菁華菱菴著萊菰萌菌菽菲菊萸萎萄菜萇菔菟虛蛟蛙蛭蛔蛛蛤蛐蛞街裁裂袱覃視註詠評詞証詁"
	],
	[
		"b640",
		"詔詛詐詆訴診訶詖象貂貯貼貳貽賁費賀貴買貶貿貸越超趁跎距跋跚跑跌跛跆軻軸軼辜逮逵週逸進逶鄂郵鄉郾酣酥量鈔鈕鈣鈉鈞鈍鈐鈇鈑閔閏開閑"
	],
	[
		"b6a1",
		"間閒閎隊階隋陽隅隆隍陲隄雁雅雄集雇雯雲韌項順須飧飪飯飩飲飭馮馭黃黍黑亂傭債傲傳僅傾催傷傻傯僇剿剷剽募勦勤勢勣匯嗟嗨嗓嗦嗎嗜嗇嗑嗣嗤嗯嗚嗡嗅嗆嗥嗉園圓塞塑塘塗塚塔填塌塭塊塢塒塋奧嫁嫉嫌媾媽媼"
	],
	[
		"b740",
		"媳嫂媲嵩嵯幌幹廉廈弒彙徬微愚意慈感想愛惹愁愈慎慌慄慍愾愴愧愍愆愷戡戢搓搾搞搪搭搽搬搏搜搔損搶搖搗搆敬斟新暗暉暇暈暖暄暘暍會榔業"
	],
	[
		"b7a1",
		"楚楷楠楔極椰概楊楨楫楞楓楹榆楝楣楛歇歲毀殿毓毽溢溯滓溶滂源溝滇滅溥溘溼溺溫滑準溜滄滔溪溧溴煎煙煩煤煉照煜煬煦煌煥煞煆煨煖爺牒猷獅猿猾瑯瑚瑕瑟瑞瑁琿瑙瑛瑜當畸瘀痰瘁痲痱痺痿痴痳盞盟睛睫睦睞督"
	],
	[
		"b840",
		"睹睪睬睜睥睨睢矮碎碰碗碘碌碉硼碑碓硿祺祿禁萬禽稜稚稠稔稟稞窟窠筷節筠筮筧粱粳粵經絹綑綁綏絛置罩罪署義羨群聖聘肆肄腱腰腸腥腮腳腫"
	],
	[
		"b8a1",
		"腹腺腦舅艇蒂葷落萱葵葦葫葉葬葛萼萵葡董葩葭葆虞虜號蛹蜓蜈蜇蜀蛾蛻蜂蜃蜆蜊衙裟裔裙補裘裝裡裊裕裒覜解詫該詳試詩詰誇詼詣誠話誅詭詢詮詬詹詻訾詨豢貊貉賊資賈賄貲賃賂賅跡跟跨路跳跺跪跤跦躲較載軾輊"
	],
	[
		"b940",
		"辟農運遊道遂達逼違遐遇遏過遍遑逾遁鄒鄗酬酪酩釉鈷鉗鈸鈽鉀鈾鉛鉋鉤鉑鈴鉉鉍鉅鈹鈿鉚閘隘隔隕雍雋雉雊雷電雹零靖靴靶預頑頓頊頒頌飼飴"
	],
	[
		"b9a1",
		"飽飾馳馱馴髡鳩麂鼎鼓鼠僧僮僥僖僭僚僕像僑僱僎僩兢凳劃劂匱厭嗾嘀嘛嘗嗽嘔嘆嘉嘍嘎嗷嘖嘟嘈嘐嗶團圖塵塾境墓墊塹墅塽壽夥夢夤奪奩嫡嫦嫩嫗嫖嫘嫣孵寞寧寡寥實寨寢寤察對屢嶄嶇幛幣幕幗幔廓廖弊彆彰徹慇"
	],
	[
		"ba40",
		"愿態慷慢慣慟慚慘慵截撇摘摔撤摸摟摺摑摧搴摭摻敲斡旗旖暢暨暝榜榨榕槁榮槓構榛榷榻榫榴槐槍榭槌榦槃榣歉歌氳漳演滾漓滴漩漾漠漬漏漂漢"
	],
	[
		"baa1",
		"滿滯漆漱漸漲漣漕漫漯澈漪滬漁滲滌滷熔熙煽熊熄熒爾犒犖獄獐瑤瑣瑪瑰瑭甄疑瘧瘍瘋瘉瘓盡監瞄睽睿睡磁碟碧碳碩碣禎福禍種稱窪窩竭端管箕箋筵算箝箔箏箸箇箄粹粽精綻綰綜綽綾綠緊綴網綱綺綢綿綵綸維緒緇綬"
	],
	[
		"bb40",
		"罰翠翡翟聞聚肇腐膀膏膈膊腿膂臧臺與舔舞艋蓉蒿蓆蓄蒙蒞蒲蒜蓋蒸蓀蓓蒐蒼蓑蓊蜿蜜蜻蜢蜥蜴蜘蝕蜷蜩裳褂裴裹裸製裨褚裯誦誌語誣認誡誓誤"
	],
	[
		"bba1",
		"說誥誨誘誑誚誧豪貍貌賓賑賒赫趙趕跼輔輒輕輓辣遠遘遜遣遙遞遢遝遛鄙鄘鄞酵酸酷酴鉸銀銅銘銖鉻銓銜銨鉼銑閡閨閩閣閥閤隙障際雌雒需靼鞅韶頗領颯颱餃餅餌餉駁骯骰髦魁魂鳴鳶鳳麼鼻齊億儀僻僵價儂儈儉儅凜"
	],
	[
		"bc40",
		"劇劈劉劍劊勰厲嘮嘻嘹嘲嘿嘴嘩噓噎噗噴嘶嘯嘰墀墟增墳墜墮墩墦奭嬉嫻嬋嫵嬌嬈寮寬審寫層履嶝嶔幢幟幡廢廚廟廝廣廠彈影德徵慶慧慮慝慕憂"
	],
	[
		"bca1",
		"慼慰慫慾憧憐憫憎憬憚憤憔憮戮摩摯摹撞撲撈撐撰撥撓撕撩撒撮播撫撚撬撙撢撳敵敷數暮暫暴暱樣樟槨樁樞標槽模樓樊槳樂樅槭樑歐歎殤毅毆漿潼澄潑潦潔澆潭潛潸潮澎潺潰潤澗潘滕潯潠潟熟熬熱熨牖犛獎獗瑩璋璃"
	],
	[
		"bd40",
		"瑾璀畿瘠瘩瘟瘤瘦瘡瘢皚皺盤瞎瞇瞌瞑瞋磋磅確磊碾磕碼磐稿稼穀稽稷稻窯窮箭箱範箴篆篇篁箠篌糊締練緯緻緘緬緝編緣線緞緩綞緙緲緹罵罷羯"
	],
	[
		"bda1",
		"翩耦膛膜膝膠膚膘蔗蔽蔚蓮蔬蔭蔓蔑蔣蔡蔔蓬蔥蓿蔆螂蝴蝶蝠蝦蝸蝨蝙蝗蝌蝓衛衝褐複褒褓褕褊誼諒談諄誕請諸課諉諂調誰論諍誶誹諛豌豎豬賠賞賦賤賬賭賢賣賜質賡赭趟趣踫踐踝踢踏踩踟踡踞躺輝輛輟輩輦輪輜輞"
	],
	[
		"be40",
		"輥適遮遨遭遷鄰鄭鄧鄱醇醉醋醃鋅銻銷鋪銬鋤鋁銳銼鋒鋇鋰銲閭閱霄霆震霉靠鞍鞋鞏頡頫頜颳養餓餒餘駝駐駟駛駑駕駒駙骷髮髯鬧魅魄魷魯鴆鴉"
	],
	[
		"bea1",
		"鴃麩麾黎墨齒儒儘儔儐儕冀冪凝劑劓勳噙噫噹噩噤噸噪器噥噱噯噬噢噶壁墾壇壅奮嬝嬴學寰導彊憲憑憩憊懍憶憾懊懈戰擅擁擋撻撼據擄擇擂操撿擒擔撾整曆曉暹曄曇暸樽樸樺橙橫橘樹橄橢橡橋橇樵機橈歙歷氅濂澱澡"
	],
	[
		"bf40",
		"濃澤濁澧澳激澹澶澦澠澴熾燉燐燒燈燕熹燎燙燜燃燄獨璜璣璘璟璞瓢甌甍瘴瘸瘺盧盥瞠瞞瞟瞥磨磚磬磧禦積穎穆穌穋窺篙簑築篤篛篡篩篦糕糖縊"
	],
	[
		"bfa1",
		"縑縈縛縣縞縝縉縐罹羲翰翱翮耨膳膩膨臻興艘艙蕊蕙蕈蕨蕩蕃蕉蕭蕪蕞螃螟螞螢融衡褪褲褥褫褡親覦諦諺諫諱謀諜諧諮諾謁謂諷諭諳諶諼豫豭貓賴蹄踱踴蹂踹踵輻輯輸輳辨辦遵遴選遲遼遺鄴醒錠錶鋸錳錯錢鋼錫錄錚"
	],
	[
		"c040",
		"錐錦錡錕錮錙閻隧隨險雕霎霑霖霍霓霏靛靜靦鞘頰頸頻頷頭頹頤餐館餞餛餡餚駭駢駱骸骼髻髭鬨鮑鴕鴣鴦鴨鴒鴛默黔龍龜優償儡儲勵嚎嚀嚐嚅嚇"
	],
	[
		"c0a1",
		"嚏壕壓壑壎嬰嬪嬤孺尷屨嶼嶺嶽嶸幫彌徽應懂懇懦懋戲戴擎擊擘擠擰擦擬擱擢擭斂斃曙曖檀檔檄檢檜櫛檣橾檗檐檠歜殮毚氈濘濱濟濠濛濤濫濯澀濬濡濩濕濮濰燧營燮燦燥燭燬燴燠爵牆獰獲璩環璦璨癆療癌盪瞳瞪瞰瞬"
	],
	[
		"c140",
		"瞧瞭矯磷磺磴磯礁禧禪穗窿簇簍篾篷簌篠糠糜糞糢糟糙糝縮績繆縷縲繃縫總縱繅繁縴縹繈縵縿縯罄翳翼聱聲聰聯聳臆臃膺臂臀膿膽臉膾臨舉艱薪"
	],
	[
		"c1a1",
		"薄蕾薜薑薔薯薛薇薨薊虧蟀蟑螳蟒蟆螫螻螺蟈蟋褻褶襄褸褽覬謎謗謙講謊謠謝謄謐豁谿豳賺賽購賸賻趨蹉蹋蹈蹊轄輾轂轅輿避遽還邁邂邀鄹醣醞醜鍍鎂錨鍵鍊鍥鍋錘鍾鍬鍛鍰鍚鍔闊闋闌闈闆隱隸雖霜霞鞠韓顆颶餵騁"
	],
	[
		"c240",
		"駿鮮鮫鮪鮭鴻鴿麋黏點黜黝黛鼾齋叢嚕嚮壙壘嬸彝懣戳擴擲擾攆擺擻擷斷曜朦檳檬櫃檻檸櫂檮檯歟歸殯瀉瀋濾瀆濺瀑瀏燻燼燾燸獷獵璧璿甕癖癘"
	],
	[
		"c2a1",
		"癒瞽瞿瞻瞼礎禮穡穢穠竄竅簫簧簪簞簣簡糧織繕繞繚繡繒繙罈翹翻職聶臍臏舊藏薩藍藐藉薰薺薹薦蟯蟬蟲蟠覆覲觴謨謹謬謫豐贅蹙蹣蹦蹤蹟蹕軀轉轍邇邃邈醫醬釐鎔鎊鎖鎢鎳鎮鎬鎰鎘鎚鎗闔闖闐闕離雜雙雛雞霤鞣鞦"
	],
	[
		"c340",
		"鞭韹額顏題顎顓颺餾餿餽餮馥騎髁鬃鬆魏魎魍鯊鯉鯽鯈鯀鵑鵝鵠黠鼕鼬儳嚥壞壟壢寵龐廬懲懷懶懵攀攏曠曝櫥櫝櫚櫓瀛瀟瀨瀚瀝瀕瀘爆爍牘犢獸"
	],
	[
		"c3a1",
		"獺璽瓊瓣疇疆癟癡矇礙禱穫穩簾簿簸簽簷籀繫繭繹繩繪羅繳羶羹羸臘藩藝藪藕藤藥藷蟻蠅蠍蟹蟾襠襟襖襞譁譜識證譚譎譏譆譙贈贊蹼蹲躇蹶蹬蹺蹴轔轎辭邊邋醱醮鏡鏑鏟鏃鏈鏜鏝鏖鏢鏍鏘鏤鏗鏨關隴難霪霧靡韜韻類"
	],
	[
		"c440",
		"願顛颼饅饉騖騙鬍鯨鯧鯖鯛鶉鵡鵲鵪鵬麒麗麓麴勸嚨嚷嚶嚴嚼壤孀孃孽寶巉懸懺攘攔攙曦朧櫬瀾瀰瀲爐獻瓏癢癥礦礪礬礫竇競籌籃籍糯糰辮繽繼"
	],
	[
		"c4a1",
		"纂罌耀臚艦藻藹蘑藺蘆蘋蘇蘊蠔蠕襤覺觸議譬警譯譟譫贏贍躉躁躅躂醴釋鐘鐃鏽闡霰飄饒饑馨騫騰騷騵鰓鰍鹹麵黨鼯齟齣齡儷儸囁囀囂夔屬巍懼懾攝攜斕曩櫻欄櫺殲灌爛犧瓖瓔癩矓籐纏續羼蘗蘭蘚蠣蠢蠡蠟襪襬覽譴"
	],
	[
		"c540",
		"護譽贓躊躍躋轟辯醺鐮鐳鐵鐺鐸鐲鐫闢霸霹露響顧顥饗驅驃驀騾髏魔魑鰭鰥鶯鶴鷂鶸麝黯鼙齜齦齧儼儻囈囊囉孿巔巒彎懿攤權歡灑灘玀瓤疊癮癬"
	],
	[
		"c5a1",
		"禳籠籟聾聽臟襲襯觼讀贖贗躑躓轡酈鑄鑑鑒霽霾韃韁顫饕驕驍髒鬚鱉鰱鰾鰻鷓鷗鼴齬齪龔囌巖戀攣攫攪曬欐瓚竊籤籣籥纓纖纔臢蘸蘿蠱變邐邏鑣鑠鑤靨顯饜驚驛驗髓體髑鱔鱗鱖鷥麟黴囑壩攬灞癱癲矗罐羈蠶蠹衢讓讒"
	],
	[
		"c640",
		"讖艷贛釀鑪靂靈靄韆顰驟鬢魘鱟鷹鷺鹼鹽鼇齷齲廳欖灣籬籮蠻觀躡釁鑲鑰顱饞髖鬣黌灤矚讚鑷韉驢驥纜讜躪釅鑽鑾鑼鱷鱸黷豔鑿鸚爨驪鬱鸛鸞籲"
	],
	[
		"c940",
		"乂乜凵匚厂万丌乇亍囗兀屮彳丏冇与丮亓仂仉仈冘勼卬厹圠夃夬尐巿旡殳毌气爿丱丼仨仜仩仡仝仚刌匜卌圢圣夗夯宁宄尒尻屴屳帄庀庂忉戉扐氕"
	],
	[
		"c9a1",
		"氶汃氿氻犮犰玊禸肊阞伎优伬仵伔仱伀价伈伝伂伅伢伓伄仴伒冱刓刉刐劦匢匟卍厊吇囡囟圮圪圴夼妀奼妅奻奾奷奿孖尕尥屼屺屻屾巟幵庄异弚彴忕忔忏扜扞扤扡扦扢扙扠扚扥旯旮朾朹朸朻机朿朼朳氘汆汒汜汏汊汔汋"
	],
	[
		"ca40",
		"汌灱牞犴犵玎甪癿穵网艸艼芀艽艿虍襾邙邗邘邛邔阢阤阠阣佖伻佢佉体佤伾佧佒佟佁佘伭伳伿佡冏冹刜刞刡劭劮匉卣卲厎厏吰吷吪呔呅吙吜吥吘"
	],
	[
		"caa1",
		"吽呏呁吨吤呇囮囧囥坁坅坌坉坋坒夆奀妦妘妠妗妎妢妐妏妧妡宎宒尨尪岍岏岈岋岉岒岊岆岓岕巠帊帎庋庉庌庈庍弅弝彸彶忒忑忐忭忨忮忳忡忤忣忺忯忷忻怀忴戺抃抌抎抏抔抇扱扻扺扰抁抈扷扽扲扴攷旰旴旳旲旵杅杇"
	],
	[
		"cb40",
		"杙杕杌杈杝杍杚杋毐氙氚汸汧汫沄沋沏汱汯汩沚汭沇沕沜汦汳汥汻沎灴灺牣犿犽狃狆狁犺狅玕玗玓玔玒町甹疔疕皁礽耴肕肙肐肒肜芐芏芅芎芑芓"
	],
	[
		"cba1",
		"芊芃芄豸迉辿邟邡邥邞邧邠阰阨阯阭丳侘佼侅佽侀侇佶佴侉侄佷佌侗佪侚佹侁佸侐侜侔侞侒侂侕佫佮冞冼冾刵刲刳剆刱劼匊匋匼厒厔咇呿咁咑咂咈呫呺呾呥呬呴呦咍呯呡呠咘呣呧呤囷囹坯坲坭坫坱坰坶垀坵坻坳坴坢"
	],
	[
		"cc40",
		"坨坽夌奅妵妺姏姎妲姌姁妶妼姃姖妱妽姀姈妴姇孢孥宓宕屄屇岮岤岠岵岯岨岬岟岣岭岢岪岧岝岥岶岰岦帗帔帙弨弢弣弤彔徂彾彽忞忥怭怦怙怲怋"
	],
	[
		"cca1",
		"怴怊怗怳怚怞怬怢怍怐怮怓怑怌怉怜戔戽抭抴拑抾抪抶拊抮抳抯抻抩抰抸攽斨斻昉旼昄昒昈旻昃昋昍昅旽昑昐曶朊枅杬枎枒杶杻枘枆构杴枍枌杺枟枑枙枃杽极杸杹枔欥殀歾毞氝沓泬泫泮泙沶泔沭泧沷泐泂沺泃泆泭泲"
	],
	[
		"cd40",
		"泒泝沴沊沝沀泞泀洰泍泇沰泹泏泩泑炔炘炅炓炆炄炑炖炂炚炃牪狖狋狘狉狜狒狔狚狌狑玤玡玭玦玢玠玬玝瓝瓨甿畀甾疌疘皯盳盱盰盵矸矼矹矻矺"
	],
	[
		"cda1",
		"矷祂礿秅穸穻竻籵糽耵肏肮肣肸肵肭舠芠苀芫芚芘芛芵芧芮芼芞芺芴芨芡芩苂芤苃芶芢虰虯虭虮豖迒迋迓迍迖迕迗邲邴邯邳邰阹阽阼阺陃俍俅俓侲俉俋俁俔俜俙侻侳俛俇俖侺俀侹俬剄剉勀勂匽卼厗厖厙厘咺咡咭咥哏"
	],
	[
		"ce40",
		"哃茍咷咮哖咶哅哆咠呰咼咢咾呲哞咰垵垞垟垤垌垗垝垛垔垘垏垙垥垚垕壴复奓姡姞姮娀姱姝姺姽姼姶姤姲姷姛姩姳姵姠姾姴姭宨屌峐峘峌峗峋峛"
	],
	[
		"cea1",
		"峞峚峉峇峊峖峓峔峏峈峆峎峟峸巹帡帢帣帠帤庰庤庢庛庣庥弇弮彖徆怷怹恔恲恞恅恓恇恉恛恌恀恂恟怤恄恘恦恮扂扃拏挍挋拵挎挃拫拹挏挌拸拶挀挓挔拺挕拻拰敁敃斪斿昶昡昲昵昜昦昢昳昫昺昝昴昹昮朏朐柁柲柈枺"
	],
	[
		"cf40",
		"柜枻柸柘柀枷柅柫柤柟枵柍枳柷柶柮柣柂枹柎柧柰枲柼柆柭柌枮柦柛柺柉柊柃柪柋欨殂殄殶毖毘毠氠氡洨洴洭洟洼洿洒洊泚洳洄洙洺洚洑洀洝浂"
	],
	[
		"cfa1",
		"洁洘洷洃洏浀洇洠洬洈洢洉洐炷炟炾炱炰炡炴炵炩牁牉牊牬牰牳牮狊狤狨狫狟狪狦狣玅珌珂珈珅玹玶玵玴珫玿珇玾珃珆玸珋瓬瓮甮畇畈疧疪癹盄眈眃眄眅眊盷盻盺矧矨砆砑砒砅砐砏砎砉砃砓祊祌祋祅祄秕种秏秖秎窀"
	],
	[
		"d040",
		"穾竑笀笁籺籸籹籿粀粁紃紈紁罘羑羍羾耇耎耏耔耷胘胇胠胑胈胂胐胅胣胙胜胊胕胉胏胗胦胍臿舡芔苙苾苹茇苨茀苕茺苫苖苴苬苡苲苵茌苻苶苰苪"
	],
	[
		"d0a1",
		"苤苠苺苳苭虷虴虼虳衁衎衧衪衩觓訄訇赲迣迡迮迠郱邽邿郕郅邾郇郋郈釔釓陔陏陑陓陊陎倞倅倇倓倢倰倛俵俴倳倷倬俶俷倗倜倠倧倵倯倱倎党冔冓凊凄凅凈凎剡剚剒剞剟剕剢勍匎厞唦哢唗唒哧哳哤唚哿唄唈哫唑唅哱"
	],
	[
		"d140",
		"唊哻哷哸哠唎唃唋圁圂埌堲埕埒垺埆垽垼垸垶垿埇埐垹埁夎奊娙娖娭娮娕娏娗娊娞娳孬宧宭宬尃屖屔峬峿峮峱峷崀峹帩帨庨庮庪庬弳弰彧恝恚恧"
	],
	[
		"d1a1",
		"恁悢悈悀悒悁悝悃悕悛悗悇悜悎戙扆拲挐捖挬捄捅挶捃揤挹捋捊挼挩捁挴捘捔捙挭捇挳捚捑挸捗捀捈敊敆旆旃旄旂晊晟晇晑朒朓栟栚桉栲栳栻桋桏栖栱栜栵栫栭栯桎桄栴栝栒栔栦栨栮桍栺栥栠欬欯欭欱欴歭肂殈毦毤"
	],
	[
		"d240",
		"毨毣毢毧氥浺浣浤浶洍浡涒浘浢浭浯涑涍淯浿涆浞浧浠涗浰浼浟涂涘洯浨涋浾涀涄洖涃浻浽浵涐烜烓烑烝烋缹烢烗烒烞烠烔烍烅烆烇烚烎烡牂牸"
	],
	[
		"d2a1",
		"牷牶猀狺狴狾狶狳狻猁珓珙珥珖玼珧珣珩珜珒珛珔珝珚珗珘珨瓞瓟瓴瓵甡畛畟疰痁疻痄痀疿疶疺皊盉眝眛眐眓眒眣眑眕眙眚眢眧砣砬砢砵砯砨砮砫砡砩砳砪砱祔祛祏祜祓祒祑秫秬秠秮秭秪秜秞秝窆窉窅窋窌窊窇竘笐"
	],
	[
		"d340",
		"笄笓笅笏笈笊笎笉笒粄粑粊粌粈粍粅紞紝紑紎紘紖紓紟紒紏紌罜罡罞罠罝罛羖羒翃翂翀耖耾耹胺胲胹胵脁胻脀舁舯舥茳茭荄茙荑茥荖茿荁茦茜茢"
	],
	[
		"d3a1",
		"荂荎茛茪茈茼荍茖茤茠茷茯茩荇荅荌荓茞茬荋茧荈虓虒蚢蚨蚖蚍蚑蚞蚇蚗蚆蚋蚚蚅蚥蚙蚡蚧蚕蚘蚎蚝蚐蚔衃衄衭衵衶衲袀衱衿衯袃衾衴衼訒豇豗豻貤貣赶赸趵趷趶軑軓迾迵适迿迻逄迼迶郖郠郙郚郣郟郥郘郛郗郜郤酐"
	],
	[
		"d440",
		"酎酏釕釢釚陜陟隼飣髟鬯乿偰偪偡偞偠偓偋偝偲偈偍偁偛偊偢倕偅偟偩偫偣偤偆偀偮偳偗偑凐剫剭剬剮勖勓匭厜啵啶唼啍啐唴唪啑啢唶唵唰啒啅"
	],
	[
		"d4a1",
		"唌唲啥啎唹啈唭唻啀啋圊圇埻堔埢埶埜埴堀埭埽堈埸堋埳埏堇埮埣埲埥埬埡堎埼堐埧堁堌埱埩埰堍堄奜婠婘婕婧婞娸娵婭婐婟婥婬婓婤婗婃婝婒婄婛婈媎娾婍娹婌婰婩婇婑婖婂婜孲孮寁寀屙崞崋崝崚崠崌崨崍崦崥崏"
	],
	[
		"d540",
		"崰崒崣崟崮帾帴庱庴庹庲庳弶弸徛徖徟悊悐悆悾悰悺惓惔惏惤惙惝惈悱惛悷惊悿惃惍惀挲捥掊掂捽掽掞掭掝掗掫掎捯掇掐据掯捵掜捭掮捼掤挻掟"
	],
	[
		"d5a1",
		"捸掅掁掑掍捰敓旍晥晡晛晙晜晢朘桹梇梐梜桭桮梮梫楖桯梣梬梩桵桴梲梏桷梒桼桫桲梪梀桱桾梛梖梋梠梉梤桸桻梑梌梊桽欶欳欷欸殑殏殍殎殌氪淀涫涴涳湴涬淩淢涷淶淔渀淈淠淟淖涾淥淜淝淛淴淊涽淭淰涺淕淂淏淉"
	],
	[
		"d640",
		"淐淲淓淽淗淍淣涻烺焍烷焗烴焌烰焄烳焐烼烿焆焓焀烸烶焋焂焎牾牻牼牿猝猗猇猑猘猊猈狿猏猞玈珶珸珵琄琁珽琇琀珺珼珿琌琋珴琈畤畣痎痒痏"
	],
	[
		"d6a1",
		"痋痌痑痐皏皉盓眹眯眭眱眲眴眳眽眥眻眵硈硒硉硍硊硌砦硅硐祤祧祩祪祣祫祡离秺秸秶秷窏窔窐笵筇笴笥笰笢笤笳笘笪笝笱笫笭笯笲笸笚笣粔粘粖粣紵紽紸紶紺絅紬紩絁絇紾紿絊紻紨罣羕羜羝羛翊翋翍翐翑翇翏翉耟"
	],
	[
		"d740",
		"耞耛聇聃聈脘脥脙脛脭脟脬脞脡脕脧脝脢舑舸舳舺舴舲艴莐莣莨莍荺荳莤荴莏莁莕莙荵莔莩荽莃莌莝莛莪莋荾莥莯莈莗莰荿莦莇莮荶莚虙虖蚿蚷"
	],
	[
		"d7a1",
		"蛂蛁蛅蚺蚰蛈蚹蚳蚸蛌蚴蚻蚼蛃蚽蚾衒袉袕袨袢袪袚袑袡袟袘袧袙袛袗袤袬袌袓袎覂觖觙觕訰訧訬訞谹谻豜豝豽貥赽赻赹趼跂趹趿跁軘軞軝軜軗軠軡逤逋逑逜逌逡郯郪郰郴郲郳郔郫郬郩酖酘酚酓酕釬釴釱釳釸釤釹釪"
	],
	[
		"d840",
		"釫釷釨釮镺閆閈陼陭陫陱陯隿靪頄飥馗傛傕傔傞傋傣傃傌傎傝偨傜傒傂傇兟凔匒匑厤厧喑喨喥喭啷噅喢喓喈喏喵喁喣喒喤啽喌喦啿喕喡喎圌堩堷"
	],
	[
		"d8a1",
		"堙堞堧堣堨埵塈堥堜堛堳堿堶堮堹堸堭堬堻奡媯媔媟婺媢媞婸媦婼媥媬媕媮娷媄媊媗媃媋媩婻婽媌媜媏媓媝寪寍寋寔寑寊寎尌尰崷嵃嵫嵁嵋崿崵嵑嵎嵕崳崺嵒崽崱嵙嵂崹嵉崸崼崲崶嵀嵅幄幁彘徦徥徫惉悹惌惢惎惄愔"
	],
	[
		"d940",
		"惲愊愖愅惵愓惸惼惾惁愃愘愝愐惿愄愋扊掔掱掰揎揥揨揯揃撝揳揊揠揶揕揲揵摡揟掾揝揜揄揘揓揂揇揌揋揈揰揗揙攲敧敪敤敜敨敥斌斝斞斮旐旒"
	],
	[
		"d9a1",
		"晼晬晻暀晱晹晪晲朁椌棓椄棜椪棬棪棱椏棖棷棫棤棶椓椐棳棡椇棌椈楰梴椑棯棆椔棸棐棽棼棨椋椊椗棎棈棝棞棦棴棑椆棔棩椕椥棇欹欻欿欼殔殗殙殕殽毰毲毳氰淼湆湇渟湉溈渼渽湅湢渫渿湁湝湳渜渳湋湀湑渻渃渮湞"
	],
	[
		"da40",
		"湨湜湡渱渨湠湱湫渹渢渰湓湥渧湸湤湷湕湹湒湦渵渶湚焠焞焯烻焮焱焣焥焢焲焟焨焺焛牋牚犈犉犆犅犋猒猋猰猢猱猳猧猲猭猦猣猵猌琮琬琰琫琖"
	],
	[
		"daa1",
		"琚琡琭琱琤琣琝琩琠琲瓻甯畯畬痧痚痡痦痝痟痤痗皕皒盚睆睇睄睍睅睊睎睋睌矞矬硠硤硥硜硭硱硪确硰硩硨硞硢祴祳祲祰稂稊稃稌稄窙竦竤筊笻筄筈筌筎筀筘筅粢粞粨粡絘絯絣絓絖絧絪絏絭絜絫絒絔絩絑絟絎缾缿罥"
	],
	[
		"db40",
		"罦羢羠羡翗聑聏聐胾胔腃腊腒腏腇脽腍脺臦臮臷臸臹舄舼舽舿艵茻菏菹萣菀菨萒菧菤菼菶萐菆菈菫菣莿萁菝菥菘菿菡菋菎菖菵菉萉萏菞萑萆菂菳"
	],
	[
		"dba1",
		"菕菺菇菑菪萓菃菬菮菄菻菗菢萛菛菾蛘蛢蛦蛓蛣蛚蛪蛝蛫蛜蛬蛩蛗蛨蛑衈衖衕袺裗袹袸裀袾袶袼袷袽袲褁裉覕覘覗觝觚觛詎詍訹詙詀詗詘詄詅詒詈詑詊詌詏豟貁貀貺貾貰貹貵趄趀趉跘跓跍跇跖跜跏跕跙跈跗跅軯軷軺"
	],
	[
		"dc40",
		"軹軦軮軥軵軧軨軶軫軱軬軴軩逭逴逯鄆鄬鄄郿郼鄈郹郻鄁鄀鄇鄅鄃酡酤酟酢酠鈁鈊鈥鈃鈚鈦鈏鈌鈀鈒釿釽鈆鈄鈧鈂鈜鈤鈙鈗鈅鈖镻閍閌閐隇陾隈"
	],
	[
		"dca1",
		"隉隃隀雂雈雃雱雰靬靰靮頇颩飫鳦黹亃亄亶傽傿僆傮僄僊傴僈僂傰僁傺傱僋僉傶傸凗剺剸剻剼嗃嗛嗌嗐嗋嗊嗝嗀嗔嗄嗩喿嗒喍嗏嗕嗢嗖嗈嗲嗍嗙嗂圔塓塨塤塏塍塉塯塕塎塝塙塥塛堽塣塱壼嫇嫄嫋媺媸媱媵媰媿嫈媻嫆"
	],
	[
		"dd40",
		"媷嫀嫊媴媶嫍媹媐寖寘寙尟尳嵱嵣嵊嵥嵲嵬嵞嵨嵧嵢巰幏幎幊幍幋廅廌廆廋廇彀徯徭惷慉慊愫慅愶愲愮慆愯慏愩慀戠酨戣戥戤揅揱揫搐搒搉搠搤"
	],
	[
		"dda1",
		"搳摃搟搕搘搹搷搢搣搌搦搰搨摁搵搯搊搚摀搥搧搋揧搛搮搡搎敯斒旓暆暌暕暐暋暊暙暔晸朠楦楟椸楎楢楱椿楅楪椹楂楗楙楺楈楉椵楬椳椽楥棰楸椴楩楀楯楄楶楘楁楴楌椻楋椷楜楏楑椲楒椯楻椼歆歅歃歂歈歁殛嗀毻毼"
	],
	[
		"de40",
		"毹毷毸溛滖滈溏滀溟溓溔溠溱溹滆滒溽滁溞滉溷溰滍溦滏溲溾滃滜滘溙溒溎溍溤溡溿溳滐滊溗溮溣煇煔煒煣煠煁煝煢煲煸煪煡煂煘煃煋煰煟煐煓"
	],
	[
		"dea1",
		"煄煍煚牏犍犌犑犐犎猼獂猻猺獀獊獉瑄瑊瑋瑒瑑瑗瑀瑏瑐瑎瑂瑆瑍瑔瓡瓿瓾瓽甝畹畷榃痯瘏瘃痷痾痼痹痸瘐痻痶痭痵痽皙皵盝睕睟睠睒睖睚睩睧睔睙睭矠碇碚碔碏碄碕碅碆碡碃硹碙碀碖硻祼禂祽祹稑稘稙稒稗稕稢稓"
	],
	[
		"df40",
		"稛稐窣窢窞竫筦筤筭筴筩筲筥筳筱筰筡筸筶筣粲粴粯綈綆綀綍絿綅絺綎絻綃絼綌綔綄絽綒罭罫罧罨罬羦羥羧翛翜耡腤腠腷腜腩腛腢腲朡腞腶腧腯"
	],
	[
		"dfa1",
		"腄腡舝艉艄艀艂艅蓱萿葖葶葹蒏蒍葥葑葀蒆葧萰葍葽葚葙葴葳葝蔇葞萷萺萴葺葃葸萲葅萩菙葋萯葂萭葟葰萹葎葌葒葯蓅蒎萻葇萶萳葨葾葄萫葠葔葮葐蜋蜄蛷蜌蛺蛖蛵蝍蛸蜎蜉蜁蛶蜍蜅裖裋裍裎裞裛裚裌裐覅覛觟觥觤"
	],
	[
		"e040",
		"觡觠觢觜触詶誆詿詡訿詷誂誄詵誃誁詴詺谼豋豊豥豤豦貆貄貅賌赨赩趑趌趎趏趍趓趔趐趒跰跠跬跱跮跐跩跣跢跧跲跫跴輆軿輁輀輅輇輈輂輋遒逿"
	],
	[
		"e0a1",
		"遄遉逽鄐鄍鄏鄑鄖鄔鄋鄎酮酯鉈鉒鈰鈺鉦鈳鉥鉞銃鈮鉊鉆鉭鉬鉏鉠鉧鉯鈶鉡鉰鈱鉔鉣鉐鉲鉎鉓鉌鉖鈲閟閜閞閛隒隓隑隗雎雺雽雸雵靳靷靸靲頏頍頎颬飶飹馯馲馰馵骭骫魛鳪鳭鳧麀黽僦僔僗僨僳僛僪僝僤僓僬僰僯僣僠"
	],
	[
		"e140",
		"凘劀劁勩勫匰厬嘧嘕嘌嘒嗼嘏嘜嘁嘓嘂嗺嘝嘄嗿嗹墉塼墐墘墆墁塿塴墋塺墇墑墎塶墂墈塻墔墏壾奫嫜嫮嫥嫕嫪嫚嫭嫫嫳嫢嫠嫛嫬嫞嫝嫙嫨嫟孷寠"
	],
	[
		"e1a1",
		"寣屣嶂嶀嵽嶆嵺嶁嵷嶊嶉嶈嵾嵼嶍嵹嵿幘幙幓廘廑廗廎廜廕廙廒廔彄彃彯徶愬愨慁慞慱慳慒慓慲慬憀慴慔慺慛慥愻慪慡慖戩戧戫搫摍摛摝摴摶摲摳摽摵摦撦摎撂摞摜摋摓摠摐摿搿摬摫摙摥摷敳斠暡暠暟朅朄朢榱榶槉"
	],
	[
		"e240",
		"榠槎榖榰榬榼榑榙榎榧榍榩榾榯榿槄榽榤槔榹槊榚槏榳榓榪榡榞槙榗榐槂榵榥槆歊歍歋殞殟殠毃毄毾滎滵滱漃漥滸漷滻漮漉潎漙漚漧漘漻漒滭漊"
	],
	[
		"e2a1",
		"漶潳滹滮漭潀漰漼漵滫漇漎潃漅滽滶漹漜滼漺漟漍漞漈漡熇熐熉熀熅熂熏煻熆熁熗牄牓犗犕犓獃獍獑獌瑢瑳瑱瑵瑲瑧瑮甀甂甃畽疐瘖瘈瘌瘕瘑瘊瘔皸瞁睼瞅瞂睮瞀睯睾瞃碲碪碴碭碨硾碫碞碥碠碬碢碤禘禊禋禖禕禔禓"
	],
	[
		"e340",
		"禗禈禒禐稫穊稰稯稨稦窨窫窬竮箈箜箊箑箐箖箍箌箛箎箅箘劄箙箤箂粻粿粼粺綧綷緂綣綪緁緀緅綝緎緄緆緋緌綯綹綖綼綟綦綮綩綡緉罳翢翣翥翞"
	],
	[
		"e3a1",
		"耤聝聜膉膆膃膇膍膌膋舕蒗蒤蒡蒟蒺蓎蓂蒬蒮蒫蒹蒴蓁蓍蒪蒚蒱蓐蒝蒧蒻蒢蒔蓇蓌蒛蒩蒯蒨蓖蒘蒶蓏蒠蓗蓔蓒蓛蒰蒑虡蜳蜣蜨蝫蝀蜮蜞蜡蜙蜛蝃蜬蝁蜾蝆蜠蜲蜪蜭蜼蜒蜺蜱蜵蝂蜦蜧蜸蜤蜚蜰蜑裷裧裱裲裺裾裮裼裶裻"
	],
	[
		"e440",
		"裰裬裫覝覡覟覞觩觫觨誫誙誋誒誏誖谽豨豩賕賏賗趖踉踂跿踍跽踊踃踇踆踅跾踀踄輐輑輎輍鄣鄜鄠鄢鄟鄝鄚鄤鄡鄛酺酲酹酳銥銤鉶銛鉺銠銔銪銍"
	],
	[
		"e4a1",
		"銦銚銫鉹銗鉿銣鋮銎銂銕銢鉽銈銡銊銆銌銙銧鉾銇銩銝銋鈭隞隡雿靘靽靺靾鞃鞀鞂靻鞄鞁靿韎韍頖颭颮餂餀餇馝馜駃馹馻馺駂馽駇骱髣髧鬾鬿魠魡魟鳱鳲鳵麧僿儃儰僸儆儇僶僾儋儌僽儊劋劌勱勯噈噂噌嘵噁噊噉噆噘"
	],
	[
		"e540",
		"噚噀嘳嘽嘬嘾嘸嘪嘺圚墫墝墱墠墣墯墬墥墡壿嫿嫴嫽嫷嫶嬃嫸嬂嫹嬁嬇嬅嬏屧嶙嶗嶟嶒嶢嶓嶕嶠嶜嶡嶚嶞幩幝幠幜緳廛廞廡彉徲憋憃慹憱憰憢憉"
	],
	[
		"e5a1",
		"憛憓憯憭憟憒憪憡憍慦憳戭摮摰撖撠撅撗撜撏撋撊撌撣撟摨撱撘敶敺敹敻斲斳暵暰暩暲暷暪暯樀樆樗槥槸樕槱槤樠槿槬槢樛樝槾樧槲槮樔槷槧橀樈槦槻樍槼槫樉樄樘樥樏槶樦樇槴樖歑殥殣殢殦氁氀毿氂潁漦潾澇濆澒"
	],
	[
		"e640",
		"澍澉澌潢潏澅潚澖潶潬澂潕潲潒潐潗澔澓潝漀潡潫潽潧澐潓澋潩潿澕潣潷潪潻熲熯熛熰熠熚熩熵熝熥熞熤熡熪熜熧熳犘犚獘獒獞獟獠獝獛獡獚獙"
	],
	[
		"e6a1",
		"獢璇璉璊璆璁瑽璅璈瑼瑹甈甇畾瘥瘞瘙瘝瘜瘣瘚瘨瘛皜皝皞皛瞍瞏瞉瞈磍碻磏磌磑磎磔磈磃磄磉禚禡禠禜禢禛歶稹窲窴窳箷篋箾箬篎箯箹篊箵糅糈糌糋緷緛緪緧緗緡縃緺緦緶緱緰緮緟罶羬羰羭翭翫翪翬翦翨聤聧膣膟"
	],
	[
		"e740",
		"膞膕膢膙膗舖艏艓艒艐艎艑蔤蔻蔏蔀蔩蔎蔉蔍蔟蔊蔧蔜蓻蔫蓺蔈蔌蓴蔪蓲蔕蓷蓫蓳蓼蔒蓪蓩蔖蓾蔨蔝蔮蔂蓽蔞蓶蔱蔦蓧蓨蓰蓯蓹蔘蔠蔰蔋蔙蔯虢"
	],
	[
		"e7a1",
		"蝖蝣蝤蝷蟡蝳蝘蝔蝛蝒蝡蝚蝑蝞蝭蝪蝐蝎蝟蝝蝯蝬蝺蝮蝜蝥蝏蝻蝵蝢蝧蝩衚褅褌褔褋褗褘褙褆褖褑褎褉覢覤覣觭觰觬諏諆誸諓諑諔諕誻諗誾諀諅諘諃誺誽諙谾豍貏賥賟賙賨賚賝賧趠趜趡趛踠踣踥踤踮踕踛踖踑踙踦踧"
	],
	[
		"e840",
		"踔踒踘踓踜踗踚輬輤輘輚輠輣輖輗遳遰遯遧遫鄯鄫鄩鄪鄲鄦鄮醅醆醊醁醂醄醀鋐鋃鋄鋀鋙銶鋏鋱鋟鋘鋩鋗鋝鋌鋯鋂鋨鋊鋈鋎鋦鋍鋕鋉鋠鋞鋧鋑鋓"
	],
	[
		"e8a1",
		"銵鋡鋆銴镼閬閫閮閰隤隢雓霅霈霂靚鞊鞎鞈韐韏頞頝頦頩頨頠頛頧颲餈飺餑餔餖餗餕駜駍駏駓駔駎駉駖駘駋駗駌骳髬髫髳髲髱魆魃魧魴魱魦魶魵魰魨魤魬鳼鳺鳽鳿鳷鴇鴀鳹鳻鴈鴅鴄麃黓鼏鼐儜儓儗儚儑凞匴叡噰噠噮"
	],
	[
		"e940",
		"噳噦噣噭噲噞噷圜圛壈墽壉墿墺壂墼壆嬗嬙嬛嬡嬔嬓嬐嬖嬨嬚嬠嬞寯嶬嶱嶩嶧嶵嶰嶮嶪嶨嶲嶭嶯嶴幧幨幦幯廩廧廦廨廥彋徼憝憨憖懅憴懆懁懌憺"
	],
	[
		"e9a1",
		"憿憸憌擗擖擐擏擉撽撉擃擛擳擙攳敿敼斢曈暾曀曊曋曏暽暻暺曌朣樴橦橉橧樲橨樾橝橭橶橛橑樨橚樻樿橁橪橤橐橏橔橯橩橠樼橞橖橕橍橎橆歕歔歖殧殪殫毈毇氄氃氆澭濋澣濇澼濎濈潞濄澽澞濊澨瀄澥澮澺澬澪濏澿澸"
	],
	[
		"ea40",
		"澢濉澫濍澯澲澰燅燂熿熸燖燀燁燋燔燊燇燏熽燘熼燆燚燛犝犞獩獦獧獬獥獫獪瑿璚璠璔璒璕璡甋疀瘯瘭瘱瘽瘳瘼瘵瘲瘰皻盦瞚瞝瞡瞜瞛瞢瞣瞕瞙"
	],
	[
		"eaa1",
		"瞗磝磩磥磪磞磣磛磡磢磭磟磠禤穄穈穇窶窸窵窱窷篞篣篧篝篕篥篚篨篹篔篪篢篜篫篘篟糒糔糗糐糑縒縡縗縌縟縠縓縎縜縕縚縢縋縏縖縍縔縥縤罃罻罼罺羱翯耪耩聬膱膦膮膹膵膫膰膬膴膲膷膧臲艕艖艗蕖蕅蕫蕍蕓蕡蕘"
	],
	[
		"eb40",
		"蕀蕆蕤蕁蕢蕄蕑蕇蕣蔾蕛蕱蕎蕮蕵蕕蕧蕠薌蕦蕝蕔蕥蕬虣虥虤螛螏螗螓螒螈螁螖螘蝹螇螣螅螐螑螝螄螔螜螚螉褞褦褰褭褮褧褱褢褩褣褯褬褟觱諠"
	],
	[
		"eba1",
		"諢諲諴諵諝謔諤諟諰諈諞諡諨諿諯諻貑貒貐賵賮賱賰賳赬赮趥趧踳踾踸蹀蹅踶踼踽蹁踰踿躽輶輮輵輲輹輷輴遶遹遻邆郺鄳鄵鄶醓醐醑醍醏錧錞錈錟錆錏鍺錸錼錛錣錒錁鍆錭錎錍鋋錝鋺錥錓鋹鋷錴錂錤鋿錩錹錵錪錔錌"
	],
	[
		"ec40",
		"錋鋾錉錀鋻錖閼闍閾閹閺閶閿閵閽隩雔霋霒霐鞙鞗鞔韰韸頵頯頲餤餟餧餩馞駮駬駥駤駰駣駪駩駧骹骿骴骻髶髺髹髷鬳鮀鮅鮇魼魾魻鮂鮓鮒鮐魺鮕"
	],
	[
		"eca1",
		"魽鮈鴥鴗鴠鴞鴔鴩鴝鴘鴢鴐鴙鴟麈麆麇麮麭黕黖黺鼒鼽儦儥儢儤儠儩勴嚓嚌嚍嚆嚄嚃噾嚂噿嚁壖壔壏壒嬭嬥嬲嬣嬬嬧嬦嬯嬮孻寱寲嶷幬幪徾徻懃憵憼懧懠懥懤懨懞擯擩擣擫擤擨斁斀斶旚曒檍檖檁檥檉檟檛檡檞檇檓檎"
	],
	[
		"ed40",
		"檕檃檨檤檑橿檦檚檅檌檒歛殭氉濌澩濴濔濣濜濭濧濦濞濲濝濢濨燡燱燨燲燤燰燢獳獮獯璗璲璫璐璪璭璱璥璯甐甑甒甏疄癃癈癉癇皤盩瞵瞫瞲瞷瞶"
	],
	[
		"eda1",
		"瞴瞱瞨矰磳磽礂磻磼磲礅磹磾礄禫禨穜穛穖穘穔穚窾竀竁簅簏篲簀篿篻簎篴簋篳簂簉簃簁篸篽簆篰篱簐簊糨縭縼繂縳顈縸縪繉繀繇縩繌縰縻縶繄縺罅罿罾罽翴翲耬膻臄臌臊臅臇膼臩艛艚艜薃薀薏薧薕薠薋薣蕻薤薚薞"
	],
	[
		"ee40",
		"蕷蕼薉薡蕺蕸蕗薎薖薆薍薙薝薁薢薂薈薅蕹蕶薘薐薟虨螾螪螭蟅螰螬螹螵螼螮蟉蟃蟂蟌螷螯蟄蟊螴螶螿螸螽蟞螲褵褳褼褾襁襒褷襂覭覯覮觲觳謞"
	],
	[
		"eea1",
		"謘謖謑謅謋謢謏謒謕謇謍謈謆謜謓謚豏豰豲豱豯貕貔賹赯蹎蹍蹓蹐蹌蹇轃轀邅遾鄸醚醢醛醙醟醡醝醠鎡鎃鎯鍤鍖鍇鍼鍘鍜鍶鍉鍐鍑鍠鍭鎏鍌鍪鍹鍗鍕鍒鍏鍱鍷鍻鍡鍞鍣鍧鎀鍎鍙闇闀闉闃闅閷隮隰隬霠霟霘霝霙鞚鞡鞜"
	],
	[
		"ef40",
		"鞞鞝韕韔韱顁顄顊顉顅顃餥餫餬餪餳餲餯餭餱餰馘馣馡騂駺駴駷駹駸駶駻駽駾駼騃骾髾髽鬁髼魈鮚鮨鮞鮛鮦鮡鮥鮤鮆鮢鮠鮯鴳鵁鵧鴶鴮鴯鴱鴸鴰"
	],
	[
		"efa1",
		"鵅鵂鵃鴾鴷鵀鴽翵鴭麊麉麍麰黈黚黻黿鼤鼣鼢齔龠儱儭儮嚘嚜嚗嚚嚝嚙奰嬼屩屪巀幭幮懘懟懭懮懱懪懰懫懖懩擿攄擽擸攁攃擼斔旛曚曛曘櫅檹檽櫡櫆檺檶檷櫇檴檭歞毉氋瀇瀌瀍瀁瀅瀔瀎濿瀀濻瀦濼濷瀊爁燿燹爃燽獶"
	],
	[
		"f040",
		"璸瓀璵瓁璾璶璻瓂甔甓癜癤癙癐癓癗癚皦皽盬矂瞺磿礌礓礔礉礐礒礑禭禬穟簜簩簙簠簟簭簝簦簨簢簥簰繜繐繖繣繘繢繟繑繠繗繓羵羳翷翸聵臑臒"
	],
	[
		"f0a1",
		"臐艟艞薴藆藀藃藂薳薵薽藇藄薿藋藎藈藅薱薶藒蘤薸薷薾虩蟧蟦蟢蟛蟫蟪蟥蟟蟳蟤蟔蟜蟓蟭蟘蟣螤蟗蟙蠁蟴蟨蟝襓襋襏襌襆襐襑襉謪謧謣謳謰謵譇謯謼謾謱謥謷謦謶謮謤謻謽謺豂豵貙貘貗賾贄贂贀蹜蹢蹠蹗蹖蹞蹥蹧"
	],
	[
		"f140",
		"蹛蹚蹡蹝蹩蹔轆轇轈轋鄨鄺鄻鄾醨醥醧醯醪鎵鎌鎒鎷鎛鎝鎉鎧鎎鎪鎞鎦鎕鎈鎙鎟鎍鎱鎑鎲鎤鎨鎴鎣鎥闒闓闑隳雗雚巂雟雘雝霣霢霥鞬鞮鞨鞫鞤鞪"
	],
	[
		"f1a1",
		"鞢鞥韗韙韖韘韺顐顑顒颸饁餼餺騏騋騉騍騄騑騊騅騇騆髀髜鬈鬄鬅鬩鬵魊魌魋鯇鯆鯃鮿鯁鮵鮸鯓鮶鯄鮹鮽鵜鵓鵏鵊鵛鵋鵙鵖鵌鵗鵒鵔鵟鵘鵚麎麌黟鼁鼀鼖鼥鼫鼪鼩鼨齌齕儴儵劖勷厴嚫嚭嚦嚧嚪嚬壚壝壛夒嬽嬾嬿巃幰"
	],
	[
		"f240",
		"徿懻攇攐攍攉攌攎斄旞旝曞櫧櫠櫌櫑櫙櫋櫟櫜櫐櫫櫏櫍櫞歠殰氌瀙瀧瀠瀖瀫瀡瀢瀣瀩瀗瀤瀜瀪爌爊爇爂爅犥犦犤犣犡瓋瓅璷瓃甖癠矉矊矄矱礝礛"
	],
	[
		"f2a1",
		"礡礜礗礞禰穧穨簳簼簹簬簻糬糪繶繵繸繰繷繯繺繲繴繨罋罊羃羆羷翽翾聸臗臕艤艡艣藫藱藭藙藡藨藚藗藬藲藸藘藟藣藜藑藰藦藯藞藢蠀蟺蠃蟶蟷蠉蠌蠋蠆蟼蠈蟿蠊蠂襢襚襛襗襡襜襘襝襙覈覷覶觶譐譈譊譀譓譖譔譋譕"
	],
	[
		"f340",
		"譑譂譒譗豃豷豶貚贆贇贉趬趪趭趫蹭蹸蹳蹪蹯蹻軂轒轑轏轐轓辴酀鄿醰醭鏞鏇鏏鏂鏚鏐鏹鏬鏌鏙鎩鏦鏊鏔鏮鏣鏕鏄鏎鏀鏒鏧镽闚闛雡霩霫霬霨霦"
	],
	[
		"f3a1",
		"鞳鞷鞶韝韞韟顜顙顝顗颿颽颻颾饈饇饃馦馧騚騕騥騝騤騛騢騠騧騣騞騜騔髂鬋鬊鬎鬌鬷鯪鯫鯠鯞鯤鯦鯢鯰鯔鯗鯬鯜鯙鯥鯕鯡鯚鵷鶁鶊鶄鶈鵱鶀鵸鶆鶋鶌鵽鵫鵴鵵鵰鵩鶅鵳鵻鶂鵯鵹鵿鶇鵨麔麑黀黼鼭齀齁齍齖齗齘匷嚲"
	],
	[
		"f440",
		"嚵嚳壣孅巆巇廮廯忀忁懹攗攖攕攓旟曨曣曤櫳櫰櫪櫨櫹櫱櫮櫯瀼瀵瀯瀷瀴瀱灂瀸瀿瀺瀹灀瀻瀳灁爓爔犨獽獼璺皫皪皾盭矌矎矏矍矲礥礣礧礨礤礩"
	],
	[
		"f4a1",
		"禲穮穬穭竷籉籈籊籇籅糮繻繾纁纀羺翿聹臛臙舋艨艩蘢藿蘁藾蘛蘀藶蘄蘉蘅蘌藽蠙蠐蠑蠗蠓蠖襣襦覹觷譠譪譝譨譣譥譧譭趮躆躈躄轙轖轗轕轘轚邍酃酁醷醵醲醳鐋鐓鏻鐠鐏鐔鏾鐕鐐鐨鐙鐍鏵鐀鏷鐇鐎鐖鐒鏺鐉鏸鐊鏿"
	],
	[
		"f540",
		"鏼鐌鏶鐑鐆闞闠闟霮霯鞹鞻韽韾顠顢顣顟飁飂饐饎饙饌饋饓騲騴騱騬騪騶騩騮騸騭髇髊髆鬐鬒鬑鰋鰈鯷鰅鰒鯸鱀鰇鰎鰆鰗鰔鰉鶟鶙鶤鶝鶒鶘鶐鶛"
	],
	[
		"f5a1",
		"鶠鶔鶜鶪鶗鶡鶚鶢鶨鶞鶣鶿鶩鶖鶦鶧麙麛麚黥黤黧黦鼰鼮齛齠齞齝齙龑儺儹劘劗囃嚽嚾孈孇巋巏廱懽攛欂櫼欃櫸欀灃灄灊灈灉灅灆爝爚爙獾甗癪矐礭礱礯籔籓糲纊纇纈纋纆纍罍羻耰臝蘘蘪蘦蘟蘣蘜蘙蘧蘮蘡蘠蘩蘞蘥"
	],
	[
		"f640",
		"蠩蠝蠛蠠蠤蠜蠫衊襭襩襮襫觺譹譸譅譺譻贐贔趯躎躌轞轛轝酆酄酅醹鐿鐻鐶鐩鐽鐼鐰鐹鐪鐷鐬鑀鐱闥闤闣霵霺鞿韡顤飉飆飀饘饖騹騽驆驄驂驁騺"
	],
	[
		"f6a1",
		"騿髍鬕鬗鬘鬖鬺魒鰫鰝鰜鰬鰣鰨鰩鰤鰡鶷鶶鶼鷁鷇鷊鷏鶾鷅鷃鶻鶵鷎鶹鶺鶬鷈鶱鶭鷌鶳鷍鶲鹺麜黫黮黭鼛鼘鼚鼱齎齥齤龒亹囆囅囋奱孋孌巕巑廲攡攠攦攢欋欈欉氍灕灖灗灒爞爟犩獿瓘瓕瓙瓗癭皭礵禴穰穱籗籜籙籛籚"
	],
	[
		"f740",
		"糴糱纑罏羇臞艫蘴蘵蘳蘬蘲蘶蠬蠨蠦蠪蠥襱覿覾觻譾讄讂讆讅譿贕躕躔躚躒躐躖躗轠轢酇鑌鑐鑊鑋鑏鑇鑅鑈鑉鑆霿韣顪顩飋饔饛驎驓驔驌驏驈驊"
	],
	[
		"f7a1",
		"驉驒驐髐鬙鬫鬻魖魕鱆鱈鰿鱄鰹鰳鱁鰼鰷鰴鰲鰽鰶鷛鷒鷞鷚鷋鷐鷜鷑鷟鷩鷙鷘鷖鷵鷕鷝麶黰鼵鼳鼲齂齫龕龢儽劙壨壧奲孍巘蠯彏戁戃戄攩攥斖曫欑欒欏毊灛灚爢玂玁玃癰矔籧籦纕艬蘺虀蘹蘼蘱蘻蘾蠰蠲蠮蠳襶襴襳觾"
	],
	[
		"f840",
		"讌讎讋讈豅贙躘轤轣醼鑢鑕鑝鑗鑞韄韅頀驖驙鬞鬟鬠鱒鱘鱐鱊鱍鱋鱕鱙鱌鱎鷻鷷鷯鷣鷫鷸鷤鷶鷡鷮鷦鷲鷰鷢鷬鷴鷳鷨鷭黂黐黲黳鼆鼜鼸鼷鼶齃齏"
	],
	[
		"f8a1",
		"齱齰齮齯囓囍孎屭攭曭曮欓灟灡灝灠爣瓛瓥矕礸禷禶籪纗羉艭虃蠸蠷蠵衋讔讕躞躟躠躝醾醽釂鑫鑨鑩雥靆靃靇韇韥驞髕魙鱣鱧鱦鱢鱞鱠鸂鷾鸇鸃鸆鸅鸀鸁鸉鷿鷽鸄麠鼞齆齴齵齶囔攮斸欘欙欗欚灢爦犪矘矙礹籩籫糶纚"
	],
	[
		"f940",
		"纘纛纙臠臡虆虇虈襹襺襼襻觿讘讙躥躤躣鑮鑭鑯鑱鑳靉顲饟鱨鱮鱭鸋鸍鸐鸏鸒鸑麡黵鼉齇齸齻齺齹圞灦籯蠼趲躦釃鑴鑸鑶鑵驠鱴鱳鱱鱵鸔鸓黶鼊"
	],
	[
		"f9a1",
		"龤灨灥糷虪蠾蠽蠿讞貜躩軉靋顳顴飌饡馫驤驦驧鬤鸕鸗齈戇欞爧虌躨钂钀钁驩驨鬮鸙爩虋讟钃鱹麷癵驫鱺鸝灩灪麤齾齉龘碁銹裏墻恒粧嫺╔╦╗╠╬╣╚╩╝╒╤╕╞╪╡╘╧╛╓╥╖╟╫╢╙╨╜║═╭╮╰╯▓"
	]
];

/***/ }),
/* 192 */
/***/ (function(module, exports) {

module.exports = [
	[
		"a140",
		"",
		62
	],
	[
		"a180",
		"",
		32
	],
	[
		"a240",
		"",
		62
	],
	[
		"a280",
		"",
		32
	],
	[
		"a2ab",
		"",
		5
	],
	[
		"a2e3",
		"€"
	],
	[
		"a2ef",
		""
	],
	[
		"a2fd",
		""
	],
	[
		"a340",
		"",
		62
	],
	[
		"a380",
		"",
		31,
		"　"
	],
	[
		"a440",
		"",
		62
	],
	[
		"a480",
		"",
		32
	],
	[
		"a4f4",
		"",
		10
	],
	[
		"a540",
		"",
		62
	],
	[
		"a580",
		"",
		32
	],
	[
		"a5f7",
		"",
		7
	],
	[
		"a640",
		"",
		62
	],
	[
		"a680",
		"",
		32
	],
	[
		"a6b9",
		"",
		7
	],
	[
		"a6d9",
		"",
		6
	],
	[
		"a6ec",
		""
	],
	[
		"a6f3",
		""
	],
	[
		"a6f6",
		"",
		8
	],
	[
		"a740",
		"",
		62
	],
	[
		"a780",
		"",
		32
	],
	[
		"a7c2",
		"",
		14
	],
	[
		"a7f2",
		"",
		12
	],
	[
		"a896",
		"",
		10
	],
	[
		"a8bc",
		""
	],
	[
		"a8bf",
		"ǹ"
	],
	[
		"a8c1",
		""
	],
	[
		"a8ea",
		"",
		20
	],
	[
		"a958",
		""
	],
	[
		"a95b",
		""
	],
	[
		"a95d",
		""
	],
	[
		"a989",
		"〾⿰",
		11
	],
	[
		"a997",
		"",
		12
	],
	[
		"a9f0",
		"",
		14
	],
	[
		"aaa1",
		"",
		93
	],
	[
		"aba1",
		"",
		93
	],
	[
		"aca1",
		"",
		93
	],
	[
		"ada1",
		"",
		93
	],
	[
		"aea1",
		"",
		93
	],
	[
		"afa1",
		"",
		93
	],
	[
		"d7fa",
		"",
		4
	],
	[
		"f8a1",
		"",
		93
	],
	[
		"f9a1",
		"",
		93
	],
	[
		"faa1",
		"",
		93
	],
	[
		"fba1",
		"",
		93
	],
	[
		"fca1",
		"",
		93
	],
	[
		"fda1",
		"",
		93
	],
	[
		"fe50",
		"⺁⺄㑳㑇⺈⺋㖞㘚㘎⺌⺗㥮㤘㧏㧟㩳㧐㭎㱮㳠⺧⺪䁖䅟⺮䌷⺳⺶⺷䎱䎬⺻䏝䓖䙡䙌"
	],
	[
		"fe80",
		"䜣䜩䝼䞍⻊䥇䥺䥽䦂䦃䦅䦆䦟䦛䦷䦶䲣䲟䲠䲡䱷䲢䴓",
		6,
		"䶮",
		93
	]
];

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const TYPES = __webpack_require__(37).TYPES
const declareType = __webpack_require__(37).declare

const MAX = 65535 // (1 << 16) - 1
const JSON_COLUMN_ID = 'JSON_F52E2B61-18A1-11d1-B105-00805F49916B'

function Table (name) {
  if (name) {
    const parsed = Table.parseName(name)
    this.name = parsed.name
    this.schema = parsed.schema
    this.database = parsed.database
    this.path = (this.database ? `[${this.database}].` : '') + (this.schema ? `[${this.schema}].` : '') + `[${this.name}]`
    this.temporary = this.name.charAt(0) === '#'
  }

  this.columns = []
  this.rows = []

  Object.defineProperty(this.columns, 'add', {
    value (name, column, options) {
      if (column == null) {
        throw new Error('Column data type is not defined.')
      }
      if (column instanceof Function) {
        column = column()
      }

      options = options || {}
      column.name = name
      column.nullable = options.nullable
      column.primary = options.primary

      return this.push(column)
    }
  }
  )

  Object.defineProperty(this.rows, 'add', {
    value () {
      return this.push(Array.prototype.slice.call(arguments))
    }
  }
  )
}

/*
@private
*/

Table.prototype._makeBulk = function _makeBulk () {
  for (let i = 0; i < this.columns.length; i++) {
    const col = this.columns[i]
    switch (col.type) {
      case TYPES.Xml:
        col.type = TYPES.NVarChar(MAX).type
        break

      case TYPES.UDT:
      case TYPES.Geography:
      case TYPES.Geometry:
        col.type = TYPES.VarBinary(MAX).type
        break

      default:
        break
    }
  }

  return this
}

Table.prototype.declare = function declare () {
  const pkey = this.columns.filter(col => col.primary === true).map(col => col.name)
  const cols = this.columns.map(col => {
    const def = [`[${col.name}] ${declareType(col.type, col)}`]

    if (col.nullable === true) {
      def.push('null')
    } else if (col.nullable === false) {
      def.push('not null')
    }

    if (col.primary === true && pkey.length === 1) {
      def.push('primary key')
    }

    return def.join(' ')
  })

  const constraint = pkey.length > 1 ? `, constraint PK_${this.temporary ? this.name.substr(1) : this.name} primary key (${pkey.join(', ')})` : ''
  return `create table ${this.path} (${cols.join(', ')}${constraint})`
}

Table.fromRecordset = function fromRecordset (recordset, name) {
  const t = new this(name)

  for (const colName in recordset.columns) {
    if (Object.prototype.hasOwnProperty.call(recordset.columns, colName)) {
      const col = recordset.columns[colName]

      t.columns.add(colName, {
        type: col.type,
        length: col.length,
        scale: col.scale,
        precision: col.precision
      }, {
        nullable: col.nullable
      })
    }
  }

  if (t.columns.length === 1 && t.columns[0].name === JSON_COLUMN_ID) {
    for (let i = 0; i < recordset.length; i++) {
      t.rows.add(JSON.stringify(recordset[i]))
    }
  } else {
    for (let i = 0; i < recordset.length; i++) {
      t.rows.add.apply(t.rows, t.columns.map(col => recordset[i][col.name]))
    }
  }

  return t
}

Table.parseName = function parseName (name) {
  const length = name.length
  let cursor = -1
  let buffer = ''
  let escaped = false
  const path = []

  while (++cursor < length) {
    const char = name.charAt(cursor)
    if (char === '[') {
      if (escaped) {
        buffer += char
      } else {
        escaped = true
      }
    } else if (char === ']') {
      if (escaped) {
        escaped = false
      } else {
        throw new Error('Invalid table name.')
      }
    } else if (char === '.') {
      if (escaped) {
        buffer += char
      } else {
        path.push(buffer)
        buffer = ''
      }
    } else {
      buffer += char
    }
  }

  if (buffer) {
    path.push(buffer)
  }

  switch (path.length) {
    case 1:
      return {
        name: path[0],
        schema: null,
        database: null
      }

    case 2:
      return {
        name: path[1],
        schema: path[0],
        database: null
      }

    case 3:
      return {
        name: path[2],
        schema: path[1],
        database: path[0]
      }

    default:
      throw new Error('Invalid table name.')
  }
}

module.exports = Table


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Readable;

/*<replacement>*/
var processNextTick = __webpack_require__(135);
/*</replacement>*/

/*<replacement>*/
var isArray = __webpack_require__(473);
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__(31).EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(197);
/*</replacement>*/

var Buffer = __webpack_require__(12).Buffer;
/*<replacement>*/
var bufferShim = __webpack_require__(76);
/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(70);
util.inherits = __webpack_require__(71);
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(63);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(482);
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(62);

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(199).StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(62);

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options && typeof options.read === 'function') this._read = options.read;

  Stream.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;

  if (!state.objectMode && typeof chunk === 'string') {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = bufferShim.from(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var _e = new Error('stream.unshift() after end event');
      stream.emit('error', _e);
    } else {
      var skipAdd;
      if (state.decoder && !addToFront && !encoding) {
        chunk = state.decoder.write(chunk);
        skipAdd = !state.objectMode && chunk.length === 0;
      }

      if (!addToFront) state.reading = false;

      // Don't add to the buffer if we've decoded to an empty string chunk and
      // we're not in object mode
      if (!skipAdd) {
        // if we want the data now, just emit it.
        if (state.flowing && state.length === 0 && !state.sync) {
          stream.emit('data', chunk);
          stream.read(0);
        } else {
          // update the buffer info.
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

          if (state.needReadable) emitReadable(stream);
        }
      }

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(199).StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    debug('onunpipe');
    if (readable === src) {
      cleanup();
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = bufferShim.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;

var Duplex = __webpack_require__(62);

/*<replacement>*/
var util = __webpack_require__(70);
util.inherits = __webpack_require__(71);
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



module.exports = Writable;

/*<replacement>*/
var processNextTick = __webpack_require__(135);
/*</replacement>*/

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__(70);
util.inherits = __webpack_require__(71);
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(508)
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(197);
/*</replacement>*/

var Buffer = __webpack_require__(12).Buffer;
/*<replacement>*/
var bufferShim = __webpack_require__(76);
/*</replacement>*/

util.inherits(Writable, Stream);

function nop() {}

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(62);

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(62);

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = Buffer.isBuffer(chunk);

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = bufferShim.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    chunk = decodeChunk(state, chunk, encoding);
    if (Buffer.isBuffer(chunk)) encoding = 'buffer';
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync) processNextTick(cb, er);else cb(er);

  stream._writableState.errorEmitted = true;
  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    while (entry) {
      buffer[count] = entry;
      entry = entry.next;
      count += 1;
    }

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit('prefinish');
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit('finish');
    } else {
      prefinish(stream, state);
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function (err) {
    var entry = _this.entry;
    _this.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    if (state.corkedRequestsFree) {
      state.corkedRequestsFree.next = _this;
    } else {
      state.corkedRequestsFree = _this;
    }
  };
}

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(75);


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

var Stream = __webpack_require__(75);
if (process.env.READABLE_STREAM === 'disable' && Stream) {
  module.exports = Stream;
  exports = module.exports = Stream.Readable;
  exports.Readable = Stream.Readable;
  exports.Writable = Stream.Writable;
  exports.Duplex = Stream.Duplex;
  exports.Transform = Stream.Transform;
  exports.PassThrough = Stream.PassThrough;
  exports.Stream = Stream;
} else {
  exports = module.exports = __webpack_require__(194);
  exports.Stream = Stream || exports;
  exports.Readable = exports;
  exports.Writable = __webpack_require__(196);
  exports.Duplex = __webpack_require__(62);
  exports.Transform = __webpack_require__(195);
  exports.PassThrough = __webpack_require__(481);
}


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Buffer = __webpack_require__(12).Buffer;
var bufferShim = __webpack_require__(76);

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = bufferShim.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return -1;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// UTF-8 replacement characters ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd'.repeat(p);
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd'.repeat(p + 1);
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd'.repeat(p + 2);
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character for each buffered byte of a (partial)
// character needs to be added to the output.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd'.repeat(this.lastTotal - this.lastNeed);
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(38);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventEmitter = __webpack_require__(31).EventEmitter;
var WritableTrackingBuffer = __webpack_require__(93).WritableTrackingBuffer;
var TOKEN_TYPE = __webpack_require__(206).TYPE;

var FLAGS = {
  nullable: 1 << 0,
  caseSen: 1 << 1,
  updateableReadWrite: 1 << 2,
  updateableUnknown: 1 << 3,
  identity: 1 << 4,
  computed: 1 << 5, // introduced in TDS 7.2
  fixedLenCLRType: 1 << 8, // introduced in TDS 7.2
  sparseColumnSet: 1 << 10, // introduced in TDS 7.3.B
  hidden: 1 << 13, // introduced in TDS 7.2
  key: 1 << 14, // introduced in TDS 7.2
  nullableUnknown: 1 << 15 // introduced in TDS 7.2
};

var DONE_STATUS = {
  FINAL: 0x00,
  MORE: 0x1,
  ERROR: 0x2,
  INXACT: 0x4,
  COUNT: 0x10,
  ATTN: 0x20,
  SRVERROR: 0x100
};

module.exports = function (_EventEmitter) {
  (0, _inherits3.default)(BulkLoad, _EventEmitter);

  function BulkLoad(table, options1, callback) {
    (0, _classCallCheck3.default)(this, BulkLoad);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BulkLoad.__proto__ || (0, _getPrototypeOf2.default)(BulkLoad)).call(this));

    _this.error = undefined;
    _this.canceled = false;

    _this.table = table;
    _this.options = options1;
    _this.callback = callback;
    _this.columns = [];
    _this.columnsByName = {};
    _this.rowsData = new WritableTrackingBuffer(1024, 'ucs2', true);
    _this.firstRowWritten = false;
    return _this;
  }

  (0, _createClass3.default)(BulkLoad, [{
    key: 'addColumn',
    value: function addColumn(name, type, options) {
      if (options == null) {
        options = {};
      }

      if (this.firstRowWritten) {
        throw new Error('Columns cannot be added to bulk insert after the first row has been written.');
      }

      var column = {
        type: type,
        name: name,
        value: null,
        output: options.output || (options.output = false),
        length: options.length,
        precision: options.precision,
        scale: options.scale,
        objName: options.objName || name,
        nullable: options.nullable
      };

      if ((type.id & 0x30) === 0x20) {
        if (column.length == undefined && type.resolveLength) {
          column.length = type.resolveLength(column);
        }
      }

      if (type.hasPrecision) {
        if (column.precision == undefined && type.resolvePrecision) {
          column.precision = type.resolvePrecision(column);
        }
      }

      if (type.hasScale) {
        if (column.scale == undefined && type.resolveScale) {
          column.scale = type.resolveScale(column);
        }
      }

      this.columns.push(column);

      return this.columnsByName[name] = column;
    }
  }, {
    key: 'addRow',
    value: function addRow(row) {
      this.firstRowWritten = true;

      if (arguments.length > 1 || !row || typeof row !== 'object') {
        // convert arguments to array in a way the optimizer can handle
        var arrTemp = new Array(arguments.length);
        for (var i = 0, len = arguments.length; i < len; i++) {
          var c = arguments[i];
          arrTemp[i] = c;
        }
        row = arrTemp;
      }

      // write row token
      this.rowsData.writeUInt8(TOKEN_TYPE.ROW);

      // write each column
      var arr = row instanceof Array;
      for (var _i = 0, _len = this.columns.length; _i < _len; _i++) {
        var _c = this.columns[_i];
        _c.type.writeParameterData(this.rowsData, {
          length: _c.length,
          scale: _c.scale,
          precision: _c.precision,
          value: row[arr ? _i : _c.objName]
        }, this.options);
      }
    }
  }, {
    key: 'getBulkInsertSql',
    value: function getBulkInsertSql() {
      var sql = 'insert bulk ' + this.table + '(';
      for (var i = 0, len = this.columns.length; i < len; i++) {
        var c = this.columns[i];
        if (i !== 0) {
          sql += ', ';
        }
        sql += '[' + c.name + '] ' + c.type.declaration(c);
      }
      sql += ')';
      return sql;
    }
  }, {
    key: 'getTableCreationSql',
    value: function getTableCreationSql() {
      var sql = 'CREATE TABLE ' + this.table + '(\n';
      for (var i = 0, len = this.columns.length; i < len; i++) {
        var c = this.columns[i];
        if (i !== 0) {
          sql += ',\n';
        }
        sql += '[' + c.name + '] ' + c.type.declaration(c);
        if (c.nullable !== undefined) {
          sql += ' ' + (c.nullable ? 'NULL' : 'NOT NULL');
        }
      }
      sql += '\n)';
      return sql;
    }
  }, {
    key: 'getPayload',
    value: function getPayload() {
      // Create COLMETADATA token
      var metaData = this.getColMetaData();
      var length = metaData.length;

      // row data
      var rows = this.rowsData.data;
      length += rows.length;

      // Create DONE token
      // It might be nice to make DoneToken a class if anything needs to create them, but for now, just do it here
      var tBuf = new WritableTrackingBuffer(this.options.tdsVersion < '7_2' ? 9 : 13);
      tBuf.writeUInt8(TOKEN_TYPE.DONE);
      var status = DONE_STATUS.FINAL;
      tBuf.writeUInt16LE(status);
      tBuf.writeUInt16LE(0); // CurCmd (TDS ignores this)
      tBuf.writeUInt32LE(0); // row count - doesn't really matter
      if (this.options.tdsVersion >= '7_2') {
        tBuf.writeUInt32LE(0); // row count is 64 bits in >= TDS 7.2
      }

      var done = tBuf.data;
      length += done.length;

      // composite payload
      var payload = new WritableTrackingBuffer(length);
      payload.copyFrom(metaData);
      payload.copyFrom(rows);
      payload.copyFrom(done);
      return payload;
    }
  }, {
    key: 'getColMetaData',
    value: function getColMetaData() {
      var tBuf = new WritableTrackingBuffer(100, null, true);
      // TokenType
      tBuf.writeUInt8(TOKEN_TYPE.COLMETADATA);
      // Count
      tBuf.writeUInt16LE(this.columns.length);

      for (var j = 0, len = this.columns.length; j < len; j++) {
        var c = this.columns[j];
        // UserType
        if (this.options.tdsVersion < '7_2') {
          tBuf.writeUInt16LE(0);
        } else {
          tBuf.writeUInt32LE(0);
        }

        // Flags
        var flags = FLAGS.updateableReadWrite;
        if (c.nullable) {
          flags |= FLAGS.nullable;
        } else if (c.nullable === undefined && this.options.tdsVersion >= '7_2') {
          flags |= FLAGS.nullableUnknown;
        }
        tBuf.writeUInt16LE(flags);

        // TYPE_INFO
        c.type.writeTypeInfo(tBuf, c, this.options);

        // ColName
        tBuf.writeBVarchar(c.name, 'ucs2');
      }
      return tBuf.data;
    }
  }]);
  return BulkLoad;
}(EventEmitter);

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// http://technet.microsoft.com/en-us/library/aa176553(v=sql.80).aspx

module.exports.codepageByLcid = {
  0x436: 'CP1252',
  0x401: 'CP1256',
  0x801: 'CP1256',
  0xC01: 'CP1256',
  0x1001: 'CP1256',
  0x1401: 'CP1256',
  0x1801: 'CP1256',
  0x1C01: 'CP1256',
  0x2001: 'CP1256',
  0x2401: 'CP1256',
  0x2801: 'CP1256',
  0x2C01: 'CP1256',
  0x3001: 'CP1256',
  0x3401: 'CP1256',
  0x3801: 'CP1256',
  0x3C01: 'CP1256',
  0x4001: 'CP1256',
  0x42D: 'CP1252',
  0x423: 'CP1251',
  0x402: 'CP1251',
  0x403: 'CP1252',
  0x30404: 'CP950',
  0x404: 'CP950',
  0x804: 'CP936',
  0x20804: 'CP936',
  0x1004: 'CP936',
  0x41a: 'CP1250',
  0x405: 'CP1250',
  0x406: 'CP1252',
  0x413: 'CP1252',
  0x813: 'CP1252',
  0x409: 'CP1252',
  0x809: 'CP1252',
  0x1009: 'CP1252',
  0x1409: 'CP1252',
  0xC09: 'CP1252',
  0x1809: 'CP1252',
  0x1C09: 'CP1252',
  0x2409: 'CP1252',
  0x2009: 'CP1252',
  0x425: 'CP1257',
  0x0438: 'CP1252',
  0x429: 'CP1256',
  0x40B: 'CP1252',
  0x40C: 'CP1252',
  0x80C: 'CP1252',
  0x100C: 'CP1252',
  0xC0C: 'CP1252',
  0x140C: 'CP1252',
  0x10437: 'CP1252',
  0x10407: 'CP1252',
  0x407: 'CP1252',
  0x807: 'CP1252',
  0xC07: 'CP1252',
  0x1007: 'CP1252',
  0x1407: 'CP1252',
  0x408: 'CP1253',
  0x40D: 'CP1255',
  0x439: 'CPUTF8',
  0x40E: 'CP1250',
  0x104E: 'CP1250',
  0x40F: 'CP1252',
  0x421: 'CP1252',
  0x410: 'CP1252',
  0x810: 'CP1252',
  0x411: 'CP932',
  0x10411: 'CP932',
  0x412: 'CP949',
  0x426: 'CP1257',
  0x427: 'CP1257',
  0x827: 'CP1257',
  0x41C: 'CP1251',
  0x414: 'CP1252',
  0x814: 'CP1252',
  0x415: 'CP1250',
  0x816: 'CP1252',
  0x416: 'CP1252',
  0x418: 'CP1250',
  0x419: 'CP1251',
  0x81A: 'CP1251',
  0xC1A: 'CP1251',
  0x41B: 'CP1250',
  0x424: 'CP1250',
  0x80A: 'CP1252',
  0x40A: 'CP1252',
  0xC0A: 'CP1252',
  0x100A: 'CP1252',
  0x140A: 'CP1252',
  0x180A: 'CP1252',
  0x1C0A: 'CP1252',
  0x200A: 'CP1252',
  0x240A: 'CP1252',
  0x280A: 'CP1252',
  0x2C0A: 'CP1252',
  0x300A: 'CP1252',
  0x340A: 'CP1252',
  0x380A: 'CP1252',
  0x3C0A: 'CP1252',
  0x400A: 'CP1252',
  0x41D: 'CP1252',
  0x41E: 'CP874',
  0x41F: 'CP1254',
  0x422: 'CP1251',
  0x420: 'CP1256',
  0x42A: 'CP1258'
};

module.exports.codepageBySortId = {
  30: 'CP437', // SQL_Latin1_General_CP437_BIN
  31: 'CP437', // SQL_Latin1_General_CP437_CS_AS
  32: 'CP437', // SQL_Latin1_General_CP437_CI_AS
  33: 'CP437', // SQL_Latin1_General_Pref_CP437_CI_AS
  34: 'CP437', // SQL_Latin1_General_CP437_CI_AI
  40: 'CP850', // SQL_Latin1_General_CP850_BIN
  41: 'CP850', // SQL_Latin1_General_CP850_CS_AS
  42: 'CP850', // SQL_Latin1_General_CP850_CI_AS
  43: 'CP850', // SQL_Latin1_General_Pref_CP850_CI_AS
  44: 'CP850', // SQL_Latin1_General_CP850_CI_AI
  49: 'CP850', // SQL_1xCompat_CP850_CI_AS
  51: 'CP1252', // SQL_Latin1_General_Cp1_CS_AS_KI_WI
  52: 'CP1252', // SQL_Latin1_General_Cp1_CI_AS_KI_WI
  53: 'CP1252', // SQL_Latin1_General_Pref_Cp1_CI_AS_KI_WI
  54: 'CP1252', // SQL_Latin1_General_Cp1_CI_AI_KI_WI
  55: 'CP850', // SQL_AltDiction_CP850_CS_AS
  56: 'CP850', // SQL_AltDiction_Pref_CP850_CI_AS
  57: 'CP850', // SQL_AltDiction_CP850_CI_AI
  58: 'CP850', // SQL_Scandinavian_Pref_CP850_CI_AS
  59: 'CP850', // SQL_Scandinavian_CP850_CS_AS
  60: 'CP850', // SQL_Scandinavian_CP850_CI_AS
  61: 'CP850', // SQL_AltDiction_CP850_CI_AS
  80: 'CP1250', // SQL_Latin1_General_1250_BIN
  81: 'CP1250', // SQL_Latin1_General_CP1250_CS_AS
  82: 'CP1250', // SQL_Latin1_General_Cp1250_CI_AS_KI_WI
  83: 'CP1250', // SQL_Czech_Cp1250_CS_AS_KI_WI
  84: 'CP1250', // SQL_Czech_Cp1250_CI_AS_KI_WI
  85: 'CP1250', // SQL_Hungarian_Cp1250_CS_AS_KI_WI
  86: 'CP1250', // SQL_Hungarian_Cp1250_CI_AS_KI_WI
  87: 'CP1250', // SQL_Polish_Cp1250_CS_AS_KI_WI
  88: 'CP1250', // SQL_Polish_Cp1250_CI_AS_KI_WI
  89: 'CP1250', // SQL_Romanian_Cp1250_CS_AS_KI_WI
  90: 'CP1250', // SQL_Romanian_Cp1250_CI_AS_KI_WI
  91: 'CP1250', // SQL_Croatian_Cp1250_CS_AS_KI_WI
  92: 'CP1250', // SQL_Croatian_Cp1250_CI_AS_KI_WI
  93: 'CP1250', // SQL_Slovak_Cp1250_CS_AS_KI_WI
  94: 'CP1250', // SQL_Slovak_Cp1250_CI_AS_KI_WI
  95: 'CP1250', // SQL_Slovenian_Cp1250_CS_AS_KI_WI
  96: 'CP1250', // SQL_Slovenian_Cp1250_CI_AS_KI_WI
  104: 'CP1251', // SQL_Latin1_General_1251_BIN
  105: 'CP1251', // SQL_Latin1_General_CP1251_CS_AS
  106: 'CP1251', // SQL_Latin1_General_CP1251_CI_AS
  107: 'CP1251', // SQL_Ukrainian_Cp1251_CS_AS_KI_WI
  108: 'CP1251', // SQL_Ukrainian_Cp1251_CI_AS_KI_WI
  112: 'CP1253', // SQL_Latin1_General_1253_BIN
  113: 'CP1253', // SQL_Latin1_General_CP1253_CS_AS
  114: 'CP1253', // SQL_Latin1_General_CP1253_CI_AS
  120: 'CP1253', // SQL_MixDiction_CP1253_CS_AS
  121: 'CP1253', // SQL_AltDiction_CP1253_CS_AS
  122: 'CP1253', // SQL_AltDiction2_CP1253_CS_AS
  124: 'CP1253', // SQL_Latin1_General_CP1253_CI_AI
  128: 'CP1254', // SQL_Latin1_General_1254_BIN
  129: 'CP1254', // SQL_Latin1_General_Cp1254_CS_AS_KI_WI
  130: 'CP1254', // SQL_Latin1_General_Cp1254_CI_AS_KI_WI
  136: 'CP1255', // SQL_Latin1_General_1255_BIN
  137: 'CP1255', // SQL_Latin1_General_CP1255_CS_AS
  138: 'CP1255', // SQL_Latin1_General_CP1255_CI_AS
  144: 'CP1256', // SQL_Latin1_General_1256_BIN
  145: 'CP1256', // SQL_Latin1_General_CP1256_CS_AS
  146: 'CP1256', // SQL_Latin1_General_CP1256_CI_AS
  152: 'CP1257', // SQL_Latin1_General_1257_BIN
  153: 'CP1257', // SQL_Latin1_General_CP1257_CS_AS
  154: 'CP1257', // SQL_Latin1_General_CP1257_CI_AS
  155: 'CP1257', // SQL_Estonian_Cp1257_CS_AS_KI_WI
  156: 'CP1257', // SQL_Estonian_Cp1257_CI_AS_KI_WI
  157: 'CP1257', // SQL_Latvian_Cp1257_CS_AS_KI_WI
  158: 'CP1257', // SQL_Latvian_Cp1257_CI_AS_KI_WI
  159: 'CP1257', // SQL_Lithuanian_Cp1257_CS_AS_KI_WI
  160: 'CP1257', // SQL_Lithuanian_Cp1257_CI_AS_KI_WI
  183: 'CP1252', // SQL_Danish_Pref_Cp1_CI_AS_KI_WI
  184: 'CP1252', // SQL_SwedishPhone_Pref_Cp1_CI_AS_KI_WI
  185: 'CP1252', // SQL_SwedishStd_Pref_Cp1_CI_AS_KI_WI
  186: 'CP1252' // SQL_Icelandic_Pref_Cp1_CI_AS_KI_WI
};

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MAP = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '0A', '0B', '0C', '0D', '0E', '0F', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '1A', '1B', '1C', '1D', '1E', '1F', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '2A', '2B', '2C', '2D', '2E', '2F', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '3A', '3B', '3C', '3D', '3E', '3F', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '4A', '4B', '4C', '4D', '4E', '4F', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '5A', '5B', '5C', '5D', '5E', '5F', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '6A', '6B', '6C', '6D', '6E', '6F', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '7A', '7B', '7C', '7D', '7E', '7F', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '8A', '8B', '8C', '8D', '8E', '8F', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '9A', '9B', '9C', '9D', '9E', '9F', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'BA', 'BB', 'BC', 'BD', 'BE', 'BF', 'C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'CA', 'CB', 'CC', 'CD', 'CE', 'CF', 'D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'DA', 'DB', 'DC', 'DD', 'DE', 'DF', 'E0', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'EA', 'EB', 'EC', 'ED', 'EE', 'EF', 'F0', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'FA', 'FB', 'FC', 'FD', 'FE', 'FF'];

module.exports.arrayToGuid = arrayToGuid;
function arrayToGuid(array) {
  return MAP[array[3]] + MAP[array[2]] + MAP[array[1]] + MAP[array[0]] + '-' + MAP[array[5]] + MAP[array[4]] + '-' + MAP[array[7]] + MAP[array[6]] + '-' + MAP[array[8]] + MAP[array[9]] + '-' + MAP[array[10]] + MAP[array[11]] + MAP[array[12]] + MAP[array[13]] + MAP[array[14]] + MAP[array[15]];
}

var CHARCODEMAP = {};

var hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'A', 'B', 'C', 'D', 'E', 'F'].map(function (d) {
  return d.charCodeAt(0);
});

for (var i = 0; i < hexDigits.length; i++) {
  var map = CHARCODEMAP[hexDigits[i]] = {};
  for (var j = 0; j < hexDigits.length; j++) {
    var hex = String.fromCharCode(hexDigits[i], hexDigits[j]);
    var value = parseInt(hex, 16);
    map[hexDigits[j]] = value;
  }
}

module.exports.guidToArray = guidToArray;
function guidToArray(guid) {
  return [CHARCODEMAP[guid.charCodeAt(6)][guid.charCodeAt(7)], CHARCODEMAP[guid.charCodeAt(4)][guid.charCodeAt(5)], CHARCODEMAP[guid.charCodeAt(2)][guid.charCodeAt(3)], CHARCODEMAP[guid.charCodeAt(0)][guid.charCodeAt(1)], CHARCODEMAP[guid.charCodeAt(11)][guid.charCodeAt(12)], CHARCODEMAP[guid.charCodeAt(9)][guid.charCodeAt(10)], CHARCODEMAP[guid.charCodeAt(16)][guid.charCodeAt(17)], CHARCODEMAP[guid.charCodeAt(14)][guid.charCodeAt(15)], CHARCODEMAP[guid.charCodeAt(19)][guid.charCodeAt(20)], CHARCODEMAP[guid.charCodeAt(21)][guid.charCodeAt(22)], CHARCODEMAP[guid.charCodeAt(24)][guid.charCodeAt(25)], CHARCODEMAP[guid.charCodeAt(26)][guid.charCodeAt(27)], CHARCODEMAP[guid.charCodeAt(28)][guid.charCodeAt(29)], CHARCODEMAP[guid.charCodeAt(30)][guid.charCodeAt(31)], CHARCODEMAP[guid.charCodeAt(32)][guid.charCodeAt(33)], CHARCODEMAP[guid.charCodeAt(34)][guid.charCodeAt(35)]];
}

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports.name = 'Tedious';

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(38);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventEmitter = __webpack_require__(31).EventEmitter;
var TYPES = __webpack_require__(91).typeByName;
var RequestError = __webpack_require__(73).RequestError;

module.exports = function (_EventEmitter) {
  (0, _inherits3.default)(Request, _EventEmitter);

  function Request(sqlTextOrProcedure, callback) {
    (0, _classCallCheck3.default)(this, Request);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Request.__proto__ || (0, _getPrototypeOf2.default)(Request)).call(this));

    _this.sqlTextOrProcedure = sqlTextOrProcedure;
    _this.callback = callback;
    _this.parameters = [];
    _this.parametersByName = {};
    _this.userCallback = _this.callback;
    _this.callback = function () {
      if (this.preparing) {
        this.emit('prepared');
        return this.preparing = false;
      } else {
        this.userCallback.apply(this, arguments);
        return this.emit('requestCompleted');
      }
    };
    return _this;
  }

  (0, _createClass3.default)(Request, [{
    key: 'addParameter',
    value: function addParameter(name, type, value, options) {
      if (options == null) {
        options = {};
      }

      var parameter = {
        type: type,
        name: name,
        value: value,
        output: options.output || (options.output = false),
        length: options.length,
        precision: options.precision,
        scale: options.scale
      };
      this.parameters.push(parameter);
      return this.parametersByName[name] = parameter;
    }
  }, {
    key: 'addOutputParameter',
    value: function addOutputParameter(name, type, value, options) {
      if (options == null) {
        options = {};
      }
      options.output = true;
      return this.addParameter(name, type, value, options);
    }
  }, {
    key: 'makeParamsParameter',
    value: function makeParamsParameter(parameters) {
      var paramsParameter = '';
      for (var i = 0, len = parameters.length; i < len; i++) {
        var parameter = parameters[i];
        if (paramsParameter.length > 0) {
          paramsParameter += ', ';
        }
        paramsParameter += '@' + parameter.name + ' ';
        paramsParameter += parameter.type.declaration(parameter);
        if (parameter.output) {
          paramsParameter += ' OUTPUT';
        }
      }
      return paramsParameter;
    }
  }, {
    key: 'transformIntoExecuteSqlRpc',
    value: function transformIntoExecuteSqlRpc() {
      if (this.validateParameters()) {
        return;
      }

      this.originalParameters = this.parameters;
      this.parameters = [];
      this.addParameter('statement', TYPES.NVarChar, this.sqlTextOrProcedure);
      if (this.originalParameters.length) {
        this.addParameter('params', TYPES.NVarChar, this.makeParamsParameter(this.originalParameters));
      }

      for (var i = 0, len = this.originalParameters.length; i < len; i++) {
        var parameter = this.originalParameters[i];
        this.parameters.push(parameter);
      }
      return this.sqlTextOrProcedure = 'sp_executesql';
    }
  }, {
    key: 'transformIntoPrepareRpc',
    value: function transformIntoPrepareRpc() {
      var _this2 = this;

      this.originalParameters = this.parameters;
      this.parameters = [];
      this.addOutputParameter('handle', TYPES.Int);
      this.addParameter('params', TYPES.NVarChar, this.makeParamsParameter(this.originalParameters));
      this.addParameter('stmt', TYPES.NVarChar, this.sqlTextOrProcedure);
      this.sqlTextOrProcedure = 'sp_prepare';
      this.preparing = true;
      return this.on('returnValue', function (name, value) {
        if (name === 'handle') {
          return _this2.handle = value;
        } else {
          return _this2.error = RequestError('Tedious > Unexpected output parameter ' + name + ' from sp_prepare');
        }
      });
    }
  }, {
    key: 'transformIntoUnprepareRpc',
    value: function transformIntoUnprepareRpc() {
      this.parameters = [];
      this.addParameter('handle', TYPES.Int, this.handle);
      return this.sqlTextOrProcedure = 'sp_unprepare';
    }
  }, {
    key: 'transformIntoExecuteRpc',
    value: function transformIntoExecuteRpc(parameters) {
      this.parameters = [];
      this.addParameter('handle', TYPES.Int, this.handle);

      for (var i = 0, len = this.originalParameters.length; i < len; i++) {
        var parameter = this.originalParameters[i];
        parameter.value = parameters[parameter.name];
        this.parameters.push(parameter);
      }

      if (this.validateParameters()) {
        return;
      }

      return this.sqlTextOrProcedure = 'sp_execute';
    }
  }, {
    key: 'validateParameters',
    value: function validateParameters() {
      for (var i = 0, len = this.parameters.length; i < len; i++) {
        var parameter = this.parameters[i];
        var value = parameter.type.validate(parameter.value);
        if (value instanceof TypeError) {
          return this.error = new RequestError('Validation failed for parameter \'' + parameter.name + '\'. ' + value.message, 'EPARAM');
        }
        parameter.value = value;
      }
      return null;
    }
  }]);
  return Request;
}(EventEmitter);

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function parseToken(parser, options, callback) {
  // length
  parser.readUInt16LE(function () {
    parser.readUInt32LE(function (number) {
      parser.readUInt8(function (state) {
        parser.readUInt8(function (clazz) {
          parser.readUsVarChar(function (message) {
            parser.readBVarChar(function (serverName) {
              parser.readBVarChar(function (procName) {
                (options.tdsVersion < '7_2' ? parser.readUInt16LE : parser.readUInt32LE).call(parser, function (lineNumber) {
                  callback({
                    'number': number,
                    'state': state,
                    'class': clazz,
                    'message': message,
                    'serverName': serverName,
                    'procName': procName,
                    'lineNumber': lineNumber
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

module.exports.infoParser = infoParser;
function infoParser(parser, colMetadata, options, callback) {
  parseToken(parser, options, function (token) {
    token.name = 'INFO';
    token.event = 'infoMessage';
    callback(token);
  });
}

module.exports.errorParser = errorParser;
function errorParser(parser, colMetadata, options, callback) {
  parseToken(parser, options, function (token) {
    token.name = 'ERROR';
    token.event = 'errorMessage';
    callback(token);
  });
}

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports.TYPE = {
  ALTMETADATA: 0x88,
  ALTROW: 0xD3,
  COLMETADATA: 0x81,
  COLINFO: 0xA5,
  DONE: 0xFD,
  DONEPROC: 0xFE,
  DONEINPROC: 0xFF,
  ENVCHANGE: 0xE3,
  ERROR: 0xAA,
  INFO: 0xAB,
  LOGINACK: 0xAD,
  NBCROW: 0xD2,
  OFFSET: 0x78,
  ORDER: 0xA9,
  RETURNSTATUS: 0x79,
  RETURNVALUE: 0xAC,
  ROW: 0xD1,
  SSPI: 0xED,
  TABNAME: 0xA4
};

/***/ }),
/* 207 */
/***/ (function(module, exports) {

module.exports = require("dns");

/***/ }),
/* 208 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sqlServerClient = __webpack_require__(211);

var _sqlServerClient2 = _interopRequireDefault(_sqlServerClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var msql = new _sqlServerClient2.default();

var list = msql.connect().then(function (resp) {
  console.log("LIST: ");
  console.log(resp);
});

exports.default = _sqlServerClient2.default;

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(433);

__webpack_require__(483);

__webpack_require__(218);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(436);
var sql = __webpack_require__(475);

var MSQLServerClient = function () {
  function MSQLServerClient() {
    _classCallCheck(this, MSQLServerClient);

    // TODO: handle this data as envirionment variables
    this.config = {
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      server: process.env.DB_SERVER,
      stream: true,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE
    };
    // this.address = `mssql://${this.config.user}:${this.config.password}@${this.config.url}:${this.config.port}/${this.config.database}?encrypt=true}`
    console.log(this.config);
  }

  _createClass(MSQLServerClient, [{
    key: 'connect',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var pool, request, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log(this.config);
                _context.prev = 1;

                console.log('CONNECT');
                _context.next = 5;
                return sql.connect(this.config);

              case 5:
                pool = _context.sent;
                request = new sql.Request();

                console.log(request);
                _context.next = 10;
                return request.query('select * from CRM_listado1_mtkta;');

              case 10:
                response = _context.sent;
                return _context.abrupt('return', response);

              case 14:
                _context.prev = 14;
                _context.t0 = _context['catch'](1);

                console.log(_context.t0);

              case 17:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 14]]);
      }));

      function connect() {
        return _ref.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: 'foo',
    value: function foo() {
      console.log('JIMI!');
    }
  }]);

  return MSQLServerClient;
}();

exports.default = MSQLServerClient;

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(220), __esModule: true };

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(222), __esModule: true };

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(223), __esModule: true };

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(224), __esModule: true };

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(217);


/***/ }),
/* 217 */
/***/ (function(module, exports) {

/*!
 * n.js -> Arithmetic operations on big integers
 * Pure javascript implementation, no external libraries needed
 * Copyright(c) 2012-2014 Alex Bardas <alex.bardas@gmail.com>
 * MIT Licensed
 * It supports the following operations:
 *      addition, subtraction, multiplication, division, power, absolute value
 * It works with both positive and negative integers
 */

;(function(exports, undefined) {

    var version = "0.3.1";

    // Helper function which tests if a given character is a digit
    var test_digit = function(digit) {
        return (/^\d$/.test(digit));
    };
    // Helper function which returns the absolute value of a given number
    var abs = function(n) {
        // if the function is called with no arguments then return
        if (typeof n === 'undefined')
            return;
        var x = new BigNumber(n, true);
        x.sign = 1;
        return x;
    };

    exports.n = function (number) {
        return new BigNumber(number);
    };

    var errors = {
        "invalid": "Invalid Number",
        "division by zero": "Invalid Number - Division By Zero"
    };
    // constructor function which creates a new BigNumber object
    // from an integer, a string, an array or other BigNumber object
    // if new_copy is true, the function returns a new object instance
    var BigNumber = function(x, new_copy) {
        var i;
        this.number = [];
        this.sign = 1;
        this.rest = 0;

        if (!x) {
            this.number = [0];
            return;
        }

        if (x.constructor === BigNumber) {
            return new_copy ? new BigNumber(x.toString()) : x;
       }

        // x can be an array or object
        // eg array: [3,2,1], ['+',3,2,1], ['-',3,2,1]
        // eg string: '321', '+321', -321'
        // every character except the first must be a digit

        if (typeof x == 'object') {
            if (x.length && x[0] === '-' || x[0] === '+') {
                this.sign = x[0] === '+' ? 1 : -1;
                x.shift(0);
            }
            for (i=x.length-1; i>=0; --i) {
                if (!this.add_digit(x[i], x))
                    return;
            }
        }

        else {
            x = x.toString();
            if (x.charAt(0) === '-' || x.charAt(0) === '+') {
                this.sign = x.charAt(0) === '+' ? 1 : -1;
                x = x.substring(1);
            }

            for (i=x.length-1; i>=0; --i) {
                if (!this.add_digit(parseInt(x.charAt(i), 10), x)) {
                    return;
                }
            }
        }
    };

    BigNumber.prototype.add_digit = function(digit, x) {
        if (test_digit(digit))
            this.number.push(digit);
        else {
            //throw (x || digit) + " is not a valid number";
            this.number = errors['invalid'];
            return false;
        }

        return this;
    };

    // returns:
    //      0 if this.number === n
    //      -1 if this.number < n
    //      1 if this.number > n
    BigNumber.prototype._compare = function(n) {
        // if the function is called with no arguments then return 0
        if (typeof n === 'undefined')
            return 0;

        var x = new BigNumber(n);
        var i;

        // If the numbers have different signs, then the positive
        // number is greater
        if (this.sign !== x.sign)
            return this.sign;

        // Else, check the length
        if (this.number.length > x.number.length)
            return this.sign;
        else if (this.number.length < x.number.length)
            return this.sign*(-1);

        // If they have similar length, compare the numbers
        // digit by digit
        for (i = this.number.length-1; i >= 0; --i) {
            if (this.number[i] > x.number[i])
                return this.sign;
            else if (this.number[i] < x.number[i])
                return this.sign * (-1);
        }

        return 0;
    };

    // greater than
    BigNumber.prototype.gt = function(n) {
        return this._compare(n) > 0;
    };

    // greater than or equal
    BigNumber.prototype.gte = function(n) {
        return this._compare(n) >= 0;
    };

    // this.number equals n
    BigNumber.prototype.equals = function(n) {
        return this._compare(n) === 0;
    };

    // less than or equal
    BigNumber.prototype.lte = function(n) {
        return this._compare(n) <= 0;
    };

    // less than
    BigNumber.prototype.lt = function(n) {
        return this._compare(n) < 0;
    };

    // this.number + n
    BigNumber.prototype.add = function(n) {
        // if the function is called with no arguments then return
        if (typeof n === 'undefined')
            return this;
        var x = new BigNumber(n);

        if (this.sign !== x.sign) {
            if (this.sign > 0) {
                x.sign = 1;
                return this.minus(x);
            }
            else {
                this.sign = 1;
                return x.minus(this);
            }
        }

        this.number = BigNumber._add(this, x);
        return this;
    };

    // this.number - n
    BigNumber.prototype.subtract = function(n) {
        // if the function is called with no arguments then return
        if (typeof n === 'undefined')
            return this;
        var x = new BigNumber(n);

        if (this.sign !== x.sign) {
            this.number = BigNumber._add(this, x);
            return this;
        }

        // if current number is lesser than x, final result will be negative
        this.sign = (this.lt(x)) ? -1 : 1;
        this.number = (abs(this).lt(abs(x))) ?
            BigNumber._subtract(x, this) :
            BigNumber._subtract(this, x);

        return this;
    };

    // adds two positive BigNumbers
    BigNumber._add = function(a, b) {
        var i;
        var remainder = 0;
        var length = Math.max(a.number.length, b.number.length);

        for (i = 0; i < length || remainder > 0; ++i) {
            a.number[i] = (remainder += (a.number[i] || 0) + (b.number[i] || 0)) % 10;
            remainder = Math.floor(remainder/10);
        }

        return a.number;
    };

    // decreases b from a
    // a and b are 2 positive BigNumbers and a > b
    BigNumber._subtract = function(a, b) {
        var i;
        var remainder = 0;
        var length = a.number.length;

        for (i = 0; i < length; ++i) {
            a.number[i] -= (b.number[i] || 0) + remainder;
            a.number[i] += (remainder = (a.number[i] < 0) ? 1 : 0) * 10;
        }
        // let's optimize a bit, and count the zeroes which need to be removed
        i = 0;
        length = a.number.length - 1;
        while (a.number[length - i] === 0 && length - i > 0)
            i++;
        if (i > 0)
            a.number.splice(-i);
        return a.number;
    };

    // this.number * n
    BigNumber.prototype.multiply = function(n) {
        // if the function is called with no arguments then return
        if (typeof n === 'undefined')
            return this;
        var x = new BigNumber(n);
        var i;
        var j;
        var remainder = 0;
        var result = [];
        // test if one of the numbers is zero
        if (this.isZero() || x.isZero()) {
            return new BigNumber(0);
        }

        this.sign *= x.sign;

        // multiply the numbers
        for (i = 0; i < this.number.length; ++i) {
            for (remainder = 0, j = 0; j < x.number.length || remainder > 0; ++j) {
                result[i + j] = (remainder += (result[i + j] || 0) + this.number[i] * (x.number[j] || 0)) % 10;
                remainder = Math.floor(remainder / 10);
            }
        }

        this.number = result;
        return this;
    };

    // this.number / n
    BigNumber.prototype.divide = function(n) {
        // if the function is called with no arguments then return
        if (typeof n === 'undefined') {
            return this;
        }
        var x = new BigNumber(n);
        var i;
        var j;
        var length;
        var remainder = 0;
        var result = [];
        var rest = new BigNumber();
        // test if one of the numbers is zero
        if (x.isZero()) {
            this.number = errors['division by zero'];
            return this;
        }
        else if (this.isZero()) {
            return new BigNumber(0);
        }
        this.sign *= x.sign;
        x.sign = 1;
        // every number divided by 1 is the same number, so don't waste time dividing them
        if (x.number.length === 1 && x.number[0] === 1)
            return this;

        for (i = this.number.length - 1; i >= 0; i--) {
            rest.multiply(10);
            rest.number[0] = this.number[i];
            result[i] = 0;
            while (x.lte(rest)) {
                result[i]++;
                rest.subtract(x);
            }
        }

        i = 0;
        length = result.length-1;
        while (result[length - i] === 0 && length - i > 0)
            i++;
        if (i > 0)
            result.splice(-i);

        // returns the rest as a string
        this.rest = rest;
        this.number = result;
        return this;
    };

    // this.number % n
    BigNumber.prototype.mod = function(n) {
        return this.divide(n).rest;
    };

    // n must be a positive number
    BigNumber.prototype.power = function(n) {
        if (typeof n === 'undefined')
            return;
        var num;
        // Convert the argument to a number
        n = +n;
        if (n === 0)
            return new BigNumber(1);
        if (n === 1)
            return this;

        num = new BigNumber(this, true);

        this.number = [1];
        while (n > 0) {
            if (n % 2 === 1) {
                this.multiply(num);
                n--;
                continue;
            }
            num.multiply(num);
            n = Math.floor(n / 2);
        }

        return this;
    };

    // |this.number|
    BigNumber.prototype.abs = function() {
        this.sign = 1;
        return this;
    };

    // is this.number == 0 ?
    BigNumber.prototype.isZero = function() {
        return (this.number.length === 1 && this.number[0] === 0);
    };

    // this.number.toString()
    BigNumber.prototype.toString = function() {
        var i;
        var x = '';
        if (typeof this.number === "string")
            return this.number;

        for (i = this.number.length-1; i >= 0; --i)
            x += this.number[i];

        return (this.sign > 0) ? x : ('-' + x);
    };

    // Use shorcuts for functions names
    BigNumber.prototype.plus = BigNumber.prototype.add;
    BigNumber.prototype.minus = BigNumber.prototype.subtract;
    BigNumber.prototype.div = BigNumber.prototype.divide;
    BigNumber.prototype.mult = BigNumber.prototype.multiply;
    BigNumber.prototype.pow = BigNumber.prototype.power;
    BigNumber.prototype.val = BigNumber.prototype.toString;
})(this);


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(262);
module.exports = __webpack_require__(27).RegExp.escape;

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(244);
var $Object = __webpack_require__(32).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(245);
var $Object = __webpack_require__(32).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(246);
module.exports = __webpack_require__(32).Object.getPrototypeOf;

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(247);
module.exports = __webpack_require__(32).Object.setPrototypeOf;

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(250);
__webpack_require__(248);
__webpack_require__(251);
__webpack_require__(252);
module.exports = __webpack_require__(32).Symbol;

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(249);
__webpack_require__(253);
module.exports = __webpack_require__(107).f('iterator');

/***/ }),
/* 225 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 226 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(44)
  , toLength  = __webpack_require__(242)
  , toIndex   = __webpack_require__(241);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(77)
  , gOPS    = __webpack_require__(153)
  , pIE     = __webpack_require__(100);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(33).document && document.documentElement;

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(146);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(146);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(99)
  , descriptor     = __webpack_require__(78)
  , setToStringTag = __webpack_require__(101)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(55)(IteratorPrototype, __webpack_require__(56)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 233 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(77)
  , toIObject = __webpack_require__(44);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(79)('meta')
  , isObject = __webpack_require__(66)
  , has      = __webpack_require__(42)
  , setDesc  = __webpack_require__(43).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(65)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(43)
  , anObject = __webpack_require__(64)
  , getKeys  = __webpack_require__(77);

module.exports = __webpack_require__(41) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(44)
  , gOPN      = __webpack_require__(152).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(54)
  , core    = __webpack_require__(32)
  , fails   = __webpack_require__(65);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(66)
  , anObject = __webpack_require__(64);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(147)(Function.call, __webpack_require__(151).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(104)
  , defined   = __webpack_require__(95);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(104)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(104)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(226)
  , step             = __webpack_require__(233)
  , Iterators        = __webpack_require__(97)
  , toIObject        = __webpack_require__(44);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(150)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(54)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(99)});

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(54);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(41), 'Object', {defineProperty: __webpack_require__(43).f});

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(157)
  , $getPrototypeOf = __webpack_require__(154);

__webpack_require__(238)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(54);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(239).set});

/***/ }),
/* 248 */
/***/ (function(module, exports) {



/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(240)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(150)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(33)
  , has            = __webpack_require__(42)
  , DESCRIPTORS    = __webpack_require__(41)
  , $export        = __webpack_require__(54)
  , redefine       = __webpack_require__(156)
  , META           = __webpack_require__(235).KEY
  , $fails         = __webpack_require__(65)
  , shared         = __webpack_require__(103)
  , setToStringTag = __webpack_require__(101)
  , uid            = __webpack_require__(79)
  , wks            = __webpack_require__(56)
  , wksExt         = __webpack_require__(107)
  , wksDefine      = __webpack_require__(106)
  , keyOf          = __webpack_require__(234)
  , enumKeys       = __webpack_require__(228)
  , isArray        = __webpack_require__(231)
  , anObject       = __webpack_require__(64)
  , toIObject      = __webpack_require__(44)
  , toPrimitive    = __webpack_require__(105)
  , createDesc     = __webpack_require__(78)
  , _create        = __webpack_require__(99)
  , gOPNExt        = __webpack_require__(237)
  , $GOPD          = __webpack_require__(151)
  , $DP            = __webpack_require__(43)
  , $keys          = __webpack_require__(77)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(152).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(100).f  = $propertyIsEnumerable;
  __webpack_require__(153).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(98)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(55)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(106)('asyncIterator');

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(106)('observable');

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(243);
var global        = __webpack_require__(33)
  , hide          = __webpack_require__(55)
  , Iterators     = __webpack_require__(97)
  , TO_STRING_TAG = __webpack_require__(56)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4)
  , isArray  = __webpack_require__(116)
  , SPECIES  = __webpack_require__(5)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(254);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject    = __webpack_require__(1)
  , toPrimitive = __webpack_require__(26)
  , NUMBER      = 'number';

module.exports = function(hint){
  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(49)
  , gOPS    = __webpack_require__(88)
  , pIE     = __webpack_require__(69);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(49)
  , toIObject = __webpack_require__(18);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var path      = __webpack_require__(260)
  , invoke    = __webpack_require__(84)
  , aFunction = __webpack_require__(14);
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);

/***/ }),
/* 261 */
/***/ (function(module, exports) {

module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0)
  , $re     = __webpack_require__(261)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', {copyWithin: __webpack_require__(159)});

__webpack_require__(57)('copyWithin');

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $every  = __webpack_require__(24)(4);

$export($export.P + $export.F * !__webpack_require__(23)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', {fill: __webpack_require__(108)});

__webpack_require__(57)('fill');

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $filter = __webpack_require__(24)(2);

$export($export.P + $export.F * !__webpack_require__(23)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0)
  , $find   = __webpack_require__(24)(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(57)(KEY);

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0)
  , $find   = __webpack_require__(24)(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(57)(KEY);

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export  = __webpack_require__(0)
  , $forEach = __webpack_require__(24)(0)
  , STRICT   = __webpack_require__(23)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(28)
  , $export        = __webpack_require__(0)
  , toObject       = __webpack_require__(11)
  , call           = __webpack_require__(168)
  , isArrayIter    = __webpack_require__(115)
  , toLength       = __webpack_require__(10)
  , createProperty = __webpack_require__(109)
  , getIterFn      = __webpack_require__(132);

$export($export.S + $export.F * !__webpack_require__(86)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(0)
  , $indexOf      = __webpack_require__(80)(false)
  , $native       = [].indexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(23)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', {isArray: __webpack_require__(116)});

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export   = __webpack_require__(0)
  , toIObject = __webpack_require__(18)
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(68) != Object || !__webpack_require__(23)(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(0)
  , toIObject     = __webpack_require__(18)
  , toInteger     = __webpack_require__(36)
  , toLength      = __webpack_require__(10)
  , $native       = [].lastIndexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(23)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    // convert -0 to +0
    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
    return -1;
  }
});

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $map    = __webpack_require__(24)(1);

$export($export.P + $export.F * !__webpack_require__(23)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export        = __webpack_require__(0)
  , createProperty = __webpack_require__(109);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $reduce = __webpack_require__(161);

$export($export.P + $export.F * !__webpack_require__(23)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $reduce = __webpack_require__(161);

$export($export.P + $export.F * !__webpack_require__(23)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export    = __webpack_require__(0)
  , html       = __webpack_require__(113)
  , cof        = __webpack_require__(21)
  , toIndex    = __webpack_require__(52)
  , toLength   = __webpack_require__(10)
  , arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $some   = __webpack_require__(24)(3);

$export($export.P + $export.F * !__webpack_require__(23)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export   = __webpack_require__(0)
  , aFunction = __webpack_require__(14)
  , toObject  = __webpack_require__(11)
  , fails     = __webpack_require__(3)
  , $sort     = [].sort
  , test      = [1, 2, 3];

$export($export.P + $export.F * (fails(function(){
  // IE8-
  test.sort(undefined);
}) || !fails(function(){
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(23)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51)('Array');

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0)
  , fails   = __webpack_require__(3)
  , getTime = Date.prototype.getTime;

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export     = __webpack_require__(0)
  , toObject    = __webpack_require__(11)
  , toPrimitive = __webpack_require__(26);

$export($export.P + $export.F * __webpack_require__(3)(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive')
  , proto        = Date.prototype;

if(!(TO_PRIMITIVE in proto))__webpack_require__(15)(proto, TO_PRIMITIVE, __webpack_require__(256));

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING]
  , getTime      = DateProto.getTime;
if(new Date(NaN) + '' != INVALID_DATE){
  __webpack_require__(16)(DateProto, TO_STRING, function toString(){
    var value = getTime.call(this);
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', {bind: __webpack_require__(162)});

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject       = __webpack_require__(4)
  , getPrototypeOf = __webpack_require__(20)
  , HAS_INSTANCE   = __webpack_require__(5)('hasInstance')
  , FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))__webpack_require__(7).f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(7).f
  , createDesc = __webpack_require__(35)
  , has        = __webpack_require__(13)
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';

var isExtensible = Object.isExtensible || function(){
  return true;
};

// 19.2.4.2 name
NAME in FProto || __webpack_require__(6) && dP(FProto, NAME, {
  configurable: true,
  get: function(){
    try {
      var that = this
        , name = ('' + that).match(nameRE)[1];
      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
      return name;
    } catch(e){
      return '';
    }
  }
});

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0)
  , log1p   = __webpack_require__(170)
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0)
  , $asinh  = Math.asinh;

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0 
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0)
  , $atanh  = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0 
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0)
  , sign    = __webpack_require__(120);

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0)
  , $expm1  = __webpack_require__(119);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});

/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export   = __webpack_require__(0)
  , sign      = __webpack_require__(120)
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0)
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0)
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {log1p: __webpack_require__(170)});

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});

/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {sign: __webpack_require__(120)});

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0)
  , expm1   = __webpack_require__(119)
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0)
  , expm1   = __webpack_require__(119)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(2)
  , has               = __webpack_require__(13)
  , cof               = __webpack_require__(21)
  , inheritIfRequired = __webpack_require__(114)
  , toPrimitive       = __webpack_require__(26)
  , fails             = __webpack_require__(3)
  , gOPN              = __webpack_require__(48).f
  , gOPD              = __webpack_require__(19).f
  , dP                = __webpack_require__(7).f
  , $trim             = __webpack_require__(61).trim
  , NUMBER            = 'Number'
  , $Number           = global[NUMBER]
  , Base              = $Number
  , proto             = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF        = cof(__webpack_require__(47)(proto)) == NUMBER
  , TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = __webpack_require__(6) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has(Base, key = keys[j]) && !has($Number, key)){
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(16)(global, NUMBER, $Number);
}

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export   = __webpack_require__(0)
  , _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});

/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {isInteger: __webpack_require__(167)});

/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});

/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export   = __webpack_require__(0)
  , isInteger = __webpack_require__(167)
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(0)
  , $parseFloat = __webpack_require__(177);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});

/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , $parseInt = __webpack_require__(178);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , toInteger    = __webpack_require__(36)
  , aNumberValue = __webpack_require__(158)
  , repeat       = __webpack_require__(127)
  , $toFixed     = 1..toFixed
  , floor        = Math.floor
  , data         = [0, 0, 0, 0, 0, 0]
  , ERROR        = 'Number.toFixed: incorrect invocation!'
  , ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , $fails       = __webpack_require__(3)
  , aNumberValue = __webpack_require__(158)
  , $toPrecision = 1..toPrecision;

$export($export.P + $export.F * ($fails(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});

/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(171)});

/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(47)});

/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', {defineProperties: __webpack_require__(172)});

/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', {defineProperty: __webpack_require__(7).f});

/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4)
  , meta     = __webpack_require__(34).onFreeze;

__webpack_require__(25)('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = __webpack_require__(18)
  , $getOwnPropertyDescriptor = __webpack_require__(19).f;

__webpack_require__(25)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(25)('getOwnPropertyNames', function(){
  return __webpack_require__(173).f;
});

/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(11)
  , $getPrototypeOf = __webpack_require__(20);

__webpack_require__(25)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', {is: __webpack_require__(179)});

/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(11)
  , $keys    = __webpack_require__(49);

__webpack_require__(25)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4)
  , meta     = __webpack_require__(34).onFreeze;

__webpack_require__(25)('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4)
  , meta     = __webpack_require__(34).onFreeze;

__webpack_require__(25)('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(122).set});

/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(67)
  , test    = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  __webpack_require__(16)(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}

/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(0)
  , $parseFloat = __webpack_require__(177);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});

/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , $parseInt = __webpack_require__(178);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});

/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(46)
  , global             = __webpack_require__(2)
  , ctx                = __webpack_require__(28)
  , classof            = __webpack_require__(67)
  , $export            = __webpack_require__(0)
  , isObject           = __webpack_require__(4)
  , aFunction          = __webpack_require__(14)
  , anInstance         = __webpack_require__(45)
  , forOf              = __webpack_require__(58)
  , speciesConstructor = __webpack_require__(124)
  , task               = __webpack_require__(129).set
  , microtask          = __webpack_require__(121)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(50)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(60)($Promise, PROMISE);
__webpack_require__(51)(PROMISE);
Wrapper = __webpack_require__(27)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(86)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export   = __webpack_require__(0)
  , aFunction = __webpack_require__(14)
  , anObject  = __webpack_require__(1)
  , rApply    = (__webpack_require__(2).Reflect || {}).apply
  , fApply    = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function(){
  rApply(function(){});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    var T = aFunction(target)
      , L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export    = __webpack_require__(0)
  , create     = __webpack_require__(47)
  , aFunction  = __webpack_require__(14)
  , anObject   = __webpack_require__(1)
  , isObject   = __webpack_require__(4)
  , fails      = __webpack_require__(3)
  , bind       = __webpack_require__(162)
  , rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function(){
  function F(){}
  return !(rConstruct(function(){}, [], F) instanceof F);
});
var ARGS_BUG = !fails(function(){
  rConstruct(function(){});
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      switch(args.length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP          = __webpack_require__(7)
  , $export     = __webpack_require__(0)
  , anObject    = __webpack_require__(1)
  , toPrimitive = __webpack_require__(26);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function(){
  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = __webpack_require__(0)
  , gOPD     = __webpack_require__(19).f
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export  = __webpack_require__(0)
  , anObject = __webpack_require__(1);
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
__webpack_require__(117)(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});

/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD     = __webpack_require__(19)
  , $export  = __webpack_require__(0)
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD.f(anObject(target), propertyKey);
  }
});

/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = __webpack_require__(0)
  , getProto = __webpack_require__(20)
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});

/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD           = __webpack_require__(19)
  , getPrototypeOf = __webpack_require__(20)
  , has            = __webpack_require__(13)
  , $export        = __webpack_require__(0)
  , isObject       = __webpack_require__(4)
  , anObject       = __webpack_require__(1);

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});

/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});

/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export       = __webpack_require__(0)
  , anObject      = __webpack_require__(1)
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {ownKeys: __webpack_require__(176)});

/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export            = __webpack_require__(0)
  , anObject           = __webpack_require__(1)
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = __webpack_require__(0)
  , setProto = __webpack_require__(122);

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = __webpack_require__(7)
  , gOPD           = __webpack_require__(19)
  , getPrototypeOf = __webpack_require__(20)
  , has            = __webpack_require__(13)
  , $export        = __webpack_require__(0)
  , createDesc     = __webpack_require__(35)
  , anObject       = __webpack_require__(1)
  , isObject       = __webpack_require__(4);

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});

/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

var global            = __webpack_require__(2)
  , inheritIfRequired = __webpack_require__(114)
  , dP                = __webpack_require__(7).f
  , gOPN              = __webpack_require__(48).f
  , isRegExp          = __webpack_require__(85)
  , $flags            = __webpack_require__(83)
  , $RegExp           = global.RegExp
  , Base              = $RegExp
  , proto             = $RegExp.prototype
  , re1               = /a/g
  , re2               = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW       = new $RegExp(re1) !== re1;

if(__webpack_require__(6) && (!CORRECT_NEW || __webpack_require__(3)(function(){
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  };
  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(16)(global, 'RegExp', $RegExp);
}

__webpack_require__(51)('RegExp');

/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(82)('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(82)('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(82)('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(82)('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = __webpack_require__(85)
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(183);
var anObject    = __webpack_require__(1)
  , $flags      = __webpack_require__(83)
  , DESCRIPTORS = __webpack_require__(6)
  , TO_STRING   = 'toString'
  , $toString   = /./[TO_STRING];

var define = function(fn){
  __webpack_require__(16)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(__webpack_require__(3)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define(function toString(){
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString.name != TO_STRING){
  define(function toString(){
    return $toString.call(this);
  });
}

/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(17)('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});

/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(17)('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});

/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(17)('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});

/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(17)('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});

/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $at     = __webpack_require__(125)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export   = __webpack_require__(0)
  , toLength  = __webpack_require__(10)
  , context   = __webpack_require__(126)
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(112)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(17)('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});

/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(17)('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});

/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(17)('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});

/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

var $export        = __webpack_require__(0)
  , toIndex        = __webpack_require__(52)
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export  = __webpack_require__(0)
  , context  = __webpack_require__(126)
  , INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(112)(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(17)('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});

/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(125)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(118)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(17)('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});

/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , toIObject = __webpack_require__(18)
  , toLength  = __webpack_require__(10);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});

/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(127)
});

/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(17)('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});

/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export     = __webpack_require__(0)
  , toLength    = __webpack_require__(10)
  , context     = __webpack_require__(126)
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(112)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(17)('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});

/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(17)('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});

/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(17)('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});

/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(61)('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});

/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(2)
  , has            = __webpack_require__(13)
  , DESCRIPTORS    = __webpack_require__(6)
  , $export        = __webpack_require__(0)
  , redefine       = __webpack_require__(16)
  , META           = __webpack_require__(34).KEY
  , $fails         = __webpack_require__(3)
  , shared         = __webpack_require__(89)
  , setToStringTag = __webpack_require__(60)
  , uid            = __webpack_require__(53)
  , wks            = __webpack_require__(5)
  , wksExt         = __webpack_require__(181)
  , wksDefine      = __webpack_require__(131)
  , keyOf          = __webpack_require__(258)
  , enumKeys       = __webpack_require__(257)
  , isArray        = __webpack_require__(116)
  , anObject       = __webpack_require__(1)
  , toIObject      = __webpack_require__(18)
  , toPrimitive    = __webpack_require__(26)
  , createDesc     = __webpack_require__(35)
  , _create        = __webpack_require__(47)
  , gOPNExt        = __webpack_require__(173)
  , $GOPD          = __webpack_require__(19)
  , $DP            = __webpack_require__(7)
  , $keys          = __webpack_require__(49)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(48).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(69).f  = $propertyIsEnumerable;
  __webpack_require__(88).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(46)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(15)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , $typed       = __webpack_require__(90)
  , buffer       = __webpack_require__(130)
  , anObject     = __webpack_require__(1)
  , toIndex      = __webpack_require__(52)
  , toLength     = __webpack_require__(10)
  , isObject     = __webpack_require__(4)
  , ArrayBuffer  = __webpack_require__(2).ArrayBuffer
  , speciesConstructor = __webpack_require__(124)
  , $ArrayBuffer = buffer.ArrayBuffer
  , $DataView    = buffer.DataView
  , $isView      = $typed.ABV && ArrayBuffer.isView
  , $slice       = $ArrayBuffer.prototype.slice
  , VIEW         = $typed.VIEW
  , ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
    var len    = anObject(this).byteLength
      , first  = toIndex(start, len)
      , final  = toIndex(end === undefined ? len : end, len)
      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(51)(ARRAY_BUFFER);

/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(90).ABV, {
  DataView: __webpack_require__(130).DataView
});

/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);

/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(165);

// 23.4 WeakSet Objects
__webpack_require__(81)('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);

/***/ }),
/* 395 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export   = __webpack_require__(0)
  , $includes = __webpack_require__(80)(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(57)('includes');

/***/ }),
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export   = __webpack_require__(0)
  , microtask = __webpack_require__(121)()
  , process   = __webpack_require__(2).process
  , isNode    = __webpack_require__(21)(process) == 'process';

$export($export.G, {
  asap: function asap(fn){
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

/***/ }),
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0)
  , cof     = __webpack_require__(21);

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});

/***/ }),
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(0);

$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(164)('Map')});

/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

/***/ }),
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

/***/ }),
/* 403 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(0)
  , toObject        = __webpack_require__(11)
  , aFunction       = __webpack_require__(14)
  , $defineProperty = __webpack_require__(7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(6) && $export($export.P + __webpack_require__(87), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 404 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(0)
  , toObject        = __webpack_require__(11)
  , aFunction       = __webpack_require__(14)
  , $defineProperty = __webpack_require__(7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(6) && $export($export.P + __webpack_require__(87), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 405 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export  = __webpack_require__(0)
  , $entries = __webpack_require__(175)(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});

/***/ }),
/* 406 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export        = __webpack_require__(0)
  , ownKeys        = __webpack_require__(176)
  , toIObject      = __webpack_require__(18)
  , gOPD           = __webpack_require__(19)
  , createProperty = __webpack_require__(109);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key;
    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
    return result;
  }
});

/***/ }),
/* 407 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(0)
  , toObject                 = __webpack_require__(11)
  , toPrimitive              = __webpack_require__(26)
  , getPrototypeOf           = __webpack_require__(20)
  , getOwnPropertyDescriptor = __webpack_require__(19).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(87), 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 408 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(0)
  , toObject                 = __webpack_require__(11)
  , toPrimitive              = __webpack_require__(26)
  , getPrototypeOf           = __webpack_require__(20)
  , getOwnPropertyDescriptor = __webpack_require__(19).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(87), 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.set;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 409 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0)
  , $values = __webpack_require__(175)(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});

/***/ }),
/* 410 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export     = __webpack_require__(0)
  , global      = __webpack_require__(2)
  , core        = __webpack_require__(27)
  , microtask   = __webpack_require__(121)()
  , OBSERVABLE  = __webpack_require__(5)('observable')
  , aFunction   = __webpack_require__(14)
  , anObject    = __webpack_require__(1)
  , anInstance  = __webpack_require__(45)
  , redefineAll = __webpack_require__(50)
  , hide        = __webpack_require__(15)
  , forOf       = __webpack_require__(58)
  , RETURN      = forOf.RETURN;

var getMethod = function(fn){
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function(subscription){
  var cleanup = subscription._c;
  if(cleanup){
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function(subscription){
  return subscription._o === undefined;
};

var closeSubscription = function(subscription){
  if(!subscriptionClosed(subscription)){
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function(observer, subscriber){
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup      = subscriber(observer)
      , subscription = cleanup;
    if(cleanup != null){
      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch(e){
    observer.error(e);
    return;
  } if(subscriptionClosed(this))cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe(){ closeSubscription(this); }
});

var SubscriptionObserver = function(subscription){
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if(m)return m.call(observer, value);
      } catch(e){
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value){
    var subscription = this._s;
    if(subscriptionClosed(subscription))throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if(!m)throw value;
      value = m.call(observer, value);
    } catch(e){
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch(e){
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber){
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer){
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn){
    var that = this;
    return new (core.Promise || global.Promise)(function(resolve, reject){
      aFunction(fn);
      var subscription = that.subscribe({
        next : function(value){
          try {
            return fn(value);
          } catch(e){
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x){
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if(method){
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function(observer){
        return observable.subscribe(observer);
      });
    }
    return new C(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          try {
            if(forOf(x, false, function(it){
              observer.next(it);
              if(done)return RETURN;
            }) === RETURN)return;
          } catch(e){
            if(done)throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  },
  of: function of(){
    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          for(var i = 0; i < items.length; ++i){
            observer.next(items[i]);
            if(done)return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function(){ return this; });

$export($export.G, {Observable: $Observable});

__webpack_require__(51)('Observable');

/***/ }),
/* 411 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(29)
  , anObject                  = __webpack_require__(1)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
}});

/***/ }),
/* 412 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(29)
  , anObject               = __webpack_require__(1)
  , toMetaKey              = metadata.key
  , getOrCreateMetadataMap = metadata.map
  , store                  = metadata.store;

metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
}});

/***/ }),
/* 413 */
/***/ (function(module, exports, __webpack_require__) {

var Set                     = __webpack_require__(184)
  , from                    = __webpack_require__(160)
  , metadata                = __webpack_require__(29)
  , anObject                = __webpack_require__(1)
  , getPrototypeOf          = __webpack_require__(20)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys(O, P)
    , parent = getPrototypeOf(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 414 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(29)
  , anObject               = __webpack_require__(1)
  , getPrototypeOf         = __webpack_require__(20)
  , ordinaryHasOwnMetadata = metadata.has
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 415 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                = __webpack_require__(29)
  , anObject                = __webpack_require__(1)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 416 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(29)
  , anObject               = __webpack_require__(1)
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 417 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(29)
  , anObject               = __webpack_require__(1)
  , getPrototypeOf         = __webpack_require__(20)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 418 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(29)
  , anObject               = __webpack_require__(1)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 419 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(29)
  , anObject                  = __webpack_require__(1)
  , aFunction                 = __webpack_require__(14)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
}});

/***/ }),
/* 420 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(0);

$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(164)('Set')});

/***/ }),
/* 421 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0)
  , $at     = __webpack_require__(125)(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 422 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export     = __webpack_require__(0)
  , defined     = __webpack_require__(22)
  , toLength    = __webpack_require__(10)
  , isRegExp    = __webpack_require__(85)
  , getFlags    = __webpack_require__(83)
  , RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

__webpack_require__(117)($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp){
    defined(this);
    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

/***/ }),
/* 423 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0)
  , $pad    = __webpack_require__(180);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

/***/ }),
/* 424 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0)
  , $pad    = __webpack_require__(180);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

/***/ }),
/* 425 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(61)('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');

/***/ }),
/* 426 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(61)('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');

/***/ }),
/* 427 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(131)('asyncIterator');

/***/ }),
/* 428 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(131)('observable');

/***/ }),
/* 429 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', {global: __webpack_require__(2)});

/***/ }),
/* 430 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators    = __webpack_require__(133)
  , redefine      = __webpack_require__(16)
  , global        = __webpack_require__(2)
  , hide          = __webpack_require__(15)
  , Iterators     = __webpack_require__(59)
  , wks           = __webpack_require__(5)
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}

/***/ }),
/* 431 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , $task   = __webpack_require__(129);
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});

/***/ }),
/* 432 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global     = __webpack_require__(2)
  , $export    = __webpack_require__(0)
  , invoke     = __webpack_require__(84)
  , partial    = __webpack_require__(259)
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

/***/ }),
/* 433 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(382);
__webpack_require__(321);
__webpack_require__(323);
__webpack_require__(322);
__webpack_require__(325);
__webpack_require__(327);
__webpack_require__(332);
__webpack_require__(326);
__webpack_require__(324);
__webpack_require__(334);
__webpack_require__(333);
__webpack_require__(329);
__webpack_require__(330);
__webpack_require__(328);
__webpack_require__(320);
__webpack_require__(331);
__webpack_require__(335);
__webpack_require__(336);
__webpack_require__(288);
__webpack_require__(290);
__webpack_require__(289);
__webpack_require__(338);
__webpack_require__(337);
__webpack_require__(308);
__webpack_require__(318);
__webpack_require__(319);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(307);
__webpack_require__(369);
__webpack_require__(374);
__webpack_require__(381);
__webpack_require__(372);
__webpack_require__(364);
__webpack_require__(365);
__webpack_require__(370);
__webpack_require__(375);
__webpack_require__(377);
__webpack_require__(360);
__webpack_require__(361);
__webpack_require__(362);
__webpack_require__(363);
__webpack_require__(366);
__webpack_require__(367);
__webpack_require__(368);
__webpack_require__(371);
__webpack_require__(373);
__webpack_require__(376);
__webpack_require__(378);
__webpack_require__(379);
__webpack_require__(380);
__webpack_require__(283);
__webpack_require__(285);
__webpack_require__(284);
__webpack_require__(287);
__webpack_require__(286);
__webpack_require__(272);
__webpack_require__(270);
__webpack_require__(276);
__webpack_require__(273);
__webpack_require__(279);
__webpack_require__(281);
__webpack_require__(269);
__webpack_require__(275);
__webpack_require__(266);
__webpack_require__(280);
__webpack_require__(264);
__webpack_require__(278);
__webpack_require__(277);
__webpack_require__(271);
__webpack_require__(274);
__webpack_require__(263);
__webpack_require__(265);
__webpack_require__(268);
__webpack_require__(267);
__webpack_require__(282);
__webpack_require__(133);
__webpack_require__(354);
__webpack_require__(359);
__webpack_require__(183);
__webpack_require__(355);
__webpack_require__(356);
__webpack_require__(357);
__webpack_require__(358);
__webpack_require__(339);
__webpack_require__(182);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(394);
__webpack_require__(383);
__webpack_require__(384);
__webpack_require__(389);
__webpack_require__(392);
__webpack_require__(393);
__webpack_require__(387);
__webpack_require__(390);
__webpack_require__(388);
__webpack_require__(391);
__webpack_require__(385);
__webpack_require__(386);
__webpack_require__(340);
__webpack_require__(341);
__webpack_require__(342);
__webpack_require__(343);
__webpack_require__(344);
__webpack_require__(347);
__webpack_require__(345);
__webpack_require__(346);
__webpack_require__(348);
__webpack_require__(349);
__webpack_require__(350);
__webpack_require__(351);
__webpack_require__(353);
__webpack_require__(352);
__webpack_require__(395);
__webpack_require__(421);
__webpack_require__(424);
__webpack_require__(423);
__webpack_require__(425);
__webpack_require__(426);
__webpack_require__(422);
__webpack_require__(427);
__webpack_require__(428);
__webpack_require__(406);
__webpack_require__(409);
__webpack_require__(405);
__webpack_require__(403);
__webpack_require__(404);
__webpack_require__(407);
__webpack_require__(408);
__webpack_require__(398);
__webpack_require__(420);
__webpack_require__(429);
__webpack_require__(397);
__webpack_require__(399);
__webpack_require__(401);
__webpack_require__(400);
__webpack_require__(402);
__webpack_require__(411);
__webpack_require__(412);
__webpack_require__(414);
__webpack_require__(413);
__webpack_require__(416);
__webpack_require__(415);
__webpack_require__(417);
__webpack_require__(418);
__webpack_require__(419);
__webpack_require__(396);
__webpack_require__(410);
__webpack_require__(432);
__webpack_require__(431);
__webpack_require__(430);
module.exports = __webpack_require__(27);

/***/ }),
/* 434 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(186);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}


/***/ }),
/* 435 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var tty = __webpack_require__(514);
var util = __webpack_require__(63);

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(186);
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
  else if (val === 'null') val = null;
  else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * The file descriptor to write the `debug()` calls to.
 * Set the `DEBUG_FD` env variable to override with another value. i.e.:
 *
 *   $ DEBUG_FD=3 node script.js 3>debug.log
 */

var fd = parseInt(process.env.DEBUG_FD, 10) || 2;

if (1 !== fd && 2 !== fd) {
  util.deprecate(function(){}, 'except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)')()
}

var stream = 1 === fd ? process.stdout :
             2 === fd ? process.stderr :
             createWritableStdioStream(fd);

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts
    ? Boolean(exports.inspectOpts.colors)
    : tty.isatty(fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts)
    .replace(/\s*\n\s*/g, ' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var prefix = '  \u001b[3' + c + ';1m' + name + ' ' + '\u001b[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push('\u001b[3' + c + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = new Date().toUTCString()
      + ' ' + name + ' ' + args[0];
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to `stream`.
 */

function log() {
  return stream.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Copied from `node/src/node.js`.
 *
 * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
 * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
 */

function createWritableStdioStream (fd) {
  var stream;
  var tty_wrap = process.binding('tty_wrap');

  // Note stream._type is used for test-module-load-list.js

  switch (tty_wrap.guessHandleType(fd)) {
    case 'TTY':
      stream = new tty.WriteStream(fd);
      stream._type = 'tty';

      // Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    case 'FILE':
      var fs = __webpack_require__(208);
      stream = new fs.SyncWriteStream(fd, { autoClose: false });
      stream._type = 'fs';
      break;

    case 'PIPE':
    case 'TCP':
      var net = __webpack_require__(143);
      stream = new net.Socket({
        fd: fd,
        readable: false,
        writable: true
      });

      // FIXME Should probably have an option in net.Socket to create a
      // stream from an existing fd which is writable only. But for now
      // we'll just add this hack and set the `readable` member to false.
      // Test: ./node test/fixtures/echo.js < /etc/passwd
      stream.readable = false;
      stream.read = null;
      stream._type = 'pipe';

      // FIXME Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    default:
      // Probably an error on in uv_guess_handle()
      throw new Error('Implement me. Unknown stream file type!');
  }

  // For supporting legacy API we put the FD here.
  stream.fd = fd;

  stream._isStdio = true;

  return stream;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init (debug) {
  debug.inspectOpts = util._extend({}, exports.inspectOpts);
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());


/***/ }),
/* 436 */
/***/ (function(module, exports, __webpack_require__) {

(function () {
  var options = {}
  process.argv.forEach(function (val, idx, arr) {
    var matches = val.match(/^dotenv_config_(.+)=(.+)/)
    if (matches) {
      options[matches[1]] = matches[2]
    }
  })

  __webpack_require__(437).config(options)
})()


/***/ }),
/* 437 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fs = __webpack_require__(208)

/*
 * Parses a string or buffer into an object
 * @param {String|Buffer} src - source to be parsed
 * @returns {Object}
*/
function parse (src) {
  var obj = {}

  // convert Buffers before splitting into lines and processing
  src.toString().split('\n').forEach(function (line) {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    var keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/)
    // matched?
    if (keyValueArr != null) {
      var key = keyValueArr[1]

      // default undefined or missing values to empty string
      var value = keyValueArr[2] ? keyValueArr[2] : ''

      // expand newlines in quoted values
      var len = value ? value.length : 0
      if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
        value = value.replace(/\\n/gm, '\n')
      }

      // remove any surrounding quotes and extra spaces
      value = value.replace(/(^['"]|['"]$)/g, '').trim()

      obj[key] = value
    }
  })

  return obj
}

/*
 * Main entry point into dotenv. Allows configuration before loading .env
 * @param {Object} options - valid options: path ('.env'), encoding ('utf8')
 * @returns {Boolean}
*/
function config (options) {
  var path = '.env'
  var encoding = 'utf8'

  if (options) {
    if (options.path) {
      path = options.path
    }
    if (options.encoding) {
      encoding = options.encoding
    }
  }

  try {
    // specifying an encoding returns a string instead of a buffer
    var parsedObj = parse(fs.readFileSync(path, { encoding: encoding }))

    Object.keys(parsedObj).forEach(function (key) {
      process.env[key] = process.env[key] || parsedObj[key]
    })

    return { parsed: parsedObj }
  } catch (e) {
    return { error: e }
  }
}

module.exports.config = config
module.exports.load = config
module.exports.parse = parse


/***/ }),
/* 438 */
/***/ (function(module, exports, __webpack_require__) {

const Pool = __webpack_require__(442)
const Deque = __webpack_require__(189)
const PriorityQueue = __webpack_require__(447)
const DefaultEvictor = __webpack_require__(439)
module.exports = {
  Pool: Pool, 
  Deque: Deque,
  PriorityQueue: PriorityQueue,
  DefaultEvictor: DefaultEvictor,
  createPool: function(factory, config){
    return new Pool(DefaultEvictor, Deque, PriorityQueue, factory, config)
  }
}



/***/ }),
/* 439 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class DefaultEvictor {
  evict (config, pooledResource, availableObjectsCount) {
    const idleTime = Date.now() - pooledResource.lastIdleTime

    if (config.softIdleTimeoutMillis < idleTime && config.min < availableObjectsCount) {
      return true
    }

    if (config.idleTimeoutMillis < idleTime) {
      return true
    }

    return false
  }
}

module.exports = DefaultEvictor


/***/ }),
/* 440 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DoublyLinkedListIterator = __webpack_require__(441)
/**
 * Thin wrapper around an underlying DDL iterator
 */
class DequeIterator extends DoublyLinkedListIterator {
  next () {
    const result = super.next()

    // unwrap the node...
    if (result.value) {
      result.value = result.value.data
    }

    return result
  }
}

module.exports = DequeIterator


/***/ }),
/* 441 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates an interator for a DoublyLinkedList starting at the given node
 * It's internal cursor will remains relative to the last "iterated" node as that
 * node moves through the list until it either iterates to the end of the list,
 * or the the node it's tracking is removed from the list. Until the first 'next'
 * call it tracks the head/tail of the linked list. This means that one can create
 * an iterator on an empty list, then add nodes, and then the iterator will follow
 * those nodes. Because the DoublyLinkedList nodes don't track their owning "list" and
 * it's highly inefficient to walk the list for every iteration, the iterator won't know
 * if the node has been detached from one List and added to another list, or if the iterator
 *
 * The created object is an es6 compatible iterator
 */
class DoublyLinkedListIterator {

  /**
   * @param  {Object} doublyLinkedListNode a node that is part of a doublyLinkedList
   * @param  {Boolean} reverse             is this a reverse iterator? default: false
   */
  constructor (doublyLinkedList, reverse) {
    this._list = doublyLinkedList
    // NOTE: these key names are tied to the DoublyLinkedListIterator
    this._direction = reverse === true ? 'prev' : 'next'
    this._startPosition = reverse === true ? 'tail' : 'head'
    this._started = false
    this._cursor = null
    this._done = false
  }

  _start () {
    this._cursor = this._list[this._startPosition]
    this._started = true
  }

  _advanceCursor () {
    if (this._started === false) {
      this._started = true
      this._cursor = this._list[this._startPosition]
      return
    }
    this._cursor = this._cursor[this._direction]
  }

  reset () {
    this._done = false
    this._started = false
    this._cursor = null
  }

  remove () {
    if (this._started === false || this._done === true || this._isCursorDetached()) {
      return false
    }
    this._list.remove(this._cursor)
  }

  next () {
    if (this._done === true) {
      return { done: true }
    }

    this._advanceCursor()

    // if there is no node at the cursor or the node at the cursor is no longer part of
    // a doubly linked list then we are done/finished/kaput
    if (this._cursor === null || this._isCursorDetached()) {
      this._done = true
      return { done: true }
    }

    return {
      value: this._cursor,
      done: false
    }
  }

  /**
   * Is the node detached from a list?
   * NOTE: you can trick/bypass/confuse this check by removing a node from one DoublyLinkedList
   * and adding it to another.
   * TODO: We can make this smarter by checking the direction of travel and only checking
   * the required next/prev/head/tail rather than all of them
   * @param  {[type]}  node [description]
   * @return {Boolean}      [description]
   */
  _isCursorDetached () {
    return this._cursor.prev === null && this._cursor.next === null && this._list.tail !== this._cursor && this._list.head !== this._cursor
  }
}

module.exports = DoublyLinkedListIterator


/***/ }),
/* 442 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const EventEmitter = __webpack_require__(31).EventEmitter

const factoryValidator = __webpack_require__(452)
const PoolOptions = __webpack_require__(444)
const ResourceRequest = __webpack_require__(450)
const ResourceLoan = __webpack_require__(449)
const PooledResource = __webpack_require__(445)

const reflector = __webpack_require__(453).reflector

/**
 * TODO: move me
 */
const FACTORY_CREATE_ERROR = 'factoryCreateError'
const FACTORY_DESTROY_ERROR = 'factoryDestroyError'

class Pool extends EventEmitter {

  /**
   * Generate an Object pool with a specified `factory` and `config`.
   *
   * @param {Object} factory
   *   Factory to be used for generating and destroying the items.
   * @param {Function} factory.create
   *   Should create the item to be acquired,
   *   and call it's first callback argument with the generated item as it's argument.
   * @param {Function} factory.destroy
   *   Should gently close any resources that the item is using.
   *   Called before the items is destroyed.
   * @param {Function} factory.validate
   *   Test if a resource is still valid .Should return a promise that resolves to a boolean, true if resource is still valid and false
   *   If it should be removed from pool.
   */
  constructor (Evictor, Deque, PriorityQueue, factory, options) {
    super()

    factoryValidator(factory)

    this._config = new PoolOptions(options)

    // TODO: fix up this ugly glue-ing
    this._Promise = this._config.Promise

    this._factory = factory
    this._draining = false
    this._started = false
    /**
     * Holds waiting clients
     * @type {PriorityQueue}
     */
    this._waitingClientsQueue = new PriorityQueue(this._config.priorityRange)

    /**
     * Collection of promises for resource creation calls made by the pool to factory.create
     * @type {Set}
     */
    this._factoryCreateOperations = new Set()

    /**
     * Collection of promises for resource destruction calls made by the pool to factory.destroy
     * @type {Set}
     */
    this._factoryDestroyOperations = new Set()

    /**
     * A queue/stack of pooledResources awaiting acquisition
     * TODO: replace with LinkedList backed array
     * @type {Array}
     */
    this._availableObjects = new Deque()

    /**
     * Collection of references for any resource that are undergoing validation before being acquired
     * @type {Set}
     */
    this._testOnBorrowResources = new Set()

    /**
     * Collection of references for any resource that are undergoing validation before being returned
     * @type {Set}
     */
    this._testOnReturnResources = new Set()

    /**
     * Collection of promises for any validations currently in process
     * @type {Set}
     */
    this._validationOperations = new Set()

    /**
     * All objects associated with this pool in any state (except destroyed)
     * @type {PooledResourceCollection}
     */
    this._allObjects = new Set()

    /**
     * Loans keyed by the borrowed resource
     * @type {Map}
     */
    this._resourceLoans = new Map()

    /**
     * Infinitely looping iterator over available object
     * @type {DLLArrayIterator}
     */
    this._evictionIterator = this._availableObjects.iterator()

    this._evictor = new Evictor()

    /**
     * handle for setTimeout for next eviction run
     * @type {[type]}
     */
    this._scheduledEviction = null

    // create initial resources (if factory.min > 0)
    if (this._config.autostart === true) {
      this.start()
    }
  }

  _destroy (pooledResource) {
    // FIXME: do we need another state for "in destruction"?
    pooledResource.invalidate()
    this._allObjects.delete(pooledResource)
    // NOTE: this maybe very bad promise usage?
    const destroyPromise = this._factory.destroy(pooledResource.obj)
    const wrappedDestroyPromise = this._Promise.resolve(destroyPromise)

    this._trackOperation(wrappedDestroyPromise, this._factoryDestroyOperations)
    .catch((reason) => {
      this.emit(FACTORY_DESTROY_ERROR, reason)
    })

    // TODO: maybe ensuring minimum pool size should live outside here
    this._ensureMinimum()
  }

  /**
   * Attempt to move an available resource into test and then onto a waiting client
   * @return {Boolean} could we move an available resource into test
   */
  _testOnBorrow () {
    if (this._availableObjects.length < 1) {
      return false
    }

    const pooledResource = this._availableObjects.shift()
    // Mark the resource as in test
    pooledResource.test()
    this._testOnBorrowResources.add(pooledResource)
    const validationPromise = this._factory.validate(pooledResource.obj)
    const wrappedValidationPromise = this._Promise.resolve(validationPromise)

    this._trackOperation(wrappedValidationPromise, this._validationOperations)
    .then((isValid) => {
      this._testOnBorrowResources.delete(pooledResource)

      if (isValid === false) {
        pooledResource.invalidate()
        this._destroy(pooledResource)
        this._dispense()
        return
      }
      this._dispatchPooledResourceToNextWaitingClient(pooledResource)
    })

    return true
  }

  /**
   * Attempt to move an available resource to a waiting client
   * @return {Boolean} [description]
   */
  _dispatchResource () {
    if (this._availableObjects.length < 1) {
      return false
    }

    const pooledResource = this._availableObjects.shift()
    this._dispatchPooledResourceToNextWaitingClient(pooledResource)
    return
  }

  /**
   * Attempt to resolve an outstanding resource request using an available resource from
   * the pool, or creating new ones
   *
   * @private
   */
  _dispense () {
    /**
     * Local variables for ease of reading/writing
     * these don't (shouldn't) change across the execution of this fn
     */
    const numWaitingClients = this._waitingClientsQueue.length

    // If there aren't any waiting requests then there is nothing to do
    // so lets short-circuit
    if (numWaitingClients < 1) {
      return
    }

    const resourceShortfall = numWaitingClients - this._potentiallyAllocableResourceCount

    const actualNumberOfResourcesToCreate = Math.min(this.spareResourceCapacity, resourceShortfall)
    for (let i = 0; actualNumberOfResourcesToCreate > i; i++) {
      this._createResource()
    }

    // If we are doing test-on-borrow see how many more resources need to be moved into test
    // to help satisfy waitingClients
    if (this._config.testOnBorrow === true) {
      // how many available resources do we need to shift into test
      const desiredNumberOfResourcesToMoveIntoTest = numWaitingClients - this._testOnBorrowResources.size
      const actualNumberOfResourcesToMoveIntoTest = Math.min(this._availableObjects.length, desiredNumberOfResourcesToMoveIntoTest)
      for (let i = 0; actualNumberOfResourcesToMoveIntoTest > i; i++) {
        this._testOnBorrow()
      }
    }

    // if we aren't testing-on-borrow then lets try to allocate what we can
    if (this._config.testOnBorrow === false) {
      const actualNumberOfResourcesToDispatch = Math.min(this._availableObjects.length, numWaitingClients)
      for (let i = 0; actualNumberOfResourcesToDispatch > i; i++) {
        this._dispatchResource()
      }
    }
  }

  /**
   * Dispatches a pooledResource to the next waiting client (if any) else
   * puts the PooledResource back on the available list
   * @param  {[type]} pooledResource [description]
   * @return {[type]}                [description]
   */
  _dispatchPooledResourceToNextWaitingClient (pooledResource) {
    const clientResourceRequest = this._waitingClientsQueue.dequeue()
    if (clientResourceRequest === undefined) {
      // While we were away either all the waiting clients timed out
      // or were somehow fulfilled. put our pooledResource back.
      this._addPooledResourceToAvailableObjects(pooledResource)
      // TODO: do need to trigger anything before we leave?
      return false
    }
    const loan = new ResourceLoan(pooledResource, this._Promise)
    this._resourceLoans.set(pooledResource.obj, loan)
    pooledResource.allocate()
    clientResourceRequest.resolve(pooledResource.obj)
    return true
  }

  /**
   * tracks on operation using given set
   * handles adding/removing from the set and resolve/rejects the value/reason
   * @param  {Promise} operation
   * @param  {Set} set       Set holding operations
   * @return {Promise}       Promise that resolves once operation has been removed from set
   */
  _trackOperation (operation, set) {
    set.add(operation)

    return operation.then((v) => {
      set.delete(operation)
      return this._Promise.resolve(v)
    }, (e) => {
      set.delete(operation)
      return this._Promise.reject(e)
    })
  }

  /**
   * @private
   */
  _createResource () {
    // An attempt to create a resource
    const factoryPromise = this._factory.create()
    const wrappedFactoryPromise = this._Promise.resolve(factoryPromise)

    this._trackOperation(wrappedFactoryPromise, this._factoryCreateOperations)
    .then((resource) => {
      this._handleNewResource(resource)
      return null
    })
    .catch((reason) => {
      this.emit(FACTORY_CREATE_ERROR, reason)
      this._dispense()
    })
  }

  _handleNewResource (resource) {
    const pooledResource = new PooledResource(resource)
    this._allObjects.add(pooledResource)
    // TODO: check we aren't exceding our maxPoolSize before doing
    this._dispatchPooledResourceToNextWaitingClient(pooledResource)
  }

  /**
   * @private
   */
  _ensureMinimum () {
    if (this._draining === true) {
      return
    }
    const minShortfall = this._config.min - this._count
    for (let i = 0; i < minShortfall; i++) {
      this._createResource()
    }
  }

  _evict () {
    const testsToRun = Math.min(this._config.numTestsPerEvictionRun, this._availableObjects.length)
    const evictionConfig = {
      softIdleTimeoutMillis: this._config.softIdleTimeoutMillis,
      idleTimeoutMillis: this._config.idleTimeoutMillis,
      min: this._config.min
    }
    for (let testsHaveRun = 0; testsHaveRun < testsToRun;) {
      const iterationResult = this._evictionIterator.next()

      // Safety check incase we could get stuck in infinite loop because we
      // somehow emptied the array after chekcing it's length
      if (iterationResult.done === true && this._availableObjects.length < 1) {
        this._evictionIterator.reset()
        return
      }
      // if this happens it should just mean we reached the end of the
      // list and can reset the cursor.
      if (iterationResult.done === true && this._availableObjects.length > 0) {
        this._evictionIterator.reset()
        break
      }

      const resource = iterationResult.value

      const shouldEvict = this._evictor.evict(evictionConfig, resource, this._availableObjects.length)
      testsHaveRun++

      if (shouldEvict === true) {
        // take it out of the _availableObjects list
        this._evictionIterator.remove()
        this._destroy(resource)
      }
    }
  }

  _scheduleEvictorRun () {
    // Start eviction if set
    if (this._config.evictionRunIntervalMillis > 0) {
      this._scheduledEviction = setTimeout(() => {
        this._evict()
        this._scheduleEvictorRun()
      }, this._config.evictionRunIntervalMillis)
    }
  }

  _descheduleEvictorRun () {
    clearTimeout(this._scheduledEviction)
    this._scheduledEviction = null
  }

  start () {
    if (this._draining === true) {
      return
    }
    if (this._started === true) {
      return
    }
    this._started = true
    this._scheduleEvictorRun()
    this._ensureMinimum()
  }

  /**
   * Request a new resource. The callback will be called,
   * when a new resource is available, passing the resource to the callback.
   * TODO: should we add a seperate "acquireWithPriority" function
   *
   * @param {Function} callback
   *   Callback function to be called after the acquire is successful.
   *   If there is an error preventing the acquisition of resource, an error will
   *   be the first parameter, else it will be null.
   *   The acquired resource will be the second parameter.
   *
   * @param {Number} priority
   *   Optional.  Integer between 0 and (priorityRange - 1).  Specifies the priority
   *   of the caller if there are no available resources.  Lower numbers mean higher
   *   priority.
   *
   * @returns {Promise}
   */
  acquire (priority) {
    if (this._draining) {
      return this._Promise.reject(new Error('pool is draining and cannot accept work'))
    }

    // TODO: should we defer this check till after this event loop incase "the situation" changes in the meantime
    if (this._config.maxWaitingClients !== undefined && this._waitingClientsQueue.length >= this._config.maxWaitingClients) {
      return this._Promise.reject(new Error('max waitingClients count exceeded'))
    }

    const resourceRequest = new ResourceRequest(this._config.acquireTimeoutMillis, this._Promise)
    this._waitingClientsQueue.enqueue(resourceRequest, priority)
    this._dispense()

    return resourceRequest.promise
  }

  /**
   * Return the resource to the pool when it is no longer required.
   *
   * @param {Object} obj
   *   The acquired object to be put back to the pool.
   */
  release (resource) {
    // check for an outstanding loan
    const loan = this._resourceLoans.get(resource)

    if (loan === undefined) {
      return this._Promise.reject(new Error('Resource not currently part of this pool'))
    }

    this._resourceLoans.delete(resource)
    loan.resolve()
    const pooledResource = loan.pooledResource

    pooledResource.deallocate()
    this._addPooledResourceToAvailableObjects(pooledResource)

    this._dispense()
    return this._Promise.resolve()
  }

  /**
   * Request the resource to be destroyed. The factory's destroy handler
   * will also be called.
   *
   * This should be called within an acquire() block as an alternative to release().
   *
   * @param {Object} resource
   *   The acquired resource to be destoyed.
   */
  destroy (resource) {
    // check for an outstanding loan
    const loan = this._resourceLoans.get(resource)

    if (loan === undefined) {
      return this._Promise.reject(new Error('Resource not currently part of this pool'))
    }

    this._resourceLoans.delete(resource)
    loan.resolve()
    const pooledResource = loan.pooledResource

    pooledResource.deallocate()
    this._destroy(pooledResource)

    this._dispense()
    return this._Promise.resolve()
  }

  _addPooledResourceToAvailableObjects (pooledResource) {
    pooledResource.idle()
    if (this._config.fifo === true) {
      this._availableObjects.push(pooledResource)
    } else {
      this._availableObjects.unshift(pooledResource)
    }
  }

  /**
   * Disallow any new acquire calls and let the request backlog dissapate.
   * The Pool will no longer attempt to maintain a "min" number of resources
   * and will only make new resources on demand.
   * Resolves once all resource requests are fulfilled and all resources are returned to pool and available...
   * Should probably be called "drain work"
   * @returns {Promise}
   */
  drain () {
    this._draining = true
    return this.__allResourceRequestsSettled()
      .then(() => {
        return this.__allResourcesReturned()
      })
      .then(() => {
        this._descheduleEvictorRun()
      })
  }

  __allResourceRequestsSettled () {
    if (this._waitingClientsQueue.length > 0) {
      // wait for last waiting client to be settled
      // FIXME: what if they can "resolve" out of order....?
      return reflector(this._waitingClientsQueue.tail.promise)
    }
    return this._Promise.resolve()
  }

  // FIXME: this is a horrific mess
  __allResourcesReturned () {
    const ps = Array.from(this._resourceLoans.values())
    .map((loan) => loan.promise)
    .map(reflector)
    return this._Promise.all(ps)
  }

  /**
   * Forcibly destroys all available resources regardless of timeout.  Intended to be
   * invoked as part of a drain.  Does not prevent the creation of new
   * resources as a result of subsequent calls to acquire.
   *
   * Note that if factory.min > 0 and the pool isn't "draining", the pool will destroy all idle resources
   * in the pool, but replace them with newly created resources up to the
   * specified factory.min value.  If this is not desired, set factory.min
   * to zero before calling clear()
   *
   */
  clear () {
    const reflectedCreatePromises = Array.from(this._factoryCreateOperations)
    .map(reflector)

    // wait for outstanding factory.create to complete
    return this._Promise.all(reflectedCreatePromises)
    .then(() => {
      // Destroy existing resources
      for (const resource of this._availableObjects) {
        this._destroy(resource)
      }
      const reflectedDestroyPromises = Array.from(this._factoryDestroyOperations)
      .map(reflector)
      return this._Promise.all(reflectedDestroyPromises)
    })
  }

  /**
   * How many resources are available to allocated
   * (includes resources that have not been tested and may faul validation)
   * NOTE: internal for now as the name is awful and might not be useful to anyone
   * @return {Number} number of resources the pool has to allocate
   */
  get _potentiallyAllocableResourceCount () {
    return this._availableObjects.length +
      this._testOnBorrowResources.size +
      this._testOnReturnResources.size +
      this._factoryCreateOperations.size
  }

  /**
   * The combined count of the currently created objects and those in the
   * process of being created
   * Does NOT include resources in the process of being destroyed
   * sort of legacy...
   * @return {Number}
   */
  get _count () {
    return this._allObjects.size + this._factoryCreateOperations.size
  }

  /**
   * How many more resources does the pool have room for
   * @return {Number} number of resources the pool could create before hitting any limits
   */
  get spareResourceCapacity () {
    return this._config.max - (this._allObjects.size + this._factoryCreateOperations.size)
  }

  /**
   * see _count above
   * @return {Number} [description]
   */
  get size () {
    return this._count
  }

  /**
   * number of available resources
   * @return {Number} [description]
   */
  get available () {
    return this._availableObjects.length
  }

  /**
   * number of resources that are currently acquired
   * @return {[type]} [description]
   */
  get borrowed () {
    return this._resourceLoans.size
  }

  /**
   * number of waiting acquire calls
   * @return {[type]} [description]
   */
  get pending () {
    return this._waitingClientsQueue.length
  }

  /**
   * maximum size of the pool
   * @return {[type]} [description]
   */
  get max () {
    return this._config.max
  }

  /**
   * minimum size of the pool
   * @return {[type]} [description]
   */
  get min () {
    return this._config.min
  }
}

module.exports = Pool


/***/ }),
/* 443 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Create the default settings used by the pool
 *
 * @class
 */
class PoolDefaults {
  constructor () {
    this.fifo = true
    this.priorityRange = 1

    this.testOnBorrow = false
    this.testOnReturn = false

    this.autostart = true

    this.evictionRunIntervalMillis = 0
    this.numTestsPerEvictionRun = 3
    this.softIdleTimeoutMillis = -1
    this.idleTimeoutMillis = 30000

    // FIXME: no defaults!
    this.acquireTimeoutMillis = null
    this.maxWaitingClients = null

    this.min = null
    this.max = null
    // FIXME: this seems odd?
    this.Promise = Promise
  }
}

module.exports = PoolDefaults


/***/ }),
/* 444 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const PoolDefaults = __webpack_require__(443)

class PoolOptions {
  /**
   * @param {Object} config
   *   configuration for the pool
   * @param {Number} config.max
   *   Maximum number of items that can exist at the same time.  Default: 1.
   *   Any further acquire requests will be pushed to the waiting list.
   * @param {Number} config.min
   *   Minimum number of items in pool (including in-use). Default: 0.
   *   When the pool is created, or a resource destroyed, this minimum will
   *   be checked. If the pool resource count is below the minimum, a new
   *   resource will be created and added to the pool.
   * @param {Number} config.maxWaitingClients
   *   maximum number of queued requests allowed after which acquire calls will be rejected
   * @param {Number} config.acquireTimeoutMillis
   *   Delay in milliseconds after which the an `acquire` call will fail. optional.
   *   Default: undefined. Should be positive and non-zero
   * @param {Number} config.priorityRange
   *   The range from 1 to be treated as a valid priority
   * @param {Bool} [config.fifo=true]
   *   Sets whether the pool has LIFO (last in, first out) behaviour with respect to idle objects.
   *   if false then pool has FIFO behaviour
   * @param {Bool} [config.autostart=true]
   *   Should the pool start creating resources etc once the constructor is called
   * @param {Number} opts.evictionRunIntervalMillis
   *   How often to run eviction checks.  Default: 0 (does not run).
   * @param {Number} opts.numTestsPerEvictionRun
   *   Number of resources to check each eviction run.  Default: 3.
   * @param {Number} opts.softIdleTimeoutMillis
   *   amount of time an object may sit idle in the pool before it is eligible
   *   for eviction by the idle object evictor (if any), with the extra condition
   *   that at least "min idle" object instances remain in the pool. Default -1 (nothing can get evicted)
   * @param {Number} opts.idleTimeoutMillis
   *   the minimum amount of time that an object may sit idle in the pool before it is eligible for eviction
   *   due to idle time. Supercedes "softIdleTimeoutMillis" Default: 30000
   * @param {Promise} [config.Promise=Promise]
   *   What promise implementation should the pool use, defaults to native promises.
   */
  constructor (opts) {
    const poolDefaults = new PoolDefaults()

    opts = opts || {}

    this.fifo = (typeof opts.fifo === 'boolean') ? opts.fifo : poolDefaults.fifo
    this.priorityRange = opts.priorityRange || poolDefaults.priorityRange

    this.testOnBorrow = (typeof opts.testOnBorrow === 'boolean') ? opts.testOnBorrow : poolDefaults.testOnBorrow
    this.testOnReturn = (typeof opts.testOnReturn === 'boolean') ? opts.testOnReturn : poolDefaults.testOnReturn

    this.autostart = (typeof opts.autostart === 'boolean') ? opts.autostart : poolDefaults.autostart

    if (opts.acquireTimeoutMillis) {
      this.acquireTimeoutMillis = parseInt(opts.acquireTimeoutMillis, 10)
    }

    if (opts.maxWaitingClients) {
      this.maxWaitingClients = parseInt(opts.maxWaitingClients, 10)
    }

    this.max = parseInt(opts.max, 10)
    this.min = parseInt(opts.min, 10)

    this.max = Math.max(isNaN(this.max) ? 1 : this.max, 1)
    this.min = Math.min(isNaN(this.min) ? 0 : this.min, this.max)

    this.evictionRunIntervalMillis = opts.evictionRunIntervalMillis || poolDefaults.evictionRunIntervalMillis
    this.numTestsPerEvictionRun = opts.numTestsPerEvictionRun || poolDefaults.numTestsPerEvictionRun
    this.softIdleTimeoutMillis = opts.softIdleTimeoutMillis || poolDefaults.softIdleTimeoutMillis
    this.idleTimeoutMillis = opts.idleTimeoutMillis || poolDefaults.idleTimeoutMillis

    this.Promise = (opts.Promise != null) ? opts.Promise : poolDefaults.Promise
  }
}

module.exports = PoolOptions


/***/ }),
/* 445 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const PooledResourceStateEnum = __webpack_require__(446)

/**
 * @class
 * @private
 */
class PooledResource {
  constructor (resource) {
    this.creationTime = Date.now()
    this.lastReturnTime = null
    this.lastBorrowTime = null
    this.lastIdleTime = null
    this.obj = resource
    this.state = PooledResourceStateEnum.IDLE
  }

  // mark the resource as "allocated"
  allocate () {
    this.lastBorrowTime = Date.now()
    this.state = PooledResourceStateEnum.ALLOCATED
  }

  // mark the resource as "deallocated"
  deallocate () {
    this.lastReturnTime = Date.now()
    this.state = PooledResourceStateEnum.IDLE
  }

  invalidate () {
    this.state = PooledResourceStateEnum.INVALID
  }

  test () {
    this.state = PooledResourceStateEnum.VALIDATION
  }

  idle () {
    this.lastIdleTime = Date.now()
    this.state = PooledResourceStateEnum.IDLE
  }

  returning () {
    this.state = PooledResourceStateEnum.RETURNING
  }
}

module.exports = PooledResource


/***/ }),
/* 446 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const PooledResourceStateEnum = {
  ALLOCATED: 'ALLOCATED', // In use
  IDLE: 'IDLE', // In the queue, not in use.
  INVALID: 'INVALID', // Failed validation
  RETURNING: 'RETURNING', // Resource is in process of returning
  VALIDATION: 'VALIDATION' // Currently being tested
}

module.exports = PooledResourceStateEnum


/***/ }),
/* 447 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Queue = __webpack_require__(448)

/**
 * @class
 * @private
 */
class PriorityQueue {
  constructor (size) {
    this._size = Math.max(+size | 0, 1)
    this._slots = []
    // initialize arrays to hold queue elements
    for (let i = 0; i < this._size; i++) {
      this._slots.push(new Queue())
    }
  }

  get length () {
    let _length = 0
    for (let i = 0, slots = this._slots.length; i < slots; i++) {
      _length += this._slots[i].length
    }
    return _length
  }

  enqueue (obj, priority) {
    // Convert to integer with a default value of 0.
    priority = priority && +priority | 0 || 0

    if (priority) {
      if (priority < 0 || priority >= this._size) {
        priority = (this._size - 1)
        // put obj at the end of the line
      }
    }
    this._slots[priority].push(obj)
  }

  dequeue () {
    for (let i = 0, sl = this._slots.length; i < sl; i += 1) {
      if (this._slots[i].length) {
        return this._slots[i].shift()
      }
    }
    return
  }

  get head () {
    for (let i = 0, sl = this._slots.length; i < sl; i += 1) {
      if (this._slots[i].length > 0) {
        return this._slots[i].head
      }
    }
    return
  }

  get tail () {
    for (let i = this._slots.length - 1; i >= 0; i--) {
      if (this._slots[i].length > 0) {
        return this._slots[i].tail
      }
    }
    return
  }
}

module.exports = PriorityQueue


/***/ }),
/* 448 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DoublyLinkedList = __webpack_require__(190)
const Deque = __webpack_require__(189)

/**
 * Sort of a internal queue for holding the waiting
 * resource requets for a given "priority".
 * Also handles managing timeouts rejections on items (is this the best place for this?)
 * This is the last point where we know which queue a resourceRequest is in
 *
 */
class Queue extends Deque {
  /**
   * Adds the obj to the end of the list for this slot
   * we completely override the parent method because we need access to the
   * node for our rejection handler
   * @param {[type]} item [description]
   */
  push (resourceRequest) {
    const node = DoublyLinkedList.createNode(resourceRequest)
    resourceRequest.promise.catch(this._createTimeoutRejectionHandler(node))
    this._list.insertEnd(node)
  }

  _createTimeoutRejectionHandler (node) {
    return (reason) => {
      if (reason.name === 'TimeoutError') {
        this._list.remove(node)
      }
    }
  }
}

module.exports = Queue


/***/ }),
/* 449 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Deferred = __webpack_require__(188)

/**
 * Plan is to maybe add tracking via Error objects
 * and other fun stuff!
 */

class ResourceLoan extends Deferred {
  /**
   *
   * @param  {PooledResource} pooledResource the PooledResource this loan belongs to
   * @return {[type]}                [description]
   */
  constructor (pooledResource, Promise) {
    super(Promise)
    this._creationTimestamp = Date.now()
    this.pooledResource = pooledResource
  }

  reject () {
    /**
     * Loans can only be resolved at the moment
     */
  }
}

module.exports = ResourceLoan


/***/ }),
/* 450 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Deferred = __webpack_require__(188)
const errors = __webpack_require__(451)

function fbind (fn, ctx) {
  return function bound () {
    return fn.apply(ctx, arguments)
  }
}

/**
 * Wraps a users request for a resource
 * Basically a promise mashed in with a timeout
 * @private
 */
class ResourceRequest extends Deferred {

  /**
   * [constructor description]
   * @param  {Number} ttl     timeout
   */
  constructor (ttl, Promise) {
    super(Promise)
    this._creationTimestamp = Date.now()
    this._timeout = null

    if (ttl !== undefined) {
      this.setTimeout(ttl)
    }
  }

  setTimeout (delay) {
    if (this._state !== ResourceRequest.PENDING) {
      return
    }
    const ttl = parseInt(delay, 10)

    if (isNaN(ttl) || ttl <= 0) {
      throw new Error('delay must be a positive int')
    }

    const age = Date.now() - this._creationTimestamp

    if (this._timeout) {
      this.removeTimeout()
    }

    this._timeout = setTimeout(fbind(this._fireTimeout, this), Math.max(ttl - age, 0))
  }

  removeTimeout () {
    clearTimeout(this._timeout)
    this._timeout = null
  }

  _fireTimeout () {
    this.reject(new errors.TimeoutError('ResourceRequest timed out'))
  }

  reject (reason) {
    this.removeTimeout()
    super.reject(reason)
  }

  resolve (value) {
    this.removeTimeout()
    super.resolve(value)
  }
}

module.exports = ResourceRequest


/***/ }),
/* 451 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class ExtendableError extends Error {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}

/* eslint-disable no-useless-constructor */
class TimeoutError extends ExtendableError {
  constructor (m) {
    super(m)
  }
}
/* eslint-enable no-useless-constructor */

module.exports = {
  TimeoutError: TimeoutError
}


/***/ }),
/* 452 */
/***/ (function(module, exports) {


module.exports = function (factory) {
  if (typeof factory.create !== 'function') {
    throw new TypeError('factory.create must be a function')
  }

  if (typeof factory.destroy !== 'function') {
    throw new TypeError('factory.destroy must be a function')
  }

  if (typeof factory.validate !== 'undefined' && typeof factory.validate !== 'function') {
    throw new TypeError('factory.validate must be a function')
  }
}


/***/ }),
/* 453 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function noop () {}

/**
 * Reflects a promise but does not expose any
 * underlying value or rejection from that promise.
 * @param  {Promise} promise [description]
 * @return {Promise}         [description]
 */
exports.reflector = function (promise) {
  return promise.then(noop, noop)
}


/***/ }),
/* 454 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Buffer = __webpack_require__(12).Buffer;

// Multibyte codec. In this scheme, a character is represented by 1 or more bytes.
// Our codec supports UTF-16 surrogates, extensions for GB18030 and unicode sequences.
// To save memory and loading time, we read table files only when requested.

exports._dbcs = DBCSCodec;

var UNASSIGNED = -1,
    GB18030_CODE = -2,
    SEQ_START  = -10,
    NODE_START = -1000,
    UNASSIGNED_NODE = new Array(0x100),
    DEF_CHAR = -1;

for (var i = 0; i < 0x100; i++)
    UNASSIGNED_NODE[i] = UNASSIGNED;


// Class DBCSCodec reads and initializes mapping tables.
function DBCSCodec(codecOptions, iconv) {
    this.encodingName = codecOptions.encodingName;
    if (!codecOptions)
        throw new Error("DBCS codec is called without the data.")
    if (!codecOptions.table)
        throw new Error("Encoding '" + this.encodingName + "' has no data.");

    // Load tables.
    var mappingTable = codecOptions.table();


    // Decode tables: MBCS -> Unicode.

    // decodeTables is a trie, encoded as an array of arrays of integers. Internal arrays are trie nodes and all have len = 256.
    // Trie root is decodeTables[0].
    // Values: >=  0 -> unicode character code. can be > 0xFFFF
    //         == UNASSIGNED -> unknown/unassigned sequence.
    //         == GB18030_CODE -> this is the end of a GB18030 4-byte sequence.
    //         <= NODE_START -> index of the next node in our trie to process next byte.
    //         <= SEQ_START  -> index of the start of a character code sequence, in decodeTableSeq.
    this.decodeTables = [];
    this.decodeTables[0] = UNASSIGNED_NODE.slice(0); // Create root node.

    // Sometimes a MBCS char corresponds to a sequence of unicode chars. We store them as arrays of integers here. 
    this.decodeTableSeq = [];

    // Actual mapping tables consist of chunks. Use them to fill up decode tables.
    for (var i = 0; i < mappingTable.length; i++)
        this._addDecodeChunk(mappingTable[i]);

    this.defaultCharUnicode = iconv.defaultCharUnicode;

    
    // Encode tables: Unicode -> DBCS.

    // `encodeTable` is array mapping from unicode char to encoded char. All its values are integers for performance.
    // Because it can be sparse, it is represented as array of buckets by 256 chars each. Bucket can be null.
    // Values: >=  0 -> it is a normal char. Write the value (if <=256 then 1 byte, if <=65536 then 2 bytes, etc.).
    //         == UNASSIGNED -> no conversion found. Output a default char.
    //         <= SEQ_START  -> it's an index in encodeTableSeq, see below. The character starts a sequence.
    this.encodeTable = [];
    
    // `encodeTableSeq` is used when a sequence of unicode characters is encoded as a single code. We use a tree of
    // objects where keys correspond to characters in sequence and leafs are the encoded dbcs values. A special DEF_CHAR key
    // means end of sequence (needed when one sequence is a strict subsequence of another).
    // Objects are kept separately from encodeTable to increase performance.
    this.encodeTableSeq = [];

    // Some chars can be decoded, but need not be encoded.
    var skipEncodeChars = {};
    if (codecOptions.encodeSkipVals)
        for (var i = 0; i < codecOptions.encodeSkipVals.length; i++) {
            var val = codecOptions.encodeSkipVals[i];
            if (typeof val === 'number')
                skipEncodeChars[val] = true;
            else
                for (var j = val.from; j <= val.to; j++)
                    skipEncodeChars[j] = true;
        }
        
    // Use decode trie to recursively fill out encode tables.
    this._fillEncodeTable(0, 0, skipEncodeChars);

    // Add more encoding pairs when needed.
    if (codecOptions.encodeAdd) {
        for (var uChar in codecOptions.encodeAdd)
            if (Object.prototype.hasOwnProperty.call(codecOptions.encodeAdd, uChar))
                this._setEncodeChar(uChar.charCodeAt(0), codecOptions.encodeAdd[uChar]);
    }

    this.defCharSB  = this.encodeTable[0][iconv.defaultCharSingleByte.charCodeAt(0)];
    if (this.defCharSB === UNASSIGNED) this.defCharSB = this.encodeTable[0]['?'];
    if (this.defCharSB === UNASSIGNED) this.defCharSB = "?".charCodeAt(0);


    // Load & create GB18030 tables when needed.
    if (typeof codecOptions.gb18030 === 'function') {
        this.gb18030 = codecOptions.gb18030(); // Load GB18030 ranges.

        // Add GB18030 decode tables.
        var thirdByteNodeIdx = this.decodeTables.length;
        var thirdByteNode = this.decodeTables[thirdByteNodeIdx] = UNASSIGNED_NODE.slice(0);

        var fourthByteNodeIdx = this.decodeTables.length;
        var fourthByteNode = this.decodeTables[fourthByteNodeIdx] = UNASSIGNED_NODE.slice(0);

        for (var i = 0x81; i <= 0xFE; i++) {
            var secondByteNodeIdx = NODE_START - this.decodeTables[0][i];
            var secondByteNode = this.decodeTables[secondByteNodeIdx];
            for (var j = 0x30; j <= 0x39; j++)
                secondByteNode[j] = NODE_START - thirdByteNodeIdx;
        }
        for (var i = 0x81; i <= 0xFE; i++)
            thirdByteNode[i] = NODE_START - fourthByteNodeIdx;
        for (var i = 0x30; i <= 0x39; i++)
            fourthByteNode[i] = GB18030_CODE
    }        
}

DBCSCodec.prototype.encoder = DBCSEncoder;
DBCSCodec.prototype.decoder = DBCSDecoder;

// Decoder helpers
DBCSCodec.prototype._getDecodeTrieNode = function(addr) {
    var bytes = [];
    for (; addr > 0; addr >>= 8)
        bytes.push(addr & 0xFF);
    if (bytes.length == 0)
        bytes.push(0);

    var node = this.decodeTables[0];
    for (var i = bytes.length-1; i > 0; i--) { // Traverse nodes deeper into the trie.
        var val = node[bytes[i]];

        if (val == UNASSIGNED) { // Create new node.
            node[bytes[i]] = NODE_START - this.decodeTables.length;
            this.decodeTables.push(node = UNASSIGNED_NODE.slice(0));
        }
        else if (val <= NODE_START) { // Existing node.
            node = this.decodeTables[NODE_START - val];
        }
        else
            throw new Error("Overwrite byte in " + this.encodingName + ", addr: " + addr.toString(16));
    }
    return node;
}


DBCSCodec.prototype._addDecodeChunk = function(chunk) {
    // First element of chunk is the hex mbcs code where we start.
    var curAddr = parseInt(chunk[0], 16);

    // Choose the decoding node where we'll write our chars.
    var writeTable = this._getDecodeTrieNode(curAddr);
    curAddr = curAddr & 0xFF;

    // Write all other elements of the chunk to the table.
    for (var k = 1; k < chunk.length; k++) {
        var part = chunk[k];
        if (typeof part === "string") { // String, write as-is.
            for (var l = 0; l < part.length;) {
                var code = part.charCodeAt(l++);
                if (0xD800 <= code && code < 0xDC00) { // Decode surrogate
                    var codeTrail = part.charCodeAt(l++);
                    if (0xDC00 <= codeTrail && codeTrail < 0xE000)
                        writeTable[curAddr++] = 0x10000 + (code - 0xD800) * 0x400 + (codeTrail - 0xDC00);
                    else
                        throw new Error("Incorrect surrogate pair in "  + this.encodingName + " at chunk " + chunk[0]);
                }
                else if (0x0FF0 < code && code <= 0x0FFF) { // Character sequence (our own encoding used)
                    var len = 0xFFF - code + 2;
                    var seq = [];
                    for (var m = 0; m < len; m++)
                        seq.push(part.charCodeAt(l++)); // Simple variation: don't support surrogates or subsequences in seq.

                    writeTable[curAddr++] = SEQ_START - this.decodeTableSeq.length;
                    this.decodeTableSeq.push(seq);
                }
                else
                    writeTable[curAddr++] = code; // Basic char
            }
        } 
        else if (typeof part === "number") { // Integer, meaning increasing sequence starting with prev character.
            var charCode = writeTable[curAddr - 1] + 1;
            for (var l = 0; l < part; l++)
                writeTable[curAddr++] = charCode++;
        }
        else
            throw new Error("Incorrect type '" + typeof part + "' given in "  + this.encodingName + " at chunk " + chunk[0]);
    }
    if (curAddr > 0xFF)
        throw new Error("Incorrect chunk in "  + this.encodingName + " at addr " + chunk[0] + ": too long" + curAddr);
}

// Encoder helpers
DBCSCodec.prototype._getEncodeBucket = function(uCode) {
    var high = uCode >> 8; // This could be > 0xFF because of astral characters.
    if (this.encodeTable[high] === undefined)
        this.encodeTable[high] = UNASSIGNED_NODE.slice(0); // Create bucket on demand.
    return this.encodeTable[high];
}

DBCSCodec.prototype._setEncodeChar = function(uCode, dbcsCode) {
    var bucket = this._getEncodeBucket(uCode);
    var low = uCode & 0xFF;
    if (bucket[low] <= SEQ_START)
        this.encodeTableSeq[SEQ_START-bucket[low]][DEF_CHAR] = dbcsCode; // There's already a sequence, set a single-char subsequence of it.
    else if (bucket[low] == UNASSIGNED)
        bucket[low] = dbcsCode;
}

DBCSCodec.prototype._setEncodeSequence = function(seq, dbcsCode) {
    
    // Get the root of character tree according to first character of the sequence.
    var uCode = seq[0];
    var bucket = this._getEncodeBucket(uCode);
    var low = uCode & 0xFF;

    var node;
    if (bucket[low] <= SEQ_START) {
        // There's already a sequence with  - use it.
        node = this.encodeTableSeq[SEQ_START-bucket[low]];
    }
    else {
        // There was no sequence object - allocate a new one.
        node = {};
        if (bucket[low] !== UNASSIGNED) node[DEF_CHAR] = bucket[low]; // If a char was set before - make it a single-char subsequence.
        bucket[low] = SEQ_START - this.encodeTableSeq.length;
        this.encodeTableSeq.push(node);
    }

    // Traverse the character tree, allocating new nodes as needed.
    for (var j = 1; j < seq.length-1; j++) {
        var oldVal = node[uCode];
        if (typeof oldVal === 'object')
            node = oldVal;
        else {
            node = node[uCode] = {}
            if (oldVal !== undefined)
                node[DEF_CHAR] = oldVal
        }
    }

    // Set the leaf to given dbcsCode.
    uCode = seq[seq.length-1];
    node[uCode] = dbcsCode;
}

DBCSCodec.prototype._fillEncodeTable = function(nodeIdx, prefix, skipEncodeChars) {
    var node = this.decodeTables[nodeIdx];
    for (var i = 0; i < 0x100; i++) {
        var uCode = node[i];
        var mbCode = prefix + i;
        if (skipEncodeChars[mbCode])
            continue;

        if (uCode >= 0)
            this._setEncodeChar(uCode, mbCode);
        else if (uCode <= NODE_START)
            this._fillEncodeTable(NODE_START - uCode, mbCode << 8, skipEncodeChars);
        else if (uCode <= SEQ_START)
            this._setEncodeSequence(this.decodeTableSeq[SEQ_START - uCode], mbCode);
    }
}



// == Encoder ==================================================================

function DBCSEncoder(options, codec) {
    // Encoder state
    this.leadSurrogate = -1;
    this.seqObj = undefined;
    
    // Static data
    this.encodeTable = codec.encodeTable;
    this.encodeTableSeq = codec.encodeTableSeq;
    this.defaultCharSingleByte = codec.defCharSB;
    this.gb18030 = codec.gb18030;
}

DBCSEncoder.prototype.write = function(str) {
    var newBuf = new Buffer(str.length * (this.gb18030 ? 4 : 3)), 
        leadSurrogate = this.leadSurrogate,
        seqObj = this.seqObj, nextChar = -1,
        i = 0, j = 0;

    while (true) {
        // 0. Get next character.
        if (nextChar === -1) {
            if (i == str.length) break;
            var uCode = str.charCodeAt(i++);
        }
        else {
            var uCode = nextChar;
            nextChar = -1;    
        }

        // 1. Handle surrogates.
        if (0xD800 <= uCode && uCode < 0xE000) { // Char is one of surrogates.
            if (uCode < 0xDC00) { // We've got lead surrogate.
                if (leadSurrogate === -1) {
                    leadSurrogate = uCode;
                    continue;
                } else {
                    leadSurrogate = uCode;
                    // Double lead surrogate found.
                    uCode = UNASSIGNED;
                }
            } else { // We've got trail surrogate.
                if (leadSurrogate !== -1) {
                    uCode = 0x10000 + (leadSurrogate - 0xD800) * 0x400 + (uCode - 0xDC00);
                    leadSurrogate = -1;
                } else {
                    // Incomplete surrogate pair - only trail surrogate found.
                    uCode = UNASSIGNED;
                }
                
            }
        }
        else if (leadSurrogate !== -1) {
            // Incomplete surrogate pair - only lead surrogate found.
            nextChar = uCode; uCode = UNASSIGNED; // Write an error, then current char.
            leadSurrogate = -1;
        }

        // 2. Convert uCode character.
        var dbcsCode = UNASSIGNED;
        if (seqObj !== undefined && uCode != UNASSIGNED) { // We are in the middle of the sequence
            var resCode = seqObj[uCode];
            if (typeof resCode === 'object') { // Sequence continues.
                seqObj = resCode;
                continue;

            } else if (typeof resCode == 'number') { // Sequence finished. Write it.
                dbcsCode = resCode;

            } else if (resCode == undefined) { // Current character is not part of the sequence.

                // Try default character for this sequence
                resCode = seqObj[DEF_CHAR];
                if (resCode !== undefined) {
                    dbcsCode = resCode; // Found. Write it.
                    nextChar = uCode; // Current character will be written too in the next iteration.

                } else {
                    // TODO: What if we have no default? (resCode == undefined)
                    // Then, we should write first char of the sequence as-is and try the rest recursively.
                    // Didn't do it for now because no encoding has this situation yet.
                    // Currently, just skip the sequence and write current char.
                }
            }
            seqObj = undefined;
        }
        else if (uCode >= 0) {  // Regular character
            var subtable = this.encodeTable[uCode >> 8];
            if (subtable !== undefined)
                dbcsCode = subtable[uCode & 0xFF];
            
            if (dbcsCode <= SEQ_START) { // Sequence start
                seqObj = this.encodeTableSeq[SEQ_START-dbcsCode];
                continue;
            }

            if (dbcsCode == UNASSIGNED && this.gb18030) {
                // Use GB18030 algorithm to find character(s) to write.
                var idx = findIdx(this.gb18030.uChars, uCode);
                if (idx != -1) {
                    var dbcsCode = this.gb18030.gbChars[idx] + (uCode - this.gb18030.uChars[idx]);
                    newBuf[j++] = 0x81 + Math.floor(dbcsCode / 12600); dbcsCode = dbcsCode % 12600;
                    newBuf[j++] = 0x30 + Math.floor(dbcsCode / 1260); dbcsCode = dbcsCode % 1260;
                    newBuf[j++] = 0x81 + Math.floor(dbcsCode / 10); dbcsCode = dbcsCode % 10;
                    newBuf[j++] = 0x30 + dbcsCode;
                    continue;
                }
            }
        }

        // 3. Write dbcsCode character.
        if (dbcsCode === UNASSIGNED)
            dbcsCode = this.defaultCharSingleByte;
        
        if (dbcsCode < 0x100) {
            newBuf[j++] = dbcsCode;
        }
        else if (dbcsCode < 0x10000) {
            newBuf[j++] = dbcsCode >> 8;   // high byte
            newBuf[j++] = dbcsCode & 0xFF; // low byte
        }
        else {
            newBuf[j++] = dbcsCode >> 16;
            newBuf[j++] = (dbcsCode >> 8) & 0xFF;
            newBuf[j++] = dbcsCode & 0xFF;
        }
    }

    this.seqObj = seqObj;
    this.leadSurrogate = leadSurrogate;
    return newBuf.slice(0, j);
}

DBCSEncoder.prototype.end = function() {
    if (this.leadSurrogate === -1 && this.seqObj === undefined)
        return; // All clean. Most often case.

    var newBuf = new Buffer(10), j = 0;

    if (this.seqObj) { // We're in the sequence.
        var dbcsCode = this.seqObj[DEF_CHAR];
        if (dbcsCode !== undefined) { // Write beginning of the sequence.
            if (dbcsCode < 0x100) {
                newBuf[j++] = dbcsCode;
            }
            else {
                newBuf[j++] = dbcsCode >> 8;   // high byte
                newBuf[j++] = dbcsCode & 0xFF; // low byte
            }
        } else {
            // See todo above.
        }
        this.seqObj = undefined;
    }

    if (this.leadSurrogate !== -1) {
        // Incomplete surrogate pair - only lead surrogate found.
        newBuf[j++] = this.defaultCharSingleByte;
        this.leadSurrogate = -1;
    }
    
    return newBuf.slice(0, j);
}

// Export for testing
DBCSEncoder.prototype.findIdx = findIdx;


// == Decoder ==================================================================

function DBCSDecoder(options, codec) {
    // Decoder state
    this.nodeIdx = 0;
    this.prevBuf = new Buffer(0);

    // Static data
    this.decodeTables = codec.decodeTables;
    this.decodeTableSeq = codec.decodeTableSeq;
    this.defaultCharUnicode = codec.defaultCharUnicode;
    this.gb18030 = codec.gb18030;
}

DBCSDecoder.prototype.write = function(buf) {
    var newBuf = new Buffer(buf.length*2),
        nodeIdx = this.nodeIdx, 
        prevBuf = this.prevBuf, prevBufOffset = this.prevBuf.length,
        seqStart = -this.prevBuf.length, // idx of the start of current parsed sequence.
        uCode;

    if (prevBufOffset > 0) // Make prev buf overlap a little to make it easier to slice later.
        prevBuf = Buffer.concat([prevBuf, buf.slice(0, 10)]);
    
    for (var i = 0, j = 0; i < buf.length; i++) {
        var curByte = (i >= 0) ? buf[i] : prevBuf[i + prevBufOffset];

        // Lookup in current trie node.
        var uCode = this.decodeTables[nodeIdx][curByte];

        if (uCode >= 0) { 
            // Normal character, just use it.
        }
        else if (uCode === UNASSIGNED) { // Unknown char.
            // TODO: Callback with seq.
            //var curSeq = (seqStart >= 0) ? buf.slice(seqStart, i+1) : prevBuf.slice(seqStart + prevBufOffset, i+1 + prevBufOffset);
            i = seqStart; // Try to parse again, after skipping first byte of the sequence ('i' will be incremented by 'for' cycle).
            uCode = this.defaultCharUnicode.charCodeAt(0);
        }
        else if (uCode === GB18030_CODE) {
            var curSeq = (seqStart >= 0) ? buf.slice(seqStart, i+1) : prevBuf.slice(seqStart + prevBufOffset, i+1 + prevBufOffset);
            var ptr = (curSeq[0]-0x81)*12600 + (curSeq[1]-0x30)*1260 + (curSeq[2]-0x81)*10 + (curSeq[3]-0x30);
            var idx = findIdx(this.gb18030.gbChars, ptr);
            uCode = this.gb18030.uChars[idx] + ptr - this.gb18030.gbChars[idx];
        }
        else if (uCode <= NODE_START) { // Go to next trie node.
            nodeIdx = NODE_START - uCode;
            continue;
        }
        else if (uCode <= SEQ_START) { // Output a sequence of chars.
            var seq = this.decodeTableSeq[SEQ_START - uCode];
            for (var k = 0; k < seq.length - 1; k++) {
                uCode = seq[k];
                newBuf[j++] = uCode & 0xFF;
                newBuf[j++] = uCode >> 8;
            }
            uCode = seq[seq.length-1];
        }
        else
            throw new Error("iconv-lite internal error: invalid decoding table value " + uCode + " at " + nodeIdx + "/" + curByte);

        // Write the character to buffer, handling higher planes using surrogate pair.
        if (uCode > 0xFFFF) { 
            uCode -= 0x10000;
            var uCodeLead = 0xD800 + Math.floor(uCode / 0x400);
            newBuf[j++] = uCodeLead & 0xFF;
            newBuf[j++] = uCodeLead >> 8;

            uCode = 0xDC00 + uCode % 0x400;
        }
        newBuf[j++] = uCode & 0xFF;
        newBuf[j++] = uCode >> 8;

        // Reset trie node.
        nodeIdx = 0; seqStart = i+1;
    }

    this.nodeIdx = nodeIdx;
    this.prevBuf = (seqStart >= 0) ? buf.slice(seqStart) : prevBuf.slice(seqStart + prevBufOffset);
    return newBuf.slice(0, j).toString('ucs2');
}

DBCSDecoder.prototype.end = function() {
    var ret = '';

    // Try to parse all remaining chars.
    while (this.prevBuf.length > 0) {
        // Skip 1 character in the buffer.
        ret += this.defaultCharUnicode;
        var buf = this.prevBuf.slice(1);

        // Parse remaining as usual.
        this.prevBuf = new Buffer(0);
        this.nodeIdx = 0;
        if (buf.length > 0)
            ret += this.write(buf);
    }

    this.nodeIdx = 0;
    return ret;
}

// Binary search for GB18030. Returns largest i such that table[i] <= val.
function findIdx(table, val) {
    if (table[0] > val)
        return -1;

    var l = 0, r = table.length;
    while (l < r-1) { // always table[l] <= val < table[r]
        var mid = l + Math.floor((r-l+1)/2);
        if (table[mid] <= val)
            l = mid;
        else
            r = mid;
    }
    return l;
}



/***/ }),
/* 455 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Description of supported double byte encodings and aliases.
// Tables are not require()-d until they are needed to speed up library load.
// require()-s are direct to support Browserify.

module.exports = {
    
    // == Japanese/ShiftJIS ====================================================
    // All japanese encodings are based on JIS X set of standards:
    // JIS X 0201 - Single-byte encoding of ASCII + ¥ + Kana chars at 0xA1-0xDF.
    // JIS X 0208 - Main set of 6879 characters, placed in 94x94 plane, to be encoded by 2 bytes. 
    //              Has several variations in 1978, 1983, 1990 and 1997.
    // JIS X 0212 - Supplementary plane of 6067 chars in 94x94 plane. 1990. Effectively dead.
    // JIS X 0213 - Extension and modern replacement of 0208 and 0212. Total chars: 11233.
    //              2 planes, first is superset of 0208, second - revised 0212.
    //              Introduced in 2000, revised 2004. Some characters are in Unicode Plane 2 (0x2xxxx)

    // Byte encodings are:
    //  * Shift_JIS: Compatible with 0201, uses not defined chars in top half as lead bytes for double-byte
    //               encoding of 0208. Lead byte ranges: 0x81-0x9F, 0xE0-0xEF; Trail byte ranges: 0x40-0x7E, 0x80-0x9E, 0x9F-0xFC.
    //               Windows CP932 is a superset of Shift_JIS. Some companies added more chars, notably KDDI.
    //  * EUC-JP:    Up to 3 bytes per character. Used mostly on *nixes.
    //               0x00-0x7F       - lower part of 0201
    //               0x8E, 0xA1-0xDF - upper part of 0201
    //               (0xA1-0xFE)x2   - 0208 plane (94x94).
    //               0x8F, (0xA1-0xFE)x2 - 0212 plane (94x94).
    //  * JIS X 208: 7-bit, direct encoding of 0208. Byte ranges: 0x21-0x7E (94 values). Uncommon.
    //               Used as-is in ISO2022 family.
    //  * ISO2022-JP: Stateful encoding, with escape sequences to switch between ASCII, 
    //                0201-1976 Roman, 0208-1978, 0208-1983.
    //  * ISO2022-JP-1: Adds esc seq for 0212-1990.
    //  * ISO2022-JP-2: Adds esc seq for GB2313-1980, KSX1001-1992, ISO8859-1, ISO8859-7.
    //  * ISO2022-JP-3: Adds esc seq for 0201-1976 Kana set, 0213-2000 Planes 1, 2.
    //  * ISO2022-JP-2004: Adds 0213-2004 Plane 1.
    //
    // After JIS X 0213 appeared, Shift_JIS-2004, EUC-JISX0213 and ISO2022-JP-2004 followed, with just changing the planes.
    //
    // Overall, it seems that it's a mess :( http://www8.plala.or.jp/tkubota1/unicode-symbols-map2.html

    'shiftjis': {
        type: '_dbcs',
        table: function() { return __webpack_require__(465) },
        encodeAdd: {'\u00a5': 0x5C, '\u203E': 0x7E},
        encodeSkipVals: [{from: 0xED40, to: 0xF940}],
    },
    'csshiftjis': 'shiftjis',
    'mskanji': 'shiftjis',
    'sjis': 'shiftjis',
    'windows31j': 'shiftjis',
    'ms31j': 'shiftjis',
    'xsjis': 'shiftjis',
    'windows932': 'shiftjis',
    'ms932': 'shiftjis',
    '932': 'shiftjis',
    'cp932': 'shiftjis',

    'eucjp': {
        type: '_dbcs',
        table: function() { return __webpack_require__(463) },
        encodeAdd: {'\u00a5': 0x5C, '\u203E': 0x7E},
    },

    // TODO: KDDI extension to Shift_JIS
    // TODO: IBM CCSID 942 = CP932, but F0-F9 custom chars and other char changes.
    // TODO: IBM CCSID 943 = Shift_JIS = CP932 with original Shift_JIS lower 128 chars.


    // == Chinese/GBK ==========================================================
    // http://en.wikipedia.org/wiki/GBK
    // We mostly implement W3C recommendation: https://www.w3.org/TR/encoding/#gbk-encoder

    // Oldest GB2312 (1981, ~7600 chars) is a subset of CP936
    'gb2312': 'cp936',
    'gb231280': 'cp936',
    'gb23121980': 'cp936',
    'csgb2312': 'cp936',
    'csiso58gb231280': 'cp936',
    'euccn': 'cp936',

    // Microsoft's CP936 is a subset and approximation of GBK.
    'windows936': 'cp936',
    'ms936': 'cp936',
    '936': 'cp936',
    'cp936': {
        type: '_dbcs',
        table: function() { return __webpack_require__(134) },
    },

    // GBK (~22000 chars) is an extension of CP936 that added user-mapped chars and some other.
    'gbk': {
        type: '_dbcs',
        table: function() { return __webpack_require__(134).concat(__webpack_require__(192)) },
    },
    'xgbk': 'gbk',
    'isoir58': 'gbk',

    // GB18030 is an algorithmic extension of GBK.
    // Main source: https://www.w3.org/TR/encoding/#gbk-encoder
    // http://icu-project.org/docs/papers/gb18030.html
    // http://source.icu-project.org/repos/icu/data/trunk/charset/data/xml/gb-18030-2000.xml
    // http://www.khngai.com/chinese/charmap/tblgbk.php?page=0
    'gb18030': {
        type: '_dbcs',
        table: function() { return __webpack_require__(134).concat(__webpack_require__(192)) },
        gb18030: function() { return __webpack_require__(464) },
        encodeSkipVals: [0x80],
        encodeAdd: {'€': 0xA2E3},
    },

    'chinese': 'gb18030',


    // == Korean ===============================================================
    // EUC-KR, KS_C_5601 and KS X 1001 are exactly the same.
    'windows949': 'cp949',
    'ms949': 'cp949',
    '949': 'cp949',
    'cp949': {
        type: '_dbcs',
        table: function() { return __webpack_require__(462) },
    },

    'cseuckr': 'cp949',
    'csksc56011987': 'cp949',
    'euckr': 'cp949',
    'isoir149': 'cp949',
    'korean': 'cp949',
    'ksc56011987': 'cp949',
    'ksc56011989': 'cp949',
    'ksc5601': 'cp949',


    // == Big5/Taiwan/Hong Kong ================================================
    // There are lots of tables for Big5 and cp950. Please see the following links for history:
    // http://moztw.org/docs/big5/  http://www.haible.de/bruno/charsets/conversion-tables/Big5.html
    // Variations, in roughly number of defined chars:
    //  * Windows CP 950: Microsoft variant of Big5. Canonical: http://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WINDOWS/CP950.TXT
    //  * Windows CP 951: Microsoft variant of Big5-HKSCS-2001. Seems to be never public. http://me.abelcheung.org/articles/research/what-is-cp951/
    //  * Big5-2003 (Taiwan standard) almost superset of cp950.
    //  * Unicode-at-on (UAO) / Mozilla 1.8. Falling out of use on the Web. Not supported by other browsers.
    //  * Big5-HKSCS (-2001, -2004, -2008). Hong Kong standard. 
    //    many unicode code points moved from PUA to Supplementary plane (U+2XXXX) over the years.
    //    Plus, it has 4 combining sequences.
    //    Seems that Mozilla refused to support it for 10 yrs. https://bugzilla.mozilla.org/show_bug.cgi?id=162431 https://bugzilla.mozilla.org/show_bug.cgi?id=310299
    //    because big5-hkscs is the only encoding to include astral characters in non-algorithmic way.
    //    Implementations are not consistent within browsers; sometimes labeled as just big5.
    //    MS Internet Explorer switches from big5 to big5-hkscs when a patch applied.
    //    Great discussion & recap of what's going on https://bugzilla.mozilla.org/show_bug.cgi?id=912470#c31
    //    In the encoder, it might make sense to support encoding old PUA mappings to Big5 bytes seq-s.
    //    Official spec: http://www.ogcio.gov.hk/en/business/tech_promotion/ccli/terms/doc/2003cmp_2008.txt
    //                   http://www.ogcio.gov.hk/tc/business/tech_promotion/ccli/terms/doc/hkscs-2008-big5-iso.txt
    // 
    // Current understanding of how to deal with Big5(-HKSCS) is in the Encoding Standard, http://encoding.spec.whatwg.org/#big5-encoder
    // Unicode mapping (http://www.unicode.org/Public/MAPPINGS/OBSOLETE/EASTASIA/OTHER/BIG5.TXT) is said to be wrong.

    'windows950': 'cp950',
    'ms950': 'cp950',
    '950': 'cp950',
    'cp950': {
        type: '_dbcs',
        table: function() { return __webpack_require__(191) },
    },

    // Big5 has many variations and is an extension of cp950. We use Encoding Standard's as a consensus.
    'big5': 'big5hkscs',
    'big5hkscs': {
        type: '_dbcs',
        table: function() { return __webpack_require__(191).concat(__webpack_require__(461)) },
        encodeSkipVals: [0xa2cc],
    },

    'cnbig5': 'big5hkscs',
    'csbig5': 'big5hkscs',
    'xxbig5': 'big5hkscs',
};


/***/ }),
/* 456 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Update this array if you add/rename/remove files in this directory.
// We support Browserify by skipping automatic module discovery and requiring modules directly.
var modules = [
    __webpack_require__(457),
    __webpack_require__(466),
    __webpack_require__(467),
    __webpack_require__(458),
    __webpack_require__(460),
    __webpack_require__(459),
    __webpack_require__(454),
    __webpack_require__(455),
];

// Put all encoding/alias/codec definitions to single object and export it. 
for (var i = 0; i < modules.length; i++) {
    var module = modules[i];
    for (var enc in module)
        if (Object.prototype.hasOwnProperty.call(module, enc))
            exports[enc] = module[enc];
}


/***/ }),
/* 457 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Buffer = __webpack_require__(12).Buffer;

// Export Node.js internal encodings.

module.exports = {
    // Encodings
    utf8:   { type: "_internal", bomAware: true},
    cesu8:  { type: "_internal", bomAware: true},
    unicode11utf8: "utf8",

    ucs2:   { type: "_internal", bomAware: true},
    utf16le: "ucs2",

    binary: { type: "_internal" },
    iso88591: "binary",

    base64: { type: "_internal" },
    hex:    { type: "_internal" },

    // Codec.
    _internal: InternalCodec,
};

//------------------------------------------------------------------------------

function InternalCodec(codecOptions, iconv) {
    this.enc = codecOptions.encodingName;
    this.bomAware = codecOptions.bomAware;

    if (this.enc === "base64")
        this.encoder = InternalEncoderBase64;
    else if (this.enc === "cesu8") {
        this.enc = "utf8"; // Use utf8 for decoding.
        this.encoder = InternalEncoderCesu8;

        // Add decoder for versions of Node not supporting CESU-8
        if (new Buffer("eda080", 'hex').toString().length == 3) {
            this.decoder = InternalDecoderCesu8;
            this.defaultCharUnicode = iconv.defaultCharUnicode;
        }
    }
}

InternalCodec.prototype.encoder = InternalEncoder;
InternalCodec.prototype.decoder = InternalDecoder;

//------------------------------------------------------------------------------

// We use node.js internal decoder. Its signature is the same as ours.
var StringDecoder = __webpack_require__(512).StringDecoder;

if (!StringDecoder.prototype.end) // Node v0.8 doesn't have this method.
    StringDecoder.prototype.end = function() {};


function InternalDecoder(options, codec) {
    StringDecoder.call(this, codec.enc);
}

InternalDecoder.prototype = StringDecoder.prototype;


//------------------------------------------------------------------------------
// Encoder is mostly trivial

function InternalEncoder(options, codec) {
    this.enc = codec.enc;
}

InternalEncoder.prototype.write = function(str) {
    return new Buffer(str, this.enc);
}

InternalEncoder.prototype.end = function() {
}


//------------------------------------------------------------------------------
// Except base64 encoder, which must keep its state.

function InternalEncoderBase64(options, codec) {
    this.prevStr = '';
}

InternalEncoderBase64.prototype.write = function(str) {
    str = this.prevStr + str;
    var completeQuads = str.length - (str.length % 4);
    this.prevStr = str.slice(completeQuads);
    str = str.slice(0, completeQuads);

    return new Buffer(str, "base64");
}

InternalEncoderBase64.prototype.end = function() {
    return new Buffer(this.prevStr, "base64");
}


//------------------------------------------------------------------------------
// CESU-8 encoder is also special.

function InternalEncoderCesu8(options, codec) {
}

InternalEncoderCesu8.prototype.write = function(str) {
    var buf = new Buffer(str.length * 3), bufIdx = 0;
    for (var i = 0; i < str.length; i++) {
        var charCode = str.charCodeAt(i);
        // Naive implementation, but it works because CESU-8 is especially easy
        // to convert from UTF-16 (which all JS strings are encoded in).
        if (charCode < 0x80)
            buf[bufIdx++] = charCode;
        else if (charCode < 0x800) {
            buf[bufIdx++] = 0xC0 + (charCode >>> 6);
            buf[bufIdx++] = 0x80 + (charCode & 0x3f);
        }
        else { // charCode will always be < 0x10000 in javascript.
            buf[bufIdx++] = 0xE0 + (charCode >>> 12);
            buf[bufIdx++] = 0x80 + ((charCode >>> 6) & 0x3f);
            buf[bufIdx++] = 0x80 + (charCode & 0x3f);
        }
    }
    return buf.slice(0, bufIdx);
}

InternalEncoderCesu8.prototype.end = function() {
}

//------------------------------------------------------------------------------
// CESU-8 decoder is not implemented in Node v4.0+

function InternalDecoderCesu8(options, codec) {
    this.acc = 0;
    this.contBytes = 0;
    this.accBytes = 0;
    this.defaultCharUnicode = codec.defaultCharUnicode;
}

InternalDecoderCesu8.prototype.write = function(buf) {
    var acc = this.acc, contBytes = this.contBytes, accBytes = this.accBytes, 
        res = '';
    for (var i = 0; i < buf.length; i++) {
        var curByte = buf[i];
        if ((curByte & 0xC0) !== 0x80) { // Leading byte
            if (contBytes > 0) { // Previous code is invalid
                res += this.defaultCharUnicode;
                contBytes = 0;
            }

            if (curByte < 0x80) { // Single-byte code
                res += String.fromCharCode(curByte);
            } else if (curByte < 0xE0) { // Two-byte code
                acc = curByte & 0x1F;
                contBytes = 1; accBytes = 1;
            } else if (curByte < 0xF0) { // Three-byte code
                acc = curByte & 0x0F;
                contBytes = 2; accBytes = 1;
            } else { // Four or more are not supported for CESU-8.
                res += this.defaultCharUnicode;
            }
        } else { // Continuation byte
            if (contBytes > 0) { // We're waiting for it.
                acc = (acc << 6) | (curByte & 0x3f);
                contBytes--; accBytes++;
                if (contBytes === 0) {
                    // Check for overlong encoding, but support Modified UTF-8 (encoding NULL as C0 80)
                    if (accBytes === 2 && acc < 0x80 && acc > 0)
                        res += this.defaultCharUnicode;
                    else if (accBytes === 3 && acc < 0x800)
                        res += this.defaultCharUnicode;
                    else
                        // Actually add character.
                        res += String.fromCharCode(acc);
                }
            } else { // Unexpected continuation byte
                res += this.defaultCharUnicode;
            }
        }
    }
    this.acc = acc; this.contBytes = contBytes; this.accBytes = accBytes;
    return res;
}

InternalDecoderCesu8.prototype.end = function() {
    var res = 0;
    if (this.contBytes > 0)
        res += this.defaultCharUnicode;
    return res;
}


/***/ }),
/* 458 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Buffer = __webpack_require__(12).Buffer;

// Single-byte codec. Needs a 'chars' string parameter that contains 256 or 128 chars that
// correspond to encoded bytes (if 128 - then lower half is ASCII). 

exports._sbcs = SBCSCodec;
function SBCSCodec(codecOptions, iconv) {
    if (!codecOptions)
        throw new Error("SBCS codec is called without the data.")
    
    // Prepare char buffer for decoding.
    if (!codecOptions.chars || (codecOptions.chars.length !== 128 && codecOptions.chars.length !== 256))
        throw new Error("Encoding '"+codecOptions.type+"' has incorrect 'chars' (must be of len 128 or 256)");
    
    if (codecOptions.chars.length === 128) {
        var asciiString = "";
        for (var i = 0; i < 128; i++)
            asciiString += String.fromCharCode(i);
        codecOptions.chars = asciiString + codecOptions.chars;
    }

    this.decodeBuf = new Buffer(codecOptions.chars, 'ucs2');
    
    // Encoding buffer.
    var encodeBuf = new Buffer(65536);
    encodeBuf.fill(iconv.defaultCharSingleByte.charCodeAt(0));

    for (var i = 0; i < codecOptions.chars.length; i++)
        encodeBuf[codecOptions.chars.charCodeAt(i)] = i;

    this.encodeBuf = encodeBuf;
}

SBCSCodec.prototype.encoder = SBCSEncoder;
SBCSCodec.prototype.decoder = SBCSDecoder;


function SBCSEncoder(options, codec) {
    this.encodeBuf = codec.encodeBuf;
}

SBCSEncoder.prototype.write = function(str) {
    var buf = new Buffer(str.length);
    for (var i = 0; i < str.length; i++)
        buf[i] = this.encodeBuf[str.charCodeAt(i)];
    
    return buf;
}

SBCSEncoder.prototype.end = function() {
}


function SBCSDecoder(options, codec) {
    this.decodeBuf = codec.decodeBuf;
}

SBCSDecoder.prototype.write = function(buf) {
    // Strings are immutable in JS -> we use ucs2 buffer to speed up computations.
    var decodeBuf = this.decodeBuf;
    var newBuf = new Buffer(buf.length*2);
    var idx1 = 0, idx2 = 0;
    for (var i = 0; i < buf.length; i++) {
        idx1 = buf[i]*2; idx2 = i*2;
        newBuf[idx2] = decodeBuf[idx1];
        newBuf[idx2+1] = decodeBuf[idx1+1];
    }
    return newBuf.toString('ucs2');
}

SBCSDecoder.prototype.end = function() {
}


/***/ }),
/* 459 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Generated data for sbcs codec. Don't edit manually. Regenerate using generation/gen-sbcs.js script.
module.exports = {
  "437": "cp437",
  "737": "cp737",
  "775": "cp775",
  "850": "cp850",
  "852": "cp852",
  "855": "cp855",
  "856": "cp856",
  "857": "cp857",
  "858": "cp858",
  "860": "cp860",
  "861": "cp861",
  "862": "cp862",
  "863": "cp863",
  "864": "cp864",
  "865": "cp865",
  "866": "cp866",
  "869": "cp869",
  "874": "windows874",
  "922": "cp922",
  "1046": "cp1046",
  "1124": "cp1124",
  "1125": "cp1125",
  "1129": "cp1129",
  "1133": "cp1133",
  "1161": "cp1161",
  "1162": "cp1162",
  "1163": "cp1163",
  "1250": "windows1250",
  "1251": "windows1251",
  "1252": "windows1252",
  "1253": "windows1253",
  "1254": "windows1254",
  "1255": "windows1255",
  "1256": "windows1256",
  "1257": "windows1257",
  "1258": "windows1258",
  "28592": "iso88592",
  "28593": "iso88593",
  "28594": "iso88594",
  "28595": "iso88595",
  "28596": "iso88596",
  "28597": "iso88597",
  "28598": "iso88598",
  "28599": "iso88599",
  "28600": "iso885910",
  "28601": "iso885911",
  "28603": "iso885913",
  "28604": "iso885914",
  "28605": "iso885915",
  "28606": "iso885916",
  "windows874": {
    "type": "_sbcs",
    "chars": "€����…�����������‘’“”•–—�������� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
  },
  "win874": "windows874",
  "cp874": "windows874",
  "windows1250": {
    "type": "_sbcs",
    "chars": "€�‚�„…†‡�‰Š‹ŚŤŽŹ�‘’“”•–—�™š›śťžź ˇ˘Ł¤Ą¦§¨©Ş«¬­®Ż°±˛ł´µ¶·¸ąş»Ľ˝ľżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
  },
  "win1250": "windows1250",
  "cp1250": "windows1250",
  "windows1251": {
    "type": "_sbcs",
    "chars": "ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—�™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬­®Ї°±Ііґµ¶·ё№є»јЅѕїАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
  },
  "win1251": "windows1251",
  "cp1251": "windows1251",
  "windows1252": {
    "type": "_sbcs",
    "chars": "€�‚ƒ„…†‡ˆ‰Š‹Œ�Ž��‘’“”•–—˜™š›œ�žŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
  },
  "win1252": "windows1252",
  "cp1252": "windows1252",
  "windows1253": {
    "type": "_sbcs",
    "chars": "€�‚ƒ„…†‡�‰�‹�����‘’“”•–—�™�›���� ΅Ά£¤¥¦§¨©�«¬­®―°±²³΄µ¶·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
  },
  "win1253": "windows1253",
  "cp1253": "windows1253",
  "windows1254": {
    "type": "_sbcs",
    "chars": "€�‚ƒ„…†‡ˆ‰Š‹Œ����‘’“”•–—˜™š›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
  },
  "win1254": "windows1254",
  "cp1254": "windows1254",
  "windows1255": {
    "type": "_sbcs",
    "chars": "€�‚ƒ„…†‡ˆ‰�‹�����‘’“”•–—˜™�›���� ¡¢£₪¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾¿ְֱֲֳִֵֶַָֹ�ֻּֽ־ֿ׀ׁׂ׃װױײ׳״�������אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
  },
  "win1255": "windows1255",
  "cp1255": "windows1255",
  "windows1256": {
    "type": "_sbcs",
    "chars": "€پ‚ƒ„…†‡ˆ‰ٹ‹Œچژڈگ‘’“”•–—ک™ڑ›œ‌‍ں ،¢£¤¥¦§¨©ھ«¬­®¯°±²³´µ¶·¸¹؛»¼½¾؟ہءآأؤإئابةتثجحخدذرزسشصض×طظعغـفقكàلâمنهوçèéêëىيîïًٌٍَôُِ÷ّùْûü‎‏ے"
  },
  "win1256": "windows1256",
  "cp1256": "windows1256",
  "windows1257": {
    "type": "_sbcs",
    "chars": "€�‚�„…†‡�‰�‹�¨ˇ¸�‘’“”•–—�™�›�¯˛� �¢£¤�¦§Ø©Ŗ«¬­®Æ°±²³´µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž˙"
  },
  "win1257": "windows1257",
  "cp1257": "windows1257",
  "windows1258": {
    "type": "_sbcs",
    "chars": "€�‚ƒ„…†‡ˆ‰�‹Œ����‘’“”•–—˜™�›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
  },
  "win1258": "windows1258",
  "cp1258": "windows1258",
  "iso88592": {
    "type": "_sbcs",
    "chars": " Ą˘Ł¤ĽŚ§¨ŠŞŤŹ­ŽŻ°ą˛ł´ľśˇ¸šşťź˝žżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
  },
  "cp28592": "iso88592",
  "iso88593": {
    "type": "_sbcs",
    "chars": " Ħ˘£¤�Ĥ§¨İŞĞĴ­�Ż°ħ²³´µĥ·¸ışğĵ½�żÀÁÂ�ÄĊĈÇÈÉÊËÌÍÎÏ�ÑÒÓÔĠÖ×ĜÙÚÛÜŬŜßàáâ�äċĉçèéêëìíîï�ñòóôġö÷ĝùúûüŭŝ˙"
  },
  "cp28593": "iso88593",
  "iso88594": {
    "type": "_sbcs",
    "chars": " ĄĸŖ¤ĨĻ§¨ŠĒĢŦ­Ž¯°ą˛ŗ´ĩļˇ¸šēģŧŊžŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎĪĐŅŌĶÔÕÖ×ØŲÚÛÜŨŪßāáâãäåæįčéęëėíîīđņōķôõö÷øųúûüũū˙"
  },
  "cp28594": "iso88594",
  "iso88595": {
    "type": "_sbcs",
    "chars": " ЁЂЃЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђѓєѕіїјљњћќ§ўџ"
  },
  "cp28595": "iso88595",
  "iso88596": {
    "type": "_sbcs",
    "chars": " ���¤�������،­�������������؛���؟�ءآأؤإئابةتثجحخدذرزسشصضطظعغ�����ـفقكلمنهوىيًٌٍَُِّْ�������������"
  },
  "cp28596": "iso88596",
  "iso88597": {
    "type": "_sbcs",
    "chars": " ‘’£€₯¦§¨©ͺ«¬­�―°±²³΄΅Ά·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
  },
  "cp28597": "iso88597",
  "iso88598": {
    "type": "_sbcs",
    "chars": " �¢£¤¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾��������������������������������‗אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
  },
  "cp28598": "iso88598",
  "iso88599": {
    "type": "_sbcs",
    "chars": " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
  },
  "cp28599": "iso88599",
  "iso885910": {
    "type": "_sbcs",
    "chars": " ĄĒĢĪĨĶ§ĻĐŠŦŽ­ŪŊ°ąēģīĩķ·ļđšŧž―ūŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎÏÐŅŌÓÔÕÖŨØŲÚÛÜÝÞßāáâãäåæįčéęëėíîïðņōóôõöũøųúûüýþĸ"
  },
  "cp28600": "iso885910",
  "iso885911": {
    "type": "_sbcs",
    "chars": " กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
  },
  "cp28601": "iso885911",
  "iso885913": {
    "type": "_sbcs",
    "chars": " ”¢£¤„¦§Ø©Ŗ«¬­®Æ°±²³“µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž’"
  },
  "cp28603": "iso885913",
  "iso885914": {
    "type": "_sbcs",
    "chars": " Ḃḃ£ĊċḊ§Ẁ©ẂḋỲ­®ŸḞḟĠġṀṁ¶ṖẁṗẃṠỳẄẅṡÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŴÑÒÓÔÕÖṪØÙÚÛÜÝŶßàáâãäåæçèéêëìíîïŵñòóôõöṫøùúûüýŷÿ"
  },
  "cp28604": "iso885914",
  "iso885915": {
    "type": "_sbcs",
    "chars": " ¡¢£€¥Š§š©ª«¬­®¯°±²³Žµ¶·ž¹º»ŒœŸ¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
  },
  "cp28605": "iso885915",
  "iso885916": {
    "type": "_sbcs",
    "chars": " ĄąŁ€„Š§š©Ș«Ź­źŻ°±ČłŽ”¶·žčș»ŒœŸżÀÁÂĂÄĆÆÇÈÉÊËÌÍÎÏĐŃÒÓÔŐÖŚŰÙÚÛÜĘȚßàáâăäćæçèéêëìíîïđńòóôőöśűùúûüęțÿ"
  },
  "cp28606": "iso885916",
  "cp437": {
    "type": "_sbcs",
    "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
  },
  "ibm437": "cp437",
  "csibm437": "cp437",
  "cp737": {
    "type": "_sbcs",
    "chars": "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρσςτυφχψ░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ωάέήϊίόύϋώΆΈΉΊΌΎΏ±≥≤ΪΫ÷≈°∙·√ⁿ²■ "
  },
  "ibm737": "cp737",
  "csibm737": "cp737",
  "cp775": {
    "type": "_sbcs",
    "chars": "ĆüéāäģåćłēŖŗīŹÄÅÉæÆōöĢ¢ŚśÖÜø£Ø×¤ĀĪóŻżź”¦©®¬½¼Ł«»░▒▓│┤ĄČĘĖ╣║╗╝ĮŠ┐└┴┬├─┼ŲŪ╚╔╩╦╠═╬Žąčęėįšųūž┘┌█▄▌▐▀ÓßŌŃõÕµńĶķĻļņĒŅ’­±“¾¶§÷„°∙·¹³²■ "
  },
  "ibm775": "cp775",
  "csibm775": "cp775",
  "cp850": {
    "type": "_sbcs",
    "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
  },
  "ibm850": "cp850",
  "csibm850": "cp850",
  "cp852": {
    "type": "_sbcs",
    "chars": "ÇüéâäůćçłëŐőîŹÄĆÉĹĺôöĽľŚśÖÜŤťŁ×čáíóúĄąŽžĘę¬źČş«»░▒▓│┤ÁÂĚŞ╣║╗╝Żż┐└┴┬├─┼Ăă╚╔╩╦╠═╬¤đĐĎËďŇÍÎě┘┌█▄ŢŮ▀ÓßÔŃńňŠšŔÚŕŰýÝţ´­˝˛ˇ˘§÷¸°¨˙űŘř■ "
  },
  "ibm852": "cp852",
  "csibm852": "cp852",
  "cp855": {
    "type": "_sbcs",
    "chars": "ђЂѓЃёЁєЄѕЅіІїЇјЈљЉњЊћЋќЌўЎџЏюЮъЪаАбБцЦдДеЕфФгГ«»░▒▓│┤хХиИ╣║╗╝йЙ┐└┴┬├─┼кК╚╔╩╦╠═╬¤лЛмМнНоОп┘┌█▄Пя▀ЯрРсСтТуУжЖвВьЬ№­ыЫзЗшШэЭщЩчЧ§■ "
  },
  "ibm855": "cp855",
  "csibm855": "cp855",
  "cp856": {
    "type": "_sbcs",
    "chars": "אבגדהוזחטיךכלםמןנסעףפץצקרשת�£�×����������®¬½¼�«»░▒▓│┤���©╣║╗╝¢¥┐└┴┬├─┼��╚╔╩╦╠═╬¤���������┘┌█▄¦�▀������µ�������¯´­±‗¾¶§÷¸°¨·¹³²■ "
  },
  "ibm856": "cp856",
  "csibm856": "cp856",
  "cp857": {
    "type": "_sbcs",
    "chars": "ÇüéâäàåçêëèïîıÄÅÉæÆôöòûùİÖÜø£ØŞşáíóúñÑĞğ¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ºªÊËÈ�ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµ�×ÚÛÙìÿ¯´­±�¾¶§÷¸°¨·¹³²■ "
  },
  "ibm857": "cp857",
  "csibm857": "cp857",
  "cp858": {
    "type": "_sbcs",
    "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈ€ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
  },
  "ibm858": "cp858",
  "csibm858": "cp858",
  "cp860": {
    "type": "_sbcs",
    "chars": "ÇüéâãàÁçêÊèÍÔìÃÂÉÀÈôõòÚùÌÕÜ¢£Ù₧ÓáíóúñÑªº¿Ò¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
  },
  "ibm860": "cp860",
  "csibm860": "cp860",
  "cp861": {
    "type": "_sbcs",
    "chars": "ÇüéâäàåçêëèÐðÞÄÅÉæÆôöþûÝýÖÜø£Ø₧ƒáíóúÁÍÓÚ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
  },
  "ibm861": "cp861",
  "csibm861": "cp861",
  "cp862": {
    "type": "_sbcs",
    "chars": "אבגדהוזחטיךכלםמןנסעףפץצקרשת¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
  },
  "ibm862": "cp862",
  "csibm862": "cp862",
  "cp863": {
    "type": "_sbcs",
    "chars": "ÇüéâÂà¶çêëèïî‗À§ÉÈÊôËÏûù¤ÔÜ¢£ÙÛƒ¦´óú¨¸³¯Î⌐¬½¼¾«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
  },
  "ibm863": "cp863",
  "csibm863": "cp863",
  "cp864": {
    "type": "_sbcs",
    "chars": "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$٪&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~°·∙√▒─│┼┤┬├┴┐┌└┘β∞φ±½¼≈«»ﻷﻸ��ﻻﻼ� ­ﺂ£¤ﺄ��ﺎﺏﺕﺙ،ﺝﺡﺥ٠١٢٣٤٥٦٧٨٩ﻑ؛ﺱﺵﺹ؟¢ﺀﺁﺃﺅﻊﺋﺍﺑﺓﺗﺛﺟﺣﺧﺩﺫﺭﺯﺳﺷﺻﺿﻁﻅﻋﻏ¦¬÷×ﻉـﻓﻗﻛﻟﻣﻧﻫﻭﻯﻳﺽﻌﻎﻍﻡﹽّﻥﻩﻬﻰﻲﻐﻕﻵﻶﻝﻙﻱ■�"
  },
  "ibm864": "cp864",
  "csibm864": "cp864",
  "cp865": {
    "type": "_sbcs",
    "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø₧ƒáíóúñÑªº¿⌐¬½¼¡«¤░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
  },
  "ibm865": "cp865",
  "csibm865": "cp865",
  "cp866": {
    "type": "_sbcs",
    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№¤■ "
  },
  "ibm866": "cp866",
  "csibm866": "cp866",
  "cp869": {
    "type": "_sbcs",
    "chars": "������Ά�·¬¦‘’Έ―ΉΊΪΌ��ΎΫ©Ώ²³ά£έήίϊΐόύΑΒΓΔΕΖΗ½ΘΙ«»░▒▓│┤ΚΛΜΝ╣║╗╝ΞΟ┐└┴┬├─┼ΠΡ╚╔╩╦╠═╬ΣΤΥΦΧΨΩαβγ┘┌█▄δε▀ζηθικλμνξοπρσςτ΄­±υφχ§ψ΅°¨ωϋΰώ■ "
  },
  "ibm869": "cp869",
  "csibm869": "cp869",
  "cp922": {
    "type": "_sbcs",
    "chars": " ¡¢£¤¥¦§¨©ª«¬­®‾°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŠÑÒÓÔÕÖ×ØÙÚÛÜÝŽßàáâãäåæçèéêëìíîïšñòóôõö÷øùúûüýžÿ"
  },
  "ibm922": "cp922",
  "csibm922": "cp922",
  "cp1046": {
    "type": "_sbcs",
    "chars": "ﺈ×÷ﹱ■│─┐┌└┘ﹹﹻﹽﹿﹷﺊﻰﻳﻲﻎﻏﻐﻶﻸﻺﻼ ¤ﺋﺑﺗﺛﺟﺣ،­ﺧﺳ٠١٢٣٤٥٦٧٨٩ﺷ؛ﺻﺿﻊ؟ﻋءآأؤإئابةتثجحخدذرزسشصضطﻇعغﻌﺂﺄﺎﻓـفقكلمنهوىيًٌٍَُِّْﻗﻛﻟﻵﻷﻹﻻﻣﻧﻬﻩ�"
  },
  "ibm1046": "cp1046",
  "csibm1046": "cp1046",
  "cp1124": {
    "type": "_sbcs",
    "chars": " ЁЂҐЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђґєѕіїјљњћќ§ўџ"
  },
  "ibm1124": "cp1124",
  "csibm1124": "cp1124",
  "cp1125": {
    "type": "_sbcs",
    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёҐґЄєІіЇї·√№¤■ "
  },
  "ibm1125": "cp1125",
  "csibm1125": "cp1125",
  "cp1129": {
    "type": "_sbcs",
    "chars": " ¡¢£¤¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
  },
  "ibm1129": "cp1129",
  "csibm1129": "cp1129",
  "cp1133": {
    "type": "_sbcs",
    "chars": " ກຂຄງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮ���ຯະາຳິີຶືຸູຼັົຽ���ເແໂໃໄ່້໊໋໌ໍໆ�ໜໝ₭����������������໐໑໒໓໔໕໖໗໘໙��¢¬¦�"
  },
  "ibm1133": "cp1133",
  "csibm1133": "cp1133",
  "cp1161": {
    "type": "_sbcs",
    "chars": "��������������������������������่กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู้๊๋€฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛¢¬¦ "
  },
  "ibm1161": "cp1161",
  "csibm1161": "cp1161",
  "cp1162": {
    "type": "_sbcs",
    "chars": "€…‘’“”•–— กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
  },
  "ibm1162": "cp1162",
  "csibm1162": "cp1162",
  "cp1163": {
    "type": "_sbcs",
    "chars": " ¡¢£€¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
  },
  "ibm1163": "cp1163",
  "csibm1163": "cp1163",
  "maccroatian": {
    "type": "_sbcs",
    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊�©⁄¤‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ"
  },
  "maccyrillic": {
    "type": "_sbcs",
    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°¢£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµ∂ЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
  },
  "macgreek": {
    "type": "_sbcs",
    "chars": "Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦­ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ�"
  },
  "maciceland": {
    "type": "_sbcs",
    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
  },
  "macroman": {
    "type": "_sbcs",
    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
  },
  "macromania": {
    "type": "_sbcs",
    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂŞ∞±≤≥¥µ∂∑∏π∫ªºΩăş¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›Ţţ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
  },
  "macthai": {
    "type": "_sbcs",
    "chars": "«»…“”�•‘’� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู﻿​–—฿เแโใไๅๆ็่้๊๋์ํ™๏๐๑๒๓๔๕๖๗๘๙®©����"
  },
  "macturkish": {
    "type": "_sbcs",
    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙ�ˆ˜¯˘˙˚¸˝˛ˇ"
  },
  "macukraine": {
    "type": "_sbcs",
    "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
  },
  "koi8r": {
    "type": "_sbcs",
    "chars": "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ё╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡Ё╢╣╤╥╦╧╨╩╪╫╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
  },
  "koi8u": {
    "type": "_sbcs",
    "chars": "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґ╝╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪Ґ╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
  },
  "koi8ru": {
    "type": "_sbcs",
    "chars": "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґў╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪ҐЎ©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
  },
  "koi8t": {
    "type": "_sbcs",
    "chars": "қғ‚Ғ„…†‡�‰ҳ‹ҲҷҶ�Қ‘’“”•–—�™�›�����ӯӮё¤ӣ¦§���«¬­®�°±²Ё�Ӣ¶·�№�»���©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
  },
  "armscii8": {
    "type": "_sbcs",
    "chars": " �և։)(»«—.՝,-֊…՜՛՞ԱաԲբԳգԴդԵեԶզԷէԸըԹթԺժԻիԼլԽխԾծԿկՀհՁձՂղՃճՄմՅյՆնՇշՈոՉչՊպՋջՌռՍսՎվՏտՐրՑցՒւՓփՔքՕօՖֆ՚�"
  },
  "rk1048": {
    "type": "_sbcs",
    "chars": "ЂЃ‚ѓ„…†‡€‰Љ‹ЊҚҺЏђ‘’“”•–—�™љ›њқһџ ҰұӘ¤Ө¦§Ё©Ғ«¬­®Ү°±Ііөµ¶·ё№ғ»әҢңүАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
  },
  "tcvn": {
    "type": "_sbcs",
    "chars": "\u0000ÚỤ\u0003ỪỬỮ\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010ỨỰỲỶỸÝỴ\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÀẢÃÁẠẶẬÈẺẼÉẸỆÌỈĨÍỊÒỎÕÓỌỘỜỞỠỚỢÙỦŨ ĂÂÊÔƠƯĐăâêôơưđẶ̀̀̉̃́àảãáạẲằẳẵắẴẮẦẨẪẤỀặầẩẫấậèỂẻẽéẹềểễếệìỉỄẾỒĩíịòỔỏõóọồổỗốộờởỡớợùỖủũúụừửữứựỳỷỹýỵỐ"
  },
  "georgianacademy": {
    "type": "_sbcs",
    "chars": "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰჱჲჳჴჵჶçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
  },
  "georgianps": {
    "type": "_sbcs",
    "chars": "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზჱთიკლმნჲოპჟრსტჳუფქღყშჩცძწჭხჴჯჰჵæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
  },
  "pt154": {
    "type": "_sbcs",
    "chars": "ҖҒӮғ„…ҶҮҲүҠӢҢҚҺҸҗ‘’“”•–—ҳҷҡӣңқһҹ ЎўЈӨҘҰ§Ё©Ә«¬ӯ®Ҝ°ұІіҙө¶·ё№ә»јҪҫҝАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
  },
  "viscii": {
    "type": "_sbcs",
    "chars": "\u0000\u0001Ẳ\u0003\u0004ẴẪ\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013Ỷ\u0015\u0016\u0017\u0018Ỹ\u001a\u001b\u001c\u001dỴ\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ẠẮẰẶẤẦẨẬẼẸẾỀỂỄỆỐỒỔỖỘỢỚỜỞỊỎỌỈỦŨỤỲÕắằặấầẩậẽẹếềểễệốồổỗỠƠộờởịỰỨỪỬơớƯÀÁÂÃẢĂẳẵÈÉÊẺÌÍĨỳĐứÒÓÔạỷừửÙÚỹỵÝỡưàáâãảăữẫèéêẻìíĩỉđựòóôõỏọụùúũủýợỮ"
  },
  "iso646cn": {
    "type": "_sbcs",
    "chars": "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#¥%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������"
  },
  "iso646jp": {
    "type": "_sbcs",
    "chars": "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[¥]^_`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������"
  },
  "hproman8": {
    "type": "_sbcs",
    "chars": " ÀÂÈÊËÎÏ´ˋˆ¨˜ÙÛ₤¯Ýý°ÇçÑñ¡¿¤£¥§ƒ¢âêôûáéóúàèòùäëöüÅîØÆåíøæÄìÖÜÉïßÔÁÃãÐðÍÌÓÒÕõŠšÚŸÿÞþ·µ¶¾—¼½ªº«■»±�"
  },
  "macintosh": {
    "type": "_sbcs",
    "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
  },
  "ascii": {
    "type": "_sbcs",
    "chars": "��������������������������������������������������������������������������������������������������������������������������������"
  },
  "tis620": {
    "type": "_sbcs",
    "chars": "���������������������������������กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
  }
}

/***/ }),
/* 460 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Manually added data to be used by sbcs codec in addition to generated one.

module.exports = {
    // Not supported by iconv, not sure why.
    "10029": "maccenteuro",
    "maccenteuro": {
        "type": "_sbcs",
        "chars": "ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ"
    },

    "808": "cp808",
    "ibm808": "cp808",
    "cp808": {
        "type": "_sbcs",
        "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№€■ "
    },

    // Aliases of generated encodings.
    "ascii8bit": "ascii",
    "usascii": "ascii",
    "ansix34": "ascii",
    "ansix341968": "ascii",
    "ansix341986": "ascii",
    "csascii": "ascii",
    "cp367": "ascii",
    "ibm367": "ascii",
    "isoir6": "ascii",
    "iso646us": "ascii",
    "iso646irv": "ascii",
    "us": "ascii",

    "latin1": "iso88591",
    "latin2": "iso88592",
    "latin3": "iso88593",
    "latin4": "iso88594",
    "latin5": "iso88599",
    "latin6": "iso885910",
    "latin7": "iso885913",
    "latin8": "iso885914",
    "latin9": "iso885915",
    "latin10": "iso885916",

    "csisolatin1": "iso88591",
    "csisolatin2": "iso88592",
    "csisolatin3": "iso88593",
    "csisolatin4": "iso88594",
    "csisolatincyrillic": "iso88595",
    "csisolatinarabic": "iso88596",
    "csisolatingreek" : "iso88597",
    "csisolatinhebrew": "iso88598",
    "csisolatin5": "iso88599",
    "csisolatin6": "iso885910",

    "l1": "iso88591",
    "l2": "iso88592",
    "l3": "iso88593",
    "l4": "iso88594",
    "l5": "iso88599",
    "l6": "iso885910",
    "l7": "iso885913",
    "l8": "iso885914",
    "l9": "iso885915",
    "l10": "iso885916",

    "isoir14": "iso646jp",
    "isoir57": "iso646cn",
    "isoir100": "iso88591",
    "isoir101": "iso88592",
    "isoir109": "iso88593",
    "isoir110": "iso88594",
    "isoir144": "iso88595",
    "isoir127": "iso88596",
    "isoir126": "iso88597",
    "isoir138": "iso88598",
    "isoir148": "iso88599",
    "isoir157": "iso885910",
    "isoir166": "tis620",
    "isoir179": "iso885913",
    "isoir199": "iso885914",
    "isoir203": "iso885915",
    "isoir226": "iso885916",

    "cp819": "iso88591",
    "ibm819": "iso88591",
    "cp28591": "iso88591",
    "28591": "iso88591",

    "cyrillic": "iso88595",

    "arabic": "iso88596",
    "arabic8": "iso88596",
    "ecma114": "iso88596",
    "asmo708": "iso88596",

    "greek" : "iso88597",
    "greek8" : "iso88597",
    "ecma118" : "iso88597",
    "elot928" : "iso88597",

    "hebrew": "iso88598",
    "hebrew8": "iso88598",

    "turkish": "iso88599",
    "turkish8": "iso88599",

    "thai": "iso885911",
    "thai8": "iso885911",

    "celtic": "iso885914",
    "celtic8": "iso885914",
    "isoceltic": "iso885914",

    "tis6200": "tis620",
    "tis62025291": "tis620",
    "tis62025330": "tis620",

    "10000": "macroman",
    "10006": "macgreek",
    "10007": "maccyrillic",
    "10079": "maciceland",
    "10081": "macturkish",

    "cspc8codepage437": "cp437",
    "cspc775baltic": "cp775",
    "cspc850multilingual": "cp850",
    "cspcp852": "cp852",
    "cspc862latinhebrew": "cp862",
    "cpgr": "cp869",

    "msee": "cp1250",
    "mscyrl": "cp1251",
    "msansi": "cp1252",
    "msgreek": "cp1253",
    "msturk": "cp1254",
    "mshebr": "cp1255",
    "msarab": "cp1256",
    "winbaltrim": "cp1257",

    "cp20866": "koi8r",
    "20866": "koi8r",
    "ibm878": "koi8r",
    "cskoi8r": "koi8r",

    "cp21866": "koi8u",
    "21866": "koi8u",
    "ibm1168": "koi8u",

    "strk10482002": "rk1048",

    "tcvn5712": "tcvn",
    "tcvn57121": "tcvn",

    "gb198880": "iso646cn",
    "cn": "iso646cn",

    "csiso14jisc6220ro": "iso646jp",
    "jisc62201969ro": "iso646jp",
    "jp": "iso646jp",

    "cshproman8": "hproman8",
    "r8": "hproman8",
    "roman8": "hproman8",
    "xroman8": "hproman8",
    "ibm1051": "hproman8",

    "mac": "macintosh",
    "csmacintosh": "macintosh",
};



/***/ }),
/* 461 */
/***/ (function(module, exports) {

module.exports = [
	[
		"8740",
		"䏰䰲䘃䖦䕸𧉧䵷䖳𧲱䳢𧳅㮕䜶䝄䱇䱀𤊿𣘗𧍒𦺋𧃒䱗𪍑䝏䗚䲅𧱬䴇䪤䚡𦬣爥𥩔𡩣𣸆𣽡晍囻"
	],
	[
		"8767",
		"綕夝𨮹㷴霴𧯯寛𡵞媤㘥𩺰嫑宷峼杮薓𩥅瑡璝㡵𡵓𣚞𦀡㻬"
	],
	[
		"87a1",
		"𥣞㫵竼龗𤅡𨤍𣇪𠪊𣉞䌊蒄龖鐯䤰蘓墖靊鈘秐稲晠権袝瑌篅枂稬剏遆㓦珄𥶹瓆鿇垳䤯呌䄱𣚎堘穲𧭥讏䚮𦺈䆁𥶙箮𢒼鿈𢓁𢓉𢓌鿉蔄𣖻䂴鿊䓡𪷿拁灮鿋"
	],
	[
		"8840",
		"㇀",
		4,
		"𠄌㇅𠃑𠃍㇆㇇𠃋𡿨㇈𠃊㇉㇊㇋㇌𠄎㇍㇎ĀÁǍÀĒÉĚÈŌÓǑÒ࿿Ê̄Ế࿿Ê̌ỀÊāáǎàɑēéěèīíǐìōóǒòūúǔùǖǘǚ"
	],
	[
		"88a1",
		"ǜü࿿ê̄ế࿿ê̌ềêɡ⏚⏛"
	],
	[
		"8940",
		"𪎩𡅅"
	],
	[
		"8943",
		"攊"
	],
	[
		"8946",
		"丽滝鵎釟"
	],
	[
		"894c",
		"𧜵撑会伨侨兖兴农凤务动医华发变团声处备夲头学实実岚庆总斉柾栄桥济炼电纤纬纺织经统缆缷艺苏药视设询车轧轮"
	],
	[
		"89a1",
		"琑糼緍楆竉刧"
	],
	[
		"89ab",
		"醌碸酞肼"
	],
	[
		"89b0",
		"贋胶𠧧"
	],
	[
		"89b5",
		"肟黇䳍鷉鸌䰾𩷶𧀎鸊𪄳㗁"
	],
	[
		"89c1",
		"溚舾甙"
	],
	[
		"89c5",
		"䤑马骏龙禇𨑬𡷊𠗐𢫦两亁亀亇亿仫伷㑌侽㹈倃傈㑽㒓㒥円夅凛凼刅争剹劐匧㗇厩㕑厰㕓参吣㕭㕲㚁咓咣咴咹哐哯唘唣唨㖘唿㖥㖿嗗㗅"
	],
	[
		"8a40",
		"𧶄唥"
	],
	[
		"8a43",
		"𠱂𠴕𥄫喐𢳆㧬𠍁蹆𤶸𩓥䁓𨂾睺𢰸㨴䟕𨅝𦧲𤷪擝𠵼𠾴𠳕𡃴撍蹾𠺖𠰋𠽤𢲩𨉖𤓓"
	],
	[
		"8a64",
		"𠵆𩩍𨃩䟴𤺧𢳂骲㩧𩗴㿭㔆𥋇𩟔𧣈𢵄鵮頕"
	],
	[
		"8a76",
		"䏙𦂥撴哣𢵌𢯊𡁷㧻𡁯"
	],
	[
		"8aa1",
		"𦛚𦜖𧦠擪𥁒𠱃蹨𢆡𨭌𠜱"
	],
	[
		"8aac",
		"䠋𠆩㿺塳𢶍"
	],
	[
		"8ab2",
		"𤗈𠓼𦂗𠽌𠶖啹䂻䎺"
	],
	[
		"8abb",
		"䪴𢩦𡂝膪飵𠶜捹㧾𢝵跀嚡摼㹃"
	],
	[
		"8ac9",
		"𪘁𠸉𢫏𢳉"
	],
	[
		"8ace",
		"𡃈𣧂㦒㨆𨊛㕸𥹉𢃇噒𠼱𢲲𩜠㒼氽𤸻"
	],
	[
		"8adf",
		"𧕴𢺋𢈈𪙛𨳍𠹺𠰴𦠜羓𡃏𢠃𢤹㗻𥇣𠺌𠾍𠺪㾓𠼰𠵇𡅏𠹌"
	],
	[
		"8af6",
		"𠺫𠮩𠵈𡃀𡄽㿹𢚖搲𠾭"
	],
	[
		"8b40",
		"𣏴𧘹𢯎𠵾𠵿𢱑𢱕㨘𠺘𡃇𠼮𪘲𦭐𨳒𨶙𨳊閪哌苄喹"
	],
	[
		"8b55",
		"𩻃鰦骶𧝞𢷮煀腭胬尜𦕲脴㞗卟𨂽醶𠻺𠸏𠹷𠻻㗝𤷫㘉𠳖嚯𢞵𡃉𠸐𠹸𡁸𡅈𨈇𡑕𠹹𤹐𢶤婔𡀝𡀞𡃵𡃶垜𠸑"
	],
	[
		"8ba1",
		"𧚔𨋍𠾵𠹻𥅾㜃𠾶𡆀𥋘𪊽𤧚𡠺𤅷𨉼墙剨㘚𥜽箲孨䠀䬬鼧䧧鰟鮍𥭴𣄽嗻㗲嚉丨夂𡯁屮靑𠂆乛亻㔾尣彑忄㣺扌攵歺氵氺灬爫丬犭𤣩罒礻糹罓𦉪㓁"
	],
	[
		"8bde",
		"𦍋耂肀𦘒𦥑卝衤见𧢲讠贝钅镸长门𨸏韦页风飞饣𩠐鱼鸟黄歯龜丷𠂇阝户钢"
	],
	[
		"8c40",
		"倻淾𩱳龦㷉袏𤅎灷峵䬠𥇍㕙𥴰愢𨨲辧釶熑朙玺𣊁𪄇㲋𡦀䬐磤琂冮𨜏䀉橣𪊺䈣蘏𠩯稪𩥇𨫪靕灍匤𢁾鏴盙𨧣龧矝亣俰傼丯众龨吴綋墒壐𡶶庒庙忂𢜒斋"
	],
	[
		"8ca1",
		"𣏹椙橃𣱣泿"
	],
	[
		"8ca7",
		"爀𤔅玌㻛𤨓嬕璹讃𥲤𥚕窓篬糃繬苸薗龩袐龪躹龫迏蕟駠鈡龬𨶹𡐿䁱䊢娚"
	],
	[
		"8cc9",
		"顨杫䉶圽"
	],
	[
		"8cce",
		"藖𤥻芿𧄍䲁𦵴嵻𦬕𦾾龭龮宖龯曧繛湗秊㶈䓃𣉖𢞖䎚䔶"
	],
	[
		"8ce6",
		"峕𣬚諹屸㴒𣕑嵸龲煗䕘𤃬𡸣䱷㥸㑊𠆤𦱁諌侴𠈹妿腬顖𩣺弻"
	],
	[
		"8d40",
		"𠮟"
	],
	[
		"8d42",
		"𢇁𨥭䄂䚻𩁹㼇龳𪆵䃸㟖䛷𦱆䅼𨚲𧏿䕭㣔𥒚䕡䔛䶉䱻䵶䗪㿈𤬏㙡䓞䒽䇭崾嵈嵖㷼㠏嶤嶹㠠㠸幂庽弥徃㤈㤔㤿㥍惗愽峥㦉憷憹懏㦸戬抐拥挘㧸嚱"
	],
	[
		"8da1",
		"㨃揢揻搇摚㩋擀崕嘡龟㪗斆㪽旿晓㫲暒㬢朖㭂枤栀㭘桊梄㭲㭱㭻椉楃牜楤榟榅㮼槖㯝橥橴橱檂㯬檙㯲檫檵櫔櫶殁毁毪汵沪㳋洂洆洦涁㳯涤涱渕渘温溆𨧀溻滢滚齿滨滩漤漴㵆𣽁澁澾㵪㵵熷岙㶊瀬㶑灐灔灯灿炉𠌥䏁㗱𠻘"
	],
	[
		"8e40",
		"𣻗垾𦻓焾𥟠㙎榢𨯩孴穉𥣡𩓙穥穽𥦬窻窰竂竃燑𦒍䇊竚竝竪䇯咲𥰁笋筕笩𥌎𥳾箢筯莜𥮴𦱿篐萡箒箸𥴠㶭𥱥蒒篺簆簵𥳁籄粃𤢂粦晽𤕸糉糇糦籴糳糵糎"
	],
	[
		"8ea1",
		"繧䔝𦹄絝𦻖璍綉綫焵綳緒𤁗𦀩緤㴓緵𡟹緥𨍭縝𦄡𦅚繮纒䌫鑬縧罀罁罇礶𦋐駡羗𦍑羣𡙡𠁨䕜𣝦䔃𨌺翺𦒉者耈耝耨耯𪂇𦳃耻耼聡𢜔䦉𦘦𣷣𦛨朥肧𨩈脇脚墰𢛶汿𦒘𤾸擧𡒊舘𡡞橓𤩥𤪕䑺舩𠬍𦩒𣵾俹𡓽蓢荢𦬊𤦧𣔰𡝳𣷸芪椛芳䇛"
	],
	[
		"8f40",
		"蕋苐茚𠸖𡞴㛁𣅽𣕚艻苢茘𣺋𦶣𦬅𦮗𣗎㶿茝嗬莅䔋𦶥莬菁菓㑾𦻔橗蕚㒖𦹂𢻯葘𥯤葱㷓䓤檧葊𣲵祘蒨𦮖𦹷𦹃蓞萏莑䒠蒓蓤𥲑䉀𥳀䕃蔴嫲𦺙䔧蕳䔖枿蘖"
	],
	[
		"8fa1",
		"𨘥𨘻藁𧂈蘂𡖂𧃍䕫䕪蘨㙈𡢢号𧎚虾蝱𪃸蟮𢰧螱蟚蠏噡虬桖䘏衅衆𧗠𣶹𧗤衞袜䙛袴袵揁装睷𧜏覇覊覦覩覧覼𨨥觧𧤤𧪽誜瞓釾誐𧩙竩𧬺𣾏䜓𧬸煼謌謟𥐰𥕥謿譌譍誩𤩺讐讛誯𡛟䘕衏貛𧵔𧶏貫㜥𧵓賖𧶘𧶽贒贃𡤐賛灜贑𤳉㻐起"
	],
	[
		"9040",
		"趩𨀂𡀔𤦊㭼𨆼𧄌竧躭躶軃鋔輙輭𨍥𨐒辥錃𪊟𠩐辳䤪𨧞𨔽𣶻廸𣉢迹𪀔𨚼𨔁𢌥㦀𦻗逷𨔼𧪾遡𨕬𨘋邨𨜓郄𨛦邮都酧㫰醩釄粬𨤳𡺉鈎沟鉁鉢𥖹銹𨫆𣲛𨬌𥗛"
	],
	[
		"90a1",
		"𠴱錬鍫𨫡𨯫炏嫃𨫢𨫥䥥鉄𨯬𨰹𨯿鍳鑛躼閅閦鐦閠濶䊹𢙺𨛘𡉼𣸮䧟氜陻隖䅬隣𦻕懚隶磵𨫠隽双䦡𦲸𠉴𦐐𩂯𩃥𤫑𡤕𣌊霱虂霶䨏䔽䖅𤫩灵孁霛靜𩇕靗孊𩇫靟鐥僐𣂷𣂼鞉鞟鞱鞾韀韒韠𥑬韮琜𩐳響韵𩐝𧥺䫑頴頳顋顦㬎𧅵㵑𠘰𤅜"
	],
	[
		"9140",
		"𥜆飊颷飈飇䫿𦴧𡛓喰飡飦飬鍸餹𤨩䭲𩡗𩤅駵騌騻騐驘𥜥㛄𩂱𩯕髠髢𩬅髴䰎鬔鬭𨘀倴鬴𦦨㣃𣁽魐魀𩴾婅𡡣鮎𤉋鰂鯿鰌𩹨鷔𩾷𪆒𪆫𪃡𪄣𪇟鵾鶃𪄴鸎梈"
	],
	[
		"91a1",
		"鷄𢅛𪆓𪈠𡤻𪈳鴹𪂹𪊴麐麕麞麢䴴麪麯𤍤黁㭠㧥㴝伲㞾𨰫鼂鼈䮖鐤𦶢鼗鼖鼹嚟嚊齅馸𩂋韲葿齢齩竜龎爖䮾𤥵𤦻煷𤧸𤍈𤩑玞𨯚𡣺禟𨥾𨸶鍩鏳𨩄鋬鎁鏋𨥬𤒹爗㻫睲穃烐𤑳𤏸煾𡟯炣𡢾𣖙㻇𡢅𥐯𡟸㜢𡛻𡠹㛡𡝴𡣑𥽋㜣𡛀坛𤨥𡏾𡊨"
	],
	[
		"9240",
		"𡏆𡒶蔃𣚦蔃葕𤦔𧅥𣸱𥕜𣻻𧁒䓴𣛮𩦝𦼦柹㜳㰕㷧塬𡤢栐䁗𣜿𤃡𤂋𤄏𦰡哋嚞𦚱嚒𠿟𠮨𠸍鏆𨬓鎜仸儫㠙𤐶亼𠑥𠍿佋侊𥙑婨𠆫𠏋㦙𠌊𠐔㐵伩𠋀𨺳𠉵諚𠈌亘"
	],
	[
		"92a1",
		"働儍侢伃𤨎𣺊佂倮偬傁俌俥偘僼兙兛兝兞湶𣖕𣸹𣺿浲𡢄𣺉冨凃𠗠䓝𠒣𠒒𠒑赺𨪜𠜎剙劤𠡳勡鍮䙺熌𤎌𠰠𤦬𡃤槑𠸝瑹㻞璙琔瑖玘䮎𤪼𤂍叐㖄爏𤃉喴𠍅响𠯆圝鉝雴鍦埝垍坿㘾壋媙𨩆𡛺𡝯𡜐娬妸銏婾嫏娒𥥆𡧳𡡡𤊕㛵洅瑃娡𥺃"
	],
	[
		"9340",
		"媁𨯗𠐓鏠璌𡌃焅䥲鐈𨧻鎽㞠尞岞幞幈𡦖𡥼𣫮廍孏𡤃𡤄㜁𡢠㛝𡛾㛓脪𨩇𡶺𣑲𨦨弌弎𡤧𡞫婫𡜻孄蘔𧗽衠恾𢡠𢘫忛㺸𢖯𢖾𩂈𦽳懀𠀾𠁆𢘛憙憘恵𢲛𢴇𤛔𩅍"
	],
	[
		"93a1",
		"摱𤙥𢭪㨩𢬢𣑐𩣪𢹸挷𪑛撶挱揑𤧣𢵧护𢲡搻敫楲㯴𣂎𣊭𤦉𣊫唍𣋠𡣙𩐿曎𣊉𣆳㫠䆐𥖄𨬢𥖏𡛼𥕛𥐥磮𣄃𡠪𣈴㑤𣈏𣆂𤋉暎𦴤晫䮓昰𧡰𡷫晣𣋒𣋡昞𥡲㣑𣠺𣞼㮙𣞢𣏾瓐㮖枏𤘪梶栞㯄檾㡣𣟕𤒇樳橒櫉欅𡤒攑梘橌㯗橺歗𣿀𣲚鎠鋲𨯪𨫋"
	],
	[
		"9440",
		"銉𨀞𨧜鑧涥漋𤧬浧𣽿㶏渄𤀼娽渊塇洤硂焻𤌚𤉶烱牐犇犔𤞏𤜥兹𤪤𠗫瑺𣻸𣙟𤩊𤤗𥿡㼆㺱𤫟𨰣𣼵悧㻳瓌琼鎇琷䒟𦷪䕑疃㽣𤳙𤴆㽘畕癳𪗆㬙瑨𨫌𤦫𤦎㫻"
	],
	[
		"94a1",
		"㷍𤩎㻿𤧅𤣳釺圲鍂𨫣𡡤僟𥈡𥇧睸𣈲眎眏睻𤚗𣞁㩞𤣰琸璛㺿𤪺𤫇䃈𤪖𦆮錇𥖁砞碍碈磒珐祙𧝁𥛣䄎禛蒖禥樭𣻺稺秴䅮𡛦䄲鈵秱𠵌𤦌𠊙𣶺𡝮㖗啫㕰㚪𠇔𠰍竢婙𢛵𥪯𥪜娍𠉛磰娪𥯆竾䇹籝籭䈑𥮳𥺼𥺦糍𤧹𡞰粎籼粮檲緜縇緓罎𦉡"
	],
	[
		"9540",
		"𦅜𧭈綗𥺂䉪𦭵𠤖柖𠁎𣗏埄𦐒𦏸𤥢翝笧𠠬𥫩𥵃笌𥸎駦虅驣樜𣐿㧢𤧷𦖭騟𦖠蒀𧄧𦳑䓪脷䐂胆脉腂𦞴飃𦩂艢艥𦩑葓𦶧蘐𧈛媆䅿𡡀嬫𡢡嫤𡣘蚠蜨𣶏蠭𧐢娂"
	],
	[
		"95a1",
		"衮佅袇袿裦襥襍𥚃襔𧞅𧞄𨯵𨯙𨮜𨧹㺭蒣䛵䛏㟲訽訜𩑈彍鈫𤊄旔焩烄𡡅鵭貟賩𧷜妚矃姰䍮㛔踪躧𤰉輰轊䋴汘澻𢌡䢛潹溋𡟚鯩㚵𤤯邻邗啱䤆醻鐄𨩋䁢𨫼鐧𨰝𨰻蓥訫閙閧閗閖𨴴瑅㻂𤣿𤩂𤏪㻧𣈥随𨻧𨹦𨹥㻌𤧭𤩸𣿮琒瑫㻼靁𩂰"
	],
	[
		"9640",
		"桇䨝𩂓𥟟靝鍨𨦉𨰦𨬯𦎾銺嬑譩䤼珹𤈛鞛靱餸𠼦巁𨯅𤪲頟𩓚鋶𩗗釥䓀𨭐𤩧𨭤飜𨩅㼀鈪䤥萔餻饍𧬆㷽馛䭯馪驜𨭥𥣈檏騡嫾騯𩣱䮐𩥈馼䮽䮗鍽塲𡌂堢𤦸"
	],
	[
		"96a1",
		"𡓨硄𢜟𣶸棅㵽鑘㤧慐𢞁𢥫愇鱏鱓鱻鰵鰐魿鯏𩸭鮟𪇵𪃾鴡䲮𤄄鸘䲰鴌𪆴𪃭𪃳𩤯鶥蒽𦸒𦿟𦮂藼䔳𦶤𦺄𦷰萠藮𦸀𣟗𦁤秢𣖜𣙀䤭𤧞㵢鏛銾鍈𠊿碹鉷鑍俤㑀遤𥕝砽硔碶硋𡝗𣇉𤥁㚚佲濚濙瀞瀞吔𤆵垻壳垊鴖埗焴㒯𤆬燫𦱀𤾗嬨𡞵𨩉"
	],
	[
		"9740",
		"愌嫎娋䊼𤒈㜬䭻𨧼鎻鎸𡣖𠼝葲𦳀𡐓𤋺𢰦𤏁妔𣶷𦝁綨𦅛𦂤𤦹𤦋𨧺鋥珢㻩璴𨭣𡢟㻡𤪳櫘珳珻㻖𤨾𤪔𡟙𤩦𠎧𡐤𤧥瑈𤤖炥𤥶銄珦鍟𠓾錱𨫎𨨖鎆𨯧𥗕䤵𨪂煫"
	],
	[
		"97a1",
		"𤥃𠳿嚤𠘚𠯫𠲸唂秄𡟺緾𡛂𤩐𡡒䔮鐁㜊𨫀𤦭妰𡢿𡢃𧒄媡㛢𣵛㚰鉟婹𨪁𡡢鍴㳍𠪴䪖㦊僴㵩㵌𡎜煵䋻𨈘渏𩃤䓫浗𧹏灧沯㳖𣿭𣸭渂漌㵯𠏵畑㚼㓈䚀㻚䡱姄鉮䤾轁𨰜𦯀堒埈㛖𡑒烾𤍢𤩱𢿣𡊰𢎽梹楧𡎘𣓥𧯴𣛟𨪃𣟖𣏺𤲟樚𣚭𦲷萾䓟䓎"
	],
	[
		"9840",
		"𦴦𦵑𦲂𦿞漗𧄉茽𡜺菭𦲀𧁓𡟛妉媂𡞳婡婱𡤅𤇼㜭姯𡜼㛇熎鎐暚𤊥婮娫𤊓樫𣻹𧜶𤑛𤋊焝𤉙𨧡侰𦴨峂𤓎𧹍𤎽樌𤉖𡌄炦焳𤏩㶥泟勇𤩏繥姫崯㷳彜𤩝𡟟綤萦"
	],
	[
		"98a1",
		"咅𣫺𣌀𠈔坾𠣕𠘙㿥𡾞𪊶瀃𩅛嵰玏糓𨩙𩐠俈翧狍猐𧫴猸猹𥛶獁獈㺩𧬘遬燵𤣲珡臶㻊県㻑沢国琙琞琟㻢㻰㻴㻺瓓㼎㽓畂畭畲疍㽼痈痜㿀癍㿗癴㿜発𤽜熈嘣覀塩䀝睃䀹条䁅㗛瞘䁪䁯属瞾矋売砘点砜䂨砹硇硑硦葈𥔵礳栃礲䄃"
	],
	[
		"9940",
		"䄉禑禙辻稆込䅧窑䆲窼艹䇄竏竛䇏両筢筬筻簒簛䉠䉺类粜䊌粸䊔糭输烀𠳏総緔緐緽羮羴犟䎗耠耥笹耮耱联㷌垴炠肷胩䏭脌猪脎脒畠脔䐁㬹腖腙腚"
	],
	[
		"99a1",
		"䐓堺腼膄䐥膓䐭膥埯臁臤艔䒏芦艶苊苘苿䒰荗险榊萅烵葤惣蒈䔄蒾蓡蓸蔐蔸蕒䔻蕯蕰藠䕷虲蚒蚲蛯际螋䘆䘗袮裿褤襇覑𧥧訩訸誔誴豑賔賲贜䞘塟跃䟭仮踺嗘坔蹱嗵躰䠷軎転軤軭軲辷迁迊迌逳駄䢭飠鈓䤞鈨鉘鉫銱銮銿"
	],
	[
		"9a40",
		"鋣鋫鋳鋴鋽鍃鎄鎭䥅䥑麿鐗匁鐝鐭鐾䥪鑔鑹锭関䦧间阳䧥枠䨤靀䨵鞲韂噔䫤惨颹䬙飱塄餎餙冴餜餷饂饝饢䭰駅䮝騼鬏窃魩鮁鯝鯱鯴䱭鰠㝯𡯂鵉鰺"
	],
	[
		"9aa1",
		"黾噐鶓鶽鷀鷼银辶鹻麬麱麽黆铜黢黱黸竈齄𠂔𠊷𠎠椚铃妬𠓗塀铁㞹𠗕𠘕𠙶𡚺块煳𠫂𠫍𠮿呪吆𠯋咞𠯻𠰻𠱓𠱥𠱼惧𠲍噺𠲵𠳝𠳭𠵯𠶲𠷈楕鰯螥𠸄𠸎𠻗𠾐𠼭𠹳尠𠾼帋𡁜𡁏𡁶朞𡁻𡂈𡂖㙇𡂿𡃓𡄯𡄻卤蒭𡋣𡍵𡌶讁𡕷𡘙𡟃𡟇乸炻𡠭𡥪"
	],
	[
		"9b40",
		"𡨭𡩅𡰪𡱰𡲬𡻈拃𡻕𡼕熘桕𢁅槩㛈𢉼𢏗𢏺𢜪𢡱𢥏苽𢥧𢦓𢫕覥𢫨辠𢬎鞸𢬿顇骽𢱌"
	],
	[
		"9b62",
		"𢲈𢲷𥯨𢴈𢴒𢶷𢶕𢹂𢽴𢿌𣀳𣁦𣌟𣏞徱晈暿𧩹𣕧𣗳爁𤦺矗𣘚𣜖纇𠍆墵朎"
	],
	[
		"9ba1",
		"椘𣪧𧙗𥿢𣸑𣺹𧗾𢂚䣐䪸𤄙𨪚𤋮𤌍𤀻𤌴𤎖𤩅𠗊凒𠘑妟𡺨㮾𣳿𤐄𤓖垈𤙴㦛𤜯𨗨𩧉㝢𢇃譞𨭎駖𤠒𤣻𤨕爉𤫀𠱸奥𤺥𤾆𠝹軚𥀬劏圿煱𥊙𥐙𣽊𤪧喼𥑆𥑮𦭒釔㑳𥔿𧘲𥕞䜘𥕢𥕦𥟇𤤿𥡝偦㓻𣏌惞𥤃䝼𨥈𥪮𥮉𥰆𡶐垡煑澶𦄂𧰒遖𦆲𤾚譢𦐂𦑊"
	],
	[
		"9c40",
		"嵛𦯷輶𦒄𡤜諪𤧶𦒈𣿯𦔒䯀𦖿𦚵𢜛鑥𥟡憕娧晉侻嚹𤔡𦛼乪𤤴陖涏𦲽㘘襷𦞙𦡮𦐑𦡞營𦣇筂𩃀𠨑𦤦鄄𦤹穅鷰𦧺騦𦨭㙟𦑩𠀡禃𦨴𦭛崬𣔙菏𦮝䛐𦲤画补𦶮墶"
	],
	[
		"9ca1",
		"㜜𢖍𧁋𧇍㱔𧊀𧊅銁𢅺𧊋錰𧋦𤧐氹钟𧑐𠻸蠧裵𢤦𨑳𡞱溸𤨪𡠠㦤㚹尐秣䔿暶𩲭𩢤襃𧟌𧡘囖䃟𡘊㦡𣜯𨃨𡏅熭荦𧧝𩆨婧䲷𧂯𨦫𧧽𧨊𧬋𧵦𤅺筃祾𨀉澵𪋟樃𨌘厢𦸇鎿栶靝𨅯𨀣𦦵𡏭𣈯𨁈嶅𨰰𨂃圕頣𨥉嶫𤦈斾槕叒𤪥𣾁㰑朶𨂐𨃴𨄮𡾡𨅏"
	],
	[
		"9d40",
		"𨆉𨆯𨈚𨌆𨌯𨎊㗊𨑨𨚪䣺揦𨥖砈鉕𨦸䏲𨧧䏟𨧨𨭆𨯔姸𨰉輋𨿅𩃬筑𩄐𩄼㷷𩅞𤫊运犏嚋𩓧𩗩𩖰𩖸𩜲𩣑𩥉𩥪𩧃𩨨𩬎𩵚𩶛纟𩻸𩼣䲤镇𪊓熢𪋿䶑递𪗋䶜𠲜达嗁"
	],
	[
		"9da1",
		"辺𢒰边𤪓䔉繿潖檱仪㓤𨬬𧢝㜺躀𡟵𨀤𨭬𨮙𧨾𦚯㷫𧙕𣲷𥘵𥥖亚𥺁𦉘嚿𠹭踎孭𣺈𤲞揞拐𡟶𡡻攰嘭𥱊吚𥌑㷆𩶘䱽嘢嘞罉𥻘奵𣵀蝰东𠿪𠵉𣚺脗鵞贘瘻鱅癎瞹鍅吲腈苷嘥脲萘肽嗪祢噃吖𠺝㗎嘅嗱曱𨋢㘭甴嗰喺咗啲𠱁𠲖廐𥅈𠹶𢱢"
	],
	[
		"9e40",
		"𠺢麫絚嗞𡁵抝靭咔賍燶酶揼掹揾啩𢭃鱲𢺳冚㓟𠶧冧呍唞唓癦踭𦢊疱肶蠄螆裇膶萜𡃁䓬猄𤜆宐茋𦢓噻𢛴𧴯𤆣𧵳𦻐𧊶酰𡇙鈈𣳼𪚩𠺬𠻹牦𡲢䝎𤿂𧿹𠿫䃺"
	],
	[
		"9ea1",
		"鱝攟𢶠䣳𤟠𩵼𠿬𠸊恢𧖣𠿭"
	],
	[
		"9ead",
		"𦁈𡆇熣纎鵐业丄㕷嬍沲卧㚬㧜卽㚥𤘘墚𤭮舭呋垪𥪕𠥹"
	],
	[
		"9ec5",
		"㩒𢑥獴𩺬䴉鯭𣳾𩼰䱛𤾩𩖞𩿞葜𣶶𧊲𦞳𣜠挮紥𣻷𣸬㨪逈勌㹴㙺䗩𠒎癀嫰𠺶硺𧼮墧䂿噼鮋嵴癔𪐴麅䳡痹㟻愙𣃚𤏲"
	],
	[
		"9ef5",
		"噝𡊩垧𤥣𩸆刴𧂮㖭汊鵼"
	],
	[
		"9f40",
		"籖鬹埞𡝬屓擓𩓐𦌵𧅤蚭𠴨𦴢𤫢𠵱"
	],
	[
		"9f4f",
		"凾𡼏嶎霃𡷑麁遌笟鬂峑箣扨挵髿篏鬪籾鬮籂粆鰕篼鬉鼗鰛𤤾齚啳寃俽麘俲剠㸆勑坧偖妷帒韈鶫轜呩鞴饀鞺匬愰"
	],
	[
		"9fa1",
		"椬叚鰊鴂䰻陁榀傦畆𡝭駚剳"
	],
	[
		"9fae",
		"酙隁酜"
	],
	[
		"9fb2",
		"酑𨺗捿𦴣櫊嘑醎畺抅𠏼獏籰𥰡𣳽"
	],
	[
		"9fc1",
		"𤤙盖鮝个𠳔莾衂"
	],
	[
		"9fc9",
		"届槀僭坺刟巵从氱𠇲伹咜哚劚趂㗾弌㗳"
	],
	[
		"9fdb",
		"歒酼龥鮗頮颴骺麨麄煺笔"
	],
	[
		"9fe7",
		"毺蠘罸"
	],
	[
		"9feb",
		"嘠𪙊蹷齓"
	],
	[
		"9ff0",
		"跔蹏鸜踁抂𨍽踨蹵竓𤩷稾磘泪詧瘇"
	],
	[
		"a040",
		"𨩚鼦泎蟖痃𪊲硓咢贌狢獱謭猂瓱賫𤪻蘯徺袠䒷"
	],
	[
		"a055",
		"𡠻𦸅"
	],
	[
		"a058",
		"詾𢔛"
	],
	[
		"a05b",
		"惽癧髗鵄鍮鮏蟵"
	],
	[
		"a063",
		"蠏賷猬霡鮰㗖犲䰇籑饊𦅙慙䰄麖慽"
	],
	[
		"a073",
		"坟慯抦戹拎㩜懢厪𣏵捤栂㗒"
	],
	[
		"a0a1",
		"嵗𨯂迚𨸹"
	],
	[
		"a0a6",
		"僙𡵆礆匲阸𠼻䁥"
	],
	[
		"a0ae",
		"矾"
	],
	[
		"a0b0",
		"糂𥼚糚稭聦聣絍甅瓲覔舚朌聢𧒆聛瓰脃眤覉𦟌畓𦻑螩蟎臈螌詉貭譃眫瓸蓚㘵榲趦"
	],
	[
		"a0d4",
		"覩瑨涹蟁𤀑瓧㷛煶悤憜㳑煢恷"
	],
	[
		"a0e2",
		"罱𨬭牐惩䭾删㰘𣳇𥻗𧙖𥔱𡥄𡋾𩤃𦷜𧂭峁𦆭𨨏𣙷𠃮𦡆𤼎䕢嬟𦍌齐麦𦉫"
	],
	[
		"a3c0",
		"␀",
		31,
		"␡"
	],
	[
		"c6a1",
		"①",
		9,
		"⑴",
		9,
		"ⅰ",
		9,
		"丶丿亅亠冂冖冫勹匸卩厶夊宀巛⼳广廴彐彡攴无疒癶辵隶¨ˆヽヾゝゞ〃仝々〆〇ー［］✽ぁ",
		23
	],
	[
		"c740",
		"す",
		58,
		"ァアィイ"
	],
	[
		"c7a1",
		"ゥ",
		81,
		"А",
		5,
		"ЁЖ",
		4
	],
	[
		"c840",
		"Л",
		26,
		"ёж",
		25,
		"⇧↸↹㇏𠃌乚𠂊刂䒑"
	],
	[
		"c8a1",
		"龰冈龱𧘇"
	],
	[
		"c8cd",
		"￢￤＇＂㈱№℡゛゜⺀⺄⺆⺇⺈⺊⺌⺍⺕⺜⺝⺥⺧⺪⺬⺮⺶⺼⺾⻆⻊⻌⻍⻏⻖⻗⻞⻣"
	],
	[
		"c8f5",
		"ʃɐɛɔɵœøŋʊɪ"
	],
	[
		"f9fe",
		"￭"
	],
	[
		"fa40",
		"𠕇鋛𠗟𣿅蕌䊵珯况㙉𤥂𨧤鍄𡧛苮𣳈砼杄拟𤤳𨦪𠊠𦮳𡌅侫𢓭倈𦴩𧪄𣘀𤪱𢔓倩𠍾徤𠎀𠍇滛𠐟偽儁㑺儎顬㝃萖𤦤𠒇兠𣎴兪𠯿𢃼𠋥𢔰𠖎𣈳𡦃宂蝽𠖳𣲙冲冸"
	],
	[
		"faa1",
		"鴴凉减凑㳜凓𤪦决凢卂凭菍椾𣜭彻刋刦刼劵剗劔効勅簕蕂勠蘍𦬓包𨫞啉滙𣾀𠥔𣿬匳卄𠯢泋𡜦栛珕恊㺪㣌𡛨燝䒢卭却𨚫卾卿𡖖𡘓矦厓𨪛厠厫厮玧𥝲㽙玜叁叅汉义埾叙㪫𠮏叠𣿫𢶣叶𠱷吓灹唫晗浛呭𦭓𠵴啝咏咤䞦𡜍𠻝㶴𠵍"
	],
	[
		"fb40",
		"𨦼𢚘啇䳭启琗喆喩嘅𡣗𤀺䕒𤐵暳𡂴嘷曍𣊊暤暭噍噏磱囱鞇叾圀囯园𨭦㘣𡉏坆𤆥汮炋坂㚱𦱾埦𡐖堃𡑔𤍣堦𤯵塜墪㕡壠壜𡈼壻寿坃𪅐𤉸鏓㖡够梦㛃湙"
	],
	[
		"fba1",
		"𡘾娤啓𡚒蔅姉𠵎𦲁𦴪𡟜姙𡟻𡞲𦶦浱𡠨𡛕姹𦹅媫婣㛦𤦩婷㜈媖瑥嫓𦾡𢕔㶅𡤑㜲𡚸広勐孶斈孼𧨎䀄䡝𠈄寕慠𡨴𥧌𠖥寳宝䴐尅𡭄尓珎尔𡲥𦬨屉䣝岅峩峯嶋𡷹𡸷崐崘嵆𡺤岺巗苼㠭𤤁𢁉𢅳芇㠶㯂帮檊幵幺𤒼𠳓厦亷廐厨𡝱帉廴𨒂"
	],
	[
		"fc40",
		"廹廻㢠廼栾鐛弍𠇁弢㫞䢮𡌺强𦢈𢏐彘𢑱彣鞽𦹮彲鍀𨨶徧嶶㵟𥉐𡽪𧃸𢙨釖𠊞𨨩怱暅𡡷㥣㷇㘹垐𢞴祱㹀悞悤悳𤦂𤦏𧩓璤僡媠慤萤慂慈𦻒憁凴𠙖憇宪𣾷"
	],
	[
		"fca1",
		"𢡟懓𨮝𩥝懐㤲𢦀𢣁怣慜攞掋𠄘担𡝰拕𢸍捬𤧟㨗搸揸𡎎𡟼撐澊𢸶頔𤂌𥜝擡擥鑻㩦携㩗敍漖𤨨𤨣斅敭敟𣁾斵𤥀䬷旑䃘𡠩无旣忟𣐀昘𣇷𣇸晄𣆤𣆥晋𠹵晧𥇦晳晴𡸽𣈱𨗴𣇈𥌓矅𢣷馤朂𤎜𤨡㬫槺𣟂杞杧杢𤇍𩃭柗䓩栢湐鈼栁𣏦𦶠桝"
	],
	[
		"fd40",
		"𣑯槡樋𨫟楳棃𣗍椁椀㴲㨁𣘼㮀枬楡𨩊䋼椶榘㮡𠏉荣傐槹𣙙𢄪橅𣜃檝㯳枱櫈𩆜㰍欝𠤣惞欵歴𢟍溵𣫛𠎵𡥘㝀吡𣭚毡𣻼毜氷𢒋𤣱𦭑汚舦汹𣶼䓅𣶽𤆤𤤌𤤀"
	],
	[
		"fda1",
		"𣳉㛥㳫𠴲鮃𣇹𢒑羏样𦴥𦶡𦷫涖浜湼漄𤥿𤂅𦹲蔳𦽴凇沜渝萮𨬡港𣸯瑓𣾂秌湏媑𣁋濸㜍澝𣸰滺𡒗𤀽䕕鏰潄潜㵎潴𩅰㴻澟𤅄濓𤂑𤅕𤀹𣿰𣾴𤄿凟𤅖𤅗𤅀𦇝灋灾炧炁烌烕烖烟䄄㷨熴熖𤉷焫煅媈煊煮岜𤍥煏鍢𤋁焬𤑚𤨧𤨢熺𨯨炽爎"
	],
	[
		"fe40",
		"鑂爕夑鑃爤鍁𥘅爮牀𤥴梽牕牗㹕𣁄栍漽犂猪猫𤠣𨠫䣭𨠄猨献珏玪𠰺𦨮珉瑉𤇢𡛧𤨤昣㛅𤦷𤦍𤧻珷琕椃𤨦琹𠗃㻗瑜𢢭瑠𨺲瑇珤瑶莹瑬㜰瑴鏱樬璂䥓𤪌"
	],
	[
		"fea1",
		"𤅟𤩹𨮏孆𨰃𡢞瓈𡦈甎瓩甞𨻙𡩋寗𨺬鎅畍畊畧畮𤾂㼄𤴓疎瑝疞疴瘂瘬癑癏癯癶𦏵皐臯㟸𦤑𦤎皡皥皷盌𦾟葢𥂝𥅽𡸜眞眦着撯𥈠睘𣊬瞯𨥤𨥨𡛁矴砉𡍶𤨒棊碯磇磓隥礮𥗠磗礴碱𧘌辸袄𨬫𦂃𢘜禆褀椂禀𥡗禝𧬹礼禩渪𧄦㺨秆𩄍秔"
	]
];

/***/ }),
/* 462 */
/***/ (function(module, exports) {

module.exports = [
	[
		"0",
		"\u0000",
		127
	],
	[
		"8141",
		"갂갃갅갆갋",
		4,
		"갘갞갟갡갢갣갥",
		6,
		"갮갲갳갴"
	],
	[
		"8161",
		"갵갶갷갺갻갽갾갿걁",
		9,
		"걌걎",
		5,
		"걕"
	],
	[
		"8181",
		"걖걗걙걚걛걝",
		18,
		"걲걳걵걶걹걻",
		4,
		"겂겇겈겍겎겏겑겒겓겕",
		6,
		"겞겢",
		5,
		"겫겭겮겱",
		6,
		"겺겾겿곀곂곃곅곆곇곉곊곋곍",
		7,
		"곖곘",
		7,
		"곢곣곥곦곩곫곭곮곲곴곷",
		4,
		"곾곿괁괂괃괅괇",
		4,
		"괎괐괒괓"
	],
	[
		"8241",
		"괔괕괖괗괙괚괛괝괞괟괡",
		7,
		"괪괫괮",
		5
	],
	[
		"8261",
		"괶괷괹괺괻괽",
		6,
		"굆굈굊",
		5,
		"굑굒굓굕굖굗"
	],
	[
		"8281",
		"굙",
		7,
		"굢굤",
		7,
		"굮굯굱굲굷굸굹굺굾궀궃",
		4,
		"궊궋궍궎궏궑",
		10,
		"궞",
		5,
		"궥",
		17,
		"궸",
		7,
		"귂귃귅귆귇귉",
		6,
		"귒귔",
		7,
		"귝귞귟귡귢귣귥",
		18
	],
	[
		"8341",
		"귺귻귽귾긂",
		5,
		"긊긌긎",
		5,
		"긕",
		7
	],
	[
		"8361",
		"긝",
		18,
		"긲긳긵긶긹긻긼"
	],
	[
		"8381",
		"긽긾긿깂깄깇깈깉깋깏깑깒깓깕깗",
		4,
		"깞깢깣깤깦깧깪깫깭깮깯깱",
		6,
		"깺깾",
		5,
		"꺆",
		5,
		"꺍",
		46,
		"꺿껁껂껃껅",
		6,
		"껎껒",
		5,
		"껚껛껝",
		8
	],
	[
		"8441",
		"껦껧껩껪껬껮",
		5,
		"껵껶껷껹껺껻껽",
		8
	],
	[
		"8461",
		"꼆꼉꼊꼋꼌꼎꼏꼑",
		18
	],
	[
		"8481",
		"꼤",
		7,
		"꼮꼯꼱꼳꼵",
		6,
		"꼾꽀꽄꽅꽆꽇꽊",
		5,
		"꽑",
		10,
		"꽞",
		5,
		"꽦",
		18,
		"꽺",
		5,
		"꾁꾂꾃꾅꾆꾇꾉",
		6,
		"꾒꾓꾔꾖",
		5,
		"꾝",
		26,
		"꾺꾻꾽꾾"
	],
	[
		"8541",
		"꾿꿁",
		5,
		"꿊꿌꿏",
		4,
		"꿕",
		6,
		"꿝",
		4
	],
	[
		"8561",
		"꿢",
		5,
		"꿪",
		5,
		"꿲꿳꿵꿶꿷꿹",
		6,
		"뀂뀃"
	],
	[
		"8581",
		"뀅",
		6,
		"뀍뀎뀏뀑뀒뀓뀕",
		6,
		"뀞",
		9,
		"뀩",
		26,
		"끆끇끉끋끍끏끐끑끒끖끘끚끛끜끞",
		29,
		"끾끿낁낂낃낅",
		6,
		"낎낐낒",
		5,
		"낛낝낞낣낤"
	],
	[
		"8641",
		"낥낦낧낪낰낲낶낷낹낺낻낽",
		6,
		"냆냊",
		5,
		"냒"
	],
	[
		"8661",
		"냓냕냖냗냙",
		6,
		"냡냢냣냤냦",
		10
	],
	[
		"8681",
		"냱",
		22,
		"넊넍넎넏넑넔넕넖넗넚넞",
		4,
		"넦넧넩넪넫넭",
		6,
		"넶넺",
		5,
		"녂녃녅녆녇녉",
		6,
		"녒녓녖녗녙녚녛녝녞녟녡",
		22,
		"녺녻녽녾녿놁놃",
		4,
		"놊놌놎놏놐놑놕놖놗놙놚놛놝"
	],
	[
		"8741",
		"놞",
		9,
		"놩",
		15
	],
	[
		"8761",
		"놹",
		18,
		"뇍뇎뇏뇑뇒뇓뇕"
	],
	[
		"8781",
		"뇖",
		5,
		"뇞뇠",
		7,
		"뇪뇫뇭뇮뇯뇱",
		7,
		"뇺뇼뇾",
		5,
		"눆눇눉눊눍",
		6,
		"눖눘눚",
		5,
		"눡",
		18,
		"눵",
		6,
		"눽",
		26,
		"뉙뉚뉛뉝뉞뉟뉡",
		6,
		"뉪",
		4
	],
	[
		"8841",
		"뉯",
		4,
		"뉶",
		5,
		"뉽",
		6,
		"늆늇늈늊",
		4
	],
	[
		"8861",
		"늏늒늓늕늖늗늛",
		4,
		"늢늤늧늨늩늫늭늮늯늱늲늳늵늶늷"
	],
	[
		"8881",
		"늸",
		15,
		"닊닋닍닎닏닑닓",
		4,
		"닚닜닞닟닠닡닣닧닩닪닰닱닲닶닼닽닾댂댃댅댆댇댉",
		6,
		"댒댖",
		5,
		"댝",
		54,
		"덗덙덚덝덠덡덢덣"
	],
	[
		"8941",
		"덦덨덪덬덭덯덲덳덵덶덷덹",
		6,
		"뎂뎆",
		5,
		"뎍"
	],
	[
		"8961",
		"뎎뎏뎑뎒뎓뎕",
		10,
		"뎢",
		5,
		"뎩뎪뎫뎭"
	],
	[
		"8981",
		"뎮",
		21,
		"돆돇돉돊돍돏돑돒돓돖돘돚돜돞돟돡돢돣돥돦돧돩",
		18,
		"돽",
		18,
		"됑",
		6,
		"됙됚됛됝됞됟됡",
		6,
		"됪됬",
		7,
		"됵",
		15
	],
	[
		"8a41",
		"둅",
		10,
		"둒둓둕둖둗둙",
		6,
		"둢둤둦"
	],
	[
		"8a61",
		"둧",
		4,
		"둭",
		18,
		"뒁뒂"
	],
	[
		"8a81",
		"뒃",
		4,
		"뒉",
		19,
		"뒞",
		5,
		"뒥뒦뒧뒩뒪뒫뒭",
		7,
		"뒶뒸뒺",
		5,
		"듁듂듃듅듆듇듉",
		6,
		"듑듒듓듔듖",
		5,
		"듞듟듡듢듥듧",
		4,
		"듮듰듲",
		5,
		"듹",
		26,
		"딖딗딙딚딝"
	],
	[
		"8b41",
		"딞",
		5,
		"딦딫",
		4,
		"딲딳딵딶딷딹",
		6,
		"땂땆"
	],
	[
		"8b61",
		"땇땈땉땊땎땏땑땒땓땕",
		6,
		"땞땢",
		8
	],
	[
		"8b81",
		"땫",
		52,
		"떢떣떥떦떧떩떬떭떮떯떲떶",
		4,
		"떾떿뗁뗂뗃뗅",
		6,
		"뗎뗒",
		5,
		"뗙",
		18,
		"뗭",
		18
	],
	[
		"8c41",
		"똀",
		15,
		"똒똓똕똖똗똙",
		4
	],
	[
		"8c61",
		"똞",
		6,
		"똦",
		5,
		"똭",
		6,
		"똵",
		5
	],
	[
		"8c81",
		"똻",
		12,
		"뙉",
		26,
		"뙥뙦뙧뙩",
		50,
		"뚞뚟뚡뚢뚣뚥",
		5,
		"뚭뚮뚯뚰뚲",
		16
	],
	[
		"8d41",
		"뛃",
		16,
		"뛕",
		8
	],
	[
		"8d61",
		"뛞",
		17,
		"뛱뛲뛳뛵뛶뛷뛹뛺"
	],
	[
		"8d81",
		"뛻",
		4,
		"뜂뜃뜄뜆",
		33,
		"뜪뜫뜭뜮뜱",
		6,
		"뜺뜼",
		7,
		"띅띆띇띉띊띋띍",
		6,
		"띖",
		9,
		"띡띢띣띥띦띧띩",
		6,
		"띲띴띶",
		5,
		"띾띿랁랂랃랅",
		6,
		"랎랓랔랕랚랛랝랞"
	],
	[
		"8e41",
		"랟랡",
		6,
		"랪랮",
		5,
		"랶랷랹",
		8
	],
	[
		"8e61",
		"럂",
		4,
		"럈럊",
		19
	],
	[
		"8e81",
		"럞",
		13,
		"럮럯럱럲럳럵",
		6,
		"럾렂",
		4,
		"렊렋렍렎렏렑",
		6,
		"렚렜렞",
		5,
		"렦렧렩렪렫렭",
		6,
		"렶렺",
		5,
		"롁롂롃롅",
		11,
		"롒롔",
		7,
		"롞롟롡롢롣롥",
		6,
		"롮롰롲",
		5,
		"롹롺롻롽",
		7
	],
	[
		"8f41",
		"뢅",
		7,
		"뢎",
		17
	],
	[
		"8f61",
		"뢠",
		7,
		"뢩",
		6,
		"뢱뢲뢳뢵뢶뢷뢹",
		4
	],
	[
		"8f81",
		"뢾뢿룂룄룆",
		5,
		"룍룎룏룑룒룓룕",
		7,
		"룞룠룢",
		5,
		"룪룫룭룮룯룱",
		6,
		"룺룼룾",
		5,
		"뤅",
		18,
		"뤙",
		6,
		"뤡",
		26,
		"뤾뤿륁륂륃륅",
		6,
		"륍륎륐륒",
		5
	],
	[
		"9041",
		"륚륛륝륞륟륡",
		6,
		"륪륬륮",
		5,
		"륶륷륹륺륻륽"
	],
	[
		"9061",
		"륾",
		5,
		"릆릈릋릌릏",
		15
	],
	[
		"9081",
		"릟",
		12,
		"릮릯릱릲릳릵",
		6,
		"릾맀맂",
		5,
		"맊맋맍맓",
		4,
		"맚맜맟맠맢맦맧맩맪맫맭",
		6,
		"맶맻",
		4,
		"먂",
		5,
		"먉",
		11,
		"먖",
		33,
		"먺먻먽먾먿멁멃멄멅멆"
	],
	[
		"9141",
		"멇멊멌멏멐멑멒멖멗멙멚멛멝",
		6,
		"멦멪",
		5
	],
	[
		"9161",
		"멲멳멵멶멷멹",
		9,
		"몆몈몉몊몋몍",
		5
	],
	[
		"9181",
		"몓",
		20,
		"몪몭몮몯몱몳",
		4,
		"몺몼몾",
		5,
		"뫅뫆뫇뫉",
		14,
		"뫚",
		33,
		"뫽뫾뫿묁묂묃묅",
		7,
		"묎묐묒",
		5,
		"묙묚묛묝묞묟묡",
		6
	],
	[
		"9241",
		"묨묪묬",
		7,
		"묷묹묺묿",
		4,
		"뭆뭈뭊뭋뭌뭎뭑뭒"
	],
	[
		"9261",
		"뭓뭕뭖뭗뭙",
		7,
		"뭢뭤",
		7,
		"뭭",
		4
	],
	[
		"9281",
		"뭲",
		21,
		"뮉뮊뮋뮍뮎뮏뮑",
		18,
		"뮥뮦뮧뮩뮪뮫뮭",
		6,
		"뮵뮶뮸",
		7,
		"믁믂믃믅믆믇믉",
		6,
		"믑믒믔",
		35,
		"믺믻믽믾밁"
	],
	[
		"9341",
		"밃",
		4,
		"밊밎밐밒밓밙밚밠밡밢밣밦밨밪밫밬밮밯밲밳밵"
	],
	[
		"9361",
		"밶밷밹",
		6,
		"뱂뱆뱇뱈뱊뱋뱎뱏뱑",
		8
	],
	[
		"9381",
		"뱚뱛뱜뱞",
		37,
		"벆벇벉벊벍벏",
		4,
		"벖벘벛",
		4,
		"벢벣벥벦벩",
		6,
		"벲벶",
		5,
		"벾벿볁볂볃볅",
		7,
		"볎볒볓볔볖볗볙볚볛볝",
		22,
		"볷볹볺볻볽"
	],
	[
		"9441",
		"볾",
		5,
		"봆봈봊",
		5,
		"봑봒봓봕",
		8
	],
	[
		"9461",
		"봞",
		5,
		"봥",
		6,
		"봭",
		12
	],
	[
		"9481",
		"봺",
		5,
		"뵁",
		6,
		"뵊뵋뵍뵎뵏뵑",
		6,
		"뵚",
		9,
		"뵥뵦뵧뵩",
		22,
		"붂붃붅붆붋",
		4,
		"붒붔붖붗붘붛붝",
		6,
		"붥",
		10,
		"붱",
		6,
		"붹",
		24
	],
	[
		"9541",
		"뷒뷓뷖뷗뷙뷚뷛뷝",
		11,
		"뷪",
		5,
		"뷱"
	],
	[
		"9561",
		"뷲뷳뷵뷶뷷뷹",
		6,
		"븁븂븄븆",
		5,
		"븎븏븑븒븓"
	],
	[
		"9581",
		"븕",
		6,
		"븞븠",
		35,
		"빆빇빉빊빋빍빏",
		4,
		"빖빘빜빝빞빟빢빣빥빦빧빩빫",
		4,
		"빲빶",
		4,
		"빾빿뺁뺂뺃뺅",
		6,
		"뺎뺒",
		5,
		"뺚",
		13,
		"뺩",
		14
	],
	[
		"9641",
		"뺸",
		23,
		"뻒뻓"
	],
	[
		"9661",
		"뻕뻖뻙",
		6,
		"뻡뻢뻦",
		5,
		"뻭",
		8
	],
	[
		"9681",
		"뻶",
		10,
		"뼂",
		5,
		"뼊",
		13,
		"뼚뼞",
		33,
		"뽂뽃뽅뽆뽇뽉",
		6,
		"뽒뽓뽔뽖",
		44
	],
	[
		"9741",
		"뾃",
		16,
		"뾕",
		8
	],
	[
		"9761",
		"뾞",
		17,
		"뾱",
		7
	],
	[
		"9781",
		"뾹",
		11,
		"뿆",
		5,
		"뿎뿏뿑뿒뿓뿕",
		6,
		"뿝뿞뿠뿢",
		89,
		"쀽쀾쀿"
	],
	[
		"9841",
		"쁀",
		16,
		"쁒",
		5,
		"쁙쁚쁛"
	],
	[
		"9861",
		"쁝쁞쁟쁡",
		6,
		"쁪",
		15
	],
	[
		"9881",
		"쁺",
		21,
		"삒삓삕삖삗삙",
		6,
		"삢삤삦",
		5,
		"삮삱삲삷",
		4,
		"삾샂샃샄샆샇샊샋샍샎샏샑",
		6,
		"샚샞",
		5,
		"샦샧샩샪샫샭",
		6,
		"샶샸샺",
		5,
		"섁섂섃섅섆섇섉",
		6,
		"섑섒섓섔섖",
		5,
		"섡섢섥섨섩섪섫섮"
	],
	[
		"9941",
		"섲섳섴섵섷섺섻섽섾섿셁",
		6,
		"셊셎",
		5,
		"셖셗"
	],
	[
		"9961",
		"셙셚셛셝",
		6,
		"셦셪",
		5,
		"셱셲셳셵셶셷셹셺셻"
	],
	[
		"9981",
		"셼",
		8,
		"솆",
		5,
		"솏솑솒솓솕솗",
		4,
		"솞솠솢솣솤솦솧솪솫솭솮솯솱",
		11,
		"솾",
		5,
		"쇅쇆쇇쇉쇊쇋쇍",
		6,
		"쇕쇖쇙",
		6,
		"쇡쇢쇣쇥쇦쇧쇩",
		6,
		"쇲쇴",
		7,
		"쇾쇿숁숂숃숅",
		6,
		"숎숐숒",
		5,
		"숚숛숝숞숡숢숣"
	],
	[
		"9a41",
		"숤숥숦숧숪숬숮숰숳숵",
		16
	],
	[
		"9a61",
		"쉆쉇쉉",
		6,
		"쉒쉓쉕쉖쉗쉙",
		6,
		"쉡쉢쉣쉤쉦"
	],
	[
		"9a81",
		"쉧",
		4,
		"쉮쉯쉱쉲쉳쉵",
		6,
		"쉾슀슂",
		5,
		"슊",
		5,
		"슑",
		6,
		"슙슚슜슞",
		5,
		"슦슧슩슪슫슮",
		5,
		"슶슸슺",
		33,
		"싞싟싡싢싥",
		5,
		"싮싰싲싳싴싵싷싺싽싾싿쌁",
		6,
		"쌊쌋쌎쌏"
	],
	[
		"9b41",
		"쌐쌑쌒쌖쌗쌙쌚쌛쌝",
		6,
		"쌦쌧쌪",
		8
	],
	[
		"9b61",
		"쌳",
		17,
		"썆",
		7
	],
	[
		"9b81",
		"썎",
		25,
		"썪썫썭썮썯썱썳",
		4,
		"썺썻썾",
		5,
		"쎅쎆쎇쎉쎊쎋쎍",
		50,
		"쏁",
		22,
		"쏚"
	],
	[
		"9c41",
		"쏛쏝쏞쏡쏣",
		4,
		"쏪쏫쏬쏮",
		5,
		"쏶쏷쏹",
		5
	],
	[
		"9c61",
		"쏿",
		8,
		"쐉",
		6,
		"쐑",
		9
	],
	[
		"9c81",
		"쐛",
		8,
		"쐥",
		6,
		"쐭쐮쐯쐱쐲쐳쐵",
		6,
		"쐾",
		9,
		"쑉",
		26,
		"쑦쑧쑩쑪쑫쑭",
		6,
		"쑶쑷쑸쑺",
		5,
		"쒁",
		18,
		"쒕",
		6,
		"쒝",
		12
	],
	[
		"9d41",
		"쒪",
		13,
		"쒹쒺쒻쒽",
		8
	],
	[
		"9d61",
		"쓆",
		25
	],
	[
		"9d81",
		"쓠",
		8,
		"쓪",
		5,
		"쓲쓳쓵쓶쓷쓹쓻쓼쓽쓾씂",
		9,
		"씍씎씏씑씒씓씕",
		6,
		"씝",
		10,
		"씪씫씭씮씯씱",
		6,
		"씺씼씾",
		5,
		"앆앇앋앏앐앑앒앖앚앛앜앟앢앣앥앦앧앩",
		6,
		"앲앶",
		5,
		"앾앿얁얂얃얅얆얈얉얊얋얎얐얒얓얔"
	],
	[
		"9e41",
		"얖얙얚얛얝얞얟얡",
		7,
		"얪",
		9,
		"얶"
	],
	[
		"9e61",
		"얷얺얿",
		4,
		"엋엍엏엒엓엕엖엗엙",
		6,
		"엢엤엦엧"
	],
	[
		"9e81",
		"엨엩엪엫엯엱엲엳엵엸엹엺엻옂옃옄옉옊옋옍옎옏옑",
		6,
		"옚옝",
		6,
		"옦옧옩옪옫옯옱옲옶옸옺옼옽옾옿왂왃왅왆왇왉",
		6,
		"왒왖",
		5,
		"왞왟왡",
		10,
		"왭왮왰왲",
		5,
		"왺왻왽왾왿욁",
		6,
		"욊욌욎",
		5,
		"욖욗욙욚욛욝",
		6,
		"욦"
	],
	[
		"9f41",
		"욨욪",
		5,
		"욲욳욵욶욷욻",
		4,
		"웂웄웆",
		5,
		"웎"
	],
	[
		"9f61",
		"웏웑웒웓웕",
		6,
		"웞웟웢",
		5,
		"웪웫웭웮웯웱웲"
	],
	[
		"9f81",
		"웳",
		4,
		"웺웻웼웾",
		5,
		"윆윇윉윊윋윍",
		6,
		"윖윘윚",
		5,
		"윢윣윥윦윧윩",
		6,
		"윲윴윶윸윹윺윻윾윿읁읂읃읅",
		4,
		"읋읎읐읙읚읛읝읞읟읡",
		6,
		"읩읪읬",
		7,
		"읶읷읹읺읻읿잀잁잂잆잋잌잍잏잒잓잕잙잛",
		4,
		"잢잧",
		4,
		"잮잯잱잲잳잵잶잷"
	],
	[
		"a041",
		"잸잹잺잻잾쟂",
		5,
		"쟊쟋쟍쟏쟑",
		6,
		"쟙쟚쟛쟜"
	],
	[
		"a061",
		"쟞",
		5,
		"쟥쟦쟧쟩쟪쟫쟭",
		13
	],
	[
		"a081",
		"쟻",
		4,
		"젂젃젅젆젇젉젋",
		4,
		"젒젔젗",
		4,
		"젞젟젡젢젣젥",
		6,
		"젮젰젲",
		5,
		"젹젺젻젽젾젿졁",
		6,
		"졊졋졎",
		5,
		"졕",
		26,
		"졲졳졵졶졷졹졻",
		4,
		"좂좄좈좉좊좎",
		5,
		"좕",
		7,
		"좞좠좢좣좤"
	],
	[
		"a141",
		"좥좦좧좩",
		18,
		"좾좿죀죁"
	],
	[
		"a161",
		"죂죃죅죆죇죉죊죋죍",
		6,
		"죖죘죚",
		5,
		"죢죣죥"
	],
	[
		"a181",
		"죦",
		14,
		"죶",
		5,
		"죾죿줁줂줃줇",
		4,
		"줎　、。·‥…¨〃­―∥＼∼‘’“”〔〕〈",
		9,
		"±×÷≠≤≥∞∴°′″℃Å￠￡￥♂♀∠⊥⌒∂∇≡≒§※☆★○●◎◇◆□■△▲▽▼→←↑↓↔〓≪≫√∽∝∵∫∬∈∋⊆⊇⊂⊃∪∩∧∨￢"
	],
	[
		"a241",
		"줐줒",
		5,
		"줙",
		18
	],
	[
		"a261",
		"줭",
		6,
		"줵",
		18
	],
	[
		"a281",
		"쥈",
		7,
		"쥒쥓쥕쥖쥗쥙",
		6,
		"쥢쥤",
		7,
		"쥭쥮쥯⇒⇔∀∃´～ˇ˘˝˚˙¸˛¡¿ː∮∑∏¤℉‰◁◀▷▶♤♠♡♥♧♣⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☎☜☞¶†‡↕↗↙↖↘♭♩♪♬㉿㈜№㏇™㏂㏘℡€®"
	],
	[
		"a341",
		"쥱쥲쥳쥵",
		6,
		"쥽",
		10,
		"즊즋즍즎즏"
	],
	[
		"a361",
		"즑",
		6,
		"즚즜즞",
		16
	],
	[
		"a381",
		"즯",
		16,
		"짂짃짅짆짉짋",
		4,
		"짒짔짗짘짛！",
		58,
		"￦］",
		32,
		"￣"
	],
	[
		"a441",
		"짞짟짡짣짥짦짨짩짪짫짮짲",
		5,
		"짺짻짽짾짿쨁쨂쨃쨄"
	],
	[
		"a461",
		"쨅쨆쨇쨊쨎",
		5,
		"쨕쨖쨗쨙",
		12
	],
	[
		"a481",
		"쨦쨧쨨쨪",
		28,
		"ㄱ",
		93
	],
	[
		"a541",
		"쩇",
		4,
		"쩎쩏쩑쩒쩓쩕",
		6,
		"쩞쩢",
		5,
		"쩩쩪"
	],
	[
		"a561",
		"쩫",
		17,
		"쩾",
		5,
		"쪅쪆"
	],
	[
		"a581",
		"쪇",
		16,
		"쪙",
		14,
		"ⅰ",
		9
	],
	[
		"a5b0",
		"Ⅰ",
		9
	],
	[
		"a5c1",
		"Α",
		16,
		"Σ",
		6
	],
	[
		"a5e1",
		"α",
		16,
		"σ",
		6
	],
	[
		"a641",
		"쪨",
		19,
		"쪾쪿쫁쫂쫃쫅"
	],
	[
		"a661",
		"쫆",
		5,
		"쫎쫐쫒쫔쫕쫖쫗쫚",
		5,
		"쫡",
		6
	],
	[
		"a681",
		"쫨쫩쫪쫫쫭",
		6,
		"쫵",
		18,
		"쬉쬊─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂┒┑┚┙┖┕┎┍┞┟┡┢┦┧┩┪┭┮┱┲┵┶┹┺┽┾╀╁╃",
		7
	],
	[
		"a741",
		"쬋",
		4,
		"쬑쬒쬓쬕쬖쬗쬙",
		6,
		"쬢",
		7
	],
	[
		"a761",
		"쬪",
		22,
		"쭂쭃쭄"
	],
	[
		"a781",
		"쭅쭆쭇쭊쭋쭍쭎쭏쭑",
		6,
		"쭚쭛쭜쭞",
		5,
		"쭥",
		7,
		"㎕㎖㎗ℓ㎘㏄㎣㎤㎥㎦㎙",
		9,
		"㏊㎍㎎㎏㏏㎈㎉㏈㎧㎨㎰",
		9,
		"㎀",
		4,
		"㎺",
		5,
		"㎐",
		4,
		"Ω㏀㏁㎊㎋㎌㏖㏅㎭㎮㎯㏛㎩㎪㎫㎬㏝㏐㏓㏃㏉㏜㏆"
	],
	[
		"a841",
		"쭭",
		10,
		"쭺",
		14
	],
	[
		"a861",
		"쮉",
		18,
		"쮝",
		6
	],
	[
		"a881",
		"쮤",
		19,
		"쮹",
		11,
		"ÆÐªĦ"
	],
	[
		"a8a6",
		"Ĳ"
	],
	[
		"a8a8",
		"ĿŁØŒºÞŦŊ"
	],
	[
		"a8b1",
		"㉠",
		27,
		"ⓐ",
		25,
		"①",
		14,
		"½⅓⅔¼¾⅛⅜⅝⅞"
	],
	[
		"a941",
		"쯅",
		14,
		"쯕",
		10
	],
	[
		"a961",
		"쯠쯡쯢쯣쯥쯦쯨쯪",
		18
	],
	[
		"a981",
		"쯽",
		14,
		"찎찏찑찒찓찕",
		6,
		"찞찟찠찣찤æđðħıĳĸŀłøœßþŧŋŉ㈀",
		27,
		"⒜",
		25,
		"⑴",
		14,
		"¹²³⁴ⁿ₁₂₃₄"
	],
	[
		"aa41",
		"찥찦찪찫찭찯찱",
		6,
		"찺찿",
		4,
		"챆챇챉챊챋챍챎"
	],
	[
		"aa61",
		"챏",
		4,
		"챖챚",
		5,
		"챡챢챣챥챧챩",
		6,
		"챱챲"
	],
	[
		"aa81",
		"챳챴챶",
		29,
		"ぁ",
		82
	],
	[
		"ab41",
		"첔첕첖첗첚첛첝첞첟첡",
		6,
		"첪첮",
		5,
		"첶첷첹"
	],
	[
		"ab61",
		"첺첻첽",
		6,
		"쳆쳈쳊",
		5,
		"쳑쳒쳓쳕",
		5
	],
	[
		"ab81",
		"쳛",
		8,
		"쳥",
		6,
		"쳭쳮쳯쳱",
		12,
		"ァ",
		85
	],
	[
		"ac41",
		"쳾쳿촀촂",
		5,
		"촊촋촍촎촏촑",
		6,
		"촚촜촞촟촠"
	],
	[
		"ac61",
		"촡촢촣촥촦촧촩촪촫촭",
		11,
		"촺",
		4
	],
	[
		"ac81",
		"촿",
		28,
		"쵝쵞쵟А",
		5,
		"ЁЖ",
		25
	],
	[
		"acd1",
		"а",
		5,
		"ёж",
		25
	],
	[
		"ad41",
		"쵡쵢쵣쵥",
		6,
		"쵮쵰쵲",
		5,
		"쵹",
		7
	],
	[
		"ad61",
		"춁",
		6,
		"춉",
		10,
		"춖춗춙춚춛춝춞춟"
	],
	[
		"ad81",
		"춠춡춢춣춦춨춪",
		5,
		"춱",
		18,
		"췅"
	],
	[
		"ae41",
		"췆",
		5,
		"췍췎췏췑",
		16
	],
	[
		"ae61",
		"췢",
		5,
		"췩췪췫췭췮췯췱",
		6,
		"췺췼췾",
		4
	],
	[
		"ae81",
		"츃츅츆츇츉츊츋츍",
		6,
		"츕츖츗츘츚",
		5,
		"츢츣츥츦츧츩츪츫"
	],
	[
		"af41",
		"츬츭츮츯츲츴츶",
		19
	],
	[
		"af61",
		"칊",
		13,
		"칚칛칝칞칢",
		5,
		"칪칬"
	],
	[
		"af81",
		"칮",
		5,
		"칶칷칹칺칻칽",
		6,
		"캆캈캊",
		5,
		"캒캓캕캖캗캙"
	],
	[
		"b041",
		"캚",
		5,
		"캢캦",
		5,
		"캮",
		12
	],
	[
		"b061",
		"캻",
		5,
		"컂",
		19
	],
	[
		"b081",
		"컖",
		13,
		"컦컧컩컪컭",
		6,
		"컶컺",
		5,
		"가각간갇갈갉갊감",
		7,
		"같",
		4,
		"갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆"
	],
	[
		"b141",
		"켂켃켅켆켇켉",
		6,
		"켒켔켖",
		5,
		"켝켞켟켡켢켣"
	],
	[
		"b161",
		"켥",
		6,
		"켮켲",
		5,
		"켹",
		11
	],
	[
		"b181",
		"콅",
		14,
		"콖콗콙콚콛콝",
		6,
		"콦콨콪콫콬괌괍괏광괘괜괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸"
	],
	[
		"b241",
		"콭콮콯콲콳콵콶콷콹",
		6,
		"쾁쾂쾃쾄쾆",
		5,
		"쾍"
	],
	[
		"b261",
		"쾎",
		18,
		"쾢",
		5,
		"쾩"
	],
	[
		"b281",
		"쾪",
		5,
		"쾱",
		18,
		"쿅",
		6,
		"깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙"
	],
	[
		"b341",
		"쿌",
		19,
		"쿢쿣쿥쿦쿧쿩"
	],
	[
		"b361",
		"쿪",
		5,
		"쿲쿴쿶",
		5,
		"쿽쿾쿿퀁퀂퀃퀅",
		5
	],
	[
		"b381",
		"퀋",
		5,
		"퀒",
		5,
		"퀙",
		19,
		"끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남납낫",
		4,
		"낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝"
	],
	[
		"b441",
		"퀮",
		5,
		"퀶퀷퀹퀺퀻퀽",
		6,
		"큆큈큊",
		5
	],
	[
		"b461",
		"큑큒큓큕큖큗큙",
		6,
		"큡",
		10,
		"큮큯"
	],
	[
		"b481",
		"큱큲큳큵",
		6,
		"큾큿킀킂",
		18,
		"뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫",
		4,
		"닳담답닷",
		4,
		"닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥"
	],
	[
		"b541",
		"킕",
		14,
		"킦킧킩킪킫킭",
		5
	],
	[
		"b561",
		"킳킶킸킺",
		5,
		"탂탃탅탆탇탊",
		5,
		"탒탖",
		4
	],
	[
		"b581",
		"탛탞탟탡탢탣탥",
		6,
		"탮탲",
		5,
		"탹",
		11,
		"덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸"
	],
	[
		"b641",
		"턅",
		7,
		"턎",
		17
	],
	[
		"b661",
		"턠",
		15,
		"턲턳턵턶턷턹턻턼턽턾"
	],
	[
		"b681",
		"턿텂텆",
		5,
		"텎텏텑텒텓텕",
		6,
		"텞텠텢",
		5,
		"텩텪텫텭땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗"
	],
	[
		"b741",
		"텮",
		13,
		"텽",
		6,
		"톅톆톇톉톊"
	],
	[
		"b761",
		"톋",
		20,
		"톢톣톥톦톧"
	],
	[
		"b781",
		"톩",
		6,
		"톲톴톶톷톸톹톻톽톾톿퇁",
		14,
		"래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩"
	],
	[
		"b841",
		"퇐",
		7,
		"퇙",
		17
	],
	[
		"b861",
		"퇫",
		8,
		"퇵퇶퇷퇹",
		13
	],
	[
		"b881",
		"툈툊",
		5,
		"툑",
		24,
		"륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많",
		4,
		"맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼"
	],
	[
		"b941",
		"툪툫툮툯툱툲툳툵",
		6,
		"툾퉀퉂",
		5,
		"퉉퉊퉋퉌"
	],
	[
		"b961",
		"퉍",
		14,
		"퉝",
		6,
		"퉥퉦퉧퉨"
	],
	[
		"b981",
		"퉩",
		22,
		"튂튃튅튆튇튉튊튋튌묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍및밑바",
		4,
		"받",
		4,
		"밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗"
	],
	[
		"ba41",
		"튍튎튏튒튓튔튖",
		5,
		"튝튞튟튡튢튣튥",
		6,
		"튭"
	],
	[
		"ba61",
		"튮튯튰튲",
		5,
		"튺튻튽튾틁틃",
		4,
		"틊틌",
		5
	],
	[
		"ba81",
		"틒틓틕틖틗틙틚틛틝",
		6,
		"틦",
		9,
		"틲틳틵틶틷틹틺벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗빙빚빛빠빡빤"
	],
	[
		"bb41",
		"틻",
		4,
		"팂팄팆",
		5,
		"팏팑팒팓팕팗",
		4,
		"팞팢팣"
	],
	[
		"bb61",
		"팤팦팧팪팫팭팮팯팱",
		6,
		"팺팾",
		5,
		"퍆퍇퍈퍉"
	],
	[
		"bb81",
		"퍊",
		31,
		"빨빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺨뻐뻑뻔뻗뻘뻠뻣뻤뻥뻬뼁뼈뼉뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽕뾔뾰뿅뿌뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨쁩삐삑삔삘삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅새색샌샐샘샙샛샜생샤"
	],
	[
		"bc41",
		"퍪",
		17,
		"퍾퍿펁펂펃펅펆펇"
	],
	[
		"bc61",
		"펈펉펊펋펎펒",
		5,
		"펚펛펝펞펟펡",
		6,
		"펪펬펮"
	],
	[
		"bc81",
		"펯",
		4,
		"펵펶펷펹펺펻펽",
		6,
		"폆폇폊",
		5,
		"폑",
		5,
		"샥샨샬샴샵샷샹섀섄섈섐섕서",
		4,
		"섣설섦섧섬섭섯섰성섶세섹센셀셈셉셋셌셍셔셕션셜셤셥셧셨셩셰셴셸솅소속솎손솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇼쇽숀숄숌숍숏숑수숙순숟술숨숩숫숭"
	],
	[
		"bd41",
		"폗폙",
		7,
		"폢폤",
		7,
		"폮폯폱폲폳폵폶폷"
	],
	[
		"bd61",
		"폸폹폺폻폾퐀퐂",
		5,
		"퐉",
		13
	],
	[
		"bd81",
		"퐗",
		5,
		"퐞",
		25,
		"숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슐슘슛슝스슥슨슬슭슴습슷승시식신싣실싫심십싯싱싶싸싹싻싼쌀쌈쌉쌌쌍쌓쌔쌕쌘쌜쌤쌥쌨쌩썅써썩썬썰썲썸썹썼썽쎄쎈쎌쏀쏘쏙쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쐈쐐쐤쐬쐰"
	],
	[
		"be41",
		"퐸",
		7,
		"푁푂푃푅",
		14
	],
	[
		"be61",
		"푔",
		7,
		"푝푞푟푡푢푣푥",
		7,
		"푮푰푱푲"
	],
	[
		"be81",
		"푳",
		4,
		"푺푻푽푾풁풃",
		4,
		"풊풌풎",
		5,
		"풕",
		8,
		"쐴쐼쐽쑈쑤쑥쑨쑬쑴쑵쑹쒀쒔쒜쒸쒼쓩쓰쓱쓴쓸쓺쓿씀씁씌씐씔씜씨씩씬씰씸씹씻씽아악안앉않알앍앎앓암압앗았앙앝앞애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏양얕얗얘얜얠얩어억언얹얻얼얽얾엄",
		6,
		"엌엎"
	],
	[
		"bf41",
		"풞",
		10,
		"풪",
		14
	],
	[
		"bf61",
		"풹",
		18,
		"퓍퓎퓏퓑퓒퓓퓕"
	],
	[
		"bf81",
		"퓖",
		5,
		"퓝퓞퓠",
		7,
		"퓩퓪퓫퓭퓮퓯퓱",
		6,
		"퓹퓺퓼에엑엔엘엠엡엣엥여역엮연열엶엷염",
		5,
		"옅옆옇예옌옐옘옙옛옜오옥온올옭옮옰옳옴옵옷옹옻와왁완왈왐왑왓왔왕왜왝왠왬왯왱외왹왼욀욈욉욋욍요욕욘욜욤욥욧용우욱운울욹욺움웁웃웅워웍원월웜웝웠웡웨"
	],
	[
		"c041",
		"퓾",
		5,
		"픅픆픇픉픊픋픍",
		6,
		"픖픘",
		5
	],
	[
		"c061",
		"픞",
		25
	],
	[
		"c081",
		"픸픹픺픻픾픿핁핂핃핅",
		6,
		"핎핐핒",
		5,
		"핚핛핝핞핟핡핢핣웩웬웰웸웹웽위윅윈윌윔윕윗윙유육윤율윰윱윳융윷으윽은을읊음읍읏응",
		7,
		"읜읠읨읫이익인일읽읾잃임입잇있잉잊잎자작잔잖잗잘잚잠잡잣잤장잦재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬저적전절젊"
	],
	[
		"c141",
		"핤핦핧핪핬핮",
		5,
		"핶핷핹핺핻핽",
		6,
		"햆햊햋"
	],
	[
		"c161",
		"햌햍햎햏햑",
		19,
		"햦햧"
	],
	[
		"c181",
		"햨",
		31,
		"점접젓정젖제젝젠젤젬젭젯젱져젼졀졈졉졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좔좝좟좡좨좼좽죄죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥰쥴쥼즈즉즌즐즘즙즛증지직진짇질짊짐집짓"
	],
	[
		"c241",
		"헊헋헍헎헏헑헓",
		4,
		"헚헜헞",
		5,
		"헦헧헩헪헫헭헮"
	],
	[
		"c261",
		"헯",
		4,
		"헶헸헺",
		5,
		"혂혃혅혆혇혉",
		6,
		"혒"
	],
	[
		"c281",
		"혖",
		5,
		"혝혞혟혡혢혣혥",
		7,
		"혮",
		9,
		"혺혻징짖짙짚짜짝짠짢짤짧짬짭짯짰짱째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨩쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩽쪄쪘쪼쪽쫀쫄쫌쫍쫏쫑쫓쫘쫙쫠쫬쫴쬈쬐쬔쬘쬠쬡쭁쭈쭉쭌쭐쭘쭙쭝쭤쭸쭹쮜쮸쯔쯤쯧쯩찌찍찐찔찜찝찡찢찧차착찬찮찰참찹찻"
	],
	[
		"c341",
		"혽혾혿홁홂홃홄홆홇홊홌홎홏홐홒홓홖홗홙홚홛홝",
		4
	],
	[
		"c361",
		"홢",
		4,
		"홨홪",
		5,
		"홲홳홵",
		11
	],
	[
		"c381",
		"횁횂횄횆",
		5,
		"횎횏횑횒횓횕",
		7,
		"횞횠횢",
		5,
		"횩횪찼창찾채책챈챌챔챕챗챘챙챠챤챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳐쳔쳤쳬쳰촁초촉촌촐촘촙촛총촤촨촬촹최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췐취췬췰췸췹췻췽츄츈츌츔츙츠측츤츨츰츱츳층"
	],
	[
		"c441",
		"횫횭횮횯횱",
		7,
		"횺횼",
		7,
		"훆훇훉훊훋"
	],
	[
		"c461",
		"훍훎훏훐훒훓훕훖훘훚",
		5,
		"훡훢훣훥훦훧훩",
		4
	],
	[
		"c481",
		"훮훯훱훲훳훴훶",
		5,
		"훾훿휁휂휃휅",
		11,
		"휒휓휔치칙친칟칠칡침칩칫칭카칵칸칼캄캅캇캉캐캑캔캘캠캡캣캤캥캬캭컁커컥컨컫컬컴컵컷컸컹케켁켄켈켐켑켓켕켜켠켤켬켭켯켰켱켸코콕콘콜콤콥콧콩콰콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠쿡쿤쿨쿰쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴퀵퀸퀼"
	],
	[
		"c541",
		"휕휖휗휚휛휝휞휟휡",
		6,
		"휪휬휮",
		5,
		"휶휷휹"
	],
	[
		"c561",
		"휺휻휽",
		6,
		"흅흆흈흊",
		5,
		"흒흓흕흚",
		4
	],
	[
		"c581",
		"흟흢흤흦흧흨흪흫흭흮흯흱흲흳흵",
		6,
		"흾흿힀힂",
		5,
		"힊힋큄큅큇큉큐큔큘큠크큭큰클큼큽킁키킥킨킬킴킵킷킹타탁탄탈탉탐탑탓탔탕태택탠탤탬탭탯탰탱탸턍터턱턴털턺텀텁텃텄텅테텍텐텔템텝텟텡텨텬텼톄톈토톡톤톨톰톱톳통톺톼퇀퇘퇴퇸툇툉툐투툭툰툴툼툽툿퉁퉈퉜"
	],
	[
		"c641",
		"힍힎힏힑",
		6,
		"힚힜힞",
		5
	],
	[
		"c6a1",
		"퉤튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틔틘틜틤틥티틱틴틸팀팁팃팅파팍팎판팔팖팜팝팟팠팡팥패팩팬팰팸팹팻팼팽퍄퍅퍼퍽펀펄펌펍펏펐펑페펙펜펠펨펩펫펭펴편펼폄폅폈평폐폘폡폣포폭폰폴폼폽폿퐁"
	],
	[
		"c7a1",
		"퐈퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗피픽핀필핌핍핏핑하학한할핥함합핫항해핵핸핼햄햅햇했행햐향허헉헌헐헒험헙헛헝헤헥헨헬헴헵헷헹혀혁현혈혐협혓혔형혜혠"
	],
	[
		"c8a1",
		"혤혭호혹혼홀홅홈홉홋홍홑화확환활홧황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻후훅훈훌훑훔훗훙훠훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힝"
	],
	[
		"caa1",
		"伽佳假價加可呵哥嘉嫁家暇架枷柯歌珂痂稼苛茄街袈訶賈跏軻迦駕刻却各恪慤殼珏脚覺角閣侃刊墾奸姦干幹懇揀杆柬桿澗癎看磵稈竿簡肝艮艱諫間乫喝曷渴碣竭葛褐蝎鞨勘坎堪嵌感憾戡敢柑橄減甘疳監瞰紺邯鑑鑒龕"
	],
	[
		"cba1",
		"匣岬甲胛鉀閘剛堈姜岡崗康强彊慷江畺疆糠絳綱羌腔舡薑襁講鋼降鱇介价個凱塏愷愾慨改槪漑疥皆盖箇芥蓋豈鎧開喀客坑更粳羹醵倨去居巨拒据據擧渠炬祛距踞車遽鉅鋸乾件健巾建愆楗腱虔蹇鍵騫乞傑杰桀儉劍劒檢"
	],
	[
		"cca1",
		"瞼鈐黔劫怯迲偈憩揭擊格檄激膈覡隔堅牽犬甄絹繭肩見譴遣鵑抉決潔結缺訣兼慊箝謙鉗鎌京俓倞傾儆勁勍卿坰境庚徑慶憬擎敬景暻更梗涇炅烱璟璥瓊痙硬磬竟競絅經耕耿脛莖警輕逕鏡頃頸驚鯨係啓堺契季屆悸戒桂械"
	],
	[
		"cda1",
		"棨溪界癸磎稽系繫繼計誡谿階鷄古叩告呱固姑孤尻庫拷攷故敲暠枯槁沽痼皐睾稿羔考股膏苦苽菰藁蠱袴誥賈辜錮雇顧高鼓哭斛曲梏穀谷鵠困坤崑昆梱棍滾琨袞鯤汨滑骨供公共功孔工恐恭拱控攻珙空蚣貢鞏串寡戈果瓜"
	],
	[
		"cea1",
		"科菓誇課跨過鍋顆廓槨藿郭串冠官寬慣棺款灌琯瓘管罐菅觀貫關館刮恝括适侊光匡壙廣曠洸炚狂珖筐胱鑛卦掛罫乖傀塊壞怪愧拐槐魁宏紘肱轟交僑咬喬嬌嶠巧攪敎校橋狡皎矯絞翹膠蕎蛟較轎郊餃驕鮫丘久九仇俱具勾"
	],
	[
		"cfa1",
		"區口句咎嘔坵垢寇嶇廐懼拘救枸柩構歐毆毬求溝灸狗玖球瞿矩究絿耉臼舅舊苟衢謳購軀逑邱鉤銶駒驅鳩鷗龜國局菊鞠鞫麴君窘群裙軍郡堀屈掘窟宮弓穹窮芎躬倦券勸卷圈拳捲權淃眷厥獗蕨蹶闕机櫃潰詭軌饋句晷歸貴"
	],
	[
		"d0a1",
		"鬼龜叫圭奎揆槻珪硅窺竅糾葵規赳逵閨勻均畇筠菌鈞龜橘克剋劇戟棘極隙僅劤勤懃斤根槿瑾筋芹菫覲謹近饉契今妗擒昑檎琴禁禽芩衾衿襟金錦伋及急扱汲級給亘兢矜肯企伎其冀嗜器圻基埼夔奇妓寄岐崎己幾忌技旗旣"
	],
	[
		"d1a1",
		"朞期杞棋棄機欺氣汽沂淇玘琦琪璂璣畸畿碁磯祁祇祈祺箕紀綺羈耆耭肌記譏豈起錡錤飢饑騎騏驥麒緊佶吉拮桔金喫儺喇奈娜懦懶拏拿癩",
		5,
		"那樂",
		4,
		"諾酪駱亂卵暖欄煖爛蘭難鸞捏捺南嵐枏楠湳濫男藍襤拉"
	],
	[
		"d2a1",
		"納臘蠟衲囊娘廊",
		4,
		"乃來內奈柰耐冷女年撚秊念恬拈捻寧寗努勞奴弩怒擄櫓爐瑙盧",
		5,
		"駑魯",
		10,
		"濃籠聾膿農惱牢磊腦賂雷尿壘",
		7,
		"嫩訥杻紐勒",
		5,
		"能菱陵尼泥匿溺多茶"
	],
	[
		"d3a1",
		"丹亶但單團壇彖斷旦檀段湍短端簞緞蛋袒鄲鍛撻澾獺疸達啖坍憺擔曇淡湛潭澹痰聃膽蕁覃談譚錟沓畓答踏遝唐堂塘幢戇撞棠當糖螳黨代垈坮大對岱帶待戴擡玳臺袋貸隊黛宅德悳倒刀到圖堵塗導屠島嶋度徒悼挑掉搗桃"
	],
	[
		"d4a1",
		"棹櫂淘渡滔濤燾盜睹禱稻萄覩賭跳蹈逃途道都鍍陶韜毒瀆牘犢獨督禿篤纛讀墩惇敦旽暾沌焞燉豚頓乭突仝冬凍動同憧東桐棟洞潼疼瞳童胴董銅兜斗杜枓痘竇荳讀豆逗頭屯臀芚遁遯鈍得嶝橙燈登等藤謄鄧騰喇懶拏癩羅"
	],
	[
		"d5a1",
		"蘿螺裸邏樂洛烙珞絡落諾酪駱丹亂卵欄欒瀾爛蘭鸞剌辣嵐擥攬欖濫籃纜藍襤覽拉臘蠟廊朗浪狼琅瑯螂郞來崍徠萊冷掠略亮倆兩凉梁樑粮粱糧良諒輛量侶儷勵呂廬慮戾旅櫚濾礪藜蠣閭驢驪麗黎力曆歷瀝礫轢靂憐戀攣漣"
	],
	[
		"d6a1",
		"煉璉練聯蓮輦連鍊冽列劣洌烈裂廉斂殮濂簾獵令伶囹寧岺嶺怜玲笭羚翎聆逞鈴零靈領齡例澧禮醴隷勞怒撈擄櫓潞瀘爐盧老蘆虜路輅露魯鷺鹵碌祿綠菉錄鹿麓論壟弄朧瀧瓏籠聾儡瀨牢磊賂賚賴雷了僚寮廖料燎療瞭聊蓼"
	],
	[
		"d7a1",
		"遼鬧龍壘婁屢樓淚漏瘻累縷蔞褸鏤陋劉旒柳榴流溜瀏琉瑠留瘤硫謬類六戮陸侖倫崙淪綸輪律慄栗率隆勒肋凜凌楞稜綾菱陵俚利厘吏唎履悧李梨浬犁狸理璃異痢籬罹羸莉裏裡里釐離鯉吝潾燐璘藺躪隣鱗麟林淋琳臨霖砬"
	],
	[
		"d8a1",
		"立笠粒摩瑪痲碼磨馬魔麻寞幕漠膜莫邈万卍娩巒彎慢挽晩曼滿漫灣瞞萬蔓蠻輓饅鰻唜抹末沫茉襪靺亡妄忘忙望網罔芒茫莽輞邙埋妹媒寐昧枚梅每煤罵買賣邁魅脈貊陌驀麥孟氓猛盲盟萌冪覓免冕勉棉沔眄眠綿緬面麵滅"
	],
	[
		"d9a1",
		"蔑冥名命明暝椧溟皿瞑茗蓂螟酩銘鳴袂侮冒募姆帽慕摸摹暮某模母毛牟牡瑁眸矛耗芼茅謀謨貌木沐牧目睦穆鶩歿沒夢朦蒙卯墓妙廟描昴杳渺猫竗苗錨務巫憮懋戊拇撫无楙武毋無珷畝繆舞茂蕪誣貿霧鵡墨默們刎吻問文"
	],
	[
		"daa1",
		"汶紊紋聞蚊門雯勿沕物味媚尾嵋彌微未梶楣渼湄眉米美薇謎迷靡黴岷悶愍憫敏旻旼民泯玟珉緡閔密蜜謐剝博拍搏撲朴樸泊珀璞箔粕縛膊舶薄迫雹駁伴半反叛拌搬攀斑槃泮潘班畔瘢盤盼磐磻礬絆般蟠返頒飯勃拔撥渤潑"
	],
	[
		"dba1",
		"發跋醱鉢髮魃倣傍坊妨尨幇彷房放方旁昉枋榜滂磅紡肪膀舫芳蒡蚌訪謗邦防龐倍俳北培徘拜排杯湃焙盃背胚裴裵褙賠輩配陪伯佰帛柏栢白百魄幡樊煩燔番磻繁蕃藩飜伐筏罰閥凡帆梵氾汎泛犯範范法琺僻劈壁擘檗璧癖"
	],
	[
		"dca1",
		"碧蘗闢霹便卞弁變辨辯邊別瞥鱉鼈丙倂兵屛幷昞昺柄棅炳甁病秉竝輧餠騈保堡報寶普步洑湺潽珤甫菩補褓譜輔伏僕匐卜宓復服福腹茯蔔複覆輹輻馥鰒本乶俸奉封峯峰捧棒烽熢琫縫蓬蜂逢鋒鳳不付俯傅剖副否咐埠夫婦"
	],
	[
		"dda1",
		"孚孵富府復扶敷斧浮溥父符簿缶腐腑膚艀芙莩訃負賦賻赴趺部釜阜附駙鳧北分吩噴墳奔奮忿憤扮昐汾焚盆粉糞紛芬賁雰不佛弗彿拂崩朋棚硼繃鵬丕備匕匪卑妃婢庇悲憊扉批斐枇榧比毖毗毘沸泌琵痺砒碑秕秘粃緋翡肥"
	],
	[
		"dea1",
		"脾臂菲蜚裨誹譬費鄙非飛鼻嚬嬪彬斌檳殯浜濱瀕牝玭貧賓頻憑氷聘騁乍事些仕伺似使俟僿史司唆嗣四士奢娑寫寺射巳師徙思捨斜斯柶査梭死沙泗渣瀉獅砂社祀祠私篩紗絲肆舍莎蓑蛇裟詐詞謝賜赦辭邪飼駟麝削數朔索"
	],
	[
		"dfa1",
		"傘刪山散汕珊産疝算蒜酸霰乷撒殺煞薩三參杉森渗芟蔘衫揷澁鈒颯上傷像償商喪嘗孀尙峠常床庠廂想桑橡湘爽牀狀相祥箱翔裳觴詳象賞霜塞璽賽嗇塞穡索色牲生甥省笙墅壻嶼序庶徐恕抒捿敍暑曙書栖棲犀瑞筮絮緖署"
	],
	[
		"e0a1",
		"胥舒薯西誓逝鋤黍鼠夕奭席惜昔晳析汐淅潟石碩蓆釋錫仙僊先善嬋宣扇敾旋渲煽琁瑄璇璿癬禪線繕羨腺膳船蘚蟬詵跣選銑鐥饍鮮卨屑楔泄洩渫舌薛褻設說雪齧剡暹殲纖蟾贍閃陝攝涉燮葉城姓宬性惺成星晟猩珹盛省筬"
	],
	[
		"e1a1",
		"聖聲腥誠醒世勢歲洗稅笹細說貰召嘯塑宵小少巢所掃搔昭梳沼消溯瀟炤燒甦疏疎瘙笑篠簫素紹蔬蕭蘇訴逍遡邵銷韶騷俗屬束涑粟續謖贖速孫巽損蓀遜飡率宋悚松淞訟誦送頌刷殺灑碎鎖衰釗修受嗽囚垂壽嫂守岫峀帥愁"
	],
	[
		"e2a1",
		"戍手授搜收數樹殊水洙漱燧狩獸琇璲瘦睡秀穗竪粹綏綬繡羞脩茱蒐蓚藪袖誰讐輸遂邃酬銖銹隋隧隨雖需須首髓鬚叔塾夙孰宿淑潚熟琡璹肅菽巡徇循恂旬栒楯橓殉洵淳珣盾瞬筍純脣舜荀蓴蕣詢諄醇錞順馴戌術述鉥崇崧"
	],
	[
		"e3a1",
		"嵩瑟膝蝨濕拾習褶襲丞乘僧勝升承昇繩蠅陞侍匙嘶始媤尸屎屍市弑恃施是時枾柴猜矢示翅蒔蓍視試詩諡豕豺埴寔式息拭植殖湜熄篒蝕識軾食飾伸侁信呻娠宸愼新晨燼申神紳腎臣莘薪藎蜃訊身辛辰迅失室實悉審尋心沁"
	],
	[
		"e4a1",
		"沈深瀋甚芯諶什十拾雙氏亞俄兒啞娥峨我牙芽莪蛾衙訝阿雅餓鴉鵝堊岳嶽幄惡愕握樂渥鄂鍔顎鰐齷安岸按晏案眼雁鞍顔鮟斡謁軋閼唵岩巖庵暗癌菴闇壓押狎鴨仰央怏昻殃秧鴦厓哀埃崖愛曖涯碍艾隘靄厄扼掖液縊腋額"
	],
	[
		"e5a1",
		"櫻罌鶯鸚也倻冶夜惹揶椰爺耶若野弱掠略約若葯蒻藥躍亮佯兩凉壤孃恙揚攘敭暘梁楊樣洋瀁煬痒瘍禳穰糧羊良襄諒讓釀陽量養圄御於漁瘀禦語馭魚齬億憶抑檍臆偃堰彦焉言諺孼蘖俺儼嚴奄掩淹嶪業円予余勵呂女如廬"
	],
	[
		"e6a1",
		"旅歟汝濾璵礖礪與艅茹輿轝閭餘驪麗黎亦力域役易曆歷疫繹譯轢逆驛嚥堧姸娟宴年延憐戀捐挻撚椽沇沿涎涓淵演漣烟然煙煉燃燕璉硏硯秊筵緣練縯聯衍軟輦蓮連鉛鍊鳶列劣咽悅涅烈熱裂說閱厭廉念捻染殮炎焰琰艶苒"
	],
	[
		"e7a1",
		"簾閻髥鹽曄獵燁葉令囹塋寧嶺嶸影怜映暎楹榮永泳渶潁濚瀛瀯煐營獰玲瑛瑩瓔盈穎纓羚聆英詠迎鈴鍈零霙靈領乂倪例刈叡曳汭濊猊睿穢芮藝蘂禮裔詣譽豫醴銳隸霓預五伍俉傲午吾吳嗚塢墺奧娛寤悟惡懊敖旿晤梧汚澳"
	],
	[
		"e8a1",
		"烏熬獒筽蜈誤鰲鼇屋沃獄玉鈺溫瑥瘟穩縕蘊兀壅擁瓮甕癰翁邕雍饔渦瓦窩窪臥蛙蝸訛婉完宛梡椀浣玩琓琬碗緩翫脘腕莞豌阮頑曰往旺枉汪王倭娃歪矮外嵬巍猥畏了僚僥凹堯夭妖姚寥寮尿嶢拗搖撓擾料曜樂橈燎燿瑤療"
	],
	[
		"e9a1",
		"窈窯繇繞耀腰蓼蟯要謠遙遼邀饒慾欲浴縟褥辱俑傭冗勇埇墉容庸慂榕涌湧溶熔瑢用甬聳茸蓉踊鎔鏞龍于佑偶優又友右宇寓尤愚憂旴牛玗瑀盂祐禑禹紆羽芋藕虞迂遇郵釪隅雨雩勖彧旭昱栯煜稶郁頊云暈橒殞澐熉耘芸蕓"
	],
	[
		"eaa1",
		"運隕雲韻蔚鬱亐熊雄元原員圓園垣媛嫄寃怨愿援沅洹湲源爰猿瑗苑袁轅遠阮院願鴛月越鉞位偉僞危圍委威尉慰暐渭爲瑋緯胃萎葦蔿蝟衛褘謂違韋魏乳侑儒兪劉唯喩孺宥幼幽庾悠惟愈愉揄攸有杻柔柚柳楡楢油洧流游溜"
	],
	[
		"eba1",
		"濡猶猷琉瑜由留癒硫紐維臾萸裕誘諛諭踰蹂遊逾遺酉釉鍮類六堉戮毓肉育陸倫允奫尹崙淪潤玧胤贇輪鈗閏律慄栗率聿戎瀜絨融隆垠恩慇殷誾銀隱乙吟淫蔭陰音飮揖泣邑凝應膺鷹依倚儀宜意懿擬椅毅疑矣義艤薏蟻衣誼"
	],
	[
		"eca1",
		"議醫二以伊利吏夷姨履已弛彛怡易李梨泥爾珥理異痍痢移罹而耳肄苡荑裏裡貽貳邇里離飴餌匿溺瀷益翊翌翼謚人仁刃印吝咽因姻寅引忍湮燐璘絪茵藺蚓認隣靭靷鱗麟一佚佾壹日溢逸鎰馹任壬妊姙恁林淋稔臨荏賃入卄"
	],
	[
		"eda1",
		"立笠粒仍剩孕芿仔刺咨姉姿子字孜恣慈滋炙煮玆瓷疵磁紫者自茨蔗藉諮資雌作勺嚼斫昨灼炸爵綽芍酌雀鵲孱棧殘潺盞岑暫潛箴簪蠶雜丈仗匠場墻壯奬將帳庄張掌暲杖樟檣欌漿牆狀獐璋章粧腸臟臧莊葬蔣薔藏裝贓醬長"
	],
	[
		"eea1",
		"障再哉在宰才材栽梓渽滓災縡裁財載齋齎爭箏諍錚佇低儲咀姐底抵杵楮樗沮渚狙猪疽箸紵苧菹著藷詛貯躇這邸雎齟勣吊嫡寂摘敵滴狄炙的積笛籍績翟荻謫賊赤跡蹟迪迹適鏑佃佺傳全典前剪塡塼奠專展廛悛戰栓殿氈澱"
	],
	[
		"efa1",
		"煎琠田甸畑癲筌箋箭篆纏詮輾轉鈿銓錢鐫電顚顫餞切截折浙癤竊節絶占岾店漸点粘霑鮎點接摺蝶丁井亭停偵呈姃定幀庭廷征情挺政整旌晶晸柾楨檉正汀淀淨渟湞瀞炡玎珽町睛碇禎程穽精綎艇訂諪貞鄭酊釘鉦鋌錠霆靖"
	],
	[
		"f0a1",
		"靜頂鼎制劑啼堤帝弟悌提梯濟祭第臍薺製諸蹄醍除際霽題齊俎兆凋助嘲弔彫措操早晁曺曹朝條棗槽漕潮照燥爪璪眺祖祚租稠窕粗糟組繰肇藻蚤詔調趙躁造遭釣阻雕鳥族簇足鏃存尊卒拙猝倧宗從悰慫棕淙琮種終綜縱腫"
	],
	[
		"f1a1",
		"踪踵鍾鐘佐坐左座挫罪主住侏做姝胄呪周嗾奏宙州廚晝朱柱株注洲湊澍炷珠疇籌紂紬綢舟蛛註誅走躊輳週酎酒鑄駐竹粥俊儁准埈寯峻晙樽浚準濬焌畯竣蠢逡遵雋駿茁中仲衆重卽櫛楫汁葺增憎曾拯烝甑症繒蒸證贈之只"
	],
	[
		"f2a1",
		"咫地址志持指摯支旨智枝枳止池沚漬知砥祉祗紙肢脂至芝芷蜘誌識贄趾遲直稙稷織職唇嗔塵振搢晉晋桭榛殄津溱珍瑨璡畛疹盡眞瞋秦縉縝臻蔯袗診賑軫辰進鎭陣陳震侄叱姪嫉帙桎瓆疾秩窒膣蛭質跌迭斟朕什執潗緝輯"
	],
	[
		"f3a1",
		"鏶集徵懲澄且侘借叉嗟嵯差次此磋箚茶蹉車遮捉搾着窄錯鑿齪撰澯燦璨瓚竄簒纂粲纘讚贊鑽餐饌刹察擦札紮僭參塹慘慙懺斬站讒讖倉倡創唱娼廠彰愴敞昌昶暢槍滄漲猖瘡窓脹艙菖蒼債埰寀寨彩採砦綵菜蔡采釵冊柵策"
	],
	[
		"f4a1",
		"責凄妻悽處倜刺剔尺慽戚拓擲斥滌瘠脊蹠陟隻仟千喘天川擅泉淺玔穿舛薦賤踐遷釧闡阡韆凸哲喆徹撤澈綴輟轍鐵僉尖沾添甛瞻簽籤詹諂堞妾帖捷牒疊睫諜貼輒廳晴淸聽菁請靑鯖切剃替涕滯締諦逮遞體初剿哨憔抄招梢"
	],
	[
		"f5a1",
		"椒楚樵炒焦硝礁礎秒稍肖艸苕草蕉貂超酢醋醮促囑燭矗蜀觸寸忖村邨叢塚寵悤憁摠總聰蔥銃撮催崔最墜抽推椎楸樞湫皺秋芻萩諏趨追鄒酋醜錐錘鎚雛騶鰍丑畜祝竺筑築縮蓄蹙蹴軸逐春椿瑃出朮黜充忠沖蟲衝衷悴膵萃"
	],
	[
		"f6a1",
		"贅取吹嘴娶就炊翠聚脆臭趣醉驟鷲側仄厠惻測層侈値嗤峙幟恥梔治淄熾痔痴癡稚穉緇緻置致蚩輜雉馳齒則勅飭親七柒漆侵寢枕沈浸琛砧針鍼蟄秤稱快他咤唾墮妥惰打拖朶楕舵陀馱駝倬卓啄坼度托拓擢晫柝濁濯琢琸託"
	],
	[
		"f7a1",
		"鐸呑嘆坦彈憚歎灘炭綻誕奪脫探眈耽貪塔搭榻宕帑湯糖蕩兌台太怠態殆汰泰笞胎苔跆邰颱宅擇澤撑攄兎吐土討慟桶洞痛筒統通堆槌腿褪退頹偸套妬投透鬪慝特闖坡婆巴把播擺杷波派爬琶破罷芭跛頗判坂板版瓣販辦鈑"
	],
	[
		"f8a1",
		"阪八叭捌佩唄悖敗沛浿牌狽稗覇貝彭澎烹膨愎便偏扁片篇編翩遍鞭騙貶坪平枰萍評吠嬖幣廢弊斃肺蔽閉陛佈包匍匏咆哺圃布怖抛抱捕暴泡浦疱砲胞脯苞葡蒲袍褒逋鋪飽鮑幅暴曝瀑爆輻俵剽彪慓杓標漂瓢票表豹飇飄驃"
	],
	[
		"f9a1",
		"品稟楓諷豊風馮彼披疲皮被避陂匹弼必泌珌畢疋筆苾馝乏逼下何厦夏廈昰河瑕荷蝦賀遐霞鰕壑學虐謔鶴寒恨悍旱汗漢澣瀚罕翰閑閒限韓割轄函含咸啣喊檻涵緘艦銜陷鹹合哈盒蛤閤闔陜亢伉姮嫦巷恒抗杭桁沆港缸肛航"
	],
	[
		"faa1",
		"行降項亥偕咳垓奚孩害懈楷海瀣蟹解該諧邂駭骸劾核倖幸杏荇行享向嚮珦鄕響餉饗香噓墟虛許憲櫶獻軒歇險驗奕爀赫革俔峴弦懸晛泫炫玄玹現眩睍絃絢縣舷衒見賢鉉顯孑穴血頁嫌俠協夾峽挾浹狹脅脇莢鋏頰亨兄刑型"
	],
	[
		"fba1",
		"形泂滎瀅灐炯熒珩瑩荊螢衡逈邢鎣馨兮彗惠慧暳蕙蹊醯鞋乎互呼壕壺好岵弧戶扈昊晧毫浩淏湖滸澔濠濩灝狐琥瑚瓠皓祜糊縞胡芦葫蒿虎號蝴護豪鎬頀顥惑或酷婚昏混渾琿魂忽惚笏哄弘汞泓洪烘紅虹訌鴻化和嬅樺火畵"
	],
	[
		"fca1",
		"禍禾花華話譁貨靴廓擴攫確碻穫丸喚奐宦幻患換歡晥桓渙煥環紈還驩鰥活滑猾豁闊凰幌徨恍惶愰慌晃晄榥況湟滉潢煌璜皇篁簧荒蝗遑隍黃匯回廻徊恢悔懷晦會檜淮澮灰獪繪膾茴蛔誨賄劃獲宖橫鐄哮嚆孝效斅曉梟涍淆"
	],
	[
		"fda1",
		"爻肴酵驍侯候厚后吼喉嗅帿後朽煦珝逅勛勳塤壎焄熏燻薰訓暈薨喧暄煊萱卉喙毁彙徽揮暉煇諱輝麾休携烋畦虧恤譎鷸兇凶匈洶胸黑昕欣炘痕吃屹紇訖欠欽歆吸恰洽翕興僖凞喜噫囍姬嬉希憙憘戱晞曦熙熹熺犧禧稀羲詰"
	]
];

/***/ }),
/* 463 */
/***/ (function(module, exports) {

module.exports = [
	[
		"0",
		"\u0000",
		127
	],
	[
		"8ea1",
		"｡",
		62
	],
	[
		"a1a1",
		"　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",
		9,
		"＋－±×÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇"
	],
	[
		"a2a1",
		"◆□■△▲▽▼※〒→←↑↓〓"
	],
	[
		"a2ba",
		"∈∋⊆⊇⊂⊃∪∩"
	],
	[
		"a2ca",
		"∧∨￢⇒⇔∀∃"
	],
	[
		"a2dc",
		"∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"
	],
	[
		"a2f2",
		"Å‰♯♭♪†‡¶"
	],
	[
		"a2fe",
		"◯"
	],
	[
		"a3b0",
		"０",
		9
	],
	[
		"a3c1",
		"Ａ",
		25
	],
	[
		"a3e1",
		"ａ",
		25
	],
	[
		"a4a1",
		"ぁ",
		82
	],
	[
		"a5a1",
		"ァ",
		85
	],
	[
		"a6a1",
		"Α",
		16,
		"Σ",
		6
	],
	[
		"a6c1",
		"α",
		16,
		"σ",
		6
	],
	[
		"a7a1",
		"А",
		5,
		"ЁЖ",
		25
	],
	[
		"a7d1",
		"а",
		5,
		"ёж",
		25
	],
	[
		"a8a1",
		"─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"
	],
	[
		"ada1",
		"①",
		19,
		"Ⅰ",
		9
	],
	[
		"adc0",
		"㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"
	],
	[
		"addf",
		"㍻〝〟№㏍℡㊤",
		4,
		"㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"
	],
	[
		"b0a1",
		"亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"
	],
	[
		"b1a1",
		"院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応"
	],
	[
		"b2a1",
		"押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"
	],
	[
		"b3a1",
		"魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱"
	],
	[
		"b4a1",
		"粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"
	],
	[
		"b5a1",
		"機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京"
	],
	[
		"b6a1",
		"供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"
	],
	[
		"b7a1",
		"掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲"
	],
	[
		"b8a1",
		"検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"
	],
	[
		"b9a1",
		"后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込"
	],
	[
		"baa1",
		"此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"
	],
	[
		"bba1",
		"察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時"
	],
	[
		"bca1",
		"次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"
	],
	[
		"bda1",
		"宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償"
	],
	[
		"bea1",
		"勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"
	],
	[
		"bfa1",
		"拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾"
	],
	[
		"c0a1",
		"澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"
	],
	[
		"c1a1",
		"繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎"
	],
	[
		"c2a1",
		"臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"
	],
	[
		"c3a1",
		"叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵"
	],
	[
		"c4a1",
		"帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"
	],
	[
		"c5a1",
		"邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到"
	],
	[
		"c6a1",
		"董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"
	],
	[
		"c7a1",
		"如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦"
	],
	[
		"c8a1",
		"函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"
	],
	[
		"c9a1",
		"鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服"
	],
	[
		"caa1",
		"福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"
	],
	[
		"cba1",
		"法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満"
	],
	[
		"cca1",
		"漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"
	],
	[
		"cda1",
		"諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃"
	],
	[
		"cea1",
		"痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"
	],
	[
		"cfa1",
		"蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"
	],
	[
		"d0a1",
		"弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"
	],
	[
		"d1a1",
		"僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨"
	],
	[
		"d2a1",
		"辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"
	],
	[
		"d3a1",
		"咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉"
	],
	[
		"d4a1",
		"圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"
	],
	[
		"d5a1",
		"奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓"
	],
	[
		"d6a1",
		"屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"
	],
	[
		"d7a1",
		"廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚"
	],
	[
		"d8a1",
		"悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"
	],
	[
		"d9a1",
		"戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼"
	],
	[
		"daa1",
		"據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"
	],
	[
		"dba1",
		"曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍"
	],
	[
		"dca1",
		"棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"
	],
	[
		"dda1",
		"檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾"
	],
	[
		"dea1",
		"沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"
	],
	[
		"dfa1",
		"漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼"
	],
	[
		"e0a1",
		"燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"
	],
	[
		"e1a1",
		"瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰"
	],
	[
		"e2a1",
		"癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"
	],
	[
		"e3a1",
		"磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐"
	],
	[
		"e4a1",
		"筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"
	],
	[
		"e5a1",
		"紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺"
	],
	[
		"e6a1",
		"罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"
	],
	[
		"e7a1",
		"隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙"
	],
	[
		"e8a1",
		"茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"
	],
	[
		"e9a1",
		"蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙"
	],
	[
		"eaa1",
		"蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"
	],
	[
		"eba1",
		"襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫"
	],
	[
		"eca1",
		"譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"
	],
	[
		"eda1",
		"蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸"
	],
	[
		"eea1",
		"遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"
	],
	[
		"efa1",
		"錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞"
	],
	[
		"f0a1",
		"陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"
	],
	[
		"f1a1",
		"顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷"
	],
	[
		"f2a1",
		"髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"
	],
	[
		"f3a1",
		"鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠"
	],
	[
		"f4a1",
		"堯槇遙瑤凜熙"
	],
	[
		"f9a1",
		"纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德"
	],
	[
		"faa1",
		"忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"
	],
	[
		"fba1",
		"犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚"
	],
	[
		"fca1",
		"釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
	],
	[
		"fcf1",
		"ⅰ",
		9,
		"￢￤＇＂"
	],
	[
		"8fa2af",
		"˘ˇ¸˙˝¯˛˚～΄΅"
	],
	[
		"8fa2c2",
		"¡¦¿"
	],
	[
		"8fa2eb",
		"ºª©®™¤№"
	],
	[
		"8fa6e1",
		"ΆΈΉΊΪ"
	],
	[
		"8fa6e7",
		"Ό"
	],
	[
		"8fa6e9",
		"ΎΫ"
	],
	[
		"8fa6ec",
		"Ώ"
	],
	[
		"8fa6f1",
		"άέήίϊΐόςύϋΰώ"
	],
	[
		"8fa7c2",
		"Ђ",
		10,
		"ЎЏ"
	],
	[
		"8fa7f2",
		"ђ",
		10,
		"ўџ"
	],
	[
		"8fa9a1",
		"ÆĐ"
	],
	[
		"8fa9a4",
		"Ħ"
	],
	[
		"8fa9a6",
		"Ĳ"
	],
	[
		"8fa9a8",
		"ŁĿ"
	],
	[
		"8fa9ab",
		"ŊØŒ"
	],
	[
		"8fa9af",
		"ŦÞ"
	],
	[
		"8fa9c1",
		"æđðħıĳĸłŀŉŋøœßŧþ"
	],
	[
		"8faaa1",
		"ÁÀÄÂĂǍĀĄÅÃĆĈČÇĊĎÉÈËÊĚĖĒĘ"
	],
	[
		"8faaba",
		"ĜĞĢĠĤÍÌÏÎǏİĪĮĨĴĶĹĽĻŃŇŅÑÓÒÖÔǑŐŌÕŔŘŖŚŜŠŞŤŢÚÙÜÛŬǓŰŪŲŮŨǗǛǙǕŴÝŸŶŹŽŻ"
	],
	[
		"8faba1",
		"áàäâăǎāąåãćĉčçċďéèëêěėēęǵĝğ"
	],
	[
		"8fabbd",
		"ġĥíìïîǐ"
	],
	[
		"8fabc5",
		"īįĩĵķĺľļńňņñóòöôǒőōõŕřŗśŝšşťţúùüûŭǔűūųůũǘǜǚǖŵýÿŷźžż"
	],
	[
		"8fb0a1",
		"丂丄丅丌丒丟丣两丨丫丮丯丰丵乀乁乄乇乑乚乜乣乨乩乴乵乹乿亍亖亗亝亯亹仃仐仚仛仠仡仢仨仯仱仳仵份仾仿伀伂伃伈伋伌伒伕伖众伙伮伱你伳伵伷伹伻伾佀佂佈佉佋佌佒佔佖佘佟佣佪佬佮佱佷佸佹佺佽佾侁侂侄"
	],
	[
		"8fb1a1",
		"侅侉侊侌侎侐侒侓侔侗侙侚侞侟侲侷侹侻侼侽侾俀俁俅俆俈俉俋俌俍俏俒俜俠俢俰俲俼俽俿倀倁倄倇倊倌倎倐倓倗倘倛倜倝倞倢倧倮倰倲倳倵偀偁偂偅偆偊偌偎偑偒偓偗偙偟偠偢偣偦偧偪偭偰偱倻傁傃傄傆傊傎傏傐"
	],
	[
		"8fb2a1",
		"傒傓傔傖傛傜傞",
		4,
		"傪傯傰傹傺傽僀僃僄僇僌僎僐僓僔僘僜僝僟僢僤僦僨僩僯僱僶僺僾儃儆儇儈儋儌儍儎僲儐儗儙儛儜儝儞儣儧儨儬儭儯儱儳儴儵儸儹兂兊兏兓兕兗兘兟兤兦兾冃冄冋冎冘冝冡冣冭冸冺冼冾冿凂"
	],
	[
		"8fb3a1",
		"凈减凑凒凓凕凘凞凢凥凮凲凳凴凷刁刂刅划刓刕刖刘刢刨刱刲刵刼剅剉剕剗剘剚剜剟剠剡剦剮剷剸剹劀劂劅劊劌劓劕劖劗劘劚劜劤劥劦劧劯劰劶劷劸劺劻劽勀勄勆勈勌勏勑勔勖勛勜勡勥勨勩勪勬勰勱勴勶勷匀匃匊匋"
	],
	[
		"8fb4a1",
		"匌匑匓匘匛匜匞匟匥匧匨匩匫匬匭匰匲匵匼匽匾卂卌卋卙卛卡卣卥卬卭卲卹卾厃厇厈厎厓厔厙厝厡厤厪厫厯厲厴厵厷厸厺厽叀叅叏叒叓叕叚叝叞叠另叧叵吂吓吚吡吧吨吪启吱吴吵呃呄呇呍呏呞呢呤呦呧呩呫呭呮呴呿"
	],
	[
		"8fb5a1",
		"咁咃咅咈咉咍咑咕咖咜咟咡咦咧咩咪咭咮咱咷咹咺咻咿哆哊响哎哠哪哬哯哶哼哾哿唀唁唅唈唉唌唍唎唕唪唫唲唵唶唻唼唽啁啇啉啊啍啐啑啘啚啛啞啠啡啤啦啿喁喂喆喈喎喏喑喒喓喔喗喣喤喭喲喿嗁嗃嗆嗉嗋嗌嗎嗑嗒"
	],
	[
		"8fb6a1",
		"嗓嗗嗘嗛嗞嗢嗩嗶嗿嘅嘈嘊嘍",
		5,
		"嘙嘬嘰嘳嘵嘷嘹嘻嘼嘽嘿噀噁噃噄噆噉噋噍噏噔噞噠噡噢噣噦噩噭噯噱噲噵嚄嚅嚈嚋嚌嚕嚙嚚嚝嚞嚟嚦嚧嚨嚩嚫嚬嚭嚱嚳嚷嚾囅囉囊囋囏囐囌囍囙囜囝囟囡囤",
		4,
		"囱囫园"
	],
	[
		"8fb7a1",
		"囶囷圁圂圇圊圌圑圕圚圛圝圠圢圣圤圥圩圪圬圮圯圳圴圽圾圿坅坆坌坍坒坢坥坧坨坫坭",
		4,
		"坳坴坵坷坹坺坻坼坾垁垃垌垔垗垙垚垜垝垞垟垡垕垧垨垩垬垸垽埇埈埌埏埕埝埞埤埦埧埩埭埰埵埶埸埽埾埿堃堄堈堉埡"
	],
	[
		"8fb8a1",
		"堌堍堛堞堟堠堦堧堭堲堹堿塉塌塍塏塐塕塟塡塤塧塨塸塼塿墀墁墇墈墉墊墌墍墏墐墔墖墝墠墡墢墦墩墱墲壄墼壂壈壍壎壐壒壔壖壚壝壡壢壩壳夅夆夋夌夒夓夔虁夝夡夣夤夨夯夰夳夵夶夿奃奆奒奓奙奛奝奞奟奡奣奫奭"
	],
	[
		"8fb9a1",
		"奯奲奵奶她奻奼妋妌妎妒妕妗妟妤妧妭妮妯妰妳妷妺妼姁姃姄姈姊姍姒姝姞姟姣姤姧姮姯姱姲姴姷娀娄娌娍娎娒娓娞娣娤娧娨娪娭娰婄婅婇婈婌婐婕婞婣婥婧婭婷婺婻婾媋媐媓媖媙媜媞媟媠媢媧媬媱媲媳媵媸媺媻媿"
	],
	[
		"8fbaa1",
		"嫄嫆嫈嫏嫚嫜嫠嫥嫪嫮嫵嫶嫽嬀嬁嬈嬗嬴嬙嬛嬝嬡嬥嬭嬸孁孋孌孒孖孞孨孮孯孼孽孾孿宁宄宆宊宎宐宑宓宔宖宨宩宬宭宯宱宲宷宺宼寀寁寍寏寖",
		4,
		"寠寯寱寴寽尌尗尞尟尣尦尩尫尬尮尰尲尵尶屙屚屜屢屣屧屨屩"
	],
	[
		"8fbba1",
		"屭屰屴屵屺屻屼屽岇岈岊岏岒岝岟岠岢岣岦岪岲岴岵岺峉峋峒峝峗峮峱峲峴崁崆崍崒崫崣崤崦崧崱崴崹崽崿嵂嵃嵆嵈嵕嵑嵙嵊嵟嵠嵡嵢嵤嵪嵭嵰嵹嵺嵾嵿嶁嶃嶈嶊嶒嶓嶔嶕嶙嶛嶟嶠嶧嶫嶰嶴嶸嶹巃巇巋巐巎巘巙巠巤"
	],
	[
		"8fbca1",
		"巩巸巹帀帇帍帒帔帕帘帟帠帮帨帲帵帾幋幐幉幑幖幘幛幜幞幨幪",
		4,
		"幰庀庋庎庢庤庥庨庪庬庱庳庽庾庿廆廌廋廎廑廒廔廕廜廞廥廫异弆弇弈弎弙弜弝弡弢弣弤弨弫弬弮弰弴弶弻弽弿彀彄彅彇彍彐彔彘彛彠彣彤彧"
	],
	[
		"8fbda1",
		"彯彲彴彵彸彺彽彾徉徍徏徖徜徝徢徧徫徤徬徯徰徱徸忄忇忈忉忋忐",
		4,
		"忞忡忢忨忩忪忬忭忮忯忲忳忶忺忼怇怊怍怓怔怗怘怚怟怤怭怳怵恀恇恈恉恌恑恔恖恗恝恡恧恱恾恿悂悆悈悊悎悑悓悕悘悝悞悢悤悥您悰悱悷"
	],
	[
		"8fbea1",
		"悻悾惂惄惈惉惊惋惎惏惔惕惙惛惝惞惢惥惲惵惸惼惽愂愇愊愌愐",
		4,
		"愖愗愙愜愞愢愪愫愰愱愵愶愷愹慁慅慆慉慞慠慬慲慸慻慼慿憀憁憃憄憋憍憒憓憗憘憜憝憟憠憥憨憪憭憸憹憼懀懁懂懎懏懕懜懝懞懟懡懢懧懩懥"
	],
	[
		"8fbfa1",
		"懬懭懯戁戃戄戇戓戕戜戠戢戣戧戩戫戹戽扂扃扄扆扌扐扑扒扔扖扚扜扤扭扯扳扺扽抍抎抏抐抦抨抳抶抷抺抾抿拄拎拕拖拚拪拲拴拼拽挃挄挊挋挍挐挓挖挘挩挪挭挵挶挹挼捁捂捃捄捆捊捋捎捒捓捔捘捛捥捦捬捭捱捴捵"
	],
	[
		"8fc0a1",
		"捸捼捽捿掂掄掇掊掐掔掕掙掚掞掤掦掭掮掯掽揁揅揈揎揑揓揔揕揜揠揥揪揬揲揳揵揸揹搉搊搐搒搔搘搞搠搢搤搥搩搪搯搰搵搽搿摋摏摑摒摓摔摚摛摜摝摟摠摡摣摭摳摴摻摽撅撇撏撐撑撘撙撛撝撟撡撣撦撨撬撳撽撾撿"
	],
	[
		"8fc1a1",
		"擄擉擊擋擌擎擐擑擕擗擤擥擩擪擭擰擵擷擻擿攁攄攈攉攊攏攓攔攖攙攛攞攟攢攦攩攮攱攺攼攽敃敇敉敐敒敔敟敠敧敫敺敽斁斅斊斒斕斘斝斠斣斦斮斲斳斴斿旂旈旉旎旐旔旖旘旟旰旲旴旵旹旾旿昀昄昈昉昍昑昒昕昖昝"
	],
	[
		"8fc2a1",
		"昞昡昢昣昤昦昩昪昫昬昮昰昱昳昹昷晀晅晆晊晌晑晎晗晘晙晛晜晠晡曻晪晫晬晾晳晵晿晷晸晹晻暀晼暋暌暍暐暒暙暚暛暜暟暠暤暭暱暲暵暻暿曀曂曃曈曌曎曏曔曛曟曨曫曬曮曺朅朇朎朓朙朜朠朢朳朾杅杇杈杌杔杕杝"
	],
	[
		"8fc3a1",
		"杦杬杮杴杶杻极构枎枏枑枓枖枘枙枛枰枱枲枵枻枼枽柹柀柂柃柅柈柉柒柗柙柜柡柦柰柲柶柷桒栔栙栝栟栨栧栬栭栯栰栱栳栻栿桄桅桊桌桕桗桘桛桫桮",
		4,
		"桵桹桺桻桼梂梄梆梈梖梘梚梜梡梣梥梩梪梮梲梻棅棈棌棏"
	],
	[
		"8fc4a1",
		"棐棑棓棖棙棜棝棥棨棪棫棬棭棰棱棵棶棻棼棽椆椉椊椐椑椓椖椗椱椳椵椸椻楂楅楉楎楗楛楣楤楥楦楨楩楬楰楱楲楺楻楿榀榍榒榖榘榡榥榦榨榫榭榯榷榸榺榼槅槈槑槖槗槢槥槮槯槱槳槵槾樀樁樃樏樑樕樚樝樠樤樨樰樲"
	],
	[
		"8fc5a1",
		"樴樷樻樾樿橅橆橉橊橎橐橑橒橕橖橛橤橧橪橱橳橾檁檃檆檇檉檋檑檛檝檞檟檥檫檯檰檱檴檽檾檿櫆櫉櫈櫌櫐櫔櫕櫖櫜櫝櫤櫧櫬櫰櫱櫲櫼櫽欂欃欆欇欉欏欐欑欗欛欞欤欨欫欬欯欵欶欻欿歆歊歍歒歖歘歝歠歧歫歮歰歵歽"
	],
	[
		"8fc6a1",
		"歾殂殅殗殛殟殠殢殣殨殩殬殭殮殰殸殹殽殾毃毄毉毌毖毚毡毣毦毧毮毱毷毹毿氂氄氅氉氍氎氐氒氙氟氦氧氨氬氮氳氵氶氺氻氿汊汋汍汏汒汔汙汛汜汫汭汯汴汶汸汹汻沅沆沇沉沔沕沗沘沜沟沰沲沴泂泆泍泏泐泑泒泔泖"
	],
	[
		"8fc7a1",
		"泚泜泠泧泩泫泬泮泲泴洄洇洊洎洏洑洓洚洦洧洨汧洮洯洱洹洼洿浗浞浟浡浥浧浯浰浼涂涇涑涒涔涖涗涘涪涬涴涷涹涽涿淄淈淊淎淏淖淛淝淟淠淢淥淩淯淰淴淶淼渀渄渞渢渧渲渶渹渻渼湄湅湈湉湋湏湑湒湓湔湗湜湝湞"
	],
	[
		"8fc8a1",
		"湢湣湨湳湻湽溍溓溙溠溧溭溮溱溳溻溿滀滁滃滇滈滊滍滎滏滫滭滮滹滻滽漄漈漊漌漍漖漘漚漛漦漩漪漯漰漳漶漻漼漭潏潑潒潓潗潙潚潝潞潡潢潨潬潽潾澃澇澈澋澌澍澐澒澓澔澖澚澟澠澥澦澧澨澮澯澰澵澶澼濅濇濈濊"
	],
	[
		"8fc9a1",
		"濚濞濨濩濰濵濹濼濽瀀瀅瀆瀇瀍瀗瀠瀣瀯瀴瀷瀹瀼灃灄灈灉灊灋灔灕灝灞灎灤灥灬灮灵灶灾炁炅炆炔",
		4,
		"炛炤炫炰炱炴炷烊烑烓烔烕烖烘烜烤烺焃",
		4,
		"焋焌焏焞焠焫焭焯焰焱焸煁煅煆煇煊煋煐煒煗煚煜煞煠"
	],
	[
		"8fcaa1",
		"煨煹熀熅熇熌熒熚熛熠熢熯熰熲熳熺熿燀燁燄燋燌燓燖燙燚燜燸燾爀爇爈爉爓爗爚爝爟爤爫爯爴爸爹牁牂牃牅牎牏牐牓牕牖牚牜牞牠牣牨牫牮牯牱牷牸牻牼牿犄犉犍犎犓犛犨犭犮犱犴犾狁狇狉狌狕狖狘狟狥狳狴狺狻"
	],
	[
		"8fcba1",
		"狾猂猄猅猇猋猍猒猓猘猙猞猢猤猧猨猬猱猲猵猺猻猽獃獍獐獒獖獘獝獞獟獠獦獧獩獫獬獮獯獱獷獹獼玀玁玃玅玆玎玐玓玕玗玘玜玞玟玠玢玥玦玪玫玭玵玷玹玼玽玿珅珆珉珋珌珏珒珓珖珙珝珡珣珦珧珩珴珵珷珹珺珻珽"
	],
	[
		"8fcca1",
		"珿琀琁琄琇琊琑琚琛琤琦琨",
		9,
		"琹瑀瑃瑄瑆瑇瑋瑍瑑瑒瑗瑝瑢瑦瑧瑨瑫瑭瑮瑱瑲璀璁璅璆璇璉璏璐璑璒璘璙璚璜璟璠璡璣璦璨璩璪璫璮璯璱璲璵璹璻璿瓈瓉瓌瓐瓓瓘瓚瓛瓞瓟瓤瓨瓪瓫瓯瓴瓺瓻瓼瓿甆"
	],
	[
		"8fcda1",
		"甒甖甗甠甡甤甧甩甪甯甶甹甽甾甿畀畃畇畈畎畐畒畗畞畟畡畯畱畹",
		5,
		"疁疅疐疒疓疕疙疜疢疤疴疺疿痀痁痄痆痌痎痏痗痜痟痠痡痤痧痬痮痯痱痹瘀瘂瘃瘄瘇瘈瘊瘌瘏瘒瘓瘕瘖瘙瘛瘜瘝瘞瘣瘥瘦瘩瘭瘲瘳瘵瘸瘹"
	],
	[
		"8fcea1",
		"瘺瘼癊癀癁癃癄癅癉癋癕癙癟癤癥癭癮癯癱癴皁皅皌皍皕皛皜皝皟皠皢",
		6,
		"皪皭皽盁盅盉盋盌盎盔盙盠盦盨盬盰盱盶盹盼眀眆眊眎眒眔眕眗眙眚眜眢眨眭眮眯眴眵眶眹眽眾睂睅睆睊睍睎睏睒睖睗睜睞睟睠睢"
	],
	[
		"8fcfa1",
		"睤睧睪睬睰睲睳睴睺睽瞀瞄瞌瞍瞔瞕瞖瞚瞟瞢瞧瞪瞮瞯瞱瞵瞾矃矉矑矒矕矙矞矟矠矤矦矪矬矰矱矴矸矻砅砆砉砍砎砑砝砡砢砣砭砮砰砵砷硃硄硇硈硌硎硒硜硞硠硡硣硤硨硪确硺硾碊碏碔碘碡碝碞碟碤碨碬碭碰碱碲碳"
	],
	[
		"8fd0a1",
		"碻碽碿磇磈磉磌磎磒磓磕磖磤磛磟磠磡磦磪磲磳礀磶磷磺磻磿礆礌礐礚礜礞礟礠礥礧礩礭礱礴礵礻礽礿祄祅祆祊祋祏祑祔祘祛祜祧祩祫祲祹祻祼祾禋禌禑禓禔禕禖禘禛禜禡禨禩禫禯禱禴禸离秂秄秇秈秊秏秔秖秚秝秞"
	],
	[
		"8fd1a1",
		"秠秢秥秪秫秭秱秸秼稂稃稇稉稊稌稑稕稛稞稡稧稫稭稯稰稴稵稸稹稺穄穅穇穈穌穕穖穙穜穝穟穠穥穧穪穭穵穸穾窀窂窅窆窊窋窐窑窔窞窠窣窬窳窵窹窻窼竆竉竌竎竑竛竨竩竫竬竱竴竻竽竾笇笔笟笣笧笩笪笫笭笮笯笰"
	],
	[
		"8fd2a1",
		"笱笴笽笿筀筁筇筎筕筠筤筦筩筪筭筯筲筳筷箄箉箎箐箑箖箛箞箠箥箬箯箰箲箵箶箺箻箼箽篂篅篈篊篔篖篗篙篚篛篨篪篲篴篵篸篹篺篼篾簁簂簃簄簆簉簋簌簎簏簙簛簠簥簦簨簬簱簳簴簶簹簺籆籊籕籑籒籓籙",
		5
	],
	[
		"8fd3a1",
		"籡籣籧籩籭籮籰籲籹籼籽粆粇粏粔粞粠粦粰粶粷粺粻粼粿糄糇糈糉糍糏糓糔糕糗糙糚糝糦糩糫糵紃紇紈紉紏紑紒紓紖紝紞紣紦紪紭紱紼紽紾絀絁絇絈絍絑絓絗絙絚絜絝絥絧絪絰絸絺絻絿綁綂綃綅綆綈綋綌綍綑綖綗綝"
	],
	[
		"8fd4a1",
		"綞綦綧綪綳綶綷綹緂",
		4,
		"緌緍緎緗緙縀緢緥緦緪緫緭緱緵緶緹緺縈縐縑縕縗縜縝縠縧縨縬縭縯縳縶縿繄繅繇繎繐繒繘繟繡繢繥繫繮繯繳繸繾纁纆纇纊纍纑纕纘纚纝纞缼缻缽缾缿罃罄罇罏罒罓罛罜罝罡罣罤罥罦罭"
	],
	[
		"8fd5a1",
		"罱罽罾罿羀羋羍羏羐羑羖羗羜羡羢羦羪羭羴羼羿翀翃翈翎翏翛翟翣翥翨翬翮翯翲翺翽翾翿耇耈耊耍耎耏耑耓耔耖耝耞耟耠耤耦耬耮耰耴耵耷耹耺耼耾聀聄聠聤聦聭聱聵肁肈肎肜肞肦肧肫肸肹胈胍胏胒胔胕胗胘胠胭胮"
	],
	[
		"8fd6a1",
		"胰胲胳胶胹胺胾脃脋脖脗脘脜脞脠脤脧脬脰脵脺脼腅腇腊腌腒腗腠腡腧腨腩腭腯腷膁膐膄膅膆膋膎膖膘膛膞膢膮膲膴膻臋臃臅臊臎臏臕臗臛臝臞臡臤臫臬臰臱臲臵臶臸臹臽臿舀舃舏舓舔舙舚舝舡舢舨舲舴舺艃艄艅艆"
	],
	[
		"8fd7a1",
		"艋艎艏艑艖艜艠艣艧艭艴艻艽艿芀芁芃芄芇芉芊芎芑芔芖芘芚芛芠芡芣芤芧芨芩芪芮芰芲芴芷芺芼芾芿苆苐苕苚苠苢苤苨苪苭苯苶苷苽苾茀茁茇茈茊茋荔茛茝茞茟茡茢茬茭茮茰茳茷茺茼茽荂荃荄荇荍荎荑荕荖荗荰荸"
	],
	[
		"8fd8a1",
		"荽荿莀莂莄莆莍莒莔莕莘莙莛莜莝莦莧莩莬莾莿菀菇菉菏菐菑菔菝荓菨菪菶菸菹菼萁萆萊萏萑萕萙莭萯萹葅葇葈葊葍葏葑葒葖葘葙葚葜葠葤葥葧葪葰葳葴葶葸葼葽蒁蒅蒒蒓蒕蒞蒦蒨蒩蒪蒯蒱蒴蒺蒽蒾蓀蓂蓇蓈蓌蓏蓓"
	],
	[
		"8fd9a1",
		"蓜蓧蓪蓯蓰蓱蓲蓷蔲蓺蓻蓽蔂蔃蔇蔌蔎蔐蔜蔞蔢蔣蔤蔥蔧蔪蔫蔯蔳蔴蔶蔿蕆蕏",
		4,
		"蕖蕙蕜",
		6,
		"蕤蕫蕯蕹蕺蕻蕽蕿薁薅薆薉薋薌薏薓薘薝薟薠薢薥薧薴薶薷薸薼薽薾薿藂藇藊藋藎薭藘藚藟藠藦藨藭藳藶藼"
	],
	[
		"8fdaa1",
		"藿蘀蘄蘅蘍蘎蘐蘑蘒蘘蘙蘛蘞蘡蘧蘩蘶蘸蘺蘼蘽虀虂虆虒虓虖虗虘虙虝虠",
		4,
		"虩虬虯虵虶虷虺蚍蚑蚖蚘蚚蚜蚡蚦蚧蚨蚭蚱蚳蚴蚵蚷蚸蚹蚿蛀蛁蛃蛅蛑蛒蛕蛗蛚蛜蛠蛣蛥蛧蚈蛺蛼蛽蜄蜅蜇蜋蜎蜏蜐蜓蜔蜙蜞蜟蜡蜣"
	],
	[
		"8fdba1",
		"蜨蜮蜯蜱蜲蜹蜺蜼蜽蜾蝀蝃蝅蝍蝘蝝蝡蝤蝥蝯蝱蝲蝻螃",
		6,
		"螋螌螐螓螕螗螘螙螞螠螣螧螬螭螮螱螵螾螿蟁蟈蟉蟊蟎蟕蟖蟙蟚蟜蟟蟢蟣蟤蟪蟫蟭蟱蟳蟸蟺蟿蠁蠃蠆蠉蠊蠋蠐蠙蠒蠓蠔蠘蠚蠛蠜蠞蠟蠨蠭蠮蠰蠲蠵"
	],
	[
		"8fdca1",
		"蠺蠼衁衃衅衈衉衊衋衎衑衕衖衘衚衜衟衠衤衩衱衹衻袀袘袚袛袜袟袠袨袪袺袽袾裀裊",
		4,
		"裑裒裓裛裞裧裯裰裱裵裷褁褆褍褎褏褕褖褘褙褚褜褠褦褧褨褰褱褲褵褹褺褾襀襂襅襆襉襏襒襗襚襛襜襡襢襣襫襮襰襳襵襺"
	],
	[
		"8fdda1",
		"襻襼襽覉覍覐覔覕覛覜覟覠覥覰覴覵覶覷覼觔",
		4,
		"觥觩觫觭觱觳觶觹觽觿訄訅訇訏訑訒訔訕訞訠訢訤訦訫訬訯訵訷訽訾詀詃詅詇詉詍詎詓詖詗詘詜詝詡詥詧詵詶詷詹詺詻詾詿誀誃誆誋誏誐誒誖誗誙誟誧誩誮誯誳"
	],
	[
		"8fdea1",
		"誶誷誻誾諃諆諈諉諊諑諓諔諕諗諝諟諬諰諴諵諶諼諿謅謆謋謑謜謞謟謊謭謰謷謼譂",
		4,
		"譈譒譓譔譙譍譞譣譭譶譸譹譼譾讁讄讅讋讍讏讔讕讜讞讟谸谹谽谾豅豇豉豋豏豑豓豔豗豘豛豝豙豣豤豦豨豩豭豳豵豶豻豾貆"
	],
	[
		"8fdfa1",
		"貇貋貐貒貓貙貛貜貤貹貺賅賆賉賋賏賖賕賙賝賡賨賬賯賰賲賵賷賸賾賿贁贃贉贒贗贛赥赩赬赮赿趂趄趈趍趐趑趕趞趟趠趦趫趬趯趲趵趷趹趻跀跅跆跇跈跊跎跑跔跕跗跙跤跥跧跬跰趼跱跲跴跽踁踄踅踆踋踑踔踖踠踡踢"
	],
	[
		"8fe0a1",
		"踣踦踧踱踳踶踷踸踹踽蹀蹁蹋蹍蹎蹏蹔蹛蹜蹝蹞蹡蹢蹩蹬蹭蹯蹰蹱蹹蹺蹻躂躃躉躐躒躕躚躛躝躞躢躧躩躭躮躳躵躺躻軀軁軃軄軇軏軑軔軜軨軮軰軱軷軹軺軭輀輂輇輈輏輐輖輗輘輞輠輡輣輥輧輨輬輭輮輴輵輶輷輺轀轁"
	],
	[
		"8fe1a1",
		"轃轇轏轑",
		4,
		"轘轝轞轥辝辠辡辤辥辦辵辶辸达迀迁迆迊迋迍运迒迓迕迠迣迤迨迮迱迵迶迻迾适逄逈逌逘逛逨逩逯逪逬逭逳逴逷逿遃遄遌遛遝遢遦遧遬遰遴遹邅邈邋邌邎邐邕邗邘邙邛邠邡邢邥邰邲邳邴邶邽郌邾郃"
	],
	[
		"8fe2a1",
		"郄郅郇郈郕郗郘郙郜郝郟郥郒郶郫郯郰郴郾郿鄀鄄鄅鄆鄈鄍鄐鄔鄖鄗鄘鄚鄜鄞鄠鄥鄢鄣鄧鄩鄮鄯鄱鄴鄶鄷鄹鄺鄼鄽酃酇酈酏酓酗酙酚酛酡酤酧酭酴酹酺酻醁醃醅醆醊醎醑醓醔醕醘醞醡醦醨醬醭醮醰醱醲醳醶醻醼醽醿"
	],
	[
		"8fe3a1",
		"釂釃釅釓釔釗釙釚釞釤釥釩釪釬",
		5,
		"釷釹釻釽鈀鈁鈄鈅鈆鈇鈉鈊鈌鈐鈒鈓鈖鈘鈜鈝鈣鈤鈥鈦鈨鈮鈯鈰鈳鈵鈶鈸鈹鈺鈼鈾鉀鉂鉃鉆鉇鉊鉍鉎鉏鉑鉘鉙鉜鉝鉠鉡鉥鉧鉨鉩鉮鉯鉰鉵",
		4,
		"鉻鉼鉽鉿銈銉銊銍銎銒銗"
	],
	[
		"8fe4a1",
		"銙銟銠銤銥銧銨銫銯銲銶銸銺銻銼銽銿",
		4,
		"鋅鋆鋇鋈鋋鋌鋍鋎鋐鋓鋕鋗鋘鋙鋜鋝鋟鋠鋡鋣鋥鋧鋨鋬鋮鋰鋹鋻鋿錀錂錈錍錑錔錕錜錝錞錟錡錤錥錧錩錪錳錴錶錷鍇鍈鍉鍐鍑鍒鍕鍗鍘鍚鍞鍤鍥鍧鍩鍪鍭鍯鍰鍱鍳鍴鍶"
	],
	[
		"8fe5a1",
		"鍺鍽鍿鎀鎁鎂鎈鎊鎋鎍鎏鎒鎕鎘鎛鎞鎡鎣鎤鎦鎨鎫鎴鎵鎶鎺鎩鏁鏄鏅鏆鏇鏉",
		4,
		"鏓鏙鏜鏞鏟鏢鏦鏧鏹鏷鏸鏺鏻鏽鐁鐂鐄鐈鐉鐍鐎鐏鐕鐖鐗鐟鐮鐯鐱鐲鐳鐴鐻鐿鐽鑃鑅鑈鑊鑌鑕鑙鑜鑟鑡鑣鑨鑫鑭鑮鑯鑱鑲钄钃镸镹"
	],
	[
		"8fe6a1",
		"镾閄閈閌閍閎閝閞閟閡閦閩閫閬閴閶閺閽閿闆闈闉闋闐闑闒闓闙闚闝闞闟闠闤闦阝阞阢阤阥阦阬阱阳阷阸阹阺阼阽陁陒陔陖陗陘陡陮陴陻陼陾陿隁隂隃隄隉隑隖隚隝隟隤隥隦隩隮隯隳隺雊雒嶲雘雚雝雞雟雩雯雱雺霂"
	],
	[
		"8fe7a1",
		"霃霅霉霚霛霝霡霢霣霨霱霳靁靃靊靎靏靕靗靘靚靛靣靧靪靮靳靶靷靸靻靽靿鞀鞉鞕鞖鞗鞙鞚鞞鞟鞢鞬鞮鞱鞲鞵鞶鞸鞹鞺鞼鞾鞿韁韄韅韇韉韊韌韍韎韐韑韔韗韘韙韝韞韠韛韡韤韯韱韴韷韸韺頇頊頙頍頎頔頖頜頞頠頣頦"
	],
	[
		"8fe8a1",
		"頫頮頯頰頲頳頵頥頾顄顇顊顑顒顓顖顗顙顚顢顣顥顦顪顬颫颭颮颰颴颷颸颺颻颿飂飅飈飌飡飣飥飦飧飪飳飶餂餇餈餑餕餖餗餚餛餜餟餢餦餧餫餱",
		4,
		"餹餺餻餼饀饁饆饇饈饍饎饔饘饙饛饜饞饟饠馛馝馟馦馰馱馲馵"
	],
	[
		"8fe9a1",
		"馹馺馽馿駃駉駓駔駙駚駜駞駧駪駫駬駰駴駵駹駽駾騂騃騄騋騌騐騑騖騞騠騢騣騤騧騭騮騳騵騶騸驇驁驄驊驋驌驎驑驔驖驝骪骬骮骯骲骴骵骶骹骻骾骿髁髃髆髈髎髐髒髕髖髗髛髜髠髤髥髧髩髬髲髳髵髹髺髽髿",
		4
	],
	[
		"8feaa1",
		"鬄鬅鬈鬉鬋鬌鬍鬎鬐鬒鬖鬙鬛鬜鬠鬦鬫鬭鬳鬴鬵鬷鬹鬺鬽魈魋魌魕魖魗魛魞魡魣魥魦魨魪",
		4,
		"魳魵魷魸魹魿鮀鮄鮅鮆鮇鮉鮊鮋鮍鮏鮐鮔鮚鮝鮞鮦鮧鮩鮬鮰鮱鮲鮷鮸鮻鮼鮾鮿鯁鯇鯈鯎鯐鯗鯘鯝鯟鯥鯧鯪鯫鯯鯳鯷鯸"
	],
	[
		"8feba1",
		"鯹鯺鯽鯿鰀鰂鰋鰏鰑鰖鰘鰙鰚鰜鰞鰢鰣鰦",
		4,
		"鰱鰵鰶鰷鰽鱁鱃鱄鱅鱉鱊鱎鱏鱐鱓鱔鱖鱘鱛鱝鱞鱟鱣鱩鱪鱜鱫鱨鱮鱰鱲鱵鱷鱻鳦鳲鳷鳹鴋鴂鴑鴗鴘鴜鴝鴞鴯鴰鴲鴳鴴鴺鴼鵅鴽鵂鵃鵇鵊鵓鵔鵟鵣鵢鵥鵩鵪鵫鵰鵶鵷鵻"
	],
	[
		"8feca1",
		"鵼鵾鶃鶄鶆鶊鶍鶎鶒鶓鶕鶖鶗鶘鶡鶪鶬鶮鶱鶵鶹鶼鶿鷃鷇鷉鷊鷔鷕鷖鷗鷚鷞鷟鷠鷥鷧鷩鷫鷮鷰鷳鷴鷾鸊鸂鸇鸎鸐鸑鸒鸕鸖鸙鸜鸝鹺鹻鹼麀麂麃麄麅麇麎麏麖麘麛麞麤麨麬麮麯麰麳麴麵黆黈黋黕黟黤黧黬黭黮黰黱黲黵"
	],
	[
		"8feda1",
		"黸黿鼂鼃鼉鼏鼐鼑鼒鼔鼖鼗鼙鼚鼛鼟鼢鼦鼪鼫鼯鼱鼲鼴鼷鼹鼺鼼鼽鼿齁齃",
		4,
		"齓齕齖齗齘齚齝齞齨齩齭",
		4,
		"齳齵齺齽龏龐龑龒龔龖龗龞龡龢龣龥"
	]
];

/***/ }),
/* 464 */
/***/ (function(module, exports) {

module.exports = {
	"uChars": [
		128,
		165,
		169,
		178,
		184,
		216,
		226,
		235,
		238,
		244,
		248,
		251,
		253,
		258,
		276,
		284,
		300,
		325,
		329,
		334,
		364,
		463,
		465,
		467,
		469,
		471,
		473,
		475,
		477,
		506,
		594,
		610,
		712,
		716,
		730,
		930,
		938,
		962,
		970,
		1026,
		1104,
		1106,
		8209,
		8215,
		8218,
		8222,
		8231,
		8241,
		8244,
		8246,
		8252,
		8365,
		8452,
		8454,
		8458,
		8471,
		8482,
		8556,
		8570,
		8596,
		8602,
		8713,
		8720,
		8722,
		8726,
		8731,
		8737,
		8740,
		8742,
		8748,
		8751,
		8760,
		8766,
		8777,
		8781,
		8787,
		8802,
		8808,
		8816,
		8854,
		8858,
		8870,
		8896,
		8979,
		9322,
		9372,
		9548,
		9588,
		9616,
		9622,
		9634,
		9652,
		9662,
		9672,
		9676,
		9680,
		9702,
		9735,
		9738,
		9793,
		9795,
		11906,
		11909,
		11913,
		11917,
		11928,
		11944,
		11947,
		11951,
		11956,
		11960,
		11964,
		11979,
		12284,
		12292,
		12312,
		12319,
		12330,
		12351,
		12436,
		12447,
		12535,
		12543,
		12586,
		12842,
		12850,
		12964,
		13200,
		13215,
		13218,
		13253,
		13263,
		13267,
		13270,
		13384,
		13428,
		13727,
		13839,
		13851,
		14617,
		14703,
		14801,
		14816,
		14964,
		15183,
		15471,
		15585,
		16471,
		16736,
		17208,
		17325,
		17330,
		17374,
		17623,
		17997,
		18018,
		18212,
		18218,
		18301,
		18318,
		18760,
		18811,
		18814,
		18820,
		18823,
		18844,
		18848,
		18872,
		19576,
		19620,
		19738,
		19887,
		40870,
		59244,
		59336,
		59367,
		59413,
		59417,
		59423,
		59431,
		59437,
		59443,
		59452,
		59460,
		59478,
		59493,
		63789,
		63866,
		63894,
		63976,
		63986,
		64016,
		64018,
		64021,
		64025,
		64034,
		64037,
		64042,
		65074,
		65093,
		65107,
		65112,
		65127,
		65132,
		65375,
		65510,
		65536
	],
	"gbChars": [
		0,
		36,
		38,
		45,
		50,
		81,
		89,
		95,
		96,
		100,
		103,
		104,
		105,
		109,
		126,
		133,
		148,
		172,
		175,
		179,
		208,
		306,
		307,
		308,
		309,
		310,
		311,
		312,
		313,
		341,
		428,
		443,
		544,
		545,
		558,
		741,
		742,
		749,
		750,
		805,
		819,
		820,
		7922,
		7924,
		7925,
		7927,
		7934,
		7943,
		7944,
		7945,
		7950,
		8062,
		8148,
		8149,
		8152,
		8164,
		8174,
		8236,
		8240,
		8262,
		8264,
		8374,
		8380,
		8381,
		8384,
		8388,
		8390,
		8392,
		8393,
		8394,
		8396,
		8401,
		8406,
		8416,
		8419,
		8424,
		8437,
		8439,
		8445,
		8482,
		8485,
		8496,
		8521,
		8603,
		8936,
		8946,
		9046,
		9050,
		9063,
		9066,
		9076,
		9092,
		9100,
		9108,
		9111,
		9113,
		9131,
		9162,
		9164,
		9218,
		9219,
		11329,
		11331,
		11334,
		11336,
		11346,
		11361,
		11363,
		11366,
		11370,
		11372,
		11375,
		11389,
		11682,
		11686,
		11687,
		11692,
		11694,
		11714,
		11716,
		11723,
		11725,
		11730,
		11736,
		11982,
		11989,
		12102,
		12336,
		12348,
		12350,
		12384,
		12393,
		12395,
		12397,
		12510,
		12553,
		12851,
		12962,
		12973,
		13738,
		13823,
		13919,
		13933,
		14080,
		14298,
		14585,
		14698,
		15583,
		15847,
		16318,
		16434,
		16438,
		16481,
		16729,
		17102,
		17122,
		17315,
		17320,
		17402,
		17418,
		17859,
		17909,
		17911,
		17915,
		17916,
		17936,
		17939,
		17961,
		18664,
		18703,
		18814,
		18962,
		19043,
		33469,
		33470,
		33471,
		33484,
		33485,
		33490,
		33497,
		33501,
		33505,
		33513,
		33520,
		33536,
		33550,
		37845,
		37921,
		37948,
		38029,
		38038,
		38064,
		38065,
		38066,
		38069,
		38075,
		38076,
		38078,
		39108,
		39109,
		39113,
		39114,
		39115,
		39116,
		39265,
		39394,
		189000
	]
};

/***/ }),
/* 465 */
/***/ (function(module, exports) {

module.exports = [
	[
		"0",
		"\u0000",
		128
	],
	[
		"a1",
		"｡",
		62
	],
	[
		"8140",
		"　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",
		9,
		"＋－±×"
	],
	[
		"8180",
		"÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓"
	],
	[
		"81b8",
		"∈∋⊆⊇⊂⊃∪∩"
	],
	[
		"81c8",
		"∧∨￢⇒⇔∀∃"
	],
	[
		"81da",
		"∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"
	],
	[
		"81f0",
		"Å‰♯♭♪†‡¶"
	],
	[
		"81fc",
		"◯"
	],
	[
		"824f",
		"０",
		9
	],
	[
		"8260",
		"Ａ",
		25
	],
	[
		"8281",
		"ａ",
		25
	],
	[
		"829f",
		"ぁ",
		82
	],
	[
		"8340",
		"ァ",
		62
	],
	[
		"8380",
		"ム",
		22
	],
	[
		"839f",
		"Α",
		16,
		"Σ",
		6
	],
	[
		"83bf",
		"α",
		16,
		"σ",
		6
	],
	[
		"8440",
		"А",
		5,
		"ЁЖ",
		25
	],
	[
		"8470",
		"а",
		5,
		"ёж",
		7
	],
	[
		"8480",
		"о",
		17
	],
	[
		"849f",
		"─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"
	],
	[
		"8740",
		"①",
		19,
		"Ⅰ",
		9
	],
	[
		"875f",
		"㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"
	],
	[
		"877e",
		"㍻"
	],
	[
		"8780",
		"〝〟№㏍℡㊤",
		4,
		"㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"
	],
	[
		"889f",
		"亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"
	],
	[
		"8940",
		"院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円"
	],
	[
		"8980",
		"園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"
	],
	[
		"8a40",
		"魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫"
	],
	[
		"8a80",
		"橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"
	],
	[
		"8b40",
		"機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救"
	],
	[
		"8b80",
		"朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"
	],
	[
		"8c40",
		"掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨"
	],
	[
		"8c80",
		"劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"
	],
	[
		"8d40",
		"后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降"
	],
	[
		"8d80",
		"項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"
	],
	[
		"8e40",
		"察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止"
	],
	[
		"8e80",
		"死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"
	],
	[
		"8f40",
		"宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳"
	],
	[
		"8f80",
		"準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"
	],
	[
		"9040",
		"拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨"
	],
	[
		"9080",
		"逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"
	],
	[
		"9140",
		"繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻"
	],
	[
		"9180",
		"操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"
	],
	[
		"9240",
		"叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄"
	],
	[
		"9280",
		"逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"
	],
	[
		"9340",
		"邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬"
	],
	[
		"9380",
		"凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"
	],
	[
		"9440",
		"如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅"
	],
	[
		"9480",
		"楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"
	],
	[
		"9540",
		"鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷"
	],
	[
		"9580",
		"斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"
	],
	[
		"9640",
		"法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆"
	],
	[
		"9680",
		"摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"
	],
	[
		"9740",
		"諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲"
	],
	[
		"9780",
		"沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"
	],
	[
		"9840",
		"蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"
	],
	[
		"989f",
		"弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"
	],
	[
		"9940",
		"僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭"
	],
	[
		"9980",
		"凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"
	],
	[
		"9a40",
		"咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸"
	],
	[
		"9a80",
		"噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"
	],
	[
		"9b40",
		"奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀"
	],
	[
		"9b80",
		"它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"
	],
	[
		"9c40",
		"廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠"
	],
	[
		"9c80",
		"怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"
	],
	[
		"9d40",
		"戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫"
	],
	[
		"9d80",
		"捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"
	],
	[
		"9e40",
		"曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎"
	],
	[
		"9e80",
		"梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"
	],
	[
		"9f40",
		"檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯"
	],
	[
		"9f80",
		"麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"
	],
	[
		"e040",
		"漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝"
	],
	[
		"e080",
		"烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"
	],
	[
		"e140",
		"瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿"
	],
	[
		"e180",
		"痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"
	],
	[
		"e240",
		"磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰"
	],
	[
		"e280",
		"窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"
	],
	[
		"e340",
		"紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷"
	],
	[
		"e380",
		"縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"
	],
	[
		"e440",
		"隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤"
	],
	[
		"e480",
		"艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"
	],
	[
		"e540",
		"蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬"
	],
	[
		"e580",
		"蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"
	],
	[
		"e640",
		"襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧"
	],
	[
		"e680",
		"諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"
	],
	[
		"e740",
		"蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜"
	],
	[
		"e780",
		"轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"
	],
	[
		"e840",
		"錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙"
	],
	[
		"e880",
		"閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"
	],
	[
		"e940",
		"顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃"
	],
	[
		"e980",
		"騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"
	],
	[
		"ea40",
		"鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯"
	],
	[
		"ea80",
		"黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠堯槇遙瑤凜熙"
	],
	[
		"ed40",
		"纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏"
	],
	[
		"ed80",
		"塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"
	],
	[
		"ee40",
		"犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙"
	],
	[
		"ee80",
		"蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
	],
	[
		"eeef",
		"ⅰ",
		9,
		"￢￤＇＂"
	],
	[
		"f040",
		"",
		62
	],
	[
		"f080",
		"",
		124
	],
	[
		"f140",
		"",
		62
	],
	[
		"f180",
		"",
		124
	],
	[
		"f240",
		"",
		62
	],
	[
		"f280",
		"",
		124
	],
	[
		"f340",
		"",
		62
	],
	[
		"f380",
		"",
		124
	],
	[
		"f440",
		"",
		62
	],
	[
		"f480",
		"",
		124
	],
	[
		"f540",
		"",
		62
	],
	[
		"f580",
		"",
		124
	],
	[
		"f640",
		"",
		62
	],
	[
		"f680",
		"",
		124
	],
	[
		"f740",
		"",
		62
	],
	[
		"f780",
		"",
		124
	],
	[
		"f840",
		"",
		62
	],
	[
		"f880",
		"",
		124
	],
	[
		"f940",
		""
	],
	[
		"fa40",
		"ⅰ",
		9,
		"Ⅰ",
		9,
		"￢￤＇＂㈱№℡∵纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊"
	],
	[
		"fa80",
		"兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯"
	],
	[
		"fb40",
		"涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神"
	],
	[
		"fb80",
		"祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙"
	],
	[
		"fc40",
		"髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
	]
];

/***/ }),
/* 466 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Buffer = __webpack_require__(12).Buffer;

// Note: UTF16-LE (or UCS2) codec is Node.js native. See encodings/internal.js

// == UTF16-BE codec. ==========================================================

exports.utf16be = Utf16BECodec;
function Utf16BECodec() {
}

Utf16BECodec.prototype.encoder = Utf16BEEncoder;
Utf16BECodec.prototype.decoder = Utf16BEDecoder;
Utf16BECodec.prototype.bomAware = true;


// -- Encoding

function Utf16BEEncoder() {
}

Utf16BEEncoder.prototype.write = function(str) {
    var buf = new Buffer(str, 'ucs2');
    for (var i = 0; i < buf.length; i += 2) {
        var tmp = buf[i]; buf[i] = buf[i+1]; buf[i+1] = tmp;
    }
    return buf;
}

Utf16BEEncoder.prototype.end = function() {
}


// -- Decoding

function Utf16BEDecoder() {
    this.overflowByte = -1;
}

Utf16BEDecoder.prototype.write = function(buf) {
    if (buf.length == 0)
        return '';

    var buf2 = new Buffer(buf.length + 1),
        i = 0, j = 0;

    if (this.overflowByte !== -1) {
        buf2[0] = buf[0];
        buf2[1] = this.overflowByte;
        i = 1; j = 2;
    }

    for (; i < buf.length-1; i += 2, j+= 2) {
        buf2[j] = buf[i+1];
        buf2[j+1] = buf[i];
    }

    this.overflowByte = (i == buf.length-1) ? buf[buf.length-1] : -1;

    return buf2.slice(0, j).toString('ucs2');
}

Utf16BEDecoder.prototype.end = function() {
}


// == UTF-16 codec =============================================================
// Decoder chooses automatically from UTF-16LE and UTF-16BE using BOM and space-based heuristic.
// Defaults to UTF-16LE, as it's prevalent and default in Node.
// http://en.wikipedia.org/wiki/UTF-16 and http://encoding.spec.whatwg.org/#utf-16le
// Decoder default can be changed: iconv.decode(buf, 'utf16', {defaultEncoding: 'utf-16be'});

// Encoder uses UTF-16LE and prepends BOM (which can be overridden with addBOM: false).

exports.utf16 = Utf16Codec;
function Utf16Codec(codecOptions, iconv) {
    this.iconv = iconv;
}

Utf16Codec.prototype.encoder = Utf16Encoder;
Utf16Codec.prototype.decoder = Utf16Decoder;


// -- Encoding (pass-through)

function Utf16Encoder(options, codec) {
    options = options || {};
    if (options.addBOM === undefined)
        options.addBOM = true;
    this.encoder = codec.iconv.getEncoder('utf-16le', options);
}

Utf16Encoder.prototype.write = function(str) {
    return this.encoder.write(str);
}

Utf16Encoder.prototype.end = function() {
    return this.encoder.end();
}


// -- Decoding

function Utf16Decoder(options, codec) {
    this.decoder = null;
    this.initialBytes = [];
    this.initialBytesLen = 0;

    this.options = options || {};
    this.iconv = codec.iconv;
}

Utf16Decoder.prototype.write = function(buf) {
    if (!this.decoder) {
        // Codec is not chosen yet. Accumulate initial bytes.
        this.initialBytes.push(buf);
        this.initialBytesLen += buf.length;
        
        if (this.initialBytesLen < 16) // We need more bytes to use space heuristic (see below)
            return '';

        // We have enough bytes -> detect endianness.
        var buf = Buffer.concat(this.initialBytes),
            encoding = detectEncoding(buf, this.options.defaultEncoding);
        this.decoder = this.iconv.getDecoder(encoding, this.options);
        this.initialBytes.length = this.initialBytesLen = 0;
    }

    return this.decoder.write(buf);
}

Utf16Decoder.prototype.end = function() {
    if (!this.decoder) {
        var buf = Buffer.concat(this.initialBytes),
            encoding = detectEncoding(buf, this.options.defaultEncoding);
        this.decoder = this.iconv.getDecoder(encoding, this.options);

        var res = this.decoder.write(buf),
            trail = this.decoder.end();

        return trail ? (res + trail) : res;
    }
    return this.decoder.end();
}

function detectEncoding(buf, defaultEncoding) {
    var enc = defaultEncoding || 'utf-16le';

    if (buf.length >= 2) {
        // Check BOM.
        if (buf[0] == 0xFE && buf[1] == 0xFF) // UTF-16BE BOM
            enc = 'utf-16be';
        else if (buf[0] == 0xFF && buf[1] == 0xFE) // UTF-16LE BOM
            enc = 'utf-16le';
        else {
            // No BOM found. Try to deduce encoding from initial content.
            // Most of the time, the content has ASCII chars (U+00**), but the opposite (U+**00) is uncommon.
            // So, we count ASCII as if it was LE or BE, and decide from that.
            var asciiCharsLE = 0, asciiCharsBE = 0, // Counts of chars in both positions
                _len = Math.min(buf.length - (buf.length % 2), 64); // Len is always even.

            for (var i = 0; i < _len; i += 2) {
                if (buf[i] === 0 && buf[i+1] !== 0) asciiCharsBE++;
                if (buf[i] !== 0 && buf[i+1] === 0) asciiCharsLE++;
            }

            if (asciiCharsBE > asciiCharsLE)
                enc = 'utf-16be';
            else if (asciiCharsBE < asciiCharsLE)
                enc = 'utf-16le';
        }
    }

    return enc;
}




/***/ }),
/* 467 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Buffer = __webpack_require__(12).Buffer;

// UTF-7 codec, according to https://tools.ietf.org/html/rfc2152
// See also below a UTF-7-IMAP codec, according to http://tools.ietf.org/html/rfc3501#section-5.1.3

exports.utf7 = Utf7Codec;
exports.unicode11utf7 = 'utf7'; // Alias UNICODE-1-1-UTF-7
function Utf7Codec(codecOptions, iconv) {
    this.iconv = iconv;
};

Utf7Codec.prototype.encoder = Utf7Encoder;
Utf7Codec.prototype.decoder = Utf7Decoder;
Utf7Codec.prototype.bomAware = true;


// -- Encoding

var nonDirectChars = /[^A-Za-z0-9'\(\),-\.\/:\? \n\r\t]+/g;

function Utf7Encoder(options, codec) {
    this.iconv = codec.iconv;
}

Utf7Encoder.prototype.write = function(str) {
    // Naive implementation.
    // Non-direct chars are encoded as "+<base64>-"; single "+" char is encoded as "+-".
    return new Buffer(str.replace(nonDirectChars, function(chunk) {
        return "+" + (chunk === '+' ? '' : 
            this.iconv.encode(chunk, 'utf16-be').toString('base64').replace(/=+$/, '')) 
            + "-";
    }.bind(this)));
}

Utf7Encoder.prototype.end = function() {
}


// -- Decoding

function Utf7Decoder(options, codec) {
    this.iconv = codec.iconv;
    this.inBase64 = false;
    this.base64Accum = '';
}

var base64Regex = /[A-Za-z0-9\/+]/;
var base64Chars = [];
for (var i = 0; i < 256; i++)
    base64Chars[i] = base64Regex.test(String.fromCharCode(i));

var plusChar = '+'.charCodeAt(0), 
    minusChar = '-'.charCodeAt(0),
    andChar = '&'.charCodeAt(0);

Utf7Decoder.prototype.write = function(buf) {
    var res = "", lastI = 0,
        inBase64 = this.inBase64,
        base64Accum = this.base64Accum;

    // The decoder is more involved as we must handle chunks in stream.

    for (var i = 0; i < buf.length; i++) {
        if (!inBase64) { // We're in direct mode.
            // Write direct chars until '+'
            if (buf[i] == plusChar) {
                res += this.iconv.decode(buf.slice(lastI, i), "ascii"); // Write direct chars.
                lastI = i+1;
                inBase64 = true;
            }
        } else { // We decode base64.
            if (!base64Chars[buf[i]]) { // Base64 ended.
                if (i == lastI && buf[i] == minusChar) {// "+-" -> "+"
                    res += "+";
                } else {
                    var b64str = base64Accum + buf.slice(lastI, i).toString();
                    res += this.iconv.decode(new Buffer(b64str, 'base64'), "utf16-be");
                }

                if (buf[i] != minusChar) // Minus is absorbed after base64.
                    i--;

                lastI = i+1;
                inBase64 = false;
                base64Accum = '';
            }
        }
    }

    if (!inBase64) {
        res += this.iconv.decode(buf.slice(lastI), "ascii"); // Write direct chars.
    } else {
        var b64str = base64Accum + buf.slice(lastI).toString();

        var canBeDecoded = b64str.length - (b64str.length % 8); // Minimal chunk: 2 quads -> 2x3 bytes -> 3 chars.
        base64Accum = b64str.slice(canBeDecoded); // The rest will be decoded in future.
        b64str = b64str.slice(0, canBeDecoded);

        res += this.iconv.decode(new Buffer(b64str, 'base64'), "utf16-be");
    }

    this.inBase64 = inBase64;
    this.base64Accum = base64Accum;

    return res;
}

Utf7Decoder.prototype.end = function() {
    var res = "";
    if (this.inBase64 && this.base64Accum.length > 0)
        res = this.iconv.decode(new Buffer(this.base64Accum, 'base64'), "utf16-be");

    this.inBase64 = false;
    this.base64Accum = '';
    return res;
}


// UTF-7-IMAP codec.
// RFC3501 Sec. 5.1.3 Modified UTF-7 (http://tools.ietf.org/html/rfc3501#section-5.1.3)
// Differences:
//  * Base64 part is started by "&" instead of "+"
//  * Direct characters are 0x20-0x7E, except "&" (0x26)
//  * In Base64, "," is used instead of "/"
//  * Base64 must not be used to represent direct characters.
//  * No implicit shift back from Base64 (should always end with '-')
//  * String must end in non-shifted position.
//  * "-&" while in base64 is not allowed.


exports.utf7imap = Utf7IMAPCodec;
function Utf7IMAPCodec(codecOptions, iconv) {
    this.iconv = iconv;
};

Utf7IMAPCodec.prototype.encoder = Utf7IMAPEncoder;
Utf7IMAPCodec.prototype.decoder = Utf7IMAPDecoder;
Utf7IMAPCodec.prototype.bomAware = true;


// -- Encoding

function Utf7IMAPEncoder(options, codec) {
    this.iconv = codec.iconv;
    this.inBase64 = false;
    this.base64Accum = new Buffer(6);
    this.base64AccumIdx = 0;
}

Utf7IMAPEncoder.prototype.write = function(str) {
    var inBase64 = this.inBase64,
        base64Accum = this.base64Accum,
        base64AccumIdx = this.base64AccumIdx,
        buf = new Buffer(str.length*5 + 10), bufIdx = 0;

    for (var i = 0; i < str.length; i++) {
        var uChar = str.charCodeAt(i);
        if (0x20 <= uChar && uChar <= 0x7E) { // Direct character or '&'.
            if (inBase64) {
                if (base64AccumIdx > 0) {
                    bufIdx += buf.write(base64Accum.slice(0, base64AccumIdx).toString('base64').replace(/\//g, ',').replace(/=+$/, ''), bufIdx);
                    base64AccumIdx = 0;
                }

                buf[bufIdx++] = minusChar; // Write '-', then go to direct mode.
                inBase64 = false;
            }

            if (!inBase64) {
                buf[bufIdx++] = uChar; // Write direct character

                if (uChar === andChar)  // Ampersand -> '&-'
                    buf[bufIdx++] = minusChar;
            }

        } else { // Non-direct character
            if (!inBase64) {
                buf[bufIdx++] = andChar; // Write '&', then go to base64 mode.
                inBase64 = true;
            }
            if (inBase64) {
                base64Accum[base64AccumIdx++] = uChar >> 8;
                base64Accum[base64AccumIdx++] = uChar & 0xFF;

                if (base64AccumIdx == base64Accum.length) {
                    bufIdx += buf.write(base64Accum.toString('base64').replace(/\//g, ','), bufIdx);
                    base64AccumIdx = 0;
                }
            }
        }
    }

    this.inBase64 = inBase64;
    this.base64AccumIdx = base64AccumIdx;

    return buf.slice(0, bufIdx);
}

Utf7IMAPEncoder.prototype.end = function() {
    var buf = new Buffer(10), bufIdx = 0;
    if (this.inBase64) {
        if (this.base64AccumIdx > 0) {
            bufIdx += buf.write(this.base64Accum.slice(0, this.base64AccumIdx).toString('base64').replace(/\//g, ',').replace(/=+$/, ''), bufIdx);
            this.base64AccumIdx = 0;
        }

        buf[bufIdx++] = minusChar; // Write '-', then go to direct mode.
        this.inBase64 = false;
    }

    return buf.slice(0, bufIdx);
}


// -- Decoding

function Utf7IMAPDecoder(options, codec) {
    this.iconv = codec.iconv;
    this.inBase64 = false;
    this.base64Accum = '';
}

var base64IMAPChars = base64Chars.slice();
base64IMAPChars[','.charCodeAt(0)] = true;

Utf7IMAPDecoder.prototype.write = function(buf) {
    var res = "", lastI = 0,
        inBase64 = this.inBase64,
        base64Accum = this.base64Accum;

    // The decoder is more involved as we must handle chunks in stream.
    // It is forgiving, closer to standard UTF-7 (for example, '-' is optional at the end).

    for (var i = 0; i < buf.length; i++) {
        if (!inBase64) { // We're in direct mode.
            // Write direct chars until '&'
            if (buf[i] == andChar) {
                res += this.iconv.decode(buf.slice(lastI, i), "ascii"); // Write direct chars.
                lastI = i+1;
                inBase64 = true;
            }
        } else { // We decode base64.
            if (!base64IMAPChars[buf[i]]) { // Base64 ended.
                if (i == lastI && buf[i] == minusChar) { // "&-" -> "&"
                    res += "&";
                } else {
                    var b64str = base64Accum + buf.slice(lastI, i).toString().replace(/,/g, '/');
                    res += this.iconv.decode(new Buffer(b64str, 'base64'), "utf16-be");
                }

                if (buf[i] != minusChar) // Minus may be absorbed after base64.
                    i--;

                lastI = i+1;
                inBase64 = false;
                base64Accum = '';
            }
        }
    }

    if (!inBase64) {
        res += this.iconv.decode(buf.slice(lastI), "ascii"); // Write direct chars.
    } else {
        var b64str = base64Accum + buf.slice(lastI).toString().replace(/,/g, '/');

        var canBeDecoded = b64str.length - (b64str.length % 8); // Minimal chunk: 2 quads -> 2x3 bytes -> 3 chars.
        base64Accum = b64str.slice(canBeDecoded); // The rest will be decoded in future.
        b64str = b64str.slice(0, canBeDecoded);

        res += this.iconv.decode(new Buffer(b64str, 'base64'), "utf16-be");
    }

    this.inBase64 = inBase64;
    this.base64Accum = base64Accum;

    return res;
}

Utf7IMAPDecoder.prototype.end = function() {
    var res = "";
    if (this.inBase64 && this.base64Accum.length > 0)
        res = this.iconv.decode(new Buffer(this.base64Accum, 'base64'), "utf16-be");

    this.inBase64 = false;
    this.base64Accum = '';
    return res;
}




/***/ }),
/* 468 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BOMChar = '\uFEFF';

exports.PrependBOM = PrependBOMWrapper
function PrependBOMWrapper(encoder, options) {
    this.encoder = encoder;
    this.addBOM = true;
}

PrependBOMWrapper.prototype.write = function(str) {
    if (this.addBOM) {
        str = BOMChar + str;
        this.addBOM = false;
    }

    return this.encoder.write(str);
}

PrependBOMWrapper.prototype.end = function() {
    return this.encoder.end();
}


//------------------------------------------------------------------------------

exports.StripBOM = StripBOMWrapper;
function StripBOMWrapper(decoder, options) {
    this.decoder = decoder;
    this.pass = false;
    this.options = options || {};
}

StripBOMWrapper.prototype.write = function(buf) {
    var res = this.decoder.write(buf);
    if (this.pass || !res)
        return res;

    if (res[0] === BOMChar) {
        res = res.slice(1);
        if (typeof this.options.stripBOM === 'function')
            this.options.stripBOM();
    }

    this.pass = true;
    return res;
}

StripBOMWrapper.prototype.end = function() {
    return this.decoder.end();
}



/***/ }),
/* 469 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Buffer = __webpack_require__(12).Buffer;

// == Extend Node primitives to use iconv-lite =================================

module.exports = function (iconv) {
    var original = undefined; // Place to keep original methods.

    // Node authors rewrote Buffer internals to make it compatible with
    // Uint8Array and we cannot patch key functions since then.
    iconv.supportsNodeEncodingsExtension = !(new Buffer(0) instanceof Uint8Array);

    iconv.extendNodeEncodings = function extendNodeEncodings() {
        if (original) return;
        original = {};

        if (!iconv.supportsNodeEncodingsExtension) {
            console.error("ACTION NEEDED: require('iconv-lite').extendNodeEncodings() is not supported in your version of Node");
            console.error("See more info at https://github.com/ashtuchkin/iconv-lite/wiki/Node-v4-compatibility");
            return;
        }

        var nodeNativeEncodings = {
            'hex': true, 'utf8': true, 'utf-8': true, 'ascii': true, 'binary': true, 
            'base64': true, 'ucs2': true, 'ucs-2': true, 'utf16le': true, 'utf-16le': true,
        };

        Buffer.isNativeEncoding = function(enc) {
            return enc && nodeNativeEncodings[enc.toLowerCase()];
        }

        // -- SlowBuffer -----------------------------------------------------------
        var SlowBuffer = __webpack_require__(12).SlowBuffer;

        original.SlowBufferToString = SlowBuffer.prototype.toString;
        SlowBuffer.prototype.toString = function(encoding, start, end) {
            encoding = String(encoding || 'utf8').toLowerCase();

            // Use native conversion when possible
            if (Buffer.isNativeEncoding(encoding))
                return original.SlowBufferToString.call(this, encoding, start, end);

            // Otherwise, use our decoding method.
            if (typeof start == 'undefined') start = 0;
            if (typeof end == 'undefined') end = this.length;
            return iconv.decode(this.slice(start, end), encoding);
        }

        original.SlowBufferWrite = SlowBuffer.prototype.write;
        SlowBuffer.prototype.write = function(string, offset, length, encoding) {
            // Support both (string, offset, length, encoding)
            // and the legacy (string, encoding, offset, length)
            if (isFinite(offset)) {
                if (!isFinite(length)) {
                    encoding = length;
                    length = undefined;
                }
            } else {  // legacy
                var swap = encoding;
                encoding = offset;
                offset = length;
                length = swap;
            }

            offset = +offset || 0;
            var remaining = this.length - offset;
            if (!length) {
                length = remaining;
            } else {
                length = +length;
                if (length > remaining) {
                    length = remaining;
                }
            }
            encoding = String(encoding || 'utf8').toLowerCase();

            // Use native conversion when possible
            if (Buffer.isNativeEncoding(encoding))
                return original.SlowBufferWrite.call(this, string, offset, length, encoding);

            if (string.length > 0 && (length < 0 || offset < 0))
                throw new RangeError('attempt to write beyond buffer bounds');

            // Otherwise, use our encoding method.
            var buf = iconv.encode(string, encoding);
            if (buf.length < length) length = buf.length;
            buf.copy(this, offset, 0, length);
            return length;
        }

        // -- Buffer ---------------------------------------------------------------

        original.BufferIsEncoding = Buffer.isEncoding;
        Buffer.isEncoding = function(encoding) {
            return Buffer.isNativeEncoding(encoding) || iconv.encodingExists(encoding);
        }

        original.BufferByteLength = Buffer.byteLength;
        Buffer.byteLength = SlowBuffer.byteLength = function(str, encoding) {
            encoding = String(encoding || 'utf8').toLowerCase();

            // Use native conversion when possible
            if (Buffer.isNativeEncoding(encoding))
                return original.BufferByteLength.call(this, str, encoding);

            // Slow, I know, but we don't have a better way yet.
            return iconv.encode(str, encoding).length;
        }

        original.BufferToString = Buffer.prototype.toString;
        Buffer.prototype.toString = function(encoding, start, end) {
            encoding = String(encoding || 'utf8').toLowerCase();

            // Use native conversion when possible
            if (Buffer.isNativeEncoding(encoding))
                return original.BufferToString.call(this, encoding, start, end);

            // Otherwise, use our decoding method.
            if (typeof start == 'undefined') start = 0;
            if (typeof end == 'undefined') end = this.length;
            return iconv.decode(this.slice(start, end), encoding);
        }

        original.BufferWrite = Buffer.prototype.write;
        Buffer.prototype.write = function(string, offset, length, encoding) {
            var _offset = offset, _length = length, _encoding = encoding;
            // Support both (string, offset, length, encoding)
            // and the legacy (string, encoding, offset, length)
            if (isFinite(offset)) {
                if (!isFinite(length)) {
                    encoding = length;
                    length = undefined;
                }
            } else {  // legacy
                var swap = encoding;
                encoding = offset;
                offset = length;
                length = swap;
            }

            encoding = String(encoding || 'utf8').toLowerCase();

            // Use native conversion when possible
            if (Buffer.isNativeEncoding(encoding))
                return original.BufferWrite.call(this, string, _offset, _length, _encoding);

            offset = +offset || 0;
            var remaining = this.length - offset;
            if (!length) {
                length = remaining;
            } else {
                length = +length;
                if (length > remaining) {
                    length = remaining;
                }
            }

            if (string.length > 0 && (length < 0 || offset < 0))
                throw new RangeError('attempt to write beyond buffer bounds');

            // Otherwise, use our encoding method.
            var buf = iconv.encode(string, encoding);
            if (buf.length < length) length = buf.length;
            buf.copy(this, offset, 0, length);
            return length;

            // TODO: Set _charsWritten.
        }


        // -- Readable -------------------------------------------------------------
        if (iconv.supportsStreams) {
            var Readable = __webpack_require__(75).Readable;

            original.ReadableSetEncoding = Readable.prototype.setEncoding;
            Readable.prototype.setEncoding = function setEncoding(enc, options) {
                // Use our own decoder, it has the same interface.
                // We cannot use original function as it doesn't handle BOM-s.
                this._readableState.decoder = iconv.getDecoder(enc, options);
                this._readableState.encoding = enc;
            }

            Readable.prototype.collect = iconv._collect;
        }
    }

    // Remove iconv-lite Node primitive extensions.
    iconv.undoExtendNodeEncodings = function undoExtendNodeEncodings() {
        if (!iconv.supportsNodeEncodingsExtension)
            return;
        if (!original)
            throw new Error("require('iconv-lite').undoExtendNodeEncodings(): Nothing to undo; extendNodeEncodings() is not called.")

        delete Buffer.isNativeEncoding;

        var SlowBuffer = __webpack_require__(12).SlowBuffer;

        SlowBuffer.prototype.toString = original.SlowBufferToString;
        SlowBuffer.prototype.write = original.SlowBufferWrite;

        Buffer.isEncoding = original.BufferIsEncoding;
        Buffer.byteLength = original.BufferByteLength;
        Buffer.prototype.toString = original.BufferToString;
        Buffer.prototype.write = original.BufferWrite;

        if (iconv.supportsStreams) {
            var Readable = __webpack_require__(75).Readable;

            Readable.prototype.setEncoding = original.ReadableSetEncoding;
            delete Readable.prototype.collect;
        }

        original = undefined;
    }
}


/***/ }),
/* 470 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Some environments don't have global Buffer (e.g. React Native).
// Solution would be installing npm modules "buffer" and "stream" explicitly.
var Buffer = __webpack_require__(12).Buffer;

var bomHandling = __webpack_require__(468),
    iconv = module.exports;

// All codecs and aliases are kept here, keyed by encoding name/alias.
// They are lazy loaded in `iconv.getCodec` from `encodings/index.js`.
iconv.encodings = null;

// Characters emitted in case of error.
iconv.defaultCharUnicode = '�';
iconv.defaultCharSingleByte = '?';

// Public API.
iconv.encode = function encode(str, encoding, options) {
    str = "" + (str || ""); // Ensure string.

    var encoder = iconv.getEncoder(encoding, options);

    var res = encoder.write(str);
    var trail = encoder.end();
    
    return (trail && trail.length > 0) ? Buffer.concat([res, trail]) : res;
}

iconv.decode = function decode(buf, encoding, options) {
    if (typeof buf === 'string') {
        if (!iconv.skipDecodeWarning) {
            console.error('Iconv-lite warning: decode()-ing strings is deprecated. Refer to https://github.com/ashtuchkin/iconv-lite/wiki/Use-Buffers-when-decoding');
            iconv.skipDecodeWarning = true;
        }

        buf = new Buffer("" + (buf || ""), "binary"); // Ensure buffer.
    }

    var decoder = iconv.getDecoder(encoding, options);

    var res = decoder.write(buf);
    var trail = decoder.end();

    return trail ? (res + trail) : res;
}

iconv.encodingExists = function encodingExists(enc) {
    try {
        iconv.getCodec(enc);
        return true;
    } catch (e) {
        return false;
    }
}

// Legacy aliases to convert functions
iconv.toEncoding = iconv.encode;
iconv.fromEncoding = iconv.decode;

// Search for a codec in iconv.encodings. Cache codec data in iconv._codecDataCache.
iconv._codecDataCache = {};
iconv.getCodec = function getCodec(encoding) {
    if (!iconv.encodings)
        iconv.encodings = __webpack_require__(456); // Lazy load all encoding definitions.
    
    // Canonicalize encoding name: strip all non-alphanumeric chars and appended year.
    var enc = (''+encoding).toLowerCase().replace(/[^0-9a-z]|:\d{4}$/g, "");

    // Traverse iconv.encodings to find actual codec.
    var codecOptions = {};
    while (true) {
        var codec = iconv._codecDataCache[enc];
        if (codec)
            return codec;

        var codecDef = iconv.encodings[enc];

        switch (typeof codecDef) {
            case "string": // Direct alias to other encoding.
                enc = codecDef;
                break;

            case "object": // Alias with options. Can be layered.
                for (var key in codecDef)
                    codecOptions[key] = codecDef[key];

                if (!codecOptions.encodingName)
                    codecOptions.encodingName = enc;
                
                enc = codecDef.type;
                break;

            case "function": // Codec itself.
                if (!codecOptions.encodingName)
                    codecOptions.encodingName = enc;

                // The codec function must load all tables and return object with .encoder and .decoder methods.
                // It'll be called only once (for each different options object).
                codec = new codecDef(codecOptions, iconv);

                iconv._codecDataCache[codecOptions.encodingName] = codec; // Save it to be reused later.
                return codec;

            default:
                throw new Error("Encoding not recognized: '" + encoding + "' (searched as: '"+enc+"')");
        }
    }
}

iconv.getEncoder = function getEncoder(encoding, options) {
    var codec = iconv.getCodec(encoding),
        encoder = new codec.encoder(options, codec);

    if (codec.bomAware && options && options.addBOM)
        encoder = new bomHandling.PrependBOM(encoder, options);

    return encoder;
}

iconv.getDecoder = function getDecoder(encoding, options) {
    var codec = iconv.getCodec(encoding),
        decoder = new codec.decoder(options, codec);

    if (codec.bomAware && !(options && options.stripBOM === false))
        decoder = new bomHandling.StripBOM(decoder, options);

    return decoder;
}


// Load extensions in Node. All of them are omitted in Browserify build via 'browser' field in package.json.
var nodeVer = typeof process !== 'undefined' && process.versions && process.versions.node;
if (nodeVer) {

    // Load streaming support in Node v0.10+
    var nodeVerArr = nodeVer.split(".").map(Number);
    if (nodeVerArr[0] > 0 || nodeVerArr[1] >= 10) {
        __webpack_require__(471)(iconv);
    }

    // Load Node primitive extensions.
    __webpack_require__(469)(iconv);
}

if (false) {
    console.error("iconv-lite warning: javascript files are loaded not with utf-8 encoding. See https://github.com/ashtuchkin/iconv-lite/wiki/Javascript-source-file-encodings for more info.");
}


/***/ }),
/* 471 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Buffer = __webpack_require__(12).Buffer,
    Transform = __webpack_require__(75).Transform;


// == Exports ==================================================================
module.exports = function(iconv) {
    
    // Additional Public API.
    iconv.encodeStream = function encodeStream(encoding, options) {
        return new IconvLiteEncoderStream(iconv.getEncoder(encoding, options), options);
    }

    iconv.decodeStream = function decodeStream(encoding, options) {
        return new IconvLiteDecoderStream(iconv.getDecoder(encoding, options), options);
    }

    iconv.supportsStreams = true;


    // Not published yet.
    iconv.IconvLiteEncoderStream = IconvLiteEncoderStream;
    iconv.IconvLiteDecoderStream = IconvLiteDecoderStream;
    iconv._collect = IconvLiteDecoderStream.prototype.collect;
};


// == Encoder stream =======================================================
function IconvLiteEncoderStream(conv, options) {
    this.conv = conv;
    options = options || {};
    options.decodeStrings = false; // We accept only strings, so we don't need to decode them.
    Transform.call(this, options);
}

IconvLiteEncoderStream.prototype = Object.create(Transform.prototype, {
    constructor: { value: IconvLiteEncoderStream }
});

IconvLiteEncoderStream.prototype._transform = function(chunk, encoding, done) {
    if (typeof chunk != 'string')
        return done(new Error("Iconv encoding stream needs strings as its input."));
    try {
        var res = this.conv.write(chunk);
        if (res && res.length) this.push(res);
        done();
    }
    catch (e) {
        done(e);
    }
}

IconvLiteEncoderStream.prototype._flush = function(done) {
    try {
        var res = this.conv.end();
        if (res && res.length) this.push(res);
        done();
    }
    catch (e) {
        done(e);
    }
}

IconvLiteEncoderStream.prototype.collect = function(cb) {
    var chunks = [];
    this.on('error', cb);
    this.on('data', function(chunk) { chunks.push(chunk); });
    this.on('end', function() {
        cb(null, Buffer.concat(chunks));
    });
    return this;
}


// == Decoder stream =======================================================
function IconvLiteDecoderStream(conv, options) {
    this.conv = conv;
    options = options || {};
    options.encoding = this.encoding = 'utf8'; // We output strings.
    Transform.call(this, options);
}

IconvLiteDecoderStream.prototype = Object.create(Transform.prototype, {
    constructor: { value: IconvLiteDecoderStream }
});

IconvLiteDecoderStream.prototype._transform = function(chunk, encoding, done) {
    if (!Buffer.isBuffer(chunk))
        return done(new Error("Iconv decoding stream needs buffers as its input."));
    try {
        var res = this.conv.write(chunk);
        if (res && res.length) this.push(res, this.encoding);
        done();
    }
    catch (e) {
        done(e);
    }
}

IconvLiteDecoderStream.prototype._flush = function(done) {
    try {
        var res = this.conv.end();
        if (res && res.length) this.push(res, this.encoding);                
        done();
    }
    catch (e) {
        done(e);
    }
}

IconvLiteDecoderStream.prototype.collect = function(cb) {
    var res = '';
    this.on('error', cb);
    this.on('data', function(chunk) { res += chunk; });
    this.on('end', function() {
        cb(null, res);
    });
    return this;
}



/***/ }),
/* 472 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 473 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 474 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000
var m = s * 60
var h = m * 60
var d = h * 24
var y = d * 365.25

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {}
  var type = typeof val
  if (type === 'string' && val.length > 0) {
    return parse(val)
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ?
			fmtLong(val) :
			fmtShort(val)
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
}

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str)
  if (str.length > 10000) {
    return
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
  if (!match) {
    return
  }
  var n = parseFloat(match[1])
  var type = (match[2] || 'ms').toLowerCase()
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y
    case 'days':
    case 'day':
    case 'd':
      return n * d
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n
    default:
      return undefined
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd'
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h'
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm'
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's'
  }
  return ms + 'ms'
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms'
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name
  }
  return Math.ceil(ms / n) + ' ' + name + 's'
}


/***/ }),
/* 475 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(479)


/***/ }),
/* 476 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const EventEmitter = __webpack_require__(31).EventEmitter
const debug = __webpack_require__(187)('mssql')
const gp = __webpack_require__(438)

const TYPES = __webpack_require__(37).TYPES
const declare = __webpack_require__(37).declare
const ISOLATION_LEVEL = __webpack_require__(478)
const Table = __webpack_require__(193)
const ConnectionString = __webpack_require__(477)

let globalConnection = null
let PromiseLibrary = Promise
const globalConnectionHandlers = {}
const map = []
const driver = {}

/**
 * Register you own type map.
 *
 * @path module.exports.map
 * @param {*} jstype JS data type.
 * @param {*} sqltype SQL data type.
 */

map.register = function (jstype, sqltype) {
  for (let index = 0; index < this.length; index++) {
    let item = this[index]
    if (item.js === jstype) {
      this.splice(index, 1)
      break
    }
  }

  this.push({
    js: jstype,
    sql: sqltype
  })

  return null
}

map.register(String, TYPES.NVarChar)
map.register(Number, TYPES.Int)
map.register(Boolean, TYPES.Bit)
map.register(Date, TYPES.DateTime)
map.register(Buffer, TYPES.VarBinary)
map.register(Table, TYPES.TVP)

/**
 * @ignore
 */

let getTypeByValue = function (value) {
  if ((value === null) || (value === undefined)) { return TYPES.NVarChar }

  switch (typeof value) {
    case 'string':
      for (var item of Array.from(map)) {
        if (item.js === String) {
          return item.sql
        }
      }

      return TYPES.NVarChar

    case 'number':
      for (item of Array.from(map)) {
        if (item.js === Number) {
          return item.sql
        }
      }

      return TYPES.Int

    case 'boolean':
      for (item of Array.from(map)) {
        if (item.js === Boolean) {
          return item.sql
        }
      }

      return TYPES.Bit

    case 'object':
      for (item of Array.from(map)) {
        if (value instanceof item.js) {
          return item.sql
        }
      }

      return TYPES.NVarChar

    default:
      return TYPES.NVarChar
  }
}

/**
 * Class ConnectionPool.
 *
 * Internally, each `Connection` instance is a separate pool of TDS connections. Once you create a new `Request`/`Transaction`/`Prepared Statement`, a new TDS connection is acquired from the pool and reserved for desired action. Once the action is complete, connection is released back to the pool.
 *
 * @property {Boolean} connected If true, connection is established.
 * @property {Boolean} connecting If true, connection is being established.
 *
 * @fires ConnectionPool#connect
 * @fires ConnectionPool#close
 */

class ConnectionPool extends EventEmitter {
  /**
   * Create new Connection.
   *
   * @param {Object|String} config Connection configuration object or connection string.
   * @param {basicCallback} [callback] A callback which is called after connection has established, or an error has occurred.
   */

  constructor (config, callback) {
    super()

    this.config = config
    this._connected = false
    this._connecting = false

    if (typeof this.config === 'string') {
      try {
        this.config = ConnectionString.resolve(this.config, driver.name)
      } catch (ex) {
        if (typeof callback === 'function') {
          return callback(ex)
        }
        throw ex
      }
    }

    // set defaults
    this.config.port = this.config.port || 1433
    this.config.options = this.config.options || {}
    this.config.stream = this.config.stream || false
    this.config.parseJSON = this.config.parseJSON || false

    if (/^(.*)\\(.*)$/.exec(this.config.server)) {
      this.config.server = RegExp.$1
      this.config.options.instanceName = RegExp.$2
    }

    if (typeof callback === 'function') {
      this.connect(callback)
    }
  }

  get connected () {
    return this._connected
  }

  get connecting () {
    return this._connecting
  }

  /**
   * Acquire connection from this connection pool.
   *
   * @param {ConnectionPool|Transaction|PreparedStatement} requester Requester.
   * @param {acquireCallback} [callback] A callback which is called after connection has been acquired, or an error has occurred. If omited, method returns Promise.
   * @return {ConnectionPool|Promise}
   */

  acquire (requester, callback) {
    debug('conn: acquire')

    if (typeof callback === 'function') {
      this._acquire().then(connection => callback(null, connection, this.config)).catch(callback)
      return this
    }

    return this._acquire()
  }

  _acquire () {
    if (!this.pool) {
      return Promise.reject(new ConnectionError('Connection not yet open.', 'ENOTOPEN'))
    }

    return this.pool.acquire()
  }

  /**
   * Release connection back to the pool.
   *
   * @param {Connection} connection Previously acquired connection.
   * @return {ConnectionPool}
   */

  release (connection) {
    debug('conn: release')

    this.pool.release(connection)
    return this
  }

  /**
   * Creates a new connection pool with one active connection. This one initial connection serves as a probe to find out whether the configuration is valid.
   *
   * @param {basicCallback} [callback] A callback which is called after connection has established, or an error has occurred. If omited, method returns Promise.
   * @return {ConnectionPool|Promise}
   */

  connect (callback) {
    if (typeof callback === 'function') {
      this._connect(callback)
      return this
    }

    return new PromiseLibrary((resolve, reject) => {
      return this._connect(err => {
        if (err) return reject(err)
        resolve(this)
      })
    })
  }

  /**
   * @private
   * @param {basicCallback} callback
   */

  _connect (callback) {
    if (this._connected) {
      return callback(new ConnectionError('Database is already connected! Call close before connecting to different database.', 'EALREADYCONNECTED'))
    }

    if (this._connecting) {
      return callback(new ConnectionError('Already connecting to database! Call close before connecting to different database.', 'EALREADYCONNECTING'))
    }

    this._connecting = true

    // create one testing connection to check if everything is ok
    this._poolCreate().then((connection) => {
      this._poolDestroy(connection)
      if (!this._connecting) {
        // close was called before connection was established
        return // exit silently
      }

      // prepare pool
      this.pool = gp.createPool({
        create: this._poolCreate.bind(this),
        validate: this._poolValidate.bind(this),
        destroy: this._poolDestroy.bind(this)
      }, Object.assign({
        max: 10,
        min: 0,
        evictionRunIntervalMillis: 1000,
        idleTimeoutMillis: 30000,
        testOnBorrow: true
      }, this.config.pool))

      this.pool.on('factoryCreateError', this.emit.bind(this, 'error'))
      this.pool.on('factoryDestroyError', this.emit.bind(this, 'error'))

      this._connecting = false
      this._connected = true

      callback(null)
    }).catch(err => {
      this._connecting = false
      callback(err)
    })
  }

   /**
   * Close all active connections in the pool.
   *
   * @param {basicCallback} [callback] A callback which is called after connection has closed, or an error has occurred. If omited, method returns Promise.
   * @return {ConnectionPool|Promise}
   */

  close (callback) {
    if (typeof callback === 'function') {
      this._close(callback)
      return this
    }

    return new PromiseLibrary((resolve, reject) => {
      this._close(err => {
        if (err) return reject(err)
        resolve(this)
      })
    })
  }

  /**
   * @private
   * @param {basicCallback} callback
   */

  _close (callback) {
    this._connecting = this._connected = false

    if (!this.pool) return setImmediate(callback, null)

    const pool = this.pool
    this.pool.drain().then(() => {
      pool.clear()
      callback(null)
    })

    this.pool = null
  }

  /**
   * Returns new request using this connection.
   *
   * @return {Request}
   */

  request () {
    return new driver.Request(this)
  }

  /**
   * Returns new transaction using this connection.
   *
   * @return {Transaction}
   */

  transaction () {
    return new driver.Transaction(this)
  }

  /**
   * Creates a new query using this connection from a tagged template string.
   *
   * @param {Array} strings Array of string literals.
   * @param {...*} keys Values.
   * @return {Request}
   */

  query () {
    const values = Array.prototype.slice.call(arguments)
    const strings = values.shift()

    return new driver.Request(this)._template('query', strings, values)
  }

  /**
   * Creates a new batch using this connection from a tagged template string.
   *
   * @param {Array} strings Array of string literals.
   * @param {...*} keys Values.
   * @return {Request}
   */

  batch () {
    const values = Array.prototype.slice.call(arguments)
    const strings = values.shift()

    return new driver.Request(this)._template('batch', strings, values)
  }
}

/**
 * Class PreparedStatement.
 *
 * IMPORTANT: Rememeber that each prepared statement means one reserved connection from the pool. Don't forget to unprepare a prepared statement!
 *
 * @property {String} statement Prepared SQL statement.
 */

class PreparedStatement extends EventEmitter {
  /**
   * Creates a new Prepared Statement.
   *
   * @param {ConnectionPool|Transaction} [holder]
   */

  constructor (parent) {
    super()

    this.parent = parent || globalConnection
    this._handle = 0
    this.prepared = false
    this.parameters = {}
  }

  get connected () {
    return this.parent.connected
  }

  /**
   * Acquire connection from connection pool.
   *
   * @param {Request} request Request.
   * @param {ConnectionPool~acquireCallback} [callback] A callback which is called after connection has established, or an error has occurred. If omited, method returns Promise.
   * @return {PreparedStatement|Promise}
   */

  acquire (request, callback) {
    debug('ps: acquire')

    if (!this._acquiredConnection) {
      setImmediate(callback, new PreparedStatementError('Statement is not prepared. Call prepare() first.', 'ENOTPREPARED'))
      return this
    }

    if (this._activeRequest) {
      setImmediate(callback, new TransactionError("Can't acquire connection for the request. There is another request in progress.", 'EREQINPROG'))
      return this
    }

    debug('ps: acquire ok')

    this._activeRequest = request
    setImmediate(callback, null, this._acquiredConnection, this._acquiredConfig)
    return this
  }

  /**
   * Release connection back to the pool.
   *
   * @param {Connection} connection Previously acquired connection.
   * @return {PreparedStatement}
   */

  release (connection) {
    debug('ps: release')

    if (connection === this._acquiredConnection) {
      this._activeRequest = null
      debug('ps: release ok')
    }

    return this
  }

  /**
   * Add an input parameter to the prepared statement.
   *
   * @param {String} name Name of the input parameter without @ char.
   * @param {*} type SQL data type of input parameter.
   * @return {PreparedStatement}
   */

  input (name, type) {
    if ((/(--| |\/\*|\*\/|')/).test(name)) {
      throw new PreparedStatementError(`SQL injection warning for param '${name}'`, 'EINJECT')
    }

    if (arguments.length < 2) {
      throw new PreparedStatementError('Invalid number of arguments. 2 arguments expected.', 'EARGS')
    }

    if (type instanceof Function) {
      type = type()
    }

    this.parameters[name] = {
      name,
      type: type.type,
      io: 1,
      length: type.length,
      scale: type.scale,
      precision: type.precision,
      tvpType: type.tvpType
    }

    return this
  }

  /**
   * Add an output parameter to the prepared statement.
   *
   * @param {String} name Name of the output parameter without @ char.
   * @param {*} type SQL data type of output parameter.
   * @return {PreparedStatement}
   */

  output (name, type) {
    if (/(--| |\/\*|\*\/|')/.test(name)) {
      throw new PreparedStatementError(`SQL injection warning for param '${name}'`, 'EINJECT')
    }

    if (arguments.length < 2) {
      throw new PreparedStatementError('Invalid number of arguments. 2 arguments expected.', 'EARGS')
    }

    if (type instanceof Function) type = type()

    this.parameters[name] = {
      name,
      type: type.type,
      io: 2,
      length: type.length,
      scale: type.scale,
      precision: type.precision
    }

    return this
  }

  /**
   * Prepare a statement.
   *
   * @param {String} statement SQL statement to prepare.
   * @param {basicCallback} [callback] A callback which is called after preparation has completed, or an error has occurred. If omited, method returns Promise.
   * @return {PreparedStatement|Promise}
   */

  prepare (statement, callback) {
    if (typeof callback === 'function') {
      this._prepare(statement, callback)
      return this
    }

    return new PromiseLibrary((resolve, reject) => {
      this._prepare(statement, err => {
        if (err) return reject(err)
        resolve(this)
      })
    })
  }

  /**
   * @private
   * @param {String} statement
   * @param {basicCallback} callback
   */

  _prepare (statement, callback) {
    debug('ps: prepare')

    if (typeof statement === 'function') {
      callback = statement
      statement = undefined
    }

    if (this.prepared) {
      return setImmediate(callback, new PreparedStatementError('Statement is already prepared.', 'EALREADYPREPARED'))
    }

    this.statement = statement || this.statement

    this.parent.acquire(this, (err, connection, config) => {
      if (err) return callback(err)

      this._acquiredConnection = connection
      this._acquiredConfig = config

      const req = new driver.Request(this)
      req.stream = false
      req.output('handle', TYPES.Int)
      req.input('params', TYPES.NVarChar, ((() => {
        let result = []
        for (let name in this.parameters) {
          let param = this.parameters[name]
          result.push(`@${name} ${declare(param.type, param)}${param.io === 2 ? ' output' : ''}`)
        }
        return result
      })()).join(','))
      req.input('stmt', TYPES.NVarChar, this.statement)
      req.execute('sp_prepare', (err, result) => {
        if (err) {
          this.parent.release(this._acquiredConnection)
          this._acquiredConnection = null
          this._acquiredConfig = null

          return callback(err)
        }

        debug('ps: prepare ok')

        this._handle = result.output.handle
        this.prepared = true

        callback(null)
      })
    })
  }

  /**
   * Execute a prepared statement.
   *
   * @param {Object} values An object whose names correspond to the names of parameters that were added to the prepared statement before it was prepared.
   * @param {basicCallback} [callback] A callback which is called after execution has completed, or an error has occurred. If omited, method returns Promise.
   * @return {Request|Promise}
   */

  execute (values, callback) {
    if (this.stream || (typeof callback === 'function')) {
      return this._execute(values, callback)
    }

    return new PromiseLibrary((resolve, reject) => {
      this._execute(values, (err, recordset) => {
        if (err) return reject(err)
        resolve(recordset)
      })
    })
  }

  /**
   * @private
   * @param {Object} values
   * @param {basicCallback} callback
   */

  _execute (values, callback) {
    const req = new driver.Request(this)
    req.stream = this.stream
    req.input('handle', TYPES.Int, this._handle)

    // copy parameters with new values
    for (let name in this.parameters) {
      let param = this.parameters[name]
      req.parameters[name] = {
        name,
        type: param.type,
        io: param.io,
        value: values[name],
        length: param.length,
        scale: param.scale,
        precision: param.precision
      }
    }

    req.execute('sp_execute', (err, result) => {
      if (err) return callback(err)

      callback(null, result)
    })

    return req
  }

  /**
   * Unprepare a prepared statement.
   *
   * @param {basicCallback} [callback] A callback which is called after unpreparation has completed, or an error has occurred. If omited, method returns Promise.
   * @return {PreparedStatement|Promise}
   */

  unprepare (callback) {
    if (typeof callback === 'function') {
      this._unprepare(callback)
      return this
    }

    return new PromiseLibrary((resolve, reject) => {
      this._unprepare(err => {
        if (err) return reject(err)
        resolve()
      })
    })
  }

  /**
   * @private
   * @param {basicCallback} callback
   */

  _unprepare (callback) {
    debug('ps: unprepare')

    if (!this.prepared) {
      return setImmediate(callback, new PreparedStatementError('Statement is not prepared. Call prepare() first.', 'ENOTPREPARED'))
    }

    if (this._activeRequest) {
      return setImmediate(callback, new TransactionError("Can't unprepare the statement. There is a request in progress.", 'EREQINPROG'))
    }

    const req = new driver.Request(this)
    req.stream = false
    req.input('handle', TYPES.Int, this._handle)
    req.execute('sp_unprepare', err => {
      if (err) return callback(err)

      this.parent.release(this._acquiredConnection)
      this._acquiredConnection = null
      this._acquiredConfig = null
      this._handle = 0
      this.prepared = false

      debug('ps: unprepare ok')

      return callback(null)
    })
  }
}

/**
 * Class Transaction.
 *
 * @property {Number} isolationLevel Controls the locking and row versioning behavior of TSQL statements issued by a connection. READ_COMMITTED by default.
 * @property {String} name Transaction name. Empty string by default.
 *
 * @fires Transaction#begin
 * @fires Transaction#commit
 * @fires Transaction#rollback
 */

class Transaction extends EventEmitter {
  /**
   * Create new Transaction.
   *
   * @param {Connection} [holder] If ommited, global connection is used instead.
   */

  constructor (parent) {
    super()

    this.parent = parent || globalConnection
    this.isolationLevel = ISOLATION_LEVEL.READ_COMMITTED
    this.name = ''
  }

  get connected () {
    return this.parent.connected
  }

  /**
   * Acquire connection from connection pool.
   *
   * @param {Request} request Request.
   * @param {ConnectionPool~acquireCallback} [callback] A callback which is called after connection has established, or an error has occurred. If omited, method returns Promise.
   * @return {Transaction|Promise}
   */

  acquire (request, callback) {
    debug('tran: acquire')

    if (!this._acquiredConnection) {
      setImmediate(callback, new TransactionError('Transaction has not begun. Call begin() first.', 'ENOTBEGUN'))
      return this
    }

    if (this._activeRequest) {
      setImmediate(callback, new TransactionError("Can't acquire connection for the request. There is another request in progress.", 'EREQINPROG'))
      return this
    }

    debug('tran: acquire ok')

    this._activeRequest = request
    setImmediate(callback, null, this._acquiredConnection, this._acquiredConfig)
    return this
  }

  /**
   * Release connection back to the pool.
   *
   * @param {Connection} connection Previously acquired connection.
   * @return {Transaction}
   */

  release (connection) {
    debug('tran: release')

    if (connection === this._acquiredConnection) {
      this._activeRequest = null
      debug('tran: release ok')
    }

    return this
  }

  /**
   * Begin a transaction.
   *
   * @param {Number} [isolationLevel] Controls the locking and row versioning behavior of TSQL statements issued by a connection.
   * @param {basicCallback} [callback] A callback which is called after transaction has began, or an error has occurred. If omited, method returns Promise.
   * @return {Transaction|Promise}
   */

  begin (isolationLevel, callback) {
    if (isolationLevel instanceof Function) {
      callback = isolationLevel
      isolationLevel = undefined
    }

    if (typeof callback === 'function') {
      this._begin(isolationLevel, err => {
        if (!err) {
          this.emit('begin')
          debug('tran: begin ok')
        }
        callback(err)
      })
      return this
    }

    return new PromiseLibrary((resolve, reject) => {
      this._begin(isolationLevel, err => {
        if (err) return reject(err)
        this.emit('begin')
        debug('tran: begin ok')
        resolve(this)
      })
    })
  }

  /**
   * @private
   * @param {Number} [isolationLevel]
   * @param {basicCallback} [callback]
   * @return {Transaction}
   */

  _begin (isolationLevel, callback) {
    debug('tran: begin')

    if (this._acquiredConnection) {
      return setImmediate(callback, new TransactionError('Transaction has already begun.', 'EALREADYBEGUN'))
    }

    this._aborted = false
    this._rollbackRequested = false
    this.isolationLevel = isolationLevel || this.isolationLevel

    setImmediate(callback)
  }

  /**
   * Commit a transaction.
   *
   * @param {basicCallback} [callback] A callback which is called after transaction has commited, or an error has occurred. If omited, method returns Promise.
   * @return {Transaction|Promise}
   */

  commit (callback) {
    if (typeof callback === 'function') {
      this._commit(err => {
        if (!err) {
          this.emit('commit')
          debug('tran: commit')
        }
        callback(err)
      })
      return this
    }

    return new PromiseLibrary((resolve, reject) => {
      this._commit(err => {
        if (err) return reject(err)
        this.emit('commit')
        debug('tran: commit')
        resolve()
      })
    })
  }

  /**
   * @private
   * @param {basicCallback} [callback]
   * @return {Transaction}
   */

  _commit (callback) {
    debug('tran: commit')

    if (this._aborted) {
      return setImmediate(callback, new TransactionError('Transaction has been aborted.', 'EABORT'))
    }

    if (!this._acquiredConnection) {
      return setImmediate(callback, new TransactionError('Transaction has not begun. Call begin() first.', 'ENOTBEGUN'))
    }

    if (this._activeRequest) {
      return setImmediate(callback, new TransactionError("Can't commit transaction. There is a request in progress.", 'EREQINPROG'))
    }

    setImmediate(callback)
  }

  /**
   * Returns new request using this transaction.
   *
   * @return {Request}
   */

  request () {
    return new driver.Request(this)
  }

  /**
   * Rollback a transaction.
   *
   * @param {basicCallback} [callback] A callback which is called after transaction has rolled back, or an error has occurred. If omited, method returns Promise.
   * @return {Transaction|Promise}
   */

  rollback (callback) {
    if (typeof callback === 'function') {
      this._rollback(err => {
        if (!err) {
          this.emit('rollback', this._aborted)
          debug('tran: rollback ok')
        }
        callback(err)
      })
      return this
    }

    return new PromiseLibrary((resolve, reject) => {
      return this._rollback(err => {
        if (err) return reject(err)
        this.emit('rollback', this._aborted)
        debug('tran: rollback ok')
        resolve()
      })
    }
    )
  }

  /**
   * @private
   * @param {basicCallback} [callback]
   * @return {Transaction}
   */

  _rollback (callback) {
    debug('tran: rollback')

    if (this._aborted) {
      return setImmediate(callback, new TransactionError('Transaction has been aborted.', 'EABORT'))
    }

    if (!this._acquiredConnection) {
      return setImmediate(callback, new TransactionError('Transaction has not begun. Call begin() first.', 'ENOTBEGUN'))
    }

    if (this._activeRequest) {
      return setImmediate(callback, new TransactionError("Can't rollback transaction. There is a request in progress.", 'EREQINPROG'))
    }

    this._rollbackRequested = true

    setImmediate(callback)
  }
}

/**
 * Class Request.
 *
 * @property {Transaction} transaction Reference to transaction when request was created in transaction.
 * @property {*} parameters Collection of input and output parameters.
 * @property {Boolean} canceled `true` if request was canceled.
 *
 * @fires Request#recordset
 * @fires Request#row
 * @fires Request#done
 * @fires Request#error
 */

class Request extends EventEmitter {
  /**
   * Create new Request.
   *
   * @param {Connection|ConnectionPool|Transaction|PreparedStatement} parent If ommited, global connection is used instead.
   */

  constructor (parent) {
    super()

    this.canceled = false
    this.parent = parent || globalConnection
    this.parameters = {}
  }

  /**
   * Fetch request from tagged template string.
   *
   * @private
   * @param {String} method
   * @param {Array} strings
   * @param {Array} values
   * @return {Request}
   */

  _template (method, strings, values) {
    let command = [strings[0]]

    for (let index = 0; index < values.length; index++) {
      let value = values[index]
      this.input(`param${index + 1}`, value)
      command.push(`@param${index + 1}`, strings[index + 1])
    }

    return this[method](command.join(''))
  }

  /**
   * Add an input parameter to the request.
   *
   * @param {String} name Name of the input parameter without @ char.
   * @param {*} [type] SQL data type of input parameter. If you omit type, module automaticaly decide which SQL data type should be used based on JS data type.
   * @param {*} value Input parameter value. `undefined` and `NaN` values are automatically converted to `null` values.
   * @return {Request}
   */

  input (name, type, value) {
    if ((/(--| |\/\*|\*\/|')/).test(name)) {
      throw new RequestError(`SQL injection warning for param '${name}'`, 'EINJECT')
    }

    if (arguments.length === 1) {
      throw new RequestError('Invalid number of arguments. At least 2 arguments expected.', 'EARGS')
    } else if (arguments.length === 2) {
      value = type
      type = getTypeByValue(value)
    }

    // support for custom data types
    if (value && typeof value.valueOf === 'function' && !(value instanceof Date)) value = value.valueOf()

    if (value === undefined) value = null // undefined to null
    if (typeof value === 'number' && isNaN(value)) value = null // NaN to null
    if (type instanceof Function) type = type()

    this.parameters[name] = {
      name,
      type: type.type,
      io: 1,
      value,
      length: type.length,
      scale: type.scale,
      precision: type.precision,
      tvpType: type.tvpType
    }

    return this
  }

  /**
   * Add an output parameter to the request.
   *
   * @param {String} name Name of the output parameter without @ char.
   * @param {*} type SQL data type of output parameter.
   * @param {*} [value] Output parameter value initial value. `undefined` and `NaN` values are automatically converted to `null` values. Optional.
   * @return {Request}
   */

  output (name, type, value) {
    if (!type) { type = TYPES.NVarChar }

    if ((/(--| |\/\*|\*\/|')/).test(name)) {
      throw new RequestError(`SQL injection warning for param '${name}'`, 'EINJECT')
    }

    if ((type === TYPES.Text) || (type === TYPES.NText) || (type === TYPES.Image)) {
      throw new RequestError('Deprecated types (Text, NText, Image) are not supported as OUTPUT parameters.', 'EDEPRECATED')
    }

    // support for custom data types
    if (value && typeof value.valueOf === 'function' && !(value instanceof Date)) value = value.valueOf()

    if (value === undefined) value = null // undefined to null
    if (typeof value === 'number' && isNaN(value)) value = null // NaN to null
    if (type instanceof Function) type = type()

    this.parameters[name] = {
      name,
      type: type.type,
      io: 2,
      value,
      length: type.length,
      scale: type.scale,
      precision: type.precision
    }

    return this
  }

  /**
   * Execute the SQL batch.
   *
   * @param {String} batch T-SQL batch to be executed.
   * @param {Request~requestCallback} [callback] A callback which is called after execution has completed, or an error has occurred. If omited, method returns Promise.
   * @return {Request|Promise}
   */

  batch (batch, callback) {
    if (this.stream == null && this.connection) this.stream = this.connection.config.stream
    this.rowsAffected = 0

    if (typeof callback === 'function') {
      this._batch(batch, (err, recordsets, output, rowsAffected) => {
        if (this.stream) {
          if (err) this.emit('error', err)
          err = null

          this.emit('done', {
            output,
            rowsAffected
          })
        }

        if (err) return callback(err)
        callback(null, {
          recordsets,
          recordset: recordsets && recordsets[0],
          output,
          rowsAffected
        })
      })
      return this
    }

    return new PromiseLibrary((resolve, reject) => {
      this._batch(batch, (err, recordsets, output, rowsAffected) => {
        if (this.stream) {
          if (err) this.emit('error', err)
          err = null

          this.emit('done', {
            output,
            rowsAffected
          })
        }

        if (err) return reject(err)
        resolve({
          recordsets,
          recordset: recordsets && recordsets[0],
          output,
          rowsAffected
        })
      })
    })
  }

  /**
   * @private
   * @param {String} batch
   * @param {Request~requestCallback} callback
   */

  _batch (batch, callback) {
    if (!this.connection) {
      return setImmediate(callback, new RequestError('No connection is specified for that request.', 'ENOCONN'))
    }

    if (!this.connection.connected) {
      return setImmediate(callback, new ConnectionError('Connection is closed.', 'ECONNCLOSED'))
    }

    this.canceled = false
    setImmediate(callback)
  }

  /**
   * Bulk load.
   *
   * @param {Table} table SQL table.
   * @param {Request~bulkCallback} [callback] A callback which is called after bulk load has completed, or an error has occurred. If omited, method returns Promise.
   * @return {Request|Promise}
   */

  bulk (table, callback) {
    if (this.stream == null && this.connection) this.stream = this.connection.config.stream

    if (this.stream || typeof callback === 'function') {
      this._bulk(table, (err, rowsAffected) => {
        if (this.stream) {
          if (err) this.emit('error', err)
          return this.emit('done', {
            rowsAffected
          })
        }

        if (err) return callback(err)
        callback(null, {
          rowsAffected
        })
      })
      return this
    }

    return new PromiseLibrary((resolve, reject) => {
      this._bulk(table, (err, rowsAffected) => {
        if (err) return reject(err)
        resolve({
          rowsAffected
        })
      })
    })
  }

  /**
   * @private
   * @param {Table} table
   * @param {Request~bulkCallback} callback
   */

  _bulk (table, callback) {
    if (!this.parent) {
      return setImmediate(callback, new RequestError('No connection is specified for that request.', 'ENOCONN'))
    }

    if (!this.parent.connected) {
      return setImmediate(callback, new ConnectionError('Connection is closed.', 'ECONNCLOSED'))
    }

    this.canceled = false
    setImmediate(callback)
  }

  /**
   * Sets request to `stream` mode and pulls all rows from all recordsets to a given stream.
   *
   * @param {Stream} stream Stream to pipe data into.
   * @return {Stream}
   */

  pipe (stream) {
    this.stream = true
    this.on('row', stream.write.bind(stream))
    this.on('error', stream.emit.bind(stream, 'error'))
    this.on('done', () => {
      setImmediate(() => stream.end())
    })
    stream.emit('pipe', this)
    return stream
  }

  /**
   * Execute the SQL command.
   *
   * @param {String} command T-SQL command to be executed.
   * @param {Request~requestCallback} [callback] A callback which is called after execution has completed, or an error has occurred. If omited, method returns Promise.
   * @return {Request|Promise}
   */

  query (command, callback) {
    if (this.stream == null && this.connection) this.stream = this.connection.config.stream
    this.rowsAffected = 0

    if (typeof callback === 'function') {
      this._query(command, (err, recordsets, output, rowsAffected) => {
        if (this.stream) {
          if (err) this.emit('error', err)
          err = null

          this.emit('done', {
            output,
            rowsAffected
          })
        }

        if (err) return callback(err)
        callback(null, {
          recordsets,
          recordset: recordsets && recordsets[0],
          output,
          rowsAffected
        })
      })
      return this
    }

    return new PromiseLibrary((resolve, reject) => {
      this._query(command, (err, recordsets, output, rowsAffected) => {
        if (this.stream) {
          if (err) this.emit('error', err)
          err = null

          this.emit('done', {
            output,
            rowsAffected
          })
        }

        if (err) return reject(err)
        resolve({
          recordsets,
          recordset: recordsets && recordsets[0],
          output,
          rowsAffected
        })
      })
    })
  }

  /**
   * @private
   * @param {String} command
   * @param {Request~bulkCallback} callback
   */

  _query (command, callback) {
    if (!this.parent) {
      return setImmediate(callback, new RequestError('No connection is specified for that request.', 'ENOCONN'))
    }

    if (!this.parent.connected) {
      return setImmediate(callback, new ConnectionError('Connection is closed.', 'ECONNCLOSED'))
    }

    this.canceled = false
    setImmediate(callback)
  }

  /**
   * Call a stored procedure.
   *
   * @param {String} procedure Name of the stored procedure to be executed.
   * @param {Request~requestCallback} [callback] A callback which is called after execution has completed, or an error has occurred. If omited, method returns Promise.
   * @return {Request|Promise}
   */

  execute (command, callback) {
    if (this.stream == null && this.connection) this.stream = this.connection.config.stream
    this.rowsAffected = 0

    if (typeof callback === 'function') {
      this._execute(command, (err, recordsets, output, returnValue, rowsAffected) => {
        if (this.stream) {
          if (err) this.emit('error', err)
          err = null

          this.emit('done', {
            output,
            rowsAffected,
            returnValue
          })
        }

        if (err) return callback(err)
        callback(null, {
          recordsets,
          recordset: recordsets && recordsets[0],
          output,
          rowsAffected,
          returnValue
        })
      })
      return this
    }

    return new PromiseLibrary((resolve, reject) => {
      this._execute(command, (err, recordsets, output, returnValue, rowsAffected) => {
        if (this.stream) {
          if (err) this.emit('error', err)
          err = null

          this.emit('done', {
            output,
            rowsAffected,
            returnValue
          })
        }

        if (err) return reject(err)
        resolve({
          recordsets,
          recordset: recordsets && recordsets[0],
          output,
          rowsAffected,
          returnValue
        })
      })
    })
  }

  /**
   * @private
   * @param {String} procedure
   * @param {Request~bulkCallback} callback
   */

  _execute (procedure, callback) {
    if (!this.parent) {
      return setImmediate(callback, new RequestError('No connection is specified for that request.', 'ENOCONN'))
    }

    if (!this.parent.connected) {
      return setImmediate(callback, new ConnectionError('Connection is closed.', 'ECONNCLOSED'))
    }

    this.canceled = false
    setImmediate(callback)
  }

  /**
   * Cancel currently executed request.
   *
   * @return {Boolean}
   */

  cancel () {
    this._cancel()
    return true
  }

  /**
   * @private
   */

  _cancel () {
    this.canceled = true
  }
}

/**
 * Class ConnectionError.
 */

class ConnectionError extends Error {
  /**
   * Creates a new ConnectionError.
   *
   * @param {String} message Error message.
   * @param {String} [code] Error code.
   */

  constructor (message, code) {
    if (message instanceof Error) {
      super(message.message)
      this.code = message.code || code

      Error.captureStackTrace(this, this.constructor)
      Object.defineProperty(this, 'originalError', {enumerable: true, value: message})
    } else {
      super(message)
      this.code = code
    }

    this.name = 'ConnectionError'
  }
}

/**
 * Class TransactionError.
 */

class TransactionError extends Error {
  /**
   * Creates a new TransactionError.
   *
   * @param {String} message Error message.
   * @param {String} [code] Error code.
   */

  constructor (message, code) {
    if (message instanceof Error) {
      super(message.message)
      this.code = message.code || code

      Error.captureStackTrace(this, this.constructor)
      Object.defineProperty(this, 'originalError', {enumerable: true, value: message})
    } else {
      super(message)
      this.code = code
    }

    this.name = 'TransactionError'
  }
}

/**
 * Class RequestError.
 *
 * @property {String} number Error number.
 * @property {Number} lineNumber Line number.
 * @property {String} state Error state.
 * @property {String} class Error class.
 * @property {String} serverName Server name.
 * @property {String} procName Procedure name.
 */

class RequestError extends Error {
  /**
   * Creates a new RequestError.
   *
   * @param {String} message Error message.
   * @param {String} [code] Error code.
   */

  constructor (message, code) {
    if (message instanceof Error) {
      super(message.message)
      this.code = message.code || code

      if (message.info) {
        this.number = message.info.number || message.code // err.code is returned by msnodesql driver
        this.lineNumber = message.info.lineNumber
        this.state = message.info.state || message.sqlstate // err.sqlstate is returned by msnodesql driver
        this.class = message.info.class
        this.serverName = message.info.serverName
        this.procName = message.info.procName
      } else {
        this.number = message.code // err.code is returned by msnodesql driver
        this.state = message.sqlstate // err.sqlstate is returned by msnodesql driver
      }

      Error.captureStackTrace(this, this.constructor)
      Object.defineProperty(this, 'originalError', {enumerable: true, value: message})
    } else {
      super(message)
      this.code = code
    }

    this.name = 'RequestError'
    if ((/^\[Microsoft\]\[SQL Server Native Client 11\.0\](?:\[SQL Server\])?([\s\S]*)$/).exec(this.message)) {
      this.message = RegExp.$1
    }
  }
}

/**
 * Class PreparedStatementError.
 */

class PreparedStatementError extends Error {
  /**
   * Creates a new PreparedStatementError.
   *
   * @param {String} message Error message.
   * @param {String} [code] Error code.
   */

  constructor (message, code) {
    if (message instanceof Error) {
      super(message.message)
      this.code = message.code || code

      Error.captureStackTrace(this, this.constructor)
      Object.defineProperty(this, 'originalError', {enumerable: true, value: message})
    } else {
      super(message)
      this.code = code
    }

    this.name = 'PreparedStatementError'
  }
}

module.exports = {
  ConnectionPool,
  Transaction,
  Request,
  PreparedStatement,
  ConnectionError,
  TransactionError,
  RequestError,
  PreparedStatementError,
  driver,
  exports: {
    ConnectionError,
    TransactionError,
    RequestError,
    PreparedStatementError,
    Table,
    ISOLATION_LEVEL,
    TYPES,
    MAX: 65535, // (1 << 16) - 1
    map
  }
}

Object.defineProperty(module.exports, 'Promise', {
  get: () => {
    return PromiseLibrary
  },
  set: (value) => {
    PromiseLibrary = value
  }
})

// append datatypes to this modules export

for (let key in TYPES) {
  let value = TYPES[key]
  module.exports.exports[key] = value
  module.exports.exports[key.toUpperCase()] = value
}

/**
 * Open global connection pool.
 *
 * @param {Object|String} config Connection configuration object or connection string.
 * @param {basicCallback} [callback] A callback which is called after connection has established, or an error has occurred. If omited, method returns Promise.
 * @return {ConnectionPool|Promise}
 */

module.exports.exports.connect = function connect (config, callback) {
  if (globalConnection) throw new Error('Global connection already exists. Call sql.close() first.')
  globalConnection = new driver.ConnectionPool(config)

  for (let event in globalConnectionHandlers) {
    for (let i = 0, l = globalConnectionHandlers[event].length; i < l; i++) {
      globalConnection.on(event, globalConnectionHandlers[event][i])
    }
  }

  return globalConnection.connect(callback)
}

/**
 * Close all active connections in the global pool.
 *
 * @param {basicCallback} [callback] A callback which is called after connection has closed, or an error has occurred. If omited, method returns Promise.
 * @return {ConnectionPool|Promise}
 */

module.exports.exports.close = function close (callback) {
  if (globalConnection) {
    // remove event handlers from the global connection
    for (let event in globalConnectionHandlers) {
      for (let i = 0, l = globalConnectionHandlers[event].length; i < l; i++) {
        globalConnection.removeListener(event, globalConnectionHandlers[event][i])
      }
    }

    // attach error handler to prevent process crash in case of error
    globalConnection.on('error', err => {
      if (globalConnectionHandlers['error']) {
        for (let i = 0, l = globalConnectionHandlers['error'].length; i < l; i++) {
          globalConnectionHandlers['error'][i].call(globalConnection, err)
        }
      }
    })

    const gc = globalConnection
    globalConnection = null
    return gc.close(callback)
  }

  if (typeof callback === 'function') {
    setImmediate(callback)
    return null
  }

  return new PromiseLibrary((resolve, reject) => {
    resolve(globalConnection)
  })
}

/**
 * Attach event handler to global connection pool.
 *
 * @param {String} event Event name.
 * @param {Function} handler Event handler.
 * @return {ConnectionPool}
 */

module.exports.exports.on = function on (event, handler) {
  if (!globalConnectionHandlers[event]) globalConnectionHandlers[event] = []
  globalConnectionHandlers[event].push(handler)

  if (globalConnection) globalConnection.on(event, handler)
  return globalConnection
}

/**
 * Detach event handler from global connection.
 *
 * @param {String} event Event name.
 * @param {Function} handler Event handler.
 * @return {ConnectionPool}
 */

module.exports.exports.removeListener = module.exports.exports.off = function removeListener (event, handler) {
  if (!globalConnectionHandlers[event]) return globalConnection
  const index = globalConnectionHandlers[event].indexOf(handler)
  if (index === -1) return globalConnection
  globalConnectionHandlers[event].splice(index, 1)
  if (globalConnectionHandlers[event].length === 0) globalConnectionHandlers[event] = undefined

  if (globalConnection) globalConnection.removeListener(event, handler)
  return globalConnection
}

/**
 * Creates a new query using global connection from a tagged template string.
 *
 * @param {Array} strings Array of string literals.
 * @param {...*} keys Values.
 * @return {Request}
 */

module.exports.exports.query = function query () {
  const values = Array.prototype.slice.call(arguments)
  const strings = values.shift()

  return new driver.Request()._template('query', strings, values)
}

/**
 * Creates a new batch using global connection from a tagged template string.
 *
 * @param {Array} strings Array of string literals.
 * @param {...*} keys Values.
 * @return {Request}
 */

module.exports.exports.batch = function batch () {
  const values = Array.prototype.slice.call(arguments)
  const strings = values.shift()

  return new driver.Request()._template('batch', strings, values)
}

/**
 * @callback Request~requestCallback
 * @param {Error} err Error on error, otherwise null.
 * @param {Object} result Request result.
 */

/**
 * @callback Request~bulkCallback
 * @param {Error} err Error on error, otherwise null.
 * @param {Number} rowsAffected Number of affected rows.
 */

/**
 * @callback basicCallback
 * @param {Error} err Error on error, otherwise null.
 * @param {Connection} connection Acquired connection.
 */

/**
 * @callback acquireCallback
 * @param {Error} err Error on error, otherwise null.
 * @param {Connection} connection Acquired connection.
 */

/**
 * Dispatched after connection has established.
 * @event ConnectionPool#connect
 */

/**
 * Dispatched after connection has closed a pool (by calling close).
 * @event ConnectionPool#close
 */

/**
 * Dispatched when transaction begin.
 * @event Transaction#begin
 */

/**
 * Dispatched on successful commit.
 * @event Transaction#commit
 */

/**
 * Dispatched on successful rollback.
 * @event Transaction#rollback
 */

/**
 * Dispatched when metadata for new recordset are parsed.
 * @event Request#recordset
 */

/**
 * Dispatched when new row is parsed.
 * @event Request#row
 */

/**
 * Dispatched when request is complete.
 * @event Request#done
 */

/**
 * Dispatched on error.
 * @event Request#error
 */


/***/ }),
/* 477 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const url = __webpack_require__(515)
const qs = __webpack_require__(511)

const IGNORE_KEYS = ['stream']
const oror = function () {
  for (let i = 0, l = arguments.length; i < l; i++) {
    if (arguments[i] !== null && arguments[i] !== undefined) {
      return arguments[i]
    }
  }
}

const parseConnectionURI = function (uri) {
  const parsed = url.parse(uri)
  let instance
  let user
  let password

  const path = parsed.pathname.substr(1).split('/')
  if (path.length > 1) {
    instance = path.shift()
  }

  if (parsed.auth) {
    parsed.auth = parsed.auth.split(':')
    user = parsed.auth.shift()
    password = parsed.auth.join(':')
  }

  const port = parsed.port ? `,${parsed.port}` : (instance ? `\\${instance}` : '')
  const object = {
    server: `${parsed.hostname}${port}`,
    uid: user || '',
    pwd: password || '',
    database: path[0]
  }

  if (parsed.query) {
    const query = qs.parse(parsed.query)
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        const value = query[key]
        if (key === 'domain') {
          object.uid = `${value}\\${object.uid}`
        } else {
          object[key] = value
        }
      }
    }
  }

  Object.defineProperty(object, 'toString', {
    value () {
      const out = []
      for (const key in this) {
        if (IGNORE_KEYS.indexOf(key) === -1) {
          out.push(`${key}={${this[key]}}`)
        }
      }
      return out.join(';')
    }
  })

  return object
}

const parseConnectionString = function (string) {
  let cursor = 0
  let parsing = 'name'
  let param = null
  let buffer = ''
  let quotes = null
  const parsed = {}
  const original = {}

  Object.defineProperty(parsed, '__original__', {value: original})
  Object.defineProperty(parsed, 'toString', {
    value () {
      const out = []
      for (const key in this) {
        if (IGNORE_KEYS.indexOf(key) === -1) {
          const esc = original[key].escape || ['', '']
          out.push(`${original[key].name}=${esc[0] || ''}${this[key]}${esc[1] || ''}`)
        }
      }
      return out.join(';')
    }
  })

  while (cursor < string.length) {
    const char = string.charAt(cursor)
    switch (char) {
      case '=':
        if (parsing === 'name') {
          buffer = buffer.trim()
          param = buffer.toLowerCase()
          original[param] = {name: buffer}
          parsing = 'value'
          buffer = ''
        } else {
          buffer += char
        }
        break

      case '\'': case '"':
        if (parsing === 'value') {
          if (!buffer.trim().length) {
            // value is wrapped in qotes
            original[param].escape = [char, char]
            quotes = char
            buffer = ''
          } else if (quotes) {
            if (char === quotes) {
              // found same char as used for wrapping quotes
              if (char === string.charAt(cursor + 1)) {
                // escaped quote
                buffer += char
                cursor++
              } else {
                // end of value
                parsed[param] = buffer
                param = null
                parsing = null
                buffer = ''
                quotes = null
              }
            } else {
              buffer += char
            }
          } else {
            buffer += char
          }
        } else {
          throw new Error('Invalid connection string.')
        }
        break

      case '{':
        if (parsing === 'value') {
          if (buffer.trim().length === 0) {
            // value is wrapped in qotes
            original[param].escape = ['{', '}']
            quotes = '{}'
            buffer = ''
          } else {
            buffer += char
          }
        } else {
          throw new Error('Invalid connection string.')
        }
        break

      case '}':
        if (parsing === 'value') {
          if (quotes === '{}') {
            // end of value
            parsed[param] = buffer
            param = null
            parsing = null
            buffer = ''
            quotes = null
          } else {
            buffer += char
          }
        } else {
          throw new Error('Invalid connection string.')
        }
        break

      case ';':
        if (parsing === 'value') {
          if (quotes) {
            buffer += char
          } else {
            // end of value
            parsed[param] = buffer
            param = null
            parsing = 'name'
            buffer = ''
          }
        } else {
          buffer = ''
          parsing = 'name'
        }
        break

      default:
        buffer += char
    }

    cursor++
  }

  if (parsing === 'value') {
    // end of value
    parsed[param] = buffer
  }

  return parsed
}

const resolveConnectionString = function (string, driver) {
  const parsed = /^(mssql|tedious|msnodesql|tds):\/\//i.test(string) ? parseConnectionURI(string) : parseConnectionString(string)
  const stream = (parsed.stream || '').toLowerCase()
  const encrypt = (parsed.encrypt || '').toLowerCase()

  if (driver === 'msnodesqlv8') {
    parsed.driver = 'SQL Server Native Client 11.0'

    if (parsed.__original__) {
      parsed.__original__.driver = {name: 'Driver', escape: ['{', '}']}
    }

    return {connectionString: parsed.toString()}
  }

  let user = parsed.uid || parsed.uid || parsed['user id']
  let server = parsed.server || parsed.address || parsed.addr || parsed['data source'] || parsed['network address']

  const config = {
    password: oror(parsed.pwd, parsed.password),
    database: oror(parsed.database, parsed['initial catalog']),
    connectionTimeout: oror(parsed.connectionTimeout, parsed.timeout, parsed['connect timeout'], parsed['connection timeout']),
    requestTimeout: oror(parsed.requestTimeout, parsed['request timeout']),
    stream: stream === 'true' || stream === 'yes' || stream === '1',
    options: {
      encrypt: encrypt === 'true' || encrypt === 'yes' || encrypt === '1'
    }
  }

  if (parsed.useUTC != null) {
    const utc = parsed.useUTC.toLowerCase()
    config.options.useUTC = utc === 'true' || utc === 'yes' || utc === '1'
  }
  if (config.connectionTimeout != null) {
    config.connectionTimeout = parseInt(config.connectionTimeout, 10)
  }
  if (config.requestTimeout != null) {
    config.requestTimeout = parseInt(config.requestTimeout, 10)
  }

  if (/^(.*)\\(.*)$/.exec(user)) {
    config.domain = RegExp.$1
    user = RegExp.$2
  }

  if (server) {
    server = server.trim()

    if (/^np:/i.test(server)) {
      throw new Error('Connection via Named Pipes is not supported.')
    }

    if (/^tcp:/i.test(server)) {
      server = server.substr(4)
    }

    if (/^(.*)\\(.*)$/.exec(server)) {
      server = RegExp.$1
      config.options.instanceName = RegExp.$2
    }

    if (/^(.*),(.*)$/.exec(server)) {
      server = RegExp.$1.trim()
      config.port = parseInt(RegExp.$2.trim(), 10)
    }

    if (server === '.' || server === '(.)' || server.toLowerCase() === '(localdb)' || server.toLowerCase() === '(local)') {
      server = 'localhost'
    }
  }

  config.user = user
  config.server = server
  return config
}

module.exports = {
  parse: parseConnectionString,
  resolve: resolveConnectionString
}


/***/ }),
/* 478 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  READ_UNCOMMITTED: 0x01,
  READ_COMMITTED: 0x02,
  REPEATABLE_READ: 0x03,
  SERIALIZABLE: 0x04,
  SNAPSHOT: 0x05
}


/***/ }),
/* 479 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const tds = __webpack_require__(495)
const debug = __webpack_require__(187)('mssql:tedious')

const base = __webpack_require__(476)
const TYPES = __webpack_require__(37).TYPES
const declare = __webpack_require__(37).declare
const cast = __webpack_require__(37).cast
const DECLARATIONS = __webpack_require__(37).DECLARATIONS
const UDT = __webpack_require__(480).PARSERS
const Table = __webpack_require__(193)

const JSON_COLUMN_ID = 'JSON_F52E2B61-18A1-11d1-B105-00805F49916B'
const XML_COLUMN_ID = 'XML_F52E2B61-18A1-11d1-B105-00805F49916B'

const getTediousType = function (type) {
  switch (type) {
    case TYPES.VarChar: return tds.TYPES.VarChar
    case TYPES.NVarChar: return tds.TYPES.NVarChar
    case TYPES.Text: return tds.TYPES.Text
    case TYPES.Int: return tds.TYPES.Int
    case TYPES.BigInt: return tds.TYPES.BigInt
    case TYPES.TinyInt: return tds.TYPES.TinyInt
    case TYPES.SmallInt: return tds.TYPES.SmallInt
    case TYPES.Bit: return tds.TYPES.Bit
    case TYPES.Float: return tds.TYPES.Float
    case TYPES.Decimal: return tds.TYPES.Decimal
    case TYPES.Numeric: return tds.TYPES.Numeric
    case TYPES.Real: return tds.TYPES.Real
    case TYPES.Money: return tds.TYPES.Money
    case TYPES.SmallMoney: return tds.TYPES.SmallMoney
    case TYPES.Time: return tds.TYPES.TimeN
    case TYPES.Date: return tds.TYPES.DateN
    case TYPES.DateTime: return tds.TYPES.DateTime
    case TYPES.DateTime2: return tds.TYPES.DateTime2N
    case TYPES.DateTimeOffset: return tds.TYPES.DateTimeOffsetN
    case TYPES.SmallDateTime: return tds.TYPES.SmallDateTime
    case TYPES.UniqueIdentifier: return tds.TYPES.UniqueIdentifierN
    case TYPES.Xml: return tds.TYPES.NVarChar
    case TYPES.Char: return tds.TYPES.Char
    case TYPES.NChar: return tds.TYPES.NChar
    case TYPES.NText: return tds.TYPES.NVarChar
    case TYPES.Image: return tds.TYPES.Image
    case TYPES.Binary: return tds.TYPES.Binary
    case TYPES.VarBinary: return tds.TYPES.VarBinary
    case TYPES.UDT: case TYPES.Geography: case TYPES.Geometry: return tds.TYPES.UDT
    case TYPES.TVP: return tds.TYPES.TVP
    case TYPES.Variant: return tds.TYPES.Variant
    default: return type
  }
}

const getMssqlType = function (type, length) {
  switch (type) {
    case tds.TYPES.Char: return TYPES.Char
    case tds.TYPES.NChar: return TYPES.NChar
    case tds.TYPES.VarChar: return TYPES.VarChar
    case tds.TYPES.NVarChar: return TYPES.NVarChar
    case tds.TYPES.Text: return TYPES.Text
    case tds.TYPES.NText: return TYPES.NText
    case tds.TYPES.Int: return TYPES.Int
    case tds.TYPES.IntN:
      if (length === 8) return TYPES.BigInt
      if (length === 4) return TYPES.Int
      if (length === 2) return TYPES.SmallInt
      return TYPES.TinyInt
    case tds.TYPES.BigInt: return TYPES.BigInt
    case tds.TYPES.TinyInt: return TYPES.TinyInt
    case tds.TYPES.SmallInt: return TYPES.SmallInt
    case tds.TYPES.Bit: case tds.TYPES.BitN: return TYPES.Bit
    case tds.TYPES.Float: return TYPES.Float
    case tds.TYPES.FloatN:
      if (length === 8) return TYPES.Float
      return TYPES.Real
    case tds.TYPES.Real: return TYPES.Real
    case tds.TYPES.Money: return TYPES.Money
    case tds.TYPES.MoneyN:
      if (length === 8) return TYPES.Money
      return TYPES.SmallMoney
    case tds.TYPES.SmallMoney: return TYPES.SmallMoney
    case tds.TYPES.Numeric: case tds.TYPES.NumericN: return TYPES.Numeric
    case tds.TYPES.Decimal: case tds.TYPES.DecimalN: return TYPES.Decimal
    case tds.TYPES.DateTime: return TYPES.DateTime
    case tds.TYPES.DateTimeN:
      if (length === 8) return TYPES.DateTime
      return TYPES.SmallDateTime
    case tds.TYPES.TimeN: return TYPES.Time
    case tds.TYPES.DateN: return TYPES.Date
    case tds.TYPES.DateTime2N: return TYPES.DateTime2
    case tds.TYPES.DateTimeOffsetN: return TYPES.DateTimeOffset
    case tds.TYPES.SmallDateTime: return TYPES.SmallDateTime
    case tds.TYPES.UniqueIdentifierN: return TYPES.UniqueIdentifier
    case tds.TYPES.Image: return TYPES.Image
    case tds.TYPES.Binary: return TYPES.Binary
    case tds.TYPES.VarBinary: return TYPES.VarBinary
    case tds.TYPES.Xml: return TYPES.Xml
    case tds.TYPES.UDT: return TYPES.UDT
    case tds.TYPES.TVP: return TYPES.TVP
    case tds.TYPES.Variant: return TYPES.Variant
  }
}

const createColumns = function (metadata) {
  let out = {}
  for (let index = 0, length = metadata.length; index < length; index++) {
    let column = metadata[index]
    out[column.colName] = {
      index,
      name: column.colName,
      length: column.dataLength,
      type: getMssqlType(column.type, column.dataLength),
      scale: column.scale,
      precision: column.precision,
      nullable: !!(column.flags & 0x01),
      caseSensitive: !!(column.flags & 0x02),
      identity: !!(column.flags & 0x10),
      readOnly: !(column.flags & 0x0C)
    }

    if (column.udtInfo) {
      out[column.colName].udt = {
        name: column.udtInfo.typeName,
        database: column.udtInfo.dbname,
        schema: column.udtInfo.owningSchema,
        assembly: column.udtInfo.assemblyName
      }

      if (DECLARATIONS[column.udtInfo.typeName]) {
        out[column.colName].type = DECLARATIONS[column.udtInfo.typeName]
      }
    }
  }

  return out
}

const valueCorrection = function (value, metadata) {
  if ((metadata.type === tds.TYPES.UDT) && (value != null)) {
    if (UDT[metadata.udtInfo.typeName]) {
      return UDT[metadata.udtInfo.typeName](value)
    } else {
      return value
    }
  } else {
    return value
  }
}

const parameterCorrection = function (value) {
  if (value instanceof Table) {
    const tvp = {
      name: value.name,
      schema: value.schema,
      columns: [],
      rows: value.rows
    }

    for (let col of value.columns) {
      tvp.columns.push({
        name: col.name,
        type: getTediousType(col.type),
        length: col.length,
        scale: col.scale,
        precision: col.precision
      })
    }

    return tvp
  } else {
    return value
  }
}

class ConnectionPool extends base.ConnectionPool {
  _poolCreate () {
    return new base.Promise((resolve, reject) => {
      const cfg = {
        userName: this.config.user,
        password: this.config.password,
        server: this.config.server,
        options: Object.assign({}, this.config.options),
        domain: this.config.domain
      }

      cfg.options.database = this.config.database
      cfg.options.port = this.config.port
      cfg.options.connectTimeout = this.config.connectionTimeout || this.config.timeout || 15000
      cfg.options.requestTimeout = this.config.requestTimeout != null ? this.config.requestTimeout : 15000
      cfg.options.tdsVersion = cfg.options.tdsVersion || '7_4'
      cfg.options.rowCollectionOnDone = false
      cfg.options.rowCollectionOnRequestCompletion = false
      cfg.options.useColumnNames = false
      cfg.options.appName = cfg.options.appName || 'node-mssql'

      // tedious always connect via tcp when port is specified
      if (cfg.options.instanceName) delete cfg.options.port

      if (isNaN(cfg.options.requestTimeout)) cfg.options.requestTimeout = 15000
      if (cfg.options.requestTimeout === Infinity) cfg.options.requestTimeout = 0
      if (cfg.options.requestTimeout < 0) cfg.options.requestTimeout = 0

      if (this.config.debug) {
        cfg.options.debug = {
          packet: true,
          token: true,
          data: true,
          payload: true
        }
      }

      const tedious = new tds.Connection(cfg)

      tedious.once('connect', err => {
        if (err) {
          err = new base.ConnectionError(err)
          return reject(err)
        }

        resolve(tedious)
      })

      tedious.on('error', err => {
        if (err.code === 'ESOCKET') {
          tedious.hasError = true
          return
        }

        this.emit('error', err)
      })

      if (this.config.debug) {
        tedious.on('debug', this.emit.bind(this, 'debug', tedious))
      }
    })
  }

  _poolValidate (tedious) {
    return new base.Promise((resolve, reject) => {
      resolve(!tedious.closed && !tedious.hasError)
    })
  }

  _poolDestroy (tedious) {
    return new base.Promise((resolve, reject) => {
      tedious.once('end', () => {
        resolve()
      })

      tedious.close()
    })
  }
}

class Transaction extends base.Transaction {
  constructor (parent) {
    super(parent)

    this._abort = () => {
      if (!this._rollbackRequested) {
        // transaction interrupted because of XACT_ABORT

        const pc = this._acquiredConnection

        // defer releasing so connection can switch from SentClientRequest to LoggedIn state
        setImmediate(this.parent.release.bind(this.parent), pc)

        this._acquiredConnection.removeListener('rollbackTransaction', this._abort)
        this._acquiredConnection = null
        this._acquiredConfig = null
        this._aborted = true

        this.emit('rollback', true)
      }
    }
  }

  _begin (isolationLevel, callback) {
    super._begin(isolationLevel, err => {
      if (err) return callback(err)

      debug('tran: begin')

      this.parent.acquire(this, (err, connection, config) => {
        if (err) return callback(err)

        this._acquiredConnection = connection
        this._acquiredConnection.on('rollbackTransaction', this._abort)
        this._acquiredConfig = config

        connection.beginTransaction(err => {
          if (err) err = new base.TransactionError(err)

          debug('tran: begin ok')

          callback(err)
        }, this.name, this.isolationLevel)
      })
    })
  }

  _commit (callback) {
    super._commit(err => {
      if (err) return callback(err)

      debug('tran: commit')

      this._acquiredConnection.commitTransaction(err => {
        if (err) err = new base.TransactionError(err)

        this._acquiredConnection.removeListener('rollbackTransaction', this._abort)
        this.parent.release(this._acquiredConnection)
        this._acquiredConnection = null
        this._acquiredConfig = null

        if (!err) debug('tran: commit ok')

        callback(err)
      })
    })
  }

  _rollback (callback) {
    super._rollback(err => {
      if (err) return callback(err)

      debug('tran: rollback')

      this._acquiredConnection.rollbackTransaction(err => {
        if (err) err = new base.TransactionError(err)

        this._acquiredConnection.removeListener('rollbackTransaction', this._abort)
        this.parent.release(this._acquiredConnection)
        this._acquiredConnection = null
        this._acquiredConfig = null

        if (!err) debug('tran: rollback ok')

        callback(err)
      })
    })
  }
}

class Request extends base.Request {
  /*
  Execute specified sql batch.
  */

  _batch (batch, callback) {
    this._isBatch = true
    this._query(batch, callback)
  }

  /*
  Bulk load.
  */

  _bulk (table, callback) {
    super._bulk(table, err => {
      if (err) return callback(err)

      table._makeBulk()

      if (!table.name) {
        return callback(new base.RequestError('Table name must be specified for bulk insert.', 'ENAME'))
      }

      if (table.name.charAt(0) === '@') {
        return callback(new base.RequestError("You can't use table variables for bulk insert.", 'ENAME'))
      }

      const errors = []
      const errorHandlers = {}
      let hasReturned = false

      const handleError = (doReturn, connection, info) => {
        let err = new Error(info.message)
        err.info = info
        err = new base.RequestError(err, 'EREQUEST')

        if (this.stream) {
          this.emit('error', err)
        } else {
          if (doReturn && !hasReturned) {
            if (connection) {
              for (let event in errorHandlers) {
                connection.removeListener(event, errorHandlers[event])
              }

              this.parent.release(connection)
            }

            hasReturned = true
            callback(err)
          }
        }

        // we must collect errors even in stream mode
        errors.push(err)
      }

      const handleInfo = msg => {
        this.emit('info', {
          message: msg.message,
          number: msg.number,
          state: msg.state,
          class: msg.class,
          lineNumber: msg.lineNumber,
          serverName: msg.serverName,
          procName: msg.procName
        })
      }

      this.parent.acquire(this, (err, connection) => {
        if (err) return callback(err)

        if (this.canceled) {
          debug('req: canceled')
          this.parent.release(connection)
          return callback(new base.RequestError('Canceled.', 'ECANCEL'))
        }

        this._cancel = () => {
          debug('req: cancel')
          connection.cancel()
        }

        // attach handler to handle multiple error messages
        connection.on('infoMessage', errorHandlers.infoMessage = handleInfo)
        connection.on('errorMessage', errorHandlers.errorMessage = handleError.bind(null, false, connection))
        connection.on('error', errorHandlers.error = handleError.bind(null, true, connection))

        const done = (err, rowCount) => {
          // to make sure we handle no-sql errors as well
          if (err && (!errors.length || (errors.length && err.message !== errors[errors.length - 1].message))) {
            err = new base.RequestError(err, 'EREQUEST')
            if (this.stream) this.emit('error', err)
            errors.push(err)
          }

          this._cancel = null

          let error
          if (errors.length && !this.stream) {
            error = errors.pop()
            error.precedingErrors = errors
          }

          if (!hasReturned) {
            for (let event in errorHandlers) {
              connection.removeListener(event, errorHandlers[event])
            }

            this.parent.release(connection)
            hasReturned = true

            if (this.stream) {
              callback(null, rowCount)
            } else {
              callback(error, rowCount)
            }
          }
        }

        const bulk = connection.newBulkLoad(table.path, done)

        for (let col of table.columns) {
          bulk.addColumn(col.name, getTediousType(col.type), {nullable: col.nullable, length: col.length, scale: col.scale, precision: col.precision})
        }

        for (let row of table.rows) {
          bulk.addRow(row)
        }

        if (table.create) {
          const objectid = table.temporary ? `tempdb..[${table.name}]` : table.path
          const req = new tds.Request(`if object_id('${objectid.replace(/'/g, '\'\'')}') is null ${table.declare()}`, err => {
            if (err) return done(err)

            connection.execBulkLoad(bulk)
          })

          connection.execSqlBatch(req)
        } else {
          connection.execBulkLoad(bulk)
        }
      })
    })
  }

  /*
  Execute specified sql command.
  */

  _query (command, callback) {
    super._query(command, err => {
      if (err) return callback(err)

      debug('req: query:', command)

      const recordsets = []
      const errors = []
      const errorHandlers = {}
      const output = {}
      const rowsAffected = []

      let columns = {}
      let recordset = []
      let batchLastRow = null
      let batchHasOutput = false
      let isChunkedRecordset = false
      let chunksBuffer = null
      let hasReturned = false

      const handleError = (doReturn, connection, info) => {
        let err = new Error(info.message)
        err.info = info
        err = new base.RequestError(err, 'EREQUEST')

        if (this.stream) {
          this.emit('error', err)
        } else {
          if (doReturn && !hasReturned) {
            if (connection) {
              for (let event in errorHandlers) {
                connection.removeListener(event, errorHandlers[event])
              }

              this.parent.release(connection)
            }

            hasReturned = true
            callback(err)
          }
        }

        // we must collect errors even in stream mode
        errors.push(err)
      }

      const handleInfo = msg => {
        this.emit('info', {
          message: msg.message,
          number: msg.number,
          state: msg.state,
          class: msg.class,
          lineNumber: msg.lineNumber,
          serverName: msg.serverName,
          procName: msg.procName
        })
      }

      this.parent.acquire(this, (err, connection, config) => {
        if (err) return callback(err)

        let row

        if (this.canceled) {
          debug('req: canceling')
          this.parent.release(connection)
          return callback(new base.RequestError('Canceled.', 'ECANCEL'))
        }

        this._cancel = () => {
          debug('req: cancel')
          connection.cancel()
        }

        // attach handler to handle multiple error messages
        connection.on('infoMessage', errorHandlers.infoMessage = handleInfo)
        connection.on('errorMessage', errorHandlers.errorMessage = handleError.bind(null, false, connection))
        connection.on('error', errorHandlers.error = handleError.bind(null, true, connection))

        const req = new tds.Request(command, err => {
          // to make sure we handle no-sql errors as well
          if (err && (!errors.length || (errors.length && err.message !== errors[errors.length - 1].message))) {
            err = new base.RequestError(err, 'EREQUEST')
            if (this.stream) this.emit('error', err)
            errors.push(err)
          }

          // process batch outputs
          if (batchHasOutput) {
            if (!this.stream) batchLastRow = recordsets.pop()[0]

            for (let name in batchLastRow) {
              let value = batchLastRow[name]
              if (name !== '___return___') {
                output[name] = value === tds.TYPES.Null ? null : value
              }
            }
          }

          this._cancel = null

          let error
          if (errors.length && !this.stream) {
            error = errors.pop()
            error.precedingErrors = errors
          }

          if (!hasReturned) {
            for (let event in errorHandlers) {
              connection.removeListener(event, errorHandlers[event])
            }

            this.parent.release(connection)
            hasReturned = true

            if (error) {
              debug('req: query fail', error)
            } else {
              debug('req: query ok')
            }

            if (this.stream) {
              callback(null, null, output, rowsAffected)
            } else {
              callback(error, recordsets, output, rowsAffected)
            }
          }
        })

        req.on('columnMetadata', metadata => {
          columns = createColumns(metadata)

          isChunkedRecordset = false
          if (metadata.length === 1 && (metadata[0].colName === JSON_COLUMN_ID || metadata[0].colName === XML_COLUMN_ID)) {
            isChunkedRecordset = true
            chunksBuffer = []
          }

          if (this.stream) {
            if (this._isBatch) {
              // don't stream recordset with output values in batches
              if (!columns.___return___) {
                this.emit('recordset', columns)
              }
            } else {
              this.emit('recordset', columns)
            }
          }
        }
        )

        const doneHandler = (rowCount, more) => {
          if (rowCount != null) rowsAffected.push(rowCount)
          // this function is called even when select only set variables so we should skip adding a new recordset
          if (Object.keys(columns).length === 0) return

          if (isChunkedRecordset) {
            if (columns[JSON_COLUMN_ID] && config.parseJSON === true) {
              try {
                row = JSON.parse(chunksBuffer.join(''))
              } catch (ex) {
                row = null
                const ex2 = new base.RequestError(new Error(`Failed to parse incoming JSON. ${ex.message}`), 'EJSON')

                if (this.stream) this.emit('error', ex2)

                // we must collect errors even in stream mode
                errors.push(ex2)
              }
            } else {
              row = {}
              row[Object.keys(columns)[0]] = chunksBuffer.join('')
            }

            chunksBuffer = null

            if (this.stream) {
              this.emit('row', row)
            } else {
              recordset.push(row)
            }
          }

          if (!this.stream) {
            // all rows of current recordset loaded
            Object.defineProperty(recordset, 'columns', {
              enumerable: false,
              configurable: true,
              value: columns
            })

            Object.defineProperty(recordset, 'toTable', {
              enumerable: false,
              configurable: true,
              value () { return Table.fromRecordset(this) }
            })

            recordsets.push(recordset)
          }

          recordset = []
          columns = {}
        }

        req.on('doneInProc', doneHandler) // doneInProc handlers are used in both queries and batches
        req.on('done', doneHandler) // done handlers are used in batches

        req.on('returnValue', (parameterName, value, metadata) => {
          output[parameterName] = value === tds.TYPES.Null ? null : value
        })

        req.on('row', columns => {
          if (!recordset) recordset = []

          if (isChunkedRecordset) {
            return chunksBuffer.push(columns[0].value)
          }

          row = {}
          for (let col of columns) {
            col.value = valueCorrection(col.value, col.metadata)

            let exi = row[col.metadata.colName]
            if (exi != null) {
              if (exi instanceof Array) {
                exi.push(col.value)
              } else {
                row[col.metadata.colName] = [exi, col.value]
              }
            } else {
              row[col.metadata.colName] = col.value
            }
          }

          if (this.stream) {
            if (this._isBatch) {
              // dont stream recordset with output values in batches
              if (row.___return___) {
                batchLastRow = row
              } else {
                this.emit('row', row)
              }
            } else {
              this.emit('row', row)
            }
          } else {
            recordset.push(row)
          }
        })

        if (this._isBatch) {
          if (Object.keys(this.parameters).length) {
            for (let name in this.parameters) {
              let param = this.parameters[name]
              let value = getTediousType(param.type).validate(param.value)

              if (value instanceof TypeError) {
                value = new base.RequestError(`Validation failed for parameter '${name}'. ${value.message}`, 'EPARAM')

                this.parent.release(connection)
                return callback(value)
              }

              param.value = value
            }

            const declarations = []
            for (let name in this.parameters) {
              let param = this.parameters[name]
              declarations.push(`@${name} ${declare(param.type, param)}`)
            }

            const assigns = []
            for (let name in this.parameters) {
              let param = this.parameters[name]
              assigns.push(`@${name} = ${cast(param.value, param.type, param)}`)
            }

            const selects = []
            for (let name in this.parameters) {
              let param = this.parameters[name]
              if (param.io === 2) {
                selects.push(`@${name} as [${name}]`)
              }
            }

            batchHasOutput = selects.length > 0

            req.sqlTextOrProcedure = `declare ${declarations.join(', ')};select ${assigns.join(', ')};${req.sqlTextOrProcedure};${batchHasOutput ? (`select 1 as [___return___], ${selects.join(', ')}`) : ''}`
          }
        } else {
          for (let name in this.parameters) {
            let param = this.parameters[name]
            if (param.io === 1) {
              req.addParameter(param.name, getTediousType(param.type), parameterCorrection(param.value), {length: param.length, scale: param.scale, precision: param.precision})
            } else {
              req.addOutputParameter(param.name, getTediousType(param.type), parameterCorrection(param.value), {length: param.length, scale: param.scale, precision: param.precision})
            }
          }
        }

        connection[this._isBatch ? 'execSqlBatch' : 'execSql'](req)
      })
    })
  }

  /*
  Execute stored procedure with specified parameters.
  */

  _execute (procedure, callback) {
    super._execute(procedure, err => {
      if (err) return callback(err)

      debug('req: execute:', procedure)

      const recordsets = []
      const errors = []
      const errorHandlers = {}
      const output = {}
      const rowsAffected = []

      let columns = {}
      let recordset = []
      let returnValue = 0
      let isChunkedRecordset = false
      let chunksBuffer = null
      let hasReturned = false

      const handleError = (doReturn, connection, info) => {
        let err = new Error(info.message)
        err.info = info
        err = new base.RequestError(err, 'EREQUEST')

        if (this.stream) {
          this.emit('error', err)
        } else {
          if (doReturn && !hasReturned) {
            if (connection) {
              for (let event in errorHandlers) {
                connection.removeListener(event, errorHandlers[event])
              }

              this.parent.release(connection)
            }

            hasReturned = true
            callback(err)
          }
        }

        // we must collect errors even in stream mode
        errors.push(err)
      }

      this.parent.acquire(this, (err, connection, config) => {
        if (err) return callback(err)

        let row

        if (this.canceled) {
          debug('req: canceling')
          this.parent.release(connection)
          return callback(new base.RequestError('Canceled.', 'ECANCEL'))
        }

        this._cancel = () => {
          debug('req: cancel')
          connection.cancel()
        }

        // attach handler to handle multiple error messages
        connection.on('errorMessage', errorHandlers.errorMessage = handleError.bind(null, false, connection))
        connection.on('error', errorHandlers.error = handleError.bind(null, true, connection))

        const req = new tds.Request(procedure, err => {
          // to make sure we handle no-sql errors as well
          if (err && (!errors.length || (errors.length && err.message !== errors[errors.length - 1].message))) {
            err = new base.RequestError(err, 'EREQUEST')
            if (this.stream) this.emit('error', err)
            errors.push(err)
          }

          this._cancel = null

          let error
          if (errors.length && !this.stream) {
            error = errors.pop()
            error.precedingErrors = errors
          }

          if (!hasReturned) {
            for (let event in errorHandlers) {
              connection.removeListener(event, errorHandlers[event])
            }

            this.parent.release(connection)
            hasReturned = true

            if (error) {
              debug('req: execute fail', error)
            } else {
              debug('req: execute ok')
            }

            if (this.stream) {
              callback(null, null, output, returnValue, rowsAffected)
            } else {
              callback(error, recordsets, output, returnValue, rowsAffected)
            }
          }
        })

        req.on('columnMetadata', metadata => {
          columns = createColumns(metadata)

          isChunkedRecordset = false
          if ((metadata.length === 1) && (metadata[0].colName === JSON_COLUMN_ID || metadata[0].colName === XML_COLUMN_ID)) {
            isChunkedRecordset = true
            chunksBuffer = []
          }

          if (this.stream) this.emit('recordset', columns)
        })

        req.on('row', columns => {
          if (!recordset) recordset = []

          if (isChunkedRecordset) {
            return chunksBuffer.push(columns[0].value)
          }

          row = {}
          for (let col of columns) {
            col.value = valueCorrection(col.value, col.metadata)

            let exi = row[col.metadata.colName]
            if (exi != null) {
              if (exi instanceof Array) {
                exi.push(col.value)
              } else {
                row[col.metadata.colName] = [exi, col.value]
              }
            } else {
              row[col.metadata.colName] = col.value
            }
          }

          if (this.stream) {
            this.emit('row', row)
          } else {
            recordset.push(row)
          }
        })

        req.on('doneInProc', (rowCount, more) => {
          if (rowCount != null) rowsAffected.push(rowCount)

          // filter empty recordsets when NOCOUNT is OFF
          if (Object.keys(columns).length === 0) return

          if (isChunkedRecordset) {
            if (columns[JSON_COLUMN_ID] && config.parseJSON === true) {
              try {
                row = JSON.parse(chunksBuffer.join(''))
              } catch (ex) {
                row = null
                const ex2 = new base.RequestError(new Error(`Failed to parse incoming JSON. ${ex.message}`), 'EJSON')

                if (this.stream) this.emit('error', ex2)

                // we must collect errors even in stream mode
                errors.push(ex2)
              }
            } else {
              row = {}
              row[Object.keys(columns)[0]] = chunksBuffer.join('')
            }

            chunksBuffer = null

            if (this.stream) {
              this.emit('row', row)
            } else {
              recordset.push(row)
            }
          }

          if (!this.stream) {
            // all rows of current recordset loaded
            Object.defineProperty(recordset, 'columns', {
              enumerable: false,
              configurable: true,
              value: columns
            })

            Object.defineProperty(recordset, 'toTable', {
              enumerable: false,
              configurable: true,
              value () { return Table.fromRecordset(this) }
            })

            recordsets.push(recordset)
          }

          recordset = []
          columns = {}
        })

        req.on('doneProc', (rowCount, more, returnStatus) => {
          returnValue = returnStatus
        })

        req.on('returnValue', (parameterName, value, metadata) => {
          output[parameterName] = value === tds.TYPES.Null ? null : value
        })

        for (let name in this.parameters) {
          let param = this.parameters[name]
          if (param.io === 1) {
            req.addParameter(param.name, getTediousType(param.type), parameterCorrection(param.value), {length: param.length, scale: param.scale, precision: param.precision})
          } else {
            req.addOutputParameter(param.name, getTediousType(param.type), parameterCorrection(param.value), {length: param.length, scale: param.scale, precision: param.precision})
          }
        }

        connection.callProcedure(req)
      })
    })
  }
}

module.exports = Object.assign({
  ConnectionPool,
  Transaction,
  Request,
  PreparedStatement: base.PreparedStatement
}, base.exports)

Object.defineProperty(module.exports, 'Promise', {
  enumerable: true,
  get: () => {
    return base.Promise
  },
  set: (value) => {
    base.Promise = value
  }
})

base.driver.name = 'tedious'
base.driver.ConnectionPool = ConnectionPool
base.driver.Transaction = Transaction
base.driver.Request = Request


/***/ }),
/* 480 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* const FIGURE = {
  INTERIOR_RING: 0x00,
  STROKE: 0x01,
  EXTERIOR_RING: 0x02
};

const FIGURE_V2 = {
  POINT: 0x00,
  LINE: 0x01,
  ARC: 0x02,
  COMPOSITE_CURVE: 0x03
};

const SHAPE = {
  POINT: 0x01,
  LINESTRING: 0x02,
  POLYGON: 0x03,
  MULTIPOINT: 0x04,
  MULTILINESTRING: 0x05,
  MULTIPOLYGON: 0x06,
  GEOMETRY_COLLECTION: 0x07
};

const SHAPE_V2 = {
  POINT: 0x01,
  LINESTRING: 0x02,
  POLYGON: 0x03,
  MULTIPOINT: 0x04,
  MULTILINESTRING: 0x05,
  MULTIPOLYGON: 0x06,
  GEOMETRY_COLLECTION: 0x07,
  CIRCULAR_STRING: 0x08,
  COMPOUND_CURVE: 0x09,
  CURVE_POLYGON: 0x0A,
  FULL_GLOBE: 0x0B
};

const SEGMENT = {
  LINE: 0x00,
  ARC: 0x01,
  FIRST_LINE: 0x02,
  FIRST_ARC: 0x03
}; */

class Point {
  constructor () {
    this.x = 0
    this.y = 0
    this.z = null
    this.m = null
  }
}

const parsePoints = (buffer, count) => {
  // s2.1.5 + s2.1.6

  const points = []
  if (count < 1) {
    return points
  }

  for (let i = 1; i <= count; i++) {
    const point = new Point()
    points.push(point)
    point.x = buffer.readDoubleLE(buffer.position)
    point.y = buffer.readDoubleLE(buffer.position + 8)
    buffer.position += 16
  }

  return points
}

const parseZ = (buffer, points) => {
  // s2.1.1 + s.2.1.2

  if (points < 1) {
    return
  }

  points.forEach(point => {
    point.z = buffer.readDoubleLE(buffer.position)
    buffer.position += 8
  })
}

const parseM = (buffer, points) => {
  // s2.1.1 + s.2.1.2

  if (points < 1) {
    return
  }

  points.forEach(point => {
    point.m = buffer.readDoubleLE(buffer.position)
    buffer.position += 8
  })
}

const parseFigures = (buffer, count, properties) => {
  // s2.1.3

  const figures = []
  if (count < 1) {
    return figures
  }

  if (properties.P) {
    figures.push({
      attribute: 0x01,
      pointOffset: 0
    })
  } else if (properties.L) {
    figures.push({
      attribute: 0x01,
      pointOffset: 0
    })
  } else {
    for (let i = 1; i <= count; i++) {
      figures.push({
        attribute: buffer.readUInt8(buffer.position),
        pointOffset: buffer.readInt32LE(buffer.position + 1)
      })

      buffer.position += 5
    }
  }

  return figures
}

const parseShapes = (buffer, count, properties) => {
  // s2.1.4

  const shapes = []
  if (count < 1) {
    return shapes
  }

  if (properties.P) {
    shapes.push({
      parentOffset: -1,
      figureOffset: 0,
      type: 0x01
    })
  } else if (properties.L) {
    shapes.push({
      parentOffset: -1,
      figureOffset: 0,
      type: 0x02
    })
  } else {
    for (let i = 1; i <= count; i++) {
      shapes.push({
        parentOffset: buffer.readInt32LE(buffer.position),
        figureOffset: buffer.readInt32LE(buffer.position + 4),
        type: buffer.readUInt8(buffer.position + 8)
      })

      buffer.position += 9
    }
  }

  return shapes
}

const parseSegments = (buffer, count) => {
  // s2.1.7

  const segments = []
  if (count < 1) {
    return segments
  }

  for (let i = 1; i <= count; i++) {
    segments.push({
      type: buffer.readUInt8(buffer.position)})

    buffer.position++
  }

  return segments
}

const parseGeography = buffer => {
  // s2.1.1 + s.2.1.2

  const srid = buffer.readInt32LE(0)
  if (srid === -1) {
    return null
  }

  const value = {
    srid,
    version: buffer.readUInt8(4)
  }

  const flags = buffer.readUInt8(5)
  buffer.position = 6

  // console.log("srid", srid)
  // console.log("version", version)

  const properties = {
    Z: (flags & (1 << 0)) > 0,
    M: (flags & (1 << 1)) > 0,
    V: (flags & (1 << 2)) > 0,
    P: (flags & (1 << 3)) > 0,
    L: (flags & (1 << 4)) > 0
  }

  if (value.version === 2) {
    properties.H = (flags & (1 << 3)) > 0
  }

  // console.log("properties", properties);

  let numberOfPoints
  if (properties.P) {
    numberOfPoints = 1
  } else if (properties.L) {
    numberOfPoints = 2
  } else {
    numberOfPoints = buffer.readUInt32LE(buffer.position)
    buffer.position += 4
  }

  // console.log("numberOfPoints", numberOfPoints)

  value.points = parsePoints(buffer, numberOfPoints)

  if (properties.Z) {
    parseZ(buffer, value.points)
  }

  if (properties.M) {
    parseM(buffer, value.points)
  }

  // console.log("points", points)

  let numberOfFigures
  if (properties.P) {
    numberOfFigures = 1
  } else if (properties.L) {
    numberOfFigures = 1
  } else {
    numberOfFigures = buffer.readUInt32LE(buffer.position)
    buffer.position += 4
  }

  // console.log("numberOfFigures", numberOfFigures)

  value.figures = parseFigures(buffer, numberOfFigures, properties)

  // console.log("figures", figures)

  let numberOfShapes
  if (properties.P) {
    numberOfShapes = 1
  } else if (properties.L) {
    numberOfShapes = 1
  } else {
    numberOfShapes = buffer.readUInt32LE(buffer.position)
    buffer.position += 4
  }

  // console.log("numberOfShapes", numberOfShapes)

  value.shapes = parseShapes(buffer, numberOfShapes, properties)

  // console.log( "shapes", shapes)

  if (value.version === 2) {
    const numberOfSegments = buffer.readUInt32LE(buffer.position)
    buffer.position += 4

    // console.log("numberOfSegments", numberOfSegments)

    value.segments = parseSegments(buffer, numberOfSegments)

    // console.log("segments", segments)
  } else {
    value.segments = []
  }

  return value
}

module.exports.PARSERS = {
  geography (buffer) {
    return parseGeography(buffer)
  },

  geometry (buffer) {
    return parseGeography(buffer)
  }
}


/***/ }),
/* 481 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;

var Transform = __webpack_require__(195);

/*<replacement>*/
var util = __webpack_require__(70);
util.inherits = __webpack_require__(71);
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),
/* 482 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Buffer = __webpack_require__(12).Buffer;
/*<replacement>*/
var bufferShim = __webpack_require__(76);
/*</replacement>*/

module.exports = BufferList;

function BufferList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

BufferList.prototype.push = function (v) {
  var entry = { data: v, next: null };
  if (this.length > 0) this.tail.next = entry;else this.head = entry;
  this.tail = entry;
  ++this.length;
};

BufferList.prototype.unshift = function (v) {
  var entry = { data: v, next: this.head };
  if (this.length === 0) this.tail = entry;
  this.head = entry;
  ++this.length;
};

BufferList.prototype.shift = function () {
  if (this.length === 0) return;
  var ret = this.head.data;
  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
  --this.length;
  return ret;
};

BufferList.prototype.clear = function () {
  this.head = this.tail = null;
  this.length = 0;
};

BufferList.prototype.join = function (s) {
  if (this.length === 0) return '';
  var p = this.head;
  var ret = '' + p.data;
  while (p = p.next) {
    ret += s + p.data;
  }return ret;
};

BufferList.prototype.concat = function (n) {
  if (this.length === 0) return bufferShim.alloc(0);
  if (this.length === 1) return this.head.data;
  var ret = bufferShim.allocUnsafe(n >>> 0);
  var p = this.head;
  var i = 0;
  while (p) {
    p.data.copy(ret, i);
    i += p.data.length;
    p = p.next;
  }
  return ret;
};

/***/ }),
/* 483 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);


/***/ }),
/* 484 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(38);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BulkLoad = __webpack_require__(200);
var Debug = __webpack_require__(486);
var EventEmitter = __webpack_require__(31).EventEmitter;
var InstanceLookup = __webpack_require__(487).InstanceLookup;
var TYPE = __webpack_require__(92).TYPE;
var PreloginPayload = __webpack_require__(491);
var Login7Payload = __webpack_require__(488);
var NTLMResponsePayload = __webpack_require__(490);
var Request = __webpack_require__(204);
var RpcRequestPayload = __webpack_require__(492);
var SqlBatchPayload = __webpack_require__(494);
var MessageIO = __webpack_require__(489);
var TokenStreamParser = __webpack_require__(506).Parser;
var Transaction = __webpack_require__(140).Transaction;
var ISOLATION_LEVEL = __webpack_require__(140).ISOLATION_LEVEL;
var crypto = __webpack_require__(142);
var ConnectionError = __webpack_require__(73).ConnectionError;
var RequestError = __webpack_require__(73).RequestError;
var Connector = __webpack_require__(485).Connector;

// A rather basic state machine for managing a connection.
// Implements something approximating s3.2.1.

var KEEP_ALIVE_INITIAL_DELAY = 30 * 1000;
var DEFAULT_CONNECT_TIMEOUT = 15 * 1000;
var DEFAULT_CLIENT_REQUEST_TIMEOUT = 15 * 1000;
var DEFAULT_CANCEL_TIMEOUT = 5 * 1000;
var DEFAULT_PACKET_SIZE = 4 * 1024;
var DEFAULT_TEXTSIZE = '2147483647';
var DEFAULT_DATEFIRST = 7;
var DEFAULT_PORT = 1433;
var DEFAULT_TDS_VERSION = '7_4';

var Connection = function (_EventEmitter) {
  (0, _inherits3.default)(Connection, _EventEmitter);

  function Connection(config) {
    (0, _classCallCheck3.default)(this, Connection);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Connection.__proto__ || (0, _getPrototypeOf2.default)(Connection)).call(this));

    if (!config) {
      throw new TypeError('No connection configuration given');
    }

    if (typeof config.server !== 'string') {
      throw new TypeError('Invalid server: ' + config.server);
    }

    _this.config = {
      server: config.server,
      userName: config.userName,
      password: config.password,
      domain: config.domain && config.domain.toUpperCase(),
      options: {
        abortTransactionOnError: false,
        appName: undefined,
        camelCaseColumns: false,
        cancelTimeout: DEFAULT_CANCEL_TIMEOUT,
        columnNameReplacer: undefined,
        connectTimeout: DEFAULT_CONNECT_TIMEOUT,
        connectionIsolationLevel: ISOLATION_LEVEL.READ_COMMITTED,
        cryptoCredentialsDetails: {},
        database: undefined,
        datefirst: DEFAULT_DATEFIRST,
        debug: {
          data: false,
          packet: false,
          payload: false,
          token: false
        },
        enableArithAbort: false,
        enableAnsiNullDefault: true,
        encrypt: false,
        fallbackToDefaultDb: false,
        instanceName: undefined,
        isolationLevel: ISOLATION_LEVEL.READ_COMMITTED,
        localAddress: undefined,
        multiSubnetFailover: false,
        packetSize: DEFAULT_PACKET_SIZE,
        port: DEFAULT_PORT,
        readOnlyIntent: false,
        requestTimeout: DEFAULT_CLIENT_REQUEST_TIMEOUT,
        rowCollectionOnDone: false,
        rowCollectionOnRequestCompletion: false,
        tdsVersion: DEFAULT_TDS_VERSION,
        textsize: DEFAULT_TEXTSIZE,
        trustServerCertificate: true,
        useColumnNames: false,
        useUTC: true
      }
    };

    if (config.options) {
      if (config.options.port && config.options.instanceName) {
        throw new Error('Port and instanceName are mutually exclusive, but ' + config.options.port + ' and ' + config.options.instanceName + ' provided');
      }

      if (config.options.abortTransactionOnError != undefined) {
        _this.config.options.abortTransactionOnError = config.options.abortTransactionOnError;
      }

      if (config.options.appName != undefined) {
        _this.config.options.appName = config.options.appName;
      }

      if (config.options.camelCaseColumns != undefined) {
        _this.config.options.camelCaseColumns = config.options.camelCaseColumns;
      }

      if (config.options.cancelTimeout != undefined) {
        _this.config.options.cancelTimeout = config.options.cancelTimeout;
      }

      if (config.options.columnNameReplacer) {
        if (typeof config.options.columnNameReplacer !== 'function') {
          throw new TypeError('options.columnNameReplacer must be a function or null.');
        }

        _this.config.options.columnNameReplacer = config.options.columnNameReplacer;
      }

      if (config.options.connectTimeout) {
        _this.config.options.connectTimeout = config.options.connectTimeout;
      }

      if (config.options.connectionIsolationLevel) {
        _this.config.options.connectionIsolationLevel = config.options.connectionIsolationLevel;
      }

      if (config.options.cryptoCredentialsDetails) {
        _this.config.options.cryptoCredentialsDetails = config.options.cryptoCredentialsDetails;
      }

      if (config.options.database != undefined) {
        _this.config.options.database = config.options.database;
      }

      if (config.options.datefirst) {
        if (config.options.datefirst < 1 || config.options.datefirst > 7) {
          throw new RangeError('DateFirst should be >= 1 and <= 7');
        }

        _this.config.options.datefirst = config.options.datefirst;
      }

      if (config.options.debug) {
        if (config.options.debug.data != undefined) {
          _this.config.options.debug.data = config.options.debug.data;
        }
        if (config.options.debug.packet != undefined) {
          _this.config.options.debug.packet = config.options.debug.packet;
        }
        if (config.options.debug.payload != undefined) {
          _this.config.options.debug.payload = config.options.debug.payload;
        }
        if (config.options.debug.token != undefined) {
          _this.config.options.debug.token = config.options.debug.token;
        }
      }

      if (config.options.enableAnsiNullDefault != undefined) {
        _this.config.options.enableAnsiNullDefault = config.options.enableAnsiNullDefault;
      }

      if (config.options.enableArithAbort !== undefined) {
        if (typeof config.options.enableArithAbort !== 'boolean') {
          throw new TypeError('options.enableArithAbort must be a boolean (true or false).');
        }

        _this.config.options.enableArithAbort = config.options.enableArithAbort;
      }

      if (config.options.encrypt != undefined) {
        _this.config.options.encrypt = config.options.encrypt;
      }

      if (config.options.fallbackToDefaultDb != undefined) {
        _this.config.options.fallbackToDefaultDb = config.options.fallbackToDefaultDb;
      }

      if (config.options.instanceName != undefined) {
        _this.config.options.instanceName = config.options.instanceName;
        _this.config.options.port = undefined;
      }

      if (config.options.isolationLevel) {
        _this.config.options.isolationLevel = config.options.isolationLevel;
      }

      if (config.options.localAddress != undefined) {
        _this.config.options.localAddress = config.options.localAddress;
      }

      if (config.options.multiSubnetFailover != undefined) {
        _this.config.options.multiSubnetFailover = !!config.options.multiSubnetFailover;
      }

      if (config.options.packetSize) {
        _this.config.options.packetSize = config.options.packetSize;
      }

      if (config.options.port) {
        if (config.options.port < 0 || config.options.port > 65536) {
          throw new RangeError('Port should be > 0 and < 65536');
        }

        _this.config.options.port = config.options.port;
        _this.config.options.instanceName = undefined;
      }

      if (config.options.readOnlyIntent != undefined) {
        _this.config.options.readOnlyIntent = config.options.readOnlyIntent;
      }

      if (config.options.requestTimeout != undefined) {
        _this.config.options.requestTimeout = config.options.requestTimeout;
      }

      if (config.options.rowCollectionOnDone != undefined) {
        _this.config.options.rowCollectionOnDone = config.options.rowCollectionOnDone;
      }

      if (config.options.rowCollectionOnRequestCompletion != undefined) {
        _this.config.options.rowCollectionOnRequestCompletion = config.options.rowCollectionOnRequestCompletion;
      }

      if (config.options.tdsVersion) {
        _this.config.options.tdsVersion = config.options.tdsVersion;
      }

      if (config.options.textsize) {
        _this.config.options.textsize = config.options.textsize;
      }

      if (config.options.trustServerCertificate != undefined) {
        _this.config.options.trustServerCertificate = config.options.trustServerCertificate;
      }

      if (config.options.useColumnNames != undefined) {
        _this.config.options.useColumnNames = config.options.useColumnNames;
      }

      if (config.options.useUTC != undefined) {
        _this.config.options.useUTC = config.options.useUTC;
      }
    }

    _this.reset = _this.reset.bind(_this);
    _this.socketClose = _this.socketClose.bind(_this);
    _this.socketEnd = _this.socketEnd.bind(_this);
    _this.socketConnect = _this.socketConnect.bind(_this);
    _this.socketError = _this.socketError.bind(_this);
    _this.requestTimeout = _this.requestTimeout.bind(_this);
    _this.connectTimeout = _this.connectTimeout.bind(_this);
    _this.createDebug();
    _this.createTokenStreamParser();
    _this.inTransaction = false;
    _this.transactionDescriptors = [new Buffer([0, 0, 0, 0, 0, 0, 0, 0])];
    _this.transitionTo(_this.STATE.CONNECTING);

    if (_this.config.options.tdsVersion < '7_2') {
      // 'beginTransaction', 'commitTransaction' and 'rollbackTransaction'
      // events are utilized to maintain inTransaction property state which in
      // turn is used in managing transactions. These events are only fired for
      // TDS version 7.2 and beyond. The properties below are used to emulate
      // equivalent behavior for TDS versions before 7.2.
      _this.transactionDepth = 0;
      _this.isSqlBatch = false;
    }
    return _this;
  }

  (0, _createClass3.default)(Connection, [{
    key: 'close',
    value: function close() {
      return this.transitionTo(this.STATE.FINAL);
    }
  }, {
    key: 'initialiseConnection',
    value: function initialiseConnection() {
      this.connect();
      return this.createConnectTimer();
    }
  }, {
    key: 'cleanupConnection',
    value: function cleanupConnection(redirect) {
      this.redirect = redirect;
      if (!this.closed) {
        this.clearConnectTimer();
        this.clearRequestTimer();
        this.closeConnection();
        if (!this.redirect) {
          this.emit('end');
        } else {
          this.emit('rerouting');
        }
        if (this.request) {
          var err = RequestError('Connection closed before request completed.', 'ECLOSE');
          this.request.callback(err);
          this.request = undefined;
        }
        this.closed = true;
        this.loggedIn = false;
        return this.loginError = null;
      }
    }
  }, {
    key: 'createDebug',
    value: function createDebug() {
      var _this2 = this;

      this.debug = new Debug(this.config.options.debug);
      return this.debug.on('debug', function (message) {
        return _this2.emit('debug', message);
      });
    }
  }, {
    key: 'createTokenStreamParser',
    value: function createTokenStreamParser() {
      var _this3 = this;

      this.tokenStreamParser = new TokenStreamParser(this.debug, undefined, this.config.options);

      this.tokenStreamParser.on('infoMessage', function (token) {
        return _this3.emit('infoMessage', token);
      });

      this.tokenStreamParser.on('sspichallenge', function (token) {
        if (token.ntlmpacket) {
          _this3.ntlmpacket = token.ntlmpacket;
        }
        return _this3.emit('sspichallenge', token);
      });

      this.tokenStreamParser.on('errorMessage', function (token) {
        _this3.emit('errorMessage', token);
        if (_this3.loggedIn) {
          if (_this3.request) {
            _this3.request.error = RequestError(token.message, 'EREQUEST');
            _this3.request.error.number = token.number;
            _this3.request.error.state = token.state;
            _this3.request.error['class'] = token['class'];
            _this3.request.error.serverName = token.serverName;
            _this3.request.error.procName = token.procName;
            return _this3.request.error.lineNumber = token.lineNumber;
          }
        } else {
          return _this3.loginError = ConnectionError(token.message, 'ELOGIN');
        }
      });

      this.tokenStreamParser.on('databaseChange', function (token) {
        return _this3.emit('databaseChange', token.newValue);
      });

      this.tokenStreamParser.on('languageChange', function (token) {
        return _this3.emit('languageChange', token.newValue);
      });

      this.tokenStreamParser.on('charsetChange', function (token) {
        return _this3.emit('charsetChange', token.newValue);
      });

      this.tokenStreamParser.on('loginack', function (token) {
        if (!token.tdsVersion) {
          // unsupported TDS version
          _this3.loginError = ConnectionError('Server responded with unknown TDS version.', 'ETDS');
          _this3.loggedIn = false;
          return;
        }

        if (!token['interface']) {
          // unsupported interface
          _this3.loginError = ConnectionError('Server responded with unsupported interface.', 'EINTERFACENOTSUPP');
          _this3.loggedIn = false;
          return;
        }

        // use negotiated version
        _this3.config.options.tdsVersion = token.tdsVersion;
        return _this3.loggedIn = true;
      });

      this.tokenStreamParser.on('routingChange', function (token) {
        _this3.routingData = token.newValue;
        return _this3.dispatchEvent('routingChange');
      });

      this.tokenStreamParser.on('packetSizeChange', function (token) {
        return _this3.messageIo.packetSize(token.newValue);
      });

      // A new top-level transaction was started. This is not fired
      // for nested transactions.
      this.tokenStreamParser.on('beginTransaction', function (token) {
        _this3.transactionDescriptors.push(token.newValue);
        return _this3.inTransaction = true;
      });

      // A top-level transaction was committed. This is not fired
      // for nested transactions.
      this.tokenStreamParser.on('commitTransaction', function () {
        _this3.transactionDescriptors.length = 1;
        return _this3.inTransaction = false;
      });

      // A top-level transaction was rolled back. This is not fired
      // for nested transactions. This is also fired if a batch
      // aborting error happened that caused a rollback.
      this.tokenStreamParser.on('rollbackTransaction', function () {
        _this3.transactionDescriptors.length = 1;
        // An outermost transaction was rolled back. Reset the transaction counter
        _this3.inTransaction = false;
        return _this3.emit('rollbackTransaction');
      });

      this.tokenStreamParser.on('columnMetadata', function (token) {
        if (_this3.request) {
          var columns = void 0;
          if (_this3.config.options.useColumnNames) {
            columns = {};
            for (var j = 0, len = token.columns.length; j < len; j++) {
              var col = token.columns[j];
              if (columns[col.colName] == null) {
                columns[col.colName] = col;
              }
            }
          } else {
            columns = token.columns;
          }
          return _this3.request.emit('columnMetadata', columns);
        } else {
          _this3.emit('error', new Error("Received 'columnMetadata' when no sqlRequest is in progress"));
          return _this3.close();
        }
      });

      this.tokenStreamParser.on('order', function (token) {
        if (_this3.request) {
          return _this3.request.emit('order', token.orderColumns);
        } else {
          _this3.emit('error', new Error("Received 'order' when no sqlRequest is in progress"));
          return _this3.close();
        }
      });

      this.tokenStreamParser.on('row', function (token) {
        if (_this3.request) {
          if (_this3.config.options.rowCollectionOnRequestCompletion) {
            _this3.request.rows.push(token.columns);
          }
          if (_this3.config.options.rowCollectionOnDone) {
            _this3.request.rst.push(token.columns);
          }
          return _this3.request.emit('row', token.columns);
        } else {
          _this3.emit('error', new Error("Received 'row' when no sqlRequest is in progress"));
          return _this3.close();
        }
      });

      this.tokenStreamParser.on('returnStatus', function (token) {
        if (_this3.request) {
          // Keep value for passing in 'doneProc' event.
          return _this3.procReturnStatusValue = token.value;
        }
      });

      this.tokenStreamParser.on('returnValue', function (token) {
        if (_this3.request) {
          return _this3.request.emit('returnValue', token.paramName, token.value, token.metadata);
        }
      });

      this.tokenStreamParser.on('doneProc', function (token) {
        if (_this3.request) {
          _this3.request.emit('doneProc', token.rowCount, token.more, _this3.procReturnStatusValue, _this3.request.rst);
          _this3.procReturnStatusValue = undefined;
          if (token.rowCount !== undefined) {
            _this3.request.rowCount += token.rowCount;
          }
          if (_this3.config.options.rowCollectionOnDone) {
            return _this3.request.rst = [];
          }
        }
      });

      this.tokenStreamParser.on('doneInProc', function (token) {
        if (_this3.request) {
          _this3.request.emit('doneInProc', token.rowCount, token.more, _this3.request.rst);
          if (token.rowCount !== undefined) {
            _this3.request.rowCount += token.rowCount;
          }
          if (_this3.config.options.rowCollectionOnDone) {
            return _this3.request.rst = [];
          }
        }
      });

      this.tokenStreamParser.on('done', function (token) {
        if (_this3.request) {
          if (token.attention) {
            _this3.dispatchEvent('attention');
          }
          if (token.sqlError && !_this3.request.error) {
            // check if the DONE_ERROR flags was set, but an ERROR token was not sent.
            _this3.request.error = RequestError('An unknown error has occurred.', 'UNKNOWN');
          }
          _this3.request.emit('done', token.rowCount, token.more, _this3.request.rst);
          if (token.rowCount !== undefined) {
            _this3.request.rowCount += token.rowCount;
          }
          if (_this3.config.options.rowCollectionOnDone) {
            return _this3.request.rst = [];
          }
        }
      });

      this.tokenStreamParser.on('resetConnection', function () {
        return _this3.emit('resetConnection');
      });

      this.tokenStreamParser.on('tokenStreamError', function (error) {
        _this3.emit('error', error);
        return _this3.close();
      });
    }
  }, {
    key: 'connect',
    value: function connect() {
      var _this4 = this;

      if (this.config.options.port) {
        return this.connectOnPort(this.config.options.port, this.config.options.multiSubnetFailover);
      } else {
        return new InstanceLookup().instanceLookup({
          server: this.config.server,
          instanceName: this.config.options.instanceName,
          timeout: this.config.options.connectTimeout
        }, function (message, port) {
          if (_this4.state === _this4.STATE.FINAL) {
            return;
          }
          if (message) {
            return _this4.emit('connect', ConnectionError(message, 'EINSTLOOKUP'));
          } else {
            return _this4.connectOnPort(port, _this4.config.options.multiSubnetFailover);
          }
        });
      }
    }
  }, {
    key: 'connectOnPort',
    value: function connectOnPort(port, multiSubnetFailover) {
      var _this5 = this;

      var connectOpts = {
        host: this.routingData ? this.routingData.server : this.config.server,
        port: this.routingData ? this.routingData.port : port,
        localAddress: this.config.options.localAddress
      };

      new Connector(connectOpts, multiSubnetFailover).execute(function (err, socket) {
        if (err) {
          return _this5.socketError(err);
        }

        _this5.socket = socket;
        _this5.socket.on('error', _this5.socketError);
        _this5.socket.on('close', _this5.socketClose);
        _this5.socket.on('end', _this5.socketEnd);
        _this5.messageIo = new MessageIO(_this5.socket, _this5.config.options.packetSize, _this5.debug);
        _this5.messageIo.on('data', function (data) {
          _this5.dispatchEvent('data', data);
        });
        _this5.messageIo.on('message', function () {
          _this5.dispatchEvent('message');
        });
        _this5.messageIo.on('secure', _this5.emit.bind(_this5, 'secure'));

        _this5.socketConnect();
      });
    }
  }, {
    key: 'closeConnection',
    value: function closeConnection() {
      if (this.socket) {
        this.socket.destroy();
      }
    }
  }, {
    key: 'createConnectTimer',
    value: function createConnectTimer() {
      return this.connectTimer = setTimeout(this.connectTimeout, this.config.options.connectTimeout);
    }
  }, {
    key: 'createRequestTimer',
    value: function createRequestTimer() {
      this.clearRequestTimer(); // release old timer, just to be safe
      if (this.config.options.requestTimeout) {
        return this.requestTimer = setTimeout(this.requestTimeout, this.config.options.requestTimeout);
      }
    }
  }, {
    key: 'connectTimeout',
    value: function connectTimeout() {
      var message = 'Failed to connect to ' + this.config.server + ':' + this.config.options.port + ' in ' + this.config.options.connectTimeout + 'ms';
      this.debug.log(message);
      this.emit('connect', ConnectionError(message, 'ETIMEOUT'));
      this.connectTimer = undefined;
      return this.dispatchEvent('connectTimeout');
    }
  }, {
    key: 'requestTimeout',
    value: function requestTimeout() {
      this.requestTimer = undefined;
      this.messageIo.sendMessage(TYPE.ATTENTION);
      return this.transitionTo(this.STATE.SENT_ATTENTION);
    }
  }, {
    key: 'clearConnectTimer',
    value: function clearConnectTimer() {
      if (this.connectTimer) {
        return clearTimeout(this.connectTimer);
      }
    }
  }, {
    key: 'clearRequestTimer',
    value: function clearRequestTimer() {
      if (this.requestTimer) {
        clearTimeout(this.requestTimer);
        this.requestTimer = undefined;
      }
    }
  }, {
    key: 'transitionTo',
    value: function transitionTo(newState) {
      if (this.state === newState) {
        this.debug.log('State is already ' + newState.name);
        return;
      }

      if (this.state && this.state.exit) {
        this.state.exit.apply(this);
      }

      this.debug.log('State change: ' + (this.state ? this.state.name : undefined) + ' -> ' + newState.name);
      this.state = newState;

      if (this.state.enter) {
        return this.state.enter.apply(this);
      }
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(eventName) {
      if (this.state.events[eventName]) {
        var args = new Array(arguments.length - 1);
        for (var i = 0; i < args.length;) {
          args[i++] = arguments[i];
        }
        return this.state.events[eventName].apply(this, args);
      } else {
        this.emit('error', new Error(`No event '${eventName}' in state '${this.state.name}'`));
        return this.close();
      }
    }
  }, {
    key: 'socketError',
    value: function socketError(error) {
      if (this.state === this.STATE.CONNECTING) {
        var message = `Failed to connect to ${this.config.server}:${this.config.options.port} - ${error.message}`;
        this.debug.log(message);
        this.emit('connect', ConnectionError(message, 'ESOCKET'));
      } else {
        var _message = `Connection lost - ${error.message}`;
        this.debug.log(_message);
        this.emit('error', ConnectionError(_message, 'ESOCKET'));
      }
      return this.dispatchEvent('socketError', error);
    }
  }, {
    key: 'socketConnect',
    value: function socketConnect() {
      this.socket.setKeepAlive(true, KEEP_ALIVE_INITIAL_DELAY);
      this.closed = false;
      this.debug.log('connected to ' + this.config.server + ':' + this.config.options.port);
      return this.dispatchEvent('socketConnect');
    }
  }, {
    key: 'socketEnd',
    value: function socketEnd() {
      this.debug.log('socket ended');
      return this.transitionTo(this.STATE.FINAL);
    }
  }, {
    key: 'socketClose',
    value: function socketClose() {
      this.debug.log('connection to ' + this.config.server + ':' + this.config.options.port + ' closed');
      if (this.state === this.STATE.REROUTING) {
        this.debug.log('Rerouting to ' + this.routingData.server + ':' + this.routingData.port);
        return this.dispatchEvent('reconnect');
      } else {
        return this.transitionTo(this.STATE.FINAL);
      }
    }
  }, {
    key: 'sendPreLogin',
    value: function sendPreLogin() {
      var payload = new PreloginPayload({
        encrypt: this.config.options.encrypt
      });
      this.messageIo.sendMessage(TYPE.PRELOGIN, payload.data);
      return this.debug.payload(function () {
        return payload.toString('  ');
      });
    }
  }, {
    key: 'emptyMessageBuffer',
    value: function emptyMessageBuffer() {
      return this.messageBuffer = new Buffer(0);
    }
  }, {
    key: 'addToMessageBuffer',
    value: function addToMessageBuffer(data) {
      return this.messageBuffer = Buffer.concat([this.messageBuffer, data]);
    }
  }, {
    key: 'processPreLoginResponse',
    value: function processPreLoginResponse() {
      var preloginPayload = new PreloginPayload(this.messageBuffer);
      this.debug.payload(function () {
        return preloginPayload.toString('  ');
      });

      if (preloginPayload.encryptionString === 'ON' || preloginPayload.encryptionString === 'REQ') {
        if (!this.config.options.encrypt) {
          this.emit('connect', ConnectionError("Server requires encryption, set 'encrypt' config option to true.", 'EENCRYPT'));
          return this.close();
        }

        return this.dispatchEvent('tls');
      } else {
        return this.dispatchEvent('noTls');
      }
    }
  }, {
    key: 'sendLogin7Packet',
    value: function sendLogin7Packet() {
      var payload = new Login7Payload({
        domain: this.config.domain,
        userName: this.config.userName,
        password: this.config.password,
        database: this.config.options.database,
        serverName: this.routingData ? this.routingData.server : this.config.server,
        appName: this.config.options.appName,
        packetSize: this.config.options.packetSize,
        tdsVersion: this.config.options.tdsVersion,
        initDbFatal: !this.config.options.fallbackToDefaultDb,
        readOnlyIntent: this.config.options.readOnlyIntent
      });

      this.routingData = undefined;
      this.messageIo.sendMessage(TYPE.LOGIN7, payload.data);

      return this.debug.payload(function () {
        return payload.toString('  ');
      });
    }
  }, {
    key: 'sendNTLMResponsePacket',
    value: function sendNTLMResponsePacket() {
      var payload = new NTLMResponsePayload({
        domain: this.config.domain,
        userName: this.config.userName,
        password: this.config.password,
        database: this.config.options.database,
        appName: this.config.options.appName,
        packetSize: this.config.options.packetSize,
        tdsVersion: this.config.options.tdsVersion,
        ntlmpacket: this.ntlmpacket,
        additional: this.additional
      });
      this.messageIo.sendMessage(TYPE.NTLMAUTH_PKT, payload.data);
      return this.debug.payload(function () {
        return payload.toString('  ');
      });
    }
  }, {
    key: 'sendDataToTokenStreamParser',
    value: function sendDataToTokenStreamParser(data) {
      return this.tokenStreamParser.addBuffer(data);
    }
  }, {
    key: 'sendInitialSql',
    value: function sendInitialSql() {
      var payload = new SqlBatchPayload(this.getInitialSql(), this.currentTransactionDescriptor(), this.config.options);
      return this.messageIo.sendMessage(TYPE.SQL_BATCH, payload.data);
    }
  }, {
    key: 'getInitialSql',
    value: function getInitialSql() {
      var xact_abort = this.config.options.abortTransactionOnError ? 'on' : 'off';
      var enableAnsiNullDefault = this.config.options.enableAnsiNullDefault ? 'on' : 'off';
      var enableArithAbort = this.config.options.enableArithAbort ? 'on' : 'off';
      return 'set textsize ' + this.config.options.textsize + '\nset quoted_identifier on\nset arithabort ' + enableArithAbort + '\nset numeric_roundabort off\nset ansi_warnings on\nset ansi_padding on\nset ansi_nulls on\nset ansi_null_dflt_on ' + enableAnsiNullDefault + '\nset concat_null_yields_null on\nset cursor_close_on_commit off\nset implicit_transactions off\nset language us_english\nset dateformat mdy\nset datefirst ' + this.config.options.datefirst + '\nset transaction isolation level ' + this.getIsolationLevelText(this.config.options.connectionIsolationLevel) + '\nset xact_abort ' + xact_abort;
    }
  }, {
    key: 'processedInitialSql',
    value: function processedInitialSql() {
      this.clearConnectTimer();
      return this.emit('connect');
    }
  }, {
    key: 'processLogin7Response',
    value: function processLogin7Response() {
      if (this.loggedIn) {
        return this.dispatchEvent('loggedIn');
      } else {
        if (this.loginError) {
          this.emit('connect', this.loginError);
        } else {
          this.emit('connect', ConnectionError('Login failed.', 'ELOGIN'));
        }
        return this.dispatchEvent('loginFailed');
      }
    }
  }, {
    key: 'processLogin7NTLMResponse',
    value: function processLogin7NTLMResponse() {
      if (this.ntlmpacket) {
        return this.dispatchEvent('receivedChallenge');
      } else {
        if (this.loginError) {
          this.emit('connect', this.loginError);
        } else {
          this.emit('connect', ConnectionError('Login failed.', 'ELOGIN'));
        }
        return this.dispatchEvent('loginFailed');
      }
    }
  }, {
    key: 'processLogin7NTLMAck',
    value: function processLogin7NTLMAck() {
      if (this.loggedIn) {
        return this.dispatchEvent('loggedIn');
      } else {
        if (this.loginError) {
          this.emit('connect', this.loginError);
        } else {
          this.emit('connect', ConnectionError('Login failed.', 'ELOGIN'));
        }
        return this.dispatchEvent('loginFailed');
      }
    }
  }, {
    key: 'execSqlBatch',
    value: function execSqlBatch(request) {
      return this.makeRequest(request, TYPE.SQL_BATCH, new SqlBatchPayload(request.sqlTextOrProcedure, this.currentTransactionDescriptor(), this.config.options));
    }
  }, {
    key: 'execSql',
    value: function execSql(request) {
      var _this6 = this;

      request.transformIntoExecuteSqlRpc();
      if (request.error != null) {
        return process.nextTick(function () {
          _this6.debug.log(request.error.message);
          return request.callback(request.error);
        });
      }
      return this.makeRequest(request, TYPE.RPC_REQUEST, new RpcRequestPayload(request, this.currentTransactionDescriptor(), this.config.options));
    }
  }, {
    key: 'newBulkLoad',
    value: function newBulkLoad(table, callback) {
      return new BulkLoad(table, this.config.options, callback);
    }
  }, {
    key: 'execBulkLoad',
    value: function execBulkLoad(bulkLoad) {
      var _this7 = this;

      var request = new Request(bulkLoad.getBulkInsertSql(), function (error) {
        if (error) {
          if (error.code === 'UNKNOWN') {
            error.message += ' This is likely because the schema of the BulkLoad does not match the schema of the table you are attempting to insert into.';
          }
          bulkLoad.error = error;
          return bulkLoad.callback(error);
        } else {
          return _this7.makeRequest(bulkLoad, TYPE.BULK_LOAD, bulkLoad.getPayload());
        }
      });
      return this.execSqlBatch(request);
    }
  }, {
    key: 'prepare',
    value: function prepare(request) {
      request.transformIntoPrepareRpc();
      return this.makeRequest(request, TYPE.RPC_REQUEST, new RpcRequestPayload(request, this.currentTransactionDescriptor(), this.config.options));
    }
  }, {
    key: 'unprepare',
    value: function unprepare(request) {
      request.transformIntoUnprepareRpc();
      return this.makeRequest(request, TYPE.RPC_REQUEST, new RpcRequestPayload(request, this.currentTransactionDescriptor(), this.config.options));
    }
  }, {
    key: 'execute',
    value: function execute(request, parameters) {
      var _this8 = this;

      request.transformIntoExecuteRpc(parameters);
      if (request.error != null) {
        return process.nextTick(function () {
          _this8.debug.log(request.error.message);
          return request.callback(request.error);
        });
      }
      return this.makeRequest(request, TYPE.RPC_REQUEST, new RpcRequestPayload(request, this.currentTransactionDescriptor(), this.config.options));
    }
  }, {
    key: 'callProcedure',
    value: function callProcedure(request) {
      var _this9 = this;

      request.validateParameters();
      if (request.error != null) {
        return process.nextTick(function () {
          _this9.debug.log(request.error.message);
          return request.callback(request.error);
        });
      }
      return this.makeRequest(request, TYPE.RPC_REQUEST, new RpcRequestPayload(request, this.currentTransactionDescriptor(), this.config.options));
    }
  }, {
    key: 'beginTransaction',
    value: function beginTransaction(callback, name, isolationLevel) {
      var _this10 = this;

      isolationLevel || (isolationLevel = this.config.options.isolationLevel);
      var transaction = new Transaction(name || '', isolationLevel);
      if (this.config.options.tdsVersion < '7_2') {
        var self = this;
        return this.execSqlBatch(new Request('SET TRANSACTION ISOLATION LEVEL ' + transaction.isolationLevelToTSQL() + ';BEGIN TRAN ' + transaction.name, function () {
          self.transactionDepth++;
          if (self.transactionDepth === 1) {
            self.inTransaction = true;
          }
          return callback.apply(null, arguments);
        }));
      }

      var request = new Request(undefined, function (err) {
        return callback(err, _this10.currentTransactionDescriptor());
      });
      return this.makeRequest(request, TYPE.TRANSACTION_MANAGER, transaction.beginPayload(this.currentTransactionDescriptor()));
    }
  }, {
    key: 'commitTransaction',
    value: function commitTransaction(callback, name) {
      var transaction = new Transaction(name || '');
      if (this.config.options.tdsVersion < '7_2') {
        var self = this;
        return this.execSqlBatch(new Request('COMMIT TRAN ' + transaction.name, function () {
          self.transactionDepth--;
          if (self.transactionDepth === 0) {
            self.inTransaction = false;
          }
          return callback.apply(null, arguments);
        }));
      }
      var request = new Request(undefined, callback);
      return this.makeRequest(request, TYPE.TRANSACTION_MANAGER, transaction.commitPayload(this.currentTransactionDescriptor()));
    }
  }, {
    key: 'rollbackTransaction',
    value: function rollbackTransaction(callback, name) {
      var transaction = new Transaction(name || '');
      if (this.config.options.tdsVersion < '7_2') {
        var self = this;
        return this.execSqlBatch(new Request('ROLLBACK TRAN ' + transaction.name, function () {
          self.transactionDepth--;
          if (self.transactionDepth === 0) {
            self.inTransaction = false;
          }
          return callback.apply(null, arguments);
        }));
      }
      var request = new Request(undefined, callback);
      return this.makeRequest(request, TYPE.TRANSACTION_MANAGER, transaction.rollbackPayload(this.currentTransactionDescriptor()));
    }
  }, {
    key: 'saveTransaction',
    value: function saveTransaction(callback, name) {
      var transaction = new Transaction(name);
      if (this.config.options.tdsVersion < '7_2') {
        var self = this;
        return this.execSqlBatch(new Request('SAVE TRAN ' + transaction.name, function () {
          self.transactionDepth++;
          return callback.apply(null, arguments);
        }));
      }
      var request = new Request(undefined, callback);
      return this.makeRequest(request, TYPE.TRANSACTION_MANAGER, transaction.savePayload(this.currentTransactionDescriptor()));
    }
  }, {
    key: 'transaction',
    value: function transaction(cb, isolationLevel) {
      var _this11 = this;

      if (typeof cb !== 'function') {
        throw new TypeError('`cb` must be a function');
      }
      var useSavepoint = this.inTransaction;
      var name = '_tedious_' + crypto.randomBytes(10).toString('hex');
      var self = this;
      var txDone = function txDone(err, done) {
        var args = new Array(arguments.length - 2);
        for (var i = 0; i < args.length;) {
          args[i++] = arguments[i + 1];
        }

        if (err) {
          if (self.inTransaction && self.state === self.STATE.LOGGED_IN) {
            return self.rollbackTransaction(function (txErr) {
              args.unshift(txErr || err);
              return done.apply(null, args);
            }, name);
          } else {
            return process.nextTick(function () {
              args.unshift(err);
              return done.apply(null, args);
            });
          }
        } else {
          if (useSavepoint) {
            return process.nextTick(function () {
              if (self.config.options.tdsVersion < '7_2') {
                self.transactionDepth--;
              }
              args.unshift(null);
              return done.apply(null, args);
            });
          } else {
            return self.commitTransaction(function (txErr) {
              args.unshift(txErr);
              return done.apply(null, args);
            }, name);
          }
        }
      };
      if (useSavepoint) {
        return this.saveTransaction(function (err) {
          if (err) {
            return cb(err);
          }
          if (isolationLevel) {
            return _this11.execSqlBatch(new Request('SET transaction isolation level ' + _this11.getIsolationLevelText(isolationLevel), function (err) {
              return cb(err, txDone);
            }));
          } else {
            return cb(null, txDone);
          }
        }, name);
      } else {
        return this.beginTransaction(function (err) {
          if (err) {
            return cb(err);
          }
          return cb(null, txDone);
        }, name, isolationLevel);
      }
    }
  }, {
    key: 'makeRequest',
    value: function makeRequest(request, packetType, payload) {
      if (this.state !== this.STATE.LOGGED_IN) {
        var message = 'Requests can only be made in the ' + this.STATE.LOGGED_IN.name + ' state, not the ' + this.state.name + ' state';
        this.debug.log(message);
        return request.callback(RequestError(message, 'EINVALIDSTATE'));
      } else {
        if (packetType === TYPE.SQL_BATCH) {
          this.isSqlBatch = true;
        } else {
          this.isSqlBatch = false;
        }

        this.request = request;
        this.request.rowCount = 0;
        this.request.rows = [];
        this.request.rst = [];
        this.createRequestTimer();
        this.messageIo.sendMessage(packetType, payload.data, this.resetConnectionOnNextRequest);
        this.resetConnectionOnNextRequest = false;
        this.debug.payload(function () {
          return payload.toString('  ');
        });
        return this.transitionTo(this.STATE.SENT_CLIENT_REQUEST);
      }
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      if (this.state !== this.STATE.SENT_CLIENT_REQUEST) {
        var message = 'Requests can only be canceled in the ' + this.STATE.SENT_CLIENT_REQUEST.name + ' state, not the ' + this.state.name + ' state';
        this.debug.log(message);
        return false;
      } else {
        this.request.canceled = true;
        this.messageIo.sendMessage(TYPE.ATTENTION);
        this.transitionTo(this.STATE.SENT_ATTENTION);
        return true;
      }
    }
  }, {
    key: 'reset',
    value: function reset(callback) {
      var self = this;
      var request = new Request(this.getInitialSql(), function (err) {
        if (self.config.options.tdsVersion < '7_2') {
          self.inTransaction = false;
        }
        return callback(err);
      });
      this.resetConnectionOnNextRequest = true;
      return this.execSqlBatch(request);
    }
  }, {
    key: 'currentTransactionDescriptor',
    value: function currentTransactionDescriptor() {
      return this.transactionDescriptors[this.transactionDescriptors.length - 1];
    }
  }, {
    key: 'getIsolationLevelText',
    value: function getIsolationLevelText(isolationLevel) {
      switch (isolationLevel) {
        case ISOLATION_LEVEL.READ_UNCOMMITTED:
          return 'read uncommitted';
        case ISOLATION_LEVEL.REPEATABLE_READ:
          return 'repeatable read';
        case ISOLATION_LEVEL.SERIALIZABLE:
          return 'serializable';
        case ISOLATION_LEVEL.SNAPSHOT:
          return 'snapshot';
        default:
          return 'read committed';
      }
    }
  }]);
  return Connection;
}(EventEmitter);

module.exports = Connection;

Connection.prototype.STATE = {
  CONNECTING: {
    name: 'Connecting',
    enter: function enter() {
      return this.initialiseConnection();
    },
    events: {
      socketError: function socketError() {
        return this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function connectTimeout() {
        return this.transitionTo(this.STATE.FINAL);
      },
      socketConnect: function socketConnect() {
        this.sendPreLogin();
        return this.transitionTo(this.STATE.SENT_PRELOGIN);
      }
    }
  },
  SENT_PRELOGIN: {
    name: 'SentPrelogin',
    enter: function enter() {
      return this.emptyMessageBuffer();
    },
    events: {
      socketError: function socketError() {
        return this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function connectTimeout() {
        return this.transitionTo(this.STATE.FINAL);
      },
      data: function data(_data) {
        return this.addToMessageBuffer(_data);
      },
      message: function message() {
        return this.processPreLoginResponse();
      },
      noTls: function noTls() {
        this.sendLogin7Packet();
        if (this.config.domain) {
          return this.transitionTo(this.STATE.SENT_LOGIN7_WITH_NTLM);
        } else {
          return this.transitionTo(this.STATE.SENT_LOGIN7_WITH_STANDARD_LOGIN);
        }
      },
      tls: function tls() {
        this.messageIo.startTls(this.config.options.cryptoCredentialsDetails, this.config.server, this.config.options.trustServerCertificate);
        return this.transitionTo(this.STATE.SENT_TLSSSLNEGOTIATION);
      }
    }
  },
  REROUTING: {
    name: 'ReRouting',
    enter: function enter() {
      return this.cleanupConnection(true);
    },
    events: {
      message: function message() {},
      socketError: function socketError() {
        return this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function connectTimeout() {
        return this.transitionTo(this.STATE.FINAL);
      },
      reconnect: function reconnect() {
        return this.transitionTo(this.STATE.CONNECTING);
      }
    }
  },
  SENT_TLSSSLNEGOTIATION: {
    name: 'SentTLSSSLNegotiation',
    events: {
      socketError: function socketError() {
        return this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function connectTimeout() {
        return this.transitionTo(this.STATE.FINAL);
      },
      data: function data(_data2) {
        return this.messageIo.tlsHandshakeData(_data2);
      },
      message: function message() {
        if (this.messageIo.tlsNegotiationComplete) {
          this.sendLogin7Packet();
          if (this.config.domain) {
            return this.transitionTo(this.STATE.SENT_LOGIN7_WITH_NTLM);
          } else {
            return this.transitionTo(this.STATE.SENT_LOGIN7_WITH_STANDARD_LOGIN);
          }
        }
      }
    }
  },
  SENT_LOGIN7_WITH_STANDARD_LOGIN: {
    name: 'SentLogin7WithStandardLogin',
    events: {
      socketError: function socketError() {
        return this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function connectTimeout() {
        return this.transitionTo(this.STATE.FINAL);
      },
      data: function data(_data3) {
        return this.sendDataToTokenStreamParser(_data3);
      },
      loggedIn: function loggedIn() {
        return this.transitionTo(this.STATE.LOGGED_IN_SENDING_INITIAL_SQL);
      },
      routingChange: function routingChange() {
        return this.transitionTo(this.STATE.REROUTING);
      },
      loginFailed: function loginFailed() {
        return this.transitionTo(this.STATE.FINAL);
      },
      message: function message() {
        return this.processLogin7Response();
      }
    }
  },
  SENT_LOGIN7_WITH_NTLM: {
    name: 'SentLogin7WithNTLMLogin',
    events: {
      socketError: function socketError() {
        return this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function connectTimeout() {
        return this.transitionTo(this.STATE.FINAL);
      },
      data: function data(_data4) {
        return this.sendDataToTokenStreamParser(_data4);
      },
      receivedChallenge: function receivedChallenge() {
        this.sendNTLMResponsePacket();
        return this.transitionTo(this.STATE.SENT_NTLM_RESPONSE);
      },
      loginFailed: function loginFailed() {
        return this.transitionTo(this.STATE.FINAL);
      },
      message: function message() {
        return this.processLogin7NTLMResponse();
      }
    }
  },
  SENT_NTLM_RESPONSE: {
    name: 'SentNTLMResponse',
    events: {
      socketError: function socketError() {
        return this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function connectTimeout() {
        return this.transitionTo(this.STATE.FINAL);
      },
      data: function data(_data5) {
        return this.sendDataToTokenStreamParser(_data5);
      },
      loggedIn: function loggedIn() {
        return this.transitionTo(this.STATE.LOGGED_IN_SENDING_INITIAL_SQL);
      },
      loginFailed: function loginFailed() {
        return this.transitionTo(this.STATE.FINAL);
      },
      routingChange: function routingChange() {
        return this.transitionTo(this.STATE.REROUTING);
      },
      message: function message() {
        return this.processLogin7NTLMAck();
      }
    }
  },
  LOGGED_IN_SENDING_INITIAL_SQL: {
    name: 'LoggedInSendingInitialSql',
    enter: function enter() {
      return this.sendInitialSql();
    },
    events: {
      connectTimeout: function connectTimeout() {
        return this.transitionTo(this.STATE.FINAL);
      },
      data: function data(_data6) {
        return this.sendDataToTokenStreamParser(_data6);
      },
      message: function message() {
        this.transitionTo(this.STATE.LOGGED_IN);
        return this.processedInitialSql();
      }
    }
  },
  LOGGED_IN: {
    name: 'LoggedIn',
    events: {
      socketError: function socketError() {
        return this.transitionTo(this.STATE.FINAL);
      }
    }
  },
  SENT_CLIENT_REQUEST: {
    name: 'SentClientRequest',
    exit: function exit() {
      this.clearRequestTimer();
    },
    events: {
      socketError: function socketError(err) {
        var sqlRequest = this.request;
        this.request = undefined;
        sqlRequest.callback(err);
        return this.transitionTo(this.STATE.FINAL);
      },
      data: function data(_data7) {
        this.clearRequestTimer(); // request timer is stopped on first data package
        return this.sendDataToTokenStreamParser(_data7);
      },
      message: function message() {
        this.transitionTo(this.STATE.LOGGED_IN);
        var sqlRequest = this.request;
        this.request = undefined;
        if (this.config.options.tdsVersion < '7_2' && sqlRequest.error && this.isSqlBatch) {
          this.inTransaction = false;
        }
        return sqlRequest.callback(sqlRequest.error, sqlRequest.rowCount, sqlRequest.rows);
      }
    }
  },
  SENT_ATTENTION: {
    name: 'SentAttention',
    enter: function enter() {
      return this.attentionReceived = false;
    },
    events: {
      socketError: function socketError() {
        return this.transitionTo(this.STATE.FINAL);
      },
      data: function data(_data8) {
        return this.sendDataToTokenStreamParser(_data8);
      },
      attention: function attention() {
        return this.attentionReceived = true;
      },
      message: function message() {
        // 3.2.5.7 Sent Attention State
        // Discard any data contained in the response, until we receive the attention response
        if (this.attentionReceived) {
          var sqlRequest = this.request;
          this.request = undefined;
          this.transitionTo(this.STATE.LOGGED_IN);
          if (sqlRequest.canceled) {
            return sqlRequest.callback(RequestError('Canceled.', 'ECANCEL'));
          } else {
            var message = 'Timeout: Request failed to complete in ' + this.config.options.requestTimeout + 'ms';
            return sqlRequest.callback(RequestError(message, 'ETIMEOUT'));
          }
        }
      }
    }
  },
  FINAL: {
    name: 'Final',
    enter: function enter() {
      return this.cleanupConnection();
    },
    events: {
      loginFailed: function loginFailed() {
        // Do nothing. The connection was probably closed by the client code.
      },
      connectTimeout: function connectTimeout() {
        // Do nothing, as the timer should be cleaned up.
      },
      message: function message() {
        // Do nothing
      },
      socketError: function socketError() {
        // Do nothing
      }
    }
  }
};

/***/ }),
/* 485 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _create = __webpack_require__(144);

var _create2 = _interopRequireDefault(_create);

var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var net = __webpack_require__(143);
var dns = __webpack_require__(207);

var Connector = function () {
  function Connector(options, multiSubnetFailover) {
    (0, _classCallCheck3.default)(this, Connector);

    this.options = options;
    this.multiSubnetFailover = multiSubnetFailover;
  }

  (0, _createClass3.default)(Connector, [{
    key: 'execute',
    value: function execute(cb) {
      if (net.isIP(this.options.host)) {
        this.executeForIP(cb);
      } else {
        this.executeForHostname(cb);
      }
    }
  }, {
    key: 'executeForIP',
    value: function executeForIP(cb) {
      var socket = net.connect(this.options);

      var onError = function onError(err) {
        socket.removeListener('error', onError);
        socket.removeListener('connect', onConnect);

        socket.destroy();

        cb(err);
      };

      var onConnect = function onConnect() {
        socket.removeListener('error', onError);
        socket.removeListener('connect', onConnect);

        cb(null, socket);
      };

      socket.on('error', onError);
      socket.on('connect', onConnect);
    }
  }, {
    key: 'executeForHostname',
    value: function executeForHostname(cb) {
      var _this = this;

      dns.lookup(this.options.host, { all: true }, function (err, addresses) {
        if (err) {
          return cb(err);
        }

        if (_this.multiSubnetFailover) {
          new ParallelConnectionStrategy(addresses, _this.options).connect(cb);
        } else {
          new SequentialConnectionStrategy(addresses, _this.options).connect(cb);
        }
      });
    }
  }]);
  return Connector;
}();

var ParallelConnectionStrategy = function () {
  function ParallelConnectionStrategy(addresses, options) {
    (0, _classCallCheck3.default)(this, ParallelConnectionStrategy);

    this.addresses = addresses;
    this.options = options;
  }

  (0, _createClass3.default)(ParallelConnectionStrategy, [{
    key: 'connect',
    value: function connect(callback) {
      var addresses = this.addresses;
      var sockets = new Array(addresses.length);

      var errorCount = 0;
      var onError = function onError(err) {
        errorCount += 1;

        this.removeListener('error', onError);
        this.removeListener('connect', onConnect);

        if (errorCount === addresses.length) {
          callback(new Error('Could not connect (parallel)'));
        }
      };

      var onConnect = function onConnect() {
        for (var j = 0; j < sockets.length; j++) {
          var socket = sockets[j];

          if (this === socket) {
            continue;
          }

          socket.removeListener('error', onError);
          socket.removeListener('connect', onConnect);
          socket.destroy();
        }

        callback(null, this);
      };

      for (var i = 0, len = addresses.length; i < len; i++) {
        var socket = sockets[i] = net.connect((0, _create2.default)(this.options, {
          host: { value: addresses[i].address }
        }));

        socket.on('error', onError);
        socket.on('connect', onConnect);
      }
    }
  }]);
  return ParallelConnectionStrategy;
}();

var SequentialConnectionStrategy = function () {
  function SequentialConnectionStrategy(addresses, options) {
    (0, _classCallCheck3.default)(this, SequentialConnectionStrategy);

    this.addresses = addresses;
    this.options = options;
  }

  (0, _createClass3.default)(SequentialConnectionStrategy, [{
    key: 'connect',
    value: function connect(callback) {
      var _this2 = this;

      var addresses = this.addresses;

      if (!addresses.length) {
        callback(new Error('Could not connect (sequence)'));
        return;
      }

      var next = addresses.shift();

      var socket = net.connect((0, _create2.default)(this.options, {
        host: { value: next.address }
      }));

      var onError = function onError(err) {
        socket.removeListener('error', onError);
        socket.removeListener('connect', onConnect);

        socket.destroy();

        _this2.connect(callback);
      };

      var onConnect = function onConnect() {
        socket.removeListener('error', onError);
        socket.removeListener('connect', onConnect);

        callback(null, socket);
      };

      socket.on('error', onError);
      socket.on('connect', onConnect);
    }
  }]);
  return SequentialConnectionStrategy;
}();

module.exports.Connector = Connector;
module.exports.ParallelConnectionStrategy = ParallelConnectionStrategy;
module.exports.SequentialConnectionStrategy = SequentialConnectionStrategy;

/***/ }),
/* 486 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(38);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventEmitter = __webpack_require__(31).EventEmitter;
var util = __webpack_require__(63);

module.exports = function (_EventEmitter) {
  (0, _inherits3.default)(Debug, _EventEmitter);

  /*
    @options    Which debug details should be sent.
                data    - dump of packet data
                payload - details of decoded payload
  */
  function Debug(options) {
    (0, _classCallCheck3.default)(this, Debug);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Debug.__proto__ || (0, _getPrototypeOf2.default)(Debug)).call(this));

    _this.options = options;
    _this.options = _this.options || {};
    _this.options.data = _this.options.data || false;
    _this.options.payload = _this.options.payload || false;
    _this.options.packet = _this.options.packet || false;
    _this.options.token = _this.options.token || false;
    _this.indent = '  ';
    return _this;
  }

  (0, _createClass3.default)(Debug, [{
    key: 'packet',
    value: function packet(direction, _packet) {
      if (this.haveListeners() && this.options.packet) {
        this.log('');
        this.log(direction);
        this.log(_packet.headerToString(this.indent));
      }
    }
  }, {
    key: 'data',
    value: function data(packet) {
      if (this.haveListeners() && this.options.data) {
        this.log(packet.dataToString(this.indent));
      }
    }
  }, {
    key: 'payload',
    value: function payload(generatePayloadText) {
      if (this.haveListeners() && this.options.payload) {
        this.log(generatePayloadText());
      }
    }
  }, {
    key: 'token',
    value: function token(_token) {
      if (this.haveListeners() && this.options.token) {
        this.log(util.inspect(_token, false, 5, true));
      }
    }
  }, {
    key: 'haveListeners',
    value: function haveListeners() {
      return this.listeners('debug').length > 0;
    }
  }, {
    key: 'log',
    value: function log(text) {
      this.emit('debug', text);
    }
  }]);
  return Debug;
}(EventEmitter);

/***/ }),
/* 487 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sender = __webpack_require__(493).Sender;

var SQL_SERVER_BROWSER_PORT = 1434;
var TIMEOUT = 2 * 1000;
var RETRIES = 3;
// There are three bytes at the start of the response, whose purpose is unknown.
var MYSTERY_HEADER_LENGTH = 3;

// Most of the functionality has been determined from from jTDS's MSSqlServerInfo class.

var InstanceLookup = function () {
  function InstanceLookup() {
    (0, _classCallCheck3.default)(this, InstanceLookup);
  }

  // Wrapper allows for stubbing Sender when unit testing instance-lookup.


  (0, _createClass3.default)(InstanceLookup, [{
    key: 'createSender',
    value: function createSender(host, port, request) {
      return new Sender(host, port, request);
    }
  }, {
    key: 'instanceLookup',
    value: function instanceLookup(options, callback) {
      var _this = this;

      var server = options.server;
      if (typeof server !== 'string') {
        throw new TypeError('Invalid arguments: "server" must be a string');
      }

      var instanceName = options.instanceName;
      if (typeof instanceName !== 'string') {
        throw new TypeError('Invalid arguments: "instanceName" must be a string');
      }

      var timeout = options.timeout === undefined ? TIMEOUT : options.timeout;
      if (typeof timeout !== 'number') {
        throw new TypeError('Invalid arguments: "timeout" must be a number');
      }

      var retries = options.retries === undefined ? RETRIES : options.retries;
      if (typeof retries !== 'number') {
        throw new TypeError('Invalid arguments: "retries" must be a number');
      }

      if (typeof callback !== 'function') {
        throw new TypeError('Invalid arguments: "callback" must be a function');
      }

      var sender = void 0,
          timer = void 0,
          retriesLeft = retries;

      var onTimeout = function onTimeout() {
        sender.cancel();
        return makeAttempt();
      };

      var makeAttempt = function makeAttempt() {
        if (retriesLeft > 0) {
          retriesLeft--;

          var request = new Buffer([0x02]);
          sender = _this.createSender(options.server, SQL_SERVER_BROWSER_PORT, request);
          sender.execute(function (err, message) {
            clearTimeout(timer);
            if (err) {
              return callback('Failed to lookup instance on ' + server + ' - ' + err.message);
            } else {
              message = message.toString('ascii', MYSTERY_HEADER_LENGTH);
              var port = _this.parseBrowserResponse(message, instanceName);

              if (port) {
                return callback(undefined, port);
              } else {
                return callback('Port for ' + instanceName + ' not found in ' + message);
              }
            }
          });

          return timer = setTimeout(onTimeout, timeout);
        } else {
          return callback('Failed to get response from SQL Server Browser on ' + server);
        }
      };

      return makeAttempt();
    }
  }, {
    key: 'parseBrowserResponse',
    value: function parseBrowserResponse(response, instanceName) {
      var getPort = void 0;

      var instances = response.split(';;');
      for (var i = 0, len = instances.length; i < len; i++) {
        var instance = instances[i];
        var parts = instance.split(';');

        for (var p = 0, partsLen = parts.length; p < partsLen; p += 2) {
          var name = parts[p];
          var value = parts[p + 1];

          if (name === 'tcp' && getPort) {
            var port = parseInt(value, 10);
            return port;
          }

          if (name === 'InstanceName') {
            if (value.toUpperCase() === instanceName.toUpperCase()) {
              getPort = true;
            } else {
              getPort = false;
            }
          }
        }
      }
    }
  }]);
  return InstanceLookup;
}();

module.exports.InstanceLookup = InstanceLookup;

/***/ }),
/* 488 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WritableTrackingBuffer = __webpack_require__(94);
var os = __webpack_require__(510);
var sprintf = __webpack_require__(72).sprintf;
var libraryName = __webpack_require__(203).name;
var versions = __webpack_require__(137).versions;

var FLAGS_1 = {
  ENDIAN_LITTLE: 0x00,
  ENDIAN_BIG: 0x01,
  CHARSET_ASCII: 0x00,
  CHARSET_EBCDIC: 0x02,
  FLOAT_IEEE_754: 0x00,
  FLOAT_VAX: 0x04,
  FLOAT_ND5000: 0x08,
  BCP_DUMPLOAD_ON: 0x00,
  BCP_DUMPLOAD_OFF: 0x10,
  USE_DB_ON: 0x00,
  USE_DB_OFF: 0x20,
  INIT_DB_WARN: 0x00,
  INIT_DB_FATAL: 0x40,
  SET_LANG_WARN_OFF: 0x00,
  SET_LANG_WARN_ON: 0x80
};

var FLAGS_2 = {
  INIT_LANG_WARN: 0x00,
  INIT_LANG_FATAL: 0x01,
  ODBC_OFF: 0x00,
  ODBC_ON: 0x02,
  F_TRAN_BOUNDARY: 0x04,
  F_CACHE_CONNECT: 0x08,
  USER_NORMAL: 0x00,
  USER_SERVER: 0x10,
  USER_REMUSER: 0x20,
  USER_SQLREPL: 0x40,
  INTEGRATED_SECURITY_OFF: 0x00,
  INTEGRATED_SECURITY_ON: 0x80
};

var TYPE_FLAGS = {
  SQL_DFLT: 0x00,
  SQL_TSQL: 0x08,
  OLEDB_OFF: 0x00,
  OLEDB_ON: 0x10,
  READ_WRITE_INTENT: 0x00,
  READ_ONLY_INTENT: 0x20
};

var FLAGS_3 = {
  CHANGE_PASSWORD_NO: 0x00,
  CHANGE_PASSWORD_YES: 0x01,
  BINARY_XML: 0x02,
  SPAWN_USER_INSTANCE: 0x04,
  UNKNOWN_COLLATION_HANDLING: 0x08
};

var NTLMFlags = {
  NTLM_NegotiateUnicode: 0x00000001,
  NTLM_NegotiateOEM: 0x00000002,
  NTLM_RequestTarget: 0x00000004,
  NTLM_Unknown9: 0x00000008,
  NTLM_NegotiateSign: 0x00000010,
  NTLM_NegotiateSeal: 0x00000020,
  NTLM_NegotiateDatagram: 0x00000040,
  NTLM_NegotiateLanManagerKey: 0x00000080,
  NTLM_Unknown8: 0x00000100,
  NTLM_NegotiateNTLM: 0x00000200,
  NTLM_NegotiateNTOnly: 0x00000400,
  NTLM_Anonymous: 0x00000800,
  NTLM_NegotiateOemDomainSupplied: 0x00001000,
  NTLM_NegotiateOemWorkstationSupplied: 0x00002000,
  NTLM_Unknown6: 0x00004000,
  NTLM_NegotiateAlwaysSign: 0x00008000,
  NTLM_TargetTypeDomain: 0x00010000,
  NTLM_TargetTypeServer: 0x00020000,
  NTLM_TargetTypeShare: 0x00040000,
  NTLM_NegotiateExtendedSecurity: 0x00080000,
  NTLM_NegotiateIdentify: 0x00100000,
  NTLM_Unknown5: 0x00200000,
  NTLM_RequestNonNTSessionKey: 0x00400000,
  NTLM_NegotiateTargetInfo: 0x00800000,
  NTLM_Unknown4: 0x01000000,
  NTLM_NegotiateVersion: 0x02000000,
  NTLM_Unknown3: 0x04000000,
  NTLM_Unknown2: 0x08000000,
  NTLM_Unknown1: 0x10000000,
  NTLM_Negotiate128: 0x20000000,
  NTLM_NegotiateKeyExchange: 0x40000000,
  NTLM_Negotiate56: 0x80000000
};

/*
  s2.2.6.3
 */
module.exports = function () {
  function Login7Payload(loginData) {
    (0, _classCallCheck3.default)(this, Login7Payload);

    this.loginData = loginData;

    var lengthLength = 4;
    var fixed = this.createFixedData();
    var variable = this.createVariableData(lengthLength + fixed.length);
    var length = lengthLength + fixed.length + variable.length;
    var data = new WritableTrackingBuffer(300);
    data.writeUInt32LE(length);
    data.writeBuffer(fixed);
    data.writeBuffer(variable);
    this.data = data.data;
  }

  (0, _createClass3.default)(Login7Payload, [{
    key: 'createFixedData',
    value: function createFixedData() {
      this.tdsVersion = versions[this.loginData.tdsVersion];
      this.packetSize = this.loginData.packetSize;
      this.clientProgVer = 0;
      this.clientPid = process.pid;
      this.connectionId = 0;
      this.clientTimeZone = new Date().getTimezoneOffset();
      this.clientLcid = 0x00000409;
      this.flags1 = FLAGS_1.ENDIAN_LITTLE | FLAGS_1.CHARSET_ASCII | FLAGS_1.FLOAT_IEEE_754 | FLAGS_1.BCD_DUMPLOAD_OFF | FLAGS_1.USE_DB_OFF | FLAGS_1.SET_LANG_WARN_ON;
      if (this.loginData.initDbFatal) {
        this.flags1 |= FLAGS_1.INIT_DB_FATAL;
      } else {
        this.flags1 |= FLAGS_1.INIT_DB_WARN;
      }
      this.flags2 = FLAGS_2.INIT_LANG_WARN | FLAGS_2.ODBC_OFF | FLAGS_2.USER_NORMAL;
      if (this.loginData.domain) {
        this.flags2 |= FLAGS_2.INTEGRATED_SECURITY_ON;
      } else {
        this.flags2 |= FLAGS_2.INTEGRATED_SECURITY_OFF;
      }
      this.flags3 = FLAGS_3.CHANGE_PASSWORD_NO | FLAGS_3.UNKNOWN_COLLATION_HANDLING;
      this.typeFlags = TYPE_FLAGS.SQL_DFLT | TYPE_FLAGS.OLEDB_OFF;
      if (this.loginData.readOnlyIntent) {
        this.typeFlags |= TYPE_FLAGS.READ_ONLY_INTENT;
      } else {
        this.typeFlags |= TYPE_FLAGS.READ_WRITE_INTENT;
      }

      var buffer = new WritableTrackingBuffer(100);
      buffer.writeUInt32LE(this.tdsVersion);
      buffer.writeUInt32LE(this.packetSize);
      buffer.writeUInt32LE(this.clientProgVer);
      buffer.writeUInt32LE(this.clientPid);
      buffer.writeUInt32LE(this.connectionId);
      buffer.writeUInt8(this.flags1);
      buffer.writeUInt8(this.flags2);
      buffer.writeUInt8(this.typeFlags);
      buffer.writeUInt8(this.flags3);
      buffer.writeInt32LE(this.clientTimeZone);
      buffer.writeUInt32LE(this.clientLcid);
      return buffer.data;
    }
  }, {
    key: 'createVariableData',
    value: function createVariableData(offset) {
      this.variableLengthsLength = 9 * 4 + 6 + 3 * 4 + 4;
      if (this.loginData.tdsVersion === '7_1') {
        this.variableLengthsLength = 9 * 4 + 6 + 2 * 4;
      }
      var variableData = {
        offsetsAndLengths: new WritableTrackingBuffer(200),
        data: new WritableTrackingBuffer(200, 'ucs2'),
        offset: offset + this.variableLengthsLength
      };
      this.hostname = os.hostname();
      this.loginData = this.loginData || {};
      this.loginData.appName = this.loginData.appName || 'Tedious';
      this.libraryName = libraryName;
      this.clientId = new Buffer([1, 2, 3, 4, 5, 6]);
      if (!this.loginData.domain) {
        this.sspi = '';
        this.sspiLong = 0;
      }
      this.attachDbFile = '';
      this.changePassword = '';
      this.addVariableDataString(variableData, this.hostname);
      this.addVariableDataString(variableData, this.loginData.userName);
      this.addVariableDataBuffer(variableData, this.createPasswordBuffer());
      this.addVariableDataString(variableData, this.loginData.appName);
      this.addVariableDataString(variableData, this.loginData.serverName);
      this.addVariableDataString(variableData, '');
      this.addVariableDataString(variableData, this.libraryName);
      this.addVariableDataString(variableData, this.loginData.language);
      this.addVariableDataString(variableData, this.loginData.database);
      variableData.offsetsAndLengths.writeBuffer(this.clientId);
      if (this.loginData.domain) {
        this.ntlmPacket = this.createNTLMRequest(this.loginData);
        this.sspiLong = this.ntlmPacket.length;
        variableData.offsetsAndLengths.writeUInt16LE(variableData.offset);
        variableData.offsetsAndLengths.writeUInt16LE(this.ntlmPacket.length);
        variableData.data.writeBuffer(this.ntlmPacket);
        variableData.offset += this.ntlmPacket.length;
      } else {
        this.addVariableDataString(variableData, this.sspi);
      }
      this.addVariableDataString(variableData, this.attachDbFile);
      if (this.loginData.tdsVersion > '7_1') {
        this.addVariableDataString(variableData, this.changePassword);
        variableData.offsetsAndLengths.writeUInt32LE(this.sspiLong);
      }
      return Buffer.concat([variableData.offsetsAndLengths.data, variableData.data.data]);
    }
  }, {
    key: 'addVariableDataBuffer',
    value: function addVariableDataBuffer(variableData, buffer) {
      variableData.offsetsAndLengths.writeUInt16LE(variableData.offset);
      variableData.offsetsAndLengths.writeUInt16LE(buffer.length / 2);
      variableData.data.writeBuffer(buffer);
      return variableData.offset += buffer.length;
    }
  }, {
    key: 'addVariableDataString',
    value: function addVariableDataString(variableData, value) {
      value || (value = '');
      variableData.offsetsAndLengths.writeUInt16LE(variableData.offset);
      variableData.offsetsAndLengths.writeUInt16LE(value.length);
      variableData.data.writeString(value);
      return variableData.offset += value.length * 2;
    }
  }, {
    key: 'createNTLMRequest',
    value: function createNTLMRequest(options) {
      var domain = escape(options.domain.toUpperCase());
      var workstation = options.workstation ? escape(options.workstation.toUpperCase()) : '';
      var protocol = 'NTLMSSP\u0000';
      var BODY_LENGTH = 40;
      var bufferLength = BODY_LENGTH + domain.length;
      var buffer = new WritableTrackingBuffer(bufferLength);

      var type1flags = this.getNTLMFlags();
      if (workstation === '') {
        type1flags -= NTLMFlags.NTLM_NegotiateOemWorkstationSupplied;
      }

      buffer.writeString(protocol, 'utf8');
      buffer.writeUInt32LE(1);
      buffer.writeUInt32LE(type1flags);
      buffer.writeUInt16LE(domain.length);
      buffer.writeUInt16LE(domain.length);
      buffer.writeUInt32LE(BODY_LENGTH + workstation.length);
      buffer.writeUInt16LE(workstation.length);
      buffer.writeUInt16LE(workstation.length);
      buffer.writeUInt32LE(BODY_LENGTH);
      buffer.writeUInt8(5);
      buffer.writeUInt8(0);
      buffer.writeUInt16LE(2195);
      buffer.writeUInt8(0);
      buffer.writeUInt8(0);
      buffer.writeUInt8(0);
      buffer.writeUInt8(15);
      buffer.writeString(workstation, 'ascii');
      buffer.writeString(domain, 'ascii');
      return buffer.data;
    }
  }, {
    key: 'createPasswordBuffer',
    value: function createPasswordBuffer() {
      var password = this.loginData.password || '';
      password = new Buffer(password, 'ucs2');
      for (var b = 0, len = password.length; b < len; b++) {
        var byte = password[b];
        var lowNibble = byte & 0x0f;
        var highNibble = byte >> 4;
        byte = lowNibble << 4 | highNibble;
        byte = byte ^ 0xa5;
        password[b] = byte;
      }
      return password;
    }
  }, {
    key: 'getNTLMFlags',
    value: function getNTLMFlags() {
      return NTLMFlags.NTLM_NegotiateUnicode + NTLMFlags.NTLM_NegotiateOEM + NTLMFlags.NTLM_RequestTarget + NTLMFlags.NTLM_NegotiateNTLM + NTLMFlags.NTLM_NegotiateOemDomainSupplied + NTLMFlags.NTLM_NegotiateOemWorkstationSupplied + NTLMFlags.NTLM_NegotiateAlwaysSign + NTLMFlags.NTLM_NegotiateVersion + NTLMFlags.NTLM_NegotiateExtendedSecurity + NTLMFlags.NTLM_Negotiate128 + NTLMFlags.NTLM_Negotiate56;
    }
  }, {
    key: 'toString',
    value: function toString(indent) {
      indent || (indent = '');
      return indent + 'Login7 - ' + sprintf('TDS:0x%08X, PacketSize:0x%08X, ClientProgVer:0x%08X, ClientPID:0x%08X, ConnectionID:0x%08X', this.tdsVersion, this.packetSize, this.clientProgVer, this.clientPid, this.connectionId) + '\n' + indent + '         ' + sprintf('Flags1:0x%02X, Flags2:0x%02X, TypeFlags:0x%02X, Flags3:0x%02X, ClientTimezone:%d, ClientLCID:0x%08X', this.flags1, this.flags2, this.typeFlags, this.flags3, this.clientTimeZone, this.clientLcid) + '\n' + indent + '         ' + sprintf("Hostname:'%s', Username:'%s', Password:'%s', AppName:'%s', ServerName:'%s', LibraryName:'%s'", this.hostname, this.loginData.userName, this.loginData.password, this.loginData.appName, this.loginData.serverName, libraryName) + '\n' + indent + '         ' + sprintf("Language:'%s', Database:'%s', SSPI:'%s', AttachDbFile:'%s', ChangePassword:'%s'", this.loginData.language, this.loginData.database, this.sspi, this.attachDbFile, this.changePassword);
    }
  }]);
  return Login7Payload;
}();

/***/ }),
/* 489 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(38);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tls = __webpack_require__(513);
var crypto = __webpack_require__(142);
var EventEmitter = __webpack_require__(31).EventEmitter;
var Transform = __webpack_require__(198).Transform;

var Packet = __webpack_require__(92).Packet;
var TYPE = __webpack_require__(92).TYPE;
var packetHeaderLength = __webpack_require__(92).HEADER_LENGTH;

var ReadablePacketStream = function (_Transform) {
  (0, _inherits3.default)(ReadablePacketStream, _Transform);

  function ReadablePacketStream() {
    (0, _classCallCheck3.default)(this, ReadablePacketStream);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ReadablePacketStream.__proto__ || (0, _getPrototypeOf2.default)(ReadablePacketStream)).call(this, { objectMode: true }));

    _this.buffer = new Buffer(0);
    _this.position = 0;
    return _this;
  }

  (0, _createClass3.default)(ReadablePacketStream, [{
    key: '_transform',
    value: function _transform(chunk, encoding, callback) {
      if (this.position === this.buffer.length) {
        // If we have fully consumed the previous buffer,
        // we can just replace it with the new chunk
        this.buffer = chunk;
      } else {
        // If we haven't fully consumed the previous buffer,
        // we simply concatenate the leftovers and the new chunk.
        this.buffer = Buffer.concat([this.buffer.slice(this.position), chunk], this.buffer.length - this.position + chunk.length);
      }

      this.position = 0;

      // The packet header is always 8 bytes of length.
      while (this.buffer.length >= this.position + packetHeaderLength) {
        // Get the full packet length
        var length = this.buffer.readUInt16BE(this.position + 2);

        if (this.buffer.length >= this.position + length) {
          var data = this.buffer.slice(this.position, this.position + length);
          this.position += length;
          this.push(new Packet(data));
        } else {
          // Not enough data to provide the next packet. Stop here and wait for
          // the next call to `_transform`.
          break;
        }
      }

      callback();
    }
  }]);
  return ReadablePacketStream;
}(Transform);

module.exports = function (_EventEmitter) {
  (0, _inherits3.default)(MessageIO, _EventEmitter);

  function MessageIO(socket, _packetSize, debug) {
    (0, _classCallCheck3.default)(this, MessageIO);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (MessageIO.__proto__ || (0, _getPrototypeOf2.default)(MessageIO)).call(this));

    _this2.socket = socket;
    _this2._packetSize = _packetSize;
    _this2.debug = debug;
    _this2.sendPacket = _this2.sendPacket.bind(_this2);

    _this2.packetStream = new ReadablePacketStream();
    _this2.packetStream.on('data', function (packet) {
      _this2.logPacket('Received', packet);
      _this2.emit('data', packet.data());
      if (packet.isLast()) {
        _this2.emit('message');
      }
    });

    _this2.socket.pipe(_this2.packetStream);
    _this2.packetDataSize = _this2._packetSize - packetHeaderLength;
    return _this2;
  }

  (0, _createClass3.default)(MessageIO, [{
    key: 'packetSize',
    value: function packetSize(_packetSize2) {
      if (arguments.length > 0) {
        this.debug.log('Packet size changed from ' + this._packetSize + ' to ' + _packetSize2);
        this._packetSize = _packetSize2;
        this.packetDataSize = this._packetSize - packetHeaderLength;
      }
      return this._packetSize;
    }
  }, {
    key: 'startTls',
    value: function startTls(credentialsDetails, hostname, trustServerCertificate) {
      var _this3 = this;

      var credentials = tls.createSecureContext ? tls.createSecureContext(credentialsDetails) : crypto.createCredentials(credentialsDetails);

      this.securePair = tls.createSecurePair(credentials);
      this.tlsNegotiationComplete = false;

      this.securePair.on('secure', function () {
        var cipher = _this3.securePair.cleartext.getCipher();

        if (!trustServerCertificate) {
          var verifyError = _this3.securePair.ssl.verifyError();

          // Verify that server's identity matches it's certificate's names
          if (!verifyError) {
            verifyError = tls.checkServerIdentity(hostname, _this3.securePair.cleartext.getPeerCertificate());
          }

          if (verifyError) {
            _this3.securePair.destroy();
            _this3.socket.destroy(verifyError);
            return;
          }
        }

        _this3.debug.log('TLS negotiated (' + cipher.name + ', ' + cipher.version + ')');
        _this3.emit('secure', _this3.securePair.cleartext);
        _this3.encryptAllFutureTraffic();
      });

      this.securePair.encrypted.on('data', function (data) {
        _this3.sendMessage(TYPE.PRELOGIN, data);
      });

      // On Node >= 0.12, the encrypted stream automatically starts spewing out
      // data once we attach a `data` listener. But on Node <= 0.10.x, this is not
      // the case. We need to kick the cleartext stream once to get the
      // encrypted end of the secure pair to emit the TLS handshake data.
      this.securePair.cleartext.write('');
    }
  }, {
    key: 'encryptAllFutureTraffic',
    value: function encryptAllFutureTraffic() {
      this.socket.unpipe(this.packetStream);
      this.securePair.encrypted.removeAllListeners('data');
      this.socket.pipe(this.securePair.encrypted);
      this.securePair.encrypted.pipe(this.socket);
      this.securePair.cleartext.pipe(this.packetStream);
      this.tlsNegotiationComplete = true;
    }
  }, {
    key: 'tlsHandshakeData',
    value: function tlsHandshakeData(data) {
      this.securePair.encrypted.write(data);
    }

    // TODO listen for 'drain' event when socket.write returns false.
    // TODO implement incomplete request cancelation (2.2.1.6)

  }, {
    key: 'sendMessage',
    value: function sendMessage(packetType, data, resetConnection) {
      var numberOfPackets = void 0;
      if (data) {
        numberOfPackets = Math.floor((data.length - 1) / this.packetDataSize) + 1;
      } else {
        numberOfPackets = 1;
        data = new Buffer(0);
      }

      for (var packetNumber = 0; packetNumber < numberOfPackets; packetNumber++) {
        var payloadStart = packetNumber * this.packetDataSize;

        var payloadEnd = void 0;
        if (packetNumber < numberOfPackets - 1) {
          payloadEnd = payloadStart + this.packetDataSize;
        } else {
          payloadEnd = data.length;
        }

        var packetPayload = data.slice(payloadStart, payloadEnd);

        var packet = new Packet(packetType);
        packet.last(packetNumber === numberOfPackets - 1);
        packet.resetConnection(resetConnection);
        packet.packetId(packetNumber + 1);
        packet.addData(packetPayload);
        this.sendPacket(packet);
      }
    }
  }, {
    key: 'sendPacket',
    value: function sendPacket(packet) {
      this.logPacket('Sent', packet);
      if (this.securePair && this.tlsNegotiationComplete) {
        this.securePair.cleartext.write(packet.buffer);
      } else {
        this.socket.write(packet.buffer);
      }
    }
  }, {
    key: 'logPacket',
    value: function logPacket(direction, packet) {
      this.debug.packet(direction, packet);
      return this.debug.data(packet);
    }
  }]);
  return MessageIO;
}(EventEmitter);

/***/ }),
/* 490 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WritableTrackingBuffer = __webpack_require__(94);
var crypto = __webpack_require__(142);
var BigInteger = __webpack_require__(216).n;

var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

module.exports = function () {
  function NTLMResponsePayload(loginData) {
    (0, _classCallCheck3.default)(this, NTLMResponsePayload);

    this.data = this.createResponse(loginData);
  }

  (0, _createClass3.default)(NTLMResponsePayload, [{
    key: 'toString',
    value: function toString(indent) {
      indent || (indent = '');
      return indent + 'NTLM Auth';
    }
  }, {
    key: 'createResponse',
    value: function createResponse(challenge) {
      var client_nonce = this.createClientNonce();
      var lmv2len = 24;
      var ntlmv2len = 16;
      var domain = challenge.domain;
      var username = challenge.userName;
      var password = challenge.password;
      var ntlmData = challenge.ntlmpacket;
      var server_data = ntlmData.target;
      var server_nonce = ntlmData.nonce;
      var bufferLength = 64 + domain.length * 2 + username.length * 2 + lmv2len + ntlmv2len + 8 + 8 + 8 + 4 + server_data.length + 4;
      var data = new WritableTrackingBuffer(bufferLength);
      data.position = 0;
      data.writeString('NTLMSSP\u0000', 'utf8');
      data.writeUInt32LE(0x03);
      var baseIdx = 64;
      var dnIdx = baseIdx;
      var unIdx = dnIdx + domain.length * 2;
      var l2Idx = unIdx + username.length * 2;
      var ntIdx = l2Idx + lmv2len;
      data.writeUInt16LE(lmv2len);
      data.writeUInt16LE(lmv2len);
      data.writeUInt32LE(l2Idx);
      data.writeUInt16LE(ntlmv2len);
      data.writeUInt16LE(ntlmv2len);
      data.writeUInt32LE(ntIdx);
      data.writeUInt16LE(domain.length * 2);
      data.writeUInt16LE(domain.length * 2);
      data.writeUInt32LE(dnIdx);
      data.writeUInt16LE(username.length * 2);
      data.writeUInt16LE(username.length * 2);
      data.writeUInt32LE(unIdx);
      data.writeUInt16LE(0);
      data.writeUInt16LE(0);
      data.writeUInt32LE(baseIdx);
      data.writeUInt16LE(0);
      data.writeUInt16LE(0);
      data.writeUInt32LE(baseIdx);
      data.writeUInt16LE(0x8201);
      data.writeUInt16LE(0x08);
      data.writeString(domain, 'ucs2');
      data.writeString(username, 'ucs2');
      var lmv2Data = this.lmv2Response(domain, username, password, server_nonce, client_nonce);
      data.copyFrom(lmv2Data);
      var genTime = new Date().getTime();
      ntlmData = this.ntlmv2Response(domain, username, password, server_nonce, server_data, client_nonce, genTime);
      data.copyFrom(ntlmData);
      data.writeUInt32LE(0x0101);
      data.writeUInt32LE(0x0000);
      var timestamp = this.createTimestamp(genTime);
      data.copyFrom(timestamp);
      data.copyFrom(client_nonce);
      data.writeUInt32LE(0x0000);
      data.copyFrom(server_data);
      data.writeUInt32LE(0x0000);
      return data.data;
    }
  }, {
    key: 'createClientNonce',
    value: function createClientNonce() {
      var client_nonce = new Buffer(8);
      var nidx = 0;
      while (nidx < 8) {
        client_nonce.writeUInt8(Math.ceil(Math.random() * 255), nidx);
        nidx++;
      }
      return client_nonce;
    }
  }, {
    key: 'ntlmv2Response',
    value: function ntlmv2Response(domain, user, password, serverNonce, targetInfo, clientNonce, mytime) {
      var timestamp = this.createTimestamp(mytime);
      var hash = this.ntv2Hash(domain, user, password);
      var dataLength = 40 + targetInfo.length;
      var data = new Buffer(dataLength);
      serverNonce.copy(data, 0, 0, 8);
      data.writeUInt32LE(0x101, 8);
      data.writeUInt32LE(0x0, 12);
      timestamp.copy(data, 16, 0, 8);
      clientNonce.copy(data, 24, 0, 8);
      data.writeUInt32LE(0x0, 32);
      targetInfo.copy(data, 36, 0, targetInfo.length);
      data.writeUInt32LE(0x0, 36 + targetInfo.length);
      return this.hmacMD5(data, hash);
    }
  }, {
    key: 'createTimestamp',
    value: function createTimestamp(time) {
      var tenthsOfAMicrosecond = new BigInteger(time).plus(11644473600).multiply(10000000);
      var hexArray = [];

      var pair = [];
      while (tenthsOfAMicrosecond.val() !== '0') {
        var idx = tenthsOfAMicrosecond.mod(16);
        pair.unshift(hex[idx]);
        if (pair.length === 2) {
          hexArray.push(pair.join(''));
          pair = [];
        }
      }

      if (pair.length > 0) {
        hexArray.push(pair[0] + '0');
      }

      return new Buffer(hexArray.join(''), 'hex');
    }
  }, {
    key: 'lmv2Response',
    value: function lmv2Response(domain, user, password, serverNonce, clientNonce) {
      var hash = this.ntv2Hash(domain, user, password);
      var data = new Buffer(serverNonce.length + clientNonce.length);

      serverNonce.copy(data);
      clientNonce.copy(data, serverNonce.length, 0, clientNonce.length);

      var newhash = this.hmacMD5(data, hash);
      var response = new Buffer(newhash.length + clientNonce.length);

      newhash.copy(response);
      clientNonce.copy(response, newhash.length, 0, clientNonce.length);

      return response;
    }
  }, {
    key: 'ntv2Hash',
    value: function ntv2Hash(domain, user, password) {
      var hash = this.ntHash(password);
      var identity = new Buffer(user.toUpperCase() + domain.toUpperCase(), 'ucs2');
      return this.hmacMD5(identity, hash);
    }
  }, {
    key: 'ntHash',
    value: function ntHash(text) {
      var hash = new Buffer(21);
      hash.fill(0);

      var unicodeString = new Buffer(text, 'ucs2');
      var md4 = crypto.createHash('md4').update(unicodeString).digest();
      if (md4.copy) {
        md4.copy(hash);
      } else {
        new Buffer(md4, 'ascii').copy(hash);
      }
      return hash;
    }
  }, {
    key: 'hmacMD5',
    value: function hmacMD5(data, key) {
      var hmac = crypto.createHmac('MD5', key);
      hmac.update(data);

      var result = hmac.digest();
      if (result.copy) {
        return result;
      } else {
        return new Buffer(result, 'ascii').slice(0, 16);
      }
    }
  }]);
  return NTLMResponsePayload;
}();

/***/ }),
/* 491 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sprintf = __webpack_require__(72).sprintf;
var WritableTrackingBuffer = __webpack_require__(93).WritableTrackingBuffer;

var optionBufferSize = 20;

var VERSION = 0x000000001;

var SUBBUILD = 0x0001;

var TOKEN = {
  VERSION: 0x00,
  ENCRYPTION: 0x01,
  INSTOPT: 0x02,
  THREADID: 0x03,
  MARS: 0x04,
  TERMINATOR: 0xFF
};

var ENCRYPT = {
  OFF: 0x00,
  ON: 0x01,
  NOT_SUP: 0x02,
  REQ: 0x03
};

var encryptByValue = {};

for (var name in ENCRYPT) {
  var value = ENCRYPT[name];
  encryptByValue[value] = name;
}

var MARS = {
  OFF: 0x00,
  ON: 0x01
};

var marsByValue = {};

for (var _name in MARS) {
  var _value = MARS[_name];
  marsByValue[_value] = _name;
}

/*
  s2.2.6.4
 */
module.exports = function () {
  function PreloginPayload(bufferOrOptions) {
    (0, _classCallCheck3.default)(this, PreloginPayload);

    if (bufferOrOptions instanceof Buffer) {
      this.data = bufferOrOptions;
    } else {
      this.options = bufferOrOptions || {};
      this.createOptions();
    }
    this.extractOptions();
  }

  (0, _createClass3.default)(PreloginPayload, [{
    key: 'createOptions',
    value: function createOptions() {
      var options = [this.createVersionOption(), this.createEncryptionOption(), this.createInstanceOption(), this.createThreadIdOption(), this.createMarsOption()];

      var length = 0;
      for (var i = 0, len = options.length; i < len; i++) {
        var option = options[i];
        length += 5 + option.data.length;
      }
      length++; // terminator
      this.data = new Buffer(length);
      var optionOffset = 0;
      var optionDataOffset = 5 * options.length + 1;

      for (var j = 0, _len = options.length; j < _len; j++) {
        var _option = options[j];
        this.data.writeUInt8(_option.token, optionOffset + 0);
        this.data.writeUInt16BE(optionDataOffset, optionOffset + 1);
        this.data.writeUInt16BE(_option.data.length, optionOffset + 3);
        optionOffset += 5;
        _option.data.copy(this.data, optionDataOffset);
        optionDataOffset += _option.data.length;
      }

      return this.data.writeUInt8(TOKEN.TERMINATOR, optionOffset);
    }
  }, {
    key: 'createVersionOption',
    value: function createVersionOption() {
      var buffer = new WritableTrackingBuffer(optionBufferSize);
      buffer.writeUInt32BE(VERSION);
      buffer.writeUInt16BE(SUBBUILD);
      return {
        token: TOKEN.VERSION,
        data: buffer.data
      };
    }
  }, {
    key: 'createEncryptionOption',
    value: function createEncryptionOption() {
      var buffer = new WritableTrackingBuffer(optionBufferSize);
      if (this.options.encrypt) {
        buffer.writeUInt8(ENCRYPT.ON);
      } else {
        buffer.writeUInt8(ENCRYPT.NOT_SUP);
      }
      return {
        token: TOKEN.ENCRYPTION,
        data: buffer.data
      };
    }
  }, {
    key: 'createInstanceOption',
    value: function createInstanceOption() {
      var buffer = new WritableTrackingBuffer(optionBufferSize);
      buffer.writeUInt8(0x00);
      return {
        token: TOKEN.INSTOPT,
        data: buffer.data
      };
    }
  }, {
    key: 'createThreadIdOption',
    value: function createThreadIdOption() {
      var buffer = new WritableTrackingBuffer(optionBufferSize);
      buffer.writeUInt32BE(0x00);
      return {
        token: TOKEN.THREADID,
        data: buffer.data
      };
    }
  }, {
    key: 'createMarsOption',
    value: function createMarsOption() {
      var buffer = new WritableTrackingBuffer(optionBufferSize);
      buffer.writeUInt8(MARS.OFF);
      return {
        token: TOKEN.MARS,
        data: buffer.data
      };
    }
  }, {
    key: 'extractOptions',
    value: function extractOptions() {
      var offset = 0;
      while (this.data[offset] !== TOKEN.TERMINATOR) {
        var dataOffset = this.data.readUInt16BE(offset + 1);
        var dataLength = this.data.readUInt16BE(offset + 3);
        switch (this.data[offset]) {
          case TOKEN.VERSION:
            this.extractVersion(dataOffset);
            break;
          case TOKEN.ENCRYPTION:
            this.extractEncryption(dataOffset);
            break;
          case TOKEN.INSTOPT:
            this.extractInstance(dataOffset);
            break;
          case TOKEN.THREADID:
            if (dataLength > 0) {
              this.extractThreadId(dataOffset);
            }
            break;
          case TOKEN.MARS:
            this.extractMars(dataOffset);
        }
        offset += 5;
        dataOffset += dataLength;
      }
    }
  }, {
    key: 'extractVersion',
    value: function extractVersion(offset) {
      return this.version = {
        major: this.data.readUInt8(offset + 0),
        minor: this.data.readUInt8(offset + 1),
        patch: this.data.readUInt8(offset + 2),
        trivial: this.data.readUInt8(offset + 3),
        subbuild: this.data.readUInt16BE(offset + 4)
      };
    }
  }, {
    key: 'extractEncryption',
    value: function extractEncryption(offset) {
      this.encryption = this.data.readUInt8(offset);
      return this.encryptionString = encryptByValue[this.encryption];
    }
  }, {
    key: 'extractInstance',
    value: function extractInstance(offset) {
      return this.instance = this.data.readUInt8(offset);
    }
  }, {
    key: 'extractThreadId',
    value: function extractThreadId(offset) {
      return this.threadId = this.data.readUInt32BE(offset);
    }
  }, {
    key: 'extractMars',
    value: function extractMars(offset) {
      this.mars = this.data.readUInt8(offset);
      return this.marsString = marsByValue[this.mars];
    }
  }, {
    key: 'toString',
    value: function toString(indent) {
      indent || (indent = '');
      return indent + 'PreLogin - ' + sprintf('version:%d.%d.%d.%d %d, encryption:0x%02X(%s), instopt:0x%02X, threadId:0x%08X, mars:0x%02X(%s)', this.version.major, this.version.minor, this.version.patch, this.version.trivial, this.version.subbuild, this.encryption ? this.encryption : 0, this.encryptionString ? this.encryptionString : 0, this.instance ? this.instance : 0, this.threadId ? this.threadId : 0, this.mars ? this.mars : 0, this.marsString ? this.marsString : 0);
    }
  }]);
  return PreloginPayload;
}();

/***/ }),
/* 492 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WritableTrackingBuffer = __webpack_require__(93).WritableTrackingBuffer;
var writeAllHeaders = __webpack_require__(136).writeToTrackingBuffer;

// const OPTION = {
//   WITH_RECOMPILE: 0x01,
//   NO_METADATA: 0x02,
//   REUSE_METADATA: 0x04
// };

var STATUS = {
  BY_REF_VALUE: 0x01,
  DEFAULT_VALUE: 0x02
};

/*
  s2.2.6.5
 */
module.exports = function () {
  function RpcRequestPayload(request, txnDescriptor, options) {
    (0, _classCallCheck3.default)(this, RpcRequestPayload);

    this.request = request;
    this.procedure = this.request.sqlTextOrProcedure;

    var buffer = new WritableTrackingBuffer(500);
    if (options.tdsVersion >= '7_2') {
      var outstandingRequestCount = 1;
      writeAllHeaders(buffer, txnDescriptor, outstandingRequestCount);
    }

    if (typeof this.procedure === 'string') {
      buffer.writeUsVarchar(this.procedure);
    } else {
      buffer.writeUShort(0xFFFF);
      buffer.writeUShort(this.procedure);
    }

    var optionFlags = 0;
    buffer.writeUInt16LE(optionFlags);

    var parameters = this.request.parameters;
    for (var i = 0, len = parameters.length; i < len; i++) {
      var parameter = parameters[i];
      buffer.writeBVarchar('@' + parameter.name);

      var statusFlags = 0;
      if (parameter.output) {
        statusFlags |= STATUS.BY_REF_VALUE;
      }
      buffer.writeUInt8(statusFlags);

      var param = {
        value: parameter.value
      };

      var type = parameter.type;

      if ((type.id & 0x30) === 0x20) {
        if (parameter.length) {
          param.length = parameter.length;
        } else if (type.resolveLength) {
          param.length = type.resolveLength(parameter);
        }
      }

      if (type.hasPrecision) {
        if (parameter.precision) {
          param.precision = parameter.precision;
        } else if (type.resolvePrecision) {
          param.precision = type.resolvePrecision(parameter);
        }
      }

      if (type.hasScale) {
        if (parameter.scale) {
          param.scale = parameter.scale;
        } else if (type.resolveScale) {
          param.scale = type.resolveScale(parameter);
        }
      }

      type.writeTypeInfo(buffer, param, options);
      type.writeParameterData(buffer, param, options);
    }

    this.data = buffer.data;
  }

  (0, _createClass3.default)(RpcRequestPayload, [{
    key: 'toString',
    value: function toString(indent) {
      indent || (indent = '');
      return indent + ('RPC Request - ' + this.procedure);
    }
  }]);
  return RpcRequestPayload;
}();

/***/ }),
/* 493 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dgram = __webpack_require__(509);
var dns = __webpack_require__(207);
var net = __webpack_require__(143);

var Sender = function () {
  function Sender(host, port, request) {
    (0, _classCallCheck3.default)(this, Sender);

    this.host = host;
    this.port = port;
    this.request = request;

    this.parallelSendStrategy = null;
  }

  (0, _createClass3.default)(Sender, [{
    key: 'execute',
    value: function execute(cb) {
      if (net.isIP(this.host)) {
        this.executeForIP(cb);
      } else {
        this.executeForHostname(cb);
      }
    }
  }, {
    key: 'executeForIP',
    value: function executeForIP(cb) {
      this.executeForAddresses([{ address: this.host }], cb);
    }

    // Wrapper for stubbing. Sinon does not have support for stubbing module functions.

  }, {
    key: 'invokeLookupAll',
    value: function invokeLookupAll(host, cb) {
      dns.lookup(host, { all: true }, cb);
    }
  }, {
    key: 'executeForHostname',
    value: function executeForHostname(cb) {
      var _this = this;

      this.invokeLookupAll(this.host, function (err, addresses) {
        if (err) {
          return cb(err);
        }

        _this.executeForAddresses(addresses, cb);
      });
    }

    // Wrapper for stubbing creation of Strategy object. Sinon support for constructors
    // seems limited.

  }, {
    key: 'createParallelSendStrategy',
    value: function createParallelSendStrategy(addresses, port, request) {
      return new ParallelSendStrategy(addresses, port, request);
    }
  }, {
    key: 'executeForAddresses',
    value: function executeForAddresses(addresses, cb) {
      this.parallelSendStrategy = this.createParallelSendStrategy(addresses, this.port, this.request);
      this.parallelSendStrategy.send(cb);
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      if (this.parallelSendStrategy) {
        this.parallelSendStrategy.cancel();
      }
    }
  }]);
  return Sender;
}();

var ParallelSendStrategy = function () {
  function ParallelSendStrategy(addresses, port, request) {
    (0, _classCallCheck3.default)(this, ParallelSendStrategy);

    this.addresses = addresses;
    this.port = port;
    this.request = request;

    this.socketV4 = null;
    this.socketV6 = null;
    this.onError = null;
    this.onMessage = null;
  }

  (0, _createClass3.default)(ParallelSendStrategy, [{
    key: 'clearSockets',
    value: function clearSockets() {
      var clearSocket = function clearSocket(socket, onError, onMessage) {
        socket.removeListener('error', onError);
        socket.removeListener('message', onMessage);
        socket.close();
      };

      if (this.socketV4) {
        clearSocket(this.socketV4, this.onError, this.onMessage);
        this.socketV4 = null;
      }

      if (this.socketV6) {
        clearSocket(this.socketV6, this.onError, this.onMessage);
        this.socketV6 = null;
      }
    }
  }, {
    key: 'send',
    value: function send(cb) {
      var _this2 = this;

      var errorCount = 0;

      var onError = function onError(err) {
        errorCount++;

        if (errorCount === _this2.addresses.length) {
          _this2.clearSockets();
          cb(err);
        }
      };

      var onMessage = function onMessage(message) {
        _this2.clearSockets();
        cb(null, message);
      };

      var createDgramSocket = function createDgramSocket(udpType, onError, onMessage) {
        var socket = dgram.createSocket(udpType);

        socket.on('error', onError);
        socket.on('message', onMessage);
        return socket;
      };

      for (var j = 0; j < this.addresses.length; j++) {
        var udpTypeV4 = 'udp4';
        var udpTypeV6 = 'udp6';

        var udpType = net.isIPv4(this.addresses[j].address) ? udpTypeV4 : udpTypeV6;
        var socket = void 0;

        if (udpType === udpTypeV4) {
          if (!this.socketV4) {
            this.socketV4 = createDgramSocket(udpTypeV4, onError, onMessage);
          }

          socket = this.socketV4;
        } else {
          if (!this.socketV6) {
            this.socketV6 = createDgramSocket(udpTypeV6, onError, onMessage);
          }

          socket = this.socketV6;
        }

        socket.send(this.request, 0, this.request.length, this.port, this.addresses[j].address);
      }

      this.onError = onError;
      this.onMessage = onMessage;
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.clearSockets();
    }
  }]);
  return ParallelSendStrategy;
}();

module.exports.Sender = Sender;
module.exports.ParallelSendStrategy = ParallelSendStrategy;

/***/ }),
/* 494 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WritableTrackingBuffer = __webpack_require__(93).WritableTrackingBuffer;
var writeAllHeaders = __webpack_require__(136).writeToTrackingBuffer;

/*
  s2.2.6.6
 */
module.exports = function () {
  function SqlBatchPayload(sqlText, txnDescriptor, options) {
    (0, _classCallCheck3.default)(this, SqlBatchPayload);

    this.sqlText = sqlText;

    var buffer = new WritableTrackingBuffer(100 + 2 * this.sqlText.length, 'ucs2');
    if (options.tdsVersion >= '7_2') {
      var outstandingRequestCount = 1;
      writeAllHeaders(buffer, txnDescriptor, outstandingRequestCount);
    }
    buffer.writeString(this.sqlText, 'ucs2');
    this.data = buffer.data;
  }

  (0, _createClass3.default)(SqlBatchPayload, [{
    key: 'toString',
    value: function toString(indent) {
      indent || (indent = '');
      return indent + ('SQL Batch - ' + this.sqlText);
    }
  }]);
  return SqlBatchPayload;
}();

/***/ }),
/* 495 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports.BulkLoad = __webpack_require__(200);
module.exports.Connection = __webpack_require__(484);
module.exports.Request = __webpack_require__(204);
module.exports.library = __webpack_require__(203);

module.exports.ConnectionError = __webpack_require__(73).ConnectionError;
module.exports.RequestError = __webpack_require__(73).RequestError;

module.exports.TYPES = __webpack_require__(91).typeByName;
module.exports.ISOLATION_LEVEL = __webpack_require__(140).ISOLATION_LEVEL;
module.exports.TDS_VERSION = __webpack_require__(137).versions;

/***/ }),
/* 496 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var metadataParse = __webpack_require__(74);

function readTableName(parser, options, metadata, callback) {
  if (metadata.type.hasTableName) {
    if (options.tdsVersion >= '7_2') {
      parser.readUInt8(function (numberOfTableNameParts) {
        var tableName = [];

        var i = 0;
        function next(done) {
          if (numberOfTableNameParts === i) {
            return done();
          }

          parser.readUsVarChar(function (part) {
            tableName.push(part);

            i++;

            next(done);
          });
        }

        next(function () {
          callback(tableName);
        });
      });
    } else {
      parser.readUsVarChar(callback);
    }
  } else {
    callback(undefined);
  }
}

function readColumnName(parser, options, index, metadata, callback) {
  parser.readBVarChar(function (colName) {
    if (options.columnNameReplacer) {
      callback(options.columnNameReplacer(colName, index, metadata));
    } else if (options.camelCaseColumns) {
      callback(colName.replace(/^[A-Z]/, function (s) {
        return s.toLowerCase();
      }));
    } else {
      callback(colName);
    }
  });
}

function readColumn(parser, options, index, callback) {
  metadataParse(parser, options, function (metadata) {
    readTableName(parser, options, metadata, function (tableName) {
      readColumnName(parser, options, index, metadata, function (colName) {
        callback({
          userType: metadata.userType,
          flags: metadata.flags,
          type: metadata.type,
          colName: colName,
          collation: metadata.collation,
          precision: metadata.precision,
          scale: metadata.scale,
          udtInfo: metadata.udtInfo,
          dataLength: metadata.dataLength,
          tableName: tableName
        });
      });
    });
  });
}

module.exports = function (parser, colMetadata, options, callback) {
  parser.readUInt16LE(function (columnCount) {
    var columns = [];

    var i = 0;
    function next(done) {
      if (i === columnCount) {
        return done();
      }

      readColumn(parser, options, i, function (column) {
        columns.push(column);

        i++;
        next(done);
      });
    }

    next(function () {
      callback({
        name: 'COLMETADATA',
        event: 'columnMetadata',
        columns: columns
      });
    });
  });
};

/***/ }),
/* 497 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var types = {
  1: {
    name: 'DATABASE',
    event: 'databaseChange'
  },
  2: {
    name: 'LANGUAGE',
    event: 'languageChange'
  },
  3: {
    name: 'CHARSET',
    event: 'charsetChange'
  },
  4: {
    name: 'PACKET_SIZE',
    event: 'packetSizeChange'
  },
  7: {
    name: 'SQL_COLLATION',
    event: 'sqlCollationChange'
  },
  8: {
    name: 'BEGIN_TXN',
    event: 'beginTransaction'
  },
  9: {
    name: 'COMMIT_TXN',
    event: 'commitTransaction'
  },
  10: {
    name: 'ROLLBACK_TXN',
    event: 'rollbackTransaction'
  },
  13: {
    name: 'DATABASE_MIRRORING_PARTNER',
    event: 'partnerNode'
  },
  17: {
    name: 'TXN_ENDED'
  },
  18: {
    name: 'RESET_CONNECTION',
    event: 'resetConnection'
  },
  20: {
    name: 'ROUTING_CHANGE',
    event: 'routingChange'
  }
};

function readNewAndOldValue(parser, length, type, callback) {
  switch (type.name) {
    case 'DATABASE':
    case 'LANGUAGE':
    case 'CHARSET':
    case 'PACKET_SIZE':
    case 'DATABASE_MIRRORING_PARTNER':
      return parser.readBVarChar(function (newValue) {
        parser.readBVarChar(function (oldValue) {
          if (type.name === 'PACKET_SIZE') {
            callback(parseInt(newValue), parseInt(oldValue));
          } else {
            callback(newValue, oldValue);
          }
        });
      });

    case 'SQL_COLLATION':
    case 'BEGIN_TXN':
    case 'COMMIT_TXN':
    case 'ROLLBACK_TXN':
    case 'RESET_CONNECTION':
      return parser.readBVarByte(function (newValue) {
        parser.readBVarByte(function (oldValue) {
          callback(newValue, oldValue);
        });
      });

    case 'ROUTING_CHANGE':
      parser.readUInt16LE(function (valueLength) {
        // Routing Change:
        // Byte 1: Protocol (must be 0)
        // Bytes 2-3 (USHORT): Port number
        // Bytes 4-5 (USHORT): Length of server data in unicode (2byte chars)
        // Bytes 6-*: Server name in unicode characters
        parser.readBuffer(valueLength, function (routePacket) {
          var protocol = routePacket.readUInt8(0);

          if (protocol !== 0) {
            return parser.emit('error', new Error('Unknown protocol byte in routing change event'));
          }

          var port = routePacket.readUInt16LE(1);
          var serverLen = routePacket.readUInt16LE(3);
          // 2 bytes per char, starting at offset 5
          var server = routePacket.toString('ucs2', 5, 5 + serverLen * 2);

          var newValue = {
            protocol: protocol,
            port: port,
            server: server
          };

          parser.readUInt16LE(function (oldValueLength) {
            parser.readBuffer(oldValueLength, function (oldValue) {
              callback(newValue, oldValue);
            });
          });
        });
      });

      break;

    default:
      console.error('Tedious > Unsupported ENVCHANGE type ' + type.name);
      // skip unknown bytes
      parser.readBuffer(length - 1, function () {
        callback(undefined, undefined);
      });
  }
}

module.exports = function (parser, colMetadata, options, callback) {
  parser.readUInt16LE(function (length) {
    parser.readUInt8(function (typeNumber) {
      var type = types[typeNumber];

      if (!type) {
        console.error('Tedious > Unsupported ENVCHANGE type ' + typeNumber);
        // skip unknown bytes
        return parser.readBuffer(length - 1, function () {
          callback();
        });
      }

      readNewAndOldValue(parser, length, type, function (newValue, oldValue) {
        callback({
          name: 'ENVCHANGE',
          type: type.name,
          event: type.event,
          oldValue: oldValue,
          newValue: newValue
        });
      });
    });
  });
};

/***/ }),
/* 498 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var versions = __webpack_require__(137).versionsByValue;

var interfaceTypes = {
  0: 'SQL_DFLT',
  1: 'SQL_TSQL'
};

module.exports = function (parser, colMetadata, options, callback) {
  // length
  parser.readUInt16LE(function () {
    parser.readUInt8(function (interfaceNumber) {
      var interfaceType = interfaceTypes[interfaceNumber];
      parser.readUInt32BE(function (tdsVersionNumber) {
        var tdsVersion = versions[tdsVersionNumber];
        parser.readBVarChar(function (progName) {
          parser.readUInt8(function (major) {
            parser.readUInt8(function (minor) {
              parser.readUInt8(function (buildNumHi) {
                parser.readUInt8(function (buildNumLow) {
                  callback({
                    'name': 'LOGINACK',
                    'event': 'loginack',
                    'interface': interfaceType,
                    'tdsVersion': tdsVersion,
                    'progName': progName,
                    'progVersion': {
                      major: major,
                      minor: minor,
                      buildNumHi: buildNumHi,
                      buildNumLow: buildNumLow
                    }
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};

/***/ }),
/* 499 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// s2.2.7.13 (introduced in TDS 7.3.B)

var valueParse = __webpack_require__(141);

function nullHandler(parser, columnMetaData, options, callback) {
  callback(null);
}

module.exports = function (parser, columnsMetaData, options, callback) {
  var length = Math.ceil(columnsMetaData.length / 8);
  parser.readBuffer(length, function (bytes) {
    var bitmap = [];

    for (var _i = 0, _len = bytes.length; _i < _len; _i++) {
      var byte = bytes[_i];
      for (var j = 0; j <= 7; j++) {
        bitmap.push(byte & 1 << j ? true : false);
      }
    }

    var columns = options.useColumnNames ? {} : [];

    var len = columnsMetaData.length;
    var i = 0;
    function next(done) {
      if (i === len) {
        return done();
      }

      var columnMetaData = columnsMetaData[i];

      (bitmap[i] ? nullHandler : valueParse)(parser, columnMetaData, options, function (value) {
        var column = {
          value: value,
          metadata: columnMetaData
        };

        if (options.useColumnNames) {
          if (columns[columnMetaData.colName] == null) {
            columns[columnMetaData.colName] = column;
          }
        } else {
          columns.push(column);
        }

        i++;
        next(done);
      });
    }

    next(function () {
      callback({
        name: 'NBCROW',
        event: 'row',
        columns: columns
      });
    });
  });
};

/***/ }),
/* 500 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// s2.2.7.14

module.exports = function (parser, colMetadata, options, callback) {
  parser.readUInt16LE(function (length) {
    var columnCount = length / 2;
    var orderColumns = [];

    var i = 0;
    function next(done) {
      if (i === columnCount) {
        return done();
      }

      parser.readUInt16LE(function (column) {
        orderColumns.push(column);

        i++;

        next(done);
      });
    }

    next(function () {
      callback({
        name: 'ORDER',
        event: 'order',
        orderColumns: orderColumns
      });
    });
  });
};

/***/ }),
/* 501 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// s2.2.7.16

module.exports = function (parser, colMetadata, options, callback) {
  parser.readInt32LE(function (value) {
    callback({
      name: 'RETURNSTATUS',
      event: 'returnStatus',
      value: value
    });
  });
};

/***/ }),
/* 502 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// s2.2.7.16

var metadataParse = __webpack_require__(74);
var valueParse = __webpack_require__(141);

module.exports = function (parser, colMetadata, options, callback) {
  parser.readUInt16LE(function (paramOrdinal) {
    parser.readBVarChar(function (paramName) {
      if (paramName.charAt(0) === '@') {
        paramName = paramName.slice(1);
      }

      // status
      parser.readUInt8(function () {
        metadataParse(parser, options, function (metadata) {
          valueParse(parser, metadata, options, function (value) {
            callback({
              name: 'RETURNVALUE',
              event: 'returnValue',
              paramOrdinal: paramOrdinal,
              paramName: paramName,
              metadata: metadata,
              value: value
            });
          });
        });
      });
    });
  });
};

/***/ }),
/* 503 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// s2.2.7.17

var valueParse = __webpack_require__(141);

module.exports = function (parser, colMetadata, options, callback) {
  var columns = options.useColumnNames ? {} : [];

  var len = colMetadata.length;
  var i = 0;

  function next(done) {
    if (i === len) {
      return done();
    }

    var columnMetaData = colMetadata[i];
    valueParse(parser, columnMetaData, options, function (value) {
      var column = {
        value: value,
        metadata: columnMetaData
      };

      if (options.useColumnNames) {
        if (columns[columnMetaData.colName] == null) {
          columns[columnMetaData.colName] = column;
        }
      } else {
        columns.push(column);
      }

      i++;

      next(done);
    });
  }

  next(function () {
    callback({
      name: 'ROW',
      event: 'row',
      columns: columns
    });
  });
};

/***/ }),
/* 504 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function parseChallenge(buffer) {
  var challenge = {};
  challenge.magic = buffer.slice(0, 8).toString('utf8');
  challenge.type = buffer.readInt32LE(8);
  challenge.domainLen = buffer.readInt16LE(12);
  challenge.domainMax = buffer.readInt16LE(14);
  challenge.domainOffset = buffer.readInt32LE(16);
  challenge.flags = buffer.readInt32LE(20);
  challenge.nonce = buffer.slice(24, 32);
  challenge.zeroes = buffer.slice(32, 40);
  challenge.targetLen = buffer.readInt16LE(40);
  challenge.targetMax = buffer.readInt16LE(42);
  challenge.targetOffset = buffer.readInt32LE(44);
  challenge.oddData = buffer.slice(48, 56);
  challenge.domain = buffer.slice(56, 56 + challenge.domainLen).toString('ucs2');
  challenge.target = buffer.slice(56 + challenge.domainLen, 56 + challenge.domainLen + challenge.targetLen);
  return challenge;
}

module.exports = function (parser, colMetadata, options, callback) {
  parser.readUsVarByte(function (buffer) {
    callback({
      name: 'SSPICHALLENGE',
      event: 'sspichallenge',
      ntlmpacket: parseChallenge(buffer)
    });
  });
};

/***/ }),
/* 505 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(38);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Transform = __webpack_require__(198).Transform;
var TYPE = __webpack_require__(206).TYPE;

var tokenParsers = {};
tokenParsers[TYPE.COLMETADATA] = __webpack_require__(496);
tokenParsers[TYPE.DONE] = __webpack_require__(138).doneParser;
tokenParsers[TYPE.DONEINPROC] = __webpack_require__(138).doneInProcParser;
tokenParsers[TYPE.DONEPROC] = __webpack_require__(138).doneProcParser;
tokenParsers[TYPE.ENVCHANGE] = __webpack_require__(497);
tokenParsers[TYPE.ERROR] = __webpack_require__(205).errorParser;
tokenParsers[TYPE.INFO] = __webpack_require__(205).infoParser;
tokenParsers[TYPE.LOGINACK] = __webpack_require__(498);
tokenParsers[TYPE.ORDER] = __webpack_require__(500);
tokenParsers[TYPE.RETURNSTATUS] = __webpack_require__(501);
tokenParsers[TYPE.RETURNVALUE] = __webpack_require__(502);
tokenParsers[TYPE.ROW] = __webpack_require__(503);
tokenParsers[TYPE.NBCROW] = __webpack_require__(499);
tokenParsers[TYPE.SSPI] = __webpack_require__(504);

module.exports = function (_Transform) {
  (0, _inherits3.default)(Parser, _Transform);

  function Parser(debug, colMetadata, options) {
    (0, _classCallCheck3.default)(this, Parser);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Parser.__proto__ || (0, _getPrototypeOf2.default)(Parser)).call(this, { objectMode: true }));

    _this.debug = debug;
    _this.colMetadata = colMetadata;
    _this.options = options;

    _this.buffer = new Buffer(0);
    _this.position = 0;
    _this.suspended = false;
    _this.await = undefined;
    _this.next = undefined;
    return _this;
  }

  (0, _createClass3.default)(Parser, [{
    key: '_transform',
    value: function _transform(input, encoding, done) {
      if (this.position === this.buffer.length) {
        this.buffer = input;
      } else {
        this.buffer = Buffer.concat([this.buffer.slice(this.position), input]);
      }
      this.position = 0;

      // This will be called once we need to wait for more data to
      // become available
      this.await = done;

      if (this.suspended) {
        // Unsuspend and continue from where ever we left off.
        this.suspended = false;
        this.next.call(null);
      }

      // If we're no longer suspended, parse new tokens
      if (!this.suspended) {
        // Start the parser
        this.parseTokens();
      }
    }
  }, {
    key: 'parseTokens',
    value: function parseTokens() {
      var _this2 = this;

      var doneParsing = function doneParsing(token) {
        if (token) {
          switch (token.name) {
            case 'COLMETADATA':
              _this2.colMetadata = token.columns;
          }

          _this2.push(token);
        }
      };

      while (!this.suspended && this.position + 1 <= this.buffer.length) {
        var type = this.buffer.readUInt8(this.position, true);

        this.position += 1;

        if (tokenParsers[type]) {
          tokenParsers[type](this, this.colMetadata, this.options, doneParsing);
        } else {
          this.emit('error', new Error('Unknown type: ' + type));
        }
      }

      if (!this.suspended && this.position === this.buffer.length) {
        // If we reached the end of the buffer, we can stop parsing now.
        return this.await.call(null);
      }
    }
  }, {
    key: 'suspend',
    value: function suspend(next) {
      this.suspended = true;
      this.next = next;
      this.await.call(null);
    }
  }, {
    key: 'awaitData',
    value: function awaitData(length, callback) {
      var _this3 = this;

      if (this.position + length <= this.buffer.length) {
        callback();
      } else {
        this.suspend(function () {
          _this3.awaitData(length, callback);
        });
      }
    }
  }, {
    key: 'readInt8',
    value: function readInt8(callback) {
      var _this4 = this;

      this.awaitData(1, function () {
        var data = _this4.buffer.readInt8(_this4.position);
        _this4.position += 1;
        callback(data);
      });
    }
  }, {
    key: 'readUInt8',
    value: function readUInt8(callback) {
      var _this5 = this;

      this.awaitData(1, function () {
        var data = _this5.buffer.readUInt8(_this5.position);
        _this5.position += 1;
        callback(data);
      });
    }
  }, {
    key: 'readInt16LE',
    value: function readInt16LE(callback) {
      var _this6 = this;

      this.awaitData(2, function () {
        var data = _this6.buffer.readInt16LE(_this6.position);
        _this6.position += 2;
        callback(data);
      });
    }
  }, {
    key: 'readInt16BE',
    value: function readInt16BE(callback) {
      var _this7 = this;

      this.awaitData(2, function () {
        var data = _this7.buffer.readInt16BE(_this7.position);
        _this7.position += 2;
        callback(data);
      });
    }
  }, {
    key: 'readUInt16LE',
    value: function readUInt16LE(callback) {
      var _this8 = this;

      this.awaitData(2, function () {
        var data = _this8.buffer.readUInt16LE(_this8.position);
        _this8.position += 2;
        callback(data);
      });
    }
  }, {
    key: 'readUInt16BE',
    value: function readUInt16BE(callback) {
      var _this9 = this;

      this.awaitData(2, function () {
        var data = _this9.buffer.readUInt16BE(_this9.position);
        _this9.position += 2;
        callback(data);
      });
    }
  }, {
    key: 'readInt32LE',
    value: function readInt32LE(callback) {
      var _this10 = this;

      this.awaitData(4, function () {
        var data = _this10.buffer.readInt32LE(_this10.position);
        _this10.position += 4;
        callback(data);
      });
    }
  }, {
    key: 'readInt32BE',
    value: function readInt32BE(callback) {
      var _this11 = this;

      this.awaitData(4, function () {
        var data = _this11.buffer.readInt32BE(_this11.position);
        _this11.position += 4;
        callback(data);
      });
    }
  }, {
    key: 'readUInt32LE',
    value: function readUInt32LE(callback) {
      var _this12 = this;

      this.awaitData(4, function () {
        var data = _this12.buffer.readUInt32LE(_this12.position);
        _this12.position += 4;
        callback(data);
      });
    }
  }, {
    key: 'readUInt32BE',
    value: function readUInt32BE(callback) {
      var _this13 = this;

      this.awaitData(4, function () {
        var data = _this13.buffer.readUInt32BE(_this13.position);
        _this13.position += 4;
        callback(data);
      });
    }
  }, {
    key: 'readInt64LE',
    value: function readInt64LE(callback) {
      var _this14 = this;

      this.awaitData(8, function () {
        var data = Math.pow(2, 32) * _this14.buffer.readInt32LE(_this14.position + 4) + (_this14.buffer[_this14.position + 4] & 0x80 === 0x80 ? 1 : -1) * _this14.buffer.readUInt32LE(_this14.position);
        _this14.position += 8;
        callback(data);
      });
    }
  }, {
    key: 'readInt64BE',
    value: function readInt64BE(callback) {
      var _this15 = this;

      this.awaitData(8, function () {
        var data = Math.pow(2, 32) * _this15.buffer.readInt32BE(_this15.position) + (_this15.buffer[_this15.position] & 0x80 === 0x80 ? 1 : -1) * _this15.buffer.readUInt32BE(_this15.position + 4);
        _this15.position += 8;
        callback(data);
      });
    }
  }, {
    key: 'readUInt64LE',
    value: function readUInt64LE(callback) {
      var _this16 = this;

      this.awaitData(8, function () {
        var data = Math.pow(2, 32) * _this16.buffer.readUInt32LE(_this16.position + 4) + _this16.buffer.readUInt32LE(_this16.position);
        _this16.position += 8;
        callback(data);
      });
    }
  }, {
    key: 'readUInt64BE',
    value: function readUInt64BE(callback) {
      var _this17 = this;

      this.awaitData(8, function () {
        var data = Math.pow(2, 32) * _this17.buffer.readUInt32BE(_this17.position) + _this17.buffer.readUInt32BE(_this17.position + 4);
        _this17.position += 8;
        callback(data);
      });
    }
  }, {
    key: 'readFloatLE',
    value: function readFloatLE(callback) {
      var _this18 = this;

      this.awaitData(4, function () {
        var data = _this18.buffer.readFloatLE(_this18.position);
        _this18.position += 4;
        callback(data);
      });
    }
  }, {
    key: 'readFloatBE',
    value: function readFloatBE(callback) {
      var _this19 = this;

      this.awaitData(4, function () {
        var data = _this19.buffer.readFloatBE(_this19.position);
        _this19.position += 4;
        callback(data);
      });
    }
  }, {
    key: 'readDoubleLE',
    value: function readDoubleLE(callback) {
      var _this20 = this;

      this.awaitData(8, function () {
        var data = _this20.buffer.readDoubleLE(_this20.position);
        _this20.position += 8;
        callback(data);
      });
    }
  }, {
    key: 'readDoubleBE',
    value: function readDoubleBE(callback) {
      var _this21 = this;

      this.awaitData(8, function () {
        var data = _this21.buffer.readDoubleBE(_this21.position);
        _this21.position += 8;
        callback(data);
      });
    }
  }, {
    key: 'readUInt24LE',
    value: function readUInt24LE(callback) {
      var _this22 = this;

      this.awaitData(3, function () {
        var low = _this22.buffer.readUInt16LE(_this22.position);
        var high = _this22.buffer.readUInt8(_this22.position + 2);

        _this22.position += 3;

        callback(low | high << 16);
      });
    }
  }, {
    key: 'readUInt40LE',
    value: function readUInt40LE(callback) {
      var _this23 = this;

      this.awaitData(5, function () {
        var low = _this23.buffer.readUInt32LE(_this23.position);
        var high = _this23.buffer.readUInt8(_this23.position + 4);

        _this23.position += 5;

        callback(0x100000000 * high + low);
      });
    }
  }, {
    key: 'readUNumeric64LE',
    value: function readUNumeric64LE(callback) {
      var _this24 = this;

      this.awaitData(8, function () {
        var low = _this24.buffer.readUInt32LE(_this24.position);
        var high = _this24.buffer.readUInt32LE(_this24.position + 4);

        _this24.position += 8;

        callback(0x100000000 * high + low);
      });
    }
  }, {
    key: 'readUNumeric96LE',
    value: function readUNumeric96LE(callback) {
      var _this25 = this;

      this.awaitData(12, function () {
        var dword1 = _this25.buffer.readUInt32LE(_this25.position);
        var dword2 = _this25.buffer.readUInt32LE(_this25.position + 4);
        var dword3 = _this25.buffer.readUInt32LE(_this25.position + 8);

        _this25.position += 12;

        callback(dword1 + 0x100000000 * dword2 + 0x100000000 * 0x100000000 * dword3);
      });
    }
  }, {
    key: 'readUNumeric128LE',
    value: function readUNumeric128LE(callback) {
      var _this26 = this;

      this.awaitData(16, function () {
        var dword1 = _this26.buffer.readUInt32LE(_this26.position);
        var dword2 = _this26.buffer.readUInt32LE(_this26.position + 4);
        var dword3 = _this26.buffer.readUInt32LE(_this26.position + 8);
        var dword4 = _this26.buffer.readUInt32LE(_this26.position + 12);

        _this26.position += 16;

        callback(dword1 + 0x100000000 * dword2 + 0x100000000 * 0x100000000 * dword3 + 0x100000000 * 0x100000000 * 0x100000000 * dword4);
      });
    }

    // Variable length data

  }, {
    key: 'readBuffer',
    value: function readBuffer(length, callback) {
      var _this27 = this;

      this.awaitData(length, function () {
        var data = _this27.buffer.slice(_this27.position, _this27.position + length);
        _this27.position += length;
        callback(data);
      });
    }

    // Read a Unicode String (BVARCHAR)

  }, {
    key: 'readBVarChar',
    value: function readBVarChar(callback) {
      var _this28 = this;

      this.readUInt8(function (length) {
        _this28.readBuffer(length * 2, function (data) {
          callback(data.toString('ucs2'));
        });
      });
    }

    // Read a Unicode String (USVARCHAR)

  }, {
    key: 'readUsVarChar',
    value: function readUsVarChar(callback) {
      var _this29 = this;

      this.readUInt16LE(function (length) {
        _this29.readBuffer(length * 2, function (data) {
          callback(data.toString('ucs2'));
        });
      });
    }

    // Read binary data (BVARBYTE)

  }, {
    key: 'readBVarByte',
    value: function readBVarByte(callback) {
      var _this30 = this;

      this.readUInt8(function (length) {
        _this30.readBuffer(length, callback);
      });
    }

    // Read binary data (USVARBYTE)

  }, {
    key: 'readUsVarByte',
    value: function readUsVarByte(callback) {
      var _this31 = this;

      this.readUInt16LE(function (length) {
        _this31.readBuffer(length, callback);
      });
    }
  }]);
  return Parser;
}(Transform);

/***/ }),
/* 506 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(38);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventEmitter = __webpack_require__(31).EventEmitter;
var StreamParser = __webpack_require__(505);

/*
  Buffers are thrown at the parser (by calling addBuffer).
  Tokens are parsed from the buffer until there are no more tokens in
  the buffer, or there is just a partial token left.
  If there is a partial token left over, then it is kept until another
  buffer is added, which should contain the remainder of the partial
  token, along with (perhaps) more tokens.
  The partial token and the new buffer are concatenated, and the token
  parsing resumes.
 */

var Parser = function (_EventEmitter) {
  (0, _inherits3.default)(Parser, _EventEmitter);

  function Parser(debug, colMetadata, options) {
    (0, _classCallCheck3.default)(this, Parser);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Parser.__proto__ || (0, _getPrototypeOf2.default)(Parser)).call(this));

    _this.debug = debug;
    _this.colMetadata = _this.colMetadata;
    _this.options = options;

    _this.parser = new StreamParser(_this.debug, _this.colMetadata, _this.options);
    _this.parser.on('data', function (token) {
      if (token.event) {
        _this.emit(token.event, token);
      }
    });
    return _this;
  }

  (0, _createClass3.default)(Parser, [{
    key: 'addBuffer',
    value: function addBuffer(buffer) {
      return this.parser.write(buffer);
    }
  }, {
    key: 'isEnd',
    value: function isEnd() {
      return this.parser.buffer.length === this.parser.position;
    }
  }]);
  return Parser;
}(EventEmitter);

module.exports.Parser = Parser;

/***/ }),
/* 507 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(8);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(9);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var convertLEBytesToString = __webpack_require__(139).convertLEBytesToString;

/*
  A Buffer-like class that tracks position.

  As values are read, the position advances by the size of the read data.
  When reading, if the read would pass the end of the buffer, an error object is thrown.
 */

module.exports = function () {
  function ReadableTrackingBuffer(buffer, encoding) {
    (0, _classCallCheck3.default)(this, ReadableTrackingBuffer);

    this.buffer = buffer;
    this.encoding = encoding;
    if (!this.buffer) {
      this.buffer = new Buffer(0);
      this.encoding = undefined;
    }
    this.encoding || (this.encoding = 'utf8');
    this.position = 0;
  }

  (0, _createClass3.default)(ReadableTrackingBuffer, [{
    key: 'add',
    value: function add(buffer) {
      this.buffer = Buffer.concat([this.buffer.slice(this.position), buffer]);
      return this.position = 0;
    }
  }, {
    key: 'assertEnoughLeftFor',
    value: function assertEnoughLeftFor(lengthRequired) {
      this.previousPosition = this.position;
      var available = this.buffer.length - this.position;
      if (available < lengthRequired) {
        var e = new Error('required : ' + lengthRequired + ', available : ' + available);
        e.code = 'oob';
        throw e;
      }
    }
  }, {
    key: 'empty',
    value: function empty() {
      return this.position === this.buffer.length;
    }
  }, {
    key: 'rollback',
    value: function rollback() {
      return this.position = this.previousPosition;
    }
  }, {
    key: 'readUInt8',
    value: function readUInt8() {
      var length = 1;
      this.assertEnoughLeftFor(length);
      this.position += length;
      return this.buffer.readUInt8(this.position - length);
    }
  }, {
    key: 'readUInt16LE',
    value: function readUInt16LE() {
      var length = 2;
      this.assertEnoughLeftFor(length);
      this.position += length;
      return this.buffer.readUInt16LE(this.position - length);
    }
  }, {
    key: 'readUInt16BE',
    value: function readUInt16BE() {
      var length = 2;
      this.assertEnoughLeftFor(length);
      this.position += length;
      return this.buffer.readUInt16BE(this.position - length);
    }
  }, {
    key: 'readUInt32LE',
    value: function readUInt32LE() {
      var length = 4;
      this.assertEnoughLeftFor(length);
      this.position += length;
      return this.buffer.readUInt32LE(this.position - length);
    }
  }, {
    key: 'readUInt32BE',
    value: function readUInt32BE() {
      var length = 4;
      this.assertEnoughLeftFor(length);
      this.position += length;
      return this.buffer.readUInt32BE(this.position - length);
    }
  }, {
    key: 'readInt8',
    value: function readInt8() {
      var length = 1;
      this.assertEnoughLeftFor(length);
      this.position += length;
      return this.buffer.readInt8(this.position - length);
    }
  }, {
    key: 'readInt16LE',
    value: function readInt16LE() {
      var length = 2;
      this.assertEnoughLeftFor(length);
      this.position += length;
      return this.buffer.readInt16LE(this.position - length);
    }
  }, {
    key: 'readInt16BE',
    value: function readInt16BE() {
      var length = 2;
      this.assertEnoughLeftFor(length);
      this.position += length;
      return this.buffer.readInt16BE(this.position - length);
    }
  }, {
    key: 'readInt32LE',
    value: function readInt32LE() {
      var length = 4;
      this.assertEnoughLeftFor(length);
      this.position += length;
      return this.buffer.readInt32LE(this.position - length);
    }
  }, {
    key: 'readInt32BE',
    value: function readInt32BE() {
      var length = 4;
      this.assertEnoughLeftFor(length);
      this.position += length;
      return this.buffer.readInt32BE(this.position - length);
    }
  }, {
    key: 'readFloatLE',
    value: function readFloatLE() {
      var length = 4;
      this.assertEnoughLeftFor(length);
      this.position += length;
      return this.buffer.readFloatLE(this.position - length);
    }
  }, {
    key: 'readDoubleLE',
    value: function readDoubleLE() {
      var length = 8;
      this.assertEnoughLeftFor(length);
      this.position += length;
      return this.buffer.readDoubleLE(this.position - length);
    }
  }, {
    key: 'readUInt24LE',
    value: function readUInt24LE() {
      var length = 3;
      this.assertEnoughLeftFor(length);
      var val = this.buffer[this.position + 1] << 8;
      val |= this.buffer[this.position];
      val += this.buffer[this.position + 2] << 16 >>> 0;
      this.position += length;
      return val;
    }
  }, {
    key: 'readUInt40LE',
    value: function readUInt40LE() {
      var low = this.readBuffer(4).readUInt32LE(0);
      var high = Buffer.concat([this.readBuffer(1), new Buffer([0x00, 0x00, 0x00])]).readUInt32LE(0);
      return low + 0x100000000 * high;
    }

    // If value > 53 bits then it will be incorrect (because Javascript uses IEEE_754 for number representation).

  }, {
    key: 'readUInt64LE',
    value: function readUInt64LE() {
      var low = this.readUInt32LE();
      var high = this.readUInt32LE();
      if (high >= 2 << 53 - 32) {
        console.warn('Read UInt64LE > 53 bits : high=' + high + ', low=' + low);
      }
      return low + 0x100000000 * high;
    }
  }, {
    key: 'readUNumeric64LE',
    value: function readUNumeric64LE() {
      var low = this.readUInt32LE();
      var high = this.readUInt32LE();
      return low + 0x100000000 * high;
    }
  }, {
    key: 'readUNumeric96LE',
    value: function readUNumeric96LE() {
      var dword1 = this.readUInt32LE();
      var dword2 = this.readUInt32LE();
      var dword3 = this.readUInt32LE();
      return dword1 + 0x100000000 * dword2 + 0x100000000 * 0x100000000 * dword3;
    }
  }, {
    key: 'readUNumeric128LE',
    value: function readUNumeric128LE() {
      var dword1 = this.readUInt32LE();
      var dword2 = this.readUInt32LE();
      var dword3 = this.readUInt32LE();
      var dword4 = this.readUInt32LE();
      return dword1 + 0x100000000 * dword2 + 0x100000000 * 0x100000000 * dword3 + 0x100000000 * 0x100000000 * 0x100000000 * dword4;
    }
  }, {
    key: 'readString',
    value: function readString(length, encoding) {
      encoding || (encoding = this.encoding);
      this.assertEnoughLeftFor(length);
      this.position += length;
      return this.buffer.toString(encoding, this.position - length, this.position);
    }
  }, {
    key: 'readBVarchar',
    value: function readBVarchar(encoding) {
      encoding || (encoding = this.encoding);
      var multiplier = encoding === 'ucs2' ? 2 : 1;
      var length = this.readUInt8() * multiplier;
      return this.readString(length, encoding);
    }
  }, {
    key: 'readUsVarchar',
    value: function readUsVarchar(encoding) {
      encoding || (encoding = this.encoding);
      var multiplier = encoding === 'ucs2' ? 2 : 1;
      var length = this.readUInt16LE() * multiplier;
      return this.readString(length, encoding);
    }
  }, {
    key: 'readBuffer',
    value: function readBuffer(length) {
      this.assertEnoughLeftFor(length);
      this.position += length;
      return this.buffer.slice(this.position - length, this.position);
    }
  }, {
    key: 'readArray',
    value: function readArray(length) {
      return Array.prototype.slice.call(this.readBuffer(length), 0, length);
    }
  }, {
    key: 'readAsStringBigIntLE',
    value: function readAsStringBigIntLE(length) {
      this.assertEnoughLeftFor(length);
      this.position += length;
      return convertLEBytesToString(this.buffer.slice(this.position - length, this.position));
    }
  }, {
    key: 'readAsStringInt64LE',
    value: function readAsStringInt64LE() {
      return this.readAsStringBigIntLE(8);
    }
  }]);
  return ReadableTrackingBuffer;
}();

/***/ }),
/* 508 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * For Node.js, simply re-export the core `util.deprecate` function.
 */

module.exports = __webpack_require__(63).deprecate;


/***/ }),
/* 509 */
/***/ (function(module, exports) {

module.exports = require("dgram");

/***/ }),
/* 510 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 511 */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),
/* 512 */
/***/ (function(module, exports) {

module.exports = require("string_decoder");

/***/ }),
/* 513 */
/***/ (function(module, exports) {

module.exports = require("tls");

/***/ }),
/* 514 */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),
/* 515 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 516 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(210);
module.exports = __webpack_require__(209);


/***/ })
/******/ ]);