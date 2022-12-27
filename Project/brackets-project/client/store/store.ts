import {configureStore, combineReducers } from "@reduxjs/toolkit"
import {persistReducer, persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage"
import authReducer from "./authSlice"
import {userApi} from "../api/userApi";
import {spApi} from "../api/spApi";
import {productsApi} from "../api/productsApi";

import {setupListeners} from "@reduxjs/toolkit/query";

const combinedReducer = combineReducers({
    [userApi.reducerPath] : userApi.reducer,
    [spApi.reducerPath] : spApi.reducer,
    [productsApi.reducerPath] : productsApi.reducer,
    auth: authReducer
})

const persistConfig = {
    key: "root",
    whitelist:["auth"], //only auth will be persisted
    storage
}
const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({

    reducer: persistedReducer,

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([userApi.middleware, spApi.middleware, productsApi.middleware])
})

export const persistor = persistStore(store);

// Added to enable refetchOnFocus for RTK Query
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

