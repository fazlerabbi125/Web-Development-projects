import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query'
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { tokenReceived, logoutUser } from './authSlice'
import { Mutex } from 'async-mutex'

// create a new mutex
const mutex = new Mutex()
const baseQuery = fetchBaseQuery({ baseUrl: '/' })
const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                const refreshResult = await baseQuery(
                    '/refreshToken',
                    api,
                    extraOptions
                )
                if (refreshResult.data) {
                    api.dispatch(tokenReceived(refreshResult.data))
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions)
                } else {
                    api.dispatch(logoutUser())
                }
            } finally {
                // release must be called once the mutex should be released again.
                release()
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
}

//query = GET, mutations = POST,PATCH,PUT, DELETE