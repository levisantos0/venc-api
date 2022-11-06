import express, { Router, Request, Response, NextFunction } from "express";
import Container from "typedi";
import { AdvertsController } from "../controllers/adverts";
import { EnsureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticated";
import multer from "multer";
import { storage } from "../../config/multer";

const upload = multer({ storage: storage });

export const AdvertsRouters = () => {
  const ensureAuthenticatedMiddleware = Container.get(
    EnsureAuthenticatedMiddleware
  );

  const controller = Container.get(AdvertsController);
  const router = Router();

  router.use("/files", express.static("uploads"));

  router.post(
    "/adverts",
    upload.array("files"),
    ensureAuthenticatedMiddleware.ensureAuthenticated,
    async (req: Request, res: Response, next: NextFunction) =>
      await controller.save(req, res)
  );

  router.get(
    "/adverts",
    ensureAuthenticatedMiddleware.ensureAuthenticated,
    async (req: Request, res: Response, next: NextFunction) =>
      await controller.getAll(req, res)
  );

  router.get(
    "/adverts/:id",
    ensureAuthenticatedMiddleware.ensureAuthenticated,
    async (req: Request, res: Response, next: NextFunction) =>
      await controller.getOneById(req, res)
  );

  router.put(
    "/adverts/:id",
    ensureAuthenticatedMiddleware.ensureAuthenticated,
    async (req: Request, res: Response, next: NextFunction) =>
      await controller.update(req, res)
  );

  router.delete(
    "/adverts/:id",
    ensureAuthenticatedMiddleware.ensureAuthenticated,
    async (req: Request, res: Response, next: NextFunction) =>
      await controller.delete(req, res)
  );

  return router;
};
