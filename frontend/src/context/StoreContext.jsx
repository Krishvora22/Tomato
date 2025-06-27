import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import { addToCartAPI } from "../../service/cart.api";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // Load cart from localStorage or empty
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [discount, setDiscount] = useState(() => {
    const savedDiscount = localStorage.getItem("discount");
    return savedDiscount ? parseInt(savedDiscount) : 0;
  });

  // const [isLoggedIn, setIsLoggedIn] = useState(() => {
  //   return !!localStorage.getItem("userId");
  // });
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return !!savedUser;
  });


  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 🔁 Sync to localStorage on change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("discount", discount.toString());
  }, [discount]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const addToCart = async (itemId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login to add items to cart.");
      return;
    }

    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    try {
      await addToCartAPI({ userId, foodId: itemId });
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 0,
    }));
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      const food = food_list.find((f) => f._id === itemId);
      if (food) {
        total += food.price * quantity;
      }
    }
    return total;
  };

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
};

export default StoreContextProvider;
