import { Router } from "express";
import { AdvertsRouters } from "./adverts";
import { CategoriesRouters } from "./categories";

export const getRoutes = () => {
  const router = Router();
  router.use(AdvertsRouters());
  router.use(CategoriesRouters());

  return router;
};
