import { ICreateRentalDto } from "../dtos/ICreateRentalDto";
import { Rental } from "../infra/typeorm/entities/Rental";

export interface IRentalsRepository {
  findOpenByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create(data: ICreateRentalDto): Promise<Rental>;
}
