import { IndexKey, BreakpointProps } from "./types/functionTypes"

export function _getVal(v: any, props: BreakpointProps, br: IndexKey) {
  const values = typeof v === 'function' ? v(props, br) : v
  if (Array.isArray(values)) return values[br]
  return values
};

export function _getUnitValue(derivedValue: number | string): string {
  return typeof derivedValue === 'number' ? `${derivedValue}px` : derivedValue
}
