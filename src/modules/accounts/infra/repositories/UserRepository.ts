import { getRepository, Repository } from "typeorm";

import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { IUserRepository } from "../../repositories/IUserRepository";
import User from "../typeorm/entities/User";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(data: ICreateUserDto): Promise<void> {
    const { name, email, driver_license, password, avatar, id } = data;
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      avatar,
      id,
    });
    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }
}

export { UserRepository };
