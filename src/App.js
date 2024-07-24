import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Auth from "./components/Auth";
import Cart from "./components/Cart";
import OrderList from "./components/OrderList";
import ProductForm from "./components/ProductForm";
import Payment from "./components/Payment";
import Completion from "./components/Completion";
import ProductList from "./components/ProductList";

const App = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Router>
      <nav className="flex justify-between flex-wrap shadow-lg px-4 mb-6 items-center h-20">
        <div className="flex space-x-2 items-center">
        <Link to={"/"} className="font-bold text-xl">Shopee</Link>
          <Link to={"/cart"}>Cart</Link>
          <Link to={"/orders"}>Orders</Link>
        </div>
        {user ? (
          <div className="flex items-center space-x-2">
            <h1 className="text-base font-bold">Welcome, {user.username}</h1>
            <button
              onClick={logout}
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Logout
            </button>
          </div>
        ) : <Link
        to={"login"}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Login
      </Link>}
      </nav>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route
          path="/orders"
          element={user ? <OrderList /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/checkout" element={user ? <Payment /> : <Navigate to="/login" />} />
        <Route path="/completion" element={user ? <Completion /> : <Navigate to="/login" />}/>
      </Routes>
    </Router>
  );
};

export default App;
