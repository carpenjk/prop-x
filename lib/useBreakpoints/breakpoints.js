"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toArray = exports.getUpper = exports.getRatio = exports.getPxValue = exports.getLower = exports.getIndexOfLower = exports.getBreakpointPixels = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var getPxValue = function getPxValue(value) {
  var regex = /[\d]+/; //! add functionality around units in the future?
  // @param value: numerical or string value with and without px

  if (typeof value === 'string') {
    return value.match(regex)[0];
  }

  return value;
};

exports.getPxValue = getPxValue;

var getBreakpointPixels = function getBreakpointPixels(breakpoints) {
  if (_typeof(breakpoints) !== 'object') {
    return [Number(getPxValue(breakpoints))];
  } else if (Array.isArray(breakpoints)) {
    return breakpoints.map(function (br) {
      return Number(getPxValue(br));
    });
  } else {
    // must be an object
    return Object.keys(breakpoints).reduce(function (obj, br) {
      return _objectSpread(_objectSpread({}, obj), {}, _defineProperty({}, br, Number(getPxValue(breakpoints[br]))));
    }, {});
  }
};

exports.getBreakpointPixels = getBreakpointPixels;

var toArray = function toArray(breakpoints) {
  var brPixels = getBreakpointPixels(breakpoints);

  if (Array.isArray(brPixels)) {
    return brPixels.sort(function (a, b) {
      return a > b;
    });
  }

  return Object.keys(brPixels).map(function (k) {
    return brPixels[k];
  }).sort(function (a, b) {
    return a > b;
  });
};

exports.toArray = toArray;

var getUpper = function getUpper(breakpoints, windowSize) {
  // returns next biggest breakpoint widthwise or -1 if no upper can be determined
  var NO_UPPER = -1;

  if (_typeof(breakpoints) !== 'object') {
    return NO_UPPER;
  }

  var getNearestUp = function getNearestUp(prev, br) {
    if (!prev) {
      return br;
    }

    var diff = br - windowSize.width;
    return diff > 0 && diff < prev - windowSize.width ? br : prev;
  };

  return toArray(breakpoints).reverse().reduce(getNearestUp);
};

exports.getUpper = getUpper;

var getLower = function getLower(breakpoints, windowSize) {
  // returns next smaller breakpoint widthwise or -1 if no lower can be determined
  var NO_LOWER = -1;

  if (_typeof(breakpoints) !== 'object') {
    return NO_LOWER;
  }

  var getNearestLow = function getNearestLow(prev, br) {
    var diff = windowSize.width - br;
    return diff > 0 && diff < windowSize.width - prev ? br : prev;
  };

  return toArray(breakpoints).reduce(getNearestLow);
};

exports.getLower = getLower;

var getRatio = function getRatio(breakpoints, windowSize) {
  return 1 - (getUpper(breakpoints, windowSize) - getLower(breakpoints, windowSize)) / getUpper(breakpoints, windowSize);
}; // returns the array index or object key of nearest lower breakpoint


exports.getRatio = getRatio;

var getIndexOfLower = function getIndexOfLower(breakpoints) {
  var brPixels = getBreakpointPixels(breakpoints);

  if (brPixels.length === 1) {
    return 0;
  } else if (Array.isArray(brPixels)) {
    return brPixels.indexOf(getLower(breakpoints));
  } else {
    // must be obj
    return Object.keys(brPixels).filter(function (br) {
      return brPixels[br] === getLower();
    });
  }
};

exports.getIndexOfLower = getIndexOfLower;