
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
     <div className="flex h-56 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.01]">
  {/* Book Cover Image */}
  <Link to={`/bookshelves/${book.id}`}>
    <div className="w-24 h-36 mr-6 flex-shrink-0">
      <img
        src={book.imageUrl}
        alt={book.title}
        className="w-full h-full object-cover rounded-lg shadow-sm"
      />
    </div>
  </Link>

  {/* Book Details */}
  <div className="flex-1 flex flex-col justify-between">
    <Link to={`/bookshelves/${book.id}`}>
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 italic">by {book.author}</p>
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-4">
        <span className="font-medium">
          Rating:{" "}
          <span className="text-yellow-500 font-semibold">{book.rating} ⭐</span>
        </span>
        <span className="ml-6">
          Status:{" "}
          <span className="text-blue-600 font-semibold">{book.status}</span>
        </span>
      </div>
    </Link>

    <div>
      <button
        className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
        onClick={handleAddToWishlist}
      >
        Add to Wishlist
      </button>
    </div>
  </div>
</div>

  );
};

export default BookItem;