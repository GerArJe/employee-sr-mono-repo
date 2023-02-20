import jwt from "jsonwebtoken";

import { IUser } from "../models/user.model";

const generateJWT = (user: IUser) => {
  return new Promise((resolve, reject) => {
    const payload = {
      ...user,
    };
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          reject("Can't generate JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};

export { generateJWT };
