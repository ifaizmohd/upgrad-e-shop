export class Product {
  apiHandler;

  constructor(apiHandler) {
    this.apiHandler = apiHandler;
  }

  async fetchProducts() {
    const data = await this.apiHandler.get("/products");
    return await data?.json();
  }

  async fetchProductDetails(id) {
    const data = await this.apiHandler.get(`/products/${id}`);
    return await data?.json();
  }

  async fetchCategories() {
    const data = await this.apiHandler.get("/products/categories");
    return await data?.json();
  }
}
