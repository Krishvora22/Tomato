// service/login.api.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL ;

export const signupUser = async (formData) => {
  try{
  const res = await axios.post(`${BASE_URL}/user/auth/sign-up`, formData);
  return res.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }

};

export const loginuser = async ({email, password}) =>{
    try{
      const res = await axios.post(`${BASE_URL}/user/auth/login` , {
        email , 
        password
    });
    } catch (error) {
      console.error("Error during login:", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
    return res.data;
}