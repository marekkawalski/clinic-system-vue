<template>
  <div class="appointment-wrapper">
    <v-card>
      <v-card-title>Schedule an appointment</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="onSubmit" class="form">
          <div class="form-grid">
            <!-- Appointment Date Field -->
            <div>
              <v-date-picker
                v-model="date"
                label="Appointment date"
                prepend-icon="mdi-calendar"
                :error-messages="errors['date']"
              />
            </div>
            <!-- Examination Field -->
            <div>
              <v-select
                v-model="examinationId"
                :items="doctorExaminations"
                label="Examination"
                item-title="name"
                item-value="id"
                name="examinationId"
                outlined
                dense
                :error-messages="errors['examinationId']"
              ></v-select>
            </div>
          </div>
          <v-btn type="submit" color="primary">Find</v-btn>
        </v-form>
        <div
          v-if="availableAppointmentDates.length"
          class="appointments-parent mt-4"
        >
          <h3>Available appointments</h3>
          <div class="appointments">
            <v-btn
              v-for="(appointment, key) in availableAppointmentDates"
              :key="key"
              variant="outlined"
              @click="handleScheduleAppointment(appointment.date)"
            >
              {{ formatDate(appointment.date, 'HH:mm') }}
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { z } from 'zod';
import { useAuth } from '@/core/authentication/composables/useAuth';
import { useSnackbar } from '@/shared/snackbar/composables/useSnackbar';
import { useExamination } from '@/features/doctors/composables/useExamination';
import { useAppointment } from '@/shared/composables/useAppointment';
import { useDoctor } from '@/features/doctors/composables/useDoctor';
import { AppointmentStatus } from '@/core/enums/AppointmentStatus';
import { Examination } from '@/core/models/Examination.ts';
import { AvailableAppointments } from '@/features/doctors/model/AvailableAppointments.ts';
import { Doctor } from '@/core/models/Doctor.ts';
import { AppointmentToAddOrUpdate } from '@/core/models/appointment/AppointmentToAddOrUpdate.ts';
import { formatDate } from 'date-fns';
import { toTypedSchema } from '@vee-validate/zod';

const props = defineProps<{ doctor: Doctor }>();
const { authData } = useAuth();
const { showSnackbar } = useSnackbar();
const { fetchDoctorExaminations } = useExamination();
const { createAppointment } = useAppointment();
const { fetchAvailableAppointments } = useDoctor();

const doctorExaminations = ref<Examination[]>([]);
const availableAppointmentDates = ref<AvailableAppointments[]>([]);

const schema = z.object({
  date: z
    .date()
    .nullable()
    .refine(val => !!val, { message: 'Appointment date is required' }),
  examinationId: z.string().min(1, 'Examination is required'),
});

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(schema),
});

const { value: date } = useField<Date>('date');
const { value: examinationId } = useField<string>('examinationId');

onMounted(() => {
  if (props.doctor) {
    loadDoctorExaminations(props.doctor.id);
  }
});

const loadDoctorExaminations = async (doctorId: string) => {
  try {
    doctorExaminations.value = await fetchDoctorExaminations(doctorId);
    console.log('doctorExaminations:', doctorExaminations.value);
  } catch {
    showSnackbar('Failed to load doctor examinations.', 'error');
  }
};

const loadAvailableAppointments = async (examinationId: string, date: Date) => {
  try {
    const formattedDate = date.toISOString().split('T')[0] + 'T23:59';
    availableAppointmentDates.value = await fetchAvailableAppointments(
      props.doctor.id,
      examinationId,
      formattedDate,
    );
  } catch {
    showSnackbar('No available appointments for this date.', 'error');
  }
};

const onSubmit = handleSubmit(async (values: any) => {
  console.log('values:', values);
  if (!values.date || !values.examinationId) return;
  await loadAvailableAppointments(values.examinationId, values.date);
});

const handleScheduleAppointment = async (appointmentDate: Date) => {
  if (
    !props.doctor.id ||
    !authData?.value?.id ||
    !date.value ||
    !examinationId.value
  )
    return;

  const appointment: AppointmentToAddOrUpdate = {
    date: appointmentDate,
    status: AppointmentStatus.BOOKED,
    doctorId: props.doctor.id,
    patientId: authData.value.id,
    examinationId: examinationId.value,
  };

  try {
    await createAppointment(appointment);
    showSnackbar('Appointment scheduled successfully.', 'success');
    await loadAvailableAppointments(examinationId.value, date.value);
  } catch {
    showSnackbar('Failed to schedule appointment.', 'error');
  }
};
</script>

<style scoped>
.appointment-wrapper {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  gap: 1em;
  align-items: center;

  h3 {
    font-weight: bold;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: max-content;
  }

  .appointments-parent {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;

    .appointments {
      display: grid;
      gap: 0.5em;
      height: 30vh;
      overflow-x: auto;
      width: 100%;
      grid-template-columns: repeat(3, 1fr);

      .appointment {
        width: fit-content;
        height: auto;
      }
    }
  }
}
</style>
