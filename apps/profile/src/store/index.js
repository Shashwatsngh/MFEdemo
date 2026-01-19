import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialProfile = {
  id: 1,
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  role: "Full Stack Developer",
  location: "San Francisco, CA",
  bio: "Passionate developer with 5+ years of experience in building scalable web applications. Currently focused on React, Node.js, and cloud technologies.",
  joinedDate: "January 2023",
  stats: {
    coursesCompleted: 12,
    coursesInProgress: 3,
    certificatesEarned: 8,
    totalHoursLearned: 156,
  },
  skills: [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Python", level: 70 },
    { name: "AWS", level: 65 },
  ],
  recentActivity: [
    {
      id: 1,
      type: "completed",
      course: "Advanced TypeScript Patterns",
      date: "2 days ago",
    },
    {
      id: 2,
      type: "started",
      course: "AWS Cloud Fundamentals",
      date: "1 week ago",
    },
    {
      id: 3,
      type: "certificate",
      course: "Introduction to React",
      date: "2 weeks ago",
    },
  ],
};

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: initialProfile,
    isEditing: false,
  },
  reducers: {
    setEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    updateProfile: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export const { setEditing, updateProfile } = profileSlice.actions;

export const store = configureStore({
  reducer: {
    profile: profileSlice.reducer,
  },
});

export const selectProfile = (state) => state.profile.data;
export const selectIsEditing = (state) => state.profile.isEditing;
