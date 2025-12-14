import React from "react";
import { Link } from "react-router";

const PaymentCanceled = () => {
  return (
    <div>
      <h2>Payment is cancelled . Please try again</h2>
      <Link to="/dashboard/my-orders">
        <button className="btn btn-btn text-black">Try Again</button>
      </Link>
    </div>
  );
};

export default PaymentCanceled;
