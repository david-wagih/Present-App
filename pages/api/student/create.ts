import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// http://localhost:3000/api/student/create

const createNewUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;

    const newUser = await prisma.student.create({
      data: {
        name: name,
        email: email,
        phone: phone,
      },
    });
    if (newUser) {
      res.status(200).json(newUser);
    } else {
      res.status(400).json({ message: "User not created" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default createNewUser;
