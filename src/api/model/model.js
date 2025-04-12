import { useQuery } from "react-query";
import { toast } from "react-toastify";
import AxiosRequest from "../axiosRequest";
 const getModel = async () => {
  return await AxiosRequest("models");
};

const GetModel = () => {
  const { data, isLoading } = useQuery(["get-model"], () => getModel(), {
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
  return { data, isLoading };
};
export default GetModel;
