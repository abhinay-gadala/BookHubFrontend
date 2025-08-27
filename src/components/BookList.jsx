import BookItem from "./BookItem";

const BookList = (props) => {

    const { books, onSearchChange } = props;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Books</h2>
        <div className="relative">
          <input
            type="search"
            placeholder="Search"
            className="w-48 px-4 py-2 text-sm rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        {/* Search Icon (simplified) */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
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