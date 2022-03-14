import LoginRequest from "../../../../types/requests/LoginRequest";
import { fetchApi, fetchApiWithCsrf, routeBuilder } from "../utils";

const buildAuthRoute = routeBuilder("/api/auth");

export default class LocalAuthApi {
  static async login(data: LoginRequest) {
    return fetchApiWithCsrf(buildAuthRoute("/login"), {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async loginDemo() {
    return fetchApi(buildAuthRoute("/login/demo"));
  }
}
