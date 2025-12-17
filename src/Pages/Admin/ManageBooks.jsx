import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BookRow from "./BookRow";
import { auth } from "../../firebase/firebase.config";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);

  // Fetch all books added by librarians
  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/admin/books`)
  //     .then((res) => res.json())
  //     .then((data) => setBooks(data))
  //     .catch((err) => console.error(err));
  // }, []);
  //
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = await auth.currentUser.getIdToken();

        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/books`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          console.error("Not array:", data);
          setBooks([]);
        }
      } catch (err) {
        console.error(err);
        setBooks([]);
      }
    };

    fetchBooks();
  }, []);


  const handleStatusChange = (bookId, newStatus) => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/books/${bookId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then(() => {
        setBooks((prev) =>
          prev.map((book) =>
            book._id === bookId ? { ...book, status: newStatus } : book
          )
        );
        toast.success(`Book ${newStatus}`);
      })
      .catch(() => toast.error("Failed to update status"));
  };

  const handleDelete = (bookId) => {
    if (!confirm("Are you sure you want to delete this book and its orders?"))
      return;

    fetch(`${import.meta.env.VITE_API_URL}/admin/books/${bookId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setBooks((prev) => prev.filter((book) => book._id !== bookId));
        toast.success("Book deleted successfully");
      })
      .catch(() => toast.error("Failed to delete book"));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Manage Books</h2>

      <table className="min-w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-400">
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Author</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <BookRow
              key={book._id}
              book={book}
              handleStatusChange={handleStatusChange}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBooks;
