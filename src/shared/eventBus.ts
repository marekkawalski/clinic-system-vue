import { reactive, toRefs } from 'vue';
import { SnackbarSeverity } from '@/shared/snackbar/model/snackbarModel.ts';

const state = reactive({
  message: '',
  type: 'info',
  open: false,
});

export const eventBus = {
  ...toRefs(state),
  emit(event: string, payload: { message: string; type: SnackbarSeverity }) {
    if (event === 'showSnackbar') {
      state.message = payload.message;
      state.type = payload.type;
      state.open = true;
    }
  },
};
