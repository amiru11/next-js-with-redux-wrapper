import { combineReducers } from 'redux';

import count from './count';
import tick from './tick';

export default combineReducers({
  count,
  tick,
});
