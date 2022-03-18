import BankTransferRequest from "../../../../types/requests/BankTransferRequest";
import { fetchApiWithCsrf, routeBuilder } from "../utils";

const buildTransfersRoute = routeBuilder("/api/transfers");

export default class LocalTransfersApi {
  static async createTransfer(data: BankTransferRequest) {
    return fetchApiWithCsrf(buildTransfersRoute(""), {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
