import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Routine from "./pages/Routine";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Welcome from "./pages/Welcome";
import SkinAnalysis from "./pages/SkinAnalysis";
import AnalysisResults from "./pages/AnalysisResults";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <>{children}</> : <Navigate to="/signin" />;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <Layout>
                    <Routes>
                      <Route path="/home" element={<Home />} />
                      <Route path="/routine" element={<Routine />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/order-tracking" element={<OrderTracking />} />
                      <Route path="/analysis/results" element={<AnalysisResults />} />
                      <Route path="/analysis/:mode" element={<SkinAnalysis />} />
                      <Route path="/" element={<Navigate to="/home" replace />} />
                    </Routes>
                  </Layout>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
