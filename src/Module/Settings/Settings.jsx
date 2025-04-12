import { useEffect, useState } from "react";
import "./Settings.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Circles } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
const Settings = () => {
  const [EN, setEN] = useState("");
  const [RU, setRU] = useState("");
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editedNameEN, setEditedNameEN] = useState("");
  const [editedNameRU, setEditedNameRU] = useState("");
  const [editedImages, setEditedImages] = useState([]);
  const [prevImage, setPrevImage] = useState("");
  const [loading, setLoading] = useState(true);

  const imgUrl = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleENChange = (e) => {
    setEN(e.target.value);
  };
  const handleRUChange = (e) => {
    setRU(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   post qismi uchun
  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    try {
      const formData = await new FormData();
      formData.append("name_en", EN);
      formData.append("name_ru", RU);
      images.forEach((image) => {
        formData.append("images", image);
      });
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "https://autoapi.dezinfeksiyatashkent.uz/api/categories",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        toast.success("Kategoriya muvaffaqiyatli yaratildi", {
          autoClose: 2000,
        });
        fetchData();
        setEN("");
        setRU("");
        setImages([]);
      } else {
        toast.error("Kategoriya yaratib bo'lmadi", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("error creating category", error);
    }
  };

  // get qismi uchun
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "https://autoapi.dezinfeksiyatashkent.uz/api/categories",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setData(data?.data);
        setLoading(false);
      } else {
        console.log("Ma'lumotlarni olib bo'lmadi");
      }
    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  //   edit qismi dagi malumot olish uchun get qismi
  const handleGetEditCategory = async (id) => {
    handleOpenModal();
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        // name lar uchun
        setEditedNameEN(data?.data?.name_en);
        setEditedNameRU(data?.data?.name_ru);
        // images uchun
        setPrevImage(imgUrl + data?.data?.image_src);
        // id ni localstorage ga saqlash
        localStorage.setItem("selectedId", id);
      } else {
        console.log("Ma'lumotlarni olib bo'lmadi");
      }
    } catch (error) {
      console.error("error editing category", error);
    }
  };
  // edit qismida PUT uchun
  const handleUploadCategory = async (e) => {
    e.preventDefault();
    try {
      const id = localStorage.getItem("selectedId");
      const formData = new FormData();
      formData.append("name_en", editedNameEN);
      formData.append("name_ru", editedNameRU);
      if (editedImages.length > 0) {
        editedImages.forEach((image) => {
          formData.append("images", image);
        });
      } else {
        formData.append("image_src", prevImage.replace(imgUrl, ""));
      }
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        toast.success("Malumot muvaffaqqiyatli o'zgartirildi!", {
          autoClose: 2000,
        });
        fetchData();
        handleOpenModal(false);
      } else {
        toast.error("Kategoriyani yangilab bo'lmadi", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Kategoriyani yangilashda xato", error);
    }
  };

  //   delete uchun
  const handleDeleteCategory = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 500) {
        toast.error("Kategoriyani o'chirishda xatolik yuz berdi", {
          autoClose: 2000,
        });
      } else {
        fetchData();
        toast.success("Malumot muvaffaqqiyatli o'chirildi!", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("error deleting category", error);
    }
  };

  return (
    <>
      <ToastContainer />
      {loading ? (
        <div className="loading-container">
          <Circles color="#00BFFF" size={100} />
        </div>
      ) : (
        <>
          <div className="settings-container">
            <div className="settings-card">
              <form
                action=""
                className="settings-form"
                onSubmit={handleSubmitCategory}
              >
                <h2>Kategoriya yaratish</h2>
                <div className="form-items">
                  <div className="form-item">
                    <label htmlFor="">Kategoriya nomi - EN</label>
                    <input
                      type="text"
                      value={EN}
                      onChange={handleENChange}
                      placeholder="Kategoriya nomi - EN"
                      required
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="">Kategoriya nomi - RU</label>
                    <input
                      type="text"
                      value={RU}
                      onChange={handleRUChange}
                      placeholder="Kategoriya nomi - RU"
                      required
                    />
                  </div>
                  <div className="form-item">
                    <label htmlFor="">Upload Image</label>
                    <input
                      type="file"
                      onChange={(e) => setImages([...e.target.files])}
                      required
                    />
                  </div>
                </div>
                <div className="form-button">
                  <button type="submit">Yaratish</button>
                </div>
              </form>
            </div>
            <div className="settings-table">
              <table className="table-container">
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Kategoriya nomi - EN</th>
                    <th>Kategoriya nomi - RU</th>
                    <th>Images</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name_en}</td>
                        <td>{item.name_ru}</td>
                        <td>
                          <img
                            src={imgUrl + item.image_src}
                            className="table-img"
                            alt=""
                          />
                        </td>
                        <td>
                          <button
                            className="edit-btn"
                            onClick={() => handleGetEditCategory(item.id)}
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteCategory(item.id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="delete" colSpan="4">
                        Data Not Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {openModal && (
            <div className="modal">
              <div className="modal-content">
                <div className="modal-header">
                  <h2>Edit Category</h2>
                  <button onClick={handleOpenModal}>&times;</button>
                </div>
                <div className="modal-body">
                  <form
                    action=""
                    className="modal-form"
                    onSubmit={handleUploadCategory}
                  >
                    <div className="form-item">
                      <label htmlFor="">Kategoriya nomi - EN</label>
                      <input
                        type="text"
                        value={editedNameEN}
                        onChange={(e) => setEditedNameEN(e.target.value)}
                        placeholder="Kategoriya nomi - EN"
                        required
                      />
                    </div>
                    <div className="form-item">
                      <label htmlFor="">Kategoriya nomi - RU</label>
                      <input
                        type="text"
                        value={editedNameRU}
                        onChange={(e) => setEditedNameRU(e.target.value)}
                        placeholder="Kategoriya nomi - RU"
                        required
                      />
                    </div>
                    <div className="form-item">
                      <label htmlFor="">Upload Image</label>
                      <input
                        type="file"
                        onChange={(e) => setEditedImages([...e.target.files])}
                      />
                    </div>
                    <div className="prev-image">
                      <img className="edit-images" src={prevImage} alt="" />
                    </div>
                    <div className="form-button">
                      <button type="submit">Upload</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Settings;
