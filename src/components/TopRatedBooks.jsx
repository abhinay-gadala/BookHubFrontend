import { Link } from "react-router";
import BookCarousel from "./BookCarousel";

const TopRatedBooks = () => {
  const books = [
    { id: 1, image: "https://imgv2-2-f.scribdassets.com/img/document/754094308/original/26cd44f0b0/1?v=1", title: "The Psychology of Money: Timeless Lessons on Wealth, Greed, and Happiness", author: "Morgan Housel" },
    { id: 2, image: "https://m.media-amazon.com/images/I/81aCMT1zKtL._UF894,1000_QL80_.jpg", title: "Harry Potter", author: "J. K. Rowling" },
    { id: 3, image: "https://m.media-amazon.com/images/I/61mcntVwlkL.jpg", title: "Change Your Mindset To Achieve Success: The Ultimate Guide to Eliminate Self-Doubt, Build Confidence.", author: "Heinen, Ale A." },
    { id: 4, image: "https://m.media-amazon.com/images/I/71smIoGNeiL._UF1000,1000_QL80_.jpg", title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 5, image: "https://m.media-amazon.com/images/I/81LQfPc1XvL._UF1000,1000_QL80_.jpg", title: "The 100 Best Romance Novels", author: "Jennifer Lawler"},
    { id: 6, image: "https://m.media-amazon.com/images/I/71-gp9itE1L._UF1000,1000_QL80_.jpg", title: "The Mind Psychology For Teens", author: "Sarah Fisher"},
    { id: 7, image: "https://m.media-amazon.com/images/I/51Ok4kT+SiL._UF1000,1000_QL80_.jpg", title: "Zero to One: Notes on Startups", author: "Peter Thiel"},

    
  ];

  return (
   <div className="px-4 md:px-16 lg:px-24 py-14 bg-white dark:bg-[#18191A] rounded-xl">
  {/* Header */}
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
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
    <div className="flex space-x-8 rounded-lg p-2 bg-white dark:bg-[#18191A]">
      <BookCarousel books={books} />
    </div>
  </div>
</div>


  );
};


export default TopRatedBooks;