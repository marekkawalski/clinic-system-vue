import { inject, provide, reactive, readonly } from 'vue';
import {
  SnackbarContext,
  SnackbarSeverity,
  SnackbarState,
} from '@/shared/snackbar/model/snackbarModel.ts';

const state = reactive<SnackbarState>({
  open: false,
  message: '',
  severity: 'success',
  location: 'right',
});

const showSnackbar = (msg: string, sev: SnackbarSeverity) => {
  state.message = msg;
  state.severity = sev;
  state.open = true;
};

const hideSnackbar = () => {
  state.open = false;
};

const SNACKBAR_KEY = Symbol('Snackbar');

export const provideSnackbar = () => {
  provide<SnackbarContext>(SNACKBAR_KEY, {
    state: readonly(state) as SnackbarState,
    showSnackbar,
    hideSnackbar,
  });
};

export const useSnackbar = (): SnackbarContext => {
  const snackbar = inject<SnackbarContext>(SNACKBAR_KEY);
  if (!snackbar) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return snackbar;
};
