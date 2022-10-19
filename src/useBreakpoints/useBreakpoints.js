import useWindowSize from '../useWindowSize'
import { useEffect, useState } from 'react'
import { getBreakpointPixels, getIndexOfLower, getLower, getRatio, getUpper, toArray } from './breakpoints'

export const useBreakpoints = (brValues) => {
  const windowSize = useWindowSize()

  const [breakpoints, setBreakpoints] = useState({
    br: getBreakpointPixels(brValues),
    breakpoints: brValues,
    upper: getUpper(brValues, windowSize),
    lower: getLower(brValues, windowSize),
    indexOfLower: getIndexOfLower(brValues, windowSize),
    ratio: () => getRatio(brValues, windowSize), // in consideration for future intellegent br functionality
    current: windowSize,
    toArray: () => toArray(brValues)
  })

  useEffect(() => {
    setBreakpoints({
      br: getBreakpointPixels(brValues),
      breakpoints: brValues,
      upper: getUpper(brValues, windowSize),
      lower: getLower(brValues, windowSize),
      indexOfLower: getIndexOfLower(brValues, windowSize),
      ratio: getRatio(brValues, windowSize), // in consideration for future intellegent br functionality
      current: windowSize,
      toArray: () => toArray(brValues)
    })
  }, [windowSize, brValues])
  return breakpoints
}

export default useBreakpoints
