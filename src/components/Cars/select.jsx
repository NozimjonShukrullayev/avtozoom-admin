import PropTypes from "prop-types";
import { useDispatch } from "react-redux"; 
import "../../Module/Cars/cars.css";
import { setBrand, setCategory, setCity, setLocatsia, setModel } from "../../store/autozumadminSlice";
import { Select } from "@chakra-ui/react";

const SelectComponent = (props) => {
  const { options, name, actionType } = props;

  const dispatch = useDispatch(); 

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    actionType === "setCategory"
      ? dispatch(setCategory(selectedValue))
      : actionType === "setBrand"
      ? dispatch(setBrand(selectedValue))
      : actionType === "setModel"
      ? dispatch(setModel(selectedValue))
      : actionType === "setLocatsia"
      ? dispatch(setLocatsia(selectedValue))
      : actionType === "setCity"
      ? dispatch(setCity(selectedValue))
      : null; 
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
      <label htmlFor="">{name}</label>
      <Select required onChange={handleChange}>
        <option  value="">
          Select {name}
        </option>
        {options?.map((option, index) => (
          <option aria-required key={index} value={option.id}>
            {option.title}
          </option>
        ))}
      </Select>
    </div>
  );
};

SelectComponent.propTypes = {
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  actionType: PropTypes.string.isRequired, // Добавляем пропс actionType
};

export default SelectComponent;
