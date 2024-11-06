export class Product {
  apiHandler;

  constructor(apiHandler) {
    this.apiHandler = apiHandler;
  }

  async fetchProducts() {
    return await this.apiHandler.get("/products");
  }

  async fetchProductDetails(id) {
    return await this.apiHandler.get(`/products/${id}`);
  }

  async fetchCategories() {
    return await this.apiHandler.get("/products/categories");
  }

  async createProduct(payload) {
    return await this.apiHandler.post("/products?filter=noResponse", payload);
  }

  async deleteProduct(id) {
    return await this.apiHandler.delete(`/products/${id}?filter=noResponse`);
  }

  async modifyProduct(id, payload) {
    return await this.apiHandler.put(`/products/${id}`, payload);
  }
}
