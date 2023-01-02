import type { PropsObject, PropObjectSubset, WindingOptions, WindingConfig, WoundProps, UnwoundProps } from '../types/propTypes'

type SizeValue = number | void
type SizeWhole = string
type SizeUnit = string | void
interface SizeUnitsObj {
  whole: SizeWhole, //  whole: <original string> ,
  value: SizeValue, //  value: <numerical value> ,
  unit: SizeUnit //  unit: <css size unit>,
}
type ValUnits = string | string[] | number | number[]

export const parseSizeUnits = (valUnits: ValUnits): SizeUnitsObj | SizeUnitsObj[] => {
  function parseSizeUnit(valUnit: string | number): SizeUnitsObj {
    if (typeof valUnit === 'number') {
      return { value: valUnit as number, whole: valUnit.toString(), unit: undefined }
    }
    const exp: RegExp = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/
    let matches: RegExpMatchArray | null = valUnit.match(exp)
    if (!matches) return { whole: valUnit as string, value: undefined, unit: undefined }
    return { whole: matches[0], value: matches[1] ? Number(matches[1]) : undefined, unit: matches[2] }
  }
  if (!Array.isArray(valUnits)) {
    return parseSizeUnit(valUnits)
  }
  const resultAry: SizeUnitsObj[] = valUnits.map((val) => parseSizeUnit(val))
  return resultAry
}

// parses variables and passes to provided callback function
// @param vars: "1px" || ["1px", "auto", ]
// ex...  parseAndCalc([height, img.rowSpan], ([_height, rSpan]) =>
//        _height && rSpan ? _height * rSpan : undefined
// ),

export function parseAndCalc(vars: ValUnits, fn: (vals: SizeValue | SizeValue[]) => any): string {
  const parsed: SizeUnitsObj | SizeUnitsObj[] = parseSizeUnits(vars);
  const parsedArray: SizeUnitsObj[] = Array.isArray(parsed) ? parsed : [parsed]
  const varValues: SizeValue[] = parsedArray.map((v) => v && v.value ? v.value : undefined)
  const valWithUnit: SizeUnitsObj | void = parsedArray.find(({ unit }) => unit)
  const u = valWithUnit?.unit ?? ''
  return `${fn(varValues)}${u}`
}

// returns the applicable index to use as a reference for the provided property and index
// returns the lesser of provided index and last index in the prop array
// returns undefined if prop is undefined or not an array
export const getPropIndex = (vals: any, i: number | void): void | number => {
  const isValue = vals !== undefined && vals !== null;
  const _i = i || 0
  if (!isValue || !Array.isArray(vals)) return undefined
  return vals[_i] !== undefined ? _i : vals.length - 1
}

// returns property value based on provided property and index
export const getIndexedPropValue = <Val>(vals: Val | Val[], i: number): Val | void => {
  if (!Array.isArray(vals)) {
    return vals
  }
  const index: number | void = getPropIndex(vals, i)
  if (index != undefined) {
    return vals[index]
  }
}

// toggle boolean values in prop or prop array
export const inverseProp = (prop: boolean | boolean[]): boolean | boolean[] => {
  if (!Array.isArray(prop)) {
    return !prop
  } else {
    return prop.map((item) => !item)
  }
}

// windProps:
// transforms array of props into an object of prop arrays
// ex.
// from:
// [
//   {
//    top: '100px',
//    left: '50%',
//    transform: 'translateX(-50%)',
//  },
//  {
//    top: '50%',
//    transform: 'translateY(-50%)'
//  }
// ]
// to:
// {
//   top: ['100px', '50%'],
//   left: ['50%',''],
//   transform:  ['translateX(-50%)', 'translateY(-50%)']
// }
//
// if defaults provided, then empty slots in the array will be infused with default value.
// this is helplful because getProps gets the nearest smaller breakpoint value. Using a default
// reinfuses the default value instead.
// @params defaults ex. 1 {left: ['8px', '0']}  || ex. 2 {left: '8px'}

export const windProps = (props: UnwoundProps, config: WindingConfig): WoundProps => {
  const { defaultValues, options }: WindingConfig = config || {}
  const { useNoValue = true, noValue = '' }: WindingOptions = options || {}
  if (!Array.isArray(props)) {
    return props
  }


  function createSuperSet(unwoundProps: UnwoundProps): WoundProps {
    const superSetObj: WoundProps = {}
    // iterate through each key pair property object
    unwoundProps.forEach((obj) => {
      // iterate through key pairs of current prop object
      Object.keys(obj).forEach((p) => {
        // add key to superSetObject
        superSetObj[p] = []
      })
    })
    return superSetObj
  }

  const wound: WoundProps = createSuperSet(props)
  const resultLength: number = props.length
  for (let i = 0; i < resultLength; i += 1) {
    Object.keys(wound).forEach((key) => {
      // if key exists in current propArry obj, push value, else push default
      const curValue = props[i][key]
      if (curValue !== undefined) {
        wound[key].push(curValue)
      } else {
        const value = defaultValues && defaultValues[key] !== undefined ? getIndexedPropValue(defaultValues[key], i) : undefined
        if (value !== undefined) {
          wound[key].push(value)
        } else if (useNoValue) {
          wound[key].push(noValue)
        }
      }
    })
  }
  return wound
}

// unwindProps:
// transforms an object of prop arrays into an array of props
// this is useful in combination with Array.prototype.map to apply logic to each set of
// values corresponding to a breakpoint or other index
// the last value in each prop array will be carried forward to mirror getProps by default
// @param defaultValues: [{ prop: a || [a, b, c...] }, ...]
// default values will be used to fill in gaps for any provided values overwriting carryforward value
// Options:
// @option useNoValue: true || false (default)
// useNoValue overwrites carryforward in the event of no default value
// @option noValue: any value || undefined (default)
export const unwindProps = (props: PropsObject, config: WindingConfig): UnwoundProps => {
  const { defaultValues, options }: WindingConfig = config || {}
  const { noValue, useNoValue = false }: WindingOptions = options || {}

  function getCurrValue(k: string, i: number): PropObjectSubset | void {
    const values: PropsObject = props[k]
    if (values === undefined) {
      return;
    }

    // return static values on first index
    if (!Array.isArray(values)) {
      if (i !== 0) {
        return
      } else {
        return { [k]: values }
      }
    }
    const pAryLength = values.length
    if (i >= pAryLength) {
      // no value at this index
      return
    }
    // return curr value
    return { [k]: values[i] }
  }

  const unwound: UnwoundProps = []
  const keys = Object.keys(props)
  const resultLength = Math.max(...keys.map((k) => {
    const values = props[k]
    return Array.isArray(values) ? values.length : 1
  }))

  for (let i = 0; i < resultLength; i += 1) {
    const propObj: PropsObject = keys.reduce((obj, k) => {
      // use current value if exist in prop set
      const currVal = getCurrValue(k, i)
      if (currVal !== undefined) {
        return { ...obj, ...getCurrValue(k, i) }
      } else {
        const defaultValue = defaultValues && defaultValues[k] !== undefined ? getIndexedPropValue(defaultValues[k], i) : undefined
        if (defaultValue) {
          return { ...obj, [k]: defaultValue }
        } else if (useNoValue) {
          return { ...obj, [k]: noValue }
        } else {
          // get carry forward value
          return { ...obj, [k]: getIndexedPropValue(props[k], i) }
        }
      }
    }, {})
    unwound.push(propObj)
  }
  return unwound
}