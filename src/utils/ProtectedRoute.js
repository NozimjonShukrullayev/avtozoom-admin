import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectRoute = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      return navigate("/");
    }
  }, [navigate, token]);

  return props.children;
};

export default ProtectRoute;