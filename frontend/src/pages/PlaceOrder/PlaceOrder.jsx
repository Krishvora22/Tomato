/* eslint-disable react-hooks/exhaustive-deps */
import './PlaceOrder.css';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { placeOrderAPI } from '../../../service/order.api'; // ✅ make sure this path is correct

const PlaceOrder = () => {
  const { getTotalCartAmount, discount, token, food_list, cartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const deliveryCost =
    getTotalCartAmount() === 0 ? 0 :
    getTotalCartAmount() <= 100 ? 70 :
    getTotalCartAmount() <= 180 ? 60 :
    getTotalCartAmount() <= 250 ? 50 :
    getTotalCartAmount() <= 320 ? 40 : 30;

  const placeOrder = async (event) => {
    event.preventDefault();

  const userId = localStorage.getItem("userId");
    if (!userId) return alert("User not logged in");

    // ✅ Build items array
    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        foodId: item._id,
        quantity: cartItems[item._id]
      }));

    const orderData = {
      userId,
      address: {
        ...data,
        zipCode: Number(data.zipCode),
        phone: Number(data.phone)
      },
      items: orderItems,
      amount: getTotalCartAmount(),
      delivery: deliveryCost,
      discount,
      payment: false
    };

    try {
      const response = await placeOrderAPI(orderData);
      alert('Order placed successfully!');
      navigate('/');
    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to place order');
    }
  };

  useEffect(() => {
    // if (!token || getTotalCartAmount() === 0) {
    //   navigate('/cart');
    // }
  }, []);

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input required name='firstName' type="text" placeholder='First Name' value={data.firstName} onChange={onChangeHandler} />
          <input required name='lastName' type="text" placeholder='Last Name' value={data.lastName} onChange={onChangeHandler} />
        </div>
        <input required name='email' type="email" placeholder='Email address' value={data.email} onChange={onChangeHandler} />
        <input required name='street' type="text" placeholder='Street' value={data.street} onChange={onChangeHandler} />
        <div className='multi-fields'>
          <input required name='city' type="text" placeholder='City' value={data.city} onChange={onChangeHandler} />
          <input required name='state' type="text" placeholder='State' value={data.state} onChange={onChangeHandler} />
        </div>
        <div className='multi-fields'>
          <input required name='zipCode' type="text" placeholder='Zip Code' value={data.zipCode} onChange={onChangeHandler} />
          <input required name='country' type="text" placeholder='Country' value={data.country} onChange={onChangeHandler} />
        </div>
        <input required name='phone' type='text' placeholder='Phone' value={data.phone} onChange={onChangeHandler} />
      </div>

      <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>₹{deliveryCost}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Discount</p>
              <p>₹{discount}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Total</p>
              <p>₹{getTotalCartAmount() + deliveryCost - discount}</p>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
