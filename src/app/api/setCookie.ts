import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { refreshToken, accessToken } = req.body;

    res.setHeader("Set-Cookie", [
      `refreshToken=${refreshToken}; HttpOnly; Secure; Path=/`,
      `accessToken=${accessToken}; HttpOnly; Secure; Path=/`,
    ]);

    return res.status(200).json({ message: "Cookies set securely!" });
  }

  res.status(405).json({ message: "Method not allowed" });
}
