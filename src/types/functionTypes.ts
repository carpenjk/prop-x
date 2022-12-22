export type IndexKey = string | number
// export type BreakpointProp = number | string
export type Breakpoint = number | string
export type BreakpointValue = number
export type BreakpointsParam = { [key: IndexKey]: Breakpoint } | Array<string | number>
export type Breakpoints = { [key: IndexKey]: BreakpointValue } | BreakpointValue[]
export interface BreakpointProps {
  theme: {
    breakpoints: BreakpointsParam
  }
}