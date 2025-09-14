import {  FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

function Footer() {
  return (
    <footer className="bg-white dark:bg-[#18191A] py-10 mt-12 rounded-t-xl">
  <div className="max-w-6xl mx-auto px-6">
    
    {/* Top section */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
      
      {/* Company / Brand */}
      <div>
        <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200">
          <img 
            src="https://res.cloudinary.com/dkwllsxnd/image/upload/v1756227343/bookhub-high-resolution-logo-transparent_ubbg5q.png" 
            alt="BookHub Logo" 
            className="h-10 w-auto drop-shadow-md" 
          />
          <span className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 tracking-wide">BookHub</span>
        </div>
        <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
          Your trusted place for books and knowledge.  
          Discover, read, and grow with us.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-3">Quick Links</h3>
        <ul className="space-y-2 text-gray-500 dark:text-gray-400 text-sm">
          <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">About Us</a></li>
          <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</a></li>
          <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Terms & Conditions</a></li>
        </ul>
      </div>

      {/* Social Media */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-3">Follow Us</h3>
        <div className="flex justify-center md:justify-start space-x-5 mb-3">
          <a href="https://github.com/abhinay-gadala" aria-label="Github" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition">
            <SiGithub className="h-6 w-6"/>
          </a>
          <a href="https://www.instagram.com/abhi._7.__/" aria-label="Instagram" className="text-gray-500 dark:text-gray-400 hover:text-pink-500 transition">
            <FaInstagram className="h-6 w-6"/>
          </a>
          <a href="https://x.com/abhinay_2105" aria-label="Twitter" className="text-gray-500 dark:text-gray-400 hover:text-blue-500 transition">
            <FaTwitter className="h-6 w-6"/>
          </a>
          <a href="https://www.youtube.com/channel/UCFWyQmn-BfXGBLcidaa7zew" aria-label="YouTube" className="text-gray-500 dark:text-gray-400 hover:text-red-600 transition">
            <FaYoutube className="h-6 w-6"/>
          </a>
          <a href="https://www.linkedin.com/in/gadala-abhinay/" aria-label="LinkedIn" className="text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 transition">
            <FaLinkedin className="h-6 w-6"/>
          </a>
        </div>
        <div>
          <h2 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-3">Contact Us</h2>
          <p className="text-gray-500 dark:text-gray-400">+91 891 998 7714</p>
        </div>
      </div>
    </div>

    {/* Bottom section */}
    <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
      © {new Date().getFullYear()} BookHub. All rights reserved.
    </div>
  </div>
</footer>

  );
}


export default Footer