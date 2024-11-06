export class Address {
  apiHandler;

  constructor(apiHandler) {
    this.apiHandler = apiHandler;
  }

  async getAddress() {
    return await this.apiHandler.get("/addresses");
  }

  async createAddress(payload) {
    return await this.apiHandler.post("/addresses", payload);
  }
}
