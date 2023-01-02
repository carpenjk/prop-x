"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndexOfLower = exports.getRatio = exports.getLower = exports.getUpper = exports.toArray = exports.getBreakpointPixels = exports.getPxValue = void 0;
var getPxValue = function (value) {
    var regex = /[\d]+/;
    if (typeof value === 'string') {
        var match = value.match(regex);
        return match ? Number(match[0]) : null;
    }
    return value;
};
exports.getPxValue = getPxValue;
var getBreakpointPixels = function (breakpoints) {
    if (Array.isArray(breakpoints)) {
        return breakpoints.map(function (br) { return Number((0, exports.getPxValue)(br)); });
    }
    else {
        return Object.keys(breakpoints).reduce(function (obj, br) {
            var _a;
            return (__assign(__assign({}, obj), (_a = {}, _a[br] = Number((0, exports.getPxValue)(breakpoints[br])), _a)));
        }, {});
    }
};
exports.getBreakpointPixels = getBreakpointPixels;
var toArray = function (breakpoints) {
    var brPixels = (0, exports.getBreakpointPixels)(breakpoints);
    var sortFn = function (a, b) { return a - b; };
    if (Array.isArray(brPixels)) {
        return brPixels.sort(sortFn);
    }
    return Object
        .keys(brPixels)
        .map(function (k) { return brPixels[k]; })
        .sort(sortFn);
};
exports.toArray = toArray;
var getUpper = function (breakpoints, windowWidth) {
    var NO_UPPER = -1;
    if (typeof breakpoints !== 'object') {
        return NO_UPPER;
    }
    var getNearestUp = function (prev, br) {
        if (!prev) {
            return br;
        }
        var diff = br - windowWidth;
        return (diff > 0 && diff < prev - windowWidth ? br : prev);
    };
    return (0, exports.toArray)(breakpoints)
        .reverse()
        .reduce(getNearestUp);
};
exports.getUpper = getUpper;
var getLower = function (breakpoints, windowWidth) {
    var NO_LOWER = -1;
    if (typeof breakpoints !== 'object') {
        return NO_LOWER;
    }
    var getNearestLow = function (prev, br) {
        var diff = windowWidth - br;
        return (diff >= 0 && diff < windowWidth - prev ? br : prev);
    };
    return (0, exports.toArray)(breakpoints).reduce(getNearestLow);
};
exports.getLower = getLower;
var getRatio = function (breakpoints, windowWidth) { return (1 - ((0, exports.getUpper)(breakpoints, windowWidth) - (0, exports.getLower)(breakpoints, windowWidth)) /
    (0, exports.getUpper)(breakpoints, windowWidth)); };
exports.getRatio = getRatio;
var getIndexOfLower = function (breakpoints, windowWidth) {
    var brPixels = (0, exports.getBreakpointPixels)(breakpoints);
    if (brPixels.length === 1) {
        return 0;
    }
    else if (Array.isArray(brPixels)) {
        return brPixels.indexOf((0, exports.getLower)(breakpoints, windowWidth));
    }
    else {
        return Object.keys(brPixels).filter(function (br) { return brPixels[br] === (0, exports.getLower)(breakpoints, windowWidth); })[0];
    }
};
exports.getIndexOfLower = getIndexOfLower;
