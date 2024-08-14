import React, { useContext } from 'react';
import { storeContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './display.css'; // Make sure to import your CSS file

const FoodDisplay = ({ category }) => {
  const { food_Items } = useContext(storeContext);

  // Handle initial state or loading state
  if (!food_Items) {
    return <div>Loading...</div>; // Or handle according to your application's needs
  }

  return (
    <div className='display-food' id='food-item'>
      <h1>Top dishes near you</h1>
      <div className='food-list'>
        {food_Items.map((item, index) => (
          (category === "All" || category === item.category) && (
            <FoodItem key={index} item={item} />
          )
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
