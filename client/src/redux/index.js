import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import messagesReducer from './slices/messagesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messagesReducer
  }
});

export default store;