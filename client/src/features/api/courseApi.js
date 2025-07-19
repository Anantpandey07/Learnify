import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const Course_API = "http://localhost:8000/api/v1/course/";

export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: Course_API,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: ({courseTitle, category}) =>({
                url: "",
                method: "POST",
                body: {courseTitle, category},
            })
        })
    })
})


export const {
    useCreateCourseMutation,

} = courseApi;