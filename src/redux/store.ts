import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./reducers/customerReducer";
import summaryReducer from "./reducers/summaryReducer";
import authReducer from "./reducers/authReducer";
export const store = configureStore({
  reducer: {
    customers: customerReducer,
    summary: summaryReducer,
    auth:authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
