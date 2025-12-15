import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { Link } from "react-router";

const MyWishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">No books in wishlist.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={item.bookImage}
                alt={item.bookTitle}
                className="h-48 w-full object-cover rounded"
              />

              <h3 className="font-semibold mt-3">{item.bookTitle}</h3>

              <p className="text-lg font-bold mt-1">${item.price}</p>

              <Link
                to={`/books/${item.bookId}`}
                className="btn btn-outline btn-sm w-full mt-3"
              >
                View Book
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishlist;
