import UsersQueryRequest from "../../../../types/requests/UsersQueryRequest";
import { fetchApi, routeBuilder } from "../utils";

const buildUsersRoute = routeBuilder("/api/users");

export default class LocalUsersApi {
  static async getUsers(queryParams: UsersQueryRequest) {
    const params = new URLSearchParams(queryParams);
    return fetchApi(buildUsersRoute(`?${params.toString()}`));
  }
}
