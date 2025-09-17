import { useContext } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { WishlistContext } from "../reducers/wishListReducer";
import { RingLoader } from "react-spinners";
import Navbar from "./Navbar";



const Wishlist = () => {
   const { wishlist, dispatch } = useContext(WishlistContext);


  // Function to handle deleting a wishlist item
const handleDelete = async (id) => {
  try {
    const token = Cookies.get("jwt_token");
    console.log("Deleting item with ID:", id);

    const response = await fetch(`https://bookhubbackend-4urx.onrender.com/api/deletewishlist/${id}`, {
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
    dispatch({ type: "REMOVE_ITEM", payload: id });
    console.log("Wishlist item deleted:", data);

    // ✅ Update state immediately (removes item without refresh)
    

  } catch (error) {
    console.error("Error deleting wishlist item:", error);
  }
};

const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }


  if(!wishlist){ 
    return(
      <>
        <Navbar />
        <div className="flex-1 flex-column p-8 min-h-screen bg-white dark:bg-[#18191A] shadow-smcd">
          <h1 className="flex justify-center items-center">
          <RingLoader color="#4A90E2" size={80} />
          </h1>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#18191A] dark:to-[#18191A] p-6">
  <div className="w-full max-w-3xl bg-white dark:bg-[#3A3B3E] shadow-2xl rounded-2xl p-8">
    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 text-center tracking-wide">
      My Wishlist
    </h1>

    {wishlist.length > 0 ? (
      <div className="space-y-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-6 p-5 bg-gray-50 dark:bg-[#282A2E] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image Div */}
            <div className="flex-shrink-0">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-24 h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
              />
            </div>

            {/* Details Div */}
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {item.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 italic">
                {item.author}
              </p>
              <div className="flex items-center space-x-6 mt-3 text-sm">
                <p className="dark:text-gray-300">
                  Rating:{" "}
                  <span className="font-medium text-yellow-500">
                    {item.rating} ⭐
                  </span>
                </p>
                <p className="dark:text-gray-300">
                  Status:{" "}
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {item.status}
                  </span>
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
      <img
        src="https://res.cloudinary.com/dkwllsxnd/image/upload/v1756402395/Gemini_Generated_Image_ecatxiecatxiecat_ioa14l.png"
        alt="Empty Wishlist"
        className="text-center h-9/12 rounded-2xl mx-auto mt-4"
      />
    )}
  </div>
</div>


    </>
    
  );
};

export default Wishlist;
