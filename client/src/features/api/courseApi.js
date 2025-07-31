import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const Course_API = "http://localhost:8000/api/v1/course/";

export const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes:['Refetch_Course'], // for refetching data on courseTable on addition of new course
    // Automatically refetch or invalidate specific API cache data when a mutation (like POST, PUT, DELETE) changes related data.
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
            }),
            invalidatesTags: ['Refetch_Course'], 
        }),
        getCreatorCourse: builder.query({
            query: () => ({
                url: "",
                method: "GET"
            }),
            providesTags: ['Refetch_Course'], 
        }),
        editCourse :builder.mutation({
            query: ({formData, courseId}) => ({
                url: `/${courseId}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ['Refetch_Course'],
        }),
        getCourseById: builder.query({
            query: (courseId) => ({
                url: `/${courseId}`,
                method: "GET",
            })
        }),
        lectureCreate: builder.mutation({
            query: ({lectureTitle, courseId}) => ({
                url: `/${courseId}/lecture`,
                method: "POST",
                body: {lectureTitle}
            })
        }),
        getCourseLecture: builder.query({
            query: (courseId) => ({
                url: `/${courseId}/lecture`,
                method: "GET",
            })
        }),
    })
})

// "RTK Query allows cache-aware data fetching using tagTypes.
// I assign tags to queries using providesTags, and then when a mutation like POST occurs, 
// I use invalidatesTags to mark that tag as old. RTK Query then refetches any queries
// that were associated with that tag, helping keep the UI in sync automatically."


export const {
    useCreateCourseMutation,
    useGetCreatorCourseQuery,
    useEditCourseMutation,
    useGetCourseByIdQuery,
    useLectureCreateMutation,
    useGetCourseLectureQuery,
} = courseApi;