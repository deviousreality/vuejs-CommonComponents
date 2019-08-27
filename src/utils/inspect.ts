/** Helpful variable inspector */

import { isArray } from './array';
import { isObject, isPlainObject } from './object';

export const toType = (val: any) => typeof val;

export const toRawType = (val: any) => Object.prototype.toString.call(val).slice(8, -1);

export const toRawTypeLowerCase = (val: any) => toRawType(val).toLowerCase();

export const isUndefined = (val: any) => val === undefined;

export const isNull = (val: any) => val === null;

export const isFunction = (val: any) => toType(val) === 'function';

export const isBoolean = (val: any) => toType(val) === 'boolean';

export const isString = (val: any) => toType(val) === 'string';

export const isNumber = (val: any) => toType(val) === 'number';

export const isPrimitive = (val: any) => isBoolean(val) || isString(val) || isNumber(val);

export const isDate = (val: any) => val instanceof Date;

export const isRegExp = (val: any) => toRawType(val) === 'RegExp';

export const isPromise = (val: any) => !isUndefined(val) && !isNull(val) && isFunction(val.then) && isFunction(val.catch)

export { isArray, isObject, isPlainObject };
