
// 请求头的数据类型
export type contentType = "application/json" | "multipart/form-data" | "application/x-www-form-urlencoded"
export interface IInitHeader {
  "Content-Type": contentType,
  Authorization?: string,
}
// fetch的参数约束
export interface IfetchParams {
  url: string,
  type?: "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK" | undefined,
  headers?: {
    "Content-Type"?: contentType
    "authorization"?: string
  },
  data?: any,
  responseType?: "text" | "json" | "arraybuffer" | "blob" | "document" | "stream" | undefined,
  transformRequest?: any[]
}

// fetch函数类型
export type fetchFunc<T> = (options: IfetchParams) => T
