"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.condition = void 0;

var _internal = require("../internal");

var _getProp = require("./getProp");

// @param cnd(option1): callback function returns boolean and accepts params props, br (optional)
// @param cnd(option2): string value of property name
var condition = function condition(cnd) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function (props, br) {
      var cndBln = '';

      if (typeof cnd === 'function') {
        // call function
        cndBln = cnd(props, br);
      } else if (typeof cnd === 'string') {
        cndBln = !!(0, _getProp.getProp)(cnd)(props, br);
      } else {
        cndBln = cnd;
      }

      if (!cndBln) return '';
      var cndStyles = '';
      args[0].forEach(function (str, i) {
        if (i < args.length - 1) {
          cndStyles = "".concat(cndStyles).concat(str).concat((0, _internal._getVal)(args[i + 1], props, br)); // get variable value or call function
        } else {
          cndStyles = cndStyles + str;
        }
      });
      return cndStyles;
    };
  };
};

exports.condition = condition;