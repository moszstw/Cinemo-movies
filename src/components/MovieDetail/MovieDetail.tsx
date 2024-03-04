import { Diversity1TwoTone } from "@mui/icons-material";
import { Container } from "@mui/material";
import { formatDate } from "common";
import React, { memo } from "react";
import { MovieDTO } from "types";

type MovieDetailType = {
  movie: MovieDTO;
};
const MovieDetail = ({ movie }: MovieDetailType) => {
  return (
    <Container maxWidth="lg">
      <div className="grid grid-cols-1 md:flex py-4">
        <div className="md:flex md:flex-[1_1_40%] items-center">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <img
                src={movie.poster_url}
                alt={movie.title_en}
                className="w-full h-auto transition-transform transform rounded-lg max-w-[200px]"
              />
            </div>
            <div className="text-white">
              <div className="font-bold text-yellow-500">
                {formatDate(movie.release_date)}
              </div>
              <b>{movie.title_th}</b>
              <div>
                <small className="text-gray-300">
                  {movie.genre.replace(/\//g, ", ")}
                </small>
              </div>
              <div>
                <b className="underline">นำแสดงโดย</b>
                <p>
                  <small className="text-gray-300">
                    {movie.actor.replace(/\//g, ", ")}
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex md:flex-[1_1_60%] md:flex-col md:gap-3 items-center">
          <iframe src={movie.tr_mp4} width={500} height={300} />
          <div className="text-white">
            <b className="underline">เรื่องย่อ</b>
            <p className="indent-4 overflow-hidden line-clamp-5">
              {movie.synopsis_th}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default memo(MovieDetail);
