"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.breakpoint = void 0;
var internal_1 = require("../internal");
var breakpoint = function (br) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function (props) {
            var breakpoints = props.theme.breakpoints;
            function createMediaQuery(brValue, brKey) {
                var media = "@media(min-Width: ".concat(brValue, "){");
                args[0].forEach(function (str, i) {
                    if (i < args.length - 1) {
                        media = "".concat(media).concat(str).concat((0, internal_1._getVal)(args[i + 1], props, brKey));
                    }
                    else {
                        media = media + str;
                    }
                });
                media = media + '\n}';
                return media;
            }
            if (Array.isArray(br)) {
                var medias_1 = '';
                var isInRange_1 = false;
                var currBRIndex_1 = 0;
                if (!Array.isArray(breakpoints)) {
                    for (var _i = 0, _a = Object.entries(breakpoints); _i < _a.length; _i++) {
                        var _b = _a[_i], key = _b[0], value = _b[1];
                        if (key === br[0] || key === br[0].toString())
                            isInRange_1 = true;
                        if (isInRange_1) {
                            medias_1 += createMediaQuery((0, internal_1._getUnitValue)(value), currBRIndex_1);
                        }
                        currBRIndex_1 += 1;
                        if (key === br[1] || key === br[1].toString())
                            break;
                    }
                }
                else {
                    breakpoints.every(function (bp, i) {
                        if (br[0] === i)
                            isInRange_1 = true;
                        if (isInRange_1) {
                            medias_1 += createMediaQuery((0, internal_1._getUnitValue)(bp), currBRIndex_1);
                        }
                        currBRIndex_1 += 1;
                        if (i === br[1])
                            return false;
                    });
                }
                return medias_1;
            }
            return Array.isArray(breakpoints)
                ? createMediaQuery((0, internal_1._getUnitValue)(breakpoints[br]), br)
                : createMediaQuery((0, internal_1._getUnitValue)(breakpoints[br]), br);
        };
    };
};
exports.breakpoint = breakpoint;
