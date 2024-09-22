import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_STOCK = `${API_URL}/stock`;

// returns a list with the stock alarms
export const getAllStockSymbols = async (username,password) => {
  try{    
  const response = await axios.get(`${API_STOCK}`, {
        auth: {
          username: username,
          password: password
        }
      });
      return response.data.stockSymbols;
    }catch (error) {
      if (error.response && error.response.status != 200) {
          throw error.response.data; //error occurred within the response
      } else {
          throw error; //if an error occurred with the function
      }
  }
  };

// returns latest stock data of the specified stock symbol
export const getStockData = async (username,password,symbol) => {
  try{
    const response = await axios.get(`${API_STOCK}`+"/"+symbol, {
      auth: {
        username: username,
        password: password
      }
    });
    return response.data.stock;
  }catch (error) {
    if (error.response && error.response.status != 200) {
        throw error.response.data; //error occurred within the response
    } else {
        throw error; //if an error occurred with the function
    }
  }
};

