// service/cart.api.js
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:1600';

export const addToCartAPI = async ({ userId, foodId }) => {
  const res = await axios.post(`${BASE_URL}/cart/add`, {
    userId,
    foodId,
  });
  return res.data;
};
