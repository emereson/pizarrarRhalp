import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  navigationHistory: [
    {
      name: 'default'
    }
  ]
};

export const whiteboardToolkitState = createSlice({
  name: 'whiteboardToolkit',
  initialState,
  reducers: {
    pushToNavigationHistory: (state, action) => {
      const newArray = [...state.navigationHistory];
      newArray.push(action.payload);
      state.navigationHistory = newArray;
    },
    removeLastHistory: (state, action) => {
      state.navigationHistory = state.navigationHistory.filter(
        tag => tag !== state.navigationHistory[state.navigationHistory.length - 1]
      );
    }
  }
});

export const { pushToNavigationHistory, removeLastHistory } =
  whiteboardToolkitState.actions;

export default whiteboardToolkitState.reducer;
