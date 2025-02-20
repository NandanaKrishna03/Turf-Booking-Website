import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserAuth: !!localStorage.getItem("userToken"), // Persist authentication
    user: JSON.parse(localStorage.getItem("userData")) || null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.isUserAuth = true;
            state.user = action.payload;
            localStorage.setItem("userToken", action.payload.token); // Store token
            localStorage.setItem("userData", JSON.stringify(action.payload)); // Store user info
        },
        clearUser: (state) => {
            state.isUserAuth = false;
            state.user = null;
            localStorage.removeItem("userToken");
            localStorage.removeItem("userData");
        },
    },
});

export const { saveUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
