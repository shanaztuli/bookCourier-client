import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const OrderModal = ({ book, closeModal }) => {
 const { user } = useAuth();

  const handleOrder = (e) => {
    e.preventDefault();

    const form = e.target;
    const orderData = {
      bookId: book._id,
      bookTitle: book.title,
      price: book.price,

      name: user.displayName,
      email: user.email,
      librarianEmail: book.librarianEmail,

      phone: form.phone.value,
      address: form.address.value,
    };

    fetch(`${import.meta.env.VITE_API_URL}/orders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then(() => {
        closeModal(); 
        toast("Order placed successfully!");
      });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Order Book</h3>

        <form onSubmit={handleOrder} className="space-y-3">
          <input
            value={user.displayName || ""}
            readOnly
            className="input input-bordered w-full"
          />

          <input
            value={user.email || ""}
            readOnly
            className="input input-bordered w-full"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            required
            className="input input-bordered w-full"
          />

          <textarea
            name="address"
            placeholder="Address"
            required
            className="textarea textarea-bordered w-full"
          />

          <div className="flex flex-col gap-3">
            <button type="submit" className="btn btn-btn w-full">
              Place Order
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-outline w-full"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
