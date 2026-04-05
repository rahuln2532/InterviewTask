import axios from "axios";

const API_URL = import.meta.env.VITE_JSON_HOST_API

const api=axios.create({
    
    baseURL:API_URL,

    headers:{"Content-Type":"application/json"}
});
export default api;