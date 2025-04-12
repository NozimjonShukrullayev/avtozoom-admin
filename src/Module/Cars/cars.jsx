import { useDispatch } from "react-redux";
import TableCars from "../../components/Cars/table-cars";
import { actionCars } from "../../store/autozumadminSlice";
import "./cars.css";
import { Button } from "@chakra-ui/react";

const Cars = () => {
  const dispatch = useDispatch();

  return (
    <div style={{position:"relative"}} className="cars-btns">
      <Button
            colorScheme="teal" variant="outline"
        onClick={() => dispatch(actionCars("create"))}
      >
        Create new cars
      </Button>

      <TableCars />
    </div>
  );
};

export default Cars;
