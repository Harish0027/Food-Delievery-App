import React, { useEffect } from 'react';
import './Verify.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyOrder = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const successString = searchParams.get('success');
  const navigate = useNavigate();

  const success = successString === 'true';


  const verifyOrder = async () => {
      const res = await axios.post("http://localhost:3004/api/order/verify",{
        orderId,success
      });
      if (res.data.success === true) {
        navigate('/myorders');
      }else{
        navigate("/");
      }
  };

  useEffect(() => {
    verifyOrder();
  }, []); 

  return (
    <div>
      <div className='verify'></div>
      <div className='spinner'></div>
    </div>
  );
};

export default VerifyOrder;
