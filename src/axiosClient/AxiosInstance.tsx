/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import axios from 'axios';

const AxiosInstance = (contentType = 'application/json') => {
    const axiosInstance = axios.create({
        baseURL: 'http://192.168.1.9:3000/',
        headers: {
            'Accept': 'application/json',
            'Content-Type': contentType,
        },
    });
    return axiosInstance;

};
export default AxiosInstance;