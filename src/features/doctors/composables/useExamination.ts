import { HttpParamsHelper } from '@/shared/helpers/httpParamsHelper';
import { Examination } from '@/core/models/Examination';
import { PageRequestResponseData } from '@/shared/model/PageRequestResponseData';
import { ExaminationPageRequestParams } from '@/shared/model/ExaminationPageRequestParams';
import { useAxiosInstance } from '@/shared/axios-instance/useAxiosInstance.ts';

export const useExamination = () => {
  const httpParamsHelper = new HttpParamsHelper();
  const axiosInstance = useAxiosInstance();

  const fetchDoctorExaminations = async (
    doctorId: string,
  ): Promise<Examination[]> => {
    const response = await axiosInstance.get<Examination[]>(
      `/doctors/${doctorId}/examinations`,
    );
    return response.data;
  };

  const fetchPagedDoctorExaminations = async (
    params: ExaminationPageRequestParams,
  ): Promise<PageRequestResponseData<Examination>> => {
    const response = await axiosInstance.get<
      PageRequestResponseData<Examination>
    >(`/examinations/paged`, {
      params: httpParamsHelper.setupHttpParams(params),
    });
    return response.data;
  };

  return {
    fetchDoctorExaminations,
    fetchPagedDoctorExaminations,
  };
};
