import { configureStore } from "@reduxjs/toolkit";
import { wathcedMovieSlice } from "../redux/movie-list.slice";

export const store = configureStore({
  reducer: {
    wathcedMovies: wathcedMovieSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch