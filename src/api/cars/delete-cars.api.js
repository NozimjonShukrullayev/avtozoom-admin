import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actionCars } from "../../store/autozumadminSlice";
import AxiosDeleteRequest from "../axiosDeleteRequest";
 const deleteCars = async (id) => {
  return await AxiosDeleteRequest(id,"cars");
};

const DeleteCars = (props) => {

  const dispatch = useDispatch()
  const { mutate, isLoading } = useMutation(["delete-cars"], (id) => deleteCars(id), {
    onSuccess:() =>{
      dispatch(actionCars(""))
      props.refetch()
      // props.onClose()
     toast.success("Delete cars")
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  return { mutate, isLoading };
};
export default DeleteCars;
