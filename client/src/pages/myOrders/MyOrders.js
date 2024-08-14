import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { storeContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";
import "./Myorders.css"

const MyOrders = () => {
  const { getTotalCartAmount, token, food_Items, cartItems } =
    useContext(storeContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3004/api/order/myorders", {
          headers: {
            Authorization: token,
          },
        });
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Handle error if needed
      }
    };
    
    // Call fetchData only when token changes or initially
    fetchData();
  }, [token]); // Ensure token is added as a dependency

  return (
    <div className="myorders">
      <h2>My Orders</h2>
      <div className="container">
        {data && data.length > 0 ? (
          data.map((order, index) => (
            <div key={index} className="items">
                <img src={assets.parcel_icon}  className="img"alt="parcel"/>
                <div className="itemList">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, idx) => (
                    <div key={idx} className="item">
                      <p className="item-name">{item.name}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                    </div>
                  ))
                ) : (
                  <p>No items found for this order.</p>
                )}
                </div>
               <div className="myorder-status">
                <div className="dot"></div>
               <b className="myorder-status-mainstatus">{order.status}</b>
               </div>
                <button className="btn">track your order</button>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
