import { useLayoutEffect } from "react";
import { weatherUrl } from "@/Utils/urls";
import { useReduxDispatch, useReduxData } from "@/redux";
import { useLocation } from 'react-router-dom'
import useWeather from "@/hooks/useWeather";
import { IResponceResult } from './types'



const PubWeather: React.FC = (props) => {
  const dispatch = useReduxDispatch();
  const location = useLocation();

  const { getWeather, weatherData } = useWeather({
    url: weatherUrl.guangzhou
  })

  useLayoutEffect(() => {
    const { pathname } = location;
    if (pathname === '/') {
      getWeather();
    }
  }, [])

  useLayoutEffect(() => {
    if (weatherData) {
      const { data } = weatherData as IResponceResult;
      dispatch({
        type: 'weather/setData',
        payload: { data }
      })
    }
  }, [weatherData])


  return (<div></div>)
}


export default PubWeather;