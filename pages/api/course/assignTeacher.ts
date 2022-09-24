import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// http://localhost:3000/api/course/assignTeacher

const assignTeacherToCourse = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const courseId = req.body.courseId;
    const teacherId = req.body.teacherId;

    const course = await prisma.course.update({
      where: { id: courseId },
      data: {
        teacher: {
          connect: {
            id: teacherId,
          },
        },
      },
    });
    if (course) {
      res.status(200).json({ message: "Teacher assigned successfully" });
    } else {
      res.status(400).json({ message: "Teacher not assigned" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default assignTeacherToCourse;
