export class Order {
  apiHandler;

  constructor(apiHandler) {
    this.apiHandler = apiHandler;
  }

  async placeOrder(payload) {
    return this.apiHandler.post("/orders?filter=noResponse", payload);
  }

  async getOrderDetails(id) {
    return this.apiHandler.get(`/orders/${id}`);
  }

  async getOrders() {
    return this.apiHandler.get(`/orders`);
  }
}
