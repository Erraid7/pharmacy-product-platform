// lib/api.ts

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined.');
}

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.Accept = 'application/json';
    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  (error) => Promise.reject(error)
);

let isRedirecting = false;

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    if (typeof window !== 'undefined') {
      const status = error.response?.status;
      const requestUrl = error.config?.url ?? '';

      // Don't logout if the login request itself fails
      const isLoginRequest = requestUrl.includes('/api/auth/login');

      if (status === 401 && !isLoginRequest) {
        localStorage.removeItem('pharmaflow_user');

        if (!isRedirecting) {
          isRedirecting = true;

          const currentPath = window.location.pathname;

          if (currentPath !== '/login') {
            window.location.replace('/login');
          }

          setTimeout(() => {
            isRedirecting = false;
          }, 1000);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;