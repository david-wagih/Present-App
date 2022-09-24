import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// http://localhost:3000/api/course/create

const createNewCourse = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const name = req.body.name;
    const course = await prisma.course.create({
      data: {
        name: name,
      },
    });
    if (course) {
      res.status(200).json({ message: "Course created successfully" });
    } else {
      res.status(400).json({ message: "Course not created" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default createNewCourse;
