import {
  Button,
  Stack,
  Switch
} from "@chakra-ui/react";
import { useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import "../../Module/Cars/cars.css";
import EditCarsFn from "../../api/cars/edit-cars.api";
import { actionCars } from "../../store/autozumadminSlice";
import EditSelect from "./editSelect";

const EditCars = (props) => {
  const dispatch = useDispatch();
  const carsObj = useSelector((cars) => cars.autozum.carsobj);
  const { mutate, isLoading: isLoadingCreateCars } = EditCarsFn(props,carsObj.id);
  const editCars = useSelector((cars) => cars.autozum.editCars);
  const category_id = useSelector((cars) => cars.autozum.categories);
  const brand_id = useSelector((cars) => cars.autozum.brand);
  const model_id = useSelector((cars) => cars.autozum.model);
  const location_id = useSelector((cars) => cars.autozum.locatsiya);
  const city_id = useSelector((cars) => cars.autozum.city);
  const [inclusive, setInclusive] = useState(false);


  const handleCklick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("brand_id", brand_id);
    formData.append("category_id", category_id);
    formData.append("model_id", model_id);
    formData.append("city_id", city_id);
    formData.append("color", editCars.color.name);
    formData.append("year", editCars.year.name);
    formData.append("seconds", editCars.seconds.name);
    formData.append("max_speed", editCars.speed.name);
    formData.append("max_people", editCars.people.name);
    formData.append("transmission", editCars.transmission.name);
    formData.append("motor", editCars.motor.name);
    formData.append("drive_side", editCars.drive_side.name);
    formData.append("petrol", editCars.oyls.name);
    formData.append("limitperday", editCars.limitperday.name);
    formData.append("deposit", editCars.deposit.name);
    formData.append("premium_protection", editCars.premium_pro_price.name);
    formData.append("price_in_aed", editCars.price_aed.name);
    formData.append("price_in_usd", editCars.price_usd.name);
    formData.append("price_in_aed_sale", editCars.price_aed_otd.name);
    formData.append("price_in_usd_sale", editCars.price_usd_otd.name);
    formData.append("location_id", location_id);
    formData.append("inclusive", inclusive);
    mutate(formData);
  };
  return (
    <div className="create-cars-contetnt">
      <main className="create-cars-header">
        <h1>Car almashtrish</h1>
        <Button
          colorScheme="teal"
          variant="outline"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
          onClick={() => dispatch(actionCars(""))}
        >
          <RiArrowGoBackFill /> Orqaga qaytish
        </Button>
      </main>
      <form onSubmit={(e) => handleCklick(e)} style={{ marginBottom: "15px" }}>
        <div className="create-body-cars">
          <div style={{gridColumn: "span 3 / span 3"}}>
        <EditSelect />  
          </div>
         
          <Stack>
            <span>Inclusive</span>
            <Switch
              value={inclusive}
              onChange={(e) => setInclusive(e.target.checked)}
              size="md"
            />
          </Stack>
        </div>

        <Button
          isLoading={isLoadingCreateCars}
          loadingText="Almashyapt"
          type="submit"
          mt={5}
          colorScheme="teal"
          variant="outline"
        >
          <span style={{ fontSize: "20px" }}>Almashtrish</span>
        </Button>
      </form>
    </div>
  );
};

export default EditCars;
