import { HTTP_STATUS_CODE } from "../../interfaces/httpStatusCode.interface";
import { HttpException } from "../http.exception";

export class RouterNotFoundException extends HttpException {
  constructor() {
    super(
      "NOT_FOUND_ROUTER",
      "Router is not found",
      HTTP_STATUS_CODE.NOT_FOUND,
    );
  }
}
