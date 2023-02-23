import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axInstance } from '../../hooks/useAxios'
import { getTokens } from "../../utils/handleStorage";


export const fetchList = createAsyncThunk('watchlist/fetchList', async (query) => {
  const { data } = await axInstance.get('/get-list', {
    params: query,
    headers: {
      'Authorization': `Bearer ${getTokens().accessToken}`
    }
  });

  return data.results;
})

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    data: [],
    error: null,
    isLoading: true,
    count: null,
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
        try {
          state.isLoading = false;
          // Add any fetched posts to the array
          state.data = action.payload.userlist.movies || [];
          state.count = action.payload.count;
        } catch (err) {
          console.log(err.message);
        }

      })
      .addCase(fetchList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log(state.error);
      })
  }
})

export default watchlistSlice.reducer

