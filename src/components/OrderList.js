import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../constants';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const response = await axios.get(`${BASE_URL}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="p-4 bg-white rounded shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700">Order ID: {order.id}</p>
                <p className="text-gray-700">Total: ${order.total}</p>
                <p className="text-gray-700">Status: <span className="bg-yellow-600 text-white py-1 px-3 rounded-md">{order.status}</span></p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
