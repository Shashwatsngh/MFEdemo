import { configureStore, createSlice } from "@reduxjs/toolkit";
import { db } from "../data/db";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null, // Start empty, load when user is known
  },
  reducers: {
    setProfileData: (state, action) => {
      state.data = action.payload;
    },
    updateProfile: (state, action) => {
      // action.payload should contain { user, updates }
      // But redux actions should be serializable.
      // We will handle the DB update in the component or middleware,
      // but simplistic approach: update store, assume component synced DB.
      // Better: we update DB in component, then dispatch this to update store.
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export const { setProfileData, updateProfile } = profileSlice.actions;

export const store = configureStore({
  reducer: {
    profile: profileSlice.reducer,
  },
});

export const selectProfile = (state) => state.profile.data;
