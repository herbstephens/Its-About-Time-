import { NextApiRequest, NextApiResponse } from "next";
import { isAddress } from "viem";
import db from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check only for POSTS
  if (req.method === "POST") {
    // JSON parse req.body
    const body = JSON.parse(req.body);
    const { rate, jobTitle, address, zkAddress } = body;
    // Check if fields are empty
    if (!rate || !jobTitle || !address) {
      console.log({ rate, jobTitle, address });
      return res.status(400).json({ message: "Missing fields" });
    }
    // Check if rate is a number
    if (isNaN(rate)) {
      return res.status(400).json({ message: "Rate must be a number" });
    }
    // Check if rate is a positive number
    if (rate < 0) {
      return res.status(400).json({ message: "Rate must be positive" });
    }
    // Check if jobTitle is a string
    if (typeof jobTitle !== "string") {
      return res.status(400).json({ message: "Job title must be a string" });
    }
    // Check if address is a string
    if (typeof address !== "string" && !isAddress(address)) {
      return res.status(400).json({ message: "Address is wrong" });
    }

    // If all checks pass, store in firestore
    try {
      await db.doc(`seller/${address}`).set(
        {
          rate,
          jobTitle,
          address,
          zkAddress,
        },
        { merge: true }
      );
      return res.status(200).json({ message: "Success" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
