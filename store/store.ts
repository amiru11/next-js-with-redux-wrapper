import { createStore, applyMiddleware, Store, Middleware } from 'redux';
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
      if (state.count.get('count')) nextState.count.count = state.count.get('count'); // preserve count value on client side navigation
      return nextState;
    default:
      return modules(state, action);
  }
};

const initStore: any = () => createStore(reducer, bindMiddleware([thunkMiddleware]));

export const wrapper = createWrapper<Store<Record<StoreState>>>(initStore, {
  debug: true,
  // serializeState: state => state.toJS(),
  // deserializeState: state => fromJS(state),
});
