// store.ts

import { configureStore } from "@reduxjs/toolkit";
import autozumadminReducer from "./autozumadminSlice";
const store = configureStore({
  reducer: {
    autozum: autozumadminReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
