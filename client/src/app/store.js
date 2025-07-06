import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authApi";
export const appStore = configureStore({
    reducer: rootReducer,
    // defaultMiddleware = dM
    middleware: (dM) => dM().concat(authApi.middleware)
})