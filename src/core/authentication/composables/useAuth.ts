import { computed, reactive } from 'vue';
import { AuthData } from '@/core/models/AuthData.ts';
import { User } from '@/core/models/user/User.ts';
import { PathConstants } from '@/core/constants/path.constants.ts';
import router from '@/router';
import { UserRole } from '@/core/enums/UserRole.ts';
import axios from 'axios';

const AUTH_DATA_KEY = 'authData';

const API_URL = import.meta.env.VITE_API_URL;

const state = reactive({
  authData: null as AuthData | null,
  redirectUrl: null as string | null,
});

const initAuthData = () => {
  const authData = sessionStorage.getItem(AUTH_DATA_KEY);
  if (authData) {
    state.authData = JSON.parse(authData);
  }
};

const useAuth = () => {
  const authData = computed(() => state.authData);

  const login = async (email: string, password: string): Promise<User> => {
    const token = `Basic ${window.btoa(email + ':' + password)}`;
    try {
      const response = await axios.post<User>(`${API_URL}/auth/login`, null, {
        headers: {
          Authorization: token,
        },
      });

      const userData = response.data;
      const authData = { ...userData, password };
      sessionStorage.setItem(AUTH_DATA_KEY, JSON.stringify(authData));
      state.authData = authData;
      return userData;
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    sessionStorage.clear();
    state.authData = null;
    router.push(PathConstants.LOGIN_PATH).then(() => {
      console.log('You have been logged out.');
    });
  };

  const checkAccess = (allowedRoles: UserRole[]): boolean => {
    const authData = state.authData;
    if (authData) {
      return allowedRoles.includes(authData.role);
    }
    return false;
  };

  return {
    authData,
    login,
    logout,
    checkAccess,
  };
};

initAuthData();

export { useAuth };
