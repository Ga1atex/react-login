// import axios from "axios";

// export const instance = axios.create({
//   withCredentials: true,
//   baseURL: "http://neurodoc.online/api/api/authenticate",
// });

export const authAPI = {
  async login(data) {
    try {
      const response = await fetch(
        `http://neurodoc.online/api/api/authenticate`,
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return result;
    } catch (e) {
      console.log(123, e);
    }
  },
  // async login(data) {
  //   const response = await instance.post(
  //     ``,
  //     { data },
  //     {
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   );
  //   console.log(response);
  //   return response.data;
  // },
};
