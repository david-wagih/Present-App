import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// http://localhost:3000/api/attendance/get?courseCode=1&teachId=1

const getAttendance = async (req: NextApiRequest, res: NextApiResponse) => {
  const courseCode = req.query.courseCode;
  const attendance = await prisma.attendance.findMany({
    where: {
      courseId: Number(courseCode),
    },
    include: {
      student: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });
  res.json(attendance);
};

export default getAttendance;
