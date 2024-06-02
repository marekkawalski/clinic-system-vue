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
import { snackBarEventBus } from '@/shared/snackbar/snackBarEventBus.ts';
import { watch } from 'vue';
import { SnackbarSeverity } from '@/shared/snackbar/model/snackbarModel.ts';

const { state, hideSnackbar, showSnackbar } = useSnackbar();

watch(
  () => snackBarEventBus.open.value,
  () => {
    showSnackbar(
      snackBarEventBus.message.value,
      snackBarEventBus.type.value as SnackbarSeverity,
    );

    setTimeout(() => {
      hideSnackbar();
    }, 5000);
    snackBarEventBus.open.value = false;
  },
);
</script>
