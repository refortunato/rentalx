import { ICarsRepository } from "../../repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: ICarsRepository;

describe("Test List Cars Use Case", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });
  it("Should be able to list all available cars", async () => {
    const car = await carsRepository.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF-1213",
      fine_amount: 100,
      brand: "Audi",
      category_id: "category_id",
    });
    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepository.create({
      name: "Car2",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF-1213",
      fine_amount: 100,
      brand: "Audi",
      category_id: "category_id",
    });
    const cars = await listAvailableCarsUseCase.execute({ brand: "Car_brand" });

    expect(cars).toEqual([car]);
  });
});
