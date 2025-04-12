import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useLoginProps } from "./useLoginProps";
import "./login.css";

export const Login = () => {
  const {
    handleSubmit,
    error,
    setNumber,
    setPassword,
    handleToggle,
    icon,
    type,
  } = useLoginProps();

  return (
    <div className="login">
      <form className="login-form" action="#" onSubmit={handleSubmit}>
        <span className="login-title">Autozoom - Admin Panel</span>
        <div className="login-box">
          <input
            className="login-inp"
            type="text"
            placeholder="Phone Number"
            onChange={(e) => setNumber(e.target.value)}
          />
          <span className="login-icon">
            <MdOutlineEmail />
          </span>
        </div>

        <div className="login-box">
          <input
            className="login-inp"
            type={type}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="login-icon" onClick={handleToggle}>
            {icon ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <button className="login-btn" type="submit">
          Login
        </button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
};
