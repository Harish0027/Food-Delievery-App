import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import "./Orders.css";
const Orders = () => {
  const [data, setData] = useState([]);

  const statusHandler = async (status, id) => {
    const res = await axios.post(
      `http://localhost:3004/api/order/status/${id}`,
      {
        status: status,
      }
    );
    if (res.data.success) {
      toast.success("Status Updated Successfully !!!");
    } else {
      toast.error("Something wend wrong");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3004/api/order/list");
        setData(res.data.data);
        if (!res.data.success) {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders. Please try again later.");
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once after initial render

  return (
    <div className="order add">
      <h1>Orders</h1>
      {/* Render your orders data here */}
      <div className="order-list">
        {data.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {/* Check if order.items is an array before mapping over it */}
                {Array.isArray(order.items) && order.items.length > 0 ? (
                  order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x{item.quantity}
                      {idx !== order.items.length - 1 && ","}
                    </span>
                  ))
                ) : (
                  <span>No items</span>
                )}
              </p>
              <div className="order-item-adress">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipCode}
                </p>
              </div>
            </div>
            <p>items:{order.items.length} </p>
            <p>RS {order.amount}</p>
            <select
              name="status"
              onChange={(e) => statusHandler(e.target.value, order._id)}
            >
              <option value={"Food Processing"}>Food Processing</option>
              <option value={"Out For Delivery"}>Out For Delivery</option>
              <option value={"Delivered"}>Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
