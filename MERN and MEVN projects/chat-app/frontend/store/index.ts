import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authSlice from './features/authSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    // blacklist: [pokemonApi.reducerPath],// for RTK query only
}

export const rootReducer = combineReducers({
    // [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
    //.concat(apiSlice.middleware),
});
export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;