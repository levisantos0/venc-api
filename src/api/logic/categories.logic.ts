import { Container, Service } from "typedi";
import { ApiEnv } from "../../config/envs/api-envs";
import { CategoriesRepository } from "../repositories/categories.repository";
@Service()
export class CategoriesLogic {
  private repository: CategoriesRepository;

  constructor() {
    this.repository = Container.get(CategoriesRepository);
  }

  async getAll() {
    const categories = await this.repository.getAll();
    return categories;
  }
}
