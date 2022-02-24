import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MyDrawer } from './src/screens';
import configureStore from './src/core/reducers';
import { Provider } from 'react-redux';

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
