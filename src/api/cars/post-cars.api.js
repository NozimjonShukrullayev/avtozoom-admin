import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actionCars, handlehangeCars } from "../../store/autozumadminSlice";
import AxiosPostRequest from "../axiosPostRequest";
export const postCar = async (data) => {
  return await AxiosPostRequest(data,"cars");
};

const PostCars = ({props,cars}) => {
  const dispatch = useDispatch()
  const { mutate, isLoading } = useMutation(["post-cars"], (data) => postCar(data), {
    onSuccess:() =>{
      dispatch(actionCars(""))
      props?.refetch()
      {
        Object.entries(cars).map((car) => {
          console.log(car);
          return dispatch(
            handlehangeCars({
              name: Object.values(car)[0],
              value: "",
            })
          );
        });
      }
      toast.success("Succsesfuly add cars")

    },
    onError: (err) => {
      toast.error(err);
    },
  });
  return { mutate, isLoading };
};
export default PostCars;
