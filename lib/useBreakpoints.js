"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBreakpoints = exports["default"] = void 0;

var _useWindowSize = _interopRequireDefault(require("./useWindowSize"));

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var useBreakpoints = function useBreakpoints(theme) {
  var windowSize = (0, _useWindowSize["default"])();
  var regex = /[\d]+/;

  var getPxValue = function getPxValue(value) {
    //! add functionality around units in the future?
    // @param value: numerical or string value with and without px
    if (typeof value === 'string') {
      return value.match(regex)[0];
    }

    return value;
  };

  var getUpper = function getUpper() {
    // returns next biggest breakpoint widthwise or -1 if no upper can be determined
    var NO_UPPER = -1;

    if (_typeof(theme.breakpoints) !== 'object') {
      return NO_UPPER;
    }

    var getNearsestUp = function getNearsestUp(prev, br) {
      var brPx = getPxValue(br);
      var upper = '';

      if (!prev) {
        return brPx;
      }

      var diff = brPx - windowSize.width;
      return diff > 0 && diff < prev - windowSize.width ? brPx : prev;
    };

    var upper = '';

    if (Array.isArray(theme.breakpoints)) {
      upper = theme.breakpoints.reduce(getNearsestUp);
    } else {
      // must be an obj
      var brAry = Object.keys(theme.breakpoints).map(function (key) {
        return theme.breakpoints[key];
      });
      return brAry.reduce(getNearsestUp);
    }

    return upper || NO_UPPER;
  };

  var getLower = function getLower() {
    // returns next smaller breakpoint widthwise or -1 if no lower can be determined
    var NO_LOWER = -1;

    var getNearestLow = function getNearestLow(prev, br) {
      var brPx = getPxValue(br);
      var diff = windowSize.width - brPx;
      return diff > 0 && diff < windowSize.width - prev ? brPx : prev;
    };

    if (_typeof(theme.breakpoints) !== 'object') {
      return NO_LOWER;
    }

    var lower = '';

    if (Array.isArray(theme.breakpoints)) {
      lower = theme.reduce(getNearestLow);
    } else {
      // must be an obj
      var brAry = Object.keys(theme.breakpoints).map(function (key) {
        return theme.breakpoints[key];
      });
      return brAry.reduce(getNearestLow);
    }

    return lower || NO_LOWER;
  };

  var getRatio = function getRatio() {
    return 1 - (getUpper() - getLower()) / getUpper();
  };

  var getPxValues = function getPxValues() {
    if (_typeof(theme.breakpoints) !== 'object') {
      return getPxValue(theme.breakpoints);
    } else if (Array.isArray(theme.breakpoints)) {
      return theme.breakpoints.map(function (br) {
        return getPxValue(br);
      });
    } else {
      // must be an object
      return Object.keys(theme.breakpoints).map(function (br) {
        return getPxValue(theme.breakpoints[br]);
      });
    }
  };

  var getIndexOfLower = function getIndexOfLower() {
    return getPxValues().indexOf(getLower());
  };

  var _useState = (0, _react.useState)({
    br: getPxValues(),
    upper: getUpper(),
    lower: getLower(),
    indexOfLower: getIndexOfLower(),
    ratio: getRatio,
    // in consideration for future intellegent br functionality
    current: {
      width: windowSize.width,
      height: windowSize.height
    }
  }),
      _useState2 = _slicedToArray(_useState, 2),
      breakpoints = _useState2[0],
      setBreakpoints = _useState2[1];

  (0, _react.useEffect)(function () {
    setBreakpoints({
      br: getPxValues(),
      upper: getUpper(),
      lower: getLower(),
      indexOfLower: getIndexOfLower(),
      ratio: getRatio,
      // in consideration for future intellegent br functionality
      current: windowSize
    });
  }, [windowSize]);
  return breakpoints;
};

exports.useBreakpoints = useBreakpoints;
var _default = useBreakpoints;
exports["default"] = _default;