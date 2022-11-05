import { NextFunction, Request, Response } from "express";
import Container, { Service } from "typedi";
import { UnauthorizedError } from "../helpers/api-erros";
import { AuthHelper } from "../helpers/authHelper";
import { AuthRepository } from "../repositories/auth.repository";

@Service()
export class EnsureAuthenticatedMiddleware {
  private repository: AuthRepository;
  private authHelper: AuthHelper;

  constructor() {
    this.repository = Container.get(AuthRepository);
    this.authHelper = Container.get(AuthHelper);
  }

  public ensureAuthenticated = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const authToken = request.headers.authorization;
    const [, token] = authToken.split(" ");

    if (!token || token === "") {
      throw new UnauthorizedError("Token is missing");
    }

    try {
      const user = await this.repository.self(token);
      this.authHelper.setAuth({ user, token });
    } catch (error) {
      throw new UnauthorizedError("Token invalid");
    } finally {
      next();
    }
  };
}
