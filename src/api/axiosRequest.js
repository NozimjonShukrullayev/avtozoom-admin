import axios from "axios";

import { toast } from "react-toastify";
import { GLOBALURL } from "../components";

const AxiosRequest = async (path) => {
  try {
    const response = await axios.get(`${GLOBALURL}${path}`);
    return response.data;
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
export default AxiosRequest;
