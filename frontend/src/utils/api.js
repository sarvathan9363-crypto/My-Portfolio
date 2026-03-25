import axios from "axios";

const api = axios.create({
baseURL: "https://my-portfolio-pgwb.onrender.com/api"
});

export default api;
