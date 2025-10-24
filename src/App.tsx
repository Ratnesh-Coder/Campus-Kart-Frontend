import React, { useState, useEffect, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Main from "./components/Main";
import Details from "./components/Details";
import Sell from "./components/Sell";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Menubar from "./components/Menubar";
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import EditProduct from "./components/EditProduct";
import EditProfile from "./components/EditProfile";
import { useAuth } from "./context/AuthContext";
import { debug } from "./utils/debug";

// --- Lazy-loaded Admin components ---
const AdminPendingProducts = lazy(() => import("./components/AdminPendingProducts"));
const AdminRoute = lazy(() => import("./components/AdminRoute"));

const App: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [menu, setMenu] = useState<string>("");

  const { user } = useAuth();

  // ✅ Safe debug (shows only in dev)
  useEffect(() => {
    debug("Logged-in user (safe log):", { email: user?.email, role: user?.role });
  }, [user]);

  return (
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
        <Route path="/product/:id" element={<Details />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/edit-profile" element={<EditProfile />} />

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
  );
};

export default App;
