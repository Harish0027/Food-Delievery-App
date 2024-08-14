import React, { useContext } from 'react';
import './Fooditem.css';
import { assets } from '../../assets/assets';
import { storeContext } from '../../Context/StoreContext';

const FoodItem = ({ item }) => {
  const { addToCart, removeFromCart, cartItems } = useContext(storeContext);

  const handleAddToCart = (itemId) => {
    addToCart(itemId);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img src={`http://localhost:3004/images/${item.image}`} className='food-item-img' alt='food-item' />
        {!cartItems[item._id] || cartItems[item._id] === 0 ? (
          <img
            className='add'
            onClick={() => handleAddToCart(item._id)}
            src={assets.add_icon_green}
            alt='Add'
          />
        ) : (
          <div className='food-item-counter'>
            <img
              onClick={() => handleRemoveFromCart(item._id)}
              src={assets.remove_icon_red}
              alt='Remove'
            />
            <p>{cartItems[item._id]}</p>
            <img
              onClick={() => handleAddToCart(item._id)}
              src={assets.add_icon_green}
              alt='Add'
            />
          </div>
        )}
      </div>
      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>{item.name}</p>
          <img className='rating' src={assets.rating_starts} alt='rating' />
        </div>
        <p className='description'>{item.description}</p>
        <p className='price'>Rs {item.price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
