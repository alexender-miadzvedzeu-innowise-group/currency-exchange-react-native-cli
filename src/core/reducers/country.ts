import { handleActions } from 'redux-actions';
import { CountryActionTypes } from '../actions/country';

export interface IState {
  currentCountry: string | null,
  currentCurrency: string | null,
  country: string | null,
  userChoseCurrency: string | null,
  isLoading: boolean,
  flagUrl: string | null,
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
    [CountryActionTypes.getUserCountryLocationSuccess]: (state: IState, action: { payload: { countryCode: string | null, currencyCode: string | null, country: string | null, userChoseCurrency: string | null } }) => ({
      ...state,
      isLoading: false,
      currentCountry: action.payload.countryCode,
      currentCurrency: action.payload.currencyCode,
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