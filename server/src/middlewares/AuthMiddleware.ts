import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export class AuthMiddleware {
  auth(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization

    if (!authToken) {
      return res.status(401).json({
        code: 'token.missing',
        message: 'Token missing',
      });
    }

    const [, token] = authToken.split(' ')
    let secretKey: string | undefined = process.env.ACCESS_KEY_TOKEN
    if (!secretKey) {
      throw new Error('There is no token key!')
    }

    try {
      const { sub } = verify(token, secretKey) as IPayload

      req.user_id = sub
      return next()
    } catch(err) {
      return res.status(401).json({
        code: 'token.expired',
        message: 'Token.expired',
      })
    }
  }
}