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
exports.unwindProps = exports.windProps = exports.inverseProp = exports.getIndexedPropValue = exports.getPropIndex = exports.parseAndCalc = exports.parseSizeUnits = void 0;
var parseSizeUnits = function (valUnits) {
    function parseSizeUnit(valUnit) {
        if (typeof valUnit === 'number') {
            return { value: valUnit, whole: valUnit.toString(), unit: undefined };
        }
        var exp = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;
        var matches = valUnit.match(exp);
        if (!matches)
            return { whole: valUnit, value: undefined, unit: undefined };
        return { whole: matches[0], value: matches[1] ? Number(matches[1]) : undefined, unit: matches[2] };
    }
    if (!Array.isArray(valUnits)) {
        return parseSizeUnit(valUnits);
    }
    var resultAry = valUnits.map(function (val) { return parseSizeUnit(val); });
    return resultAry;
};
exports.parseSizeUnits = parseSizeUnits;
function parseAndCalc(vars, fn) {
    var _a;
    var parsed = (0, exports.parseSizeUnits)(vars);
    var parsedArray = Array.isArray(parsed) ? parsed : [parsed];
    var varValues = parsedArray.map(function (v) { return v && v.value ? v.value : undefined; });
    var valWithUnit = parsedArray.find(function (_a) {
        var unit = _a.unit;
        return unit;
    });
    var u = (_a = valWithUnit === null || valWithUnit === void 0 ? void 0 : valWithUnit.unit) !== null && _a !== void 0 ? _a : '';
    return "".concat(fn(varValues)).concat(u);
}
exports.parseAndCalc = parseAndCalc;
var getPropIndex = function (vals, i) {
    var isValue = vals !== undefined && vals !== null;
    var _i = i || 0;
    if (!isValue || !Array.isArray(vals))
        return undefined;
    return vals[_i] !== undefined ? _i : vals.length - 1;
};
exports.getPropIndex = getPropIndex;
var getIndexedPropValue = function (vals, i) {
    if (!Array.isArray(vals)) {
        return vals;
    }
    var index = (0, exports.getPropIndex)(vals, i);
    if (index != undefined) {
        return vals[index];
    }
};
exports.getIndexedPropValue = getIndexedPropValue;
var inverseProp = function (prop) {
    if (!Array.isArray(prop)) {
        return !prop;
    }
    else {
        return prop.map(function (item) { return !item; });
    }
};
exports.inverseProp = inverseProp;
var windProps = function (props, config) {
    var _a = config || {}, defaultValues = _a.defaultValues, options = _a.options;
    var _b = options || {}, _c = _b.useNoValue, useNoValue = _c === void 0 ? true : _c, _d = _b.noValue, noValue = _d === void 0 ? '' : _d;
    if (!Array.isArray(props)) {
        return props;
    }
    function createSuperSet(unwoundProps) {
        var superSetObj = {};
        unwoundProps.forEach(function (obj) {
            Object.keys(obj).forEach(function (p) {
                superSetObj[p] = [];
            });
        });
        return superSetObj;
    }
    var wound = createSuperSet(props);
    var resultLength = props.length;
    var _loop_1 = function (i) {
        Object.keys(wound).forEach(function (key) {
            var curValue = props[i][key];
            if (curValue !== undefined) {
                wound[key].push(curValue);
            }
            else {
                var value = defaultValues && defaultValues[key] !== undefined ? (0, exports.getIndexedPropValue)(defaultValues[key], i) : undefined;
                if (value !== undefined) {
                    wound[key].push(value);
                }
                else if (useNoValue) {
                    wound[key].push(noValue);
                }
            }
        });
    };
    for (var i = 0; i < resultLength; i += 1) {
        _loop_1(i);
    }
    return wound;
};
exports.windProps = windProps;
var unwindProps = function (props, config) {
    var _a = config || {}, defaultValues = _a.defaultValues, options = _a.options;
    var _b = options || {}, noValue = _b.noValue, _c = _b.useNoValue, useNoValue = _c === void 0 ? false : _c;
    function getCurrValue(k, i) {
        var _a, _b;
        var values = props[k];
        if (values === undefined) {
            return;
        }
        if (!Array.isArray(values)) {
            if (i !== 0) {
                return;
            }
            else {
                return _a = {}, _a[k] = values, _a;
            }
        }
        var pAryLength = values.length;
        if (i >= pAryLength) {
            return;
        }
        return _b = {}, _b[k] = values[i], _b;
    }
    var unwound = [];
    var keys = Object.keys(props);
    var resultLength = Math.max.apply(Math, keys.map(function (k) {
        var values = props[k];
        return Array.isArray(values) ? values.length : 1;
    }));
    var _loop_2 = function (i) {
        var propObj = keys.reduce(function (obj, k) {
            var _a, _b, _c;
            var currVal = getCurrValue(k, i);
            if (currVal !== undefined) {
                return __assign(__assign({}, obj), getCurrValue(k, i));
            }
            else {
                var defaultValue = defaultValues && defaultValues[k] !== undefined ? (0, exports.getIndexedPropValue)(defaultValues[k], i) : undefined;
                if (defaultValue) {
                    return __assign(__assign({}, obj), (_a = {}, _a[k] = defaultValue, _a));
                }
                else if (useNoValue) {
                    return __assign(__assign({}, obj), (_b = {}, _b[k] = noValue, _b));
                }
                else {
                    return __assign(__assign({}, obj), (_c = {}, _c[k] = (0, exports.getIndexedPropValue)(props[k], i), _c));
                }
            }
        }, {});
        unwound.push(propObj);
    };
    for (var i = 0; i < resultLength; i += 1) {
        _loop_2(i);
    }
    return unwound;
};
exports.unwindProps = unwindProps;
