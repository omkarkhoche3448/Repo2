import { configureStore } from "@reduxjs/toolkit"
import jobsReducer from "./slices/jobsSlice"
import filterReducer from "./slices/filterSlice"

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    filters: filterReducer,
  },
})

