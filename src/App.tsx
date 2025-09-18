import { Route, Routes } from "react-router-dom"
import Main from "./components/Main"
import Details from "./components/Details"
import Sell from "./components/Sell"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Menubar from "./components/Menubar"
import Profile from "./components/Profile";
import { useState } from "react"

const App = () => {
  const [search, setSearch] = useState<string>("");
  const [menu, setMenu] = useState<string>("");

  return (
   <>
    <Navbar setSearch={setSearch} />
    <Menubar setMenu={setMenu} />
    <Routes>
      <Route path="/" element={<Main search={search} menu={menu} />} />
      <Route path="/product/:productId" element={<Details />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    <Footer />
   </>
  )
}

export default App