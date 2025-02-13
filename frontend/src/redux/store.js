import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import managerReducer from "./features/managerSlice"; // ✅ Ensure this is imported
import adminReducer from "./features/adminSlice"; 
export const store = configureStore({
    reducer: {
        user: userReducer,
        manager: managerReducer, 
        admin: adminReducer,
    },
});
