import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app/appSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),

    devTools: process.env.NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
