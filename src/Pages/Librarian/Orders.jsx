import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Orders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      const res = await axiosSecure.get(`/orders/librarian/${user.email}`);
      setOrders(res.data);
    };

    fetchOrders();
  }, [user?.email, axiosSecure]);

  //  Change status
  const handleStatusChange = async (id, status) => {
    await axiosSecure.patch(`/orders/status/${id}`, { status });

    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, orderStatus: status } : o))
    );

    Swal.fire("Updated!", "Order status updated", "success");
  };

  //  Cancel order
  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel this order?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/orders/cancel/${id}`);
        setOrders((prev) =>
          prev.map((o) =>
            o._id === id ? { ...o, orderStatus: "cancelled" } : o
          )
        );
        Swal.fire("Cancelled!", "", "success");
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Book Orders</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Book</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.bookTitle}</td>
                <td>{order.email}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                <td>
                  {order.orderStatus !== "cancelled" ? (
                    <select
                      className="select select-sm"
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  ) : (
                    <span className="text-red-600">Cancelled</span>
                  )}
                </td>

                <td>
                  {order.orderStatus === "pending" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="btn btn-sm btn-error"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center mt-6 text-gray-500">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
