// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import Login from "./Login";
// import CampusKart from "../assets/CampusKart.png";

// type searchProp = {
//   setSearch: React.Dispatch<React.SetStateAction<string>>;
// };

// const Navbar = (props: searchProp) => {
//   const [loginPop, setLoginPop] = useState(false);
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { user, logout } = useAuth();

//   return (
//     <>
//       <nav className="bg-white sticky top-0 z-20">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
            
//             {/* Logo and Brand Name */}
//             <div className="flex-shrink-0">
//               <Link to="/" className="flex items-center space-x-2 group">
//                 <img src={CampusKart} alt="Campus Kart Logo" className="h-24 w-auto transform translate-y-1 transition-transform duration-200 ease-in-out hover:scale-110"/>
//                 <span className="text-xl font-bold text-neutral-800 hidden sm:inline group-hover:text-primary-dark transition-colors">
//                   Campus Kart
//                 </span>
//               </Link>
//             </div>

//             {/* Search Bar (Always Visible) */}
//             <div className="hidden md:flex flex-grow mx-4 w-full md:max-w-xl">
//               <div className="relative w-full">
//                 <input
//                   type="search"
//                   onChange={(e) => props?.setSearch(e.target.value)}
//                   placeholder="Find books, calculators, and more..."
//                   className="w-full h-10 pl-4 pr-10 border-2 border-neutral-200 rounded-full focus:outline-none focus:border-primary-dark"/>
//                 <div className="absolute top-0 right-0 h-10 w-10 flex items-center justify-center text-neutral-500">
//                   <button aria-label="Search"><SearchIcon /></button>
//                 </div>
//               </div>    
//             </div>

//             {/* Right Side Links (Desktop) */}
//             <div className="hidden md:flex items-center space-x-6">
//               {user ? (
//                 <>
//                   <Link to="/profile" className="p-2 rounded-full hover:bg-neutral-200 transition-colors" title="Profile">
//                     <UserIcon />
//                   </Link>
//                   <button onClick={logout} className="p-2 rounded-full hover:bg-neutral-200 transition-colors" title="Logout">
//                     <LogoutIcon />
//                   </button>
//                 </>
//               ) : (
//                 <div
//                   onClick={() => setLoginPop(!loginPop)}className="flex item-center gap-x-2 font-semibold text-neutral-600 hover:text-primary-dark transition-colors">
//                   Login
//                     <UserIcon />
//                 </div>
//               )}
//               {/* <Link
//                 to="/sell"
//                 className="bg-secondary text-white px-4 py-2 rounded-full font-bold hover:opacity-90 transition-transform duration-200 hover:scale-105">
//                 + SELL
//               </Link> */}
//             </div>

//             {/* Hamburger Button (Mobile) */}
//             <div className="md:hidden flex items-center">
//               <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-neutral-600 p-2">
//                 {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//           <div className="md:hidden bg-white border-t border-neutral-200">
//             <div className="px-2 pt-3 pb-4 space-y-2">
//               {user ? (
//                 <>
//                     <Link to="/profile" onClick={() => setMobileMenuOpen(false)} 
//                           className="flex items-center py-3 px-3 rounded-lg font-medium text-neutral-700 hover:bg-neutral-100">
//                         <UserIcon /> <span className="ml-3">My Profile</span>
//                     </Link>
//                     <button onClick={() => { logout(); setMobileMenuOpen(false); }} 
//                             className="flex items-center w-full text-left py-3 px-3 rounded-lg font-medium text-neutral-700 hover:bg-neutral-100">
//                         <LogoutIcon /> <span className="ml-3">Logout</span>
//                     </button>
//                 </>
//               ) : (
//                 <button onClick={() => setLoginPop(!loginPop)}className="flex item-center gap-x-2 font-semibold text-neutral-600 hover:text-primary-dark transition-colors">
//                   Login
//                     <UserIcon />
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </nav>
//       {loginPop && <Login setLoginPop={setLoginPop} />}
//     </>
//   );
// };

// // --- SVG Icons ---
// const SearchIcon = () => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> );
// const MenuIcon = () => ( <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg> );
// const CloseIcon = () => ( <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg> );
// const UserIcon = () => ( <div className="w-7 h-7 flex items-center justify-center rounded-full bg-neutral-700 text-white">
// <svg className="w-5 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div>);
// const LogoutIcon = () => ( <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> );

// export default Navbar;

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";
import CampusKart from "../assets/CampusKart.png";

