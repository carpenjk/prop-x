export const getPxValue = (value) => {
  const regex = /[\d]+/
  //! add functionality around units in the future?
  // @param value: numerical or string value with and without px
  if (typeof value === 'string') {
    return value.match(regex)[0]
  }
  return value
}
export const getBreakpointPixels = (breakpoints) => {
  if (typeof breakpoints !== 'object') {
    return [Number(getPxValue(breakpoints))]
  } else if (Array.isArray(breakpoints)) {
    return breakpoints.map((br) => Number(getPxValue(br)))
  } else { // must be an object
    return Object.keys(breakpoints).reduce((obj, br) => ({ ...obj, [br]: Number(getPxValue(breakpoints[br])) }), {})
  }
}

export const toArray = (breakpoints) => {
  const brPixels = getBreakpointPixels(breakpoints)
  if (Array.isArray(brPixels)) {
    return brPixels.sort((a, b) => a > b)
  }
  return Object
    .keys(brPixels)
    .map((k) => brPixels[k])
    .sort((a, b) => a > b)
}

export const getUpper = (breakpoints, windowSize) => {
  // returns next biggest breakpoint widthwise or -1 if no upper can be determined
  const NO_UPPER = -1
  if (typeof breakpoints !== 'object') {
    return NO_UPPER
  }

  const getNearestUp = (prev, br) => {
    if (!prev) {
      return br
    }
    const diff = br - windowSize.width
    return (diff > 0 && diff < prev - windowSize.width ? br : prev)
  }
  return toArray(breakpoints)
    .reverse()
    .reduce(getNearestUp)
}

export const getLower = (breakpoints, windowSize) => {
  // returns next smaller breakpoint widthwise or -1 if no lower can be determined
  const NO_LOWER = -1
  if (typeof breakpoints !== 'object') {
    return NO_LOWER
  }

  const getNearestLow = (prev, br) => {
    const diff = windowSize.width - br
    return (diff > 0 && diff < windowSize.width - prev ? br : prev)
  }
  return toArray(breakpoints).reduce(getNearestLow)
}

export const getRatio = (breakpoints, windowSize) => (
  1 - (getUpper(breakpoints, windowSize) - getLower(breakpoints, windowSize)) /
    getUpper(breakpoints, windowSize)
)

// returns the array index or object key of nearest lower breakpoint
export const getIndexOfLower = (breakpoints) => {
  const brPixels = getBreakpointPixels(breakpoints)
  if (brPixels.length === 1) {
    return 0
  } else if (Array.isArray(brPixels)) {
    return brPixels.indexOf(getLower(breakpoints))
  } else { // must be obj
    return Object.keys(brPixels).filter((br) => brPixels[br] === getLower())
  }
}
