import { HttpParamsHelper } from '@/shared/helpers/httpParamsHelper.ts';
import { UserPageRequestParams } from '@/shared/model/UserPageRequestParams.ts';
import { PageRequestResponseData } from '@/shared/model/PageRequestResponseData.ts';
import { Doctor } from '@/core/models/Doctor.ts';
import { DailySchedule } from '@/core/models/user/Schedule.ts';
import { AvailableAppointments } from '@/features/doctors/model/AvailableAppointments.ts';
import { useAxiosInstance } from '@/shared/axios-instance/useAxiosInstance.ts';

const apiUrl = import.meta.env.VITE_API_URL;
const httpParamsHelper = new HttpParamsHelper();

export const useDoctor = () => {
  const axiosInstance = useAxiosInstance();

  const fetchPagedDoctors = async (
    params?: UserPageRequestParams,
  ): Promise<PageRequestResponseData<Doctor>> => {
    const response = await axiosInstance.get<PageRequestResponseData<Doctor>>(
      `/doctors/paged`,
      { params: httpParamsHelper.setupHttpParams(params) },
    );
    return response.data;
  };

  const fetchDoctorByEmail = async (email: string): Promise<Doctor> => {
    const response = await axiosInstance.get<Doctor>(
      `${apiUrl}/doctors/email/${email}`,
    );
    const doctor = response.data;

    if (doctor.doctorDetails?.schedule?.dailySchedules) {
      const entries: [string, DailySchedule][] = Object.entries(
        doctor.doctorDetails.schedule.dailySchedules,
      );
      doctor.doctorDetails.schedule.dailySchedules = new Map<
        string,
        DailySchedule
      >(
        entries.map(([key, value]) => {
          const startDate = new Date();
          const endDate = new Date();
          const [sh, sm] = value.startTime.split(':');
          const [eh, em] = value.endTime.split(':');

          startDate.setUTCHours(+sh, +sm, 0, 0);
          endDate.setUTCHours(+eh, +em, 0, 0);

          value.startTime = startDate.toLocaleTimeString();
          value.endTime = endDate.toLocaleTimeString();

          return [key, value];
        }),
      );
    }

    return doctor;
  };

  const fetchAvailableAppointments = async (
    doctorId: string,
    examinationId: string,
    date: string,
  ): Promise<AvailableAppointments[]> => {
    const response = await axiosInstance.get<AvailableAppointments[]>(
      `/doctors/${doctorId}/examinations/${examinationId}/available-appointments/date/${date}`,
    );
    return response.data.map((appointment: AvailableAppointments) => {
      appointment.date = new Date(appointment.date);
      return appointment;
    });
  };

  return {
    fetchPagedDoctors,
    fetchDoctorByEmail,
    fetchAvailableAppointments,
  };
};
