export interface SnackbarState {
  open: boolean;
  message: string;
  timeout?: number;
  position?: 'fixed' | 'sticky' | 'absolute' | 'relative' | 'static';
  location?: 'top' | 'bottom' | 'left' | 'right';
  severity: SnackbarSeverity;
}

export interface SnackbarContext {
  state: SnackbarState;
  showSnackbar: (msg: string, sev: SnackbarSeverity) => void;
  hideSnackbar: () => void;
}

export type SnackbarSeverity = 'success' | 'info' | 'warning' | 'error';
