import axios from 'axios';

const axiosOptions = {
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 5000
}

const axiosInstance = axios.create(axiosOptions);

export { axiosInstance as api };