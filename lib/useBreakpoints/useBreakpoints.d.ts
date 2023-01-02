import { WindowSize } from '../useWindowSize';
import { Breakpoints, BreakpointsParam, BreakpointValue, BreakpointIndex } from '../../types/propTypes';
interface BreakpointsObj {
    br: Breakpoints;
    breakpoints: BreakpointsParam;
    upper: BreakpointValue;
    lower: BreakpointValue;
    indexOfLower: BreakpointIndex;
    ratio: number;
    current: WindowSize;
    toArray: () => BreakpointValue[];
}
export declare const useBreakpoints: (brValues: BreakpointsParam) => BreakpointsObj;
export default useBreakpoints;
