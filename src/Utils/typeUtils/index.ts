import { typeUtilsInteface } from './types'
/**
 * 用于检查数据的类型
 * @param {any} data
 * return type 返回数据的类型
 */
let type = ['String', 'Array', 'Number', 'Object', 'Undefined', 'Null', 'Boolean'];
let typeFunc: any = {}
for (let i = 0; i < type.length; i++) {
  typeFunc['is' + type[i]] = function (obj: any) {
    return Object.prototype.toString.call(obj).slice(8, -1) === type[i] ;
  }
};
let typeUtils: typeUtilsInteface = typeFunc;
export default typeUtils