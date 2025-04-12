import { Link } from "react-router-dom";
import "./NotFound.css";

export const NotFoundError = () => {
  return (
    <div className="found">
      <h1 className="found-title">404 </h1>
      <p className="found-text">Page Not Found</p>
      <Link to="/" className="found-home-link">Home</Link>
    </div>
  );
};
