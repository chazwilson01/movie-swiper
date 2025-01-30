import axios from "axios";

const instance = axios.create({ 
    baseURL: "https://movie-swiper-backend.onrender.com",
});

export default instance;