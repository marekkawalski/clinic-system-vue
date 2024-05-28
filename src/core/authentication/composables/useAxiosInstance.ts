import { ref, watchEffect } from 'vue';
import axios, { AxiosInstance } from 'axios';
import { useRouter } from 'vue-router';
import { useAuth } from '@/core/authentication/composables/useAuth.ts';
import { useSnackbar } from '@/shared/snackbar/composables/useSnackbar.ts';
import { PathConstants } from '@/core/constants/path.constants.ts';

const API_URL = import.meta.env.VITE_API_URL;

export const useAxiosInstance = () => {
  const { showSnackbar } = useSnackbar();
  const { authData, logout } = useAuth();
  const router = useRouter();
  const axiosInstance = ref<AxiosInstance | null>(null);

  const createAxiosInstance = () => {
    const instance = axios.create({
      baseURL: API_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    instance.interceptors.request.use(config => {
      const newConfig = { ...config };
      if (authData.value) {
        newConfig.headers.Authorization = `Basic ${window.btoa(authData.value.email + ':' + authData.value.password)}`;
      } else {
        delete newConfig.headers.Authorization;
      }
      return newConfig;
    });

    instance.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          if (error.response.status === 401) {
            console.error('Unauthorized request!');
            showSnackbar('Unauthorized request!', 'error');
            logout();
            router.push(PathConstants.LOGIN_PATH);
          } else {
            const errorMessage = error.response.data?.message || error.message;
            showSnackbar(`HTTP error: ${errorMessage}`, 'error');
          }
        } else {
          const errorMessage = error.message;
          console.error('An error occurred:', errorMessage);
          showSnackbar(`An error occurred: ${errorMessage}`, 'error');
        }

        return Promise.reject(error);
      },
    );

    return instance;
  };

  watchEffect(() => {
    axiosInstance.value = createAxiosInstance();
  });

  return { axiosInstance };
};
