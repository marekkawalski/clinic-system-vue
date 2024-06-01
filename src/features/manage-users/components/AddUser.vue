<template>
  <v-dialog v-model="isOpen" width="1200px">
    <v-card>
      <v-card-text class="pa-0 ma-0">
        <UserForm
          :action="'Add User'"
          :formType="FormType.PopupForm"
          @close="onClose"
        >
          <v-card-actions>
            <v-btn @click="onClose" color="primary"> Cancel</v-btn>
            <v-btn type="submit" form="userForm" color="primary"> Save</v-btn>
          </v-card-actions>
        </UserForm>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import UserForm from '@/shared/components/user-form/UserForm.vue';
import { FormType } from '@/shared/enums/FormType.ts';

interface Props {
  open: boolean;
  onClose: () => void;
}

const props = defineProps<Props>();

const isOpen = ref(props.open);

watch(
  () => props.open,
  newVal => {
    isOpen.value = newVal;
  },
);

const onClose = () => {
  isOpen.value = false;
  props.onClose();
};
</script>

<style scoped></style>
