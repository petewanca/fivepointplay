import axios from "axios";

export default {
  // POST to log user in.
  login: function(userObj) {
    return axios.post("/api/auth/login", userObj);
  },
  // POST to sign up a new user.
  signup: function(userObj) {
    return axios.post("/api/users", userObj);
  }
};