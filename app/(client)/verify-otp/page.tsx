"use client";

import { useVerifyOTPMutation } from "@/src/redux/features/auth/authApi";
import React from "react";

export default function page() {
  const [verifyOTP] = useVerifyOTPMutation();
  const email = localStorage.getItem("email");
  // const [formData, setFormData] = React.useState({
  //   email: email,
  //   token: "",
  // }); // initial form dat

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: email,
      token: data.get("otp"),
    };
    console.log(actualData);
    const res = verifyOTP(actualData);
    console.log("res", res);
  };

  return (
    <div className=" flex justify-center items-center  min-h-screen">
      <form onSubmit={handleSubmit} action="" className=" flex flex-col gap-3">
        {/* <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className=" bg-blue-100 text-black py-3 rounded-xl px-8"
          required
        /> */}
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP here"
          className=" bg-blue-100 text-black py-3 rounded-xl px-8"
          required
        />
        <input
          type="submit"
          value="Submit"
          className=" bg-blue-700 text-white py-3 rounded-xl px-8"
        />
      </form>
    </div>
  );
}
