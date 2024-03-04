import { RootState } from "context/store";
import { User, logOut, setUser } from "context/user/slice";
import { useDispatch, useSelector } from "react-redux";

export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userReducer.user);

  const setUserHandler = (user: User | null) => {
    dispatch(setUser(user));
    if (user?.keepLoggedin) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  };

  const logOutHandler = () => {
    dispatch(logOut());
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  };

  return {
    user,
    setUser: setUserHandler,
    logOut: logOutHandler,
  };
};
