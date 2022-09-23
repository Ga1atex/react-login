export const authAPI = {
  async login(data) {
    // try {
    // using reverse proxy to avoid CORS error
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/http://neurodoc.online/api/api/authenticate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
    // } catch (e) {
    //   console.error(e);
    // }
  },
};
