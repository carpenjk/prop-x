"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._getUnitValue = _getUnitValue;
exports._getVal = _getVal;

function _getVal(v, props, br) {
  var values = typeof v === 'function' ? v(props, br) : v;
  if (Array.isArray(values)) return values[br];
  return values;
}

;

function _getUnitValue(derivedValue) {
  return typeof derivedValue !== 'number' ? derivedValue : "".concat(derivedValue, "px");
}