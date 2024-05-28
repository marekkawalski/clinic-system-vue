import { inject, provide, reactive } from 'vue';
import {
  SpinnerContextType,
  SpinnerState,
} from '@/shared/spinner/model/spinnerModel.ts';

const state = reactive<SpinnerState>({
  loading: false,
});

const showSpinner = () => {
  state.loading = true;
};

const hideSpinner = () => {
  state.loading = false;
};

const SPINNER_KEY = Symbol('Spinner');

export const provideSpinner = () => {
  provide<SpinnerContextType>(SPINNER_KEY, {
    showSpinner,
    hideSpinner,
    state,
  });
};

export const useSpinner = (): SpinnerContextType => {
  const spinner = inject<SpinnerContextType>(SPINNER_KEY);
  if (!spinner) {
    throw new Error('useSpinner must be used within a SpinnerProvider');
  }
  return spinner;
};
