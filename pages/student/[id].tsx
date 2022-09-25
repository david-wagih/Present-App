import axios from "axios";
import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import Navbar from "../../components/Navbar";
import { InferGetServerSidePropsType } from "next";

const Student = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const studentDataFromServer = props.studentData;
  const [student, setStudent] = useState(studentDataFromServer);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/student")
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="m-1">
        <h1 className="text-2xl font-semibold">Welcome Student!</h1>
        <div className="flex justify-around">
          <div className="flex flex-col p-2 m-2">
            <h1>Student Profile Details</h1>
            {student && (
              <>
                <p>Name: {student.name} </p>
                <p>Phone No: {student.phone}</p>
                <p>Email: {student.email}</p>
              </>
            )}
          </div>

          <ul className="flex flex-col m-2">
            <h2>Here are your enrolled courses:</h2>
            <li className="p-2">{student.course.name}</li>
          </ul>

          <div className="flex flex-col m-2">
            <h2 className="my-1">Your Unique QR Code - </h2>
            <QRCode value={student.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const studentId = context.query.id;
  const getUserInfo = await fetch(
    "http://localhost:3000/api/student/get?id=" + studentId
  );
  const student = await getUserInfo.json();

  return {
    props: {
      studentData: student,
    },
  };
}

export default Student;
