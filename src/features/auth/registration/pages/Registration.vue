<template>
  <div class="form-page">
    <div class="form-component-wrapper">
      <UserForm action="Register" :formType="FormType.WholePageForm" />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserForm from '@/shared/components/user-form/UserForm.vue';
import { FormType } from '@/shared/enums/FormType';
</script>

<style scoped>
@import '@/styles/components/form/form-page.scss';
@import '@/styles/components/form/form.scss';

.form-component-wrapper {
  width: 100%;
  display: flex;
  padding-top: 3em;
  justify-content: center;
}
</style>
