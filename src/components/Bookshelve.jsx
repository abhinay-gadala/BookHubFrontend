import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import BookList from './BookList';

const Bookshelves = () => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [mockBooks, setMockBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  

  // Mock data to simulate fetching book information
  useEffect(() => {
    async function fetchBooks() {
      const url = "http://localhost:3005/api/books";
      try {
        const token = Cookies.get("jwt_token");
      const option = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, option);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const formattedData = {
       books: result.data.map(boop => ({
        id: boop._id,            // MongoDB _id
        title: boop.BookName || "Untitled",
        author: boop.BookAuthor || "Unknown",
        status: boop.Status || "Uncategorized",
        imageUrl: boop.imageUrl || "",   // fallback empty if missing
        rating: boop.Rating || 0,        // fallback 0 if missing
    })),
  };

      // result contains { message, data }
      setMockBooks(formattedData.books);  // ✅ use the "data" property
    } catch (error) {
      console.log("Error while fetching books:", error);
    }
  }
  fetchBooks();
}, []);




  // Filter and search the books based on the selected status and search term
  const filteredBooks = mockBooks.filter(book => {
    const matchesStatus = selectedStatus === 'All' || book.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="font-sans bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
  <Navbar />
  {/* Layout */}
  <div className="flex">
    {/* Sidebar */}
    <aside className="w-60 p-6 bg-white border-r border-gray-200 shadow-sm h-screen sticky top-0">
      <h3 className="text-xl font-extrabold text-gray-800 mb-6 tracking-tight">
        Bookshelves
      </h3>
      <ul className="space-y-2 text-sm font-medium">
        {["All", "Love", "Horror", "Psychology", "Rich"].map((status) => (
          <li key={status}>
            <a
              href="#"
              onClick={() => setSelectedStatus(status)}
              className={`block py-2.5 px-4 rounded-lg transition-all duration-200 ${
                selectedStatus === status
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              {status}
            </a>
          </li>
        ))}
      </ul>
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-8">
      <BookList books={filteredBooks} onSearchChange={setSearchTerm} />
    </main>
  </div>
</div>

  );
}

export default Bookshelves;