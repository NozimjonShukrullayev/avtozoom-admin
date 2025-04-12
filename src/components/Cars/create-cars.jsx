import "../../Module/Cars/cars.css";
import { useRef, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import GetBrands from "../../api/brand/brands";
import PostCars from "../../api/cars/post-cars.api";
import GetCategories from "../../api/category/category";
import GetCities from "../../api/city/city";
import GetLocations from "../../api/lcoations/locations";
import GetModel from "../../api/model/model";
import { actionCars, handlehangeCars } from "../../store/autozumadminSlice";
import Select from "./select";
import SelectComponent from "./select";
import { Button, Input, Skeleton, Stack, Switch } from "@chakra-ui/react";

const CreateCars = (props) => {
  const dispatch = useDispatch();
  const { data, isLoading } = GetBrands();
  const { data: categories, isLoading: categoryLoading } = GetCategories();
  const { data: model, isLoading: modelLoading } = GetModel();
  const { data: locations, isLoading: locationsLoading } = GetLocations();
  const { data: cities, isLoading: citiesLoading } = GetCities();
  
  const cars = useSelector((cars) => cars.autozum.cars);
  const category_id = useSelector((cars) => cars.autozum.categories);
  const brand_id = useSelector((cars) => cars.autozum.brand);
  const model_id = useSelector((cars) => cars.autozum.model);
  const location_id = useSelector((cars) => cars.autozum.locatsiya);
  const city_id = useSelector((cars) => cars.autozum.city);
  
  const [images, setImages] = useState([]);
  const [imagesCars, setImagesCar] = useState([]);
  const [cover, setCover] = useState(null);
  const [inclusive, setInclusive] = useState(false);
  const formRef = useRef(null);
  
  const { mutate, isLoading: isLoadingCreateCars } = PostCars({props,cars});

  const updateCategoryKey = categories?.data.map((item) => {
    const { name_ru, ...rest } = item;
    return { title: name_ru, ...rest };
  });

  const updateLocationsKey = locations?.data.map((item) => {
    const { name, ...rest } = item;
    return { title: name, ...rest };
  });
  const updateCitiesKey = cities?.data.map((item) => {
    const { name, ...rest } = item;
    return { title: name, ...rest };
  });

  const updateModelsKey = model?.data.map((item) => {
    const { name, ...rest } = item;
    return { title: name, ...rest };
  });

  const handleCklick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("brand_id", brand_id);
    formData.append("category_id", category_id);
    formData.append("model_id", model_id);
    formData.append("city_id", city_id);
    formData.append("color", cars.color.name);
    formData.append("year", cars.year.name);
    formData.append("seconds", cars.seconds.name);
    formData.append("max_speed", cars.speed.name);
    formData.append("max_people", cars.people.name);
    formData.append("transmission", cars.transmission.name);
    formData.append("motor", cars.motor.name);
    formData.append("drive_side", cars.drive_side.name);
    formData.append("petrol", cars.oyls.name);
    formData.append("limitperday", cars.limitperday.name);
    formData.append("deposit", cars.deposit.name);
    formData.append("premium_protection", cars.premium_pro_price.name);
    formData.append("price_in_aed", cars.price_aed.name);
    formData.append("price_in_usd", cars.price_usd.name);
    formData.append("price_in_aed_sale", cars.price_aed_otd.name);
    formData.append("price_in_usd_sale", cars.price_usd_otd.name);
    formData.append("location_id", location_id);
    formData.append("inclusive", inclusive);
    if (!images) return;
    Object.entries(images).forEach((el) => formData.append("images", el[1]));
    Object.entries(imagesCars).forEach((el) =>
      formData.append("images", el[1])
    );
    formData.append("cover", cover);
    mutate(formData);
    formRef.current.reset();
  };

  return (
    <div className="create-cars-contetnt">
      <main className="create-cars-header">
        <h1>Car qo`shish</h1>

        <Button
          colorScheme="teal"
          variant="outline"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
          onClick={() => dispatch(actionCars(""))}
        >
          <RiArrowGoBackFill /> Orqaga qaytish
        </Button>
      </main>
      <form
        ref={formRef}
        onSubmit={(e) => handleCklick(e)}
        style={{ marginBottom: "15px" }}
      >
        <div className="create-body-cars">
          {categoryLoading ? (
            <Skeleton height="40px" mt={35} rounded={8} />
          ) : (
            <Select
              options={updateCategoryKey}
              name="Categories"
              actionType="setCategory"
            />
          )}
          {isLoading ? (
            <Skeleton height="40px" mt={35} rounded={8} />
          ) : (
            <Select options={data?.data} name="Brand" actionType="setBrand" />
          )}
          {modelLoading ? (
            <Skeleton height="40px" mt={35} rounded={8} />
          ) : (
            <Select
              options={updateModelsKey}
              name="Model"
              actionType="setModel"
            />
          )}
          {locationsLoading ? (
            <Skeleton height="40px" mt={35} rounded={8} />
          ) : (
            <Select
              options={updateLocationsKey}
              name="Locatsiya"
              actionType="setLocatsia"
            />
          )}
          {citiesLoading ? (
            <Skeleton height="40px" mt={35} rounded={8} />
          ) : (
            <SelectComponent
              options={updateCitiesKey}
              name="Cities"
              actionType="setCity"
            />
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
                      handlehangeCars({
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
            }}
          >
            <label htmlFor="machinas">Mashina rasmlarini yuklang</label>
            <Input
              style={{ padding: "5px 10px" }}
              required
              multiple
              onChange={(e) => setImagesCar(e.target.files[0])}
              type="file"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
            }}
          >
            <label htmlFor="asosi">Asosi rasmni yuklang</label>
            <Input
              style={{ padding: "5px 10px" }}
              multiple
              onChange={(e) => setImages(e.target.files)}
              type="file"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
            }}
          >
            <label htmlFor="asosi">Asosi rasmni yuklang</label>
            <Input
              style={{ padding: "5px 10px" }}
              onChange={(e) => setCover(e.target.files[0])}
              type="file"
            />
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
          loadingText="Yaratish"
          type="submit"
          mt={5}
          colorScheme="teal"
          variant="outline"
        >
          <IoIosAdd size={32} />{" "}
          <span style={{ fontSize: "20px" }}>Yaratish</span>
        </Button>
      </form>
    </div>
  );
};

export default CreateCars;
