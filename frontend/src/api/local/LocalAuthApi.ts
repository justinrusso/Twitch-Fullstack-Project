import LoginRequest from "../../../../types/requests/LoginRequest";
import { fetchApiWithCsrf, routeBuilder } from "../utils";

const buildAuthRoute = routeBuilder("/api/auth");

export default class LocalAuthApi {
  static async login(data: LoginRequest) {
    return fetchApiWithCsrf(buildAuthRoute("/login"), {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
