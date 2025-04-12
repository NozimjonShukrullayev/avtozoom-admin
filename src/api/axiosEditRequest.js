import axios from "axios";

import { toast } from "react-toastify";
import { GLOBALURL } from "../components";

const AxiosEditRequest = async (formData,id,path) => {
    const token = localStorage.getItem('access_token');
  try {
    const response = await axios.put(`${GLOBALURL}${path}/${id}`,formData,{
        headers: {
            Authorization: `Bearer ${token} `,
          },
    });

    return response.data
  } catch (error) {
    const statusCode = error.status;
    if (statusCode !== undefined) {
      if (statusCode >= 500) {
        toast.error("Ошибка на стороне сервера");
      }
    } else if (error.message === "Network Error") {
      toast.error("Проверьте подключение к интернету.");
    }
  }
};
export default AxiosEditRequest;
