import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Navbar from "./Navbar";



const Wishlist = () => {
 const [wishlistItems, setWishlistItems] = useState([]);


  useEffect(() => {
    const fetchWishlist = async () => {
      const token = Cookies.get("jwt_token");
      try {
        const response = await fetch("http://localhost:3005/api/getwishlist", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }
        const data = await response.json();
        setWishlistItems(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, []);

  // Function to handle deleting a wishlist item
const handleDelete = async (id) => {
  try {
    const token = Cookies.get("jwt_token");
    console.log("Deleting item with ID:", id);

    const response = await fetch(`http://localhost:3005/api/deletewishlist/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete wishlist item");
    }

    const data = await response.json();
    console.log("Wishlist item deleted:", data);

    // ✅ Update state immediately (removes item without refresh)
    setWishlistItems((prev) => prev.filter((item) => item._id !== id));

  } catch (error) {
    console.error("Error deleting wishlist item:", error);
  }
};


  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-4">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Wishlist</h1>
          {wishlistItems.length > 0 ? (
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                {/* Image Div */}
                <div className="flex-shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-20 h-24 object-cover rounded-md"
                  />
                </div>

                {/* Details Div */}
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                  <p className="text-gray-600 text-sm mt-1">{item.author}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <p>Rating: <span className="font-medium text-yellow-500">{item.rating} ⭐</span></p>
                    <p>Status: <span className="font-bold text-blue-600">{item.status}</span></p>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-full shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-8">Your wishlist is empty.</p>
        )}
      </div>
    </div>
    </>
    
  );
};

export default Wishlist;
