import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axInstance } from "../../utils/customAxios"
import { JwtPayload } from 'jwt-decode';

const logoutUser = createAsyncThunk('user/logoutUser', async () => {
    const { accessToken, refreshToken } = getTokens() as any;
    await axInstance.post('/logout', { token: refreshToken }, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
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
    accessToken: string;
    refreshToken: string;
}

const initialState: AuthState = {
    userData: null,
    accessToken: "",
    refreshToken: "",
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signinUser: (state) => {
            state.userData = getStorageData() as DecodedUserData;
        },
        updateCredentials: (state, action) => {
            // state.userData.name = action.payload.name;
            // state.userData.email = action.payload.email;
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
            })
    }
})



const { signinUser, updateCredentials } = authSlice.actions

export { signinUser, logoutUser, updateCredentials }
export default authSlice;

