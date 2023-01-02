"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useWindowSize() {
    var isClient = typeof window === 'object';
    function getSize() {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined
        };
    }
    var _a = (0, react_1.useState)(getSize), windowSize = _a[0], setWindowSize = _a[1];
    (0, react_1.useEffect)(function () {
        if (!isClient) {
            return undefined;
        }
        function handleResize() {
            setWindowSize(getSize());
        }
        window.addEventListener('resize', handleResize);
        return function () { return window.removeEventListener('resize', handleResize); };
    }, []);
    return windowSize;
}
exports.default = useWindowSize;
