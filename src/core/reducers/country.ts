import { handleActions } from 'redux-actions';
import { CountryActionTypes } from '../actions/country';

export interface IState {
  currentCountry: null | string,
  currentCurrency: null | string,
  country: null | string,
  userChoseCurrency: null | string,
  isLoading: boolean,
  flagUrl: null | string,
  error: boolean
}

const initialState: IState = {
  currentCountry: null,
  currentCurrency: null,
  country: null,
  userChoseCurrency: null,
  isLoading:false,
  flagUrl: null,
  error: false
}

export const reducer = handleActions<IState>(
  {
    [CountryActionTypes.getUserCountryLocation]: (state: IState) => ({
      ...state,
      isLoading: true
    }),
    [CountryActionTypes.getUserCountryLocationSuccess]: (state: IState, action: { payload: { country_code: string, currency_code: string, country: string, userChoseCurrency: null | string } }) => ({
      ...state,
      isLoading: false,
      currentCountry: action.payload.country_code,
      currentCurrency: action.payload.currency_code,
      country: action.payload.country,
      userChoseCurrency: action.payload.userChoseCurrency,
      error: false,
    }),
    [CountryActionTypes.getUserCountryLocationFailed]: (state: IState) => ({
      ...state,
      isLoading: false,
      error: true,
    })
  },
  initialState
)