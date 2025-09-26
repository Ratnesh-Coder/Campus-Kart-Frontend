import { useState } from "react";
import { Link } from "react-router-dom";
import BWUKart from "../assets/CampusKart.png"; // Make sure this is your new logo file
import Login from "./Login";
import MenuIcon from "./MenuIcon";
import CloseIcon from "./CloseIcon";
import SearchIcon from "./SearchIcon"; 
import { useAuth } from "../context/AuthContext";

type searchProp = {
  setSearch: any;
};

const Navbar = (props: searchProp) => {
  const [loginPop, setLoginPop] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="bg-slate-100 shadow-md">
        {/* Increased navbar height from h-16 to h-20 */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20"> 
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                {/* Increased logo size from h-12 to h-16 */}
                <img src={BWUKart} alt="Campus Kart Logo" className="h-16 w-auto transition-transform duration-200 ease-in-out hover:scale-105" />
              </Link>
            </div>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex flex-grow max-w-xl">
              <div className="flex h-12 border-2 border-gray-300 rounded-md bg-white flex-grow">
                <input
                  onChange={(e) => props?.setSearch(e.target.value)}
                  placeholder="Find books, calculators, and more..."
                  className="ml-4 w-full outline-none bg-transparent text-lg"
                />
                <button className="bg-gray-800 px-4 flex items-center justify-center rounded-r-md">
                  <SearchIcon />
                </button>
              </div>
            </div>

            {/* Right Side Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-6">
              {user ? (
                <>
                  <Link to="/profile" className="font-bold text-lg hover:underline">
                    Profile
                  </Link>
                  <button onClick={logout} className="font-bold text-lg underline hover:no-underline">
                    Logout
                  </button>
                </>
              ) : (
                <div
                  onClick={() => setLoginPop(!loginPop)}
                  className="cursor-pointer font-bold text-lg underline hover:no-underline"
                >
                  Login
                </div>
              )}
              <Link
                to="/sell"
                className="bg-yellow-500 text-white px-4 py-2 rounded-full font-bold hover:bg-yellow-600 transition"
              >
                + SELL
              </Link>
            </div>

            {/* Hamburger Button (Mobile) */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white pb-4 px-4 space-y-4">
             <div className="flex h-10 border-2 border-gray-300 rounded-md bg-white">
                <input
                  onChange={(e) => props?.setSearch(e.target.value)}
                  placeholder="Search items..."
                  className="ml-3 w-full outline-none bg-transparent"
                />
                <button className="bg-gray-800 px-4 flex items-center justify-center rounded-r-md">
                  <SearchIcon />
                </button>
              </div>
            {user ? (
              <>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-lg">
                  Profile
                </Link>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="block w-full text-left font-bold text-lg">
                  Logout
                </button>
              </>
            ) : (
              <div
                onClick={() => { setLoginPop(!loginPop); setMobileMenuOpen(false); }}
                className="block cursor-pointer font-bold text-lg"
              >
                Login
              </div>
            )}
            <Link
              to="/sell"
              onClick={() => setMobileMenuOpen(false)}
              className="block bg-yellow-500 text-white text-center px-4 py-2 rounded-full font-bold"
            >
              + SELL
            </Link>
          </div>
        )}
      </nav>

      {/* Login Popup */}
      {loginPop && <Login setLoginPop={setLoginPop} />}
    </>
  );
};

export default Navbar;