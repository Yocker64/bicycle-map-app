// test-api.js
import axios from "axios";

// Set environment variable for Node.js
const API_BASE_URL = "10.40.211.54:5173";

const testApi = async () => {
  try {
    const response = await axios({
      method: "post",
      url: `${API_BASE_URL}/auth/login/demo`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("API connection successful:", response.data);
  } catch (error) {
    console.log("API connection failed:", error.message);
    if (error.response) {
      console.log("Response status:", error.response.status);
      console.log("Response data:", error.response.data);
    }
  }
};

testApi();
