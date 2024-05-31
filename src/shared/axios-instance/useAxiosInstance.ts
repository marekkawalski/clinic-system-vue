import { inject, provide } from 'vue';
import { useAuth } from '@/core/authentication/composables/useAuth.ts';
import { useSnackbar } from '@/shared/snackbar/composables/useSnackbar.ts';
import axios, { AxiosInstance } from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const createAxiosInstance = (): AxiosInstance => {
  const { showSnackbar } = useSnackbar();
  const { authData, logout } = useAuth();

  axiosInstance.interceptors.request.use((config: any) => {
    const newConfig = { ...config };
    if (authData.value) {
      newConfig.headers.Authorization = `Basic ${window.btoa(authData.value.email + ':' + authData.value.password)}`;
    } else {
      delete newConfig.headers.Authorization;
    }
    return newConfig;
  });

  axiosInstance.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      if (error.response) {
        if (error.response.status === 401) {
          console.error('Unauthorized request!');
          showSnackbar('Unauthorized request!', 'error');
          logout();
        } else {
          const errorMessage = error.response.data?.message || error.message;
          showSnackbar(`HTTP error: ${errorMessage}`, 'error');
        }
      } else {
        const errorMessage = error?.error?.message ?? error?.message;
        console.error('An error occurred:', errorMessage);
        showSnackbar(`${errorMessage}`, 'error');
      }

      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

const AXIOS_INSTANCE_KEY = Symbol('AxiosInstance');

export const provideAxiosInstance = () => {
  provide<AxiosInstance>(AXIOS_INSTANCE_KEY, createAxiosInstance());
};

export const useAxiosInstance = (): AxiosInstance => {
  const instance = inject<AxiosInstance>(AXIOS_INSTANCE_KEY);
  if (!instance) {
    throw new Error('useAxiosInstance must be used within a provider');
  }
  return instance;
};
