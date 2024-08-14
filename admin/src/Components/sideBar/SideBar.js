// SideBar.js

import React from 'react';
import { NavLink } from 'react-router-dom'; 
import './sideBar.css'; 
import { assets } from '../../assets/assets';

const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-options'>
        <NavLink to="/add" className='sidebar-options-option'>
          <img src={assets.add_icon} alt="Add Icon" />
          <p>Add items</p>
        </NavLink>
        <NavLink to="/lists" className='sidebar-options-option'>
          <img src={assets.order_icon} alt="List Icon" />
          <p>List items</p>
        </NavLink>
        <NavLink to="/orders" className='sidebar-options-option'>
          <img src={assets.order_icon} alt="Orders Icon" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
