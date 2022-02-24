import { Dispatch } from 'redux';
import * as CountryService from '../../services/country'
import { getUserCountryLocationAction, getUserCountryLocationSuccessAction, getUserCountryLocationFailedAction } from '../actions/country';
import { ASYNC_STORAGE_KEYS } from '../constans/asyncStorageKeys';
import { getData } from '../helpers/asyncStorage';

export const getUserCountryLocationThunk = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getUserCountryLocationAction())
    try {
      const { countryCode, currencyCode, country } = await CountryService.getLocalCountry();
      const userChoseCurrency: string | null = await getData(ASYNC_STORAGE_KEYS.selectedCurrentCurrency);
      dispatch(getUserCountryLocationSuccessAction({ 
        countryCode, 
        currencyCode, 
        country,
        userChoseCurrency
     }))
    } catch (error) {
      dispatch(getUserCountryLocationFailedAction(error))
    }
  }
}