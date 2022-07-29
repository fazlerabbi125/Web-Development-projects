import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/userSlice';
import courseListSlice from './features/courseListSlice';
import employeeListSlice from './features/employeeListSlice';
const store= configureStore({
  reducer: {
    authUser:userSlice,
    courseList:courseListSlice,
    employeeList:employeeListSlice
  },
})

export default store;