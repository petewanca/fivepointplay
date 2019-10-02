import axios from "axios";

export default {
  // POST to log user in.
  login: function(userObj) {
    return axios.post("/api/auth/login", userObj);
  },
  // GET all teams.
  logout: function() {
    return axios.get("/api/auth/logout");
  },
  userData: function(id, token) {
    return axios.get("/api/users/" + id, token)
  },
  // POST to sign up a new user.
  signup: function(userObj) {
    return axios.post("/api/users", userObj);
  },
  // GET all teams.
  getTeams: function() {
    return axios.get("/api/getTeams");
  }
};