"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createClassCSS = void 0;

var _internal = require("../internal");

function _createClassStyle(className, styles, props, br) {
  var keys = Object.keys(styles);
  var stylesCSS = '\n';
  keys.forEach(function (style) {
    stylesCSS = stylesCSS + "    ".concat(style, ": ").concat((0, _internal._getVal)(styles[style], props, br), ";\n");
  });
  var css = "&.".concat(className, " {").concat(stylesCSS, "}");
  return css;
}

var createClassCSS = function createClassCSS(className, styles) {
  return function (props) {
    return _createClassStyle(className, styles, props);
  };
};

exports.createClassCSS = createClassCSS;