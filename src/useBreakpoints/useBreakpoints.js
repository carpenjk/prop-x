import useWindowSize from '../useWindowSize'
import { useEffect, useState } from 'react'
import { getBreakpointPixels, getIndexOfLower, getLower, getRatio, getUpper, toArray } from './breakpoints'

export const useBreakpoints = (theme) => {
  const windowSize = useWindowSize()

  const [breakpoints, setBreakpoints] = useState({
    br: getBreakpointPixels(theme.breakpoints),
    breakpoints: theme.breakpoints,
    upper: getUpper(theme.breakpoints),
    lower: getLower(theme.breakpoints),
    indexOfLower: getIndexOfLower(theme.breakpoints),
    ratio: () => getRatio(theme.breakpoints, windowSize), // in consideration for future intellegent br functionality
    current: { width: windowSize.width, height: windowSize.height },
    toArray: toArray(theme.breakpoints)
  })

  useEffect(() => {
    setBreakpoints({
      br: getBreakpointPixels(theme.breakpoints),
      breakpoints: theme.breakpoints,
      upper: getUpper(theme.breakpoints),
      lower: getLower(theme.breakpoints),
      indexOfLower: getIndexOfLower(theme.breakpoints),
      ratio: getRatio(theme.breakpoints, windowSize), // in consideration for future intellegent br functionality
      current: windowSize,
      toArray: toArray(theme.breakpoints)
    })
  }, [windowSize, theme.breakpoints])
  return breakpoints
}

export default useBreakpoints
