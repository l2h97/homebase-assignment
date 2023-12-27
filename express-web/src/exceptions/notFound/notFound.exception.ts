import { HTTP_STATUS_CODE } from "../../interfaces/httpStatusCode.interface";
import { HttpException } from "../http.exception";

export class NotFoundException extends HttpException {
  constructor(errorCode: string, message: string) {
    super(errorCode, message, HTTP_STATUS_CODE.NOT_FOUND);
  }
}
