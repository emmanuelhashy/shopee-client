import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, setCartTotal } = useContext(CartContext);
  const navigate = useNavigate();
  const cartTotal = cart.reduce((sum, item) => {
    return sum + parseFloat(item.price) * item.quantity;
  }, 0);

  useEffect(() => {
    setCartTotal(cartTotal);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      <ul className="space-y-4">
        {cart.map((product) => (
          <li key={product.id} className="p-4 bg-white rounded shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-gray-700">${product.price}</p>
                <p className="text-gray-700">Quantity: {product.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(product)}
                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-xl font-bold mt-6">Total: ${cartTotal}</p>
      <button
        onClick={() => navigate("/checkout")}
        className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
