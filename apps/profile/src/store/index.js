import { configureStore, createSlice } from "@reduxjs/toolkit";
import { db } from "../data/db";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: db.getProfile(),
  },
  reducers: {
    updateProfile: (state, action) => {
      state.data = db.updateProfile(action.payload);
    },
  },
});

export const { updateProfile } = profileSlice.actions;

export const store = configureStore({
  reducer: {
    profile: profileSlice.reducer,
  },
});

export const selectProfile = (state) => state.profile.data;
