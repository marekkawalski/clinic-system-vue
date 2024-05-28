<template>
  <Nav></Nav>
  <Snackbar />
</template>

<script setup lang="ts">
import Nav from '@/shared/components/Nav.vue';
import { provideSnackbar } from '@/shared/snackbar/composables/useSnackbar.ts';
import Snackbar from '@/shared/snackbar/SnackBar.vue';
import { provideSpinner } from '@/shared/spinner/composables/useSpinner.ts';

provideSpinner();
provideSnackbar();
</script>
