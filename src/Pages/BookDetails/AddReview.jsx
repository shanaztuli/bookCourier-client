import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const AddReview = ({ bookId }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const { data } = useQuery({
    queryKey: ["canReview", bookId, user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/reviews/can-review?bookId=${bookId}&email=${user.email}`
      );
      return res.data;
    },
  });

  if (!data?.canReview) return null;

  const onSubmit = async (form) => {
    await axiosSecure.post("/reviews", {
      bookId,
      rating: form.rating,
      review: form.review,
      userEmail: user.email,
      userName: user.displayName,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 border p-4 rounded">
      <h3 className="font-semibold mb-3">Add Your Review</h3>

      <select
        {...register("rating", { required: true })}
        className="border p-2 w-full mb-3"
      >
        <option value="">Rating</option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n} Star
          </option>
        ))}
      </select>

      <textarea
        {...register("review")}
        placeholder="Write your review"
        className="border p-2 w-full mb-3"
      />

      <button className="btn btn-btn w-full">Submit Review</button>
    </form>
  );
};

export default AddReview;
