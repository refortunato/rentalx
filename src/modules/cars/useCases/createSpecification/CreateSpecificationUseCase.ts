import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import Specification from "../../infra/typeorm/entities/Specification";
import ISpecificationsRepository from "../../repositories/ISpecificationsRepository";

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

@injectable()
export default class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: ICreateSpecificationDTO): Promise<void> {
    if (await this.specificationRepository.findByName(name)) {
      throw new AppError("Specification already exists", "400");
    }
    await this.specificationRepository.create({ name, description });
  }
}
