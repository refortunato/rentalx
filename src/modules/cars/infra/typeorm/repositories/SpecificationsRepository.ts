import { getRepository, Repository } from "typeorm";

import ISpecificationsRepository, {
  ICreateSpecificationDTO,
} from "../../../repositories/ISpecificationsRepository";
import Specification from "../entities/Specification";

export default class SpecificationsRepository
  implements ISpecificationsRepository
{
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }

  // public static getInstance(): SpecificationsRepository {
  //   if (!SpecificationsRepository.INSTANCE) {
  //     SpecificationsRepository.INSTANCE = new SpecificationsRepository();
  //   }
  //   return SpecificationsRepository.INSTANCE;
  // }

  async create(
    createSpecificationDTO: ICreateSpecificationDTO
  ): Promise<Specification> {
    const specification = this.repository.create({
      description: createSpecificationDTO.description,
      name: createSpecificationDTO.name,
    });

    await this.repository.save(specification);
    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      name,
    });
    return specification;
  }
}
