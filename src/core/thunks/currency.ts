import { Dispatch } from 'redux';
import * as CurrenciesService from '../../services/currency'
import { getExchangeRatesAction, getExchangeRatesFailedAction, getExchangeRatesSuccessAction, listAllCurrenciesAction, listAllCurrenciesFailedAction, listAllCurrenciesSuccessAction } from '../actions/currency';
import { getData, storeData, removeData } from '../helpers/asyncStorage';
import * as CountryService from '../../services/country'
import { convertCurrency } from '../../services/currency';
import { ASYNC_STORAGE_KEYS } from '../constans/asyncStorageKeys';

export const listAllCurrenciesThunk = () => {
  return async (dispatch: Dispatch) => {
    dispatch(listAllCurrenciesAction())
    try {
      const currencies: {[key: string]: string}[] | null = await CurrenciesService.listAllCurrencies();
      dispatch(listAllCurrenciesSuccessAction(currencies))
    } catch (error) {
      console.log(error);
      dispatch(listAllCurrenciesFailedAction(error))
    }
  }
}

export const getExchangeRatesThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getExchangeRatesAction())
      const rates = await getData(ASYNC_STORAGE_KEYS.rates);
      const userChoseCurrency = await getData(ASYNC_STORAGE_KEYS.selectedCurrentCurrency);
      const { currencyCode } = await CountryService.getLocalCountry();

      const from = userChoseCurrency ? userChoseCurrency : currencyCode;
      const toInArr = rates?.split(',') || [];
      const rateAmounts: {from: string, to: string, rateAmount: string | number}[] = []

      for (const to of toInArr) {
        const rateAmount = await convertCurrency(from, to, 1);
        rateAmounts.push({ from, to, rateAmount })
      }
      dispatch(getExchangeRatesSuccessAction(rateAmounts))
    } catch (error) {
      dispatch(getExchangeRatesFailedAction())  
    }
  }
}