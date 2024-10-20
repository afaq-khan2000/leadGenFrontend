import axios from "./axios";
// send

class Routes {
  // change password - api handler
  async getAllUsers(page, limit, search, sortBy, order) {
    const response = await axios.get(`/admin/users?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&order=${order}`);
    return response;
  }

  async getStats() {
    const response = await axios.get(`/admin/stats`);
    return response;
  }

}

export default new Routes();
