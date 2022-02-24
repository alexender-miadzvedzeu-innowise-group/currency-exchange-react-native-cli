import { createAction } from 'redux-actions';

export enum CurrencyActionTypes {
  listAllCurrencies = '[Currency] listAllCurrencies',
  listAllCurrenciesSuccess = '[Currency] listAllCurrenciesSuccess',
  listAllCurrenciesFailed = '[Currency] listAllCurrenciesFailed',

  getExchangeRates = '[Currency] getExchangeRates',
  getExchangeRatesSuccess = '[Currency] getExchangeRatesSuccess',
  getExchangeRatesFailed = '[Currency] getExchangeRatesFailed',
}

export interface IListAllCurrenciesSuccessPayload { 
  [key:string]: string | null
}


export const listAllCurrenciesAction = createAction(CurrencyActionTypes.listAllCurrencies);
export const listAllCurrenciesSuccessAction = createAction(
  CurrencyActionTypes.listAllCurrenciesSuccess,
  (payload: IListAllCurrenciesSuccessPayload) => payload 
);
export const listAllCurrenciesFailedAction = createAction(CurrencyActionTypes.listAllCurrenciesFailed);


export const getExchangeRatesAction = createAction(CurrencyActionTypes.getExchangeRates);
export const getExchangeRatesSuccessAction = createAction(
  CurrencyActionTypes.getExchangeRatesSuccess,
  (payload: []) => payload
)
export const getExchangeRatesFailedAction = createAction(CurrencyActionTypes.getExchangeRatesFailed)