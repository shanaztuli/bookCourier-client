import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
      if (sessionId) {
        axiosSecure.patch(`/order-payment-success?session_id=${sessionId}`);
      }
    }, [axiosSecure, sessionId]);

    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-600">
          Payment Successful 🎉
        </h2>
        <Link to="/dashboard/my-orders">
          <button className="btn btn-btn mt-4">Go to My Orders</button>
        </Link>
      </div>
    );
};

export default PaymentSuccess;