<template>
  <div v-if="checkItemAccess()">
    <v-list-item :to="listItemPath" link>
      <v-list-item-title>{{ listItemText }}</v-list-item-title>
    </v-list-item>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { useAuth } from '@/core/authentication/composables/useAuth.ts';
import { UserRole } from '@/core/enums/UserRole.ts';

const props = defineProps({
  listItemText: {
    type: String as PropType<string>,
    required: true,
  },
  listItemPath: {
    type: String as PropType<string>,
    required: true,
  },
  requireLogin: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false,
  },
  allowedRoles: {
    type: Array as PropType<UserRole[]>,
    required: false,
    default: () => [],
  },
});

const { authData, checkAccess } = useAuth();

const checkItemAccess = () => {
  if (!props.requireLogin) {
    return true;
  }
  if (props.requireLogin && !authData) {
    return false;
  }
  if (!props.allowedRoles || props.allowedRoles.length === 0) {
    return true;
  }
  return checkAccess(props.allowedRoles);
};
</script>

<style scoped>
/* Add your styles here */
</style>
