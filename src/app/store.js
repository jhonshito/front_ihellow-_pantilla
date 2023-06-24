import { configureStore } from "@reduxjs/toolkit"
import { apiSplice } from "../api/apiSplice";
import settingReducer from "../store/setting/reducers";


const store = configureStore({
    reducer: {
        [apiSplice.reducerPath]: apiSplice.reducer,
        setting: settingReducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        apiSplice.middleware,
        // additional middleware goes here
    ],
});

export default store;
