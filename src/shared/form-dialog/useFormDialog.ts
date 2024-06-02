import { defineComponent, markRaw, ref, shallowRef } from 'vue';
import FormDialog from '@/shared/form-dialog/FormDialog.vue';

interface DialogOptions {
  title: string;
  width?: string;
  height?: string;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

interface DialogProps {
  component: any;
  props: Record<string, any>;
  options: DialogOptions;
}

export const useFormDialog = () => {
  const open = ref(false);
  const dialogProps = shallowRef<DialogProps | null>(null);

  const openDialog = (props: DialogProps) => {
    props.component = markRaw(props.component);
    dialogProps.value = props;
    open.value = true;
  };

  const closeDialog = () => {
    open.value = false;
    dialogProps.value = null;
  };

  const FormDialogComponent = defineComponent({
    components: { FormDialog },
    setup() {
      return { open, dialogProps, closeDialog };
    },
    template: `
      <FormDialog
        :open="open"
        :dialogProps="dialogProps"
        :closeDialog="closeDialog"
      />
    `,
  });

  return { openDialog, closeDialog, FormDialogComponent };
};
