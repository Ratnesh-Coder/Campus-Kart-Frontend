import { Link } from 'react-router-dom';
import RebuZZar from '../assets/RebuZZar.png'; // Logo

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">

          {/* Logo & Tagline */}
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <img src={RebuZZar} alt="RebuZZar Logo" className="h-10 w-auto" />
              <span className="font-bold text-xl text-white">RebuZZar</span>
            </Link>
            <p className="mt-4 text-sm text-neutral-400">
              On-campus marketplace for students to buy and sell educational goods.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-400">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/sell" className="hover:text-white transition-colors">Sell an Item</Link></li>
              <li><Link to="/legal/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-400">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/legal/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal/return-refund-policy" className="hover:text-white transition-colors">Return & Refund Policy</Link></li>
              <li><Link to="/legal/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-400">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start">
                <LocationIcon />
                <span className="ml-3 text-sm">
                  398, Ramkrishnapur Rd, near Jagadighata Market, Barasat, Kolkata, West Bengal 700125
                </span>
              </li>
              <li className="flex items-start">
                <EmailIcon />
                <a href="mailto:rebuzzar@gmail.com" className="ml-3 text-sm hover:text-white" target="_blank" rel="noopener noreferrer">rebuzzar@gmail.com</a>
              </li>
              <li className="flex items-start">
                <PhoneIcon /><a href="tel:+91 89004 09172" className="ml-3 text-sm hover:text-white" target="_blank" rel="noopener noreferrer">+91 89004 09172</a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-400">Social Media</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start">
                <InstagramIcon />
                <a href="https://www.instagram.com/_rebuzzar_/" className="ml-3 text-sm hover:text-white" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li className="flex items-start">
                <TwitterIcoon />
                <a href="https://x.com/ZRebu39201?t=MWcgHUeOxbKaaH3LZ0LMng&s=09" className="ml-3 text-sm hover:text-white" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
              <li className="flex items-center">
                <FacebookIcon />
                <a href="https://www.facebook.com/share/1HxqhrLqKV/" className="ml-3 text-sm hover:text-white" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
              <li className="flex items-center">
                <YouTubeIcon />
                <a href="https://youtube.com/@rebuzzar?si=qdbzuaF_4K3SKIlq" className="ml-3 text-sm hover:text-white" target="_blank" rel="noopener noreferrer">
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* <div className="mt-6">
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Stay Updated</h3>
            <form className="mt-2 flex">
              <input type="email" placeholder="Your email" className="p-2 rounded-l-md border border-neutral-700 flex-grow" />
              <button type="submit" className="bg-secondary text-white px-4 rounded-r-md hover:bg-opacity-90 transition">Subscribe</button>
            </form>
          </div> */}

        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-neutral-700 pt-8 text-center">
          <p className="text-sm text-neutral-400">&copy; {new Date().getFullYear()} RebuZZar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// ========================
// SVG Icons
// ========================
const LocationIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>
);
const PhoneIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.97.757l1.2 4.8a1 1 0 01-.27.948l-2.2 2.2a11.042 11.042 0 005.516 5.516l2.2-2.2a1 1 0 01.948-.27l4.8 1.2a1 1 0 01.757.97V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0 text-secondary" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-2a1.5 1.5 0 11-3.001.001A1.5 1.5 0 0116.5 5z"/>
  </svg>
);

const TwitterIcoon = () => (
  <svg className="w-5 h-5 flex-shrink-0 text-secondary" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.23 5.924c-.793.352-1.644.587-2.538.693a4.468 4.468 0 001.963-2.46 8.935 8.935 0 01-2.828 1.083A4.458 4.458 0 0015.43 4c-2.481 0-4.494 2.012-4.494 4.493 0 .353.04.697.116 1.027A12.64 12.64 0 013.123 5.134a4.493 4.493 0 001.387 5.992 4.43 4.43 0 01-2.03-.56v.056a4.497 4.497 0 003.602 4.406 4.462 4.462 0 01-2.025.077 4.499 4.499 0 004.2 3.119A8.95 8.95 0 012 19.541 12.635 12.635 0 008.837 21c8.07 0 12.48-6.687 12.48-12.48 0-.19-.004-.379-.013-.566a8.91 8.91 0 002.214-2.274z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0 text-secondary" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.03h-2.54v-2.9h2.54V9.83c0-2.5 1.49-3.88 3.78-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.8 8.44-4.94 8.44-9.93z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0 text-secondary" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a2.978 2.978 0 00-2.096-2.104C19.34 3.5 12 3.5 12 3.5s-7.34 0-9.402.582A2.978 2.978 0 00.502 6.186 31.01 31.01 0 000 12a31.01 31.01 0 00.502 5.814 2.978 2.978 0 002.096 2.104C4.66 20.5 12 20.5 12 20.5s7.34 0 9.402-.582a2.978 2.978 0 002.096-2.104A31.01 31.01 0 0024 12a31.01 31.01 0 00-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
  </svg>
);


export default Footer;
