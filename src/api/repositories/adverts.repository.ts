import { Service } from "typedi";
import { Adverts } from "../entities/adverts";
import { Repository, getRepository } from "typeorm";
import { AdvertsImages } from "../entities/advertsImages";
import { DatabaseError } from "../helpers/api-erros";
import { PaginatedResult } from "../interface/paginatedResult";
import { SearchParams } from "../interface/serachParams";

@Service()
export class AdvertsRepository {
  private repository: Repository<Adverts>;

  constructor() {
    this.repository = getRepository(Adverts);
  }

  async save(data, filesNames, userId: string): Promise<any> {
    try {
      const advertSaved = await this.repository.manager.transaction(
        async (transaction) => {
          const advert = await transaction
            .createQueryBuilder()
            .insert()
            .into(Adverts)
            .values({
              ...data,
              userId,
            })
            .returning("id")
            .execute();

          const imagesToInsert = filesNames.map((fileName) => ({
            fileName,
            advertId: advert.raw[0].id,
          }));
          console.log({ imagesToInsert, advert: advert.raw[0].id });
          transaction
            .createQueryBuilder()
            .insert()
            .into(AdvertsImages)
            .values(imagesToInsert)
            .execute();
        }
      );
      return advertSaved;
    } catch (error) {
      throw new DatabaseError(`Error on save adverts, error: ${error}`);
    }
  }

  async getAll(searchParams: SearchParams): Promise<PaginatedResult<Adverts>> {
    let { page, perPage, sortByPrice } = searchParams;
    try {
      const query = await this.repository
        .createQueryBuilder("adv")
        .leftJoinAndSelect("adv.advertsImages", "advertsImages")
        .leftJoinAndSelect("adv.category", "categories");

      if (sortByPrice) {
        query.orderBy(`adv.price`, sortByPrice);
      }

      if (page && perPage) {
        const correctPage = --page;
        query.skip(correctPage * perPage).take(perPage);
      }

      const [data, count] = await Promise.all([
        query.getMany(),
        query.getCount(),
      ]);

      return {
        data,
        totalRows: count,
        totalPages: searchParams.perPage
          ? Math.ceil(count / searchParams.perPage)
          : 1,
        perPage: searchParams.perPage || null,
        page: searchParams.page || null,
      };
    } catch (error) {
      throw new DatabaseError(`Error on get all adverts, error: ${error}`);
    }
  }

  async getOneById(id: number) {
    try {
      const advert = await this.repository
        .createQueryBuilder("adv")
        .leftJoinAndSelect("adv.advertsImages", "advertsImages")
        .leftJoinAndSelect("adv.category", "categories")
        .where("adv.id = :id", { id })
        .take(1);
      return advert.getMany();
    } catch (error) {
      throw new DatabaseError(`Error on get one advert by id, error: ${error}`);
    }
  }

  async update(data: any, userId: string, advertId: string): Promise<void> {
    try {
      await this.repository
        .createQueryBuilder()
        .update(data)
        .where(`id = :id`, { id: advertId })
        .returning("*")
        .execute();
    } catch (error) {
      throw new Error(`Error on save adverts, error: ${error}`);
    }
  }
}
