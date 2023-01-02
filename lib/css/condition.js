"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.condition = void 0;
var internal_1 = require("../internal");
var getProp_1 = require("./getProp");
var condition = function (cnd) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function (props, br) {
            var cndBln = false;
            if (typeof cnd === 'function') {
                cndBln = cnd(props, br);
            }
            else if (typeof cnd === 'string') {
                cndBln = !!(0, getProp_1.getProp)(cnd)(props, br);
            }
            else {
                cndBln = cnd;
            }
            if (!cndBln)
                return '';
            var cndStyles = '';
            args[0].forEach(function (str, i) {
                if (i < args.length - 1) {
                    cndStyles = "".concat(cndStyles).concat(str).concat((0, internal_1._getVal)(args[i + 1], props, br || 0));
                }
                else {
                    cndStyles = cndStyles + str;
                }
            });
            return cndStyles;
        };
    };
};
exports.condition = condition;
