import ReactDOM from 'react-dom';
import RouteComponent from './route';
import store from './redux'
import { Provider } from 'react-redux';
import "@arco-design/web-react/dist/css/arco.css";
import { LS } from '@/Utils'
import './index.scss'

const light = {
  '--theme-background': '#FFF',
  '--theme-background-2': '#f0f2f5',
  '--theme-text': '#111',
  '--theme-border': '#E4E5EA'
}
const blue = {
  '--theme-color-text': 'rgba(23, 93, 254)',
  '--theme-color-background': 'rgba(23, 93, 254)'
}
const small = {
  '--theme-font-size': '14px'
}
let useDark = LS.getItem('theme') 
let selectedColor = LS.getItem('themeColor')
let selectedSize = LS.getItem('fontSize')

const setProperties = (obj: Object) => {
  const body = document.querySelector('body')
  for (let key of Object.keys(obj)) {
    body?.style.setProperty(key, obj[key])
  }
}

useDark ? setProperties(useDark) : setProperties(light)
selectedColor ? setProperties(selectedColor) : setProperties(blue)
selectedSize ? setProperties(selectedSize) : setProperties(small)

ReactDOM.render(
  <Provider store={store}>
    <RouteComponent />
  </Provider>,
  document.getElementById('root')
);
