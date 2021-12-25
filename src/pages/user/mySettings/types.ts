/*
 * @Author: your name
 * @Date: 2021-12-07 11:01:34
 * @LastEditTime: 2021-12-24 13:12:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \byte_project\src\pages\user\mySettings\types.ts
 */
export interface IthemeState {
  type: string;
}
export interface InewsTab {
  name?: string;
  id?: number | string;
}
export interface InewsTree {
  title?: string;
  key?: number | string;
}