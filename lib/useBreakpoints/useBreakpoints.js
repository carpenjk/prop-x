"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBreakpoints = void 0;
var useWindowSize_1 = __importDefault(require("../useWindowSize"));
var react_1 = require("react");
var breakpoints_1 = require("../breakpoints");
var useBreakpoints = function (brValues) {
    var _a, _b, _c, _d;
    var windowSize = (0, useWindowSize_1.default)();
    var _e = (0, react_1.useState)({
        br: (0, breakpoints_1.getBreakpointPixels)(brValues),
        breakpoints: brValues,
        upper: (0, breakpoints_1.getUpper)(brValues, (_a = windowSize.width) !== null && _a !== void 0 ? _a : 0),
        lower: (0, breakpoints_1.getLower)(brValues, (_b = windowSize.width) !== null && _b !== void 0 ? _b : 0),
        indexOfLower: (0, breakpoints_1.getIndexOfLower)(brValues, (_c = windowSize.width) !== null && _c !== void 0 ? _c : 0),
        ratio: (0, breakpoints_1.getRatio)(brValues, (_d = windowSize.width) !== null && _d !== void 0 ? _d : 0),
        current: windowSize,
        toArray: function () { return (0, breakpoints_1.toArray)(brValues); }
    }), breakpoints = _e[0], setBreakpoints = _e[1];
    (0, react_1.useEffect)(function () {
        var _a, _b, _c, _d;
        setBreakpoints({
            br: (0, breakpoints_1.getBreakpointPixels)(brValues),
            breakpoints: brValues,
            upper: (0, breakpoints_1.getUpper)(brValues, (_a = windowSize.width) !== null && _a !== void 0 ? _a : 0),
            lower: (0, breakpoints_1.getLower)(brValues, (_b = windowSize.width) !== null && _b !== void 0 ? _b : 0),
            indexOfLower: (0, breakpoints_1.getIndexOfLower)(brValues, (_c = windowSize.width) !== null && _c !== void 0 ? _c : 0),
            ratio: (0, breakpoints_1.getRatio)(brValues, (_d = windowSize.width) !== null && _d !== void 0 ? _d : 0),
            current: windowSize,
            toArray: function () { return (0, breakpoints_1.toArray)(brValues); }
        });
    }, [windowSize, brValues]);
    return breakpoints;
};
exports.useBreakpoints = useBreakpoints;
exports.default = exports.useBreakpoints;
