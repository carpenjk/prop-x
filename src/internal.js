export function _getVal (v, props, br) {
  const values = typeof v === 'function' ? v(props, br) : v
  if (Array.isArray(values)) return values[br]
  return values
};

export function _getUnitValue (derivedValue) {
  return typeof derivedValue !== 'number' ? derivedValue : `${derivedValue}px`
}
