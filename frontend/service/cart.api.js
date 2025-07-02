// service/cart.api.js
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:1600';

export const addToCartAPI = async ({ userId, foodId }) => {
  try{
    const res = await axios.post(`${BASE_URL}/cart/add`, {
    userId,
    foodId,
  });
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
  return res.data;
};
