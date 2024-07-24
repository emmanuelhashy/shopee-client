import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { BASE_URL } from '../constants';
import Spinner from './Spinner';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      setProducts(response.data);
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to fetch products', error);
      setIsLoading(false)
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <ul className="space-y-4">
        {isLoading ?
            <div className='flex justify-center items-center w-full'>
                <Spinner className={"text-2xl w-10 h-10"}/>
            </div> :
            products.length > 0 ? products.map((product) => (
          <li key={product.id} className="p-4 bg-white rounded shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-gray-700">${product.price}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => addToCart(product)}
                  className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </li>
        )) : <p className='text-center'>No Product Available</p>}
      </ul>
    </div>
  );
};

export default ProductList;
