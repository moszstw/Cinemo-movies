import { Avatar, Backdrop, Container, ListItem, Modal } from "@mui/material";
import { useMovies } from "hooks/useMovies";
import { useUser } from "hooks/useUser";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { useCallback, useMemo, useState } from "react";
import popIcon from "media/img/popcorn-icon.png";
import MenuList from "components/MenuList";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MovieDTO } from "types";
import { useDispatch } from "react-redux";
import { addFavorite, removeFavorite, updateMovies } from "context/movie/slice";
import MoviesBox from "components/MoviesBox";
import MovieDetail from "components/MovieDetail/MovieDetail";

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState<MovieDTO>({} as MovieDTO);
  const [currentSelected, setCurrentSelected] = useState<string>("Home");
  const [searchText, setSearchText] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const { movies, status, favorites } = useMovies();
  const { logOut, user } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const moviesMemo: MovieDTO[] = useMemo(() => {
    const filteredMovies = currentSelected === "Home" ? movies : favorites;

    return filteredMovies.filter(
      (movie) =>
        movie.title_en.toLowerCase().includes(searchText.toLowerCase()) ||
        movie.title_th.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [movies, favorites, currentSelected, searchText]);

  const handleLogout = useCallback(() => {
    logOut();
    navigate("/login");
  }, [logOut, navigate]);

  const handleLogIn = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const handleUpdateCurrentSelected = useCallback(
    (prop: string) => {
      setCurrentSelected(prop);
    },
    [setCurrentSelected]
  );

  const handleClickFavorite = useCallback(
    (id: number) => {
      const selectedMovie = movies.find((movie) => movie.id === id);
      if (!selectedMovie) return;

      if (favorites.some((favMovie) => favMovie.id === selectedMovie.id)) {
        const updateFavorite = { ...selectedMovie, favorite: false };
        dispatch(updateMovies(updateFavorite));
        dispatch(removeFavorite(updateFavorite.id));
      } else {
        const updateFavorite = { ...selectedMovie, favorite: true };
        dispatch(updateMovies(updateFavorite));
        dispatch(addFavorite(updateFavorite));
      }
    },
    [movies, favorites, dispatch]
  );

  const handleSearchText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const handleClickSeeDetail = useCallback((movie: MovieDTO) => {
    handleOpen();
    setSelectedMovie(movie);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row h-full bg-gray-100 min-h-screen">
      <div className="flex-[1_1_20%] min-h-full border-r-2 border-r-gray-200 text-[13px]">
        <div className="h-full">
          <div className="flex items-center w-full gap-1 p-2 m-2">
            <div>
              <img src={popIcon} className="max-h-[40px]" />
            </div>
            <div className="font-bold text-gray-600">Cinemo Movies</div>
          </div>
          {user && (
            <ListItem>
              <div className="flex items-center gap-2 bg-gray-200 p-2 rounded-md w-full">
                <Avatar>
                  <PersonIcon />
                </Avatar>
                <b className="select-none text-gray-600">{user?.username}</b>
              </div>
            </ListItem>
          )}
          <MenuList
            currentSelected={currentSelected}
            menuTitle="Home"
            onClickCurrentSelected={handleUpdateCurrentSelected}
            icon={LocalMoviesIcon}
          />
          <MenuList
            currentSelected={currentSelected}
            menuTitle="Favorite"
            onClickCurrentSelected={handleUpdateCurrentSelected}
            icon={FavoriteIcon}
          />
          <div>
            {user ? (
              <div
                className="m-5 p-2 rounded-md text-red-500 text-[13px] cursor-pointer"
                onClick={handleLogout}
              >
                <div className="flex items-center gap-2 px-2">
                  <LogoutIcon />
                  Logout
                </div>
              </div>
            ) : (
              <div
                className="m-5 p-2 rounded-md text-blue-500 text-[13px] cursor-pointer"
                onClick={handleLogIn}
              >
                <div className="flex items-center gap-2 px-1">
                  <LoginIcon />
                  LogIn
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-[1_1_80%]">
        <Container maxWidth="lg" className="py-2">
          <MoviesBox
            status={status}
            data={moviesMemo}
            onSearchText={handleSearchText}
            onClickFavorite={handleClickFavorite}
            onClickSeeDetail={handleClickSeeDetail}
          />
          <Modal open={open} onClose={handleClose} closeAfterTransition>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleClose}
            >
              <MovieDetail movie={selectedMovie} />
            </Backdrop>
          </Modal>
        </Container>
      </div>
    </div>
  );
};

export default Home;
