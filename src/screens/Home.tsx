import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '../core/reducers';
import { Preloader } from '../core/components/Preloader';
import { HOME_PAGE_TEXTS } from '../core/constans/texts';
import { renderDinoText } from '../core/helpers/renderDinoText';
import { useState } from 'react';
import { List } from '../core/components/List';
import { COLOR_SCHEME } from '../core/constans/colorScheme';
import { storeData, getData, removeData } from '../core/helpers/asyncStorage';
import { getUserCountryLocationSuccessAction } from '../core/actions/country';
import { getExchangeRatesThunk } from '../core/thunks/currency';
import { ASYNC_STORAGE_KEYS } from '../core/constans/asyncStorageKeys';
import AnimatedShowGate from '../core/components/AnimatedShowGate';
import { NavigationContainer } from '@react-navigation/native';
import { MyTabs } from '.';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Settings } from './Settings';

export const Home: React.FunctionComponent = () => {

  const country = useSelector((state:IRootReducer) => state.country);
  const currencies = useSelector((state:IRootReducer) => state.currency.currencies);
  const dispatch = useDispatch()
  
  const [ showList, setShowList ] = useState(false)
  
  const onButtonPress = () => {
    setShowList(!showList)
  }

  const onListButtonPress = async (currency: string):Promise<void> => {
    await storeData(ASYNC_STORAGE_KEYS.selectedCurrentCurrency, currency);
    const userChoseCurrency = await getData(ASYNC_STORAGE_KEYS.selectedCurrentCurrency);
    const rates = await getData(ASYNC_STORAGE_KEYS.rates);
    if(rates) {
      dispatch(getExchangeRatesThunk())
    }
    dispatch(getUserCountryLocationSuccessAction({
      countryCode: country.currentCountry, 
      currencyCode: country.currentCurrency,
      country: country.country,
      userChoseCurrency: userChoseCurrency
    }))
    setShowList(!showList)
  }

  const removeDataFN = async () => {
    await removeData(ASYNC_STORAGE_KEYS.selectedCurrentCurrency);
    const userChoseCurrency = await getData(ASYNC_STORAGE_KEYS.selectedCurrentCurrency);
    const rates = await getData(ASYNC_STORAGE_KEYS.rates);
    if(rates) {
      dispatch(getExchangeRatesThunk())
    }
    dispatch(getUserCountryLocationSuccessAction({
      countryCode: country.currentCountry, 
      currencyCode: country.currentCurrency,
      country: country.country,
      userChoseCurrency
    }))
  }

  const styles = StyleSheet.create({
    wrapper: { 
      flex: 1, 
      alignItems: 'center',
      backgroundColor: COLOR_SCHEME.background
    },
    text: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '80%',
      textAlign: 'justify',
      marginTop: 20,
      color: COLOR_SCHEME.textColor
    },
    specifyWrapper: {
      width: '100%',
      position: 'absolute',
      top: 0,
      paddingTop: 130,
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    specifyWrapperTitle: {
      fontSize: 17,
      color: COLOR_SCHEME.textColor
    },
    userChoseCurrency: {
      position: 'absolute',
      top: '60%',
      textTransform: 'uppercase',
      color: COLOR_SCHEME.textColor,
      fontWeight: 'bold'
    },
    buttonContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: COLOR_SCHEME.primary,
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 25,
      marginTop: 15,
  
    },
    buttonBackground: {
      position: 'absolute',
      height: 33,
      width: 120,
      backgroundColor: COLOR_SCHEME.primary
    },
    button: {
      width: 120,
      borderStyle: 'solid',
      // backgroundColor: COLOR_SCHEME.primary,
      paddingVertical: 7,
      // borderRadius: 3,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: {
      textTransform: 'uppercase',
      color: COLOR_SCHEME.textColor
    }
  })

  const dinoStyles = country.userChoseCurrency ? {
    ...styles,
    buttonBackground: {
      ...styles.buttonBackground,
      left: 0
    }
  } : {
    ...styles,
    buttonBackground: {
      ...styles.buttonBackground,
      right: 0,
    }
  }
  return (
    <View style={styles.wrapper}>
      {!country.isLoading ? (
        <>
          <Text style={styles.text}>
            {renderDinoText(HOME_PAGE_TEXTS.description, { 
              country: country.country, 
              currency: country.currentCurrency
            })}
          </Text>
          {country.userChoseCurrency && !showList && (
            <Text style={styles.userChoseCurrency}>
              {renderDinoText(HOME_PAGE_TEXTS.preselected, { 
                userChoseCurrency: country.userChoseCurrency
              })}
            </Text>
          )}
          <View style={styles.specifyWrapper}>
            <Text style={styles.specifyWrapperTitle}>Here you can specify your currency</Text>
            {!showList ? (
              <View style={styles.buttonContainer}>
                <View style={dinoStyles.buttonBackground}/>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={onButtonPress}
                >
                  <Text style={styles.buttonText}>Chose</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={removeDataFN}
                >
                  <Text style={styles.buttonText}>Use default</Text>
                </TouchableOpacity>
              </View>
            ) : showList && currencies && (
              // <AnimatedShowGate>
              //   <List data={currencies} onButtonPress={onListButtonPress}/>
              // </AnimatedShowGate>
              <List data={currencies} onButtonPress={onListButtonPress}/>
            )}
          </View>
        </>
      ) : <Preloader />}
    </View>
  );
}