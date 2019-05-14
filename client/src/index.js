import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import App from './App';
import allReducers from './reducers/';

const reducer = combineReducers(allReducers);
const store = createStore(reducer, {}, applyMiddleware(thunk));

ReactDOM.render(
   <Provider store={store}>
      <App /> 
   </Provider>,
   document.getElementById('app')
);

