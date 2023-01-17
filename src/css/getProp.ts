import type { BreakpointIndex, BreakpointProps, NestedCSSFunction } from '@carpenjk/prop-x-types'
import { getIndexedPropValue } from '../core'
import { deriveIndex } from '../internal';
// returns responsive prop value within styled component tag function
export const getProp = (prop: string): NestedCSSFunction => (props: BreakpointProps, br?: BreakpointIndex): string => {
  const derivedBr = deriveIndex(br);
  const value = getIndexedPropValue(props[prop], derivedBr)
  return value !== undefined ? value : ''
}