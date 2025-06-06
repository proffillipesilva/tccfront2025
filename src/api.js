import axios from 'axios'

const myAxios = axios.create({
    baseURL: process.env.BACKEND_URL
});

export default myAxios;

