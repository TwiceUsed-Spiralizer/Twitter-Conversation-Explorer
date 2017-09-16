/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './containers/App';
import reducer from './reducers';
import './index.css';

render(
  <Provider store={createStore(reducer)} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

