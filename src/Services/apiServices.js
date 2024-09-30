//import axios from "axios";

import axios from "axios";

const API_BASE_URL = "https://team1api-g0dsd6dncehvd5dp.centralindia-01.azurewebsites.net"; // Leave this empty to use relative path

const apiService = {
  get: async (url) => {
    try {
      const response = await axios.get(`${API_BASE_URL}${url}`);
      return response.data;
    } catch (error) {
      console.error("Error in GET request:", error);
      throw error;
    }
  },

  post: async (url, data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}${url}`, data);
      return response.data;
    } catch (error) {
      console.error("Error in POST request:", error);
      throw error;
    }
  },

  put: async (url, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}${url}`, data);
      return response.data;
    } catch (error) {
      console.error("Error in PUT request:", error);
      throw error;
    }
  },

  delete: async (url) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}${url}`);
      return response.data;
    } catch (error) {
      console.error("Error in DELETE request:", error);
      throw error;
    }
  },
};

export default apiService;
