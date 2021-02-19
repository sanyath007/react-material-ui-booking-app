import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import 'moment/locale/th';
import App from './App';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';

moment.locale('th');

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment}>
        <App />
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

serviceWorker.unregister();
