<template>
  <v-dialog v-model="isOpen" width="1200px" id="edit-user-popup">
    <v-card>
      <v-card-text class="pa-0 ma-0">
        <UserForm
          :userId="user?.id"
          :action="'Edit User'"
          :formType="FormType.PopupForm"
          @close="onClose"
          :key="user?.id"
        >
          <v-card-actions>
            <v-btn @click="onClose" color="primary"> Cancel</v-btn>
            <v-btn
              type="submit"
              form="userForm"
              color="primary"
              id="submit-button"
            >
              Save
            </v-btn>
          </v-card-actions>
        </UserForm>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { User } from '@/core/models/user/User';
import UserForm from '@/shared/components/user-form/UserForm.vue';
import { FormType } from '@/shared/enums/FormType.ts';

interface Props {
  open: boolean;
  onClose: () => void;
  user: User | null;
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
