import { createSlice } from "@reduxjs/toolkit";
import { initialCars, initialEditCars } from "../api";


const initialState = {
  actioncars: "",
  cars: initialCars,
  editCars:initialEditCars,
  categories: "",
  brand: "",
  model: "",
  locatsiya: "",
  city: "",
  carsobj:{}
};
const autozumadmin = createSlice({
  name: "autozumadmin",
  initialState,
  reducers: {
    actionCars(state, action) {
      state.actioncars = action.payload;
    },
    handlehangeCars(state, action) {
      const { name, value } = action.payload;
      state.cars[name].name = value;
    },
    handleEditCars(state, action) {
      const { name, value } = action.payload;
      state.editCars[name].name = value;
    },
    setCategory(state,action){
      state.categories = action.payload
    },
    setBrand(state,action){
      state.brand = action.payload
    },
    setModel(state,action){
      state.model = action.payload
    },
    setLocatsia(state,action){
      state.locatsiya = action.payload
    },
    setCity(state,action){
      state.city = action.payload
    },
    setCarsObj(state,action){
      state.carsobj = action.payload
    },
    setEditCars(state,action){  
      state.editCars.color.name = action.payload.color;
      state.editCars.deposit.name = action.payload.deposit;
      state.editCars.drive_side.name = action.payload.drive_side;
      state.editCars.limitperday.name = action.payload.limitperday;
      state.editCars.motor.name = action.payload.motor;
      state.editCars.oyls.name = action.payload.petrol;
      state.editCars.people.name = action.payload.max_people;
      state.editCars.premium_pro_price.name = action.payload.premium_protection;
      state.editCars.price_aed.name = action.payload.price_in_aed;
      state.editCars.price_aed_otd.name = action.payload.price_in_aed_sale;
      state.editCars.price_usd.name = action.payload.price_in_usd;
      state.editCars.price_usd_otd.name = action.payload.price_in_usd_sale;
      state.editCars.seconds.name = action.payload.seconds;
      state.editCars.speed.name = action.payload.max_speed;
      state.editCars.transmission.name = action.payload.transmission;
      state.editCars.year.name = action.payload.year;
      

    }
  },
});

export const { actionCars, handlehangeCars,handleEditCars,setBrand,setCategory,setCity,setLocatsia,setModel,setCarsObj,setEditCars } = autozumadmin.actions;

export default autozumadmin.reducer;
