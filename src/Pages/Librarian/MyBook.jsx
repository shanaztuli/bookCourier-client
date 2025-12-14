import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import EditBookModal from "./EditBookModal";


const MyBooks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async () => {
    const res = await axiosSecure.get(`/books/librarian/${user.email}`);
    setBooks(res.data);
  };

 useEffect(() => {
   if (!user?.email) return; 

   const fetchBooks = async () => {
     try {
       const res = await axiosSecure.get(`/books/librarian/${user.email}`);
       setBooks(res.data);
     } catch (err) {
       console.error(err);
     }
   };

   fetchBooks();
 }, [user?.email, axiosSecure]);


  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">📚 My Books</h2>

      <div className="overflow-x-auto  rounded-xl shadow">
        <table className="table">
          <thead className="">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>
                  <img
                    src={book.image}
                    alt=""
                    className="w-14 h-20 object-cover rounded"
                  />
                </td>
                <td className="font-medium">{book.title}</td>
                <td>
                  <span
                    className={`badge ${
                      book.status === "published"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {book.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => setSelectedBook(book)}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}

            {books.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-500">
                  No books added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {selectedBook && (
        <EditBookModal
          book={selectedBook}
          close={() => setSelectedBook(null)}
          refetch={fetchBooks}
        />
      )}
    </div>
  );
};

export default MyBooks;
