import axios from "axios";

export default {
  // Gets all books
  login: function() {
    return axios.get("/api/auth/login");
  },
};