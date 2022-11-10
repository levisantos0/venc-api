import { AdvertsRepository } from "../repositories/adverts.repository";
import { Container, Service } from "typedi";
import { AuthHelper } from "../helpers/authHelper";
import { Advert } from "../interface/Advert";
import { ApiEnv } from "../../config/envs/api-envs";
import { SearchParams } from "../interface/serachParams";
import { unlinkSync } from "fs";
import path from "path";
import { LogicError } from "../helpers/api-erros";

@Service()
export class AdvertsLogic {
  private repository: AdvertsRepository;
  private authHelper: AuthHelper;

  constructor() {
    this.repository = Container.get(AdvertsRepository);
    this.authHelper = Container.get(AuthHelper);
  }

  async save(data: Advert, files: any) {
    const { user } = await this.authHelper.user();
    const filesNames = files.map(({ filename }) => filename);
    const advert = await this.repository.save(data, filesNames, user.id);
    return advert;
  }

  async getByUser() {
    const { user } = await this.authHelper.user();
    const result = await this.repository.getByUser(user.id);
    const resultMaped = result.map((advert) => ({
      ...advert,
      advertsImages: advert.advertsImages.map(
        ({ fileName }) => `${ApiEnv.vencServiceUrl}/files/${fileName}`
      ),
      category: advert.category.name,
    })) as any;
    return resultMaped;
  }

  async getAll(searchParams: SearchParams) {
    const result = await this.repository.getAll(searchParams);

    result.data = result.data.map((advert) => ({
      ...advert,
      advertsImages: advert.advertsImages.map(
        ({ fileName }) => `${ApiEnv.vencServiceUrl}/files/${fileName}`
      ),
      category: advert.category.name,
    })) as any;

    return result;
  }

  async getOneById(id: number) {
    const advert = await this.repository.getOneById(id);
    const mappedAdverts = advert.map((advert) => ({
      ...advert,
      advertsImages: advert.advertsImages.map(
        ({ fileName }) => `${ApiEnv.vencServiceUrl}/files/${fileName}`
      ),
      category: advert.category.name,
    }));

    return mappedAdverts;
  }

  async update(data: Advert, advertId: string) {
    const { user } = await this.authHelper.user();
    await this.repository.update(data, user.id, advertId);
  }

  async delete(advertId: string) {
    try {
      const { user } = await this.authHelper.user();
      const result = await this.repository.delete(user.id, advertId);
      result.map((image) =>
        unlinkSync(path.resolve("uploads", image.fileName))
      );
    } catch (error) {
      throw new LogicError(`Error on delete adverts logic, error: ${error}`);
    }
  }
}
