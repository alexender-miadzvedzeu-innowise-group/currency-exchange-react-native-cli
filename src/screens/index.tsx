import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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
import { View } from 'react-native';

const Drawer = createDrawerNavigator();

const Tab = createMaterialTopTabNavigator();

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
        drawerActiveBackgroundColor: COLOR_SCHEME.primary,
        drawerActiveTintColor: COLOR_SCHEME.background,
        drawerInactiveTintColor: COLOR_SCHEME.primary
      }}
    >
      <Drawer.Screen name="Home" component={HomeTabs} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  )
}

export const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLOR_SCHEME.textColorActive,
        tabBarInactiveTintColor: COLOR_SCHEME.textColor,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarPressColor: '#fff',
        tabBarStyle: { 

        },
        tabBarItemStyle: {

        },
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          height: '100%',
          borderRadius: 25,
          backgroundColor: COLOR_SCHEME.primary
        }
      }}
      tabBarPosition='top'
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Converter" component={Converter} />
      <Tab.Screen name="Rates" component={ExchangeRates} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}