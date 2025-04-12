import "./SideBar.css";
import { FaRegUserCircle } from "react-icons/fa";
import { MdBrandingWatermark, MdOutlineLocationCity } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { destroyToken } from "../../utils/token";

const sidebarItems = [
  { icon: <MdBrandingWatermark className="sidebar-icon" />, title: 'Brands', path: 'brands' },
  { icon: <MdBrandingWatermark className="sidebar-icon" />, title: 'Models', path: 'models' },
  { icon: <IoLocationSharp className="sidebar-icon" />, title: 'Locations', path: 'locations' },
  { icon: <MdOutlineLocationCity className="sidebar-icon" />, title: 'Cities', path: 'cities' },
  { icon: <FaCar className="sidebar-icon" />, title: 'Cars', path: 'cars' },
  { icon: <IoIosSettings className="sidebar-icon" />, title: 'Settings', path: 'settings' },
];

const SideBar = () => {
  return (
    <div className="sidebar-container">
      <div className="container">
        <div className="admin">
          <FaRegUserCircle className="admin-icon" />
          <h4>Admin</h4>
        </div>
        <div className="sidebar-items">

        {sidebarItems.map((item, index) => (
        <Link to={item.path} key={index} className="sidebar-item">
          {item.icon}
          <h4>{item.title}</h4>
        </Link>
      ))}
        <Link to={"/"} className="sidebar-item" onClick={() => destroyToken()}>
        <FiLogOut className="sidebar-icon" />
          <h4>Logout</h4>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
