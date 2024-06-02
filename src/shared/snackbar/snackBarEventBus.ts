// src/snackbarEventBus.ts
import { reactive, toRefs } from 'vue';
import { SnackbarSeverity } from '@/shared/snackbar/model/snackbarModel.ts';
import { eventBus as globalEventBus } from '../eventBus.ts';

const state = reactive({
  message: '',
  type: 'info' as SnackbarSeverity,
  open: false,
});

export const snackBarEventBus = {
  ...toRefs(state),
  showSnackbar(payload: { message: string; type: SnackbarSeverity }) {
    state.message = payload.message;
    state.type = payload.type;
    state.open = true;
  },
};

// Listen for the global event bus to trigger snackbar events
globalEventBus.on(
  'showSnackbar',
  (payload: { message: string; type: SnackbarSeverity }) => {
    snackBarEventBus.showSnackbar(payload);
  },
);
