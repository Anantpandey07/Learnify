import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

const USER_API = "http://localhost:8000/api/v1/user/";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        registerUser : builder.mutation({
            query: (inputData) => ({
                url: "register",
                method: "POST",
                body: inputData
            })
        }),
        loginUser : builder.mutation({
            query: (inputData) => ({
                url: "login",
                method: "POST",
                body: inputData
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    const res = await queryFulfilled;
                    dispatch(userLoggedIn({user: res.data.user}))
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        logOutUser: builder.mutation({
            query: () =>({
                url: "logout",
                method: "GET",
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        loadUser : builder.query({
            query : () =>({
                url: "profile",
                method: "GET"
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    const res = await queryFulfilled;
                    dispatch(userLoggedIn({user: res.data.user}))
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        updateUser: builder.mutation({
            query: (formData) => ({
                url : "profile/update",
                method: "PUT",
                body: formData,
            })
        })
    }),
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLoadUserQuery,
    useLogOutUserMutation,
    useUpdateUserMutation,
} = authApi;