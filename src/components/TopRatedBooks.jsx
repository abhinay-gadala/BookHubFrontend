const TopRatedBooks = () => {
  const books = [
    { id: 1, image: "https://placehold.co/300x450/e0e0e0/000000?text=The+Secret", title: "The Secret", author: "Rhonda Byrne" },
    { id: 2, image: "https://placehold.co/300x450/e0e0e0/000000?text=Fall+To+Earth", title: "Fall To Earth", author: "Jon Britz" },
    { id: 3, image: "https://placehold.co/300x450/e0e0e0/000000?text=Borrowed+Magic", title: "Borrowed Magic", author: "Stephanie Foxe" },
  ];

  return (
    <div className="px-4 md:px-16 lg:px-24 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Top Rated Books</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200">
          Find Books
        </button>
      </div>
      <div className="flex items-center justify-center space-x-4 overflow-x-auto py-4">
        <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex space-x-6">
          {books.map((book) => (
            <BookCard key={book.id} image={book.image} title={book.title} author={book.author} />
          ))}
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const BookCard = ({ image, title, author }) => {
  return (
    <div className="flex-shrink-0 w-64 md:w-72 lg:w-80 p-4 bg-white rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
      <img src={image} alt={title} className="w-full h-auto rounded-lg shadow-md mb-4" />
      <h3 className="text-lg font-semibold text-center text-gray-800">{title}</h3>
      <p className="text-sm text-center text-gray-500">{author}</p>
    </div>
  );
};

export default TopRatedBooks;