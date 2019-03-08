/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './src/App';
import { name as appName } from './app.json';
import rootReducer from './src/redux/reducers';

// Add the thunk middleware to our store
const store = createStore(rootReducer, applyMiddleware(thunk));

// Pass the store into the Provider
const AppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => AppWithStore);
