import FriendsQueryRequest from "../../../../types/requests/FriendsQueryRequest";
import { fetchApi, routeBuilder } from "../utils";

const buildFriendsRoute = routeBuilder("/api/friends");

export default class LocalFriendsApi {
  static async getFriends(queryParams?: FriendsQueryRequest) {
    const params = new URLSearchParams(queryParams);
    return fetchApi(buildFriendsRoute(`?${params}`));
  }
}
