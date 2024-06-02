<template>
  <v-container>
    <h2>Manage Appointments</h2>
    <template v-if="appointments.length">
      <v-table class="mat-elevation-z8">
        <thead>
          <tr>
            <th
              v-for="(column, i) in tableHelper.baseColumnNames"
              :key="column"
              :id="`th-${i}`"
            >
              {{ tableHelper.baseColumnTitles[i] }}
            </th>
            <th id="th-edit">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in appointments" :key="appointment.id">
            <td v-for="column in tableHelper.baseColumnNames" :key="column">
              {{ tableHelper.nestedPropertyAccessor(appointment, column) }}
            </td>
            <td>
              <v-btn
                @click="openEditAppointmentDialog(appointment)"
                variant="flat"
              >
                <v-icon color="primary"> mdi-pencil</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      <Paginator
        :data="pageAppointmentResponseData"
        :request-params="requestParams"
        :on-page-change="handlePageChange"
      />
    </template>
    <template v-else>
      <v-alert type="info">No appointments found</v-alert>
    </template>
    <FormDialogComponent />
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useFormDialog } from '@/shared/form-dialog/useFormDialog.ts';
import { useAppointment } from '@/shared/composables/useAppointment.ts';
import { useSnackbar } from '@/shared/snackbar/composables/useSnackbar.ts';
import { TableHelper } from '@/shared/helpers/tableHelper.ts';
import { Appointment } from '@/core/models/appointment/Appointment.ts';
import AppointmentForm from '@/features/manage-appointments/components/AppointmentForm.vue';
import Paginator from '@/shared/components/Paginator.vue'; // Adjust this path to your actual paginator component
import { useAuth } from '@/core/authentication/composables/useAuth.ts';
import { PageRequestParams } from '@/shared/model/PageRequestParams.ts';
import { PageRequestResponseData } from '@/shared/model/PageRequestResponseData.ts';
import { useSpinner } from '@/shared/spinner/composables/useSpinner.ts';
import { FormType } from '@/shared/enums/FormType.ts';

const { openDialog, closeDialog, FormDialogComponent } = useFormDialog();
const { showSnackbar } = useSnackbar();
const { getPagedDoctorAppointments } = useAppointment();
const { showSpinner, hideSpinner } = useSpinner();
const route = useRoute();
const { authData } = useAuth();

const doctorId = ref<string | undefined>(
  route.query.doctorId?.toString() || authData.value?.id,
);

const appointments = ref(<Appointment[]>[]);
const pageAppointmentResponseData = ref<PageRequestResponseData<Appointment>>();
const requestParams = ref<PageRequestParams>({});

const tableHelper = new TableHelper();

const loadAppointments = async () => {
  if (!doctorId.value) return;
  try {
    showSpinner();
    const response = await getPagedDoctorAppointments(
      requestParams.value,
      doctorId.value,
    );
    appointments.value = response.content;
    pageAppointmentResponseData.value = response;

    tableHelper.setSpecifiedBaseColumnNamesFromRequestData(
      response,
      [
        'id',
        'status',
        'patient.email',
        'doctor.email',
        'examination.name',
        'examination.price',
        'examination.duration',
      ],
      {
        'patient.email': 'Patient',
        'doctor.email': 'Doctor',
        'examination.name': 'Examination',
        'examination.price': 'Price',
        'examination.duration': 'Duration',
      },
    );
    tableHelper.setAllColumnNames(['edit']);
  } catch {
    showSnackbar('No appointments found.', 'info');
  } finally {
    hideSpinner();
  }
};

const handleClose = async () => {
  closeDialog();
  await loadAppointments();
};

const openEditAppointmentDialog = (appointment: Appointment) => {
  openDialog({
    component: AppointmentForm,
    props: {
      appointment,
      formType: FormType.PopupForm,
      onClose: handleClose,
      action: 'Edit appointment',
    },
    options: { title: 'Edit Appointment', width: '600px' },
  });
};

onMounted(() => {
  loadAppointments();
});

watch(requestParams, loadAppointments, { deep: true });

const handlePageChange = (params: PageRequestParams) => {
  if (!params) return;
  requestParams.value = params;
};
</script>

<style scoped>
.no-data {
  text-align: center;
  margin-top: 20px;
}
</style>
