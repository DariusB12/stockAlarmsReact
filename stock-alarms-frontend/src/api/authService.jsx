import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_AUTH = `${API_URL}/authentication`;

export const register = async (userData) => {
    const response = await axios.post(`${API_AUTH}/signUp`, userData);
    return response.data;
};

export const login = async (credentials) => {
    const response = await axios.post(`${API_AUTH}/logIn`, credentials);
    return response.data;
};