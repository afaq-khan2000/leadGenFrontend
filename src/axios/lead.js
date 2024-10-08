import axios from "./axios";
// send

class Routes {
  // change password - api handler
  async getAllLeads(page, limit, search, sortBy, order) {
    const response = await axios.get(`/leads?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&order=${order}`);
    return response;
  }

  async getStats() {
    const response = await axios.get(`/leads/stats`);
    return response;
  }

  async unlockLead(id) {
    const response = await axios.post(`/leads/unlock/${id}`);
    return response;
  }

  async getUnlockedLeads(page, limit, search, sortBy, order) {
    const response = await axios.get(`/leads/unlocked_leads?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&order=${order}`);
    return response;
  }
}

export default new Routes();
