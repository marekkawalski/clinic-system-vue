<template>
  <div v-if="doctor" class="doctor-details-wrapper">
    <div class="doctors">
      <div class="doctor">
        <div class="doctor-image">
          <img
            :alt="`${doctor.name} ${doctor.surname}`"
            src="@/assets/images/female-doctor.webp"
          />
        </div>
        <h3 class="name">{{ doctor.name }} {{ doctor.surname }}</h3>
        <div class="tab-group-wrapper">
          <div class="tab-group">
            <v-tabs v-model="tabValue" grow>
              <v-tab>Info</v-tab>
              <v-tab>Examinations</v-tab>
              <v-tab>Doctor Schedule</v-tab>
            </v-tabs>
            <div class="tab-content">
              <div v-if="tabValue === 0">
                <DoctorInfo :doctor="doctor" />
              </div>
              <div v-if="tabValue === 1">
                <Examination :doctor="doctor" />
              </div>
              <div v-if="tabValue === 2">
                <DoctorSchedule :doctor="doctor" />
              </div>
            </div>
          </div>
        </div>
        <div class="schedule-appointment">
          <ScheduleAppointment :doctor="doctor" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useDoctor } from '@/features/doctors/composables/useDoctor.ts';
import { useSpinner } from '@/shared/spinner/composables/useSpinner.ts';
import { Doctor } from '@/core/models/Doctor.ts';
import DoctorInfo from '@/features/doctors/components/DoctorInfo.vue';
import Examination from '@/features/doctors/components/Examination.vue';
import DoctorSchedule from '@/features/doctors/components/DoctorSchedule.vue';
import ScheduleAppointment from '@/features/doctors/components/ScheduleAppointment.vue';

const route = useRoute();
const { fetchDoctorByEmail } = useDoctor();
const { showSpinner, hideSpinner } = useSpinner();

const doctor = ref<Doctor | null>(null);
const tabValue = ref<number>(0);

onMounted(async () => {
  const email = route.params.email as string;
  console.log('email:', email);
  if (email) {
    try {
      showSpinner();
      doctor.value = await fetchDoctorByEmail(email);
    } catch (error) {
      console.error('Failed to fetch doctor:', error);
    } finally {
      hideSpinner();
    }
  }
});
</script>

<style scoped>
.doctor-details-wrapper {
  h3 {
    font-weight: bold;
    font-size: 2em;
  }

  .doctors {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2em;
    min-width: fit-content;

    .doctor {
      padding: 2em;
      width: 100%;
      display: grid;
      grid-template-areas:
        'doctor-image name . .'
        'doctor-image tab-group-wrapper  . schedule-appointment'
        'doctor-image tab-group-wrapper . schedule-appointment';
      gap: 2em;
      background-color: #f5f5f5;

      .doctor-image {
        grid-area: doctor-image;
        width: 40vh;

        img {
          max-width: 400px;
        }
      }

      .tab-group-wrapper {
        grid-area: tab-group-wrapper;
      }

      .tab-group {
        width: max-content;
      }

      .tab-content {
        padding-top: 2em;
        grid-area: tab-content;
        height: 20lh;
        min-width: 40vw;
        width: 0;
      }

      .name {
        grid-area: name;
      }

      .schedule-appointment {
        grid-area: schedule-appointment;
        min-width: fit-content;
      }
    }
  }
}
</style>
