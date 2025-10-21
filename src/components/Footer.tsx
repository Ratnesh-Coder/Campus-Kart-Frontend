// import { Link } from 'react-router-dom';
// import BWUKart from '../assets/CampusKart.png';

// const Footer = () => {
//   return (
//     <footer className="bg-neutral-900 text-neutral-300 mt-16">
//       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//           {/* About Section */}
//           <div>
//             <h3 className="text-lg font-semibold">Campus Kart</h3>
//             <p className="mt-2 text-sm text-gray-400">
//               The on-campus marketplace for students to buy and sell educational goods.
//             </p>
//           </div>

//           {/* Quick Links Section */}
//           <div>
//             <h3 className="text-sm font-semibold tracking-wider uppercase">Quick Links</h3>
//             <ul className="mt-4 space-y-2">
//               <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
//               <li><a href="/sell" className="text-gray-400 hover:text-white">Sell an Item</a></li>
//               <li><a href="#" className="text-gray-400 hover:text-white">Categories</a></li>
//             </ul>
//           </div>

//           {/* Legal Section */}
//           <div>
//             <h3 className="text-sm font-semibold tracking-wider uppercase">Legal</h3>
//             <ul className="mt-4 space-y-2">
//               <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
//               <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
//             </ul>
//           </div>

//           {/* Social Media Section */}
//           <div>
//             <h3 className="text-sm font-semibold tracking-wider uppercase">Connect</h3>
//             <ul className="mt-4 space-y-2">
//               <li><a href="#" className="text-gray-400 hover:text-white">Facebook</a></li>
//               <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
//               <li><a href="#" className="text-gray-400 hover:text-white">Instagram</a></li>
//             </ul>
//           </div>
//         </div>

//         <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
//           <p>&copy; {new Date().getFullYear()} Campus Kart. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




import { Link } from 'react-router-dom';
import BWUKart from '../assets/CampusKart.png'; // Assuming your logo is here

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Column 1: Logo and Tagline */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <img src={BWUKart} alt="Campus Kart Logo" className="h-10 w-auto" />
              <span className="font-bold text-xl text-white">Campus Kart</span>
            </Link>
            <p className="mt-4 text-sm text-neutral-400">
              The on-campus marketplace for students to buy and sell educational goods.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-400">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/sell" className="hover:text-white transition-colors">Sell an Item</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-400">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-400">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-700 pt-8 text-center">
          <p className="text-sm text-neutral-400">&copy; {new Date().getFullYear()} Campus Kart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;