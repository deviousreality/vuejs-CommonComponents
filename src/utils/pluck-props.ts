import identity from "./identity";

/**
 * Given an array of properties or an object of property keys,
 * plucks all the values off the target object.
 * @param {{}|string[]} keysToPluck
 * @param {{}} objToPluck
 * @param {Function} transformFn
 * @return {{}}
 */
export default function pluckProps (keysToPluck: any[], objToPluck: any, transformFn = identity) {
    return (Array.isArray(keysToPluck) ? keysToPluck.slice() : Object.keys(keysToPluck)).reduce((memo, prop) => {
      // eslint-disable-next-line no-sequences
      return (memo[transformFn(prop)] = objToPluck[prop]), memo
    }, {});
  } 