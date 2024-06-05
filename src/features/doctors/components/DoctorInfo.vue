<template>
  <div class="doctor-info-wrapper">
    <div v-if="doctor.doctorDetails" class="doctor-info">
      <div class="basic-info">
        <div v-if="doctor.doctorDetails.specialization">
          <div>
            <p>
              <span class="header">
                <v-icon>mdi-stethoscope</v-icon>
                <strong>Specialization:</strong>
              </span>
              <span>{{ doctor.doctorDetails.specialization }}</span>
            </p>
          </div>
        </div>
        <v-row v-if="doctor.doctorDetails.education">
          <v-col>
            <p>
              <span class="header">
                <v-icon>mdi-school</v-icon>
                <strong>Education:</strong>
              </span>
              <span>{{ doctor.doctorDetails.education }}</span>
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>
              <span class="header">
                <v-icon>mdi-earth</v-icon>
                <strong>Languages:</strong>
              </span>
              English, Spanish
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>
              <span class="header">
                <v-icon>mdi-history</v-icon>
                <strong>Experience:</strong>
              </span>
              10 years of experience
            </p>
          </v-col>
        </v-row>
      </div>

      <v-col cols="12" class="contact-info">
        <v-row>
          <v-col>
            <p>
              <span class="header">
                <v-icon>mdi-map-marker</v-icon>
                <strong>Location:</strong>
              </span>
              <span>Wijttenbachstraat 36, 1093 JC Amsterdam</span>
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>
              <span class="header">
                <v-icon>mdi-email</v-icon>
                <strong>Email:</strong>
              </span>
              <span>{{ doctor.email }}</span>
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>
              <span class="header">
                <v-icon>mdi-phone</v-icon>
                <strong>Phone:</strong>
              </span>
              <span>{{ doctor.phoneNumber }}</span>
            </p>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        cols="12"
        v-if="doctor.doctorDetails.description"
        class="description"
      >
        <p>
          <span class="header">
            <v-icon>mdi-note-text</v-icon>
            <strong>About me:</strong>
          </span>
          <span>{{ doctor.doctorDetails.description }}</span>
        </p>
      </v-col>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Doctor } from '@/core/models/Doctor.ts';

defineProps<{
  doctor: Doctor;
}>();
</script>

<style lang="scss" scoped>
.doctor-info-wrapper {
  p {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 0.6em;
    flex-direction: column;

    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.4em;
    }
  }

  .description {
    padding-top: 3em;
    grid-area: description;
  }

  .doctor-info {
    padding-top: 2em;
    width: 100%;
    display: grid;
    grid-template-areas:
      'basic-info basic-info contact-info contact-info'
      'description description description .';
  }

  .contact-info {
    grid-area: contact-info;
  }

  .basic-info {
    grid-area: basic-info;
  }
}
</style>
