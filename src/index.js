import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import './css/index.css';

import ViewStore from './store/ViewStore';
import DoglitStore from './store/DoglitStore';

import dogService from './service/dogService';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider viewStore={new ViewStore(dogService, DoglitStore)}>
    <App />
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
