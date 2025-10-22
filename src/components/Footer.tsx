import { Link } from 'react-router-dom';
import RebuZZar from '../assets/RebuZZar.png'; // Assuming your logo is here

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Column 1: Logo and Tagline */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <img src={RebuZZar} alt="RebuZZar Logo" className="h-10 w-auto" />
              <span className="font-bold text-xl text-white">RebuZZar</span>
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
              <li><Link to="/Sell" className="hover:text-white transition-colors">Sell an Item</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-400">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Return & Refund Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-400">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="https://www.instagram.com/the_campus_kart?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>

        {/* Column 4: Get in Touch */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-400">Get in Touch</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start">
                <LocationIcon />
                <span className="ml-3">398, Ramkrishnapur Rd, near Jagadighata Market, Barasat, Kolkata, West Bengal 700125</span>
              </li>
              <li className="flex items-start">
                <PhoneIcon />
                <a href="tel:+918016380734" className="ml-3 hover:text-white">+91 7811956491</a>
              </li>
              <li className="flex items-start">
                <EmailIcon />
                <a href="mailto:rebuzzar@gmail.com" className="ml-3 hover:text-white">rebuzzar@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-700 pt-8 text-center">
          <p className="text-sm text-neutral-400">&copy; {new Date().getFullYear()} RebuZZar. All rights reserved.</p>
        </div>
    </footer>
  );
};

// --- SVG Icon Components for the Footer ---
const LocationIcon = () => ( <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> );
const PhoneIcon = () => ( <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg> );
const EmailIcon = () => ( <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> );

export default Footer;