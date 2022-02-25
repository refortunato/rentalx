import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export default class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;
    const authencitcateUserUseCase = container.resolve(AuthenticateUserUseCase);
    const token = await authencitcateUserUseCase.execute({ password, email });
    return response.status(200).json(token);
  }
}
