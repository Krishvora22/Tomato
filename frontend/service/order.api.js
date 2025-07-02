// service/order.api.js
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:1600';

export const placeOrderAPI = async (orderData) => {
  try{
    const res = await axios.post(`${BASE_URL}/order/placeorder`, orderData);
  return res.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
