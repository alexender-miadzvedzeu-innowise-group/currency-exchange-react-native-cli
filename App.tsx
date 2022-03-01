import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MyDrawer, MyTabs } from './src/screens';
import configureStore from './src/core/reducers';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';

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

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

export default App;