const Navbar = ({ setSearch, setMenu }: { setSearch: (value: string) => void; setMenu: (value: string) => void; }) => {
  const [loginPop, setLoginPop] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const { user, logout } = useAuth();

  const categories = ["All", "Books", "Electronics", "Lab Equipment", "Stationery", "Furniture", "Cycle", "Accessories"];

  const handleCategoryClick = (category: string) => {
    const newCategory = category === "All" ? "" : category;
    setActiveCategory(category);
    setMenu(newCategory);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* --- DESKTOP NAVBAR --- */}
          <div className="hidden md:flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2 group">
                <img src={CampusKart} alt="Campus Kart Logo" className="h-auto w-14" />
                <span className="text-xl font-bold text-neutral-800">Campus Kart</span>
              </Link>
            </div>
            <div className="flex-grow max-w-xl mx-4">
              <div className="relative w-full">
                <input type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Find books, calculators, and more..." className="w-full h-10 pl-4 pr-10 border-2 border-neutral-200 rounded-full focus:outline-none focus:border-primary-dark" />
                <div className="absolute top-0 right-0 h-10 w-10 flex items-center justify-center text-neutral-500"><SearchIcon /></div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link to="/profile" className="p-2 rounded-full hover:bg-neutral-100" title="Profile"><UserIcon /></Link>
                  <button onClick={logout} className="p-2 rounded-full hover:bg-neutral-100" title="Logout"><LogoutIcon /></button>
                </>
              ) : (
                <button onClick={() => setLoginPop(!loginPop)}className="flex item-center gap-x-2 font-semibold text-neutral-600 hover:text-primary-dark transition-colors">
                  Login
                  <UserIcon />
                  </button>
              )}
              {/* <Link to="/sell" className="bg-secondary text-white px-4 py-2 rounded-full font-bold hover:opacity-90 transition">+ SELL</Link> */}
            </div>
          </div>

          {/* --- MOBILE NAVBAR --- */}
          <div className="md:hidden flex items-center justify-between h-16">
            <div className="flex-1 flex justify-start">
              <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-neutral-600">
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
            <div className="flex-1 flex justify-center">
              <Link to="/"><img src={CampusKart} alt="Campus Kart Logo" className="h-14 w-auto" /></Link>
            </div>
            <div className="flex-1 flex justify-end items-center space-x-2">
              {user ? (
                <Link to="/profile" className="p-2 text-neutral-600"><UserIcon /></Link>
              ) : (
                <button onClick={() => setLoginPop(!loginPop)}className="flex item-center gap-x-2 font-semibold text-neutral-600 hover:text-primary-dark transition-colors">
                  Login
                  <UserIcon />
                  </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar (Always below header) */}
        <div className="md:hidden px-4 pb-3 border-b border-neutral-200">
          <div className="relative w-full">
                <input type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Find books, calculators, and more..." className="w-full h-10 pl-4 pr-10 border-2 border-neutral-200 rounded-full focus:outline-none focus:border-primary-dark" />
            <div className="absolute top-0 right-0 h-10 w-10 flex items-center justify-center text-neutral-500"><SearchIcon /></div>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Now for Categories) */}
        {isMobileMenuOpen && (
  <div
    className="md:hidden absolute top-full left-0 w-full bg-white rounded-b-2xl shadow-lg z-20 overflow-hidden border-t border-neutral-100 animate-slideDown"
  >
    {/* Header */}
    <div className="flex justify-between items-center px-4 py-3 border-b border-neutral-200">
      <h3 className="font-semibold text-neutral-700 text-lg">Categories</h3>
      <button
        onClick={() => setMobileMenuOpen(false)}
        className="text-neutral-500 hover:text-neutral-900 transition-colors"
      >
        ✕
      </button>
    </div>

    {/* Category List */}
    <div className="flex flex-col px-2 py-3 space-y-1">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategoryClick(cat)}
          className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            activeCategory === cat
              ? "bg-neutral-300 text-neutral-800 font-semibold border border-neutral-200 shadow-sm" // Active tab styling
              : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200" // Default hover effect
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  </div>
)}
      </nav>
      {loginPop && <Login setLoginPop={setLoginPop} />}
    </>
  );
};

// --- SVG Icons ---
const SearchIcon = () => ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> );
const MenuIcon = () => ( <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg> );
const CloseIcon = () => ( <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg> );
const UserIcon = () => ( <div className="w-7 h-7 flex items-center justify-center rounded-full bg-neutral-700 text-white">
<svg className="w-5 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div>);
const LogoutIcon = () => ( <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> );

export default Navbar;