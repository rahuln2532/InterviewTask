import axios from "axios";
import api from "./configApi";



export const updateProducts = (key, data) => {
  return api.patch(key, data );
};

export const getProducts = (key) => {
  return api.get(key);
};

export const createProducts = (key, data) => {
  return api.post(key,data);
};



