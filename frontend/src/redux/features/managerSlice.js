import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isManagerAuth: !!localStorage.getItem("managerToken"),
    manager: JSON.parse(localStorage.getItem("managerData")) || null,
};

const managerSlice = createSlice({
    name: "manager",
    initialState,
    reducers: {
        saveManager: (state, action) => {
            state.isManagerAuth = true;
            state.manager = action.payload;
            localStorage.setItem("managerToken", action.payload.token);
            localStorage.setItem("managerData", JSON.stringify(action.payload));
        },
        clearManager: (state) => {
            state.isManagerAuth = false;
            state.manager = null;
            localStorage.removeItem("managerToken");
            localStorage.removeItem("managerData");
        },
    },
});

export const { saveManager, clearManager } = managerSlice.actions;
export default managerSlice.reducer;
