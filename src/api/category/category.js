import { useQuery } from "react-query";
import { toast } from "react-toastify";
import AxiosRequest from "../axiosRequest";
 const getcategories = async () => {
  return await AxiosRequest("categories");
};

const GetCategories = () => {
  const { data, isLoading } = useQuery(["get-categories"], () => getcategories(), {
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
  return { data, isLoading };
};
export default GetCategories;
