import {configureStore} from '@reduxjs/toolkit'
import {mainApi} from "./apiSlice";

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [mainApi.reducerPath]: mainApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(mainApi.middleware),
})