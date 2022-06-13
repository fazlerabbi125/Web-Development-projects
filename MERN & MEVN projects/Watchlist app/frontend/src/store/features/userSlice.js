import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import jwt_decode from "jwt-decode";
import {axInstance} from "../../hooks/useAxios"

const logoutUser = createAsyncThunk('user/logoutUser', async () => {
    try {
        await axInstance.post('/logout', {token:localStorage.getItem('refresh')},{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
    } catch (error) {
        console.log(error.message);
        return null;
    }
});
const userSlice = createSlice({
    name: 'user',
    initialState:{
        userData: localStorage.getItem('token')?jwt_decode(localStorage.getItem('token')):null,
    },
    reducers: {
        signinUser: (state) =>{
            state.userData=jwt_decode(localStorage.getItem('token'));
            //console.log(state.userData);
        }
    },
    extraReducers(builder) {
        builder
          .addCase(logoutUser.fulfilled, (state, action) => {
            // Add any fetched posts to the array
            state.userData = null;
            localStorage.clear();
          })
          .addCase(logoutUser.rejected, (state, action) => {
            // state.isLoading = false;
            console.log(action.error.message);
          })
      }    
})



const { signinUser } = userSlice.actions

export {signinUser,logoutUser}
export default userSlice.reducer

