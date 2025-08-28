import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
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

const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 p-6">
  <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8">
    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-wide">
      My Wishlist
    </h1>

    {wishlistItems.length > 0 ? (
      <div className="space-y-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-6 p-5 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image Div */}
            <div className="flex-shrink-0">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-24 h-32 object-cover rounded-lg border border-gray-200"
              />
            </div>

            {/* Details Div */}
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold text-gray-800">{item.title}</h2>
              <p className="text-gray-600 text-sm mt-1 italic">{item.author}</p>
              <div className="flex items-center space-x-6 mt-3 text-sm">
                <p>
                  Rating:{" "}
                  <span className="font-medium text-yellow-500">
                    {item.rating} ⭐
                  </span>
                </p>
                <p>
                  Status:{" "}
                  <span className="font-bold text-blue-600">{item.status}</span>
                </p>
              </div>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(item._id)}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-5 rounded-full shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    ) : (
      <img src="https://res.cloudinary.com/dkwllsxnd/image/upload/v1756402395/Gemini_Generated_Image_ecatxiecatxiecat_ioa14l.png" alt="Empty Wishlist" className="text-center h-9/12 rounded-2xl mx-auto mt-4" />
    )}
  </div>
  </div>

    </>
    
  );
};

export default Wishlist;
