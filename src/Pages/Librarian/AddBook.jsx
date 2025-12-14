import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AddBook = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const book = {
      title: form.title.value,
      author: form.author.value,
      description: form.description.value,
      image: form.image.value,
      price: form.price.value,
      category: form.category.value,
      isbn: form.isbn.value,
      pages: form.pages.value,
      language: form.language.value,
      publisher: form.publisher.value,
      status: form.status.value,
      librarianEmail: user.email,
    };

    try {
      await axiosSecure.post("/books", book);
      Swal.fire("Success!", "Book added successfully", "success");
      form.reset();
    } catch (err) {
      Swal.fire("Error", "Failed to add book", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className=" rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-semibold mb-6 ">
          📚 Add New Book
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Book Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Book Title</label>
            <input
              name="title"
              required
              className="input input-bordered w-full"
              placeholder="Atomic Habits"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium mb-1">Author</label>
            <input
              name="author"
              required
              className="input input-bordered w-full"
              placeholder="James Clear"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              name="image"
              required
              className="input input-bordered w-full"
              placeholder="https://..."
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Price ($)</label>
            <input
              name="price"
              type="number"
              required
              className="input input-bordered w-full"
              placeholder="15"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              name="category"
              className="input input-bordered w-full"
              placeholder="Self Help"
            />
          </div>

          {/* ISBN */}
          <div>
            <label className="block text-sm font-medium mb-1">ISBN</label>
            <input
              name="isbn"
              className="input input-bordered w-full"
              placeholder="9780735211292"
            />
          </div>

          {/* Pages */}
          <div>
            <label className="block text-sm font-medium mb-1">Pages</label>
            <input
              name="pages"
              type="number"
              className="input input-bordered w-full"
              placeholder="320"
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium mb-1">Language</label>
            <input
              name="language"
              className="input input-bordered w-full"
              placeholder="English"
            />
          </div>

          {/* Publisher */}
          <div>
            <label className="block text-sm font-medium mb-1">Publisher</label>
            <input
              name="publisher"
              className="input input-bordered w-full"
              placeholder="Avery"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select name="status" className="select select-bordered w-full">
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              className="textarea textarea-bordered w-full"
              placeholder="Write a short description..."
            ></textarea>
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              disabled={loading}
              className="btn btn-btn w-full text-lg"
            >
              {loading ? "Adding Book..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

};

export default AddBook;
