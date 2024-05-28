<template>
  <div class="feature">
    <div>
      <v-icon class="feature-icon">{{ icon }}</v-icon>
      <h3>{{ title }}</h3>
      <div class="border"></div>
    </div>
    <p>{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
  icon: {
    type: String as PropType<string>,
    required: true,
  },
  title: {
    type: String as PropType<string>,
    required: true,
  },
  description: {
    type: String as PropType<string>,
    required: true,
  },
});
</script>

<style scoped>
.feature {
  margin: 2em;

  .feature-icon {
    font-size: 2rem;
    height: 2rem;
    width: 2rem;
    color: rgb(var(--v-theme-primary));
  }

  .border {
    display: block;
    margin: 1em auto;
    width: 50%;
    transform: translateX(-50%);
    background-color: rgb(var(--v-theme-primary));
    height: 2px;
  }
}
</style>
