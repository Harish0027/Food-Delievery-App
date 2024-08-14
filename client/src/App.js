import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import Footer from "./Components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./Components/LoginPopUp/LoginPopup";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyOrder from "./pages/VerifyOrder/VerifyOrder";
import MyOrders from "./pages/myOrders/MyOrders";

function App() {
  const [isLogin,setIsLogin]=useState(false);
  return (
    <>
    {isLogin?<LoginPopup  setIsLogin={setIsLogin}/>:<></>}
      <div className="App">
        <ToastContainer/>
        <Navbar setIsLogin={setIsLogin}/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/placeorder" element={<PlaceOrder />}></Route>
          <Route path="/verify" element={<VerifyOrder />}></Route>
          <Route path="/myorders" element={<MyOrders/>}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
