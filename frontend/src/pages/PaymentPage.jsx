import React from "react";
import UpiPayment from "../components/UPIPayment";

const PaymentPage = () => {
  const totalAmount = Number(localStorage.getItem("cartTotal")) || 0;

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Complete Your Payment</h1>
      <UpiPayment amount={totalAmount} />
    </div>
  );
};

export default PaymentPage;
