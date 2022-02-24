import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from './Home';
import { Converter } from './Converter';
import { Settings } from './Settings';
import { About } from './About';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserCountryLocationThunk } from '../thunks/country';
import { listAllCurrenciesThunk, getExchangeRatesThunk } from '../thunks/currency';
import { ExchangeRates } from './ExchangeRates';


const Drawer = createDrawerNavigator();

export const MyDrawer: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserCountryLocationThunk());
    dispatch(listAllCurrenciesThunk())
    dispatch(getExchangeRatesThunk())
  }, [])
  
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Converter" component={Converter} />
      <Drawer.Screen name="Exchange rates" component={ExchangeRates} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  )
}
