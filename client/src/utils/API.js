import axios from "axios";

export default {
  login: function(userObj) {
    return axios.post("/api/auth/login", userObj);
  },
  
};