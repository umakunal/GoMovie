import React from 'react';
import MainNavigator from './src/Navigator/MainNavigator';
import {Provider} from 'react-redux';
import store from './src/Redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
