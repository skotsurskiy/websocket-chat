import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer, {logout} from '../http/slices/authSlice.jsx';
import headerReducer from '../http/slices/headerSlice.jsx';
import profileReducer from '../http/slices/profileSlice.jsx';
import chatReducer from '../http/slices/ChatSlice.jsx';

const appReducer = combineReducers({
  auth: authReducer,
  header: headerReducer,
  profile: profileReducer,
  chat: chatReducer,
});

const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
