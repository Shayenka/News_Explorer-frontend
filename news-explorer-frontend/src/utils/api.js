const BASE_URL = "http://127.0.0.1:3000";
const API_KEY = "016f14e7761d4baca1c75b200bde1015";

class Api {
  constructor({ address, apiKey }) {
    this.address = address;
    this.apiKey = apiKey;
  }

  async get(url, params = {}) {
    try {
      const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');

      const fullUrl = `${this.address}${url}${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(fullUrl, {
        headers: {
       
        },
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

  // async getUserInfo(token) {
  //   try {
  //     const result = await this._useFetch(token, `${BASE_URL}/users/me`, "GET");
  //     console.log("getUserInfo result:", result);
  //     return result;
  //   } catch (error) {
  //     console.error("getUserInfo error:", error.message);
  //     throw error;
  //   }
  // }

//   async changeSalvedCardStatus(token, cardId, isSaved) {
//     const method = isSaved ? "PUT" : "DELETE";
//     try {
//       const result = await this._useFetch(
//         token,
//         `${BASE_URL}/saved-news${cardId}`,
//         method
//       );
//       return result;
//     } catch (error) {
//       console.error("changeSalvedCardStatus error:", error.message);
//       throw error;
//     }
//   }

//   async deleteCard(token, cardId) {
//     try {
//       const result = await this._useFetch(token, `${BASE_URL}/cards/${cardId}`, "DELETE");
//       return result;
//     } catch (error) {
//       console.error("deleteCard error:", error.message);
//       throw error;
//     }
//   }
 }

export default Api;