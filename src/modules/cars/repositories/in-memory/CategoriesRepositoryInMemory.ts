import { Category } from "../../infra/typeorm/entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
  async list(): Promise<Category[]> {
    return this.categories;
  }
  async create(createCategoryDTO: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, {
      name: createCategoryDTO.name,
      description: createCategoryDTO.description,
    });
    this.categories.push(category);
  }
}
