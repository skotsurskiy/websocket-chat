import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice.jsx';
import headerReducer from '../slices/headerSlice.jsx';
import tokenReducer from '../slices/tokenSlice.jsx';
import profileReducer from '../slices/profileSlice.jsx';

const store = configureStore({
  reducer: {
    auth: authReducer,
    header: headerReducer,
    token: tokenReducer,
    profile: profileReducer
  },
});

export default store;
