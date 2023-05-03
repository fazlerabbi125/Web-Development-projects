import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axInstance } from '../ApiConfig';
import { JwtPayload } from 'jwt-decode';
import { RootState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';

const logoutUser = createAsyncThunk('user/logoutUser', async (args, { getState }) => {
    const state = getState() as RootState;
    await axInstance.post('/logout', { token: state.auth.refreshToken || "" }, {
        headers: {
            'Authorization': `Bearer ${state.auth.accessToken || ""}`
        }
    })
});

export interface DecodedUserData extends JwtPayload {
    _id: string,
    name: string,
    email: string,
    isAdmin: boolean,
}

interface AuthState {
    userData: DecodedUserData | null,
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    userData: null,
    accessToken: null,
    refreshToken: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signinUser: (state) => {
            // state.userData = getStorageData() as DecodedUserData;
        },
        updateCredentials: (state, action) => {
            // state.userData.name = action.payload.name;
            // state.userData.email = action.payload.email;
        }
    },
    extraReducers(builder) {
        builder.addCase(HYDRATE, (state, action: any) => {
            state = action.payload.auth
        });
        builder
            .addCase(logoutUser.fulfilled, (state, action) => {
                // Add any fetched posts to the array
                state.userData = null;
                // clearStorage();
            })
            .addCase(logoutUser.rejected, (state, action) => {
                console.log(action.error.message);
            })
    }
})



const { signinUser, updateCredentials } = authSlice.actions

export { signinUser, logoutUser, updateCredentials }
export default authSlice;

