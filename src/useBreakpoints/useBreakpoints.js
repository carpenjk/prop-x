import useWindowSize from '../useWindowSize'
import { useEffect, useState } from 'react'
import { getBreakpointPixels, getIndexOfLower, getLower, getRatio, getUpper, toArray } from './breakpoints'

export const useBreakpoints = (brValues) => {
  const windowSize = useWindowSize()

  const [breakpoints, setBreakpoints] = useState({
    br: getBreakpointPixels(brValues),
    breakpoints: brValues,
    upper: getUpper(brValues),
    lower: getLower(brValues),
    indexOfLower: getIndexOfLower(brValues),
    ratio: () => getRatio(brValues, windowSize), // in consideration for future intellegent br functionality
    current: { width: windowSize.width, height: windowSize.height },
    toArray: toArray(brValues)
  })

  useEffect(() => {
    setBreakpoints({
      br: getBreakpointPixels(brValues),
      breakpoints: brValues,
      upper: getUpper(brValues),
      lower: getLower(brValues),
      indexOfLower: getIndexOfLower(brValues),
      ratio: getRatio(brValues, windowSize), // in consideration for future intellegent br functionality
      current: windowSize,
      toArray: () => toArray(brValues)
    })
  }, [windowSize, brValues])
  return breakpoints
}

export default useBreakpoints
