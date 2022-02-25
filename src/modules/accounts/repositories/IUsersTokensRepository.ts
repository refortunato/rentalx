import { ICreateUserTokenDto } from "../dtos/ICreateUserTokenDto";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

export interface IUsersTokensRepository {
  create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDto): Promise<UserTokens>;

  findByUserId(user_id: string): Promise<UserTokens[]>;
  findByUserIdAnRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
}
