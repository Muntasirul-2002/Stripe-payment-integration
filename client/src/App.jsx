import React from "react";
import { Route, Routes } from "react-router-dom";
import Payment from "./components/Payment";
import Success from "./components/Success";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Payment />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
};

export default App;
