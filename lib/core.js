"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inverseProp = exports.getPropIndex = exports.getIndexedPropValue = void 0;
exports.parseAndCalc = parseAndCalc;
exports.windProps = exports.unwindProps = exports.parseSizeUnits = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// takes a css size string and returns an object containing
// {
//  whole: <original string> ,
//  value: <numerical value> ,
//  unit: <css size unit>,
// }
var parseSizeUnits = function parseSizeUnits(valUnits) {
  function parseSizeUnit(valUnit) {
    if (!valUnit) return undefined;

    if (!valUnit.match) {
      var numberValue = Number(valUnit);

      if (!Number.isNaN(numberValue)) {
        return {
          value: numberValue,
          whole: valUnit
        };
      } else {
        return {
          whole: valUnits
        };
      }
    }

    var exp = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;
    var matches = [];
    matches = valUnit.match(exp);
    if (!matches) return {
      whole: valUnits,
      value: undefined,
      unit: undefined
    };
    return {
      whole: matches[0],
      value: matches[1] ? Number(matches[1]) : undefined,
      unit: matches[2]
    };
  }

  if (!Array.isArray(valUnits)) {
    return parseSizeUnit(valUnits);
  }

  return valUnits.map(function (val) {
    return parseSizeUnit(val);
  });
}; // parses variables and passes to provided callback function
// @param vars: "1px" || ["1px", "auto", ]
// ex...  parseAndCalc([height, img.rowSpan], ([_height, rSpan]) =>
//        _height && rSpan ? _height * rSpan : undefined
// ),


exports.parseSizeUnits = parseSizeUnits;

function parseAndCalc(vars, fn) {
  var parsedVars = _toConsumableArray(parseSizeUnits(vars));

  var varValues = parsedVars.map(function (v) {
    return v && v.value ? v.value : undefined;
  });
  var valWithUnit = parsedVars.find(function (_ref) {
    var unit = _ref.unit;
    return unit;
  });
  var u = valWithUnit && parsedVars.find(function (_ref2) {
    var unit = _ref2.unit;
    return unit;
  }).unit ? valWithUnit.unit : '';
  return "".concat(fn(varValues)).concat(u);
} // returns the applicable index to use as a reference for the provided property and index
// returns the lesser of provided index and last index in the prop array
// returns undefined if prop is undefined or not an array


var getPropIndex = function getPropIndex(vals, i) {
  var _i = i || 0;

  if (!vals || !Array.isArray(vals)) return undefined;
  return vals[_i] !== undefined ? _i : vals.length - 1;
}; // returns property value based on provided property and index


exports.getPropIndex = getPropIndex;

var getIndexedPropValue = function getIndexedPropValue(vals, i) {
  var index = getPropIndex(vals, i);
  return index !== undefined ? vals[index] : vals;
}; // toggle boolean values in prop or prop array


exports.getIndexedPropValue = getIndexedPropValue;

var inverseProp = function inverseProp(prop) {
  if (!Array.isArray(prop)) {
    return !prop;
  } else {
    return prop.map(function (item) {
      return !item;
    });
  }
}; // windProps:
// transforms array of props into an object of prop arrays
// ex.
// from:
// [
//   {
//    top: '100px',
//    left: '50%',
//    transform: 'translateX(-50%)',
//  },
//  {
//    top: '50%',
//    transform: 'translateY(-50%)'
//  }
// ]
// to:
// {
//   top: ['100px', '50%'],
//   left: ['50%',''],
//   transform:  ['translateX(-50%)', 'translateY(-50%)']
// }
//
// if defaults provided, then empty slots in the array will be infused with default value.
// this is helplful because getProps gets the nearest smaller breakpoint value. Using a default
// reinfuses the default value instead.
// @params defaults ex. 1 {left: ['8px', '0']}  || ex. 2 {left: '8px'}


exports.inverseProp = inverseProp;

