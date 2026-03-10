

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// Creamos la instanci de axios que utiliza la URL de la API deseada
export const heroApi = axios.create({
    baseURL: `${BASE_URL}/api/heroes`
})