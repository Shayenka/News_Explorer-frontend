class Api {
  constructor({ address, apiKey }) {
    this.address = address;
    this.apiKey = apiKey;
    this.token = `Bearer ${localStorage.getItem("jwt")}`
  }

  _useFetch(url, method, body) {
    
    return fetch(url, {
      headers: {
        authorization: this.token, 
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

  async saveArticle(articleData) {
    const requestBodyArticle = {
      id: articleData.id,
      // keyWord: articleData.searchQueries,
      title: articleData.title,
      text: articleData.description,
      date: articleData.publishedAt,
      source: articleData.source.name,
      link: articleData.url,
      image: articleData.urlToImage,
    };
    return this._useFetch(
      `${this.address}/articles/save`,
      `POST`,
      requestBodyArticle
    ).then((result) => {
      return result;
    });
  }

  async deleteArticle(articleId) {
    return this._useFetch(
      `${this.address}/articles/${articleId}`,
      `DELETE`,
    ).then((result) => {
      return result;
    });
  }
}

export default Api;

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