import { handleActions } from 'redux-actions';
import { CurrencyActionTypes } from '../actions/currency';

export interface IState {
  currencies: [{
    [key: string]: string
  }],
  isLoading: boolean,
  error: boolean,
  rates: { from: string, to: string, rateAmount: number }[] | null
}

const initialState: IState = {
  currencies: [{}],
  isLoading:false,
  error: false,
  rates: null
}

export const reducer = handleActions<IState>(
  {
    [CurrencyActionTypes.listAllCurrencies]: (state: IState) => ({
      ...state,
      isLoading: true
    }),
    [CurrencyActionTypes.listAllCurrenciesSuccess]: (state: IState, action: { payload: {[key: string]: string}[] | null}) => ({
      ...state,
      isLoading: false,
      currencies: action.payload,
      error: false
    }),
    [CurrencyActionTypes.listAllCurrenciesFailed]: (state: IState) => ({
      ...state,
      isLoading: false,
      error: true
    }),
    [CurrencyActionTypes.getExchangeRates]: (state: IState) => ({
      ...state,
      isLoading: true
    }),
    [CurrencyActionTypes.getExchangeRatesSuccess]: (state: IState, action: { payload: [] }) => ({
      ...state,
      isLoading: false,
      rates: action.payload
    }),
    [CurrencyActionTypes.getExchangeRatesFailed]: (state: IState) => ({
      ...state,
      isLoading: false,
      error: true
    })
  },
  initialState
)