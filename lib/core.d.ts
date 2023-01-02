import type { PropsObject, WindingConfig, WoundProps, UnwoundProps } from '../types/propTypes';
type SizeValue = number | void;
type SizeWhole = string;
type SizeUnit = string | void;
interface SizeUnitsObj {
    whole: SizeWhole;
    value: SizeValue;
    unit: SizeUnit;
}
type ValUnits = string | string[] | number | number[];
export declare const parseSizeUnits: (valUnits: ValUnits) => SizeUnitsObj | SizeUnitsObj[];
export declare function parseAndCalc(vars: ValUnits, fn: (vals: SizeValue | SizeValue[]) => any): string;
export declare const getPropIndex: (vals: any, i: number | void) => void | number;
export declare const getIndexedPropValue: <Val>(vals: Val | Val[], i: number) => void | Val;
export declare const inverseProp: (prop: boolean | boolean[]) => boolean | boolean[];
export declare const windProps: (props: UnwoundProps, config: WindingConfig) => WoundProps;
export declare const unwindProps: (props: PropsObject, config: WindingConfig) => UnwoundProps;
export {};
