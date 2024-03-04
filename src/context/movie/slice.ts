import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieDTO } from "types";
import { getMovies } from "service";

export type StatusType = "idle" | "pending" | "succeeded" | "failed";

interface MoviesState {
  data: MovieDTO[];
  favorites: MovieDTO[];
  status: StatusType;
  error: string | null;
}

const initialState: MoviesState = {
  data: [],
  favorites: [],
  status: "idle",
  error: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  return await getMovies();
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<MovieDTO[]>) => {
      state.data = action.payload;
    },
    updateMovies: (state, action: PayloadAction<MovieDTO>) => {
      const updatedMovie = action.payload;
      const index = state.data.findIndex(
        (movie) => movie.id === updatedMovie.id
      );
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...updatedMovie };
      }
    },
    addFavorite: (state, action: PayloadAction<MovieDTO>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        const movies = action.payload;
        state.data = movies;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export const { setMovies, addFavorite, removeFavorite, updateMovies } =
  moviesSlice.actions;
export default moviesSlice.reducer;
