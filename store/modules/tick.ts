import { createAsyncAction, ActionType, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { Record } from 'immutable';

// Action Type
const TICK_PENDING = 'tick/TICK_PENDING';
const TICK_SUCCESS = 'tick/TICK_SUCCESS';
const TICK_FAILURE = 'tick/TICK_FAILURE';

// STATE
type TTickState = {
  isLoading: boolean;
  light: boolean;
  lastUpdate: number;
};

const initialState = Record({
  isLoading: false,
  light: false,
  lastUpdate: 0,
});

// Action function Async
export const tickAsync = createAsyncAction(TICK_PENDING, TICK_SUCCESS, TICK_FAILURE)<undefined, any, any>();

const actions = { tickAsync };

type TCounterAction = ActionType<typeof actions>;

export const serverRenderClock =
  (isServer: string): ThunkAction<void, any, null, any> =>
  async (dispatch) => {
    const { request, success, failure } = tickAsync;
    dispatch(request());
    try {
      dispatch(
        success({
          light: !isServer,
          ts: Date.now(),
        })
      );
    } catch (err) {
      dispatch(failure(err));
    }
  };

export const startClock = (): ThunkAction<void, any, null, any> => (dispatch) => {
  const { request, success, failure } = tickAsync;
  dispatch(request());
  try {
    setInterval(() => dispatch(success({ light: true, ts: Date.now() })), 1000);
  } catch (err) {
    dispatch(failure(err));
  }
};

const reducer = createReducer<Record<TTickState>, TCounterAction>(new initialState(), {
  [TICK_PENDING]: (state) => {
    return state.set('isLoading', true);
  },
  [TICK_SUCCESS]: (state, { payload }) => {
    const { light, ts } = payload;
    return state.set('light', !!light).set('lastUpdate', ts).set('isLoading', false);
  },
  [TICK_FAILURE]: (state, action) => {
    return state.set('isLoading', false);
  },
});

export default reducer;
