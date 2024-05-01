class Api {
  constructor({ address, apiKey }) {
    this.address = address;
    this.apiKey = apiKey;
    this.token = `Bearer ${localStorage.getItem("jwt")}`
  }

  _useFetch(url, method, body) {
    
    return fetch(url, {
      headers: {
        authorization: `Bearer ${this.token}`, 
        "Content-Type": "application/json",
      },
      method,
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
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

  async getSavedArticles() {
    return this._useFetch(
      `${this.address}/articles`,
      `GET`
    ).then((result) => {
      return result;
    });
  }

  // async getSavedArticles() {
  //   try {
  //     const response = await fetch(`${this.address}/articles`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //         "Content-Type": "application/json",
  //       },
  //       method: "GET",
  //     });
  
  //     if (!response.ok) {
  //       const error = await response.json();
  //       throw new Error(`API Error: ${error.message || "Unknown error"}`);
  //     }
  
  //     return response.json();
  //   } catch (error) {
  //     throw new Error(`Network Error: ${error.message || "Unknown error"}`);
  //   }
  // }

  async getSavedArticles(articleData) {
    return this._useFetch(
      `${this.address}/articles/save`,
      `POST`,
      articleData
    ).then((result) => {
      return result;
    });
  }

  // async saveArticle(articleData) {
  //   try {
  //     const response = await fetch(`${this.address}/articles/save`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //         "Content-Type": "application/json", 
  //       },
  //       method: "POST",
  //       body: JSON.stringify(articleData),
  //     });
  
  //     if (!response.ok) {
  //       // const error = await response.json();
  //       throw new Error(`API Error: "Unknown error"}`);
  //     }
  
  //     return response.json();
  //   } catch (error) {
  //     throw new Error(`Network Error: ${error.message || "Unknown error"}`);
  //   }
  // }

  async deleteArticle(articleId) {
    return this._useFetch(
      `${this.address}/articles/${articleId}`,
      `DELETE`,
      articleId
    ).then((result) => {
      return result;
    });
  }
  
  // async deleteArticle(articleId) {
  //   try {
  //     const fullUrl = `${this.address}/articles/${articleId}`;

  //     const response = await fetch(fullUrl, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //         "Content-Type": "application/json", 
  //       },
  //       method: "DELETE",
  //     });

  //     if (!response.ok) {
  //       const error = await response.json();
  //       throw new Error(`API Error: ${error.message || "Unknown error"}`);
  //     }

  //     return response.json();
  //   } catch (error) {
  //     throw new Error(`Network Error: ${error.message || "Unknown error"}`);
  //   }
  // }
}

export default Api;