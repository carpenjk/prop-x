"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._getUnitValue = exports._getVal = exports.deriveIndex = void 0;
function deriveIndex(br) {
    return br === undefined ? 0 : Number(br);
}
exports.deriveIndex = deriveIndex;
function _getVal(v, props, br) {
    var derivedBr = deriveIndex(br);
    var values = typeof v === 'function' ? v(props, br) : v;
    if (Array.isArray(values))
        return values[derivedBr];
    return values;
}
exports._getVal = _getVal;
;
function _getUnitValue(derivedValue) {
    return typeof derivedValue === 'number' ? "".concat(derivedValue, "px") : derivedValue;
}
exports._getUnitValue = _getUnitValue;
