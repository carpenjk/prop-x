"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProp = void 0;
var core_1 = require("../core");
var internal_1 = require("../internal");
var getProp = function (prop) { return function (props, br) {
    var derivedBr = (0, internal_1.deriveIndex)(br);
    var value = (0, core_1.getIndexedPropValue)(props[prop], derivedBr);
    return value !== undefined ? value : '';
}; };
exports.getProp = getProp;
