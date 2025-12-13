import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../../Components/LatestBook/BookCard";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  // 
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/books`)
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  // SEARCH
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  //  SORT
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0;
  });

  return (
    <section className="py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between">
          <h2 className="text-3xl font-bold">All Books</h2>

          {/* Search + Sort */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search by book name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-lg border focus:outline-none"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 rounded-lg border focus:outline-none"
            >
              <option value="">Sort by price</option>
              <option value="low">Low → High</option>
              <option value="high">High → Low</option>
            </select>
          </div>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

      
        {sortedBooks.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No books found.</p>
        )}
      </div>
    </section>
  );
};

export default AllBooks;