var windProps = function windProps(props, config) {
  var _ref3 = config || {},
      defaultValues = _ref3.defaultValues,
      options = _ref3.options;

  var _ref4 = options || {},
      _ref4$useNoValue = _ref4.useNoValue,
      useNoValue = _ref4$useNoValue === void 0 ? true : _ref4$useNoValue,
      _ref4$noValue = _ref4.noValue,
      noValue = _ref4$noValue === void 0 ? '' : _ref4$noValue;

  if (!Array.isArray(props)) {
    return props;
  }

  function createSuperSet(propAry) {
    var superSetObj = {}; // iterate through each key pair property object

    propAry.forEach(function (obj) {
      // iterate through key pairs of current prop object
      Object.keys(obj).forEach(function (p) {
        // add key to superSetObject
        superSetObj[p] = [];
      });
    });
    return superSetObj;
  }

  var wound = createSuperSet(props);
  var resultLength = props.length;

  var _loop = function _loop(i) {
    Object.keys(wound).forEach(function (key) {
      // if key exists in current propArry obj, push value, else push default
      var curValue = props[i][key];

      if (curValue !== undefined) {
        wound[key].push(curValue);
      } else {
        var value = defaultValues && defaultValues[key] !== undefined ? getIndexedPropValue(defaultValues[key], i) : undefined;

        if (value !== undefined) {
          wound[key].push(value);
        } else if (useNoValue) {
          wound[key].push(noValue);
        }
      }
    });
  };

  for (var i = 0; i < resultLength; i += 1) {
    _loop(i);
  }

  return wound;
}; // unwindProps:
// transforms an object of prop arrays into an array of props
// this is useful in combination with Array.prototype.map to apply logic to each set of
// values corresponding to a breakpoint or other index
// the last value in each prop array will be carried forward to mirror getProps by default
// @param defaultValues: [{ prop: a || [a, b, c...] }, ...]
// default values will be used to fill in gaps for any provided values overwriting carryforward value
// Options:
// @option useNoValue: true || false (default)
// useNoValue overwrites carryforward in the event of no default value
// @option noValue: any value || undefined (default)


exports.windProps = windProps;

var unwindProps = function unwindProps(props, config) {
  var _ref5 = config || {},
      defaultValues = _ref5.defaultValues,
      options = _ref5.options;

  var _ref6 = options || {},
      noValue = _ref6.noValue,
      _ref6$useNoValue = _ref6.useNoValue,
      useNoValue = _ref6$useNoValue === void 0 ? false : _ref6$useNoValue; // first iteration return value


  function getCurrValue(k, i) {
    var values = props[k]; // handle undefined properties

    if (!values) {
      return;
    } // return static values on first iteration


    if (!Array.isArray(values)) {
      if (i !== 0) {
        return;
      } else {
        return _defineProperty({}, k, values);
      }
    }

    var pAryLength = values.length;

    if (i >= pAryLength) {
      // no value at this iteration
      return;
    } // return curr value


    return _defineProperty({}, k, values[i]);
  }

  var unwound = [];
  var keys = Object.keys(props);
  var resultLength = Math.max.apply(Math, _toConsumableArray(keys.map(function (k) {
    var values = props[k];
    return Array.isArray(values) ? values.length : 1;
  })));

  var _loop2 = function _loop2(i) {
    var propObj = keys.reduce(function (obj, p) {
      // use current value if exist in prop set
      var currVal = getCurrValue(p, i);

      if (currVal !== undefined) {
        return _objectSpread(_objectSpread({}, obj), getCurrValue(p, i));
      } else {
        var defaultValue = defaultValues && defaultValues[p] !== undefined ? getIndexedPropValue(defaultValues[p], i) : undefined;

        if (defaultValue) {
          return _objectSpread(_objectSpread({}, obj), {}, _defineProperty({}, p, defaultValue));
        } else if (useNoValue) {
          return _objectSpread(_objectSpread({}, obj), {}, _defineProperty({}, p, noValue));
        } else {
          // get carry forward value
          return _objectSpread(_objectSpread({}, obj), {}, _defineProperty({}, p, getIndexedPropValue(props[p], i)));
        }
      }
    }, {});
    unwound.push(propObj);
  };

  for (var i = 0; i < resultLength; i += 1) {
    _loop2(i);
  }

  return unwound;
};

exports.unwindProps = unwindProps;