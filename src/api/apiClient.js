import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the JWT token to headers if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration and automatic refreshing
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh');

      if (refreshToken) {
        try {
          // Attempt to get a new access token
          const response = await axios.post(`${BASE_URL}auth/token/refresh/`, {
            refresh: refreshToken
          });

          const { access } = response.data;
          
          // Save the new token
          localStorage.setItem('token', access);
          
          // Update the authorization header for the original request and retry it
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          // If refresh token is also invalid/expired, log out the user
          localStorage.removeItem('token');
          localStorage.removeItem('refresh');
          // Optional: redirect to login
          // window.location.href = '/register';
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
