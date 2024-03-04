import { MovieDTO, MovieResponse } from "types";
import { apiRequest } from "./axiosInstance";
import { mapMovies } from "dto";

export const getMovies = async () => {
  try {
    const response = await apiRequest<MovieResponse>({
      method: "get",
      url: "/get_movie_avaiable",
    });
    const dtoMovies: MovieDTO[] = mapMovies(response.data);
    return dtoMovies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
