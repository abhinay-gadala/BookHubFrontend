import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import BookList from './BookList';
import { RingLoader } from 'react-spinners';

const Bookshelves = () => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isbooks, setISbooks] = useState(false);
  const [mockBooks, setMockBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ check role from cookies
  const role = Cookies.get("role");
  const isAdmin = role === "admin";

  // Fetch books from backend
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
            id: boop._id,
            title: boop.BookName || "Untitled",
            author: boop.BookAuthor || "Unknown",
            status: boop.Status || "Uncategorized",
            imageUrl: boop.imageUrl || "",
            rating: boop.Rating || 0,
          })),
        };

        setMockBooks(formattedData.books);
        setISbooks(true);
      } catch (error) {
        console.log("Error while fetching books:", error);
      }
    }
    fetchBooks();
  }, []);

  // Filter and search books
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
    <div className="font-sans bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#282A2E] dark:to-[#3A3B3E] min-h-screen">
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-60 p-6 bg-white dark:bg-[#3A3B3E] border-r border-gray-200 dark:border-gray-700 shadow-sm h-screen sticky top-0">
          <h3 className="text-xl font-extrabold text-gray-800 dark:text-gray-100 mb-6 tracking-tight">
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
                      : "text-gray-700 dark:text-gray-300 hover:bg-[#282A2E] dark:hover:bg-[#282A2E] hover:text-blue-600"
                  }`}
                >
                  {status}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex-column p-8 min-h-screen bg-white dark:bg-[#18191A] shadow-sm rounded-tl-xl">
          {isbooks ? (
            <BookList
              books={filteredBooks}
              onSearchChange={setSearchTerm}
              isAdmin={isAdmin}
              setBooks={setMockBooks}
            />
          ) : (
            <h1 className="flex justify-center items-center">
              <RingLoader color="#4A90E2" size={80} />
            </h1>
          )}
        </main>
      </div>
    </div>
  );
};

export default Bookshelves;
