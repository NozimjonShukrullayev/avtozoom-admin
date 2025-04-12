import { FaSearch } from "react-icons/fa";
import "./Brands.css";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

const Brands = () => {
  // const [data, setData] = useState([]);
  const [openAddModal, setOpenAddModal] = useState("");

  const handleAddModal = () => {
    setOpenAddModal(!openAddModal);
  };

  return (
    <>
      <ToastContainer />
      <div className="brand">
        <div className="brand-wapper">
          <div className="brand-top">
            <form className="brand-form">
              <FaSearch className="brand-icon" />
              <input
                className="brand-input"
                type="text"
                placeholder="Search Cities"
              />
            </form>
            <button onClick={handleAddModal} className="brand-btn">
              Add brand
            </button>
          </div>
          <div>
            <table className="brand-table">
              <thead>
                <tr className="brand-row">
                  <th>Name</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* {data.map((element, index) => (
                  <>
                    <tr key={index}>
                      <td>{element.name}</td>
                      <td>
                        <img src={element.image_src} alt="" />
                      </td>
                      <td>
                        <button className="brands-edit_btn">Edit</button>
                        <button className="brands-delete_btn">Delete</button>
                      </td>
                    </tr>
                  </>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Brands;
