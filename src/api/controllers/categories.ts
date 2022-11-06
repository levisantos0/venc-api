import { Request, Response } from "express";
import Container, { Service } from "typedi";
import { CategoriesLogic } from "../logic/categories.logic";

@Service()
export class CategoriesController {
  private logic: CategoriesLogic;
  constructor() {
    this.logic = Container.get(CategoriesLogic);
  }
  async getAll(req: Request, res: Response) {
    const response = await this.logic.getAll();
    return res.status(200).json(response);
  }
}
