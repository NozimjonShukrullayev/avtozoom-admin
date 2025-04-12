import { useQuery } from "react-query";
import { toast } from "react-toastify";
import AxiosRequest from "../axiosRequest";
 const getCars = async () => {
  return await AxiosRequest("cars");
};

const GetCars = () => {
  const { data, isLoading,refetch } = useQuery(["get-cars"], () => getCars(), {
    onError: (err) => {
      toast.error(err);
    },
  });
  return { data, isLoading,refetch };
};
export default GetCars;
