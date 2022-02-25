import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import User from "../../infra/typeorm/entities/User";
import { IUserRepository } from "../IUserRepository";

export class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async create(data: ICreateUserDto): Promise<void> {
    const user = new User();
    Object.assign(user, {
      diver_license: data.driver_license,
      email: data.email,
      name: data.email,
      password: data.password,
    });
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => {
      return user.email === email;
    });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => {
      return user.id === id;
    });
    return user;
  }
}
