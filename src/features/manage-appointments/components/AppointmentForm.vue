<template>
  <div
    :class="formType === FormType.PopupForm ? 'popup-form' : 'whole-page-form'"
  >
    <v-card>
      <v-card-title>{{ action }}</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="onSubmit">
          <div class="form-grid">
            <!-- Status Field -->
            <div>
              <v-select
                v-model="status"
                :items="Object.values(AppointmentStatus)"
                label="Status"
                outlined
                dense
                :error-messages="errors['status']"
              ></v-select>
            </div>

            <!-- Description Field -->
            <div>
              <v-text-field
                v-model="description"
                label="Description"
                multiline
                rows="4"
                outlined
                dense
                full-width
              ></v-text-field>
            </div>

            <!-- Medicines Fields -->
            <div v-for="(medicine, index) in medicines" :key="index">
              <v-card flat>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="medicine.name"
                        label="Name"
                        outlined
                        dense
                        full-width
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="medicine.quantity"
                        label="Quantity"
                        outlined
                        dense
                        full-width
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="medicine.numberOfDays"
                        label="Number Of Days"
                        outlined
                        dense
                        full-width
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="medicine.dosage"
                        label="Dosage"
                        outlined
                        dense
                        full-width
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </div>

            <!-- Add Medicine Button -->
            <div class="pt-2 pb-2">
              <v-btn @click="addMedicine">
                <v-icon>mdi-plus</v-icon>
                Add Medicine
              </v-btn>
            </div>
          </div>

          <!-- Submit Button -->
          <v-btn
            v-if="formType === FormType.WholePageForm"
            type="submit"
            color="primary"
            >Submit
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';
import { useField, useForm } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { AppointmentStatus } from '@/core/enums/AppointmentStatus';
import { FormType } from '@/shared/enums/FormType';
import { Appointment } from '@/core/models/appointment/Appointment.ts';
import { useSnackbar } from '@/shared/snackbar/composables/useSnackbar.ts';
import { useAppointment } from '@/shared/composables/useAppointment.ts';
import { AppointmentToAddOrUpdate } from '@/core/models/appointment/AppointmentToAddOrUpdate.ts';
import { eventBus } from '@/shared/eventBus.ts';

interface Props {
  appointment: Appointment;
  action?: string;
  formType: FormType;
  onClose: () => void;
}

const props = defineProps<Props>();

const schema = z.object({
  status: z.enum(
    Object.values(AppointmentStatus) as [
      AppointmentStatus,
      ...AppointmentStatus[],
    ],
  ),
  description: z.string().optional(),
  medicines: z.array(
    z.object(<any>{
      name: z.string().min(1, 'Name is required'),
      quantity: z.string().min(1, 'Quantity is required'),
      numberOfDays: z.string().min(1, 'Number of days is required'),
      dosage: z.string().min(1, 'Dosage is required'),
    }),
  ),
});

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: toTypedSchema(schema),
});

const { value: status } = useField<AppointmentStatus>('status');
const { value: description } = useField<string>('description');
const { value: medicines } = useField<any[]>('medicines');

const addMedicine = () => {
  medicines.value.push({
    name: '',
    quantity: '',
    numberOfDays: '',
    dosage: '',
  });
};

const { showSnackbar } = useSnackbar();
const { updateAppointment } = useAppointment();

watch(
  () => props.appointment,
  (newAppointment: Appointment) => {
    if (newAppointment) {
      resetForm({
        values: {
          status: newAppointment.status,
          description: newAppointment.description,
          medicines: newAppointment?.medicines ?? [],
        },
      });
    }
  },
  { immediate: true },
);

onMounted(() => {
  eventBus.on('submit-form', onSubmit);
});

onUnmounted(() => {
  eventBus.off(`submit-form`, onSubmit);
});

const onSubmit = handleSubmit(async data => {
  if (!props.appointment) return;
  try {
    const appointmentToAddOrUpdate: AppointmentToAddOrUpdate = {
      description: data.description,
      status: data.status,
      date: props.appointment.date,
      doctorId: props.appointment.doctor.id,
      patientId: props.appointment.patient.id,
      examinationId: props.appointment.examination.id,
      medicines: data.medicines,
    };
    await updateAppointment(appointmentToAddOrUpdate, props.appointment.id);
    props.onClose();
    showSnackbar('Appointment updated successfully.', 'success');
  } catch {
    props.onClose();
    showSnackbar('Appointment update failed.', 'error');
  }
});
</script>

<style scoped>
.popup-form {
  width: 100%;
}

.whole-page-form {
  width: 80%;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  gap: 1em;
}
</style>
