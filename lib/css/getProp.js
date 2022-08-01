"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProp = void 0;

var _core = require("../core");

// returns responsive prop value within styled component tag function
var getProp = function getProp(prop) {
  return function (props, br) {
    return (0, _core.getIndexedPropValue)(props[prop], br);
  };
};

exports.getProp = getProp;