import api from "./configApi";

export const createOrder = (key,data) => {
  return api.post(key, data);
};

export const getOrders = (key) => {
  return api.get(key);
};