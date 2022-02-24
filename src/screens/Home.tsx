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
              <>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={onButtonPress}
                >
                  <Text style={styles.buttonText}>Chose</Text>
                </TouchableOpacity>
                <Text>Or</Text>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={removeDataFN}
                >
                  <Text style={styles.buttonText}>Use default</Text>
                </TouchableOpacity>
              </>
            ) : showList && currencies && (
              <List
                data={currencies}
                onButtonPress={onListButtonPress}
              />
            )}
          </View>
        </>
      ) : <Preloader />}
    </View>
  );
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
    marginTop: 20
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
  },
  userChoseCurrency: {
    position: 'absolute',
    top: '60%',
    textTransform: 'uppercase',
    color: COLOR_SCHEME.colorDark,
    fontWeight: 'bold'
  },
  button: {
    width: 120,
    borderStyle: 'solid',
    backgroundColor: COLOR_SCHEME.colorDark,
    paddingVertical: 7,
    marginVertical: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    textTransform: 'uppercase',
    color: '#fff'
  }
})

