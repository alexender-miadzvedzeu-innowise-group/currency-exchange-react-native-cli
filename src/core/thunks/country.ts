import { Dispatch } from 'redux';
import * as CountryService from '../../services/country'
import { getUserCountryLocationAction, getUserCountryLocationSuccessAction, getUserCountryLocationFailedAction } from '../actions/country';
import { ASYNC_STORAGE_KEYS } from '../constans/asyncStorageKeys';
import { getData } from '../helpers/asyncStorage';

export const getUserCountryLocationThunk = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getUserCountryLocationAction())
    try {
      const { country_code, currency_code, country } = await CountryService.getLocalCountry();
      const userChoseCurrency = await getData(ASYNC_STORAGE_KEYS.selectedCurrentCurrency);
      dispatch(getUserCountryLocationSuccessAction({ 
        country_code, 
        currency_code, 
        country,
        userChoseCurrency
     }))
    } catch (error) {
      dispatch(getUserCountryLocationFailedAction(error))
    }
  }
}