import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "../../../../config/auth";
import { UserRepository } from "../../../../modules/accounts/infra/repositories/UserRepository";
import { UsersTokensRepository } from "../../../../modules/accounts/infra/repositories/UsersTokensRepository";
import { AppError } from "../../../errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  const usersTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError("Token missing", "401");
  }
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;
    const userRepository = new UserRepository();
    const user = await usersTokensRepository.findByUserIdAnRefreshToken(
      user_id,
      token
    );

    if (!user) {
      throw new AppError("User does not exists", "401");
    }
    request.user = { id: user_id };
    next();
  } catch {
    throw new AppError("Invalid token", "401");
  }
}
