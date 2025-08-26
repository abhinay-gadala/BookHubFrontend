import { FaGoogle } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-white py-8 mt-12 rounded-t-xl">
      <div className="flex justify-center space-x-6 mb-4">
        <a href="#" aria-label="Google" className="text-gray-500 hover:text-blue-500 transition-colors duration-200">
          <FaGoogle className="h-8 w-8"/>
        </a>
        <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-blue-500 transition-colors duration-200">
          <FaInstagram className="h-8 w-8"/>
        </a>
        <a href="#" aria-label="YouTube" className="text-gray-500 hover:text-blue-500 transition-colors duration-200">
          <FaTwitter className="h-8 w-8"/>
        </a>
      </div>
      <p className="text-center text-sm text-gray-500">Contact Us</p>
    </footer>
  );
};

export default Footer;