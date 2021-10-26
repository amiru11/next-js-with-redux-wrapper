import { createAsyncAction, ActionType, createReducer } from 'typesafe-actions';
import type { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Record } from 'immutable';
import { StoreState } from 'store';
import { AnyAction } from 'redux';

// Action Type
const TICK_PENDING = 'tick/TICK_PENDING';
const TICK_SUCCESS = 'tick/TICK_SUCCESS';
const TICK_FAILURE = 'tick/TICK_FAILURE';

// STATE
type TTickState = {
  isLoading: boolean;
  isLight: boolean;
  lastUpdate: number;
};

// Action function Async
export const tickAsync = createAsyncAction(TICK_PENDING, TICK_SUCCESS, TICK_FAILURE)<undefined, any, any>();

const actions = { tickAsync };

type TCounterAction = ActionType<typeof actions>;

const initialState = Record({
  isLoading: false,
  isLight: false,
  lastUpdate: 0,
});

export const serverRenderClock =
  (isServer: string): ThunkAction<Promise<void>, StoreState, null, TCounterAction> =>
  async (dispatch: Dispatch) => {
    const { request, success, failure } = tickAsync;
    dispatch(request());
    try {
      dispatch(
        success({
          isLight: !isServer,
          ts: Date.now(),
        })
      );
    } catch (err) {
      dispatch(failure(err));
    }
  };

export const startClock = (): ThunkAction<number | undefined, StoreState, null, TCounterAction> => (dispatch) => {
  const { request, success, failure } = tickAsync;
  dispatch(request());
  try {
    return window.setInterval(() => dispatch(success({ isLight: true, ts: Date.now() })), 1000);
  } catch (err) {
    dispatch(failure(err));
  }
};

const reducer = createReducer<Record<TTickState>, TCounterAction>(new initialState(), {
  [TICK_PENDING]: (state) => {
    return state.set('isLoading', true);
  },
  [TICK_SUCCESS]: (state, { payload }) => {
    const { isLight, ts } = payload;
    return state.set('isLight', !!isLight).set('lastUpdate', ts).set('isLoading', false);
  },
  [TICK_FAILURE]: (state, action) => {
    return state.set('isLoading', false);
  },
});

export default reducer;
