import { AdvertsRepository } from "../repositories/adverts.repository";
import { Container, Service } from "typedi";
import { AuthHelper } from "../helpers/authHelper";
import { Advert } from "../interface/Advert";
import { ApiEnv } from "../../config/envs/api-envs";
import { SearchParams } from "../interface/serachParams";

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
}
