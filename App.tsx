import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MyDrawer } from './src/core/screens';
import configureStore from './src/core/reducers';
import { Provider, useDispatch } from 'react-redux';
import { getUserCountryLocationThunk } from './src/core/thunks/country';

export const { store } = configureStore();

const App: React.FunctionComponent = (): JSX.Element => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
