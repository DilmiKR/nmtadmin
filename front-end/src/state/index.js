import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  productId: "65bc339b454988933a83f8d1",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
