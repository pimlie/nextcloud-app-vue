
export function identity (x) {
  return x
}

export function lowerFirst (str) {
  if (typeof str !== 'string') {
    str = String(str)
  }
  return str.charAt(0).toLowerCase() + str.slice(1)
}

export function upperFirst (str) {
  if (typeof str !== 'string') {
    str = String(str)
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function copyProps (props, transformFn = identity) {
  if (Array.isArray(props)) {
    return props.map(transformFn)
  }
  // Props as an object.
  const copied = {}

  for (const prop in props) {
    if (props.hasOwnProperty(prop)) {
      if (typeof prop === 'object') {
        copied[transformFn(prop)] = Object.assign({}, props[prop])
      } else {
        copied[transformFn(prop)] = props[prop]
      }
    }
  }

  return copied
}

export function pluckProps (keysToPluck, objToPluck, transformFn = identity) {
  return (Array.isArray(keysToPluck) ? keysToPluck.slice() : Object.keys(keysToPluck)).reduce((memo, prop) => {
    // eslint-disable-next-line no-sequences
    return (memo[transformFn(prop)] = objToPluck[prop]), memo
  }, {})
}

export function prefixPropName (prefix, value) {
  return prefix + upperFirst(value)
}

export function unPrefixPropName (prefix, value) {
  return lowerFirst(value.replace(prefix, ''))
}
