import LoginRequest from "../../../../types/requests/LoginRequest";
import SignupRequest from "../../../../types/requests/SignupRequest";
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

  static async signup(data: SignupRequest) {
    return fetchApiWithCsrf(buildAuthRoute("/signup"), {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
