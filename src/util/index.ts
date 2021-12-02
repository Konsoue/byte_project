// 判断类型
export const is = {
  Type: (val: any) => Object.prototype.toString.call(val).slice(8, -1),
  Void: (val: any) => is.Undefined(val) || is.Null(val) || is.NaN(val),
  Undefined: (val: any) => is.Type(val) === 'Undefined',
  Null: (val: any) => is.Type(val) === 'Null',
  NaN: (val: any) => is.Type(val) === 'NaN',
  Number: (val: any) => is.Type(val) === 'Number',
  String: (val: any) => is.Type(val) === 'String',
  Object: (val: any) => is.Type(val) === 'Object',
  Array: (val: any) => is.Type(val) === 'Array',
  Date: (val: any) => is.Type(val) === 'Date'
}

/**
 * 函数柯里化
 * @param {Function} fn
 * @param  {Array[any]} firstArgs
 * @returns
 */
export const currying = function (fn: Function, ...firstArgs: any[]) {
  return function (...args: any[]) {
    if (firstArgs.length) args = firstArgs.concat(args);
    if (args.length < fn.length) return currying(fn, ...args);
    return fn.apply(null, args)
  }
}

/**
 * 将函数组合起来
 * 比如：原先的调用方式是这样 f(g(k(p(x))))，可以改成这样 compose(f, g, k, p)(x)
 * @param  {Array{Function]} fnArr
 * @returns
 */
export const compose = function (...fnArr: Function[]) {
  if (!fnArr.length) return (arg: any) => arg;
  if (fnArr.length === 1) return fnArr[0];
  return fnArr.reduce((preFn, curFn) => (...rest: any[]) => curFn(preFn(...rest)))
}


/**
 * 转义 HTML 字符串，防止 XSS 攻击
 * @param {*} str
 * @returns
 */
export const escapeHTML = (str: string) =>
  str.replace(
    /[&<>'"]/g,
    tag =>
    ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );

