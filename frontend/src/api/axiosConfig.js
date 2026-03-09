import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

axios.defaults.validateStatus = (status) => {
    return status >= 200 && status < 300; 
};

export default api;