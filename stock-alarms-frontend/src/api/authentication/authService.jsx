import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_AUTH = `${API_URL}/authentication`;

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_AUTH}/signUp`, userData);
        return response.data;
      } catch (error) {
        if (error.response && error.response.status != 200) {
          throw error.response.data; //error occurred within the response
        } else {
          throw error; //if an error occurred with the post function
        }
      }
};

export const login = async (credentials) => {
    try{
        const response = await axios.post(`${API_AUTH}/logIn`, credentials);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status != 200) {
        throw error.response.data; //error occurred within the response
        } else {
        throw error; //if an error occurred with the post function
        }
    }
};