import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isManagerAuth: false,
    manager: null,
};

const managerSlice = createSlice({
    name: "manager",
    initialState,
    reducers: {
        saveManager: (state, action) => {
            state.isManagerAuth = true;
            state.manager = action.payload;
        },
        clearManager: (state) => {
            state.isManagerAuth = false;
            state.manager = null;
        },
    },
});

export const { saveManager, clearManager } = managerSlice.actions;
export default managerSlice.reducer;
