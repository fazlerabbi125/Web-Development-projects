import { createApi } from "@reduxjs/toolkit/query";
import { baseQueryWithReauth } from "../store/RTKApiConfig";

export const authApiSlice = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
    })
});

// export { } = authApiSlice;