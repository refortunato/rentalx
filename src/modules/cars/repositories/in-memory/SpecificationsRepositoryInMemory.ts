import Specification from "../../infra/typeorm/entities/Specification";
import ISpecificationsRepository, {
  ICreateSpecificationDTO,
} from "../ISpecificationsRepository";

export class SpecificationsRepositoryInMemory
  implements ISpecificationsRepository
{
  private specifications: Specification[] = [];

  async create(
    createSpecificationDTO: ICreateSpecificationDTO
  ): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, {
      description: createSpecificationDTO.description,
      name: createSpecificationDTO.name,
    });
    this.specifications.push(specification);
    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specifications = this.specifications.find((specification) => {
      return specification.name === name;
    });
    return specifications;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter((specification) => {
      return ids.includes(specification.id);
    });
    return specifications;
  }
}
