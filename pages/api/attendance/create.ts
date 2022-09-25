import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// http://localhost:3000/api/attendance/create

const createAttendance = async (req: NextApiRequest, res: NextApiResponse) => {
  const { studentId, courseId, teacherId } = req.body;
  const date = new Date();
  const attendance = await prisma.attendance.create({
    data: {
      studentId: Number(studentId),
      teacherId: Number(teacherId),
      courseId: Number(courseId),
      date: date,
    },
  });
  res.json(attendance);
};

export default createAttendance;
