import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_AUTH = `${API_URL}/stock`;
// returns a list with the stock alarms
export const getAllStockSymbols = async (username,password) => {
      const response = await axios.get(`${API_AUTH}`, {
        auth: {
          username: username,
          password: password
        }
      });
      return response.data.stockSymbols;

  };