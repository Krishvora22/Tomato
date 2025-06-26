// service/order.api.js
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:1600';

export const placeOrderAPI = async (orderData) => {
  const res = await axios.post(`${BASE_URL}/order/placeorder`, orderData);
  return res.data;
};
