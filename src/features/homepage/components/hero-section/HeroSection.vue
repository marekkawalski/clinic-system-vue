<template>
  <div class="hero-wrapper page-wrapper" id="hero">
    <div>
      <h1>Delivering cutting edge medical systems</h1>
      <v-btn color="primary" @click="goToDoctors"> Schedule appointment</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { PathConstants } from '@/core/constants/path.constants';

const router = useRouter();

const goToDoctors = () => {
  router.push('/' + PathConstants.DOCTORS_PATH);
};
</script>

<style scoped>
.hero-wrapper {
  background-image: linear-gradient(rgba(0, 0, 0, 0.236), rgba(0, 0, 0, 0.485)),
    url('@/assets/images/clinic.webp');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  gap: 50px;
  padding-left: 7em;
  padding-right: 7em;
}

h1 {
  font-size: 5rem;
  letter-spacing: 0.1rem;
  line-break: normal;
  width: auto;
  height: max-content;
  line-height: normal;
  color: #fff;
  padding-bottom: 0.3em;
  font-weight: 400;
}
</style>
