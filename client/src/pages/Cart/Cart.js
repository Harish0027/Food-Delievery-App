import React, { useContext } from "react";
import "./Cart.css";
import { storeContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_Items, removeFromCart, getTotalCartAmount } = useContext(storeContext);
  const navigate = useNavigate();

  if (!cartItems || Object.keys(cartItems).length === 0) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-item-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {Object.keys(cartItems).map((itemId) => {
          const item = food_Items.find((foodItem) => foodItem._id === itemId);
          if (item) {
            return (
              <div key={itemId} className="cart-item cart-item-title">
                <img src={`http://localhost:3004/images/${item.image}`} alt="" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[itemId]}</p>
                <p>${item.price * cartItems[itemId]}</p>
                <p className="cross" onClick={() => removeFromCart(itemId)}>X</p>
              </div>
            );
          } else {
            return null; // Handle case where item is not found (optional)
          }
        })}
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>{getTotalCartAmount() === 0 ? '00' : '2'}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>${getTotalCartAmount() + 2}</p>
              </div>
            </div>
            <button onClick={() => { navigate("/placeorder") }}>Proceed to Checkout</button>
          </div>
          <div className="promocode">
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
