import Error from "pages/error";
import Home from "pages/home";
import Login from "pages/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export enum ROUTE_PATH {
  "LOGIN" = "/login",
  "HOME" = "/",
  "CINEMO" = "/cinemo",
  "ERROR" = "*",
}

const RouterComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTE_PATH.LOGIN} element={<Login />} />
        <Route path={ROUTE_PATH.HOME} element={<Home />} />
        <Route path={ROUTE_PATH.CINEMO} element={<Home />} />
        <Route path={ROUTE_PATH.ERROR} element={<Error />} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;
