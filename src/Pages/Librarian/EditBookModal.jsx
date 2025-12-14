
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EditBookModal = ({ book, close, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedBook = {
      title: form.title.value,
      price: Number(form.price.value),
      status: form.status.value,
      image: form.image.value,
    };

    await axiosSecure.patch(`/books/${book._id}`, updatedBook);

    Swal.fire("Updated!", "Book updated successfully", "success");
    refetch();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-gray-500 rounded-xl w-full max-w-lg p-6 relative">
        <h3 className="text-2xl font-semibold mb-4">Edit Book</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            defaultValue={book.title}
            className="input input-bordered w-full"
          />

          <input
            name="image"
            defaultValue={book.image}
            className="input input-bordered w-full"
          />

          <input
            name="price"
            type="number"
            defaultValue={book.price}
            className="input input-bordered w-full"
          />

          <select
            name="status"
            defaultValue={book.status}
            className="select select-bordered w-full"
          >
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={close} className="btn btn-ghost">
              Cancel
            </button>
            <button className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
