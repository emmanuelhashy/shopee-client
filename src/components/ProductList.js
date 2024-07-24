import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { BASE_URL } from '../constants';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <ul className="space-y-4">
        {products.map((product) => (
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
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
