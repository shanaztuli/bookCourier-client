import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Invoices = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Invoices</h2>

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((pay, i) => (
            <tr key={pay._id}>
              <td>{i + 1}</td>
              <td className="text-xs">{pay.transactionId}</td>
              <td>${pay.amount}</td>
              <td>{new Date(pay.paidAt).toLocaleDateString()}</td>
            </tr>
          ))}

          {payments.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-6">
                No invoices found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
