import { createApi } from "@reduxjs/toolkit/query";
import { baseQueryWithReauth } from "../store/RTKApiConfig";

export const authApiSlice = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
    })
});

// export { } = authApiSlice;
//query<returnType, argType>
// getUsers: builder.query({
//     // Accepts only single argument
//     query: (user) => `users/${user}`
// }),
// getUsers: builder.query({
//     query: (args) => {
//         // Destructuring Object
//         const { type, userNumber } = args;
//         return {
//             // Returns url with multiple args
//             url: `${type}/${userNumber}`
//         }
//     }
// }),
// updatePost: build.mutation<Post, Partial<Post>>({
//     query(data) {
//       const { id, ...body } = data
//       return {
//         url: `post/${id}`,
//         method: 'PUT',
//         body,
//       }
//     },