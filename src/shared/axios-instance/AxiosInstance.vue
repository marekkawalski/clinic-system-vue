<template>
  <slot></slot>
</template>
<script setup lang="ts">
import { provideAxiosInstance } from '@/shared/axios-instance/useAxiosInstance.ts';

provideAxiosInstance();
</script>
<style scoped></style>
