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
  <slot></slot>
</template>

<script setup lang="ts">
import { useSnackbar } from '@/shared/snackbar/composables/useSnackbar.ts';

const { state, hideSnackbar } = useSnackbar();
</script>
