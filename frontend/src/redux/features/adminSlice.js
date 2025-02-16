import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAdminAuth: false,
    admin: null,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        saveAdmin: (state, action) => {
            state.isAdminAuth = true;
            state.admin = action.payload;
        },
        clearAdmin: (state) => {
            state.isAdminAuth = false;
            state.admin = null;
        },
    },
});

export const { saveAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;