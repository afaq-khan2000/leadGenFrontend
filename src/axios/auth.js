import axios from "./axios";
// send

class Routes {
  // change password - api handler
  async register(data) {
    const response = await axios.post(`/auth/register`, data);
    return response;
  }

  async login(data) {
    const response = await axios.post(`/auth/login`, data);
    return response;
  }

  async checkoutSession() {
    const response = await axios.get(`/auth/checkout-session`);
    console.log(response);
    return response;
  }
}

export default new Routes();
