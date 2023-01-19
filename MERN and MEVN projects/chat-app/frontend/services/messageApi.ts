import { createApi } from "@reduxjs/toolkit/query";
import { baseQueryWithReauth } from "../store/RTKApiConfig";

export const messageApiSlice = createApi({
    reducerPath: "messageApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
    })
});

// export { } = messageApiSlice;