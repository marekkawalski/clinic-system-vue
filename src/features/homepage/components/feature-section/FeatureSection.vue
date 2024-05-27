<template>
  <div class="features-wrapper page-wrapper">
    <Feature
      v-for="(feature, index) in features"
      :key="index"
      :icon="feature.icon"
      :title="feature.title"
      :description="feature.description"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Feature from './Feature.vue';

export default defineComponent({
  name: 'FeaturesSection',
  components: {
    Feature,
  },
  setup() {
    const features = ref([
      {
        icon: 'mdi-clock-outline',
        title: 'Save time',
        description:
          'Patients are scheduled for specific times to minimize waiting time to a minimum.',
      },
      {
        icon: 'mdi-medical-bag',
        title: 'Specialists at Your Service',
        description:
          'If you need expert care, look no further. Our clinic flaunts an array of specialists, including an otolaryngologist, ready to provide top-notch medical service.',
      },
      {
        icon: 'mdi-office-building',
        title: 'A Trusted Name in Healthcare',
        description:
          'Our clinic was established in 1987 by Tim Jones. His mission was to create a patient-focused health center providing high-quality healthcare for the community. Today, we continue his legacy, carrying forward his commitment to exceptional care, with a team of skilled professionals and state-of-the-art medical technology.',
      },
      {
        icon: 'mdi-map-marker',
        title: 'Where-to-find us',
        description:
          'Easily accessible and properly situated, our clinic is located on the main thoroughfare. Convenient bus stops and dedicated car parking ensure ease of commute for patients.',
      },
      {
        icon: 'mdi-star-outline',
        title: 'State-of-the-art Examinations',
        description:
          'Our clinic prides itself on offering a wide range of detailed ultrasound examinations. We have been honored with accreditation from the Polish Society of Ultrasonography for our excellent services.',
      },
      {
        icon: 'mdi-badge-account',
        title: 'Compassionate and Skilled Staff',
        description:
          "Our team, including environmental nurses with Master's degrees and an environmental midwife, is committed to providing personalized care. Our nursing staff and medical registrars diligently handle all scheduling of patient appointments.",
      },
      {
        icon: 'mdi-wheelchair-accessibility',
        title: 'Disabled-friendly Infrastructure',
        description:
          "Keeping the needs of all our patients in mind, we have made sure our clinic is fully accessible to the disabled. With a specially designed entrance, elevator and convenient stairs to the upper floors, we've taken every step to ensure a comfortable visit for everyone.",
      },
      {
        icon: 'mdi-lock-outline',
        title: 'Your Safety, Our Priority',
        description:
          'Our clinic is furnished with advanced bactericidal lamps in each office for optimal hygiene levels. Along with that, we also have a comprehensive ventilation system in place, enhancing the safety quotient for both our patients and staff.',
      },
    ]);

    return {
      features,
    };
  },
});
</script>

<style scoped>
.features-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4em;
  margin: 2em;

  h3 {
    font-size: 2rem;
    font-weight: 200;
    padding-top: 30px;
    word-spacing: 7px;
    text-align: left;
    line-height: normal;
    min-height: 3em;
  }

  p {
    padding-top: 2em;
  }
}
</style>
