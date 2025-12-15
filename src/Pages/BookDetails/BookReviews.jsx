import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BookReviews = ({ bookId }) => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", bookId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${bookId}`);
      return res.data;
    },
  });

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Reviews</h3>

      {reviews.length === 0 && <p>No reviews yet.</p>}

      {reviews.map((r) => (
        <div key={r._id} className="border rounded p-4 mb-3">
          <div className="flex justify-between">
            <span className="font-medium">{r.userName}</span>
            <span>⭐ {r.rating}</span>
          </div>
          <p className="text-sm mt-2">{r.review}</p>
        </div>
      ))}
    </div>
  );
};

export default BookReviews;
