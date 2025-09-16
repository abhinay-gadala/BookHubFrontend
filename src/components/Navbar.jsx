import { Link } from "react-router";
import Cookies from 'js-cookie'
import { useContext } from "react";
import { WishlistContext } from "../reducers/wishListReducer";
import { useDarkContext } from "../reducers/darkModeContext";


const Navbar = () => {
  const { wishlist } = useContext(WishlistContext);

  const { darkMode, toggleDarkMode } = useDarkContext();

  const role = Cookies.get("role") 
  const admis = role == "admin"; 

  return (
  <header className="bg-white dark:bg-[#3A3B3E] shadow-md py-4 px-8 md:px-16 lg:px-24 flex justify-between items-center rounded-b-2xl border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"> 
  <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200">
    <img 
      src="https://res.cloudinary.com/dkwllsxnd/image/upload/v1756227343/bookhub-high-resolution-logo-transparent_ubbg5q.png" 
      alt="BookHub Logo" 
      className="h-10 w-auto drop-shadow-md" 
    />
    <span className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 tracking-wide">BookHub</span>
  </Link>

  <nav className="flex space-x-6">
    <Link to="/" className="text-gray-600 dark:text-gray-300 mt-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">Home</Link>
    <Link to="/bookshelves" className="text-gray-600 dark:text-gray-300 mt-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">Bookshelves</Link>
    { !admis && (
      <Link to="/wishlist" className="text-gray-600 dark:text-gray-300 mt-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
      Wishlist 
      {wishlist.length > 0 
        ? <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-2">{wishlist.length}</span> 
        : <span> </span>} 
      </Link>
    )}
    <Link to="/settings" className="text-gray-600 dark:text-gray-300 mt-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">Settings</Link>

    <div className="mt-2 text-gray-600 dark:text-gray-300">
      {darkMode ? 
        <button onClick={toggleDarkMode}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
        </button> 
        : 
        <button onClick={toggleDarkMode}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
        </button>
      } 
    </div>
  </nav>
</header>


  );
}

export default Navbar;