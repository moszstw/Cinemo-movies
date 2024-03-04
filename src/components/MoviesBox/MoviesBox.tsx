import {
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import { StatusType } from "context/movie/slice";
import SearchIcon from "@mui/icons-material/Search";
import { MovieDTO } from "types";
import MovieCard from "components/MovieCard";
import InboxIcon from "@mui/icons-material/Inbox";
import { memo } from "react";

type MoviesBoxType = {
  status: StatusType;
  data: MovieDTO[];
  onSearchText: (text: string) => void;
  onClickFavorite: (id: number) => void;
  onClickSeeDetail: (movie: MovieDTO) => void;
};

const MoviesBox = ({
  status,
  onSearchText,
  data,
  onClickFavorite,
  onClickSeeDetail,
}: MoviesBoxType) => {
  const handleSearchText: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const { value } = event.target;
    onSearchText?.(value);
  };
  const handleClickFavorite = (prop: number) => {
    onClickFavorite?.(prop);
  };

  const handleClickSeeDetail = (movie: MovieDTO) => {
    onClickSeeDetail?.(movie);
  };

  return (
    <div>
      {status === "pending" ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <div className="flex w-full">
            <TextField
              variant="outlined"
              fullWidth
              id="search"
              name="search"
              autoFocus
              onChange={handleSearchText}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          {data.length > 0 ? (
            <div className="grid grid-cols-1 py-5 my-2 gap-1 border rounded-lg min-h-screen bg-white md:grid-cols-4 min-[320px]:grid-cols-2">
              {data.map((movie: MovieDTO, index) => (
                <div className="max-w-[200px]" key={index}>
                  <MovieCard
                    movie={movie}
                    status={status}
                    onClickSeeDetail={handleClickSeeDetail}
                    onClickFavorite={handleClickFavorite}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full min-h-screen">
              <div className="text-[20px] text-center text-gray-500">
                <InboxIcon style={{ fontSize: "50px" }} />
                <p>Empty Box</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(MoviesBox);
