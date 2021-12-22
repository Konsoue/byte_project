import { useState, useEffect, useRef, useCallback } from 'react'
import { fetchFunc } from '@/Utils/fetch/types'
import weather from '@/Utils/fetch/weather'

interface IWeatherData {
  city?: string;
  forecast?: Array<object>;
  ganmao?: string;
  wendu?: string;
  yesterday?: object;
}


interface IWeatherResponse {
  data?: IWeatherData;
  desc?: string;
  status?: number;
}

interface IuseFetchRes {
  weatherLoad: boolean;
  weatherData: IWeatherResponse | object;
  err: any;
  getWeather: (currentConfig?: object | any[], isReset?: boolean) => Promise<any>
}

const useWeather: fetchFunc<IuseFetchRes> = (config) => {
  const [weatherLoad, setLoading] = useState(false)
  const [weatherData, setData] = useState({})
  const [err, setErr] = useState<string>('')
  const fetchConfig = useRef(config)
  /**
  * 遥控器
  * data：当isReset为true，传 的是整个config，false可以传一个data
  * isReset： 是否要重置，若为true 则data值为完整的config
  */
  const getWeather = useCallback((data: any, isReset = false) => {
    return new Promise(async (resolve, reject) => {
      // 非重置且有data，则重置data
      (!isReset && data) && (fetchConfig.current.data = data);
      // 重置则替换整个config
      (isReset && data) && (fetchConfig.current = data);
      try {
        setLoading(true)
        // 发送请求
        let res = await weather(fetchConfig.current) as IWeatherResponse
        setLoading(false)
        setData(res)
        resolve(res)
      } catch (err) {
        setLoading(false)
        console.error(err)
        setErr(err as string)
        reject(err)
      }
    })
  }, [])

  // 如果第一次有传data则自动发一次请求
  useEffect(() => {
    // 有data才自动发请求
    if (config.data) {
      // 设置为loading状态为true
      setLoading(true)
      weather(fetchConfig.current).then((res: any) => {
        setLoading(false)
        setData(res)
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
  return { weatherLoad, weatherData, err, getWeather }
}


export default useWeather