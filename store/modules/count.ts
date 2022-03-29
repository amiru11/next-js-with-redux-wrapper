import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Action Type
const ADD_COUNT_PENDING = 'count/ADD_COUNT_PENDING';
const ADD_COUNT_SUCCESS = 'count/ADD_COUNT_SUCCESS';
const ADD_COUNT_FAILURE = 'count/ADD_COUNT_FAILURE';

// STATE
type TCountState = {
  isLoading: boolean;
  count: number;
};

const initialState: TCountState = {
  isLoading: false,
  count: 0,
};

const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    setCount(state: TCountState, action: PayloadAction<number>) {
      console.log('setCount', action.payload);
      state.count = action.payload;
    }
  },
})

export const { setCount } = countSlice.actions;

export default countSlice.reducer;
