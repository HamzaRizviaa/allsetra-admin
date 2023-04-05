import { createSlice } from "@reduxjs/toolkit";

interface ICounterState {
  counter: number;
}

const initialState: ICounterState = {
  counter: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementCounter(state) {
      state.counter++;
    },
    decrementCounter(state) {
      state.counter--;
    },
  },
});

export const { incrementCounter, decrementCounter } = counterSlice.actions;

export default counterSlice.reducer;
