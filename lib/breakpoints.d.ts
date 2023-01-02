import type { BreakpointIndex, BreakpointsParam, Breakpoints, BreakpointValue } from "../types/propTypes";
export declare const getPxValue: (value: string | number) => BreakpointValue | null;
export declare const getBreakpointPixels: (breakpoints: BreakpointsParam) => Breakpoints;
export declare const toArray: (breakpoints: BreakpointsParam) => BreakpointValue[];
export declare const getUpper: (breakpoints: BreakpointsParam, windowWidth: number) => BreakpointValue;
export declare const getLower: (breakpoints: BreakpointsParam, windowWidth: number) => BreakpointValue;
export declare const getRatio: (breakpoints: BreakpointsParam, windowWidth: number) => number;
export declare const getIndexOfLower: (breakpoints: BreakpointsParam, windowWidth: number) => BreakpointIndex;
