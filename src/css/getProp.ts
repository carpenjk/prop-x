import { getIndexedPropValue } from '../core'
import { deriveIndex } from '../internal';
import type { NestedCSSFunction } from '../../types/functionTypes'
import type { BreakpointIndex, BreakpointProps } from '../../types/propTypes'
// returns responsive prop value within styled component tag function
export const getProp = (prop: string): NestedCSSFunction => (props: BreakpointProps, br?: BreakpointIndex): string => {
  const derivedBr = deriveIndex(br);
  const value = getIndexedPropValue(props[prop], derivedBr)
  return value !== undefined ? value : ''
}