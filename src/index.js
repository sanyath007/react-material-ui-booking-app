import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import App from './App';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

serviceWorker.unregister();
