import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDto } from "../../dtos/ICreateUserTokenDto";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { UserTokens } from "../typeorm/entities/UserTokens";

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDto): Promise<UserTokens> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserId(user_id: string): Promise<UserTokens[]> {
    const userTokens = await this.repository.find({ user_id });
    return userTokens;
  }

  async findByUserIdAnRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userTokens = await this.repository.findOne({
      user_id,
      refresh_token,
    });
    return userTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}
