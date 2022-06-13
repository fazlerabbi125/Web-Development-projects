import { configureStore } from '@reduxjs/toolkit'
import watchlistSliceReducer from './features/watchlistSlice'


const store= configureStore({
  reducer: {
    userWatchlist: watchlistSliceReducer,
  },
})

export default store;