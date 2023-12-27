import { Service } from "typedi";

@Service()
export class AppService {
  constructor() {}

  getSource() {
    return { message: "success" };
  }
}
