<template>
  <section class="doctors-wrapper">
    <h2>Meet our doctors</h2>
    <div class="doctors">
      <Paginator
        :onPageChange="setUserRequestParams"
        :data="data"
        :requestParams="userRequestParams"
      />
      <div v-for="doctor in data?.content" :key="doctor.id" class="doctor">
        <div class="doctor-image">
          <img :alt="doctor.email" src="@/assets/images/female-doctor.webp" />
        </div>
        <div class="doctor-info">
          <h3 class="doctor-name">
            <router-link class="no-link" :to="`${doctor.email}`">
              {{ doctor.name }} {{ doctor.surname }}
            </router-link>
          </h3>
          <p v-if="doctor.doctorDetails?.specialization" class="body-2">
            <v-icon>mdi-stethoscope</v-icon>
            {{ doctor.doctorDetails.specialization }}
          </p>
          <p class="body-2">
            <v-icon>mdi-map-marker</v-icon>
            Wijttenbachstraat 36, 1093 JC Amsterdam
          </p>
          <p v-if="doctor.doctorDetails?.education" class="body-2">
            <v-icon>mdi-school</v-icon>
            {{ doctor.doctorDetails.education }}
          </p>
          <p
            v-if="doctor.doctorDetails?.description"
            class="body-2 description"
          >
            {{ doctor.doctorDetails.description }}
          </p>
        </div>
        <div class="schedule-appointment">
          <v-btn
            :to="`${PathConstants.DOCTOR_DETAILS_PATH}/${doctor.email}`"
            outlined
          >
            Schedule Appointment
          </v-btn>
          <v-btn
            v-if="checkAccess([UserRole.REGISTRAR])"
            :to="`/manage-appointments/${doctor.id}`"
            outlined
          >
            Manage appointments
          </v-btn>
        </div>
      </div>
      <Paginator
        :onPageChange="setUserRequestParams"
        :data="data"
        :requestParams="userRequestParams"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useDoctor } from '@/features/doctors/composables/useDoctor';
import { useSpinner } from '@/shared/spinner/composables/useSpinner';
import { PageRequestParams } from '@/shared/model/PageRequestParams';
import { Doctor } from '@/core/models/Doctor';
import { UserRole } from '@/core/enums/UserRole';
import { PathConstants } from '@/core/constants/path.constants';
import { PageRequestResponseData } from '@/shared/model/PageRequestResponseData.ts';
import { useAuth } from '@/core/authentication/composables/useAuth.ts';
import Paginator from '@/shared/components/Paginator.vue';

const userRequestParams = ref<PageRequestParams>({});
const data = ref<PageRequestResponseData<Doctor> | undefined>(undefined);

const { fetchPagedDoctors } = useDoctor();
const { showSpinner, hideSpinner } = useSpinner();
const { checkAccess } = useAuth();

const getDoctors = async () => {
  showSpinner();
  try {
    data.value = await fetchPagedDoctors(userRequestParams.value);
  } finally {
    hideSpinner();
  }
};

onMounted(() => {
  getDoctors();
});

const setUserRequestParams = (params: PageRequestParams) => {
  userRequestParams.value = params;
  getDoctors();
};
</script>

<style scoped>
.doctors-wrapper {
  h3 {
    font-weight: 400;
    text-align: center;
    font-size: 1.6rem;
    padding-bottom: 1em;
  }

  .doctors {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 2em;
    font-size: 0.8em;

    .doctor {
      padding: 2em;
      width: 70%;
      display: grid;
      grid-template-areas: 'doctor-image doctor-info doctor-info doctor-info schedule-appointment';
      gap: 2em;
      background-color: #f5f5f5;

      p {
        display: flex;
        align-items: center;
        gap: 0.6em;
        font-size: 0.9rem;
      }

      .description {
        padding-top: 3em;
      }

      .doctor-image {
        grid-area: doctor-image;
        height: 40vh;
        display: flex;
      }

      .doctor-info {
        grid-area: doctor-info;
        display: flex;
        flex-direction: column;
        gap: 0.4em;
      }

      .schedule-appointment {
        grid-area: schedule-appointment;
        align-self: center;
        display: flex;
        gap: 1em;
        flex-direction: column;
        width: max-content;
      }
    }
  }
}
</style>
