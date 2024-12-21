import React, { createContext, useContext, useState, useEffect } from "react";

// Create context for authentication
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialize state from localStorage or default to false
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  // Save authentication state and user to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [isAuthenticated, user]);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Remove from localStorage on logout
    localStorage.removeItem("user");
    localStorage.removeItem('mobileNumber'); // Clear mobile number

  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the authentication context
export function useAuth() {
  return useContext(AuthContext);
}
