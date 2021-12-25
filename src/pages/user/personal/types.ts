/*
 * @Author: your name
 * @Date: 2021-12-25 15:41:39
 * @LastEditTime: 2021-12-25 16:40:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \byte_project\src\pages\user\personal\types.ts
 */
export interface IPixelCrop {
  width: number,
  height: number,
  x: number,
  y: number
}

export interface ICropper {
  file: File,
  onOk: (file: File) => void,
  onCancel: () => void,
}
