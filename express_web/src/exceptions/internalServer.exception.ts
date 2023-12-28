import { HTTP_STATUS_CODE } from "../interfaces/httpStatusCode.interface";
import { HttpException } from "./http.exception";

export class InternalServerException extends HttpException {
  constructor() {
    super(
      "INTERNAL_SERVER_ERROR",
      "Something went wrong!",
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    );
  }
}
