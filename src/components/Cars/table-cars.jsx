import {
  Select,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GetBrands from "../../api/brand/brands";
import GetCars from "../../api/cars/get-cars.api";
import GetCategories from "../../api/category/category";
import GetLocations from "../../api/lcoations/locations";
import GetModel from "../../api/model/model";
import { actionCars, setCarsObj, setEditCars } from "../../store/autozumadminSlice";
import CreateCars from "./create-cars";
import { DeleteComponent } from "./delete-cars";
import EditCars from "./edit-cars";

const TableCars = () => {
  const [id, setId] = useState();

  const { data: cars, isLoading, refetch } = GetCars();
  const { data: brand } = GetBrands();
  const { data: categories } = GetCategories();
  const { data: model } = GetModel();
  const { data: location } = GetLocations();

  const dispatch = useDispatch();
  const selectedOption = useSelector((cars) => cars.autozum.actioncars);

  const renderComponent = () => {
    if (selectedOption === "delete")
      return <DeleteComponent id={id} refetch={refetch} />;
    else if (selectedOption === "create")
      return <CreateCars refetch={refetch} />;
    else if (selectedOption === "edit")
      return <EditCars id={id} refetch={refetch} />;
    return null;
  };

  return (
    <>
      <TableContainer style={{marginTop:"30px"}}>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th style={{color:"#fff"}}>№</Th>
              <Th style={{color:"#fff"}}>Rang</Th>
              <Th style={{color:"#fff"}}>Brand</Th>
              <Th style={{color:"#fff"}}>Model</Th>
              <Th style={{color:"#fff"}}>Categoriya</Th>
              <Th style={{color:"#fff"}}>Lokatsiya</Th>
              <Th style={{color:"#fff"}}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
              <Spinner pos={"relative"} top={5} bottom={5} left={"25%"} color='red.500' />
            ) : (
              cars?.data?.map((car, ind) => {
                return (
                  <Tr key={ind}>
                    <Td>{ind + 1}</Td>
                    <Td>{car.color}</Td>
                    <Td>
                      {
                        brand?.data?.filter((el) => el.id === car.brand_id)[0]
                          .title
                      }
                    </Td>
                    <Td>
                      {
                        model?.data?.filter((el) => el.id === car.model_id)[0]
                          .name
                      }
                    </Td>
                    <Td>
                      {" "}
                      {
                        categories?.data?.filter(
                          (el) => el.id === car.category_id
                        )[0].name_ru
                      }
                    </Td>
                    <Td>
                      {" "}
                      {
                        location?.data?.filter(
                          (el) => el.id === car.location_id
                        )[0].name
                      }
                    </Td>
                    <Td>
                      <Select
                        placeholder="Action"
                        value={selectedOption}
                        onChange={(e) => {
                          dispatch(actionCars(e.target.value), setId(car.id)),dispatch(setCarsObj(car),dispatch(setEditCars(car)))
                        }}
                      >
                        <option value="delete"> Delete</option>
                        <option value="edit">Edit</option>
                      </Select>
                    </Td>
                  </Tr>
                );
              })
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {renderComponent()}
    </>
  );
};

export default TableCars;
