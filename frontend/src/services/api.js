import axios from 'axios';

const apiRoute = 'http://localhost:5000';

const api = axios.create({
    baseURL: apiRoute
}, {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});

export default api;

