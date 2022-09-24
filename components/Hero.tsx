import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import axios from "axios";
import Image from 'next/image'
import { motion } from 'framer-motion';

const Home = () => {
  const router = useRouter();
  const [formStep, setFormStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [otpShow, setOtpShow] = useState(false);
  const [status, setStatus] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    course: ""
  });

  const handleNext = (e: any) => {
    setFormValues({ ...formValues, role: e.target.value })
    setFormStep(formStep + 1);
  };
  const handlePrev = (e: any) => {
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
          router.push(`/${formValues.role}`);
        }
        else setStatus(false);
      })
      .catch((err) => console.log(err));
  };

  const Step1 = () => {
    return (
      <motion.div animate={{ y: -10 }} transition={{ ease: "easeIn", duration: 0.2 }} className="flex min-h-[60vh] flex-col items-center border-2 rounded m-2 p-4 w-[50vw] justify-around">
        <h1 className="text-3xl font-semibold my-2">
          Are you a Student or a Teacher?
        </h1>
        <div className="flex flex-col justify-center w-full">
          <motion.button whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            value="student"
            onClick={handleNext}
            className="border-2 w-[60%] mx-auto border-black rounded hover:cursor-pointer hover:bg-[#ff8ba7] hover:text-[#33272a] p-2 my-1"
          >
            Continue as a Student
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            value="teacher"
            onClick={handleNext}
            className="border-2 w-[60%] mx-auto border-black rounded hover:cursor-pointer hover:bg-[#ff8ba7] hover:text-[#33272a] p-2 my-1"
          >
            Continue as a Teacher
          </motion.button>
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
              Voila, {formValues.role}s 👋!
            </h1>
            <form className="flex w-full flex-col p-2 items-start justify-center">
              <label className="my-2">
                Name
                <input
                  value={formValues.name}
                  onChange={(e) =>
                    setFormValues({ ...formValues, name: e.target.value })
                  }
                  className="focus:outline-none px-2 py-1 ml-4 w-64 border-black rounded mb-1 border"
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
                  className="focus:outline-none px-2 py-1 ml-4 w-64 border-black rounded mb-1 border"
                  type="email"
                  placeholder="Enter your Email"
                />
              </label>
              <label className="my-2">
                {formValues.role == "student" ? "Enrolled Course Code" : "Course You Teach"}
                <input
                  value={formValues.course}
                  onChange={(e) =>
                    setFormValues({ ...formValues, course: e.target.value })
                  }
                  className="focus:outline-none px-2 py-1 ml-4 w-64 border-black rounded mb-1 border"
                  type="text"
                  placeholder="Enter your Course Code"
                />
              </label>
              <label className="my-2">
                Enter your Phone Number in E. 164 format
                <input
                  type="text"
                  value={formValues.phone}
                  onChange={(e) =>
                    setFormValues({ ...formValues, phone: e.target.value })
                  }
                  className="focus:outline-none px-2 py-1 ml-4 w-64 border-black rounded mb-1 border"
                  required
                  placeholder="eg: 91-725-029-1234"
                />
              </label>
              {otpShow && (
                <label className="my-2">
                  Enter OTP
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="focus:outline-none px-2 py-1 ml-4 w-64 border-black rounded mb-1 border"
                    placeholder="eg: 322454"
                  />
                </label>
              )}
              <motion.button whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="border-2 w-[40%] mx-auto border-black rounded hover:cursor-pointer hover:bg-[#ff8ba7] hover:text-[#33272a] p-1 my-1"
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
              >Verify</motion.button>


              {otpShow ? (
                <p className="text-xs m-2">
                  An OTP has been sent on {formValues.phone}
                </p>
              ) : (<motion.button whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="border-2 w-[40%] mx-auto border-black rounded hover:cursor-pointer hover:bg-[#ff8ba7] hover:text-[#33272a] p-1 my-1"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(formValues);
                  getCode();
                  setOtpShow(true);
                }}
              >
                Resend Code
              </motion.button>)}
              <p className="text-xs m-2">
                By tapping Verify an SMS may be sent. Message & data rates may
                apply.
              </p>
            </form>
            <motion.button whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="border-2 w-[40%] mx-auto border-black rounded hover:cursor-pointer hover:bg-[#ff8ba7] hover:text-[#33272a] p-1 my-1"
              onClick={handlePrev}
            >
              Go Back!
            </motion.button>
            {status && "Approved!"}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
