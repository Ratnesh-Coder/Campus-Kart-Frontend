import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
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

const App = () => {
  const [search, setSearch] = useState<string>("");
  const [menu, setMenu] = useState<string>("");

  return (
   <>
   <Toaster position="top-center" reverseOrder={false} />
    <Navbar setSearch={setSearch} setMenu={setMenu} />
    <div className="hidden md:block">
      <Menubar setMenu={setMenu} />
    </div>
    <Routes>
      <Route path="/" element={<Main search={search} menu={menu} />} />
      <Route path="/product/:id" element={<Details />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />
      <Route path="/edit-profile" element={<EditProfile />} />
    </Routes>
    <Footer />
   </>
  )
}

export default App