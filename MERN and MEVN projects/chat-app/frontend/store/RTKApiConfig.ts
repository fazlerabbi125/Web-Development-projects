import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query";
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

/*Create a new mutex. Using async-mutex to prevent multiple calls 
to '/refreshToken' when multiple calls fail with 403 Forbidden errors.
*/
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        headers.set("Authentication", state.auth.accessToken || "");
        return headers;
    },
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
                    // api.dispatch(tokenReceived(refreshResult.data));
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

// query = Retrieve (GET), mutation = CRUD (mainly Update, Delete, Create).
// providesTags only for query (as it is cached, no auto-refetch) and invalidatesTags only for mutation (remove cache and auto-refetch data).
//https://redux-toolkit.js.org/rtk-query/usage/cache-behavior
//https://redux-toolkit.js.org/rtk-query/usage/automated-refetching

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    tagTypes: [],
    endpoints: (builder) => ({
        /*
            Query:
            getPostList:builder.query<returnType, argType>({
                query: (arg) => ({ url: `` }) or `/sth`,
                transformResponse: (response: { data: Post }, meta, arg) => response.data,
                // Pick out errors and prevent nested properties in a hook or selector
                transformErrorResponse: (
                    response: { status: string | number },
                    meta,
                    arg
                ) => response.status,
                providesTags: (result, error, id) => [{ type: 'Post', id }],
                // The 2nd parameter is the destructured `QueryLifecycleApi`
                async onQueryStarted(
                    arg,
                    {
                    dispatch,
                    getState,
                    extra,
                    requestId,
                    queryFulfilled,
                    getCacheEntry,
                    updateCachedData,
                    }
                ) {},
                // The 2nd parameter is the destructured `QueryCacheLifecycleApi`
                async onCacheEntryAdded(
                    arg,
                    {
                    dispatch,
                    getState,
                    extra,
                    requestId,
                    cacheEntryRemoved,
                    cacheDataLoaded,
                    getCacheEntry,
                    updateCachedData,
                    }
                ) {},
                }),
            })
    
            //                  ResultType  QueryArg
            //                       v       v
            // getPost: builder.query<Post, number>({
            // inferred as `number` from the `QueryArg` type
            //     query: (id) => `post/${id}`,
            //     // An explicit type must be provided to the raw result that the query returns
            //     // when using `transformResponse`
            //     //                             v
            //     transformResponse: (rawResult: { result: { post: Post } }, meta) => {
            //         //                                                        ^
            //         // The optional `meta` property is available based on the type for the `baseQuery` used
    
            //         // The return value for `transformResponse` must match `ResultType`
            //         return rawResult.result.post
            //     },
            // }),
    
            // getUser: builder.query({
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
    
            Mutation
            // updatePost: build.mutation<Post, Partial<Post>>({
            //     query(data) {
            //       const { id, ...body } = data
            //       return {
            //         url: `post/${id}`,
            //         method: 'PUT',
            //         body,
            //       }
            // },
    
            updatePost: build.mutation<Post, Partial<Post> & Pick<Post, 'id'>>({
            // note: an optional `queryFn` may be used in place of `query`
            query: ({ id, ...patch }) => ({
                url: `post/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            // Pick out data and prevent nested properties in a hook or selector
            transformResponse: (response: { data: Post }, meta, arg) => response.data,
            // Pick out errors and prevent nested properties in a hook or selector
            transformErrorResponse: (
                response: { status: string | number },
                meta,
                arg
            ) => response.status,
            invalidatesTags: ['Post'],
            // onQueryStarted is useful for optimistic updates
            // The 2nd parameter is the destructured `MutationLifecycleApi`
            async onQueryStarted(
                arg,
                { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
            ) {},
            // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
            async onCacheEntryAdded(
                arg,
                {
                dispatch,
                getState,
                extra,
                requestId,
                cacheEntryRemoved,
                cacheDataLoaded,
                getCacheEntry,
                }
            ) {},
            }),
        }),
            */
    }),
});

export default apiSlice;
