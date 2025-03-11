import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAdminAuth: localStorage.getItem("isAdminAuth") === "true" || false,
    admin: JSON.parse(localStorage.getItem("admin")) || null,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        saveAdmin: (state, action) => {
            state.isAdminAuth = true;
            state.admin = action.payload;
            localStorage.setItem("isAdminAuth", "true");
            localStorage.setItem("admin", JSON.stringify(action.payload));
        },
        clearAdmin: (state) => {
            state.isAdminAuth = false;
            state.admin = null;
            localStorage.removeItem("isAdminAuth");
            localStorage.removeItem("admin");
        },
    },
});

export const { saveAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;
