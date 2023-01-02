import { BreakpointIndex, BreakpointProps } from "../types/propTypes"

export function deriveIndex(br: BreakpointIndex | undefined): number {
  return br === undefined ? 0 : Number(br)
}

export function _getVal(v: any, props: BreakpointProps, br: BreakpointIndex) {
  const derivedBr = deriveIndex(br);
  const values = typeof v === 'function' ? v(props, br) : v
  if (Array.isArray(values)) return values[derivedBr]
  return values
};

export function _getUnitValue(derivedValue: number | string): string {
  return typeof derivedValue === 'number' ? `${derivedValue}px` : derivedValue
}
