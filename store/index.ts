import { createStore, applyMiddleware, Store, Middleware, Action } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import { fromJS, Record } from 'immutable';

import modules from './modules';

// Type StoreState
export type StoreState = ReturnType<typeof modules>;

const bindMiddleware = (middleware: Middleware<any, any, any>[]) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer: any = (state: StoreState, action: any) => {
  switch (action.type) {
    case HYDRATE:
      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };
      console.log('HYDRATE', typeof state, action.payload.count, nextState.count);
      if (state?.count?.get('count')) {

        return nextState.count.set('count', state.count.get('count'));  // preserve count value on client side navigation
      }
      // if (state.count?.get('count')) {
      // }

      return state;
    default:
      return modules(state, action);
  }
};

const initStore: any = () => createStore(reducer, bindMiddleware([thunkMiddleware]));

export const wrapper = createWrapper<Store<StoreState>>(initStore, {
  // debug: true,
  serializeState: (state: StoreState): any => {
    let newStoreState: any = {};
    Object.keys(state).forEach(storeName => {
      newStoreState = {
        ...newStoreState,
        [storeName]: state[storeName].toJS()
      };
    });

    console.log('serializeState', newStoreState);

    return newStoreState;
  },
  deserializeState: (state): StoreState => {
    let newStoreState: any = {};
    Object.keys(state).forEach(storeName => {
      const newState = Record(state[storeName]);
      newStoreState = {
        ...newStoreState,
        [storeName]: new newState()
      };
    });

    console.log('deserializeState', newStoreState);

    return newStoreState;
  },
});
