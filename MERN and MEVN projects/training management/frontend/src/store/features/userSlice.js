import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getStorageData,
    clearStorage,
    setStorage,
    getTokens,
} from "../../utils/handleStorage";
import { axInstance } from "../../hooks/useAxios";

const logoutUser = createAsyncThunk("user/logoutUser", async () => {
    const { accessToken, refreshToken } = getTokens();
    await axInstance.post(
        "/logout",
        { token: refreshToken },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
});

const updateUserCredentials = createAsyncThunk(
    "user/updateUserCredentials",
    async (args) => {
        const res = await axInstance.patch(
            `/${args.userID}/update-profile`,
            args.data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (!res.data || !res.data.success) {
            console.log(res.response.data.errors);
            throw new Error(res.response.data.message);
        }
        const { results: { access_token, refresh_token } } = res.data;
        setStorage(access_token, refresh_token);
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: getStorageData(),
    },
    reducers: {
        signinUser: (state) => {
            state.userData = getStorageData();
        }
    },
    extraReducers(builder) {
        builder
            .addCase(logoutUser.fulfilled, (state, action) => {
                // Add any fetched posts to the array
                state.userData = null;
                clearStorage();
            })
            .addCase(logoutUser.rejected, (state, action) => {
                console.log(action.error.message);
            });
        builder
            .addCase(updateUserCredentials.fulfilled, (state, action) => {
                state.userData = getStorageData();
            })
            .addCase(updateUserCredentials.rejected, (state, action) => {
                throw new Error(action.error.message)
            });
    },
});

const { signinUser } = userSlice.actions;

export { signinUser, logoutUser, updateUserCredentials };
export default userSlice.reducer;

/*
You can also get error and slice state by:
async (_, { getState, rejectWithValue }) => {
    try {
        const state= getState();
        const { id, ...fields } = state
        const response = await userAPI.updateById<UpdateUserResponse>(id, fields)
        return response.data.user
    } catch (err) {
        let error: AxiosError<ValidationErrors> = err // cast the error for access
        if (!error.response) {
        throw err
        }
        // We got validation errors, let's return those so we can reference in our component and set form errors
        return rejectWithValue(error.response.data)
    }
    })

    builder.addCase(updateUser.rejected, (state, action) => {
        if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload.errorMessage
        } else {
        state.error = action.error.message
        }
    })
*/
