import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/placeOrder/placeOrder.jsx";
import Login from "./components/Login/Login";
import { useAuth } from "./Context/AuthContext";

const App = () => {
  const { isAuthenticated } = useAuth();

  // Not logged in: show only the login page
  if (!isAuthenticated) {
    return <Login />;
  }

  // Logged in: show the main site
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;