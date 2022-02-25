import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

export default class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];
    console.log("request.files : ", request.files);
    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);
    const fileNames = images.map((file) => {
      return file.filename;
    });

    await uploadCarImageUseCase.execute({ car_id: id, images_name: fileNames });
    return response.status(201).send();
  }
}
