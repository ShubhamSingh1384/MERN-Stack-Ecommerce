import { createAsyncThunk, createSlice }  from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    isAuthenticated : false,
    isLoading : false,
    user : null,
}

export const registerUser = createAsyncThunk('/auth/signup', 
    async(formData) =>{
        // console.log("this is : " , formData);
        const response = await axios.post('http://localhost:5000/api/auth/signup', formData, {
            withCredentials: true,
        });
        // console.log(response.data);
        return response.data;
    }
)

export const loginUser = createAsyncThunk('/auth/login',
    async(formData) =>{
        const response = await axios.post('http://localhost:5000/api/auth/login', formData, {
            withCredentials: true,
        })
        console.log(response.data);
        return response.data;
    }
)






const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser:(state, action)=>{

        }
    },
    extraReducers: (builder) =>{
        builder.addCase(registerUser.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(registerUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase(registerUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })

        .addCase(loginUser.pending, (state)=>{
            
        })
    }
})


export const {setUser} = authSlice.actions;
export default authSlice.reducer;