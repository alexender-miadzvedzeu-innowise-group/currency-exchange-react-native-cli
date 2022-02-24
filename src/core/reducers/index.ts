import { createStore, applyMiddleware, combineReducers, Store } from 'redux';
import * as currency from './currency';
import * as country from './country'
import thunk from 'redux-thunk';

export interface IRootReducer {
  currency: currency.IState,
  country: country.IState
}

declare module 'react-redux' {
    interface DefaultRootState extends IRootReducer {}
}

const rootReducer = combineReducers<IRootReducer>({
  currency: currency.reducer,
  country: country.reducer
})

export default (): { store: Store<IRootReducer> } => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return { store }
}