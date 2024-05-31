import { ref } from 'vue';
import { useSpinner } from '@/shared/spinner/composables/useSpinner';
import { User } from '@/core/models/user/User';
import { UserToAddOrUpdate } from '@/core/models/user/UserToAddOrUpdate';
import { useAxiosInstance } from '@/shared/axios-instance/useAxiosInstance.ts';

export const useRegister = () => {
  const data = ref<User | null>(null);
  const { showSpinner, hideSpinner } = useSpinner();
  const axiosInstance = useAxiosInstance();

  const register = async (user: UserToAddOrUpdate) => {
    showSpinner();
    try {
      const response = await axiosInstance.post<User>('/registration', user);
      data.value = response.data;
      return response.data;
    } finally {
      hideSpinner();
    }
  };

  return { register, data };
};
