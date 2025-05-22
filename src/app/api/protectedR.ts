import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const refreshToken = req.cookies.refreshToken;
  const accessToken = req.cookies.accessToken;

  if (!refreshToken || !accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.status(200).json({ message: "Access granted", tokens: { refreshToken, accessToken } });
}
