import axios from 'axios';

const api = axios.create({
    baseURL: 'https://devfinancesbackend.herokuapp.com/',
})

export default api;