import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";

const LatestBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://book-courier-server-eight.vercel.app/books/latest")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {

    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-red-800"></span>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-red-800">Latest Books</h2>
        <p className="text-gray-500 mt-2">
          Newly added books from our library partners
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default LatestBooks;
