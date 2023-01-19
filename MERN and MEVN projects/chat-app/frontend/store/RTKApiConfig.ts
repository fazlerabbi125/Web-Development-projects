import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { logoutUser } from "./features/authSlice";
import { RootState } from ".";
import { Mutex } from "async-mutex";

export const SERVER_URL: string =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";


const mutex = new Mutex(); /*Create a new mutex. Using async-mutex to prevent multiple calls 
to '/refreshToken' when multiple calls fail with 403 Forbidden errors.
*/

const baseQuery = fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        headers.set('Authentication', state.auth.accessToken || "")
        return headers;
    }
});

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 403) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery(
                    "/refreshToken",
                    api,
                    extraOptions
                );
                if (refreshResult.data) {
                    api.dispatch(tokenReceived(refreshResult.data));
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logoutUser());
                }
            } finally {
                // release must be called once the mutex should be released again.
                release();
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};
