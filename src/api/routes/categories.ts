import { Router, Request, Response, NextFunction } from "express";
import Container from "typedi";
import { CategoriesController } from "../controllers/categories";
import { EnsureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticated";

export const CategoriesRouters = () => {
  const ensureAuthenticatedMiddleware = Container.get(
    EnsureAuthenticatedMiddleware
  );

  const controller = Container.get(CategoriesController);
  const router = Router();

  router.get(
    "/adverts-categories",
    ensureAuthenticatedMiddleware.ensureAuthenticated,
    async (req: Request, res: Response, next: NextFunction) =>
      await controller.getAll(req, res)
  );

  return router;
};
