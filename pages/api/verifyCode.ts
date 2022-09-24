import { NextApiRequest, NextApiResponse } from "next";

const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

const verifyCode = async (req: NextApiRequest, res: NextApiResponse) => {
  client.verify
    .services(process.env.VERIFY_SERVICE_SID)
    .verificationChecks.create({
      to: `+${req.query.phonenumber}`,
      code: req.query.code,
    })
    .then((data: any) => {
      res.status(200).send(data);
    });
};
