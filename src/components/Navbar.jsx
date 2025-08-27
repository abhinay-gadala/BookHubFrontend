import cookies from "js-cookie";
import { Link } from "react-router";
import   { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  }


  return (
    <header className="bg-white shadow-sm py-4 px-8 md:px-16 lg:px-24 flex justify-between items-center rounded-b-xl">
      <Link to="/" className="flex items-center space-x-2">
        {/* <svg className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 4H3C1.9 4 1 4.9 1 6v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 6h17v4H4V6zm17 14H4V12h17v8zM14 16h4v2h-4v-2z"/>
        </svg> */}
        <img src="https://res.cloudinary.com/dkwllsxnd/image/upload/v1756227343/bookhub-high-resolution-logo-transparent_ubbg5q.png" alt="BookHub Logo" className="h-10 w-full" />
        <span className="text-xl font-bold text-gray-800">BookHub</span>
      </Link>
    
      <nav className="flex space-x-4">
        <Link to="/" className="text-gray-600 mt-2 hover:text-blue-500 transition-colors duration-200">Home</Link>
        <Link to="/bookshelves" className="text-gray-600 mt-2 hover:text-blue-500 transition-colors duration-200">Bookshelves</Link>
        <Link to="/wishlist" className="text-gray-600 mt-2 hover:text-blue-500 transition-colors duration-200">Wishlist</Link>
        <Link to="/settings" className="text-gray-600 mt-2 hover:text-blue-500 transition-colors duration-200">Settings</Link>
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2  rounded-full hover:bg-blue-600 transition-colors duration-200" onClick={handleLogout}>Logout</Link>
      </nav>
    </header>
  );
}

export default Navbar;