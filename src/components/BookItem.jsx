import { Link } from "react-router";

const BookItem = (props) => {
  const { book } = props;
  return (
    <Link to={`/bookshelves/${book.id}`}>
      <div className="flex h-48 bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
        {/* Book Cover Image */}
        <div className="w-20 h-32 mr-6 flex-shrink-0">
          <img
            src={book.imageUrl}
          alt={book.title}
          className="w-full h-full object-cover rounded"
        />
      </div>

      {/* Book Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{book.title}</h3>
          <p className="text-sm text-gray-500 mb-2">by {book.author}</p>
        </div>
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <span>Rating: {book.rating} ⭐</span>
            <span className="ml-6">
              Status: <span className="text-blue-600 font-medium">{book.status}</span>
            </span>
          </div>
          {/* <div className="flex flex-wrap gap-3 text-sm">
            {book.tags && book.tags.map(tag => (
              <span key={tag} className="text-blue-500">{tag}</span>
            ))}
          </div> */}
        </div>
      </div>
    </div>
    </Link>
  );
};

export default BookItem;