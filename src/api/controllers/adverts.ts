import { Request, Response } from "express";
import Container, { Service } from "typedi";
import { AdvertsLogic } from "../logic/adverts.logic";

@Service()
export class AdvertsController {
  private logic: AdvertsLogic;
  constructor() {
    this.logic = Container.get(AdvertsLogic);
  }
  async save(req: Request, res: Response) {
    const data = req.body as any;
    const files = req.files as any;
    const response = await this.logic.save(data, files);
    return res.status(201).json(response);
  }

  async getAll(req: Request, res: Response) {
    const query = req.query as any;
    if (query.page) {
      query.page = Number(query.page);
    }

    if (query.perPage) {
      query.perPage = Number(query.perPage);
    }

    if (query.categoryId) {
      query.categoryId = Number(query.categoryId);
    }

    const response = await this.logic.getAll(query);
    return res.status(200).json(response);
  }

  async getOneById(req: Request, res: Response) {
    const { id } = req.params as any;
    const response = await this.logic.getOneById(id);
    return res.status(200).json(response[0]);
  }

  async update(req: Request, res: Response) {
    const data = req.body as any;
    const { id } = req.params as any;
    await this.logic.update(data, id);
    return res.status(204).json();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params as any;
    await this.logic.delete(id);
    return res.status(204).json();
  }
}
