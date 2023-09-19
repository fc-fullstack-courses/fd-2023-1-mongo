import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../api';

const SLICE_NAME = 'messages';

const getMessages = createAsyncThunk(
  `${SLICE_NAME}/getMessages`,
  async (options, thunkAPI) => {
    try {
      const { data: { data: messages } } = await API.getAllMessages(options);

      return messages;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const initialState = {
  messages: [],
  isLoading: false,
  error: null
}

const messagesSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    addMessageError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.messages = action.payload;
    });

    builder.addCase(getMessages.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  }
});

const { reducer: messagesReducer, actions: { addMessage, addMessageError } } = messagesSlice;

export { getMessages, addMessage, addMessageError }

export default messagesReducer;