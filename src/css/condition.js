import { _getVal } from '../internal'
import { getProp } from './getProp'

// @param cnd(option1): callback function returns boolean and accepts params props, br (optional)
// @param cnd(option2): string value of property name
export const condition = (cnd) => (...args) => (props, br) => {
  let cndBln = ''

  if (typeof cnd === 'function') {
    // call function
    cndBln = cnd(props, br)
  } else if (typeof cnd === 'string') {
    cndBln = !!getProp(cnd)(props, br)
  } else {
    cndBln = cnd
  }
  if (!cndBln) return ''

  let cndStyles = ''

  args[0].forEach((str, i) => {
    if (i < args.length - 1) {
      cndStyles = `${cndStyles}${str}${_getVal(args[i + 1], props, br)}` // get variable value or call function
    } else {
      cndStyles = cndStyles + str
    }
  })
  return cndStyles
}
