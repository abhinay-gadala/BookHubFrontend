import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router";

function BookCarousel({ books }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // adjust per card size
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
   
      <div className="relative max-w-6xl mx-auto px-4">
  {/* Header */}

  {/* Scroll Buttons */}
  <button
    onClick={() => scroll("left")}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white dark:bg-[#3A3B3E] shadow-md rounded-full hover:bg-gray-100 dark:hover:bg-[#282A2E]"
  >
    <FaChevronLeft className="text-gray-800 dark:text-gray-200" />
  </button>
  <button
    onClick={() => scroll("right")}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white dark:bg-[#3A3B3E] shadow-md rounded-full hover:bg-gray-100 dark:hover:bg-[#282A2E]"
  >
    <FaChevronRight className="text-gray-800 dark:text-gray-200" />
  </button>

  {/* Book Cards Row */}
  <Link to="/bookshelves">
    <div
      ref={scrollRef}
      className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth px-10"
    >
      {books.map((book, idx) => (
        <div
          key={idx}
          className="relative flex-shrink-0 w-56 h-72 bg-gray-200 dark:bg-[#18191A] rounded-xl overflow-hidden group"
        >
          {/* Book Image */}
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover"
          />

          {/* Hover Overlay with details */}
          <div className="absolute inset-0 bg-gray-100 dark:bg-[#282A2E] bg-opacity-95 flex flex-col justify-center items-center 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              {book.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {book.author}
            </p>
          </div>
        </div>
      ))}
    </div>
  </Link>
</div>

    
  );
}


export default BookCarousel