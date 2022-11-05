import { Router } from "express";
import { AdvertsRouters } from "./adverts";

export const getRoutes = () => {
  const router = Router();
  router.use(AdvertsRouters());

  return router;
};
