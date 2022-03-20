import UserId from "../../../../types/entity/ids/UserId";
import FriendsQueryRequest from "../../../../types/requests/FriendsQueryRequest";
import { fetchApi, fetchApiWithCsrf, routeBuilder } from "../utils";

const buildFriendsRoute = routeBuilder("/api/friends");

export default class LocalFriendsApi {
  static async getFriends(queryParams?: FriendsQueryRequest) {
    const params = new URLSearchParams(queryParams);
    return fetchApi(buildFriendsRoute(`?${params}`));
  }

  static async acceptFriendship(friendId: UserId) {
    return fetchApiWithCsrf(buildFriendsRoute(`/${friendId}`), {
      method: "PATCH",
      body: JSON.stringify({
        accepted: true,
      }),
    });
  }

  static async removeFriendship(friendId: UserId) {
    return fetchApiWithCsrf(buildFriendsRoute(`/${friendId}`), {
      method: "DELETE",
    });
  }
}
