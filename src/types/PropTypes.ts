import { IndexKey, BreakpointProps } from './functionTypes'

export type NestedFunction<Arg, ReturnType> = (arg: Arg, br?: IndexKey) => ReturnType
export type NestedBooleanFunction = NestedFunction<BreakpointProps, boolean>
export type NestedCSSFunction = NestedFunction<BreakpointProps, string>
export type CSSTemplateArgs = [TemplateStringsArray, ...NestedCSSFunction[]]
export type SecondOrderFunction = (BreakpointProps) => string
export type TemplateFn = (CSSTemplateArg) => SecondOrderFunction