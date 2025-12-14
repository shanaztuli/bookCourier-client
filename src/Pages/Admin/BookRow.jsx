const BookRow = ({ book, handleStatusChange, handleDelete }) => {
  return (
    <tr className="text-center border-b">
      <td className="px-4 py-2">{book.title}</td>
      <td className="px-4 py-2">{book.author}</td>
      <td className="px-4 py-2 capitalize">{book.status}</td>
      <td className="px-4 py-2 flex gap-2 justify-center">
        <button
          onClick={() =>
            handleStatusChange(
              book._id,
              book.status === "published" ? "unpublished" : "published"
            )
          }
          className="btn btn-sm btn-outline"
        >
          {book.status === "published" ? "Unpublish" : "Publish"}
        </button>
        <button
          onClick={() => handleDelete(book._id)}
          className="btn btn-sm btn-error"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default BookRow;
