import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from './Home';
import { Converter } from './Converter';
import { Settings } from './Settings';
import { About } from './About';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserCountryLocationThunk } from '../core/thunks/country';
import { listAllCurrenciesThunk, getExchangeRatesThunk } from '../core/thunks/currency';
import { ExchangeRates } from './ExchangeRates';
import { CutomDrawer } from './CustomDrawer';
import { COLOR_SCHEME } from '../core/constans/colorScheme';

const Drawer = createDrawerNavigator();

export const MyDrawer: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserCountryLocationThunk());
    dispatch(listAllCurrenciesThunk())
    dispatch(getExchangeRatesThunk())
  }, [])
  
  return (
    <Drawer.Navigator 
      drawerContent={props => <CutomDrawer {...props} />} 
      screenOptions={{ 
        headerShown: false,
        drawerActiveBackgroundColor: COLOR_SCHEME.colorMiddle,
        drawerActiveTintColor: COLOR_SCHEME.background,
        drawerInactiveTintColor: COLOR_SCHEME.colorLight
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Converter" component={Converter} />
      <Drawer.Screen name="Exchange rates" component={ExchangeRates} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  )
}
