import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
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

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <Navbar />
      {/* Your Navbar component goes here */}
      <div className="flex">
        <div className="w-56 p-6 bg-gray-50 border-r border-gray-200 h-screen">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Bookshelves</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {['All', 'Love', 'Horror', 'Psychology', 'Rich'].map(status => (
              <li key={status}>
                <a
                  href="#"
                  onClick={() => setSelectedStatus(status)}
                  className={`block py-2 px-3 rounded-md transition-colors ${selectedStatus === status ? 'bg-blue-100 text-blue-800 font-medium' : 'hover:bg-gray-200'}`}
                >
                  {status}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <main className="flex-1">
          <BookList books={filteredBooks} onSearchChange={setSearchTerm} />
        </main>
      </div>
    </div>
  );
}

export default Bookshelves;