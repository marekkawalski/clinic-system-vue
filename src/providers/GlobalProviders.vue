<template>
  <Spinner>
    <Snackbar>
      <AxiosInstance>
        <slot></slot>
      </AxiosInstance>
    </Snackbar>
  </Spinner>
</template>

<script setup lang="ts">
import { provideSnackbar } from '@/shared/snackbar/composables/useSnackbar';
import Snackbar from '@/shared/snackbar/SnackBar.vue';
import { provideSpinner } from '@/shared/spinner/composables/useSpinner';
import Spinner from '@/shared/spinner/Spinner.vue';
import AxiosInstance from '@/shared/axios-instance/AxiosInstance.vue';

provideSpinner();
provideSnackbar();
</script>
