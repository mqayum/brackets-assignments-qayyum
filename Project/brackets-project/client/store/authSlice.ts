import {createSlice} from "@reduxjs/toolkit"
import {TAuthState} from "../types/types";


const initialState : TAuthState = {
    isAuthenticated: false,
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.isAuthenticated = action.payload
        }
    }
})

export const {setAuth} = authSlice.actions
export default authSlice.reducer