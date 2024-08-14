// Placeorder.js

import React, { useContext, useEffect, useState } from "react";
import "./Place.css";
import axios from "axios";
import { storeContext } from "../../Context/StoreContext";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Placeorder = () => {
  // Assuming storeContext provides these values: getTotalCartAmount, token, food_Items, cartItems
  const { getTotalCartAmount, token, food_Items, cartItems } = useContext(storeContext);
const navigate=useNavigate();
  useEffect(()=>{
     if(!token){
      navigate("/")
     }else if(getTotalCartAmount===0){
      navigate("/")
     }
  },[token])
  // State for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  // Function to handle place order
  const placeOrder = async (event) => {
    event.preventDefault();
    
    // Prepare order items from cartItems and food_Items
    let orderItems = [];
    food_Items.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = {
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: cartItems[item._id],
        };
        orderItems.push(itemInfo);
      }
    });

    // Prepare address data
    const addressData = {
      street,
      city,
      state,
      zipCode,
      country,
    };

    // Prepare order data to be sent to backend
    const orderData = {
      items: orderItems,
      address: addressData,
      amount: getTotalCartAmount(),
    };

    try {
      // Send orderData to backend API
      const res = await axios.post("http://localhost:3004/api/order/place", orderData, {
        headers: {
          Authorization: token,
        },
      });

      if (res.data.success) {
        const { session_url } = res.data;
        console.log(session_url)
        window.location.replace(session_url); 
      } else {
        alert("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again later.");
    }
  };

  return (
    <div>
      <form className="place-order" onSubmit={placeOrder}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <div className="multi-fields">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="multi-fields">
            <input
              type="text"
              name="zipcode"
              placeholder="Zip code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery fee</p>
                <p>${2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>${getTotalCartAmount() + 2}</p>
              </div>
            </div>
            <button type="submit">Proceed to Checkout</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Placeorder;
