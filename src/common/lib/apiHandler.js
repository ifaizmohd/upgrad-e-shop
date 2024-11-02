class ApiHandler {
  baseUrl;

  config(config) {
    this.baseUrl = config?.baseUrl;
  }

  post(url, reqBody) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${this.baseUrl}${url}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        });
        resolve(response);
      } catch (error) {
        reject(error?.message);
      }
    });
  }

  get(url) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${this.baseUrl}${url}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        resolve(response);
      } catch (error) {
        reject(error?.message);
      }
    });
  }
}

export const apiHandler = new ApiHandler();
