import { Service } from "typedi";
import { userApiClient } from "../../config/api";
import { IAuth } from "../interface/Auth";
import { IUser } from "../interface/IUser";

@Service()
export class AuthRepository {
  async self(token: string): Promise<IUser> {
    try {
      const { data } = await userApiClient.get<IUser>("/user/self", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch ({ code, driverError }) {
      throw new Error(
        `Auth repository error, code: ${code}, driverError: ${driverError}`
      );
    }
  }
}
