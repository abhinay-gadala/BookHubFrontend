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
   <header className="bg-white shadow-md py-4 px-8 md:px-16 lg:px-24 flex justify-between items-center rounded-b-2xl border-b border-gray-200 sticky top-0 z-50">
  <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200">
    <img 
      src="https://res.cloudinary.com/dkwllsxnd/image/upload/v1756227343/bookhub-high-resolution-logo-transparent_ubbg5q.png" 
      alt="BookHub Logo" 
      className="h-10 w-auto drop-shadow-md" 
    />
    <span className="text-2xl font-extrabold text-gray-800 tracking-wide">BookHub</span>
  </Link>

  <nav className="flex space-x-6">
    <Link to="/" className="text-gray-600 mt-2 hover:text-blue-600 transition-colors duration-200 font-medium">Home</Link>
    <Link to="/bookshelves" className="text-gray-600 mt-2 hover:text-blue-600 transition-colors duration-200 font-medium">Bookshelves</Link>
    <Link to="/wishlist" className="text-gray-600 mt-2 hover:text-blue-600 transition-colors duration-200 font-medium">Wishlist</Link>
    <Link to="/settings" className="text-gray-600 mt-2 hover:text-blue-600 transition-colors duration-200 font-medium">Settings</Link>
    <Link 
      to="/login" 
      className="bg-blue-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 font-semibold" 
      onClick={handleLogout}
    >
      Logout
    </Link>
  </nav>
</header>

  );
}

export default Navbar;