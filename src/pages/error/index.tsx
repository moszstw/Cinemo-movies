import { Link } from "react-router-dom";
import { ROUTE_PATH } from "router";

const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="text-6xl font-bold text-red-500">404</div>
        <div className="text-2xl text-gray-800">Page Not Found</div>
        <div className="py-3 text-blue-500 underline">
          <Link to={ROUTE_PATH.HOME}>Back to page</Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
