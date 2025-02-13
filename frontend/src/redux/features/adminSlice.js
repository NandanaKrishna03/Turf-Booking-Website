import { createSlice } from "@reduxjs/toolkit";

// Load admin data from localStorage if available
const storedAdmin = JSON.parse(localStorage.getItem("admin")) || null;
const storedAuth = storedAdmin ? true : false;

const initialState = {
    isAdminAuth: storedAuth,
    admin: storedAdmin,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        saveAdmin: (state, action) => {
            state.isAdminAuth = true;
            state.admin = action.payload;
            localStorage.setItem("admin", JSON.stringify(action.payload));
        },
        clearAdmin: (state) => {
            state.isAdminAuth = false;
            state.admin = null;
            localStorage.removeItem("admin"); // ✅ Remove admin data from localStorage
        },
        updateAdminProfile: (state, action) => {
            if (state.admin) {
                state.admin = { ...state.admin, ...action.payload };
                localStorage.setItem("admin", JSON.stringify(state.admin)); // ✅ Update admin data in localStorage
            }
        }
    },
});

export const { saveAdmin, clearAdmin, updateAdminProfile } = adminSlice.actions;
export default adminSlice.reducer;
