import { UserInitProps } from "@/app/models/auth.models";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserInitProps = {
  isFetching: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
  },
});

export const { loginStart } = authSlice.actions;
export default authSlice.reducer;
