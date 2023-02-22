import axios from 'axios';

export const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.response.use((onFullfilled) => {
    if (onFullfilled.data.Status === 201) {
        return Promise.reject(onFullfilled.data.Details)
    }
    return Promise.resolve(onFullfilled)
})