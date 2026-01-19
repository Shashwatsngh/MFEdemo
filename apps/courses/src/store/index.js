import { configureStore, createSlice } from "@reduxjs/toolkit";
import { db } from "../data/db";

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    items: db.getCourses(),
    filter: "All",
    search: "",
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    addCourse: (state, action) => {
      const newCourse = db.addCourse(action.payload);
      state.items.push(newCourse);
    },
    deleteCourse: (state, action) => {
      db.deleteCourse(action.payload);
      state.items = state.items.filter(
        (course) => course.id !== action.payload,
      );
    },
  },
});

export const { setFilter, setSearch, addCourse, deleteCourse } =
  coursesSlice.actions;

export const store = configureStore({
  reducer: {
    courses: coursesSlice.reducer,
  },
});

export const selectCourses = (state) => state.courses;
