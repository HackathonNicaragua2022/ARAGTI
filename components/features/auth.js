import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authState: 'signIn',
    userToken: null,
    isloading: true,
    isSignout: false
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        restoreToken: (state, action) => {
            state.userToken = action.payload;
            state.isloading = false;
        },
        signIn:(state,action) => {
            state.isSignout = false;
            state.userToken = action.payload;
        },
        signOut: (state, action) =>{
            state.isSignout = true;
            state.userToken = null;
        },
        setAuthState: (state, action) => {
            state.authState = action.payload;
        }
    },
});

export const { restoreToken, signIn, signOut, setAuthState } = authSlice.actions;
export default authSlice.reducer;