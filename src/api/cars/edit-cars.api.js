import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actionCars } from "../../store/autozumadminSlice";
import AxiosEditRequest from "../axiosEditRequest";

const editCars = async (data,id) => {
  return await AxiosEditRequest(data,id,"cars");
};

const EditCarsFn = ({props},id) => {
  const dispatch = useDispatch()
  const { mutate, isLoading } = useMutation(["post-cars"], (data) => editCars(data,id), {
    onSuccess:() =>{
      dispatch(actionCars(""))
      props?.refetch()
      toast.success("Succsesfuly add cars")

    },
    onError: (err) => {
      toast.error(err);
    },
  });
  return { mutate, isLoading };
};
export default EditCarsFn;
