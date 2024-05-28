<template>
  <v-snackbar
    v-model="state.open"
    :timeout="state.timeout"
    :position="state.position"
    :location="state.location"
    @click:outside="hideSnackbar"
  >
    <v-alert :type="state.severity" variant="elevated" @close="hideSnackbar">
      {{ state.message }}
    </v-alert>
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSnackbar } from '@/shared/snackbar/composables/useSnackbar.ts';

export default defineComponent({
  name: 'Snackbar',
  setup() {
    const { state, hideSnackbar } = useSnackbar();

    return {
      state,
      hideSnackbar,
    };
  },
});
</script>
