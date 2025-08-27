
import { CiBookmark } from "react-icons/ci";
import Cookies from "js-cookie";
import { Link } from "react-router";


const BookItem = (props) => {
  const { book } = props;

  const handleAddToWishlist = async () => {
     const token = Cookies.get("jwt_token");
     try{
        const response = await fetch("http://localhost:3005/api/addwishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ title: book.title, imageUrl: book.imageUrl, author: book.author, rating: book.rating, status: book.status }),
        });
        if (!response.ok) {
          throw new Error("Failed to add book to wishlist");
        }
        const data = await response.json();
        console.log("Book added to wishlist:", data);
      } catch (error) {
        console.error("Error adding book to wishlist:", error);
      }
    }
 


  return (
      <div className="flex h-48 bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
        {/* Book Cover Image */}
        <Link to={`/bookshelves/${book.id}`}>
          <div className="w-20 h-32 mr-6 flex-shrink-0">
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-full h-full object-cover rounded"
            />
          </div>
        </Link>

      {/* Book Details */}
      
      <div className="flex-1 flex flex-col justify-between">
        <Link to={`/bookshelves/${book.id}`}>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{book.title}</h3>
          <p className="text-sm text-gray-500 mb-2">by {book.author}</p>
        </div>
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <span>Rating: {book.rating} ⭐</span>
            <span className="ml-6">
              Status: <span className="text-blue-600 font-medium">{book.status}</span>
            </span>
          </div>
          </div>
         </Link>
          <div>
            <button className="bg-blue-500 text-white px-4 py-2  rounded-full hover:bg-blue-600 transition-colors duration-200" onClick={handleAddToWishlist}>
              Add to wishlist
            </button>
          </div>
        </div>
        
      </div>
  
  );
};

export default BookItem;