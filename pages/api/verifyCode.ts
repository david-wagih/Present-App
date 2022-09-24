import { NextApiRequest, NextApiResponse } from "next";

// URL: http://localhost:3000/api/verifyCode?phonenumber=+1xxxxxxxxxx&code=xxxxxx

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

export default verifyCode;
