import { FaSearch } from "react-icons/fa";
import "./Cities.css";
import { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Cities = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [images, setImages] = useState([]);
  const [text, setText] = useState("");
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editImage, setEditImage] = useState([]);
  const [editText, setEditText] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
    setEditName("")
    setEditSlug("")
    setEditImage([])
    setEditText("")
  };
  // add modal qismi
  const handleAddModal = () => {
    setAddModal(!addModal);
    setName("")
    setSlug("")
    setImages([])
    setText("")
  };
  // edit name
  const handleChangeName = (e) => {
    setEditName(e.target.value);
  };
  // edit slug
  const handleChangeSlug = (e) => {
    setEditSlug(e.target.value);
  };
  // edit text
  const handleChangeText = (e) => {
    setEditText(e.target.value);
  };
  //search qismi
  const handleSearchCities = (e) => {
    const text = e.target.value;
    setSearch(text);
    if (text.length > 0) {
      const searchCities = data.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setData(searchCities);
    } else {
      fetchData();
    }
  };

  // post uchun
  const handleSubmitCities = async (e) => {
    e.preventDefault();
    try {
      const formData = await new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("text", text);
      images.forEach((img) => {
        formData.append("images", img);
      });
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "https://autoapi.dezinfeksiyatashkent.uz/api/cities",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        toast.success("Malumot muvaffaqqiyatli qo'shildi!", {
          autoClose: 2000,
        });
        fetchData();
        setName("");
        setSlug("");
        setImages([]);
        setText("");
        setAddModal(false);
      } else {
        console.log("Malumot qo'shilmadi");
        toast.error("Malumot qo'shilmadi!", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("error adding category", error);
    }
  };

  //get qismi uchun
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "https://autoapi.dezinfeksiyatashkent.uz/api/cities",
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

  const imgUrl = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";

  // edit qismidagi get uchun
  const handleGetEditCities = async (id) => {
    handleOpenModal();
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `https://autoapi.dezinfeksiyatashkent.uz/api/cities/${id}`,
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
        setEditName(data?.data?.name);
        setEditSlug(data?.data?.slug);
        setEditText(data?.data?.text);
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

  // edit qismidagi PUT uchun
  const handleUploadCities = async (e) => {
    e.preventDefault();
    try {
      const id = localStorage.getItem("selectedId");
      const formData = new FormData();
      formData.append("name", editName);
      formData.append("slug", editSlug);
      formData.append("text", editText);
      if (editImage.length > 0) {
        editImage.forEach((image) => {
          formData.append("images", image);
        });
      } else {
        formData.append("image_src", prevImage.replace(imgUrl, ""));
      }
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `https://autoapi.dezinfeksiyatashkent.uz/api/cities/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        fetchData();
        toast.success("Malumot muvaffaqqiyatli yangilandi!", {
          autoClose: 2000,
        });
        handleOpenModal(false);
      } else {
        console.log("Ma'lumotlar yangilanmadi");
        toast.error("Malumotlar yangilanmadi!", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("error updating category", error);
    }
  };

  // delete qismi uchun
  const handleDeleteCities = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `https://autoapi.dezinfeksiyatashkent.uz/api/cities/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 500) {
        toast.error("Malumotni o'chirishda xatolik yuz berdi!", {
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
          <div className="cities-container">
            <div className="cities-table">
              <div className="search-add_buttons">
                <div className="search-container">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    value={search}
                    onChange={handleSearchCities}
                    placeholder="Search Cities"
                  />
                </div>
                <a className="add_btn" onClick={handleAddModal}>
                  Add Cities +
                </a>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Nomi</th>
                    <th>Slug</th>
                    <th>Image</th>
                    <th>Tavsifi</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.slug}</td>
                      <td>
                        <img
                          src={imgUrl + item.image_src}
                          className="table-img"
                          alt="salom"
                        />
                      </td>
                      <td>{item.text}</td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleGetEditCities(item.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteCities(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {addModal && (
            <div className="modal">
              <div className="modal-content">
                <div className="modal-header">
                  <h2>Add Cities</h2>
                  <button onClick={handleAddModal}>&times;</button>
                </div>
                <div className="modal-body">
                  <form
                    action=""
                    className="modal-form"
                    onSubmit={handleSubmitCities}
                  >
                    <div className="form-item">
                      <label htmlFor="">Cities Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Cities Name"
                        required
                      />
                    </div>
                    <div className="form-item">
                      <label htmlFor="">Cities Slug</label>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="Cities Slug"
                        required
                      />
                    </div>
                    <div className="form-item">
                      <label htmlFor="">Cities Text</label>
                      <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Cities Text"
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
                    <div className="form-button">
                      <button type="submit">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          {openModal && (
            <div className="modal">
              <div className="modal-content">
                <div className="modal-header">
                  <h2>Edit Cities</h2>
                  <button onClick={handleOpenModal}>&times;</button>
                </div>
                <div className="modal-body">
                  <form
                    action=""
                    className="modal-form"
                    onSubmit={handleUploadCities}
                  >
                    <div className="form-item">
                      <label htmlFor="">Cities Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={handleChangeName}
                        placeholder="Cities Name"
                        required
                      />
                    </div>
                    <div className="form-item">
                      <label htmlFor="">Cities Slug</label>
                      <input
                        type="text"
                        value={editSlug}
                        onChange={handleChangeSlug}
                        placeholder="Cities Slug"
                        required
                      />
                    </div>
                    <div className="form-item">
                      <label htmlFor="">Cities Text</label>
                      <input
                        type="text"
                        value={editText}
                        onChange={handleChangeText}
                        placeholder="Cities Text"
                        required
                      />
                    </div>
                    <div className="form-item">
                      <label htmlFor="">Upload Image</label>
                      <input
                        type="file"
                        onChange={(e) => setEditImage([...e.target.files])}
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

export default Cities;
