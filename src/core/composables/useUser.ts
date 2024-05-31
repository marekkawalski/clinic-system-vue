import { HttpParamsHelper } from '@/shared/helpers/httpParamsHelper';
import { PageRequestResponseData } from '@/shared/model/PageRequestResponseData';
import { UserPageRequestParams } from '@/shared/model/UserPageRequestParams';
import { DateHelper } from '@/shared/helpers/dateHelper';
import { useSpinner } from '@/shared/spinner/composables/useSpinner';
import { User } from '@/core/models/user/User';
import { UserToAddOrUpdate } from '@/core/models/user/UserToAddOrUpdate';
import { useAxiosInstance } from '@/shared/axios-instance/useAxiosInstance.ts';

export const useUser = () => {
  const { showSpinner, hideSpinner } = useSpinner();
  const axiosInstance = useAxiosInstance();
  const dateHelper = new DateHelper<User>();
  const httpParamsHelper = new HttpParamsHelper();

  const updateUser = async (user: UserToAddOrUpdate, userId: string) => {
    showSpinner();
    try {
      const response = await axiosInstance.put<User>(`/users/${userId}`, user);
      return response.data;
    } finally {
      hideSpinner();
    }
  };

  const getUserById = async (userId: string) => {
    showSpinner();
    try {
      const response = await axiosInstance.get<User>(`/users/${userId}`);
      return response.data;
    } finally {
      hideSpinner();
    }
  };

  const getUserByEmail = async (email: string) => {
    showSpinner();
    try {
      const response = await axiosInstance.get<User>(`/users/email/${email}`);
      return response.data;
    } finally {
      hideSpinner();
    }
  };

  const getPagedUsers = async (params?: UserPageRequestParams) => {
    showSpinner();
    try {
      const response = await axiosInstance.get<PageRequestResponseData<User>>(
        `/users/paged`,
        { params: httpParamsHelper.setupHttpParams(params) },
      );
      return dateHelper.convertDateStringsToDates(response.data, [
        'createdAt',
        'updatedAt',
        'lastLogin',
      ]);
    } finally {
      hideSpinner();
    }
  };

  return {
    updateUser,
    getUserById,
    getUserByEmail,
    getPagedUsers,
  };
};
