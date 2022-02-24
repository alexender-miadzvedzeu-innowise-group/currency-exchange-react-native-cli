import { createAction } from 'redux-actions';

export enum CurrencyActionTypes {
  listAllCurrencies = '[Currency] listAllCurrencies',
  listAllCurrenciesSuccess = '[Currency] listAllCurrenciesSuccess',
  listAllCurrenciesFailed = '[Currency] listAllCurrenciesFailed',

  getExchangeRates = '[Currency] getExchangeRates',
  getExchangeRatesSuccess = '[Currency] getExchangeRatesSuccess',
  getExchangeRatesFailed = '[Currency] getExchangeRatesFailed',
}

export const listAllCurrenciesAction = createAction(CurrencyActionTypes.listAllCurrencies);
export const listAllCurrenciesSuccessAction = createAction(
  CurrencyActionTypes.listAllCurrenciesSuccess,
  (payload: {[key: string]: string}[] | null) => payload 
);
export const listAllCurrenciesFailedAction = createAction(CurrencyActionTypes.listAllCurrenciesFailed);


export const getExchangeRatesAction = createAction(CurrencyActionTypes.getExchangeRates);
export const getExchangeRatesSuccessAction = createAction(
  CurrencyActionTypes.getExchangeRatesSuccess,
  (payload: {from: string, to: string, rateAmount: string | number}[]) => payload
)
export const getExchangeRatesFailedAction = createAction(CurrencyActionTypes.getExchangeRatesFailed)