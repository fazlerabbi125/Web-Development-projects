import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axInstance } from "../../hooks/useAxios";
import { getTokens } from "../../utils/handleStorage";

export const fetchCourseList = createAsyncThunk(
  "courseList/fetchAll",
  async (query = {}) => {
    const { data } = await axInstance.get("/get-course-list", {
      params: { ...query },
      headers: {
        Authorization: `Bearer ${getTokens().accessToken}`,
      },
    });
    return data.results;
  }
);

const courseListSlice = createSlice({
  name: "courseList",
  initialState: {
    data: [],
    error: null,
    isLoading: true,
    size: null,
  },
  reducers: {
    // omit existing reducers here
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCourseList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCourseList.fulfilled, (state, action) => {
        try {
          state.isLoading = false;
          // Add any fetched posts to the array
          state.data = action.payload.courseList || [];
          state.size = action.payload.size;
        } catch (err) {
          console.log(err.message);
        }
      })
      .addCase(fetchCourseList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log(state.error);
      });
  },
});

export default courseListSlice.reducer;
