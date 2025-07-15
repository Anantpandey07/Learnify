import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authApi";


export const appStore = configureStore({
    reducer: rootReducer,
    // defaultMiddleware = dM
    middleware: (dM) => dM().concat(authApi.middleware)
});

// You're manually dispatching an RTK Query loadUser endpoint call using Redux Toolkit’s store.dispatch. This is often used when you want to:
// Preload data (e.g., user info on app startup)
// Bypass React hooks (e.g., useLoadUserQuery) and use the store directly
// Trigger API calls globally, not tied to a component

// loadUser is defined in authApi slice

//  What is this method called?
// 🔹 Manual Store Rehydration or
// 🔹 App Initialization with Preloading
// 🔹 Preloading Redux State on App Start

const initialisedApp = async() =>{
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, {forceRefetch: true}))
}

initialisedApp();

// appStore.dispatch(...): You are manually dispatching an action to the Redux store.
// authApi.endpoints.loadUser.initiate(...): This manually calls the RTK Query endpoint loadUser, as defined in your authApi slice.
// {}: This would be the payload/body/params if loadUser accepts any. Here, it's empty.
// { forceRefetch: true }: Forces the query to bypass cache and make a fresh request to the server, even if the data is already in the store.