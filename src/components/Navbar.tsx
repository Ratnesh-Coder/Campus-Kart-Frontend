import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";
import CampusKart from "../assets/CampusKart.png";

type searchProp = {
  setSearch: any;
};

const Navbar = (props: searchProp) => {
  const [loginPop, setLoginPop] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="bg-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2">
                <img src={CampusKart} alt="Campus Kart Logo" className="h-16 w-auto transition-transform duration-200 ease-in-out hover:scale-105" />
              </Link>
            </div>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex flex-grow max-w-xl mx-4">
              <div className="relative w-full">
                <input
                  type="search"
                  onChange={(e) => props?.setSearch(e.target.value)}
                  placeholder="Find books, calculators, and more..."
                  className="w-full h-10 pl-4 pr-10 border-2 border-neutral-400 rounded-full focus:outline-none focus:border-black"/>
                <div className="absolute top-0 right-0 h-10 w-10 flex items-center justify-center text-neutral-600">
                  <SearchIcon />
                </div>
              </div>    
            </div>

            {/* Right Side Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-6">
              {user ? (
                <>
                  <Link to="/profile" className="font-semibold text-neutral-600 hover:text-black">
                    Profile
                  </Link>
                  <button onClick={logout} className="font-semibold text-neutral-600 hover:text-black">
                    Logout
                  </button>
                </>
              ) : (
                <div
                  onClick={() => setLoginPop(!loginPop)}
                  className="cursor-pointer font-semibold text-neutral-600 hover:text-black">
                  Login
                </div>
              )}
              <Link
                to="/sell"
                className="bg-secondary text-white px-4 py-2 rounded-full font-bold transition-transform hover:scale-105"
              >
                + SELL
              </Link>
            </div>

            {/* Hamburger Button (Mobile) */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-neutral-600">
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white pb-4 px-4 space-y-4">
             <div className="relative w-full">
                <input
                  type="search"
                  onChange={(e) => props?.setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full h-10 pl-4 pr-10 border-2 border-neutral-200 rounded-full"
                />
                <div className="absolute top-0 right-0 h-10 w-10 flex items-center justify-center text-neutral-500">
                  <SearchIcon />
                </div>
              </div>
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-semibold text-neutral-600">Profile</Link>
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-semibold text-neutral-600">Logout</button>
                </>
              ) : (
                 <button onClick={() => { setLoginPop(true); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-semibold text-neutral-600">Login</button>
              )}
          </div>
        )}
      </nav>
      {loginPop && <Login setLoginPop={setLoginPop} />}
    </>
  );
};

// NEW: Icon components are now defined directly within Navbar.tsx for simplicity.
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
);
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
);
const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
);

export default Navbar;