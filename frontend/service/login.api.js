// service/login.api.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL ;

export const signupUser = async (formData) => {
  const res = await axios.post(`${BASE_URL}/user/auth/sign-up`, formData);
  return res.data;
};

export const loginuser = async ({email, password}) =>{
    const res = await axios.post(`${BASE_URL}/user/auth/login` , {
        email , 
        password
    });
    return res.data;
}