import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Provider } from 'react-redux';

import '~/config/ReactotronConfig';

import store from './store';

import Main from './pages/Main';

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;
