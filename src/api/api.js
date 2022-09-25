import axios from "axios";

export const authAPI = {
  async login(username, password) {
    try {
      // using proxy to avoid CORS error
      const response = await axios.post("/api/authenticate", {
        username,
        password,
      });

      return response.data;
    } catch (error) {
      throw error.response.data;
    }

    // fetch way if axios isn't allowed
    // const response = await fetch("/api/authenticate", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ username, password }),
    // });
    // const result = await response.json();
    // if (!response.ok) throw result;

    // return result;
  },
};
