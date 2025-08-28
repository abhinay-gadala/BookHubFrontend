import { Link } from "react-router";

const TopRatedBooks = () => {
  const books = [
    { id: 1, image: "https://imgv2-2-f.scribdassets.com/img/document/754094308/original/26cd44f0b0/1?v=1", title: "The Psychology of Money: Timeless Lessons on Wealth, Greed, and Happiness", author: "Morgan Housel" },
    { id: 2, image: "https://m.media-amazon.com/images/I/81aCMT1zKtL._UF894,1000_QL80_.jpg", title: "Harry Potter", author: "J. K. Rowling" },
    { id: 3, image: "https://m.media-amazon.com/images/I/61mcntVwlkL.jpg", title: "Change Your Mindset To Achieve Success: The Ultimate Guide to Eliminate Self-Doubt, Build Confidence.", author: "Heinen, Ale A." },
    { id: 4, image: "https://m.media-amazon.com/images/I/71smIoGNeiL._UF1000,1000_QL80_.jpg", title: "To Kill a Mockingbird", author: "Harper Lee" },
    
  ];

  return (
   <div className="px-4 md:px-16 lg:px-24 py-14 bg-gradient-to-b from-white to-gray-50">
  {/* Header */}
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
      Top Rated Books
    </h2>
    <Link to="/bookshelves">
      <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full shadow-md hover:bg-blue-700 transition-all duration-200">
        Find Books
      </button>
    </Link>
  </div>

  {/* Carousel */}
  <div className="flex items-center justify-center space-x-6 overflow-x-auto py-6">
    {/* Left Arrow */}
    <button className="text-gray-400 hover:text-blue-600 transition-colors duration-200 focus:outline-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    {/* Book Cards */}
    <div className="flex space-x-8">
      {books.map((book) => (
        <BookCard
          key={book.id}
          image={book.image}
          title={book.title}
          author={book.author}
        />
      ))}
    </div>

    {/* Right Arrow */}
    <button className="text-gray-400 hover:text-blue-600 transition-colors duration-200 focus:outline-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
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