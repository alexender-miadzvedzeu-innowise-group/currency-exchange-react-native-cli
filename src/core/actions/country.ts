import { createAction } from 'redux-actions';

export enum CountryActionTypes {
  getUserCountryLocation = '[Country] getUserCountryLocation',
  getUserCountryLocationSuccess = '[Country] getUserCountryLocationSuccess',
  getUserCountryLocationFailed = '[Country] getUserCountryLocationFailed',
}

export const getUserCountryLocationAction = createAction(CountryActionTypes.getUserCountryLocation);
export const getUserCountryLocationSuccessAction = createAction(
  CountryActionTypes.getUserCountryLocationSuccess,
  (payload: { countryCode: string | null, currencyCode: string | null, country: string | null, userChoseCurrency: string | null }) => payload
);
export const getUserCountryLocationFailedAction = createAction(CountryActionTypes.getUserCountryLocationFailed);

