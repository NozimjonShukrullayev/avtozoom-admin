import "./Navbar.css";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { FiLogOut, FiSettings, FiUsers } from "react-icons/fi";
import { GrLanguage } from "react-icons/gr";
import { useState } from "react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lngOpen, setLngOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setLngOpen(false);
  };

  // language dropdown
  const toggleLngDropdown = () => {
    setLngOpen(!lngOpen);
  };
  return (
    <div className="navbar-container">
      <div className="container">
        <div className="nav-texts">
          <h1>Profile</h1>
          <span>Home | Profile</span>
        </div>
        <div className="nav-icons">
          <div className="bars-container">
            <HiMiniBars3BottomRight
              className="icons"
              onClick={toggleDropdown}
            />
            {isOpen && (
              <>
                <div className="dropdown">
                  <div className="dropdown-items" onClick={toggleDropdown}>
                    <FiUsers className="icons dropdown-icons" />
                    <span>Edit Profile</span>
                  </div>
                  <div className="dropdown-items" onClick={toggleLngDropdown}>
                    <GrLanguage className="icons dropdown-icons" />
                    <span>Language</span>
                  </div>
                  <div className="dropdown-items" onClick={toggleDropdown}>
                    <FiLogOut className="icons dropdown-icons" />
                    <span>Logout</span>
                  </div>
                </div>
                {lngOpen && (
                  <div className="lng-dropdown">
                    <div className="lng-dropdown-items">
                      <span>English</span>
                    </div>
                    <div className="lng-dropdown-items">
                      <span>Russian</span>
                    </div>
                    <div className="lng-dropdown-items">
                      <span>Uzbek</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <FiSettings className="icons" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
