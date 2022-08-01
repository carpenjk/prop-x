import { _getVal } from '../internal'

function _createClassStyle (className, styles, props, br) {
  const keys = Object.keys(styles)
  let stylesCSS = '\n'
  keys.forEach((style) => {
    stylesCSS =
      stylesCSS +
      `    ${style}: ${_getVal(styles[style], props, br)};
`
  })
  const css = `&.${className} {${stylesCSS}}`
  return css
}

export const createClassCSS = (className, styles) => (props) => {
  return _createClassStyle(className, styles, props)
}
