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

  async checkoutSession(data) {
    const response = await axios.get(
      `/auth/checkout-session?credits=${data.credits}&amount=${data.amount}`
    );
    console.log(response);
    return response;
  }

  async verifyEmail(data) {
    const response = await axios.post(`/auth/verify-email`, data);
    return response;
  }

  async getStripeTransactions() {
    const response = await axios.get(`/auth/stripe-transactions`);
    return response;
  }
}

export default new Routes();
