import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {axInstance} from '../../hooks/useAxios'


export const fetchList = createAsyncThunk('watchlist/fetchList', async () => {
    try {
        const {data}= await axInstance.get('/get-list')
        return data.results.movies;
    } catch (error) {
        console.error(error.message);
    }
  })

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    data:[],
    error: null,
    isLoading:true
  },
  reducers: {
    // omit existing reducers here
  },
  extraReducers(builder) {
    builder
      .addCase(fetchList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add any fetched posts to the array
        state.data = action.payload;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message
      })
  }
})

export default watchlistSlice.reducer

