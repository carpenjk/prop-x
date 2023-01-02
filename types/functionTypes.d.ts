import { BreakpointIndex, BreakpointProps } from './propTypes'

export type NestedFunction<ArgType, ReturnType> = (arg: ArgType, br?: BreakpointIndex) => ReturnType
export type NestedBooleanFunction = NestedFunction<BreakpointProps, boolean>
export type NestedCSSFunction = NestedFunction<BreakpointProps, string>
export type CSSTemplateArgs = [TemplateStringsArray, ...NestedCSSFunction[]]
export type SecondOrderFunction = (props: BreakpointProps) => string
export type TemplateFn = (...args: CSSTemplateArgs) => SecondOrderFunction