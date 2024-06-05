<template>
  <div>
    <v-dialog
      :persistent="true"
      class="pa-4 ma-5"
      :model-value="open"
      :width="dialogProps?.options.width ?? '600px'"
    >
      <template v-if="dialogProps">
        <v-card>
          <v-card-title>{{ dialogProps.options.title }}</v-card-title>
          <v-card-text>
            <component :is="dialogProps.component" v-bind="dialogProps.props" />
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-btn @click="closeDialog">Cancel</v-btn>
            <v-btn color="primary" @click="handleSave" type="button"
              >Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { eventBus } from '../eventBus';

defineProps<{
  open: boolean;
  dialogProps: {
    component: any;
    props: Record<string, any>;
    options: {
      title: string;
      width?: string;
      height?: string;
      fullWidth?: boolean;
      maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    };
  } | null;
  closeDialog: () => void;
}>();

const handleSave = () => {
  eventBus.emit('submit-form');
};
</script>
