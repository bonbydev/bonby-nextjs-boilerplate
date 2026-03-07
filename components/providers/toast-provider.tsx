"use client";

import dynamic from "next/dynamic";

const ToastContainer = dynamic(() => import("react-toastify").then((mod) => mod.ToastContainer), {
  ssr: false,
});

export function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
}
