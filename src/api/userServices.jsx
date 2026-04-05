import api from "./configApi";



export const updateUser = (key, data) => {
  return api.patch(key, data);
};

export const getUser = (key) => {
  return api.get(key);
};

export const createUser = (key, data) => {
  return api.post(key, data);
};



