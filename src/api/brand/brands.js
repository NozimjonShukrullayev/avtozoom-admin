import { useQuery } from "react-query";
import { toast } from "react-toastify";
import AxiosRequest from "../axiosRequest";
export const getBrands = async () => {
  return await AxiosRequest("brands");
};

const GetBrands = () => {
  const { data, isLoading } = useQuery(["get-brands"], () => getBrands(), {
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
  return { data, isLoading };
};
export default GetBrands;
