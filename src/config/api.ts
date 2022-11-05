import axios from "axios";
import { ApiEnv } from "./envs/api-envs";

export const userApiClient = axios.create({
  baseURL: ApiEnv.userServiceUrl,
});
