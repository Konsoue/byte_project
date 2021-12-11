import ReactDOM from 'react-dom';
import RouteComponent from './route';
import store from './redux'
import { Provider } from 'react-redux';
import "@arco-design/web-react/dist/css/arco.css";

ReactDOM.render(
  <Provider store={store}>
    <RouteComponent />
  </Provider>,
  document.getElementById('root')
);
