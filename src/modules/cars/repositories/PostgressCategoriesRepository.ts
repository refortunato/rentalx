import { Category } from "../infra/typeorm/entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

export default class PostgressCategoriresRepository
  implements ICategoriesRepository
{
  findByName(name: string): Category {
    console.log(name);
    return null;
  }

  list(): Category[] {
    return null;
  }

  create(createCategoryDTO: ICreateCategoryDTO) {
    console.log(createCategoryDTO.name, createCategoryDTO.description);
  }
}
