import { createApi } from "@reduxjs/toolkit/query";
import { baseQueryWithReauth } from "../store/RTKApiConfig";

export const chatApiSlice = createApi({
    reducerPath: "chatApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
    })
});

// export { } = chatApiSlice;