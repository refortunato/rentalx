import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const decode = verify(token, auth.secret_refresh_token) as IPayload;
    const user_id = decode.sub;
    const { email } = decode;
    const userToken =
      await this.usersTokensRepository.findByUserIdAnRefreshToken(
        user_id,
        token
      );
    if (!userToken) {
      throw new AppError("Refresh Token does not exist", "400");
    }
    await this.usersTokensRepository.deleteById(userToken.id);
    const refresh_token_expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    );
    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    });
    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id,
    });

    return refresh_token;
  }
}
