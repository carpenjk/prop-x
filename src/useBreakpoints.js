import useWindowSize from './useWindowSize'
import { useEffect, useState } from 'react'

export const useBreakpoints = (theme) => {
  const windowSize = useWindowSize()
  const regex = /[\d]+/
  const getPxValue = (value) => {
    //! add functionality around units in the future?
    // @param value: numerical or string value with and without px
    if (typeof value === 'string') {
      return value.match(regex)[0]
    }
    return value
  }

  const getUpper = () => {
    // returns next biggest breakpoint widthwise or -1 if no upper can be determined
    const NO_UPPER = -1
    if (typeof theme.breakpoints !== 'object') {
      return NO_UPPER
    }

    const getNearsestUp = (prev, br) => {
      const brPx = getPxValue(br)
      if (!prev) {
        return brPx
      }
      const diff = brPx - windowSize.width
      return (diff > 0 && diff < prev - windowSize.width ? brPx : prev)
    }

    let upper = ''
    if (Array.isArray(theme.breakpoints)) {
      upper = theme.breakpoints.reduce(getNearsestUp)
    } else { // must be an obj
      const brAry = Object.keys(theme.breakpoints).map((key) => theme.breakpoints[key])
      return brAry.reduce(getNearsestUp)
    }
    return upper || NO_UPPER
  }

  const getLower = () => {
    // returns next smaller breakpoint widthwise or -1 if no lower can be determined
    const NO_LOWER = -1
    const getNearestLow = (prev, br) => {
      const brPx = getPxValue(br)
      const diff = windowSize.width - brPx
      return (diff > 0 && diff < windowSize.width - prev ? brPx : prev)
    }
    if (typeof theme.breakpoints !== 'object') {
      return NO_LOWER
    }

    let lower = ''
    if (Array.isArray(theme.breakpoints)) {
      lower = theme.reduce(getNearestLow)
    } else { // must be an obj
      const brAry = Object.keys(theme.breakpoints).map((key) => theme.breakpoints[key])
      return brAry.reduce(getNearestLow)
    }
    return lower || NO_LOWER
  }

  const getRatio = () => (1 - (getUpper() - getLower()) / getUpper())

  const getBreakpointPixels = () => {
    if (typeof theme.breakpoints !== 'object') {
      return [getPxValue(theme.breakpoints)]
    } else if (Array.isArray(theme.breakpoints)) {
      return theme.breakpoints.map((br) => Number(getPxValue(br)))
    } else { // must be an object
      return Object.keys(theme.breakpoints).reduce((obj, br) => ({ ...obj, [br]: Number(getPxValue(theme.breakpoints[br])) }))
    }
  }

  const getIndexOfLower = () => {
    const breakpoints = getBreakpointPixels()
    if (breakpoints.length === 1) {
      return 0
    } else if (Array.isArray(breakpoints)) {
      return breakpoints.indexOf(getLower())
    } else { // must be obj
      return Object.keys(breakpoints).filter((br) => breakpoints[br] === getLower())
    }
  }

  const [breakpoints, setBreakpoints] = useState({
    br: getBreakpointPixels(),
    upper: getUpper(),
    lower: getLower(),
    indexOfLower: getIndexOfLower(),
    ratio: getRatio, // in consideration for future intellegent br functionality
    current: { width: windowSize.width, height: windowSize.height }
  })

  useEffect(() => {
    setBreakpoints({
      br: getBreakpointPixels(),
      breakpoints: theme.breakpoints,
      upper: getUpper(),
      lower: getLower(),
      indexOfLower: getIndexOfLower(),
      ratio: getRatio, // in consideration for future intellegent br functionality
      current: windowSize
    })
  }, [windowSize])
  return breakpoints
}

export default useBreakpoints
