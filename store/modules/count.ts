import { createAsyncAction, ActionType, createReducer } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { Record } from 'immutable';

// Action Type
const ADD_COUNT_PENDING = 'count/ADD_COUNT_PENDING';
const ADD_COUNT_SUCCESS = 'count/ADD_COUNT_SUCCESS';
const ADD_COUNT_FAILURE = 'count/ADD_COUNT_FAILURE';

// STATE
type TCountState = {
  isLoading: boolean;
  count: number;
};

const initialState = Record({
  isLoading: false,
  count: 0,
});

// Action function Async
export const addCountAsync = createAsyncAction(
  ADD_COUNT_PENDING,
  ADD_COUNT_SUCCESS,
  ADD_COUNT_FAILURE
)<undefined, any, any>();

const actions = { addCountAsync };

type TCounterAction = ActionType<typeof actions>;

// Thunk Action
export const addCountThunk = (count: number): ThunkAction<void, any, null, any> => (dispatch) => {
    const { request, success, failure } = addCountAsync;
    dispatch(request());
    try {
      dispatch(success(count));
    } catch (err) {
      dispatch(failure(err));
    }
  };

const reducer = createReducer<Record<TCountState>, TCounterAction>(
  new initialState(),
  {
    [ADD_COUNT_PENDING]: (state, action) => {
      return state.set('isLoading', true);
    },
    [ADD_COUNT_SUCCESS]: (state, { payload: count }) => {
      console.log('ADD_COUNT_SUCCESS', state.get('count'));
      return state.set('count', count).set('isLoading', false);
    },
    [ADD_COUNT_FAILURE]: (state, action) => {
      return state.set('isLoading', false);
    },
  }
);

export default reducer;
