"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.breakpoint = void 0;

var _internal = require("../internal");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var breakpoint = function breakpoint(br) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function (props) {
      var breakpoints = props.theme.breakpoints;

      function createMediaQuery(brValue, brKey) {
        var media = "@media(min-Width: ".concat(brValue, "){");
        args[0].forEach(function (str, i) {
          if (i < args.length - 1) {
            media = "".concat(media).concat(str).concat((0, _internal._getVal)(args[i + 1], props, brKey)); // get variable value or call function
          } else {
            media = media + str;
          }
        });
        media = media + '\n}';
        return media;
      }

      if (Array.isArray(br)) {
        // ["sm", "lg" ] keys defined in order between these names (may break if breakpoint key names are mix of strings and integers)
        // [1, 2] beginning and ending breakpoints by numerical order
        var medias = '';
        var isInRange = false;

        for (var _i = 0, _Object$entries = Object.entries(breakpoints); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              key = _Object$entries$_i[0],
              value = _Object$entries$_i[1];

          if (key === br[0] || key === br[0].toString()) isInRange = true;

          if (isInRange) {
            medias += createMediaQuery((0, _internal._getUnitValue)(value), key);
          }

          if (key === br[1] || key === br[1].toString()) break; // end of br range
        }

        return medias;
      }

      return createMediaQuery((0, _internal._getUnitValue)(breakpoints[br]), br);
    };
  };
};

exports.breakpoint = breakpoint;