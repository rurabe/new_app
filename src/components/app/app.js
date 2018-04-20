import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';

import AppRouter from '../app_router/app_router';

import RootReducer from '../../reducers/root_reducer';

const initialState = Immutable.Map();

const store = createStore(combineReducers(RootReducer), initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = function(){
  return (
    <div>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
};

export default App;