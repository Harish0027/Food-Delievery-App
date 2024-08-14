import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const storeContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [foodList, setFoodList] = useState([]);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodList.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const addToCart = async (itemId) => {
    try {
      await axios.post(
        "http://localhost:3004/api/cart/add",
        { itemId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCartItems((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1,
      }));
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.post(
        "http://localhost:3004/api/cart/remove",
        { itemId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (cartItems[itemId] === 1) {
        const newCartItems = { ...cartItems };
        delete newCartItems[itemId];
        setCartItems(newCartItems);
      } else if (cartItems[itemId] > 1) {
        setCartItems((prev) => ({
          ...prev,
          [itemId]: prev[itemId] - 1,
        }));
      }
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const fetchCartData = async () => {
    try {
      const res = await axios.get("http://localhost:3004/api/cart/get", {
        headers: {
          Authorization: token,
        },
      });
      setCartItems(res.data.cartdata || {}); // Ensure cartItems is set to an object
    } catch (error) {
      console.error("Failed to fetch cart data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3004/api/food/list");
        setFoodList(res.data.data);
      } catch (error) {
        console.error("Failed to fetch food list:", error);
      }
    };

    fetchData();

    const storedToken = localStorage.getItem("user");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []); // Only run on component mount

  useEffect(() => {
    if (token) {
      fetchCartData(); // Fetch cart data whenever token changes
    }
  }, [token]); // Fetch when token changes

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    token,
    setToken,
    food_Items: foodList,
    getTotalCartAmount,
  };

  return (
    <storeContext.Provider value={contextValue}>
      {children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
