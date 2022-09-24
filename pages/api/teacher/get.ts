import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// http://localhost:3000/api/teacher/get?id=1

const getTeacher = async (req: NextApiRequest, res: NextApiResponse) => {
  const teacherId = req.query.id;
  const teacher = await prisma.teacher.findUnique({
    where: { id: Number(teacherId) },
    include: {
      course: {
        select: {
          name: true,
        },
      },
    },
  });
  res.json(teacher);
};

export default getTeacher;
