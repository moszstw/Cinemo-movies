import { Chip, Skeleton } from "@mui/material";
import { formatDate } from "common";
import { StatusType } from "context/movie/slice";
import React, { memo } from "react";
import { MovieDTO } from "types";
import FavoriteIcon from "@mui/icons-material/Favorite";

type MovieCardType = {
  movie: MovieDTO;
  status: StatusType;
  onClickFavorite: (id: number) => void;
  onClickSeeDetail: (movie: MovieDTO) => void;
};

const MovieCard = ({
  movie,
  status,
  onClickFavorite,
  onClickSeeDetail,
}: MovieCardType) => {
  const handleClickFavorite = () => {
    onClickFavorite?.(movie.id);
  };
  const handleClickSeeDetail = () => {
    onClickSeeDetail?.(movie);
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="relative mx-auto group">
        {status === "pending" ? (
          <div>
            <Skeleton
              variant="rectangular"
              height={250}
              className="min-w-[168px] max-w-[168px]"
            />
          </div>
        ) : (
          <img
            src={movie.poster_url}
            alt={movie.title_en}
            className="w-full h-auto transition-transform transform rounded-lg max-h-[260px]"
          />
        )}
        <div className="absolute right-2 top-0 z-50">
          <p
            className={`${
              movie.favorite ? "text-red-500" : "text-white"
            } cursor-pointer`}
            onClick={handleClickFavorite}
          >
            <FavoriteIcon />
          </p>
        </div>
        <div className="absolute inset-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-lg">
          <div
            className="text-center text-white justify-center cursor-pointer w-full hover:text-blue-600"
            onClick={handleClickSeeDetail}
          >
            See Detail
          </div>
        </div>
      </div>
      <div className="w-full">
        {status !== "pending" ? (
          <div className="flex flex-col justify-center items-center gap-1 py-1">
            <div className="font-bold text-yellow-500">
              {formatDate(movie.release_date)}
            </div>
            <div className="text-gray-600">{movie.title_th}</div>
            <div className="text-gray-400  select-none">
              <Chip label={`${movie.duration} นาที`} />
            </div>
          </div>
        ) : (
          <div>
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(MovieCard);
