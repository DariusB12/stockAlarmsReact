import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_ALARM = `${API_URL}/alarm`;

// returns the user's defined alarms
export const getUsersAlarms = async (username,password,email) => {
    try{
        const response = await axios.get(`${API_ALARM}`+"/"+email, {
        auth: {
            username: username,
            password: password
            }
        });
        return response.data.alarms;
    } catch (error) {
        if (error.response && error.response.status != 200) {
            throw error.response.data; //error occurred within the response
        } else {
            throw error; //if an error occurred with the function
        }
    }
};
  

// add an alarm
// alarm should have the following properties: symbol,initialPrice,target and email
export const addAlarm = async (username,password,alarm) => {
    try{
        await axios.post(`${API_ALARM}`,alarm,{
        auth: {
            username: username,
            password: password
            }
        });
    } catch (error) {
        if (error.response && error.response.status != 200) {
            throw error.response.data; //error occurred within the response
        } else {
            throw error; //if an error occurred with the function
        }
    }
};

// deletes the specified alarm (identified by the id)
export const deleteAlarm = async (username,password,id) => {
    try{
        await axios.delete(`${API_ALARM}`+"/"+id, {
        auth: {
            username: username,
            password: password
            }
        });
    } catch (error) {
        if (error.response && error.response.status != 200) {
            throw error.response.data; //error occurred within the response
        } else {
            throw error; //if an error occurred with the function
        }
    }
};

// updates an alarm
// alarm should have the following properties: id,target and active
export const updateAlarm = async (username,password,alarm) => {
    try{
        await axios.put(`${API_ALARM}`,alarm , {
        auth: {
            username: username,
            password: password
            }
        });
    } catch (error) {
        if (error.response && error.response.status != 200) {
            throw error.response.data; //error occurred within the response
        } else {
            throw error; //if an error occurred with the function
        }
    }
};
