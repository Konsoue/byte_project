import { useState, useEffect, useRef, useCallback } from 'react'
import { fetchFunc } from '@/Utils/fetch/types'
import fetch from '@/Utils/fetch'

//useFetch返回值类型
interface IuseFetchRes {
  loading: boolean;
  data: undefined | object | [];
  err: any,
  run: (currentConfig?: object | any[], isReset?: boolean) => Promise<any>
}
/**
 * useFetch自定义请求hook
 * @param config fetch的配置项，参考fetch
 * @returns [
 *  loading: loading状体,
 *  data: 200 时返回的数据, // 默认为undefined
 *  err: 异常时返回的错误, // 默认为undefined
 *  run: 遥控器，控制请求的发出，执行一次发送一次请求，返回一个promise
 * ]
 */
const useFetch: fetchFunc<IuseFetchRes> = (config) => {
  const [loading, setLoading] = useState(false)
  const [data, setDate] = useState(undefined)
  const [err, setErr] = useState<string>('')
  const fetchConfig = useRef(config)
  /**
   * 遥控器
   * data：当isReset为true，传 的是整个config，false可以传一个data
   * isReset： 是否要重置，若为true 则data值为完整的config
   */
  const run = useCallback((data: any, isReset = false) => {
    return new Promise(async (resolve) => {
      // 非重置且有data，则重置data
      (!isReset && data) && (fetchConfig.current.data = data);
      // 重置则替换整个config
      (isReset && data) && (fetchConfig.current = data);
      try {
        setLoading(true)
        // 发送请求
        let res = await fetch(fetchConfig.current)
        setLoading(false)
        setDate(res)
        resolve(res)
      } catch (err) {
        setLoading(false)
        setErr(err as string)
      }
    })
  }, [])
  // 如果第一次有传data则自动发一次请求
  useEffect(() => {
    // 有data才自动发请求
    if (config.data) {
      // 设置为loading状态为true
      setLoading(true)
      fetch(fetchConfig.current).then((res: any) => {
        setLoading(false)
        setDate(res)
      }).catch((err: any) => {
        setLoading(false)
        setErr(err)
      })
    }
    return () => {
      config.data = null
    }
    // eslint-disable-next-line
  }, [])
  return { loading, data, err, run }
}
export default useFetch
