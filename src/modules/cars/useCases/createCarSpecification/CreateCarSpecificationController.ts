import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

export default class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;

    const createCarSpecificationUseCases = container.resolve(
      CreateCarSpecificationUseCase
    );

    const cars = await createCarSpecificationUseCases.execute({
      car_id: id,
      specifications_id,
    });

    return response.status(201).json(cars);
  }
}
