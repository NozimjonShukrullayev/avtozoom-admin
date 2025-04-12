import { Input, Select, Skeleton } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import GetBrands from "../../api/brand/brands";
import GetCategories from "../../api/category/category";
import GetCities from "../../api/city/city";
import GetLocations from "../../api/lcoations/locations";
import GetModel from "../../api/model/model";
import {
  handleEditCars,
  setBrand,
  setCategory,
  setCity,
  setLocatsia,
  setModel,
} from "../../store/autozumadminSlice";
import { useEffect } from "react";

const EditSelect = () => {
  const dispatch = useDispatch();

  const { data, isLoading } = GetBrands();
  const { data: categories, isLoading: categoryLoading } = GetCategories();
  const { data: model, isLoading: modelLoading } = GetModel();
  const { data: locations, isLoading: locationsLoading } = GetLocations();
  const { data: cities, isLoading: citiesLoading } = GetCities();
  const carsObj = useSelector((cars) => cars.autozum.carsobj);
  const cars = useSelector((cars) => cars.autozum.editCars);

  useEffect(() => {
    dispatch(setCategory(carsObj?.category_id))
    dispatch(setBrand(carsObj?.brand_id))
    dispatch(setCity(carsObj?.city_id))
    dispatch(setLocatsia(carsObj?.location_id))
    dispatch(setModel(carsObj?.model_id))
  }, [])

  return (
    <div className="create-body-cars">
      {categoryLoading ? (
                   <Skeleton height="40px" mt={35} rounded={8} />

      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
        >
          <label htmlFor="">Category</label>
          <Select
            required
            onChange={(e) => dispatch(setCategory(e.target.value))}
          >
            <option value={carsObj?.category_id}>
              {carsObj?.category?.name_ru}
            </option>
            {categories?.data
              ?.filter((el) => el.id != carsObj.category_id)
              .map((option, index) => (
                <option aria-required key={index} value={option.id}>
                  {option?.name_ru}
                </option>
              ))}
          </Select>
        </div>
      )}
      {isLoading ? (
                   <Skeleton height="40px" mt={35} rounded={8} />

      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
        >
          <label htmlFor="">Brand</label>
          <Select required onChange={(e) => dispatch(setBrand(e.target.value))}>
            <option value={carsObj?.brand_id}>{carsObj?.brand?.title}</option>
            {data?.data
              ?.filter((el) => el.id != carsObj.location.id)
              .map((option, index) => (
                <option aria-required key={index} value={option.id}>
                  {option?.title}
                </option>
              ))}
          </Select>
        </div>
      )}

      {modelLoading ? (
                   <Skeleton height="40px" mt={35} rounded={8} />

      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
        >
          <label htmlFor="">Model</label>
          <Select required onChange={(e) => dispatch(setModel(e.target.value))}>
            <option value={carsObj?.model_id}>{carsObj?.model?.name}</option>
            {model?.data
              ?.filter((el) => el.id != carsObj.city_id)
              .map((option, index) => (
                <option aria-required key={index} value={option.id}>
                  {option?.name}
                </option>
              ))}
          </Select>
        </div>
      )}
      {locationsLoading ? (
                   <Skeleton height="40px" mt={35} rounded={8} />

      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
        >
          <label htmlFor="">Location</label>
          <Select
            required
            onChange={(e) => dispatch(setLocatsia(e.target.value))}
          >
            <option value={carsObj?.locations?.id}>
              {carsObj?.location?.name}
            </option>
            {locations?.data
              ?.filter((el) => el.id != carsObj.location.id)
              .map((option, index) => (
                <option aria-required key={index} value={option.id}>
                  {option?.name}
                </option>
              ))}
          </Select>
        </div>
      )}

      {citiesLoading ? (
                   <Skeleton height="40px" mt={35} rounded={8} />

      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
        >
          <label htmlFor="">City</label>
          <Select required onChange={(e) => dispatch(setCity(e.target.value))}>
            <option value={carsObj?.cities?.id}>{carsObj?.city?.name}</option>
            {cities?.data
              ?.filter((el) => el.id != carsObj.city_id)
              .map((option, index) => (
                <option aria-required key={index} value={option.id}>
                  {option?.name}
                </option>
              ))}
          </Select>
        </div>
      )}

      {Object.entries(cars).map((car, id) => {
        return (
          <div
            key={id}
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
            }}
          >
            <label htmlFor={Object.keys(car)[0]}>
              {Object.values(car)[1].value}
            </label>

            <Input
              required
              id={Object.keys(car)[0]}
              value={Object.values(car)[1].name}
              onChange={(e) => {
                dispatch(
                  handleEditCars({
                    name: Object.values(car)[0],
                    value: e.target.value,
                  })
                );
              }}
              size="md"
            />
          </div>
        );
      })}
    </div>
  );
};

export default EditSelect;
