import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // ✅ FIXED
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "./Navbar";

const BookItemDetails = () => {
  const [bookDetails, setBookDetails] = useState(null);
  const { id } = useParams();
  console.log("Book ID from URL:", id); // Debugging line
  useEffect(() => {
    const fetchBookDetails = async () => {
      const url = `http://localhost:3005/api/books/${id}`;
      try {
        const token = Cookies.get("jwt_token");
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();

        const formattedDataDetails = {
          id: result.data._id,
          title: result.data.BookName || "Untitled",
          author: result.data.BookAuthor || "Unknown",
          status: result.data.Status || "Uncategorized",
          rating: result.data.Rating || 0,
          imageUrl: result.data.imageUrl
            ? result.data.imageUrl.startsWith("http")
              ? result.data.imageUrl
              : `/images/${result.data.imageUrl}`
            : "/images/placeholder.png",
          description: result.data.Description || "No description available.",
          publisher: result.data.CompanyRights || "Unknown",
          releaseDate: result.data.PublishedDate || "Unknown",
        };

        setBookDetails(formattedDataDetails);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  // ✅ prevent crash before data loads
  if (!bookDetails) {
  return (
    <div className="min-h-screen flex items-center justify-center text-lg font-medium">
      Loading book details...
    </div>
  );
}
const jwtToken = Cookies.get("jwt_token");
if (jwtToken === undefined) {
  return <Navigate to="/login" />;
}

return (
  <>
    <Navbar />
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-[#18191A] dark:to-[#18191A] py-12 px-6 font-sans">
  {/* Book Details Card */}
  <div className="flex flex-col md:flex-row items-center md:items-start p-10 rounded-2xl bg-white dark:bg-[#3A3B3E] w-full max-w-5xl mx-auto mt-10 border border-gray-200 dark:border-gray-700">
    {/* Book Image */}
    <div className="relative w-56 h-72 md:mr-10 mb-8 md:mb-0">
      <img
        src={bookDetails.imageUrl}
        alt={bookDetails.title}
        className="w-full h-full object-cover rounded-xl border border-gray-200 dark:border-gray-700 dark:shadow-lg"
      />
    </div>

    {/* Book Info */}
    <div className="flex-1 text-center md:text-left">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-3 leading-snug">
        {bookDetails.title}
      </h1>
      <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-5 italic">
        by {bookDetails.author}
      </h2>

      {/* Rating */}
      <div className="flex items-center justify-center md:justify-start space-x-3 mb-5">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
          Avg Rating:
        </span>
        <span className="text-lg font-medium text-yellow-500">
          ⭐ {bookDetails.rating}
        </span>
      </div>

      {/* Status */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-start md:space-x-3 mb-3">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
          Status:
        </span>
        <span className="text-blue-600 dark:text-blue-400 font-semibold">
          {bookDetails.status}
        </span>
      </div>

      {/* Published Date */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-start md:space-x-3 mb-3">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
          Published Date:
        </span>
        <span className="text-gray-600 dark:text-gray-400">
          {bookDetails.releaseDate}
        </span>
      </div>

      {/* Publisher */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-start md:space-x-3">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
          Publisher:
        </span>
        <span className="text-gray-600 dark:text-gray-400">
          {bookDetails.publisher}
        </span>
      </div>
    </div>
  </div>

  {/* About Author Section */}
  <div className="p-10 rounded-2xl bg-white dark:bg-[#3A3B3E] w-full max-w-5xl mx-auto mt-8 border border-gray-200 dark:border-gray-700">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b pb-3 border-gray-200 dark:border-gray-700">
      About Author
    </h2>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
      {bookDetails.description}
    </p>
  </div>
</div>


  </>
);
};

export default BookItemDetails;
