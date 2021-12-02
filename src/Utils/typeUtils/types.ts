export type typeUtilFuncType = (obj: any) => boolean
export interface typeUtilsInteface {
  isString: typeUtilFuncType,
  isArray: typeUtilFuncType,
  isNumber: typeUtilFuncType,
  isObject: typeUtilFuncType,
  isUndefined: typeUtilFuncType,
  isNull: typeUtilFuncType,
  isBoolean: typeUtilFuncType,
}