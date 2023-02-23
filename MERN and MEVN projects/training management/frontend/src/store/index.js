import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice';
import courseListReducer from './features/courseListSlice';
import employeeListReducer from './features/employeeListSlice';

const store = configureStore({
  reducer: {
    authUser: userReducer,
    courseList: courseListReducer,
    employeeList: employeeListReducer
  },
})

export default store;