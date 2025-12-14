import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["myOrders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/user/${user.email}`);
      return res.data;
    },
  });

  const handlePay = async (order) => {
    const paymentInfo = {
      orderId: order._id,
      bookTitle: order.bookTitle,
      price: order.price,
      email: order.email,
    };

    const res = await axiosSecure.post("/order-checkout-session", paymentInfo);

    window.location.assign(res.data.url);
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel order?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/orders/cancel/${id}`).then(() => {
          refetch();
          Swal.fire("Cancelled!", "", "success");
        });
      }
    });
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Book</th>
          <th>Date</th>
          <th>Status</th>
          <th>Payment</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order.bookTitle}</td>
            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            <td>{order.orderStatus}</td>
            <td>
              {order.paymentStatus === "paid" ? (
                <span className="text-green-600">Paid</span>
              ) : (
                "Unpaid"
              )}
            </td>
            <td>
              {order.orderStatus === "pending" && (
                <>
                  <button
                    onClick={() => handlePay(order)}
                    className="btn btn-sm btn-btn mr-2"
                  >
                    Pay Now
                  </button>
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="btn btn-sm btn-error"
                  >
                    Cancel
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MyOrders;
