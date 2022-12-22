import { getIndexedPropValue } from '../core'
import { NestedCSSFunction } from '../types/PropTypes'
// returns responsive prop value within styled component tag function
export const getProp = (prop: string): NestedCSSFunction => (props, br) => getIndexedPropValue(props[prop], br || 0)