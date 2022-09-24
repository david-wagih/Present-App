import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// http://localhost:3000/api/student/get?id=1

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.id;
  const user = await prisma.student.findUnique({
    where: { id: Number(userId) },
    include: {
      course: {
        select: {
          name: true,
        },
      },
    },
  });
  res.json(user);
};

export default getUser;
