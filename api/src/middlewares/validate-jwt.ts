import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/, "");

  if (token && token !== "null") {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ success: false, message: "Token Expired" });
      }
      req["accountId"] = decoded["accountId"];
      next();
    });
  } else {
    res.status(403).json({ success: false, message: "UnAuthorized" });
  }
};

export { validateJWT };
