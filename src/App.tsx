import React, { useState, useEffect, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { debug } from "./utils/debug";
import { useAuth } from "./context/AuthContext";
import AdminRoute from "./components/AdminRoute"; // Eager-load the guard
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Menubar from "./components/Menubar";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import { CartProvider } from "./context/CartContext";
import Checkout from "./components/Checkout";
import Sell from "./components/Sell";
import ProductDetail from "./components/ProductDetail";
import EditProduct from "./components/EditProduct";
import BookingSuccess from './components/BookingSuccess';
import MyBookings from './components/MyBookings';
import ResetPassword from "./components/ResetPassword";
import Footer from "./components/Footer";
import TermsAndConditions from "./legal/TermsAndConditions";
import PrivacyPolicy from "./legal/PrivacyPolicy";
import ReturnRefundPolicy from "./legal/ReturnRefundPolicy";
import FAQ from "./legal/FAQ";

// --- Lazy-loaded Admin components ---
const AdminPendingProducts = lazy(() => import("./components/AdminPendingProducts"));
// const AdminRoute = lazy(() => import("./components/AdminRoute"));

const App: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [menu, setMenu] = useState<string>("");

  const { user } = useAuth();

  // ✅ Safe debug (shows only in dev)
  useEffect(() => {
    debug("Logged-in user (safe log):", { email: user?.email, role: user?.role });
  }, [user]);

  return (
    <CartProvider>
      <>
        {/* Notification toaster */}
        <Toaster position="top-center" reverseOrder={false} />

        {/* Navbar */}
        <Navbar setSearch={setSearch} setMenu={setMenu} />

        {/* Menubar for desktop */}
        <div className="hidden md:block">
          <Menubar setMenu={setMenu} />
        </div>

        {/* Routes */}
        <Routes>
          {/* Public / User Routes */}
          <Route path="/" element={<Main search={search} menu={menu} />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/legal/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/legal/return-refund-policy" element={<ReturnRefundPolicy />} />
          <Route path="/legal/faq" element={<FAQ />} />

          {/* Admin Routes */}
          <Route
            path="/admin/pending-products"
            element={
              <Suspense fallback={<div>Loading admin dashboard...</div>}>
                <AdminRoute>
                  <AdminPendingProducts />
                </AdminRoute>
              </Suspense>
            }
          />
        </Routes>

        {/* Footer */}
        <Footer />
      </>
    </CartProvider>
  );
};

export default App;
