<template>
  <slot></slot>
  <v-container class="spinner" v-if="state.loading">
    <v-progress-circular
      indeterminate
      size="64"
      color="primary"
    ></v-progress-circular>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSpinner } from '@/shared/spinner/composables/useSpinner.ts';

export default defineComponent({
  name: 'Spinner',
  setup() {
    const { state } = useSpinner();

    return {
      state,
    };
  },
});
</script>
<style scoped>
.spinner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
</style>
