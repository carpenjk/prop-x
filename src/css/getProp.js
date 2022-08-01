import { getIndexedPropValue } from '../core'
// returns responsive prop value within styled component tag function
export const getProp = (prop) => (props, br) => getIndexedPropValue(props[prop], br)
