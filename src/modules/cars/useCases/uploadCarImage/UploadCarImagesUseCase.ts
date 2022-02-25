import { inject, injectable } from "tsyringe";

import { CarImage } from "../../infra/typeorm/entities/CarImage";
import { ICarsImagesRepository } from "../../repositories/ICarsImagesRepository";

export interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) {}
  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}
