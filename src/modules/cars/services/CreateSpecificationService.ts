import { AppError } from "../../../shared/errors/AppError";
import ISpecificationsRepository from "../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}
  execute({ name, description }: IRequest) {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);
    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists", "400");
    }
    this.specificationsRepository.create({
      name,
      description,
    });
  }
}
