export type PropSingleValue = any
export type PropArrayValues = PropSingleValue[]
export type PropValues = PropArrayValues | PropSingleValue
export interface PropsObject { [key: string]: PropValues }
export type PropObjectSubset = Record<keyof PropsObject, PropSingleValue>

//Breakpoints
export type BreakpointIndex = string | number
export type Breakpoint = number | string
export type BreakpointValue = number
export type BreakpointsParam = { [key: BreakpointIndex]: Breakpoint } | Array<string | number>
export type Breakpoints = { [key: BreakpointIndex]: BreakpointValue } | BreakpointValue[]

interface BreakpointTheme { breakpoints: BreakpointsParam }

export type BreakpointProps = BreakpointTheme & {
  [key: string]: string | string[]
}

// export interface BreakpointProps {
//   [key: string]: string | string[]
// }


//Wind/unwind
export interface WoundProps { [key: string]: PropArrayValues }
export type UnwoundProps = Array<PropsObject>
export interface WindingOptions {
  useNoValue?: boolean,
  noValue?: string | number | boolean | null | undefined
}
export interface WindingConfig {
  defaultValues?: any,
  options?: WindingOptions
}