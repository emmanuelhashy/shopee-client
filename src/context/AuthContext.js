import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get(`${BASE_URL}/auth/profile`)
        .then(response => setUser(response.data))
        .catch(() => setUser(null));
    }
  }, []);

  const login = async (email, password) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    const token = response.data.token;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const user = await axios.get(`${BASE_URL}/auth/profile`);
    setUser(user.data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  console.log({user})

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
