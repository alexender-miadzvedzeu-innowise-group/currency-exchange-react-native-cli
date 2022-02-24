import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { COLOR_SCHEME } from '../constans/colorScheme';
import { SETTINGS_PAGE_TEXTS } from '../constans/texts';
import { IRootReducer } from '../reducers';
import { List } from '../components/List';
import { getData, storeData } from '../helpers/asyncStorage';
import { ASYNC_STORAGE_KEYS } from '../constans/asyncStorageKeys';
import { getExchangeRatesThunk } from '../thunks/currency';
import { Preloader } from '../components/Preloader';

export const Settings: React.FunctionComponent = () => {
  
  const dispatch = useDispatch()
  const { rates, currencies, isLoading } = useSelector((state:IRootReducer) => state.currency);
  const [ showList, setShowList ] = useState<boolean>(false);
  const [ deleteInProcess, setDeleteInProcess ] = useState<boolean>(false);
  const [ currenciesToDel, setCurrenciesToDel ] = useState<string[]>([])
  const [ isLocalLoading, setIsLocalLoading ] = useState<boolean>(false)

  const onAddButtonPressed = () => {
    setShowList(!showList)
  }

  const onDeleteButtonPress = () => {
    setDeleteInProcess(!deleteInProcess)
  }

  const onSubmitButtonPress = async () => {
    setIsLocalLoading(true)
    const rates = await getData(ASYNC_STORAGE_KEYS.rates);
    const ratesInArr = rates?.split(',');
    const newRatesList = ratesInArr?.filter(el => !currenciesToDel.some(cur => cur === el)).join(',')
    await storeData(ASYNC_STORAGE_KEYS.rates, newRatesList);
    setDeleteInProcess(!deleteInProcess);
    setCurrenciesToDel([]);
    dispatch(getExchangeRatesThunk())
    setIsLocalLoading(false)
  }

  const onCancelButtonPress = () => {
    setDeleteInProcess(!deleteInProcess)
    setCurrenciesToDel([])
  }

  const onListItemPress = (currency: string) => () => {
    if (currenciesToDel.some(el => el === currency)) {
      const updatedCurrencies = currenciesToDel.filter(el => el !== currency);
      setCurrenciesToDel(updatedCurrencies);
    } else {
      setCurrenciesToDel([
        ...currenciesToDel,
        currency
      ])
    }
  }

  const listCallback = async (currency: string) => {
    setIsLocalLoading(true)
    const ratesFromStorage = await getData(ASYNC_STORAGE_KEYS.rates)
    if (ratesFromStorage) {
      const ratesInArr = ratesFromStorage?.split(',');
      const isInclude = ratesInArr?.includes(currency);
      if (!isInclude) {
        ratesInArr?.push(currency);
        const ratesString = ratesInArr?.join(',');
        await storeData(ASYNC_STORAGE_KEYS.rates, ratesString);
        dispatch(getExchangeRatesThunk())
      }
    } else {
      const ratesInArr = [];
      ratesInArr?.push(currency);
      const ratesString = ratesInArr?.join(',');
      await storeData(ASYNC_STORAGE_KEYS.rates, ratesString);
      dispatch(getExchangeRatesThunk())
    }
    setShowList(!showList);
    setIsLocalLoading(false)
  }

  const showPreloader = isLoading || isLocalLoading;

  return (
    <View style={styles.wrapper}>
      {!showPreloader ? (
        <>
          <Text style={styles.topArticle}>{SETTINGS_PAGE_TEXTS.topArticle}</Text>
          <View style={styles.buttonsContainer}>
            {!deleteInProcess ? (
              <>
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={onAddButtonPressed}
                >
                  <Text>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={onDeleteButtonPress}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={onSubmitButtonPress}
                >
                  <Text>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={onCancelButtonPress}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          {rates && 
            <FlatList
              style={styles.ratesContainer}
              contentContainerStyle={styles.ratesContainerContentStyle}
              data={rates}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.to}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity 
                    onPress={onListItemPress(item.to)}
                    disabled={!deleteInProcess}
                  >
                    <Text style={!currenciesToDel.some(el => el === item.to) ? styles.rateItem : styles.rateItemInProcessToDell}>{item.to}</Text>
                  </TouchableOpacity>
                )}
              }
            />
          }
          {showList && 
            <List
              data={currencies}
              onButtonPress={listCallback}
            />
          }
        </>
      ) : <Preloader/>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1, 
    alignItems: 'center',
    backgroundColor: COLOR_SCHEME.background
  },
  buttonsContainer: {
    width: '60%',
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-around'
  },
  addButton: {
    backgroundColor: COLOR_SCHEME.colorMiddle,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteButton: {
    backgroundColor: COLOR_SCHEME.warn,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  topArticle: {
    flexDirection: 'column',
    width: '80%',
    textAlign: 'center',
    marginTop: 20
  },
  ratesContainer: {
    width: '100%',
    flex: 1,
  },
  ratesContainerContentStyle: {
    width: '100%',
    alignItems: 'center',
  },
  rateItem: {
    width: 150,
    paddingVertical: 10,
    marginVertical: 5,
    backgroundColor: COLOR_SCHEME.colorLight,
    borderRadius: 5,
    textAlign: 'center'
  },
  rateItemInProcessToDell: {
    width: 150,
    paddingVertical: 10,
    marginVertical: 5,
    backgroundColor: COLOR_SCHEME.warn,
    borderRadius: 5,
    textAlign: 'center'
  },
})