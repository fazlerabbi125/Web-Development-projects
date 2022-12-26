import { configureStore } from '@reduxjs/toolkit'
import watchlistSliceReducer from './features/watchlistSlice'
import userSlice from './features/userSlice';

const store= configureStore({
  reducer: {
    userWatchlist: watchlistSliceReducer,
    authUser:userSlice
  },
})

export default store;