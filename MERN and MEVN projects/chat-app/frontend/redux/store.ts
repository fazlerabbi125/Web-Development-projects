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
import { createWrapper, Context } from 'next-redux-wrapper';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    // blacklist: [pokemonApi.reducerPath],// for RTK query only as data caching may cause issues if persisted
}

export const rootReducer = combineReducers({
    // [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice.reducer,
});
// Infer the `RootState` type from the store itself
// Use for export type RootState = ReturnType<typeof store.getState> for only redux
export type RootState = ReturnType<typeof rootReducer> //Used as redux-persist used
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer)

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
const makeStore = (context: Context) => store;
export const nextJSReduxwrapper = createWrapper<typeof store>(makeStore, { debug: false });

// Inferred `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch

export default store;