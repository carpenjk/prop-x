# prop-x
A library for for passing for creating, manipulating, and using responsive props in react.

## Introduction

prop-x is a library to facilitate passing multiple values for each react property. The library contains utilities for obtaining the correct value based on a provided index such as a breakpoint. The library contains can be separated into three main categories:

- **Core** Functions for manipulating and retrieving key pair value ojects for usage as 2d props  (i.e  {prop1: [val1, val2, val3], prop2...})
- **CSS**  Functions for usage with styled-components that facilitate responsive styles within the styled components css.  This is especially helpful for static site generation and server side rendering as now responsive properties can generate responsive css with no reliance on javascript's window object which is unavailable on the server.
- **Hooks** 2 hooks are available that can be useful with client side only code. These hooks are useBreakpoints and useWindowSize.

## api

| function            	| path                            	| description                                                              	|
|---------------------	|---------------------------------	|--------------------------------------------------------------------------	|
| [parseSizeUnits](#parseSizeUnits)      	| @carpenjk/prop-x                	| Utility for calculations on size props                                   	|
| [parseAndCalc](#parseAndCalc)        	| @carpenjk/prop-x                	| Utility for calculations on size props                                   	|
| [getPropIndex](#getPropIndex)        	| @carpenjk/prop-x                	| Gets usable index for a given prop                                       	|
| [getIndexedPropValue](#getPropIndex) 	| @carpenjk/prop-x                	| Gets prop value for a given index                                        	|
| [inverseProp](#inverseProp)         	| @carpenjk/prop-x                	| returns array of inversed boolean values                                 	|
| [unwindProps](#unwindProps)         	| @carpenjk/prop-x                	| transforms prop arrays into an array of object key pair values           	|
| [windProps](#windProps)           	| @carpenjk/prop-x                	| transforms array of object key pair values into an object of prop arrays 	|
| [getProp](#getProp)             	| @carpenjk/prop-x/css            	| retrieves a prop value for appropriate breakpoint in css in js solutions 	|
| [breakpoint](#breakpoint)          	| @carpenjk/prop-x/css            	| creates media query and tells getProp which breakpoint to use            	|
| [condition](#condition)           	| @carpenjk/prop-x/css            	| conditional css for css in js solutions                                  	|
| [useBreakpoints](#useBreakpoints)      	| @carpenjk/prop-x/useBreakpoints 	| hook provides breakpoint and window size state                           	|
| [useWindowSize](#useWindowSize)       	| @carpenjk/prop-x/useWindowSize  	| hook provides window size state                                          	|


## License

[Apache License 2.0](./LICENSE)

## Get Started


### Install

```js
    npm i @carpenjk/prop-x
```

### Usage

#### Pass 2d Properties
```js
          <GridContainer
            rowHeight={['auto', '250px']}
            gridWidth={['100%', '80vw']}
            maxGridWidth={['none','1300px']}
          />
```
#### Use Properties within a styled-component
The most common use case is for creating responsive css by way of the getProp and breakpoint functions within a styled component tag function. 

##### Theme
A theme object containing a set of breakpoints must be made available via the styled-components ThemeProvider

```js
  import { ThemeProvider } from 'styled-components';
  const theme = {
    breakpoints: {
      0: 0,
      1: 880,
      2: 1050,
      3: 1200,
      4: 1400,
    }
  }

<ThemeProvider theme={theme}>
  <GridContainer
    rowHeight={['auto', '250px']}
    gridWidth={['100%', '80vw']}
    maxGridWidth={['none','1300px']}
  />
</ThemeProvider>

```

##### use properties
Properties indexed by breakpoint can be consumed in a styled component definition with the breakpoint and getProp functions provided in prop-x/css. In this example css is being generated with different height, width, and max-width values for different breakpoints.

```js
import styled from 'styled-components';
import { breakpoint, getProp } from 'prop-x/css';

const StyledGrid = styled.div`
  position: relative;
  height: ${getProp('gridHeight')};
  width: ${getProp('gridWidth')};
  max-width: ${getProp('maxGridWidth')};

  ${breakpoint(1)`
    height: ${getProp('gridHeight')};
    width: ${getProp('gridWidth')};
    max-width: ${getProp('maxGridWidth')};

`;

const GridContainer = ({ width, height, maxGridWidth }) => {
  return (
    <StyledGrid width={width} height={height} maxGridWidth={maxGridWidth}}>
      {children}
    </StyledGrid>
  );
};
```

### Full Example with Property manipulation
```js
import styled from 'styled-components';
import { breakpoint, getProp } from 'prop-x/css';
import { unwindProps, parseSizeUnits, windProps } from 'prop-x';

const StyledGrid = styled.div`
  position: relative;
  display: grid;
  grid-auto-flow: row dense;
  grid-template-rows: ${getProp('rowHeight')};
  grid-auto-rows: ${getProp('rowHeight')};
  grid-template-columns: ${getProp('gridTemplateColumns')};
  justify-items: stretch;
  align-items: stretch;
  height: ${getProp('gridHeight')};
  width: ${getProp('gridWidth')};
  max-width: ${getProp('maxGridWidth')};
  overflow: hidden;

  > *:last-child {
    grid-row: unset;
    grid-column: unset;
    max-height: unset;
  }

  & button {
    width: 100%;
    height: 100%;
  }
  & button > img {
    flex: none;
    object-fit: ${getProp('imageFit')};
    height: 100%;
    width: 100%;
    cursor: pointer;
  }
  ${breakpoint(1)`
    display: grid;
    grid-auto-flow: row dense;
    grid-template-rows: ${getProp('rowHeight')};
    grid-auto-rows: ${getProp('rowHeight')};
    grid-template-columns: ${getProp('gridTemplateColumns')};
    justify-items: stretch;
    align-items: stretch;
    height: ${getProp('gridHeight')};
    width: ${getProp('gridWidth')};
    max-width: ${getProp('maxGridWidth')};
    & button > img {
      object-fit: ${getProp('imageFit')};
    }
    > *:last-child {
      grid-row: unset;
      grid-column: unset;
      max-height: unset;
    }
`}
`;

StyledGrid.defaultProps = {
  gridWidth: '100%',
};

function calcProps(props) {
  const {
    columns,
    columnWidth,
    gridHeight,
    gridWidth,
    images,
    maxGridWidth,
    rows,
    rowHeight,
    minColWidth,
    maxColWidth,
    rowWidth,
  } = props;

  function getRowHeight() {
    if (gridHeight) {
      const _gridHeight = parseSizeUnits(gridHeight);
      return `${_gridHeight.value / rows}${_gridHeight.unit}`;
    }
    return rowHeight || '1fr';
  }
  function getColumnWidth() {
    const width = columnWidth || '1fr';
    if (minColWidth && maxColWidth) {
      return `minmax(${minColWidth}, ${maxColWidth})`;
    }
    if (minColWidth) {
      // do something
      return `minmax(${minColWidth}, ${width})`;
    }
    if (maxColWidth) {
      return `minmax(${width}, ?${maxColWidth})`;
    }
    return width;
  }
  const imgCount = images && images.length ? images.length : 0;
  const _rowHeight = getRowHeight();
  const gridTemplateColumns = `repeat(${columns}, ${getColumnWidth()})`;
  return {
    ...props,
    columns,
    columnWidth,
    gridHeight,
    gridWidth,
    gridTemplateColumns,
    images,
    imgCount,
    maxGridWidth,
    rowHeight: _rowHeight,
    rows,
    minColWidth,
    rowWidth,
  };
}

const GridContainer = ({ images, children, ...props }) => {
  const calculatedProps = unwindProps({ ...props, images }).map((propsAry) =>
    calcProps(propsAry)
  );
  return (
    <StyledGrid {...windProps(calculatedProps)}>
      {children}
    </StyledGrid>
  );
};
```

## core
### getPropIndex
```js
  const value = getIndexedPropValue(<propValues>, <index>);
```

This function returns the applicable index to use for the provided property and index
The rules for determining which index is applicable are:
  - The lesser of provided index and last index in the prop array
  - Undefined if prop is undefined or not an array

```js
  const index1 = getPropIndex(["a","b","c","d"], 2 ) // 2
  const index2 = getPropIndex(["a","b","c","d"]) 5) // 3
  const index3 = getPropIndex("a", 2) // undefined
```


### getIndexedPropValue
```js
  const i = getIndexedPropValue(<propValues>, <index>);
```

This function returns applicable prop value for the provided property values and index
The rules for determining which value is applicable are:
  - The value at the lesser of the provided index and the last index in the prop Array
  - The prop value if it is not an array

```js
  const index1 = getIndexedPropValue(["a","b","c","d"], 2 ) // "c"
  const index2 = getIndexedPropValue(["a","b","c","d"]) 5) // "d"
  const index3 = getIndexedPropValue("a", 2) // "a"
```

**Array** property values must be provided in 2d form (i.e. [[val1, val2,...]]) even if only one array is needed.

### unwindProps
```js
  const unwoundProps = unwindProps (<props>, <configObj>);
```
This function transforms and object containing prop arrays into array of single key value pairs. This is useful in combination with Array.prototype.map to apply logic to each set of values corresponding to an index such as a breakpoint. The transformation follows the following rules:

  - By default, the last value for a given property is used to fill the array such that every property has a value at every index unless specifically left undefined (i.e. [1,,,4])
  - defaultValues (optional) provided in the config object are used to fill missing values in the array. getIndexedPropValue is used to find the applicable default value for each missing property value. 
  - useNoValue option provided in the config object overwrites default functionality and fills the array with undefined instead of carrying forward the last key value. Where a default value has been specified, the default value will still be used.
  - noValue option provided in the config object overwrites the useNoValue value. This can be used to provide an empty string or any other value for instead of undefined.


  ```js
  const unwoundProps = unwindProps({prop1: ["val1", "val2", "val3"], prop2: ["val1", "val2", "val3"]});
  // unwoundProps = 
  // [
  //   {prop1: "val1", prop2: "val"},
  //   {prop1: "val2", prop2: "val2"},
  //   {prop1: "val3", prop2: "val3"}
  // ]
  
  //missing prop values are filled in to such that all props have values at each index
  const unwoundProps = unwindProps({prop1: ["val1", "val2", "val3"], prop2: ["val1", "val2"]});
  // unwoundProps = 
  // [
  //   {prop1: "val1", prop2: "val1"},
  //   {prop1: "val2", prop2: "val2"},
  //   {prop1: "val3", prop2: "val2"}
  // ]

  // single value prop
  const unwoundProps = unwindProps({prop1: ["val1", "val2", "val3"], prop2: val1})
  // unwoundProps =
  // [
  //   {prop1: "val1", prop2: "val1"},
  //   {prop1: "val2", prop2: "val1"},
  //   {prop1: "val3", prop2: "val1"}
  // ]

  //default values used to fill missing prop2 value at index 2
  const unwoundProps = unwindProps(
    {prop1: ["val1", "val2", "val3"], prop2: ["val1", "val2"]},
    {defaultValues: {prop1: ["defVal1", "defVal2", "defVal3"], prop2: ["defVal1", "defVal2", "defVal3"}});
  // unwoundProps = 
  // [
  //   {prop1: "val1", prop2: "val1"},
  //   {prop1: "val2", prop2: "val2"},
  //   {prop1: "val3", prop2: "defVal3"}
  // ]

  //useNoValue option
  const unwoundProps = unwindProps(
    {prop1: ["val1", "val2", "val3"], prop2: ["val1", "val2"]},
    {
      options: {useNoValue: true}
    }
  )
  // unwoundProps = 
  // [
  //   {prop1: "val1", prop2: "val1"},
  //   {prop1: "val2", prop2: "val2"},
  //   {prop1: "val3", prop2: undefined}
  // ]

  //useNoValue option with default values
  const unwoundProps = unwindProps(
    {prop1: ["val1", "val2", "val3"], prop2: ["val1", "val2"], prop3: "val1"},
    {
      defaultValues: { prop2: ["defVal1", "defVal2", "defVal3"},
      options: {
        useNoValue: true
      }
    }
  );
  // unwoundProps = 
  // [
  //   {prop1: "val1", prop2: "val1", prop3: "val1"},
  //   {prop1: "val2", prop2: "val2", prop3: undefined},
  //   {prop1: "val3", prop2: "defVal3", prop3: undefined}
  // ]

  //useNoValue and noValue
  const unwoundProps = unwindProps(
    {prop1: ["val1", "val2", "val3"], prop2: ["val1", "val2"]},
    {
      options: {
        useNoValue: true,
        noValue: ""
      }
    }
  );
  // unwoundProps = 
  // [
  //   {prop1: "val1", prop2: "val1"},
  //   {prop1: undefined, prop2: "val2"},
  //   {prop1: undefined, prop2: ""}
  // ]

```
### windProps
  ```js
    const windProps = unwindProps (<props>, <configObj>);
  ```
This function transforms an array of single value key pair objects into a single object with array values. It is the opposite of unwindProps and is helpful for transforming property arrays that have gone through unwindProps transformation or for when properties are provided in an unwound format. The transformation follows the following rules:
  - Missing values are transformed into the default noValue of ""
  - defaultValues (optional) provided in the config object are used to fill missing values in the array. getIndexedPropValue is used to find the applicable default value for each missing property value.
  - noValue option provided in the config object used to overwrite default noValue
 ```js
    const windProps = windProps([
        {
          top: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
        },
        {
          top: '50%',
          transform: 'translateY(-50%)'
        }
      ]);

    // woundProps = {
    //   top: ['100px', '50%'],
    //   left: ['50%',''],
    //   transform:  ['translateX(-50%)', 'translateY(-50%)']
    // }

    //use no value set to false can be helpful when it's ok to carryforward the property value for all indexes
    const windProps = windProps([
      {
        width: '100%',
        height: '50vh',
      },
      {
        height: '80vh',
      }
    ],{options: {useNoValue: false}});

    // woundProps = {
    //   width: ['100%'],
    //   height: ['50vh', '80vh'],
    // }

    //default values used to fill any missing values
    const windProps = windProps([
      {
        width: '100px',
        height: '50%',
      },
      {
        height: '50%',
      },
      {
        height:'75%',
      },
      {
        height: '80%',
      }
    ],{defaultValues: {width: ['85px', '95px', '100%']}});

    // woundProps = {
    //   width: ['100px', '95%', '100%', '100%'],
    //   height: ['50%','50%', '75%', '80%'],
    // }

    //noValue  used to change value used in instance of no value
    const windProps = windProps([
      {
        top: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
      },
      {
        top: '50%',
        transform: 'translateY(-50%)'
      }
    ],{options: {noValue: undefined}});

    // woundProps = {
    //   top: ['100px', '50%'],
    //   left: ['50%',undefined],
    //   transform:  ['translateX(-50%)', 'translateY(-50%)']
    // }
  ```

### inverseProp
```js
  const inversed = inverseProp([true, false, true]);
  //inversed = [false, true, false]
```
This function toggles boolean values in an array.

### parseSizeUnits
```js
  const parsed = parseSizeUnits(vars);
```

This function parses 1 or many string size/unit value (i.e. '100px') into objects with whole, value, unit keys.

```js
  const parsed = parseSizeUnits('100px');
  // parsed = {whole: '100px', value: 100, unit: 'px'}

  const parsed = parseSizeUnits('auto');
  // parsed = {whole: 'auto', value: undefined, unit: undefined}

  const parsed = parseSizeUnits('100');
  // parsed = {whole: '100', value: 100, unit: undefined}

  const parsed = parseSizeUnits(["100px", "auto", "1", "200%"]);
  // parsed = [
  //   {whole: '100', value: 100, unit: "px"},
  //   {whole: 'auto', value: undefined, unit: undefined},
  //   {whole: '1', value: 1, unit: undefined},
  //   {whole: '200%', value: 200, unit: "%"},
  // ]
```

### parseAndCalc
```js
  const calced = parseAndCalc(vars, ([var1, var2, var3])=> var1+ var2 + var3);
```

This function performs parses string/unit variables and passes the values into a provided callback function before returning the results as a value/unit string. It is useful for performing calculations on css size/unit values. The unit applied to the result is derived from the first variable containing a unit. This means some care must be used on the units and order of variables. These are some of the considerations when using this function:
  - Variables usually must contain the same unit with % units being an exception
  - Percentage units should always follow the variable with the required result unit

```js
  const calced = parseAndCalc(['100px', '100px', '200px' ], ([var1, var2, var3])=> var1+ var2 + var3);
  // calced = "400px"

  const calced = parseAndCalc(['100px', '5', '200px' ], ([var1, var2, var3])=> var1 * ar2 - var3);
  // calced = "300px"

  // percentages can be used with other units if always known
  const calced = parseAndCalc(['100px', '50%', '200px' ], ([var1, var2, var3])=> var1 * (ar2/100) + var3);
  // calced = "250px"

  // percentages can be used with other units if always known
  const calced = parseAndCalc(['100px', '50%', '200px' ], ([var1, var2, var3])=> var1 * (ar2/100) + var3);
  // calced = "250px"

  // 
  const calced = parseAndCalc(['100px', 'auto', '200px' ], ([var1, var2, var3])=> var2 === 'auto' ? var1 + var2 + 100  : var1  );
  // calced = "400px"

```

## css

### breakpoint

```js
${breakpoint(breakpointValue)`
    width: ${getProp('width)};
    ...
  `}
```

The breakpoint function allows for setting multiple breakpoints within the
component style. The breakpoint function calls a tag
function in which the styles are inserted. A breakpoint value or array containing starting and ending breakpoint keys must be passed
to the function as a index of the breakpoints defined in the theme property.
The breakpoint value is used by all of other style functions to find the correct
style value from the theme definition.

```js
const theme = {
    breakpoints: {
      0: 0,
      1: 880,
      2: 1050,
      3: 1200,
      4: 1400,
    }
  }

const StyledContainer = styled.div`
  width: 100px;
  ...
  ${breakpoint(1)`
    width: ${getProp('width')};
    ...
  `}
`
const Container = (){
  return (<StyledContainer width={['100px', '200px']} theme={theme}/>)
}

// produces the following css within the styled-component definition
//
// width: 100px;
// ...
// @media (min-width: 880px) {
//    width: 200px;
//    ...
// }

```

#### Setting Multiple Breakpoints Simultaneously
Multiple breakpoints can be set simultaneously if they share the same dynamic css properties. This reduces the amount of getProp and breakpoint code.

The following code set's 

```js
const theme = {
    breakpoints: {
      0: 0,
      1: 880,
      2: 1050,
      3: 1200,
      4: 1400,
    }
  }

const StyledContainer = styled.div`
  width: 100px;
  ...
  ${breakpoint([1,4])`
    width: ${getProp('width')};
    height: ${getProp('height')}
    ...
  `}
`

//width: 

const Container = (){
  return (<StyledContainer width={['100px', '200px', '300px', '400px', '500px'], height={['10px', '20px', '30px', '40px', '50px']}} theme={theme}/>)
}


// produces the following css within the styled-component definition
//
// width: 100px;
// ...
// @media (min-width: 880px) {
//    width: 200px;
//    height: 20px;
//    ...
// }
// @media (min-width: 1050px) {
//    width: 300px;
//    height: 30px;
//    ...
// }
// @media (min-width: 1200px) {
//    width: 400px;
//    height: 40px;
//    ...
// }
// @media (min-width: 1400px) {
//    width: 500px;
//    height: 50px;
//    ...
// }

```

### condition
```js
${condition('hide')`
    display: none;
    ...
  `}
```
The condition function allows for conditional css in a styled-components definition based on a truthy/falsy property value.


```js

const StyledContainer = styled.div`
  display: flex;
  ...
  ${condition('hide')`
    display: none;
    ...
  `}
`
const Container = (){
  return (<StyledContainer hide={true} />)
}

// produces the following css within the styled-component definition
//
// display: flex;
// ...
// display: none;

```

condition can also be used in combination with the breakpoint function.

```js
const theme = {
    breakpoints: {
      0: 0,
      1: 880,
      2: 1050,
      3: 1200,
      4: 1400,
    }
  }

const StyledContainer = styled.div`
  display: flex;
  ${condition('hide')`
    display: 'none';
    ...
  `}
  ...
  ${breakpoint(1)`
    ${condition('hide')`
      display: none;
      ...
    `}
  `}
  
`

const Container = (){
  return (<StyledContainer hide={[false, true]} theme={theme}/>)
}

// produces the following css within the styled-component definition
//
// display: flex;
// ...
// @media (min-width: 880px) {
//    display: none;
//    ...
// }

```

## hooks
### useBreakpoints
```js
  const br = useBreakpoints(theme);
```

The useBreakpoints hooks provides access to the breakpoints and related functions and calculated values. It is useful for client side only code that needs to evaluate properties indexed by breakpoints.

```js
const theme = {
    breakpoints: {
      0: 0,
      1: 880,
      2: 1050,
      3: 1200,
      4: 1400,
    }
  }

const br = useBreakpoints(theme);

// assume current window.innerWidth = 1000
//br = 
// {
//   br: [0, 880 , 1050, 1200, 1400],
//   upper: 1050,
//   lower: 880,
//   indexofLower: 1,
//   ratio: 0.838, //(1- (upper - lower) / upper)
//   current: 1000,  // current window width
// }

const indexedPropVal = getIndexedPropValues([100, 200, 300], br.lower);
// indexedPropVal = 200;

```

### useWindowSize
```js
const windowSize = useWindowSize();

// assume window.innerWidth = 1480
// windowSize = 
{
  width: 1480,
  height: 1027,
}
```
The useWindowSize hook provides provides an widow size object containing window.innerWidth and window.innerHeight values

