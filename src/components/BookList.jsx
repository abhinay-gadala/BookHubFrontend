import { useState } from "react";
import BookItem from "./BookItem";
import { FaSearch, FaPlus } from "react-icons/fa";
import Cookies from "js-cookie";

const BookList = ({ books, onSearchChange, isAdmin, setBooks }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    BookName: "",
    imageUrl: "",
    BookAuthor: "",
    Rating: "",
    Status: "",
    Description: "",
    PublishedDate: "",
    CompanyRights: "",
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submit
  const handleSubmit = async () => {
    const token = Cookies.get("jwt_token");
    try {
      const response = await fetch("http://localhost:3005/api/books", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add book");

      const newBook = await response.json();

      // ✅ Update local state
      setBooks((prev) => [...prev, newBook]);
      setShowForm(false);

      // Reset form
      setFormData({
        BookName: "",
        imageUrl: "",
        BookAuthor: "",
        Rating: "",
        Status: "",
        Description: "",
        PublishedDate: "",
        CompanyRights: "",
      });
      alert("Successfully uploaded")
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-[#18191A] min-h-screen relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          All Books
        </h2>
        <div className="relative w-56 sm:w-64">
          <input
            type="search"
            placeholder="Search books..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full 
                       bg-gray-100 dark:bg-[#3A3B3E] 
                       border border-gray-300 dark:border-gray-600 
                       text-gray-800 dark:text-gray-200 
                       placeholder-gray-500 dark:placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 text-base">
            <FaSearch />
          </span>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Admin Add Card */}
        {isAdmin && (
          <div
            className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl h-56 cursor-pointer hover:border-blue-500 transition"
            onClick={() => setShowForm(true)}
          >
            <FaPlus className="text-4xl text-gray-500" />
          </div>
        )}

        {books.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            isAdmin={isAdmin}
            setBooks={setBooks}
          />
        ))}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white dark:bg-[#242526] p-6 rounded-xl shadow-lg w-full max-w-2xl relative">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Add New Book
            </h3>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Book Name
                </span>
                <input
                  type="text"
                  name="BookName"
                  value={formData.BookName}
                  onChange={handleChange}
                  className="p-2 border rounded mt-1"
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Image URL
                </span>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="p-2 border rounded mt-1"
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Author
                </span>
                <input
                  type="text"
                  name="BookAuthor"
                  value={formData.BookAuthor}
                  onChange={handleChange}
                  className="p-2 border rounded mt-1"
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Rating
                </span>
                <input
                  type="number"
                  step="0.1"
                  name="Rating"
                  value={formData.Rating}
                  onChange={handleChange}
                  className="p-2 border rounded mt-1"
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </span>
                <input
                  type="text"
                  name="Status"
                  value={formData.Status}
                  onChange={handleChange}
                  className="p-2 border rounded mt-1"
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Published Date
                </span>
                <input
                  type="date"
                  name="PublishedDate"
                  value={formData.PublishedDate}
                  onChange={handleChange}
                  className="p-2 border rounded mt-1"
                  required
                />
              </label>

              <label className="flex flex-col md:col-span-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company Rights
                </span>
                <input
                  type="text"
                  name="CompanyRights"
                  value={formData.CompanyRights}
                  onChange={handleChange}
                  className="p-2 border rounded mt-1"
                  required
                />
              </label>

              <label className="flex flex-col md:col-span-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </span>
                <textarea
                  name="Description"
                  value={formData.Description}
                  onChange={handleChange}
                  className="p-2 border rounded mt-1"
                  rows="3"
                  required
                />
              </label>

              <div className="col-span-2 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
