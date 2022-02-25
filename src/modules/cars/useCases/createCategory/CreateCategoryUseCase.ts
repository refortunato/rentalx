import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

export interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(request: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      request.name
    );
    if (categoryAlreadyExists) {
      throw new AppError("Category already exists", "400");
    }
    await this.categoriesRepository.create({
      name: request.name,
      description: request.description,
    });
  }
}

export { CreateCategoryUseCase };
