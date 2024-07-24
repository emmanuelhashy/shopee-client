import React, { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);


  const addToCart = (product) => {
    const item = cart.find((i) => i.id === product.id);
    if (item) {
      setCart(cart.map((item) => item.id === product.id ? { ...item, quantity: Number(item.quantity) + 1, price: Number(item.price) + Number(product.price) } : item));
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
    // localStorage.setItem('cart', JSON.stringify(cart));
  };

  const removeFromCart = (product) => {
    const item = cart.find((i) => i.id === product.id);
    if (item) {
      setCart( cart.filter((item) => item.id !== product.id ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };


  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, setCartTotal, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
