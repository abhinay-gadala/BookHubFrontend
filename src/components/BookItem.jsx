import { CiBookmark } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";
import { Link } from "react-router";
import { useContext } from "react";
import { WishlistContext } from "../reducers/wishListReducer";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const BookItem = ({ book, isAdmin, setBooks }) => {
  const { wishlist, dispatch } = useContext(WishlistContext);
  const isInWishlist = wishlist.some((item) => item.title === book.title);

  const handleAddToWishlist = async () => {
    const token = Cookies.get("jwt_token");
    try {
      const response = await fetch("https://bookhubbackend-4urx.onrender.com/api/addwishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          title: book.title, 
          imageUrl: book.imageUrl, 
          author: book.author, 
          rating: book.rating, 
          status: book.status 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add book to wishlist");
      }

      const data = await response.json();
      dispatch({ type: "ADD_ITEM", payload: data });
    } catch (error) {
      console.error("Error adding book to wishlist:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = Cookies.get("jwt_token");
      const response = await fetch(`https://bookhubbackend-4urx.onrender.com/api/books/${book.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to delete book");

      // ✅ update state (remove book from list)
      setBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="relative flex bg-white dark:bg-[#3A3B3E] p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.01] h-auto min-h-56">
      <Link to={`/bookshelves/${book.id}`}>
        <div className="w-24 h-40 mr-6 flex-shrink-0">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-full object-cover rounded-lg shadow-sm"
          />
        </div>
      </Link>

      <div className="flex-1 flex flex-col justify-between">
        <Link to={`/bookshelves/${book.id}`}>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-snug line-clamp-2">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 italic">
              by {book.author}
            </p>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
            <span className="font-medium">
              Rating:{" "}
              <span className="text-yellow-500 font-semibold">
                {book.rating} ⭐
              </span>
            </span>
            <span className="ml-6">
              Status:{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {book.status}
              </span>
            </span>
          </div>
          <div>
             <button
             className="bg-blue-600 hover:bg-blue-700 hover:shadow-lg text-white px-5 py-2 rounded-full font-medium shadow-md transition-all duration-200 ">
              Read More
            </button>
          </div>
        </Link>

        <div>
          {!isAdmin && (
             <button
              className={`absolute top-0 right-0 px-5 py-2 rounded-tr-xl font-medium  transition-all duration-200
                ${
                  isInWishlist
                    ? "bg-white text-[#3a3b3e] dark:bg-[#3a3b3e] dark:text-[#3a3b3e]" // 🔄 switches automatically
                    : "bg-white text-[#3a3b3e]  hover:bg-blue-700 hover:rounded-lg hover:shadow-lg dark:bg-[#3a3b3e] dark:text-white"
                }`}
              onClick={handleAddToWishlist}
              disabled={isInWishlist}
            >
              {isInWishlist ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>


          )}
        </div>
        <div>
           {isAdmin && (
            <button
              onClick={handleDelete}
              className="absolute bottom-3 right-3 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
            >
              <FaTrash />
            </button>
      )}

        </div>
      </div>
    </div>
  );
};

export default BookItem;
