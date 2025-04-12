import { useQuery } from "react-query";
import { toast } from "react-toastify";
import AxiosRequest from "../axiosRequest";
 const getLocations = async () => {
  return await AxiosRequest("locations");
};

const GetLocations = () => {
  const { data, isLoading } = useQuery(["get-locations"], () => getLocations(), {
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
  return { data, isLoading };
};
export default GetLocations;
