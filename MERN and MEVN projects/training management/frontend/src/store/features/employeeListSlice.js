import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axInstance } from "../../hooks/useAxios";
import { getTokens } from "../../utils/handleStorage";

export const fetchEmployeeList = createAsyncThunk(
  "employeeList/fetchAll",
  async (query = {}) => {
    const { data } = await axInstance.get("/admin/employee-list", {
      params: { ...query },
      headers: {
        Authorization: `Bearer ${getTokens().accessToken}`,
      },
    });

    return data.results;
  }
);

const employeeListSlice = createSlice({
  name: "employeeList",
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
      .addCase(fetchEmployeeList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEmployeeList.fulfilled, (state, action) => {
        try {
          state.isLoading = false;
          // Add any fetched posts to the array
          state.data = action.payload.employees || [];
          state.size = action.payload.total;
        } catch (err) {
          console.log(err.message);
        }
      })
      .addCase(fetchEmployeeList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log(state.error);
      });
  },
});

export default employeeListSlice.reducer;
