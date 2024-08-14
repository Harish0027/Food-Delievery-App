import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id="footer">
         <div className='footer-content'>
         <div className='footer-content-left'>
            <img src={assets.logo} alt="logo"></img>
            <p>Sea diam est amet vero amet, sed eos est diam invidunt aliquyam dolores ea. Diam ipsum ipsum ut diam voluptua,.</p>
            <div className='footer-social-icons'>
                <img src={assets.facebook_icon} alt="facebook"></img>
                <img src={assets.twitter_icon} alt="twitter"></img>
                <img src={assets.linkedin_icon} alt="linkdin"></img>
            </div>
         </div>
         <div className='footer-content-center'>
            <h2>company</h2>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>contact</li>
                <li>Terms & Policy</li>
            </ul>
         </div>
         <div className='footer-content-right'>
         <h2>Get touch in</h2>
            <ul>
                <li>9689571133</li>
                <li>sutarharish143@gmail.com</li>
            </ul>
         </div>
         </div>
         <hr />
         <div className='text'  ><p className="footer-text">&copy; Copyright 2024 Zomato.com - All rights reserved.</p></div>
        
    </div>
  )
}

export default Footer
