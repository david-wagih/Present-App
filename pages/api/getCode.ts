import { NextApiRequest, NextApiResponse } from "next";

// URL: http://localhost:3000/api/getCode?phonenumber=+1xxxxxxxxxx&channel=sms

const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

const getCode = async (req: NextApiRequest, res: NextApiResponse) => {
  client.verify
    .services(process.env.VERIFY_SERVICE_SID)
    .verifications.create({
      to: `+${req.query.phonenumber}`,
      channel: req.query.channel,
    })
    .then((data: any) => {
      res.status(200).send(data);
    });
};

export default getCode;
