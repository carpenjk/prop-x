import { _getUnitValue, _getVal } from '../internal'
import { Breakpoint, IndexKey, BreakpointProps } from '../types/functionTypes'
import { CSSTemplateArgs, SecondOrderFunction, TemplateFn } from '../types/PropTypes'



export const breakpoint = (br: Breakpoint): TemplateFn =>
  (...args: CSSTemplateArgs): SecondOrderFunction =>
    (props: BreakpointProps): string => {
      const { theme: { breakpoints } }: BreakpointProps = props
      function createMediaQuery(brValue: Breakpoint, brKey: IndexKey): string {
        let media = `@media(min-Width: ${brValue}){`
        args[0].forEach((str, i) => {
          if (i < args.length - 1) {
            media = `${media}${str}${_getVal(args[i + 1], props, brKey)}` // get variable value or call function
          } else {
            media = media + str
          }
        })
        media = media + '\n}'
        return media
      }
      if (Array.isArray(br)) {
        // ["sm", "lg" ] keys defined in order between these names (may break if breakpoint key names are mix of strings and integers)
        // [1, 2] beginning and ending breakpoints by numerical order
        let medias = ''
        let isInRange = false
        let currBRIndex = 0
        for (const [key, value] of Object.entries(breakpoints)) {
          if (key === br[0] || key === br[0].toString()) isInRange = true
          if (isInRange) {
            medias += createMediaQuery(_getUnitValue(value), currBRIndex)
          }
          currBRIndex += 1
          if (key === br[1] || key === br[1].toString()) break // end of br range
        }
        return medias
      }
      return createMediaQuery(_getUnitValue(breakpoints[br]), br)
    }
