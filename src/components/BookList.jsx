import BookItem from "./BookItem";
import { FaSearch } from "react-icons/fa";

const BookList = (props) => {

    const { books, onSearchChange } = props;

  return (
   <div className="p-6 bg-white dark:bg-[#18191A] min-h-screen">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">All Books</h2>
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
  {/* Search Icon */}
  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 text-base">
    <FaSearch />  
  </span>
</div>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {books.map((book) => (
      <BookItem key={book.id} book={book} />
    ))}
  </div>
</div>

)
};

export default BookList;