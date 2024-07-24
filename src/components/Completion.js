import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext';
import { BASE_URL } from '../constants';

const Completion = () => {
    const { cart } = useContext(CartContext);
    const createOrder = async () => {
        try {
          await axios.post(`${BASE_URL}/orders`, {items: cart});
        } catch (error) {
          console.error('Failed to create product', error);
        }
      };

    useEffect(() => {
      createOrder()
    }, [])
    
  return (
    <div className='text-center'>
    <p className='text-xl mb-6'>Payment Successful</p>
    <Link to={"/orders"} className='bg-green-700 p-2 rounded text-base text-white'>Track Order</Link>
    </div>
  )
}

export default Completion