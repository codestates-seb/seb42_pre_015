import { createSlice } from '@reduxjs/toolkit';

export const questionSlice = createSlice({
  name: 'question',
  initialState: { value: {} },
  reducers: {
    updateQuestion: (state, action) => {
      state.value = action.payload;
    }
  }
});

export default questionSlice;
export const { changeSetting } = questionSlice.actions;
