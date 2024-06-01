import { HttpParamsHelper } from '../helpers/httpParamsHelper';
import { AppointmentToAddOrUpdate } from '@/core/models/appointment/AppointmentToAddOrUpdate';
import { Appointment } from '@/core/models/appointment/Appointment';
import { AppointmentPageRequestParams } from '../model/AppointmentPageRequestParams';
import { PageRequestResponseData } from '../model/PageRequestResponseData';
import { useAxiosInstance } from '@/shared/axios-instance/useAxiosInstance.ts';

export function useAppointment() {
  const httpParamsHelper = new HttpParamsHelper();
  const axiosInstance = useAxiosInstance();

  const createAppointment = async (
    appointment: AppointmentToAddOrUpdate,
  ): Promise<Appointment> => {
    const response = await axiosInstance.post<Appointment>(
      '/appointments',
      appointment,
    );
    return response.data;
  };

  const updateAppointment = async (
    appointment: AppointmentToAddOrUpdate,
    appointmentId: string,
  ): Promise<Appointment> => {
    const response = await axiosInstance.put<Appointment>(
      `/appointments/${appointmentId}`,
      appointment,
    );
    return response.data;
  };

  const getPagedDoctorAppointments = async (
    appointmentPageRequestParams: AppointmentPageRequestParams,
    doctorId: string,
  ): Promise<PageRequestResponseData<Appointment>> => {
    const response = await axiosInstance.get<
      PageRequestResponseData<Appointment>
    >(`/appointments/doctors/${doctorId}`, {
      params: httpParamsHelper.setupHttpParams(appointmentPageRequestParams),
    });
    response.data.content.forEach(appointment => {
      appointment.date = new Date(appointment.date);
    });
    return response.data;
  };

  const getPagedPatientAppointments = async (
    params: AppointmentPageRequestParams,
    userId: string,
  ): Promise<PageRequestResponseData<Appointment>> => {
    const response = await axiosInstance.get<
      PageRequestResponseData<Appointment>
    >(`/appointments/patients/${userId}`, {
      params: httpParamsHelper.setupHttpParams(params),
    });
    response.data.content.forEach(appointment => {
      appointment.date = new Date(appointment.date);
    });
    return response.data;
  };

  return {
    createAppointment,
    updateAppointment,
    getPagedDoctorAppointments,
    getPagedPatientAppointments,
  };
}
