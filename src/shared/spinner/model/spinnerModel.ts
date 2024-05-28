export interface SpinnerContextType {
  showSpinner: () => void;
  hideSpinner: () => void;
  state: SpinnerState;
}

export interface SpinnerState {
  loading: boolean;
}
