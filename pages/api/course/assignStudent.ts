import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// http://localhost:3000/api/course/assignStudent

const assignStudentToCourse = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const courseCode = req.body.courseCode;
    const studentId = req.body.studentId;

    const course = await prisma.course.update({
      where: { name: courseCode },
      data: {
        students: {
          connect: {
            id: studentId,
          },
        },
      },
    });
    if (course) {
      res.status(200).json({ message: "Student assigned successfully" });
    } else {
      res.status(400).json({ message: "Student not assigned" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default assignStudentToCourse;
