class Api {
  constructor({ address, apiKey }) {
    this.address = address;
    this.apiKey = apiKey;
  }

  async get(url, params = {}) {
    try {
      const queryString = Object.keys(params)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        )
        .join("&");

      const fullUrl = `${this.address}${url}${
        queryString ? `?${queryString}` : ""
      }`;

      const response = await fetch(fullUrl, {
        headers: {},
        method: "GET",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`API Error: ${error.message || "Unknown error"}`);
      }

      return response.json();
    } catch (error) {
      throw new Error(`Network Error: ${error.message || "Unknown error"}`);
    }
  }

  async delete(url) {
    try {
      const fullUrl = `${this.address}${url}`;

      const response = await fetch(fullUrl, {
        headers: {},
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`API Error: ${error.message || "Unknown error"}`);
      }

      return response.json();
    } catch (error) {
      throw new Error(`Network Error: ${error.message || "Unknown error"}`);
    }
  }

  async getSavedArticles() {
    try {
      const response = await fetch(`${this.address}/articles`, {
        headers: {},
        method: "GET",
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(`API Error: ${error.message || "Unknown error"}`);
      }
  
      return response.json();
    } catch (error) {
      throw new Error(`Network Error: ${error.message || "Unknown error"}`);
    }
  }
}

export default Api;
