/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Loadable from 'react-loadable';
import { Preloader } from 'react-materialize';
import { Loading } from './components';
import reducer from './reducers';

const Embed = Loadable({
  loader: () => import('./containers/Embed'),
  loading: Preloader,
})

const App = Loadable({
  loader: () => import('./containers/App'),
  loading: Loading,
})


render(
    <BrowserRouter>
      <Switch>
        <Route path="/embed/:embedId" component={Embed} />
        <Provider store={createStore(reducer)} >
          <Route path="*" component={App} />
        </Provider>
      </Switch>
    </BrowserRouter>,
  document.getElementById('root'),
);
