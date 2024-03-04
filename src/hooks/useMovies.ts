import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "context/store";
import { fetchMovies } from "context/movie/slice";

export const useMovies = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const {
    data: movies,
    favorites,
    status,
    error,
  } = useSelector((state: RootState) => state.moviesReducer);
  useEffect(() => {
    if (movies.length === 0) {
      dispatch(fetchMovies());
    }
  }, [dispatch]);

  return { movies, favorites, status, error };
};
