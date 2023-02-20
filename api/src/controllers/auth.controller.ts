import { Request, Response, NextFunction } from "express";

import { errorServerMessage } from "../utils/messages/error-messages";
import { generateJWT } from "../helpers/jwt";
import { IUser } from "../models/user.model";
import AuthService from "../services/auth.service";

class AuthController {
  async getToken(req: Request, res: Response, next: NextFunction) {
    const { accountId } = req.body;
    try {
      const user: IUser = await AuthService.getUser( accountId);
      // Generate JWT
      const token = await generateJWT(user);
      return res.status(200).json({
        status: true,
        user,
        token,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }
}
export default new AuthController();
