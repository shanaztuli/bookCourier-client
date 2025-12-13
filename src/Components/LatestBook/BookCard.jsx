const BookCard = ({ book }) => {
  const { title, author, image, price } = book;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
      <img src={image} alt={title} className="h-56 w-full object-cover" />

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

        <p className="text-sm text-gray-500">by {author}</p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-red-800 font-bold">${price}</span>

          <button className="px-4 py-1 text-sm rounded btn-primary hover:bg-red-900">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
