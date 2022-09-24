import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// htto://localhost:3000/api/teacher/create

const createNewTeacher = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;

    const newTeacher = await prisma.teacher.create({
      data: {
        name: name,
        email: email,
        phone: phone,
      },
    });
    if (newTeacher) {
      res.status(200).json({ message: "Teacher created successfully" });
    } else {
      res.status(400).json({ message: "Teacher not created" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default createNewTeacher;
