import { useQuery } from "react-query";
import { toast } from "react-toastify";
import AxiosRequest from "../axiosRequest";
 const getCities = async () => {
  return await AxiosRequest("cities");
};

const GetCities = () => {
  const { data, isLoading } = useQuery(["get-cities"], () => getCities(), {
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
  return { data, isLoading };
};
export default GetCities;
