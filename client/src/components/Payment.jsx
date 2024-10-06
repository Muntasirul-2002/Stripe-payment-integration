import React from "react";
import axios from "axios";
const Payment = () => {
  const Payment = async () => {
    let response = await axios.post("http://localhost:8080/payment");
    if (response && response.status === 200) {
      window.location.href = response.data.url;
      console.log(response.data);
    }
  };
  return (
    <div>
      <button onClick={Payment}>Payment</button>
    </div>
  );
};

export default Payment;
