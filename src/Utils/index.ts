

// 判断类型
export const is = {
  Type: (val: any): string => Object.prototype.toString.call(val).slice(8, -1),
  Void: (val: any): boolean => is.Undefined(val) || is.Null(val) || is.NaN(val),
  Undefined: (val: any): boolean => is.Type(val) === 'Undefined',
  Null: (val: any): boolean => is.Type(val) === 'Null',
  NaN: (val: any): boolean => is.Type(val) === 'NaN',
  Number: (val: any): boolean => is.Type(val) === 'Number',
  String: (val: any): boolean => is.Type(val) === 'String',
  Object: (val: any): boolean => is.Type(val) === 'Object',
  Array: (val: any): boolean => is.Type(val) === 'Array',
  Date: (val: any): boolean => is.Type(val) === 'Date',
  Function: (val: any): boolean => is.Type(val) === 'Function',
  Class: (val: any): boolean => is.Type(val) === 'Class',
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


// 能够防止被包裹的组件在卸载后使用 setState 而报错（异步结果返回的时候组件已经卸载的情况）
export const injectUnmount = (target: React.ComponentClass) => {
  // 改装componentWillUnmount，销毁的时候记录一下
  try {
    let next = target.prototype.componentWillUnmount
    target.prototype.componentWillUnmount = function (...rest: any[]) {
      if (next) next.call(this, ...rest);
      this.unmount = true
    }
    // 对setState的改装，setState查看目前是否已经销毁
    let setState = target.prototype.setState
    target.prototype.setState = function (...rest: any[]) {
      if (this.unmount) return;
      setState.call(this, ...rest)
    }
  } catch { }
}