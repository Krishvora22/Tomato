import { createContext , useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import { addToCartAPI } from "../../service/cart.api";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

     const [cartItems, setCartItems] = useState({});
        const [discount, setDiscount] = useState(0);
          const [isLoggedIn, setIsLoggedIn] = useState(false);
          const [user, setUser] = useState(null); // store user info



     
    const addToCart = async (itemId) => {
  const userId = localStorage.getItem("userId");
  console.log("userid" + userId);
  console.log("item id" + itemId)
  setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  try {
    await addToCartAPI({ userId, foodId: itemId }); // ✅ Correct call
  } catch (err) {
    console.error("Add to cart failed", err);
  }
};



    const removeFromCart = async (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () => {
  let totalAmount = 0;

  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      const itemInfo = food_list.find((product) => product._id === item);

      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[item];
      } else {
        console.warn(`Product not found for item id: ${item}`);
      }
    }
  }

  return totalAmount;
};


    useEffect(()=>{
     console.log(cartItems);
    }, [cartItems])


      const contextValue = {
        food_list,
         cartItems,
         setCartItems,
         addToCart,
        removeFromCart,
        getTotalCartAmount,
        discount,
        setDiscount,
        isLoggedIn,
    setIsLoggedIn,
      user,
  setUser,

    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );


}
export default StoreContextProvider;
