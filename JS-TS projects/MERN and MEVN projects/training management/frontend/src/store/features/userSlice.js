import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {getStorageData,clearStorage,getTokens} from "../../utils/handleStorage";
import {axInstance} from "../../hooks/useAxios"

const logoutUser = createAsyncThunk('user/logoutUser', async () => {
    const {accessToken, refreshToken}=getTokens();
    await axInstance.post('/logout', {token:refreshToken},{
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
});
const userSlice = createSlice({
    name: 'user',
    initialState:{
        userData: getStorageData(),
    },
    reducers: {
        signinUser: (state) =>{
            state.userData=getStorageData();
        },
        updateCredentials:(state,action) =>{
            state.userData.name=action.payload.name;
            state.userData.email=action.payload.email;
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



const { signinUser,updateCredentials } = userSlice.actions

export {signinUser,logoutUser,updateCredentials}
export default userSlice.reducer

