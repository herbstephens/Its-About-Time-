import { NextApiRequest, NextApiResponse } from "next";
import db from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { buyer, hours, rate, seller, signedMessage, status, zkAddress } =
    req.body;
  try {
    await db.collection("orders").add({
      buyer,
      hours,
      rate,
      seller,
      signedMessage,
      status,
      zkAddress,
    });
    return res.status(200).send("Done");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}
