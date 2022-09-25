import { InferGetServerSidePropsType } from "next";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

const Teacher = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [teacher, setTeacher] = useState(props.teacherData);
  return (
    <div>
      <Navbar />
      <div className="m-1">
        <h1 className="text-2xl font-semibold">Welcome Teacher!</h1>
        <div className="flex justify-around">
          <div className="flex flex-col p-2 m-2">
            <h1>Teacher Profile Details</h1>
            <p>Name: {teacher.name} </p>
            <p>Phone No: {teacher.phone} </p>
            <p>Email: {teacher.email} </p>
          </div>

          <ul className="flex flex-col m-2">
            <h2>Courses you teach:</h2>
            {teacher.course.map((course: any) => (
              <li key={course}>{course.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const getTeacher = await fetch(
    "http://localhost:3000/api/teacher/get?id=" + context.query.id
  );
  const teacherData = await getTeacher.json();
  return {
    props: {
      teacherData: teacherData,
    },
  };
}

export default Teacher;
