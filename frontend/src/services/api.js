const API_BASE = "http://localhost:8081";

export const api = {
  getInvoices: async (token) => {
    const res = await fetch(`${API_BASE}/api/invoices`, {
      method: "GET",
      headers: {
        "Authorization": "Basic " + token,
        "Content-Type": "application/json"
      }
    });
    return res;
  },

  getTransactions: async (token) => {
    const res = await fetch(`${API_BASE}/api/transactions`, {
      method: "GET",
      headers: {
        "Authorization": "Basic " + token,
        "Content-Type": "application/json"
      }
    });
    return res;
  },

  getMerchants: async (token) => {
    const res = await fetch(`${API_BASE}/api/merchants`, {
      method: "GET",
      headers: {
        "Authorization": "Basic " + token,
        "Content-Type": "application/json"
      }
    });
    return res;
  }
};
