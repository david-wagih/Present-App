import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from 'next/image'
import { motion } from 'framer-motion';

const Home = () => {
  const [formStep, setFormStep] = useState(1);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [otp, setOtp] = useState("");
  const [otpShow, setOtpShow] = useState(false);
  const [status, setStatus] = useState(false);
  const [role, setRole] = useState("student");

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRole(e.currentTarget.value);
    setFormStep(formStep + 1);
  };
  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOtpShow(!otpShow);
    setFormStep(formStep - 1);
  };

  const getCode = async () => {
    await axios
      .get("http://localhost:3000/api/getCode", {
        params: {
          phonenumber: formValues.phone,
          channel: "sms",
        },
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const verifyCode = async () => {
    await axios
      .get("http://localhost:3000/api/verifyCode", {
        params: {
          phonenumber: formValues.phone,
          code: otp,
        },
      })
      .then((data) => {
        console.log(data);
        if (data.data.status === "approved") {
          setStatus(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const Step1 = () => {
    return (
      <motion.div animate={{ y: -10 }} transition={{ ease: "easeIn", duration: 0.2}} className="flex min-h-[60vh] flex-col items-center border-2 rounded m-2 p-4 w-[50vw] justify-around">
        <h1 className="text-3xl font-semibold my-2 ">
          Are you a Student or a Teacher?
        </h1>
        <div className="flex flex-col justify-center w-full">
          <button
            value="student"
            onClick={handleNext}
            className="border-2 w-[60%] mx-auto border-black rounded hover:cursor-pointer hover:bg-[#ff8ba7] hover:text-[#33272a] p-2 my-1"
          >
            Continue as a Student
          </button>
          <button
            value="teacher"
            onClick={handleNext}
            className="border-2 w-[60%] mx-auto border-black rounded hover:cursor-pointer hover:bg-[#ff8ba7] hover:text-[#33272a] p-2 my-1"
          >
            Continue as a Teacher
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="ml-6">
      <div className="text-[#33272a] flex flex-col items-center justify-center w-full">
        <h1 className="text-3xl font-semibold">
          Welcome to QR Code-based Attendance System
        </h1>
        <h2 className="my-2">Say goodbye to those bulky registers!</h2>
      </div>
      <div className="flex mt-12 justify-center">
        {formStep === 1 && <Step1 />}
        {formStep === 2 && (
          <motion.div animate={{ y: -10 }} transition={{ ease: "easeIn", duration: 0.2 }} className="flex items-center flex-col border-2 rounded m-2 p-4 w-[50vw] justify-center">
            <h1 className="text-3xl font-semibold my-2 capitalize">
              Voila, {role}s 😁!
            </h1>
            <form className="flex flex-col p-2 items-start justify-center">
              <label className="my-2">
                Name
                <input
                  value={formValues.name}
                  onChange={(e) =>
                    setFormValues({ ...formValues, name: e.target.value })
                  }
                  className="focus:outline-none px-2 py-1 ml-2 rounded mb-1"
                  type="text"
                  placeholder="Enter your Name"
                />
              </label>
              <label className="my-2">
                Email
                <input
                  value={formValues.email}
                  onChange={(e) =>
                    setFormValues({ ...formValues, email: e.target.value })
                  }
                  className="focus:outline-none px-2 py-1 ml-2 rounded mb-1"
                  type="email"
                  placeholder="Enter your Email"
                />
              </label>
              <label className="flex flex-col mt-1">
                Enter your Phone Number in E. 164 format
                <input
                  type="text"
                  value={formValues.phone}
                  onChange={(e) =>
                    setFormValues({ ...formValues, phone: e.target.value })
                  }
                  className="focus:outline-none px-2 py-1 ml-2 rounded mb-1"
                  required
                  placeholder="eg: 91-725-029-1234"
                />
              </label>
              {otpShow && (
                <label className="flex flex-col mt-1">
                  Enter OTP
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="focus:outline-none px-2 py-1 ml-2 rounded mb-1"
                    placeholder="eg: 322454"
                  />
                </label>
              )}
              <button
                type="submit"
                className="border-2 w-[60%] mx-auto border-black rounded hover:cursor-pointer hover:bg-[#ff8ba7] hover:text-[#33272a] p-1 my-1"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(formValues);

                  if (otpShow) {
                    verifyCode();
                  } else {
                    getCode();
                    setOtpShow(true);
                  }
                }}
              >
                Verify
              </button>

              {otpShow && (
                <p className="text-xs m-2">
                  An OTP has been sent on {formValues.phone}
                </p>
              )}
              <p className="text-xs m-2">
                By tapping Verify an SMS may be sent. Message & data rates may
                apply.
              </p>
            </form>
            <button
              className="border-2 w-[40%] mx-auto border-black rounded hover:cursor-pointer hover:bg-[#ff8ba7] hover:text-[#33272a] p-1 my-1"
              onClick={handlePrev}
            >
              Go Back!
            </button>
            {status}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
