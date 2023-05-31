import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import rootReducer from "./features/rootReducer";
import rootRTKQuery from "./features/rootRTKQuery";

export const store = configureStore({
  reducer: { rootReducer, [rootRTKQuery.reducerPath]: rootRTKQuery.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootRTKQuery.middleware),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
