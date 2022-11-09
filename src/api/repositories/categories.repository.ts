import { Service } from "typedi";
import { Repository, getRepository } from "typeorm";
import { DatabaseError } from "../helpers/api-erros";
import { Categories } from "../entities/categories";

@Service()
export class CategoriesRepository {
  private repository: Repository<Categories>;

  constructor() {
    this.repository = getRepository(Categories);
  }

  async getAll(): Promise<Categories[]> {
    try {
      const categories = await this.repository.find({ order: { name: "ASC" } });
      return categories;
    } catch (error) {
      throw new DatabaseError(`Error on get all categories, error: ${error}`);
    }
  }
}
