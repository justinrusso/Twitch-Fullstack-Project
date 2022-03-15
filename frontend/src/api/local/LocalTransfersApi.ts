import BankTransferRequest from "../../../../types/requests/BankTransferRequest";
import { fetchApiWithCsrf, routeBuilder } from "../utils";

const buildAuthRoute = routeBuilder("/api/transfers");

export default class LocalTransfersApi {
  static async createTransfer(data: BankTransferRequest) {
    return fetchApiWithCsrf(buildAuthRoute(""), {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
