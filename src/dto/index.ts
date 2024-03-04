import { MovieDTO, MovieResponse } from "types";

export const mapMovies = (prop: MovieResponse): MovieDTO[] => {
  const { movies } = prop;
  const dto = movies.map((movie) => ({ ...movie, favorite: false }));
  return dto;
};
