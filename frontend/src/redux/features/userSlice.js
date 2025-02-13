import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserAuth: false,
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.isUserAuth = true;
            state.user = action.payload;
        },
        clearUser: (state) => {  // ✅ Define and export `clearUser`
            state.isUserAuth = false;
            state.user = null;
        },
    },
});

export const { saveUser, clearUser } = userSlice.actions; // ✅ Ensure `clearUser` is exported
export default userSlice.reducer;
