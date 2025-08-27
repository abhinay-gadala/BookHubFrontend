import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // ✅ FIXED
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4 font-sans">
      
      <div className="flex flex-col md:flex-row items-center md:items-start p-8 rounded-lg shadow-lg bg-white w-full max-w-4xl mx-auto mt-10">
        <div className="relative w-48 h-64 md:mr-8 mb-6 md:mb-0">
          <img
            src={bookDetails.imageUrl}
            alt={bookDetails.title}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{bookDetails.title}</h1>
          <h2 className="text-xl text-gray-600 mb-4">by {bookDetails.author}</h2>
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
            <span className="text-sm font-semibold text-gray-700">Avg Rating:</span>
            <span className="text-yellow-400">⭐ {bookDetails.rating}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-start md:space-x-4 mb-2">
            <span className="text-sm font-semibold text-gray-700">Status:</span>
            <span className="text-blue-500 font-medium">{bookDetails.status}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-start md:space-x-4 mb-2">
            <span className="text-sm font-semibold text-gray-700">Published Date:</span>
            <span className="text-gray-600">{bookDetails.releaseDate}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-start md:space-x-4">
            <span className="text-sm font-semibold text-gray-700">Publisher:</span>
            <span className="text-gray-600">{bookDetails.publisher}</span>
          </div>
        </div>
      </div>

      <div className="p-8 rounded-lg shadow-lg bg-white w-full max-w-4xl mx-auto mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Author</h2>
        <p className="text-gray-600 mb-8">{bookDetails.description}</p>
      </div>
    </div>
    </>
    
  );
};

export default BookItemDetails;
