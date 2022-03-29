import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { configureStore, Store, ThunkAction, combineReducers } from '@reduxjs/toolkit';
import { fromJS, Record } from 'immutable';

import modules from './modules';

// Type StoreState

const reducer: any = (state: StoreState, action: any) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', state, action);
      return action.payload;
      // return {
      //   ...state, // use previous state
      //   ...action.payload, // apply delta from hydration
      // };
    default:
      return modules(state, action);
  }
};

const makeStore = () => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type StoreState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: true,
});
