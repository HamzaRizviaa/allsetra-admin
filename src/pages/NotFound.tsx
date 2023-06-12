import { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <div>
      <h1>Page not found</h1>
      <Link to="/" style={{ color: "blue" }}>
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;
