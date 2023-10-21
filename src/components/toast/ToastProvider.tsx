import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => {
  return (
    <ToastContainer position="bottom-center" autoClose={2000} pauseOnHover />
  );
};

export default ToastProvider;
