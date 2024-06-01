<template>
  <div>
    <h2>My appointments</h2>
    <v-container v-if="appointments.length">
      <v-table>
        <thead>
          <tr>
            <th
              v-for="(title, index) in tableHelper.baseColumnTitles"
              :key="tableHelper.baseColumnNames[index]"
              :id="`th-${index}`"
            >
              {{ title }}
            </th>
            <th id="cancel">Cancel</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in appointments" :key="appointment.id">
            <td v-for="column in tableHelper.baseColumnNames" :key="column">
              {{ tableHelper.nestedPropertyAccessor(appointment, column) }}
            </td>
            <td>
              <v-btn
                variant="flat"
                @click="cancelAppointment(appointment)"
                aria-label="cancel"
              >
                <v-icon color="primary">mdi-cancel</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      <Paginator
        :data="pageAppointmentResponseData"
        :requestParams="requestParams"
        :on-page-change="handlePageChange"
      />
    </v-container>
    <v-container v-else class="no-data">
      <div>No appointments found</div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { PageRequestParams } from '@/shared/model/PageRequestParams';
import { PageRequestResponseData } from '@/shared/model/PageRequestResponseData';
import { TableHelper } from '@/shared/helpers/tableHelper';
import { Appointment } from '@/core/models/appointment/Appointment';
import { AppointmentStatus } from '@/core/enums/AppointmentStatus';
import { ExaminationPageRequestParams } from '@/shared/model/ExaminationPageRequestParams';
import { useAppointment } from '@/shared/composables/useAppointment.ts';
import { useSnackbar } from '@/shared/snackbar/composables/useSnackbar.ts';
import { useAuth } from '@/core/authentication/composables/useAuth.ts';
import Paginator from '@/shared/components/Paginator.vue';
import { useSpinner } from '@/shared/spinner/composables/useSpinner.ts';

const { authData } = useAuth();
const { showSnackbar } = useSnackbar();
const { getPagedPatientAppointments, updateAppointment } = useAppointment();
const { showSpinner, hideSpinner } = useSpinner();

const appointments = ref<Appointment[]>([]);
const pageAppointmentResponseData = ref<
  PageRequestResponseData<Appointment> | undefined
>(undefined);
const requestParams = ref<PageRequestParams>({});
const tableHelper = new TableHelper();

const loadAppointments = async () => {
  if (!authData.value?.id) return;
  try {
    showSpinner();
    const response = await getPagedPatientAppointments(
      requestParams.value,
      authData.value.id,
    );
    appointments.value = response.content;
    pageAppointmentResponseData.value = response;
    tableHelper.setSpecifiedBaseColumnNamesFromRequestData(
      response,
      [
        'examination.name',
        'date',
        'doctor.email',
        'status',
        'examination.price',
        'examination.duration',
      ],
      {
        'examination.name': 'Examination',
        date: 'Date',
        'doctor.email': 'Doctor',
        status: 'Status',
        'examination.price': 'Price',
        'examination.duration': 'Duration',
      },
    );
  } catch {
    showSnackbar('No appointments found.', 'info');
  } finally {
    hideSpinner();
  }
};

const cancelAppointment = async (appointment: Appointment) => {
  if (new Date(appointment.date) < new Date()) {
    showSnackbar(
      'You cannot cancel an appointment that has already passed.',
      'error',
    );
    return;
  }
  try {
    await updateAppointment(
      {
        date: appointment.date,
        status: AppointmentStatus.CANCELLED,
        doctorId: appointment.doctor.id,
        patientId: appointment.patient.id,
        examinationId: appointment.examination.id,
      },
      appointment.id,
    );
    showSnackbar('Appointment cancelled successfully.', 'success');
    await loadAppointments();
  } catch {
    showSnackbar('Failed to cancel appointment.', 'error');
  }
};

onMounted(() => {
  loadAppointments();
});

watch(requestParams, loadAppointments, { deep: true });

const handlePageChange = (params: ExaminationPageRequestParams) => {
  requestParams.value = params;
};
</script>

<style scoped>
.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
